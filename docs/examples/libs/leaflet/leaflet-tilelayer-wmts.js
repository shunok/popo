L.TileLayer.WMTS = L.TileLayer.extend({

  defaultWmtsParams: {
    service: 'WMTS',
    request: 'GetTile',
    version: '1.0.0',
    layer: '',
    style: '',
    tilematrixSet: '',
    format: 'image/jpeg',
    transparent: false
  },
  options: {
    crs: null,
    uppercase: false,
    noWrap: true,
    reqDelayTime: 50,
    tileSize: 256,
    bMutiUrl: false,
    urls: null,
    origin: null,
    maxZoom: 30
  },

  initialize: function(url, options) { // (String, Object)
    this._url = url;
    this.visible = true;
    var wmtsParams = L.extend({}, this.defaultWmtsParams);
    for (var i in options) {
      if (!(i in this.options)) {
        wmtsParams[i] = options[i];
      }
    }

    options = L.setOptions(this, options);

    wmtsParams.width = wmtsParams.height = options.tileSize * (options.detectRetina && L.Browser.retina ? 2 : 1);

    this.wmtsParams = wmtsParams;
    // this.matrixIds = options.matrixIds||this.getDefaultMatrix();
    this.urlIndex = -1;
  },

  onAdd: function(map) {
    this._crs = this.options.crs ? this.options.crs : map.options.crs;
    this.matrixIds = this.options.matrixIds || this.getMatrix();
    var projectionKey = this._wmtsVersion >= 1.3 ? 'crs' : 'srs';
    this.wmtsParams[projectionKey] = this._crs.code;
    L.TileLayer.prototype.onAdd.call(this, map);

  },

  getTileUrl: function(tilePoint, zoom) { // (Point, Number) -> String
    var map = this._map;
    //      crs = this._crs;
    //      zoom = tilePoint.z;
    //      tileSize = this.options.tileSize;
    //      nwPoint = tilePoint.multiplyBy(tileSize);
    //      //+/-1 in order to be on the tile
    //      nwPoint.x+=1;
    //      nwPoint.y-=1;
    //      sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
    //      nw = crs.project(map.unproject(nwPoint, zoom));
    //      se = crs.project(map.unproject(sePoint, zoom));
    //      tilewidth = se.x-nw.x;
    ////      zoom=map.getZoom();
    //		zoom = tilePoint.z;
    //      ident = this.matrixIds[zoom].identifier;
    //      X0 = this.matrixIds[zoom].topLeftCorner.lng;
    //      Y0 = this.matrixIds[zoom].topLeftCorner.lat;
    //      tilecol=Math.floor((nw.x-X0)/tilewidth);
    //      tilerow=-Math.floor((nw.y-Y0)/tilewidth);

    zoom = map.getZoom();
    ident = this.matrixIds[zoom].identifier;
    tilecol = tilePoint.x;
    tilerow = tilePoint.y;

    var url = L.Util.template(this._url, {
      s: this._getSubdomain(tilePoint)
    });

    var url1 = url;

    if (this.options.bMutiUrl && this.options.urls && this.options.urls.length > 0) {
      this.urlIndex += 1;
      if (this.urlIndex >= this.options.urls.length) {
        this.urlIndex = 0;
      }
      url1 = this.options.urls[this.urlIndex];

    }

    return url1 + L.Util.getParamString(this.wmtsParams, url, this.options.uppercase) + "&tilematrix=" + ident + "&tilerow=" + tilerow + "&tilecol=" + tilecol;
  },

  setParams: function(params, noRedraw) {
    L.extend(this.wmtsParams, params);
    if (!noRedraw) {
      this.redraw();
    }
    return this;
  },

  getDefaultMatrix: function() {
    var matrixIds4326 = new Array(22);
    for (var i = 0; i < 22; i++) {
      matrixIds4326[i] = {
        identifier: "" + (i + 1),
        topLeftCorner: new L.LatLng(90, -180)
      };
    }
    return matrixIds4326;
  },
  getMatrix: function() {
    if (!this.options.origin || !this.options.origin.length || this.options.origin.length != 2) return this.getDefaultMatrix();
    var matrixIds = new Array(22);
    for (var i = 0; i < 22; i++) {
      matrixIds[i] = {
        identifier: "" + (i + 1),
        topLeftCorner: new L.LatLng(this.options.origin[1], this.options.origin[0])
      };
    }
    return matrixIds;
  },
  _isValidTile: function(coords) {
    var crs = this._map.options.crs;

    if (!crs.infinite) {
      // don't load tile if it's out of bounds and not wrapped
      var bounds = this._globalTileRange;
      if (this.options.noWrap && (coords.x < 0 || coords.x > bounds.max.x)) {
        return false
      }
      if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
        (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) {
        return false;
      }
    }

    if (!this.options.bounds) {
      return true;
    }

    // don't load tile if it doesn't intersect the bounds in options
    var tileBounds = this._tileCoordsToBounds(coords);
    return L.latLngBounds(this.options.bounds).overlaps(tileBounds);
  },
  _update: function(center) {
    if (this.options.reqDelayTime == 0) {
      this.update1(center);
    } else {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(L.bind(this.update1, this, center), this.options.reqDelayTime);

    }
  },
  update1: function(center) {
    if (!this.visible) return;
    var map = this._map;
    if (!map) {
      return;
    }
    var zoom = map.getZoom();

    if (center === undefined) {
      center = map.getCenter();
    }
    if (this._tileZoom === undefined) {
      return;
    } // if out of minzoom/maxzoom

    if (zoom != this._tileZoom) {
      map.setView(center, this._tileZoom)
      return;
    }

    var pixelBounds = this._getTiledPixelBounds(center, zoom, this._tileZoom),
      tileRange = this._pxBoundsToTileRange(pixelBounds),
      tileCenter = tileRange.getCenter(),
      queue = [];

    for (var key in this._tiles) {
      this._tiles[key].current = false;
    }

    // _update just loads more tiles. If the tile zoom level differs too much
    // from the map's, let _setView reset levels and prune old tiles.
    if (Math.abs(zoom - this._tileZoom) >= 1) {
      this._setView(center, zoom);
      return;
    }

    // create a queue of coordinates to load tiles from
    for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
      for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
        var coords = new L.Point(i, j);
        coords.z = this._tileZoom;

        if (!this._isValidTile(coords)) {
          continue;
        }

        var tile = this._tiles[this._tileCoordsToKey(coords)];
        if (tile) {
          tile.current = true;
        } else {
          queue.push(coords);
        }
      }
    }

    // sort tile queue to load tiles in order of their distance to center
    queue.sort(function(a, b) {
      return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
    });

    if (queue.length !== 0) {
      // if its the first batch of tiles to load
      this.queue = queue;
      if (!this._loading) {
        this._loading = true;
        this.fire('loading');
      }

      // create DOM fragment to append tiles in one batch
      var fragment = document.createDocumentFragment();

      for (i = 0; i < queue.length; i++) {
        this._addTile(queue[i], fragment);
      }

      this._level.el.appendChild(fragment);
    }
  },
  _updateOpacity: function() {
    if (!this._map) {
      return;
    }

    // IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
    if (L.Browser.ielt9 || !this._map._fadeAnimated) {
      return;
    }

    L.DomUtil.setOpacity(this._container, this.options.opacity);

    var now = +new Date(),
      nextFrame = false,
      willPrune = false;

    for (var key in this._tiles) {
      var tile = this._tiles[key];
      if (!tile.current || !tile.loaded) {
        continue;
      }

      var fade = Math.min(1, (now - tile.loaded) / 200);

      //			L.DomUtil.setOpacity(tile.el, fade);
      //			if (fade < 1) {
      //              console.log(3333);
      //				nextFrame = true;
      //			} else {
      //				if (tile.active) { willPrune = true; }
      //				tile.active = true;
      //              console.log(44444);
      //			}
      //			nextFrame = true;
      L.DomUtil.setOpacity(tile.el, 1);
      //			if (tile.active) { willPrune = true; }
      willPrune = true;
      tile.active = true;
    }

    if (willPrune && !this._noPrune) {
      this._pruneTiles();
    }

    if (nextFrame) {
      L.Util.cancelAnimFrame(this._fadeFrame);
      this._fadeFrame = L.Util.requestAnimFrame(this._updateOpacity, this);
    }
  },
  /**
   * 设置服务是否可见
   * @param value {Boolean} 是否可见
   */
  setVisible: function(value) {
    if (!value) {
      this.visible = false;
      this._removeAllTiles();
    } else {
      this.visible = true;
      this._update();
    }
  }
});

L.tileLayer.wmts = function(url, options) {
  return new L.TileLayer.WMTS(url, options);
};

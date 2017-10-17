import {
    isNumber, isArray, isDOM, isObject, contain, legalNumber, get, merge, formatMargin,
    mixins, formatNum, isPercentage, translatePercentage, isEmptyObject, isString,
} from '../utils/util';
import {
    css, getStyle, isHidden, query,
    removeByRole, getTargetDataId, TRANSFORM, getRect, getPureStyle,
} from '../dom/dom';
import { initSize, updateLayout, initLayoutSet, initLayout } from './core/layout';
import { addPanels, addLayoutToPanel } from './core/panel';
import CT from '../constant/constant';
import ERROR_MSG from '../constant/error';
import defaultOptions from './options/popo';
import defaultStyle from './options/style';
import {
    createPane,
    createVc,
    stampInner,
    isInPoPo,
    setHide,
    getNodeById,
    updateHideIds,
    _each,
    _full,
    _unFull,
    _setStyle,
    _initStyle,
    updateStyle,
    removeStyle,
    vcToDom,
    updateVCC,
    loadTemplate,
    restoreTemplate,
    restorePanelTemplate,
    setLineheight,
    setOverflows,
    loadExtends,
    addExtend,
    getRealIds,
    focusOn,
    getRealdomsById,
    createZoomContainer,
    getAllIds,
    togglePoPo,
    getAliasById,
    updateContainerSize,
} from './core/popo';

import { loadDev } from './core/dev';

import dragHandle from './handle/drag';
import resize from './handle/resize';
import wheelzoom from './handle/wheelzoom';
import * as DomEvent from '../dom/dom_event';

/**
 * PoPoInstance
 * @class
 */
export default class PoPoInstance {

    /**
     * @constructor
     * @param {Object} options options
     */
    constructor(options) {
        const o = this.options = merge(defaultOptions, options),
            c = this.container = o.container ? get(o.container) : null;

        this._initOptions();

        this._fullId = o.fullId;

        this._fullZIndex = o.fullZIndex || 0;

        this._hideIds = o.hideIds || [];

        this._showIds = o.dev.showIds || [];

        this.style = merge(defaultStyle, o.style || {});

        this._sizes = initSize(o.rows, o.cols);

        this._vc = createVc();

        if (initLayoutSet(o)) {
            initLayout(o, this._vc);
            if (isDOM(c)) {
                this._initContainer();
            }
        }
    }

    /**
     * Initialization options
     * @ignore
     */
    _initOptions() {
        const o = this.options,
            scale = legalNumber(o.fontScale, 0.1);

        o.padding = formatMargin(o.padding, scale);

        if (isObject(o.panel.custom)) {
            o.panel.custom = [o.panel.custom];
        }
        if (isArray(o.panel.custom)) {
            o.panel.custom = o.panel.custom.map((panel) => merge({
                headHeight: 0,
                footHeight: 0,
                leftWidth: 0,
                rightWidth: 0,
                gutter: 0,
                zIndex: CT.PANEL_DEFAULT_ZINDEX,
            }, panel));
        }
    }

    /**
     * Initialization container
     * @ignore
     */
    _initContainer() {
        const vc = this._vc,
            c = this.container,
            o = this.options,
            sizes = this._sizes;

        if (vc && c && o && sizes) {
            // Mark container if it is in another popo instance.
            stampInner(c);

            this._oldContainerStyle = {
                display: getStyle(c, 'display'),
            };

            // Set container position when zoom on.
            if (getStyle(c, 'position') === 'static' && o.zoom.enable) {
                // save origin container style state
                this._oldContainerStyle.position = 'static';
                css(c, { position: 'relative' });
            }

            // Hide data-popo elements in container.
            togglePoPo(c, false);

            // Add custom style to container
            const { style } = this;

            if (style) {
                _setStyle(c, style.container, true);
            }

            // Nest PoPo resize update interval.
            if (isInPoPo(c)) {
                o.updateInterval += 50;
            }

            // Create Zoom Container and Pane
            const zoomContainer = this._zoomContainer = createZoomContainer(c, o),
                scroll = o.scroll,
                _style = {},
                p = this._pane = createPane(o);

            // If zoom mode on, drag option auto enable.
            if (o.zoom.enable) { o.drag = true; }

            // Set zoom container and zoom pane overflow and scroll.
            if (o.zoom.enable || o.overflowVisible) {
                _style.overflow = 'visible';
            } else if (scroll.x && scroll.y) {
                _style.overflow = 'auto';
            } else if (scroll.x && !scroll.y) {
                _style.overflowX = 'auto';
                _style.overflowY = 'hidden';
            } else if (!scroll.x && scroll.y) {
                _style.overflowY = 'auto';
                _style.overflowX = 'hidden';
            }
            css(zoomContainer, _style);
            css(zoomContainer.parentNode, {
                overflow: o.overflowVisible ? 'visible' : 'hidden',
            });

            // Sign Nest PoPo
            // stampInner(p);

            zoomContainer.appendChild(p);

            // Update layout
            updateLayout(vc, p, sizes, o, this._vpanels = []);

            // Add Panel Layout
            if (o.panel && o.panel.enable) {
                addPanels(vc, o);
            }

            // Add extends panel
            loadExtends(vc, o, true);

            // Set Panel Overflow style.
            setOverflows(vc, o);

            // Full the select full panel
            if (this._fullId) {
                _full(vc, this._getId(this._fullId), this._fullZIndex);
            }

            css(c, { display: 'none' });

            // Update style
            _initStyle(c, vc, zoomContainer, zoomContainer.parentNode, o, this.style);

            this._render();
        }
    }

    /**
     * Prepare render
     * @ignore
     */
    _render() {
        const c = this._pane,
            o = this.options;

        if (c && o) {
            let delay = o.renderDelay;

            if (delay > 0 && o.updateInterval > 0) {
                delay = Math.max(delay, o.updateInterval);
            }
            if (delay > 0) {
                setTimeout(() => {
                    this._onRender();
                }, delay || 0);
            } else {
                this._onRender();
            }
        }
    }

    /**
     * Rendering
     * @ignore
     */
    _onRender() {
        const vc = this._vc,
            c = this.container,
            pane = this._pane,
            o = this.options;

        if (c && vc && o) {
            const ids = this._showIds;

            if (ids) {
                this._hideIds = updateHideIds(ids, this.getIds()) || this._hideIds;
            }
            setHide(this._hideIds, vc, o, ids && ids.length > 0);

            pane.appendChild(vcToDom(vc));

            if (o.dev.enable) {
                loadDev(pane, vc, o);
            }

            loadTemplate(c, vc, o);

            this._resize();

            css(c, {
                display: this._oldContainerStyle.display,
            });

            this._updateSize();

            if (o.zoom.enable) {
                const scale = legalNumber(o.zoom.scale, CT.MIN_ZOOM, CT.MAX_ZOOM);

                this._initZoomEvent();
                this.zoom(scale);
                if (o.zoom.wheelZoom) {
                    this.enableScrollWheel();
                }
            }

            if (o.drag) {
                this.enableDrag();
            }

            if (o.focus.id) {
                const { id, offsetX, offsetY } = o.focus;

                this.focus(id, offsetX, offsetY);
            }

            setLineheight(vc, o.lineHeight);

            if (o.onload && typeof o.onload === 'function') {
                o.onload(this);
            }
        }
    }

    /**
     * Initialization zoom event.
     * @ignore
     */
    _initZoomEvent() {
        const o = this.options,
            c = this.container,
            zoom = o.zoom;

        if (zoom.enable && zoom.control) {
            const zoomin = query(c, `.${CT.ZOOMIN}`),
                zoomout = query(c, `.${CT.ZOOMOUT}`),
                ratio = zoom.ratio;

            this._zoomInfoPane = query(c, `.${CT.ZOOMINFO}`);

            if (isDOM(zoomin) && isDOM(zoomout)) {
                DomEvent.on(zoomin, 'click', () => {
                    this.zoom(this.scale + ratio);
                }, this);

                DomEvent.on(zoomout, 'click', () => {
                    this.zoom(this.scale - ratio);
                }, this);
            }
        }
    }

    /**
     * Get component real id.
     * @param {String|Number} id panel id or alias.
     * @return {Array} component ids
     */
    _getId(id) {
        return isNumber(id) ? id : getRealIds(this._vc, id, this.options.alias);
    }

    /**
     * Get vnode by id and type.
     * @ignore
     * @param {String|Number} id panel id or alias
     * @param {String} type component type:panel, panelContainer, lcr, center,left, right, head, foot @default panel
     * @return {VNode} vnode
     */
    _getNode(id, type) {
        return getNodeById(this._vc, this._getId(id), type || CT.PANEL);
    }

    /**
     * Get Option
     * @return {Object} option
     */
    getOption() {
        return this.options;
    }

    /**
     * Get Panel count
     * @return {Number} panel count
     */
    getPanelCount() {
        return this.getIds().length;
    }

    /**
     * Get all panel id.
     * @return {Array} ids array
     */
    getIds() {
        return getAllIds(this._vc);
    }

    /**
     * @Get component alias
     * @return {Array} alias
     */
    getAliasName() {
        const alias = this.options.alias;

        if (alias && isArray(alias)) {
            return alias.map((a) => a.name);
        }

        return [];
    }

    /**
     * Get component alias
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {Array|String} component alias
     */
    getAlias(target) {
        const alias = this.options.alias;

        if (target === undefined) {
            return alias;
        }
        const result = (isArray(target) ? target : [target]).map((t) => getAliasById(alias, getTargetDataId(t)));

        return result.length === 1 ? result[0] : result;
    }

    /**
     * Get screen container
     * @return {HTMLElement} app container
     */
    getContainer() {
        return this.container;
    }

    /**
     * Zoom screen
     * @param {Number} scale scale
     * @return {PoPoInstance} current popo instance
     */
    zoom(scale) {
        const c = this._pane,
            vc = this._vc,
            o = this.options,
            preview = this._zoomContainer,
            width = this.$width(),
            height = this.$height(),
            style = {};

        if (!o.zoom.enable || !isNumber(scale) || this.scale === scale || !vc || !c || !o) return this;

        this.scale = scale = legalNumber(scale, o.zoom.min, o.zoom.max);
        if (isDOM(this._zoomInfoPane)) {
            this._zoomInfoPane.innerHTML = formatNum(scale, 1);
        }

        style[TRANSFORM] = `scale(${scale})`;
        css(c, style);

        /*eslint-disable */
        const rect = getRect(preview.parentNode);
        /*eslint-enable */

        let top = (rect.height - (height * scale)) / 2,
            left = (rect.width - (width * scale)) / 2;

        if (top < 0 || scale === 1) top = 0;
        if (left < 0 || scale === 1) left = 0;

        css(preview, {
            width: `${width * scale}px`,
            height: `${height * scale}px`,
            paddingTop: `${top}px`,
            paddingLeft: `${left}px`,
        });

        return this;
    }

    /**
     * Focus On Panel
     * @param {Number | String} id panel id or alias
     * @param {Number} offsetX offsetX
     * @param {Number} offsetY offsetY
     * @return {PoPoInstance} current popo instance
     */
    focus(id, offsetX, offsetY) {
        focusOn(this._vc, this._pane, this.options, id, offsetX || 0, offsetY || 0);

        return this;
    }

    /**
     * Get elements
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {Object} elements, include panel, panelContainer, lcr, center,left, right, head, foot
     */
    get(target) {
        if (!target) return null;

        const result = (!isArray(target) ? [target] : target).map((t) =>
            getRealdomsById(this._vc, getTargetDataId(t), this.options));

        return result.length === 1 ? result[0] : result;
    }

    /**
     * Get all elements
     * @return {Array} all elements.
     */
    getAll() {
        return this.get(this.getIds());
    }

    /**
     * Get component
     * @ignore
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @param {String} type component type: panel, panelContainer, lcr, center,head, left, right, foot
     * @return {HTMLElement} component container
     */
    _getXComponent(target, type) {
        const result = this.get(target);

        return isArray(result) ? result.map((r) => r && r[type]) : result && result[type];
    }

    /**
     * get panel container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} wrap container
     */
    panel(target) {
        return this._getXComponent(target, 'panel');
    }

    /**
     * get wrap container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} wrap container
     */
    wrap(target) {
        return this._getXComponent(target, 'wrap');
    }

    /**
     * get center container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} center container
     */
    center(target) {
        return this._getXComponent(target, 'center');
    }

    /**
     * get head container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} head container
     */
    head(target) {
        return this._getXComponent(target, 'head');
    }

    /**
     * get left container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} left container
     */
    left(target) {
        return this._getXComponent(target, 'left');
    }

    /**
     * get right container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} right container
     */
    right(target) {
        return this._getXComponent(target, 'right');
    }

    /**
     * get foot container
     * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
     * @return {HTMLElement} foot container
     */
    foot(target) {
        return this._getXComponent(target, 'foot');
    }

    /**
     * Clear Panel
     * @param {String|Number|HTMLElement|Array} target panel id or alias, or panel dom.
     * @param {Boolean} clearTpl if true will delete template content
     * @return {PoPoInstance} current popo instance
     */
    clearPanel(target, clearTpl) {
        if (target) {
            (!isArray(target) ? [target] : target).forEach((t) => {
                const node = this._getNode(getTargetDataId(t));

                if (node) {
                    if (!clearTpl) {
                        restorePanelTemplate(node, this.container, this._vc, this.options);
                    }
                    node.clear();
                    node.update();
                }
            });
        }

        return this;
    }

    /**
     * Clear all panels.
     * @param {Boolean} clearTpl if true will delete template content
     * @return {PoPoInstance} current popo instance
     */
    clearAllPanel(clearTpl) {
        return this.clearPanel(this._vpanels, clearTpl);
    }

    /**
     * Set Panel Layout
     * @param {Object} option panel layout options
     */
    _setPanel({ panels, headHeight = 0, footHeight = 0, leftWidth = 0, rightWidth = 0, gutter = 0 }) {
        const o = this.options.panel;

        if (!panels) return;
        if (!isArray(panels)) { panels = [panels]; }
        if (!o.custom) {
            o.custom = [];
        }
        if (isObject(o.custom)) {
            o.custom = [o.custom];
        }
        if (isArray(o.custom)) {
            this.clearPanel(panels);
            const nodes = panels.map((id) => this._getNode(getTargetDataId(id)));

            o.custom.forEach((c, i) => {
                if (c.panels === panels) {
                    o.custom.splice(i, 1);

                    return;
                }
                if (!isArray(c.panels)) {
                    c.panels = [c.panels];
                }

                let exsit = false;

                c.panels.forEach((cid, index) => {
                    const rcid = this._getId(cid);

                    panels.forEach((id) => {
                        if (rcid === id) {
                            c.panels.splice(index, 1);
                            exsit = true;

                            return;
                        }
                    });
                    if (exsit) {
                        return;
                    }
                });
            });

            o.custom = o.custom.filter((c) => c.panels.length > 0);

            const panelOption = {
                panels,
                headHeight,
                footHeight,
                leftWidth,
                rightWidth,
                gutter,
            };

            o.custom.push(panelOption);

            nodes.forEach((node) => {
                addLayoutToPanel(node, panelOption, this.options.fontScale);
                node.createElement();
            });
        }
    }

    /**
     * Set Panels Layout
     * @param {Object|Array<Object>} options panel layout options array
     * @return {PoPoInstance} current popo instance
     */
    setPanelLayout(options) {
        if (options) {
            (isArray(options) ? options : [options]).forEach((option) => this._setPanel(option));
            this.update();
        }

        return this;
    }

    /**
     * Set panel position and zIndex
     * @param {String|Number|HTMLElement} panel panel id or alias, or panel dom.
     * @param {Number} left left
     * @param {Number} top left
     * @param {Number} zIndex zIndex
     * @return {PoPoInstance} current popo instance
     */
    _updatePanel({ panels, left, top, width, height, zIndex }) {
        (isArray(panels) ? panels : [panels]).forEach((panel) => {
            const node = this._getNode(getTargetDataId(panel));

            if (node) {
                if (left) {
                    const pl = node.percentLeft = isPercentage(left) ? translatePercentage(left) : null;

                    if (pl !== null) left = pl;
                    if (isNumber(left)) {
                        if (node._oldLeft === undefined) {
                            node._oldLeft = node.getLeft();
                        }
                        node.setLeft(pl !== null ? left * this.width : left);
                    }
                }
                if (top) {
                    const pt = node.percentTop = isPercentage(top) ? translatePercentage(top) : null;

                    if (pt !== null) top = pt;
                    if (isNumber(top)) {
                        if (node._oldTop === undefined) {
                            node._oldTop = node.getTop();
                        }
                        node.setTop(pt !== null ? top * this.height : top);
                    }
                }
                if (isNumber(zIndex)) {
                    if (node._oldZIndex === undefined) {
                        node._oldZIndex = node.styles.zIndex;
                    }
                    node.setStyle({ zIndex });
                }
                if (width !== undefined && width !== null) {
                    width = width || node.width;
                    const pw = node.percentWidth = isPercentage(width) ? translatePercentage(width) : null;

                    if (pw !== null) width = pw;
                    if (isNumber(width)) {
                        if (node._oldWidth === undefined) {
                            node._oldWidth = node.getWidth();
                        }
                        node.setWidth(pw !== null ? width * this.width : width);
                    }
                }
                if (height !== undefined && height !== null) {
                    height = height || node.height;

                    const ph = node.percentHeight = isPercentage(height) ? translatePercentage(height) : null;

                    if (ph !== null) height = ph;
                    if (isNumber(height)) {
                        if (node._oldHeight === undefined) {
                            node._oldHeight = node.getHeight();
                        }
                        node.setHeight(ph !== null ? height * this.height : height);
                    }
                }

                if (node._oldWidth !== undefined || node._oldHeight !== undefined
                    || node._classChange || node._styleChange) {
                    setLineheight(this._vc, this.options.lineHeight);
                }

                node.update();
            }
        });

        return this;
    }

    /**
     * Restore option
     * @ignore
     * @param {Object} option {panels, size, position, zIndex}
     */
    _restorePanel({ panels, size = true, position = true, zIndex = true }) {
        (isArray(panels) ? panels : [panels]).forEach((panel) => {
            const node = this._getNode(getTargetDataId(panel));

            if (node) {
                if (position) {
                    if (node._oldLeft !== undefined) {
                        node.setLeft(node._oldLeft);
                    }
                    if (node._oldTop !== undefined) {
                        node.setTop(node._oldTop);
                    }
                }
                if (size) {
                    if (node._oldWidth !== undefined) {
                        node.setWidth(node._oldWidth);
                    }
                    if (node._oldHeight !== undefined) {
                        node.setHeight(node._oldHeight);
                    }
                }
                if (zIndex) {
                    if (node._oldZIndex !== undefined) {
                        node.setStyle({
                            zIndex: node._oldZIndex,
                        });
                    }
                }
                node.update();
            }
        });
    }

    /**
     * Restore Panel State
     * @param {Object|Array<Object>} options restore option
     * @return {PoPoInstance} current popo instance
     */
    restore(options) {
        if (options === undefined) {
            this._restorePanel({
                panels: this.getIds(),
                size: true,
                position: true,
                zIndex: true,
            });
        } else {
            (isArray(options) ? options : [options]).forEach((option) => {
                if (option.panels) {
                    this._restorePanel(option);
                }
            });
        }

        return this;
    }

    /**
     * Get panel top, only for panel container.
     * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
     * @return {Number} top
     */
    $top(target) {
        const node = this._getNode(getTargetDataId(target));

        return node ? node.getTop() : 0;
    }

    /**
     * Get panel left, only for panel container.
     * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
     * @return {Number} left
     */
    $left(target) {

        const node = this._getNode(getTargetDataId(target));

        return node ? node.getLeft() : 0;
    }

    /**
     * Get component element width
     * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
     * @param {String} type element type: panel, panelContainer, lcr, center,head, foot, left, right
     * @return {Number} width
     */
    $width(target, type) {
        if (arguments.length === 0) {
            return this.width;
        }
        let dom = target;

        if (!isDOM(target)) {
            const node = this._getNode(getTargetDataId(target), type);

            dom = node && node.realDom;
        }

        return isDOM(dom) ? getPureStyle(dom, 'width') : -1;
    }

    /**
     * Get component element height
     * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
     * @param {String} type element type: panel, panelContainer, lcr, center,head, foot, left, right
     * @return {Number} height
     */
    $height(target, type) {
        if (arguments.length === 0) {
            return this.height;
        }
        let dom = target;

        if (!isDOM(target)) {
            const node = this._getNode(getTargetDataId(target), type);

            dom = node && node.realDom;
        }

        return isDOM(dom) ? getPureStyle(dom, 'height') : -1;
    }

    /**
     * show screen or panel
     * @param {String|Number|HTMLElement|Array|null} target component id, map key or panel dom,
     * if it's null that will be the screen container.
     * @return {PoPoInstance} current popo instance
     */
    show(target) {
        const c = this.container;

        if (!target && c && isHidden(c)) {
            css(c, { display: 'block' });
        } else {
            (isArray(target) ? target : [target]).forEach((t) => {
                const id = this._getId(getTargetDataId(t)),
                    node = this.panel(id);

                if (isDOM(node) && isHidden(node)) {
                    const index = contain(this._hideIds, id);

                    if (index >= 0) {
                        this._hideIds.splice(index, 1);
                    }
                    css(node, { display: 'block' });
                }

            });
        }

        return this;
    }

    /**
     * show screen or panel
     * @param {String|Number|HTMLElement|Array|null} target component id, map key or panel dom,
     * if it's null that will be the screen container.
     * @return {PoPoInstance} current popo instance
     */
    hide(target) {
        const c = this.container;

        if (!target && c && !isHidden(c)) {
            css(c, { display: 'none' });
        } else {
            const ids = [];

            (isArray(target) ? target : [target]).forEach((t) => {
                const id = this._getId(getTargetDataId(t));

                ids.push(id);
                if (contain(this._hideIds, id) < 0) {
                    this._hideIds.push(id);
                }
            });
            setHide(ids, this._vc, this.options);
        }

        return this;
    }

    /**
     * Execute methods for each component elements.
     * @param {Function} fn fn
     * @param {Array<String|Number|HTMLElement>} targets panels
     * @param {Object} context context
     * @return {PoPoInstance} current popo instance
     */
    each(fn, targets, context) {
        const _targets = targets ? (isArray(targets) ? targets : targets).map((t) => getTargetDataId(t)) : this.getIds();

        _each(this._vc, this.options, fn, _targets, context);

        return this;
    }

    /**
     * remvoe screen or component
     * @param {String|Number|null} target panel id or alias, if it's null that will be the screen container.
     * @param {Boolean} clearTpl if true will delete template content
     * @return {PoPoInstance} current popo instance
     */
    remove(target, clearTpl) {
        if (arguments.length === 0) {
            this._remove();
        } else {
            (isArray(target) ? target : [target]).forEach((t) => {
                const node = this._getNode(getTargetDataId(t));

                if (node && node.remove) {
                    if (!clearTpl) {
                        restorePanelTemplate(node, this.container, this._vc, this.options);
                    }
                    node.remove();
                }
            });
        }

        return this;
    }

    /**
     * Add Panel width Options
     * @param {Object} options panel options
     * @return {PoPoInstance} current PoPoInstance instance
     */
    addPanel(options) {
        const o = this.options;
        const panel = addExtend(this._vc, o.padding, options, o.fontScale, true);

        if (this._vc.realDom && panel) {
            this._vc.realDom.appendChild(panel.createElement());
        }

        return this.get(panel.getId());
    }

    /**
     * Remove screen
     * @ignore
     */
    _remove() {
        const p = this._pane,
            old = this._oldContainerStyle,
            c = this.container,
            vc = this._vc,
            o = this.options;

        restoreTemplate(c, vc, o);
        this.removeStyle();
        this.disableDrag();
        this._removeResize();
        this._sizes = null;
        this._fullId = 0;
        this._fullZIndex = 0;
        this._showIds = null;
        this._hideIds = null;
        this.style = null;
        this._vc.remove();

        if (isDOM(p) && p.parentNode) {
            p.parentNode.removeChild(p);
        }

        removeByRole(CT.ZOOMPANE, c);
        removeByRole(CT.EXT_PANE, c);
        this._pane = null;
        this._vc = null;
        this._vpanels = null;
        this._scrollPane = null;
        this.options = null;

        if (old && old.position) {
            css(c, { position: old.position });
        }

        this.container = null;

        this._oldContainerStyle = null;

        this._oldBodyScroll = null;

        /*eslint-disable */
        this._popo_id = 0;
        /*eslint-enable */

        this._zoomContainer = null;

        this._zoomInfoPane = null;

        this.width = 0;

        this.height = 0;
    }

    /**
     * Full panel component
     * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
     * @param {Number} zIndex css zIndex
     * @return {PoPoInstance} current popo instance
     */
    full(target, zIndex) {
        if (target) {
            const id = this._getId(getTargetDataId(target));

            if (isNumber(id) && id > 0) {
                if (this._fullId > 0) {
                    this.unFull();
                }
                this._fullId = id;
                this._fullZIndex = zIndex || 0;
                this.update();
            }
        }

        return this;
    }

    /**
     * Unfull the full target panel
     * @return {PoPoInstance} current popo instance
     */
    unFull() {
        if (this._fullId > 0 && _unFull(this._vc, this._getId(this._fullId))) {
            this._fullId = 0;
            this._fullZIndex = 0;
            this.update();
        }

        return this;
    }

    /**
     * Update popo size.
     */
    _updateSize() {
        const size = updateContainerSize(this._vc, this.options);

        if (size) {
            this.width = size.width;
            this.height = size.height;
        }
    }

    /**
     * Update popo or panel
     * @param {Array|Object} options update options.
     * @return {PoPoInstance} current popo instance
     */
    update(options) {
        if (options === undefined) {
            updateVCC(this._vc, this._pane, this._sizes, this.options, this._getId(this._fullId), this._fullZIndex || 0);
            this._updateSize();
        } else {
            (isArray(options) ? options : [options]).forEach((t) => {
                if (isObject(t)) {
                    this._updatePanel(t);
                }
            });
            this.update();
        }

        return this;
    }

    /**
     * Set Body scroll
     * @return {PoPoInstance} current popo instance
     */
    setBodyScroll() {
        const body = document.body,
            zc = this._zoomContainer;

        if (zc && zc.parentNode) {
            this._oldBodyScroll = {
                body: body.style.overflow,
                zc: zc.style.overflow,
                zcParent: zc.parentNode.style.overflow,
            };

            css(document.body, {
                overflowY: 'auto',
            });
            css(this._zoomContainer.parentNode, {
                overflow: 'visible',
            });
            css(this._zoomContainer, {
                overflow: '',
            });
        }

        return this;
    }

    /**
     * Reset Body Scroll
     * @return {PoPoInstance} current popo instance
     */
    resetBodyScroll() {
        const old = this._oldBodyScroll;

        if (old) {
            const body = document.body,
                zc = this._zoomContainer;

            this._oldBodyScroll = {
                body: body.style.overflow,
                zc: zc.style.overflow,
                zcParent: zc.parentNode.style.overflow,
            };
            css(document.body, {
                overflow: old.body,
            });
            css(this._zoomContainer.parentNode, {
                overflow: old.zc,
            });
            css(this._zoomContainer, {
                overflow: old.zcParent,
            });

            this._oldBodyScroll = null;
        }

        return this;
    }

    /**
     * Set or update style
     * @ignore
     * @param {Object} style style options
     * @param {Boolean} isUpdate update or set style
     * @return {PoPoInstance} current popo instance
     */
    _setStyle(style, isUpdate) {
        if (isObject(style)) {
            const { _vc, options, container, _zoomContainer } = this;

            if (!isEmptyObject(this.style)) {
                removeStyle(container, _vc, options, this.style, this);
            }
            this.style = isUpdate ? merge(this.style, style) : style;
            _initStyle(container, _vc, _zoomContainer,
                _zoomContainer.parentNode, options, this.style, true);
        }

        return this;
    }

    /**
     * Set style
     * @ignore
     * @param {Object} style style options
     * @return {PoPoInstance} current popo instance
     */
    setStyle(style) {
        return this._setStyle(style, false);
    }

    /**
     * Update style
     * @param {Object} style style option
     * @return {PoPoInstance} current popo instance
     */
    updateStyle(style) {
        return this._setStyle(style, true);
    }

    /**
     * 移除主题
     * @return {PoPoInstance} current popo instance
     */
    removeStyle() {
        const { style, _vc, options, container } = this;

        if (style) {
            removeStyle(container, _vc, options, style, this);
            this.style = null;
        }

        return this;
    }

    /**
     * Add screen to container
     * @param {String|HTMLElement} container container id or container dom.
     * @param {Number} delay render delay @default 0
     * @return {PoPoInstance} current popo instance
     */
    addTo(container, delay) {
        if (this.container) {
            throw new Error(ERROR_MSG.POPO_EXSIT);
        } else {
            const c = get(container);

            if (c && isDOM(c)) {
                this.container = c;
                if (delay > 0) {
                    setTimeout(() => { this._initContainer(); }, delay);
                } else {
                    this._initContainer();
                }
            }
        }

        return this;
    }

}

mixins(PoPoInstance.prototype, [dragHandle, resize, wheelzoom]);

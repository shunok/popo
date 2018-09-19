/*
 * PoPo 1.3.3, a JS UI library for data visualization and large screen.
 * https://github.com/shunok/PoPo (c) 2017-2018 DaShun
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.P = global.P || {})));
}(this, (function (exports) { 'use strict';

var version = "1.3.3";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var lastId = 0;

function stamp(obj) {
    /*eslint-disable */
    obj._popo_id = obj._popo_id || ++lastId;

    return obj._popo_id;
    /*eslint-enable */
}

function bind$1(fn, obj) {
    if (!obj) return fn;
    var slice = Array.prototype.slice,
        args = slice.call(arguments, 2);

    if (fn.bind) {
        return fn.bind.apply(fn, slice.call(arguments, 1));
    }

    return function _fn() {
        return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
    };
}

function extend$1(dest) {
    for (var j = 1, len = arguments.length; j < len; j++) {
        var src = arguments[j];

        for (var i in src) {
            dest[i] = src[i];
        }
    }

    return dest;
}

function legalNumber(v, min, max) {
    if (!isNumber(v)) {
        return v;
    }
    if (isNumber(min)) {
        if (v < min) return min;
    }
    if (isNumber(max)) {
        if (v > max) return max;
    }

    return v;
}

function trim(str) {

    if (!isString(str)) {
        return str;
    }

    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

function splitWords(str) {
    return trim(str).split(/\s+/);
}

function type(o, t) {
    return Object.prototype.toString.call(o) === '[object ' + t + ']';
}

function isArray(obj) {
    return type(obj, 'Array');
}

function isString(obj) {
    return type(obj, 'String');
}

function isNumber(obj) {
    return type(obj, 'Number');
}

function isFunction(obj) {
    return type(obj, 'Function');
}

function isObject(obj) {
    return type(obj, 'Object');
}

function isEmptyObject(e) {
    if (!isObject(e)) return false;

    for (var t in e) {
        return !1;
    }

    return !0;
}

function validateNumber(num) {
    return !isNaN(Number(num));
}

function mixin(obj, sources) {
    if (isObject(sources)) {
        for (var key in sources) {
            if (isObject(sources[key])) {
                if (!isObject(obj[key])) {
                    obj[key] = {};
                }
                mixin(obj[key], sources[key]);
            } else {
                obj[key] = sources[key];
            }
        }
    }

    return obj;
}

function mixins(obj, sourcesArr) {
    if (isArray(sourcesArr)) {
        sourcesArr.forEach(function (source) {
            mixin(obj, source);
        });
    }

    return obj;
}

function getObjectFromArray(arr, key, value, index) {
    // return arr.filter((i) => i[key] === value)[0];
    if (!arr || !arr.length || !key) return;
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i][key] && arr[i][key] === value) {
            return index ? i : arr[i];
        }
    }
    return undefined;
}

function removeObjectFromArray(arr, key, value) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (value !== undefined && arr[i][key] === value || value === undefined && arr[i] === key) {
            return arr.splice(i, 1);
        }
    }

    return [];
}

function get$$1(dom) {
    return dom && typeof dom === 'string' ? document.getElementById(dom) : dom;
}

function _isDOM1(obj) {
    return obj instanceof HTMLElement;
}

function _isDOM2(obj) {
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

var isDOM = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? _isDOM1 : _isDOM2;

function cloneJsonObject(obj) {
    return isObject(obj) ? JSON.parse(JSON.stringify(obj)) : obj;
}

function merge$1(target, source) {
    var copyObj = {},
        copyFuns = {};

    for (var key in target) {
        if (!isFunction(target[key])) {
            copyObj[key] = target[key];
        } else {
            copyFuns[key] = target[key];
        }
    }
    /*eslint-disable */
    var newObj = mixin(JSON.parse(JSON.stringify(copyObj)), source);
    /*eslint-enable */
    for (var _key in copyFuns) {
        newObj[_key] = copyFuns[_key];
    }

    return newObj;
}

function getPercentage(number, init) {
    return legalNumber(number || init || 0, 0, 1) * 100;
}

function capitalize(str) {
    return isString(str) ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

function reverseCamelcase(n) {
    return n.replace(/[A-Z]/g, function (l) {
        return '-' + l.toLowerCase();
    });
}

function camelize(target) {
    if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
        return target;
    }

    return target.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
}

function unique(array) {
    var r = [];

    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) j = ++i;
        }
        r.push(array[i]);
    }

    return r;
}

function firstUpperCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
        return L.toUpperCase();
    });
}

function isPercentage(num) {
    return isString(num) && num.indexOf('%') > 0 || num >= -1 && num <= 1;
}

function translatePercentage(num) {

    if (isString(num)) {
        var index = num.indexOf('%');

        if (index > 0) {
            return Number(num.substring(0, index)) / 100;
        }

        if (validateNumber(num)) {
            return Number(num);
        }
    }

    return num;
}

function translateNumberToPercentage(num) {
    return num * 100 + '%';
}

function contain(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return i;
        }
    }

    return -1;
}

function throttle(fn, time, context) {
    var lock = null,
        args = null;

    function later() {
        lock = false;
        if (args) {
            wrapperFn.apply(context, args);
            args = false;
        }
    }

    function wrapperFn() {
        if (lock) {
            args = arguments;
        } else {
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
        }
    }

    return wrapperFn;
}

function formatNum(num, digits) {
    var pow = Math.pow(10, digits || 5);

    return Math.round(num * pow) / pow;
}

// 56, 56%, 0, 1, 0.5
function formatNumber(n) {
    if (isNumber(n) && !isNaN(n)) {
        return n;
    }
    if (isString(n)) {
        if (validateNumber(n)) return Number(n);

        return translatePercentage(n);
    }

    return 0;
}

function getCssSize(size, scale) {
    scale = scale || 1;
    if (isString(size)) {
        if (size.indexOf('%') > 0) {
            return size;
        }
        if (size.indexOf('px') > 0) {
            return getPureValue(size) * scale + 'px';
        }
        if (validateNumber(size)) {
            return Number(size) * scale + 'px';
        }
    }
    if (validateNumber(size)) {
        return size * scale + 'px';
    }

    return '0px';
}

function multiplyBy(n, m) {
    n = formatNumber(n);
    m = m || 1;
    if (n === 0 || n < 0) return n;
    if (n <= 1 && n > 0) {
        return m * n;
    }
    if (n > 1) {
        return n;
    }

    return n;
}

function getPureValue(val) {
    if (isString(val) && val.indexOf('px') > 0) {
        val = trim(val);

        return Number(val.substring(0, val.indexOf('px')));
    }

    return val;
}

function formatMargin(margin, scale) {
    scale = scale || 1;
    if (!margin) {
        margin = '0 0';
    }
    if (isString(margin)) {
        var p = splitWords(margin).map(function (m) {
            return getPureValue(m);
        });

        if (isArray(p)) {
            if (p.length === 4) {
                return {
                    top: Number(p[0]) * scale,
                    right: Number(p[1]) * scale,
                    bottom: Number(p[2]) * scale,
                    left: Number(p[3]) * scale
                };
            }
            if (p.length === 2) {
                return {
                    top: Number(p[0]) * scale,
                    right: Number(p[1]) * scale,
                    bottom: Number(p[0]) * scale,
                    left: Number(p[1]) * scale
                };
            }
            if (p.length === 1) {
                margin = Number(margin);
            }
        }
    }
    if (isNumber(margin) && margin >= 0) {
        return {
            top: margin * scale,
            right: margin * scale,
            bottom: margin * scale,
            left: margin * scale
        };
    }

    return null;
}

function _getScaleMargin(margin, scale) {
    scale = scale || 1;
    if (margin && isString(margin)) {
        if (margin.indexOf('%') > 0) {
            return translatePercentage(margin) * 100 + '%';
        }
        if (margin.indexOf('px') > 0) {
            return Number(getPureValue(margin)) * scale + 'px';
        }
    }
    if (validateNumber(margin)) {
        return Number(margin) * scale + 'px';
    }

    return '0px';
}

function formatMargin2(margin, scale) {
    if (!margin) {
        margin = '0 0';
    }
    scale = scale || 1;
    if (validateNumber(margin)) {
        margin = String(margin);
    }
    var p = [];

    if (isString(margin)) {
        p = splitWords(margin);

        if (p.length === 2) {
            p = p.concat([p[0], p[1]]);
        }
        if (p.length === 3) {
            p.push(p[2]);
        }
        if (p.length === 1) {
            p = p.concat([p[0], p[0], p[0]]);
        }
    }

    return p.length === 4 ? {
        top: _getScaleMargin(p[0], scale),
        right: _getScaleMargin(p[1], scale),
        bottom: _getScaleMargin(p[2], scale),
        left: _getScaleMargin(p[3], scale)
    } : null;
}

function distinct(arr) {
    if (isArray(arr)) {
        var loop = function loop(index) {
            if (index >= 1) {
                if (arr[index] === arr[index - 1]) {
                    arr.splice(index, 1);
                }
                loop(index - 1);
            }
        };

        var len = arr.length;

        loop(len - 1);
    }

    return arr;
}

function NullFn() {}

/*eslint-disable*/
function guid() {
    var s = 'xxxyxxxxxxxxyxxxxxxxxxxyxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    return s.toLowerCase();
}
/*eslint-enabel*/

function stampUUID(obj) {
    obj.uuid = obj.uuid || guid();

    return obj.uuid;
}

// 交换数组顺序
var swapArrItems = function swapArrItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

// 移动数组项到最前面
var moveToFirst = function moveToFirst(arr, index) {
    if (arr.length < 2) return;
    arr.unshift(arr.splice(index, 1)[0]);
};

// 移动数组项到最后面
var moveToLast = function moveToLast(arr, index) {
    if (arr.length < 2) return;
    arr.push(arr.splice(index, 1)[0]);
};

function insertToArr(arr, index, target) {
    if (isArray(arr)) {
        arr.splice(index, 0, target);
    }
}



var util = Object.freeze({
	stamp: stamp,
	bind: bind$1,
	extend: extend$1,
	legalNumber: legalNumber,
	trim: trim,
	splitWords: splitWords,
	isArray: isArray,
	isString: isString,
	isNumber: isNumber,
	isFunction: isFunction,
	isObject: isObject,
	isEmptyObject: isEmptyObject,
	validateNumber: validateNumber,
	mixin: mixin,
	mixins: mixins,
	getObjectFromArray: getObjectFromArray,
	removeObjectFromArray: removeObjectFromArray,
	get: get$$1,
	isDOM: isDOM,
	cloneJsonObject: cloneJsonObject,
	merge: merge$1,
	getPercentage: getPercentage,
	capitalize: capitalize,
	reverseCamelcase: reverseCamelcase,
	camelize: camelize,
	unique: unique,
	firstUpperCase: firstUpperCase,
	isPercentage: isPercentage,
	translatePercentage: translatePercentage,
	translateNumberToPercentage: translateNumberToPercentage,
	contain: contain,
	throttle: throttle,
	formatNum: formatNum,
	formatNumber: formatNumber,
	getCssSize: getCssSize,
	multiplyBy: multiplyBy,
	getPureValue: getPureValue,
	formatMargin: formatMargin,
	formatMargin2: formatMargin2,
	distinct: distinct,
	NullFn: NullFn,
	guid: guid,
	stampUUID: stampUUID,
	swapArrItems: swapArrItems,
	moveToFirst: moveToFirst,
	moveToLast: moveToLast,
	insertToArr: insertToArr
});

var NM = 'popo';

/**
 * Enum for system constant
 * @enum
 * @readonly
 */
var CT = {

  /**
   * @const
   * @type {Number}
   * @default
   */
  MIN_LY_COUNT: 1,

  /**
   * Grids system column count
   * @const
   * @type {Number}
   * @default
   */
  COLS: 24,

  /**
   * Grids system row count
   * @const
   * @type {Number}
   * @default
   */
  ROWS: 12,

  /**
   * Panel default zIndex
   * @const
   * @type {Number}
   * @default
   */
  PANEL_DEFAULT_ZINDEX: 1,

  NAME: NM,

  POPO: 'data-' + NM,

  ROLE: 'data-' + NM + '-role',

  TARGET: 'data-' + NM + '-target',

  COMPONENT_ID_KEY: 'data-' + NM + '-id',

  EXT_PANE: NM + '-ext-pane',

  PANE: 'pane',

  CONTAINER: 'container',

  PANEL: 'panel',

  PANEL_CONTAINER: 'panel-container',

  WRAP: 'wrap',

  GRID_L_C_R: 'lcr',

  GRID_HEAD: 'head',

  GRID_CENTER: 'center',

  GRID_LEFT: 'left',

  GRID_RIGHT: 'right',

  GRID_FOOT: 'foot',

  SINGLE_ROW: NM + '-s-row',

  ROW: NM + '-row',

  COL: NM + '-col',

  INFO: NM + '-dev-info',

  GUIDELINES: NM + '-guideline',

  PANEL_GUIDELINES: NM + '-panel-guideline',

  SPLITLINES: NM + '-splitline',

  ZOOMPANE: 'zoom-pane',

  ZOOMCONTAINER: 'zoom-container',

  ATTRIBUTTION: NM + '-attribution',

  ZOOMIN: NM + '-ct-zoom-in',

  ZOOMOUT: NM + '-ct-zoom-out',

  ZOOMINFO: NM + '-ct-zoom-info',

  TPL: 'data-' + NM + '-tpl',

  DRAW_ID_KEY: NM + '-ts',

  LINE: 'l',

  PATH: 'p',

  CIRCLE: 'c',

  FILTER: 'f',

  MARKER: 'm',

  LINER_GRADIENT: 'lg',

  RADIAL_GRADIENT: 'rg',

  BORDER: 'b',

  EVENT: '_' + NM + '_event'

};

function testProp(props) {
    var style = document.documentElement.style;

    for (var i = 0; i < props.length; i++) {
        if (props[i] in style) {
            return props[i];
        }
    }

    return false;
}

/*eslint-disable */
var TRANSFORM = testProp(['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

var TRANSITION = testProp(['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

var TRANSITION_END = TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';

/*eslint-enable */

function getClass(el) {
    if (!isDOM(el)) return null;

    return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}

function hasClass$1(el, name) {
    if (!isDOM(el) && !name) return false;
    if (el.classList !== undefined) {
        return el.classList.contains(name);
    }
    var className = getClass(el);

    /*eslint-disable */
    return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    /*eslint-enable */
}

function setClass(el, name) {
    if (el.className.baseVal === undefined) {
        el.className = name;
    } else {
        el.className.baseVal = name;
    }
}

function addClass$1(el, name) {
    if (!isDOM(el) || !name) return;
    if (el.classList !== undefined) {
        var classes = splitWords(name);

        for (var i = 0, len = classes.length; i < len; i++) {
            el.classList.add(classes[i]);
        }
    } else if (!hasClass$1(el, name)) {
        var className = getClass(el);

        setClass(el, (className ? className + ' ' : '') + name);
    }
}

function removeClass$1(el, names) {
    if (!isDOM(el) || !names) return;
    names = splitWords(names);
    names.forEach(function (name) {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        } else {
            var cls = getClass(el);

            setClass(el, trim((' ' + cls + ' ').replace(' ' + name + ' ', ' ')));
        }
    });
}

function setStyle(dom, styles, addOn) {
    if (!isDOM(dom) || isEmptyObject(styles)) return;
    for (var key in styles) {
        var _key = key;

        if (addOn && _key) {
            _key = camelize(_key);
            _key = testProp([_key, 'webkit' + _key, 'moz' + _key, 'ms' + _key, 'o' + _key]);
        }
        if (_key && styles[_key] !== null && styles[_key] !== undefined) {
            dom.style[_key] = styles[_key];
        }
    }
}

function css$1(el, styles) {

    if (isDOM(el) && styles) {
        if (isString(styles)) {
            return getStyle(el, reverseCamelcase(styles));
        }
        if (!isEmptyObject(styles)) {
            setStyle(el, styles, true);

            return undefined;
        }
    }

    return undefined;
}

function create$1(tag, classnames, styles, container) {
    var el = document.createElement(tag || 'div');

    if (classnames) {
        addClass$1(el, classnames);
    }
    if (isObject(styles)) {
        css$1(el, styles);
    }
    if (isDOM(container)) {
        container.appendChild(el);
    }

    return el;
}

function html$1(el, html) {
    if (isDOM(el)) {
        if (isString(html)) {
            el.innerHTML = html;
        }
        if (html && isDOM(html)) {
            el.appendChild(html);
        }
        if (html === undefined) {
            return el.innerHTML;
        }
    }
}

function isHidden$1(el) {
    return isDOM(el) && getStyle(el, 'display') === 'none';
}

function addHStyle(css) {
    if (!isString(css)) return;
    var head = document.querySelector('head');

    if (head) {
        var oldStyle = head.querySelector('style');

        if (oldStyle) {
            oldStyle.innerHTML += css;
        } else {
            var style = document.createElement('style'),
                node = document.querySelector('link');

            style.type = 'text/css';
            style.innerHTML = css;

            if (node) {
                head.insertBefore(style, node);
            } else {
                head.appendChild(style);
            }
        }
    }
}

function removeByClass(classname, container) {
    Array.prototype.forEach.call((container || document).querySelectorAll('.' + classname), function (el) {
        if (isDOM(el)) el.parentNode.removeChild(el);
    });
}

function removeByRole(attr, container) {
    Array.prototype.forEach.call((container || document).querySelectorAll('[' + CT.ROLE + '="' + attr + '"]'), function (el) {
        if (isDOM(el)) el.parentNode.removeChild(el);
    });
}

function query(el, filter) {
    return isDOM(el) && filter && el.querySelector(filter);
}

function eachChild(parent, fn, context) {
    if (isDOM(parent)) {
        fn = bind$1(fn, context);
        Array.prototype.forEach.call(parent.childNodes, function (node) {
            if (isFunction(fn) && fn(node) === false) {
                return;
            }
        });
    }
}

function attr$1(el, name, value) {
    if (isDOM(el)) {
        if (name !== undefined) {
            if (value !== undefined) {
                el.setAttribute(name, value);
            } else {
                return el.getAttribute(name);
            }
        }
    }

    return undefined;
}

function getStyle(dom, key) {
    if (dom && isDOM(dom)) {
        if (dom.currentStyle) {
            return dom.currentStyle[key];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(dom, null)[key];
        }
    }

    return null;
}

function getPureStyle(dom, key) {
    if (dom) {
        var style = getStyle(dom, key);

        if (isString(style)) {
            if (style.indexOf('px') > 0) {
                return Number(style.substring(0, style.length - 2));
            }
            if (validateNumber(style)) {
                return Number(style);
            }
        }
    }

    return 0;
}

function getRect(el) {
    return isDOM(el) ? el.getBoundingClientRect() : null;
}

function getTargetDataId(el) {
    if (isDOM(el)) {
        var id = el.getAttribute(CT.COMPONENT_ID_KEY);

        if (Number(id) > 0) {
            return id;
        }
    }
    if (isObject(el)) {
        if (el.getId) {
            return el.getId();
        }
        if (el.id) {
            return el.id;
        }
    }

    return el;
}

/*eslint-disable */
function createPublicStyle() {
    var css = '/* PoPo Public Style */\n    div[' + CT.POPO + '] {display:none}\n    div[' + CT.TARGET + '] {width:100%;height:100%;}\n    div[' + CT.ROLE + '], div[' + CT.ROLE + ']:after,div[' + CT.ROLE + ']:before{box-sizing: border-box;}\n    div[data-popo-role=' + CT.PANE + ']{transform-origin: 0 0;-ms-transform-origin: 0 0;-webkit-transform-origin: 0 0;}\n    div[data-popo-role=' + CT.GRID_L_C_R + ']{zoom:1;position:relative;}\n    div[data-popo-role=' + CT.GRID_L_C_R + ']:after{content:\'\';display:block;clear:both;height:0;}\n    div[data-popo-role=' + CT.GRID_LEFT + '],div[data-popo-role=' + CT.GRID_CENTER + '],div[data-popo-role=' + CT.GRID_RIGHT + ']{float:left;position:relative;}\n    div[data-popo-role=' + CT.GRID_FOOT + '],div[data-popo-role=' + CT.GRID_HEAD + '] {position:relative;}\n    .' + CT.INFO + ', .' + CT.EXT_PANE + '{position:absolute;z-index:100;box-sizing:border-box;}\n    .' + CT.EXT_PANE + ' *{box-sizing:border-box;}\n    .' + CT.EXT_PANE + '{border:2px solid rgba(0,0,0,0.2);border-radius: 2px;overflow:hidden;}\n    .' + CT.EXT_PANE + ' a, .' + CT.EXT_PANE + ' span{font: bold 18px \'Lucida Console\', Monaco, monospace;width:30px;height:30px;text-align:center;display:block;border-bottom:1px solid #bbb;line-height:30px;color:#333;background-color:#ffffff;text-decoration:none;outline:none;}\n    .' + CT.EXT_PANE + ' a:hover{background-color:#f2f2f2;}\n    .' + CT.EXT_PANE + ' span{font-size:11px;}\n    .' + CT.NAME + '-grab {cursor:-webkit-grab;cursor:-moz-grab;cursor:grab;}\n    .' + CT.NAME + '-grabbing {cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing;}\n    ';

    addHStyle(css);
}
/*eslint-enable */

createPublicStyle();

var dom = Object.freeze({
	testProp: testProp,
	TRANSFORM: TRANSFORM,
	TRANSITION: TRANSITION,
	TRANSITION_END: TRANSITION_END,
	getClass: getClass,
	hasClass: hasClass$1,
	setClass: setClass,
	addClass: addClass$1,
	removeClass: removeClass$1,
	setStyle: setStyle,
	css: css$1,
	create: create$1,
	html: html$1,
	isHidden: isHidden$1,
	removeByClass: removeByClass,
	removeByRole: removeByRole,
	query: query,
	eachChild: eachChild,
	attr: attr$1,
	getStyle: getStyle,
	getPureStyle: getPureStyle,
	getRect: getRect,
	getTargetDataId: getTargetDataId,
	createPublicStyle: createPublicStyle
});

var ua = navigator.userAgent.toLowerCase();
var doc = document.documentElement;
var width = window.innerWidth || doc.clientWidth || document.body.clientWidth;
var height = window.innerHeight || doc.clientHeight || document.body.clientHeight;
var ie = 'ActiveXObject' in window;
var webkit = ua.indexOf('webkit') !== -1;
var mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1;

var Browser = {

    ie: ie,

    width: width,

    height: height,

    aspectRatio: width / height,

    webkit: webkit,

    mobile: mobile

};

/*eslint-disable*/
var eventsKey = CT.EVENT;
var wheelPxFactor = Browser.win && Browser.chrome ? 2 * window.devicePixelRatio : Browser.gecko ? window.devicePixelRatio : 1;
/*eslint-enable*/

function addOne(obj, type, fn, context) {
    if (!obj) return null;
    function handler(e) {
        return fn.call(context || obj, e || window.event);
    }

    var id = type + stamp(fn) + (context ? '{_' + stamp(context) + '}' : '');

    if (obj[eventsKey] && obj[eventsKey][id]) {
        return this;
    }

    if ('addEventListener' in obj) {
        obj.addEventListener(type, handler, false);
    } else if ('attachEvent' in obj) {
        obj.attachEvent('on{$type}', handler);
    }

    obj[eventsKey] = obj[eventsKey] || {};
    obj[eventsKey][id] = handler;

    return null;
}

function removeOne(obj, type, fn, context) {
    if (!obj) return null;
    var id = type + stamp(fn) + (context ? '{_' + stamp(context) + '}' : ''),
        handler = obj[eventsKey] && obj[eventsKey][id];

    if (!handler) {
        return this;
    }

    if ('removeEventListener' in obj) {
        obj.removeEventListener(type, handler, false);
    } else if ('detachEvent' in obj) {
        obj.detachEvent('on' + type, handler);
    }
    obj[eventsKey][id] = null;

    return null;
}

function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (e.originalEvent) {
        e.originalEvent._stopped = true;
    } else {
        e.cancelBubble = true;
    }

    return this;
}

function preventDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }

    return this;
}

function stop(e) {
    preventDefault(e);
    stopPropagation(e);

    return this;
}

function on(obj, types, fn, context) {
    if (obj && types) {
        types = splitWords(types);
        for (var i = 0, len = types.length; i < len; i++) {
            addOne(obj, types[i], fn, context);
        }
    }

    return this;
}

function off(obj, types, fn, context) {
    if (obj) {
        if (types) {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
                removeOne(obj, types[i], fn, context);
            }
        } else {
            for (var j in obj[eventsKey]) {
                removeOne(obj, j, obj[eventsKey][j]);
            }
            delete obj[eventsKey];
        }
    }
}

/*eslint-disable */
function getWheelDelta(e) {
    return Browser.edge ? e.wheelDeltaY / 2 // Don't trust window-geometry-based delta
    : e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor // Pixels
    : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 // Lines
    : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 // Pages
    : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 // Legacy IE pixels
    : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 // Legacy Moz lines
    : e.detail ? e.detail / -32765 * 60 // Legacy Moz pages
    : 0;
}
/*eslint-enable */

var dom_event = Object.freeze({
	stopPropagation: stopPropagation,
	preventDefault: preventDefault,
	stop: stop,
	on: on,
	off: off,
	getWheelDelta: getWheelDelta
});

var ERROR_MSG = {

    POPO_EXSIT: 'The target container has been initialized by popo.',

    CONTAINER_ERR: 'The target container was not found',

    LY_INVALID: 'Layout array is invalid.',

    LY_FIXED_LESS: 'Fixed height and fixed width shall not be less than 1 at the same time.'

};

/**
 * @class VNode
 * @ignore
 */

var VNode = function () {

    /**
     * @constructor
     * @param {String} nodeName node TagName
     */
    function VNode(nodeName) {
        classCallCheck(this, VNode);

        this.nodeName = nodeName || 'div';
        this.width = 0;
        this.height = 0;
        this.classNames = '';
        this.children = [];
        this.styles = {};
        this.parentNode = null;
        this.html = '';
        this.role = '';
        this.isExtend = false;
        stamp(this);
    }

    /**
     * Add class
     * @param {String} name classname
     * @return {VNode} current vnode instance
     */


    createClass(VNode, [{
        key: 'addClassName',
        value: function addClassName(name) {
            var _this = this;

            if (isString(name)) {
                if (this.classNames === '') {
                    this.classNames = name;

                    return this;
                }
                var cns = splitWords(this.classNames);

                splitWords(name).forEach(function (n) {
                    var inner = contain(cns, n);

                    if (inner < 0) {
                        _this.classNames += ' ' + n;
                    }
                });
            }

            return this;
        }

        /**
         * remove class name
         * @param {String} name classname
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'removeClassName',
        value: function removeClassName(name) {
            if (isString(name)) {
                var cns = splitWords(this.classNames),
                    inner = contain(cns, name);

                if (inner >= 0) {
                    cns[inner] = '';
                    this.classNames = cns.join(' ');
                }
            }

            return this;
        }

        /**
         * Clear node class
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'clearClassName',
        value: function clearClassName() {
            this.classNames = '';

            return this;
        }

        /**
         * Clear current class and set new class
         * @param {String} classname classname
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setClassName',
        value: function setClassName(classname) {
            if (classname && isString(classname)) {
                this.classNames = classname;
            }

            return this;
        }

        /**
         * Get child
         * @param {Number|String} id id
         * @return {VNode} vnode
         */

    }, {
        key: 'getChild',
        value: function getChild(id) {
            if (!isNumber(id)) {
                id = Number(id);
            }
            if (!isNaN(id) && id > 0) {
                return getObjectFromArray(this.children, CT.COMPONENT_ID_KEY, id);
            }

            return null;
        }

        /**
         * Set node role
         * @param {String} role node role.
         * @return {VNode} vnode
         */

    }, {
        key: 'setRole',
        value: function setRole(role) {
            this.role = role;

            return this;
        }

        /**
         * Get node role
         * @return {String} role
         */

    }, {
        key: 'getRole',
        value: function getRole() {
            return this.role;
        }

        /**
         * Query child by role
         * @param {String} role node role
         * @return {VNode} node
         */

    }, {
        key: 'queryByRole',
        value: function queryByRole(role) {
            var result = null;

            function _query(vnode) {
                if (vnode && vnode.children.length > 0) {
                    vnode.children.forEach(function (node) {
                        if (node.role === role) {
                            result = node;

                            return;
                        }
                        _query(node);
                    });
                }

                return result;
            }

            return _query(this);
        }

        /**
         * Set node id
         * @param {String} id id
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setId',
        value: function setId(id) {
            this[CT.COMPONENT_ID_KEY] = id;

            return this;
        }

        /**
         * Get vnode id
         * @return {Number} id
         */

    }, {
        key: 'getId',
        value: function getId() {
            return this[CT.COMPONENT_ID_KEY];
        }

        /**
         * Set width
         * @param {Number} width width
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setWidth',
        value: function setWidth(width) {
            this.width = width;

            return this;
        }

        /**
         * Set Height
         * @param {Number} height height
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setHeight',
        value: function setHeight(height) {
            this.height = height;

            return this;
        }

        /**
         * Get node width
         * @return {Number} width
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Get node height
         * @return {Number} height
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Set margin
         * @param {Number} margin margin
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setMargin',
        value: function setMargin(margin) {
            this.margin = margin;

            return this;
        }

        /**
         * Get margin
         * @return {Number} margin
         */

    }, {
        key: 'getMargin',
        value: function getMargin() {
            return this.margin;
        }

        /**
         * Get px size
         * @ignore
         * @param {Number|String} size size
         * @return {String} size
         */

    }, {
        key: '_getSize',
        value: function _getSize(size) {
            return isNumber(size) ? formatNum(size, 5) + 'px' : size;
        }

        /**
         * Set styles
         * @param {Object} styles styles
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setStyle',
        value: function setStyle$$1(styles) {
            mixin(this.styles, styles);

            return this;
        }

        /**
         * Set top
         * @param {Number} top top
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setTop',
        value: function setTop(top) {
            this.top = top;

            return this;
        }

        /**
         * Get top
         * @return {Number} top
         */

    }, {
        key: 'getTop',
        value: function getTop() {
            return this.top;
        }

        /**
         * Set left
         * @param {Number} left left
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setLeft',
        value: function setLeft(left) {
            this.left = left;

            return this;
        }

        /**
         * Get left
         * @return {Number} left
         */

    }, {
        key: 'getLeft',
        value: function getLeft() {
            return this.left;
        }

        /**
         * Insert to parent vnode
         * @param {VNode} parent parent vnode
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'insertTo',
        value: function insertTo(parent) {
            if (parent && parent.children) {
                parent.children.push(this);
                this.parentNode = parent;
            }

            return this;
        }

        /**
         * Add child vnode
         * @param {VNode} son child vnode
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'addNode',
        value: function addNode(son) {
            if (son) {
                this.children.push(son);
                son.parentNode = this;
            }

            return this;
        }

        /**
         * Remove child
         * @param {VNode} node child vnode
         */

    }, {
        key: 'removeNode',
        value: function removeNode(node) {
            if (isObject(node)) {
                if (node && node._popo_id && this.children.length > 0) {
                    removeObjectFromArray(this.children, '_popo_id', node._popo_id);
                }
            }
        }

        /**
         * Remove All Child
         */

    }, {
        key: 'clear',
        value: function clear() {
            if (this.children && this.children.length > 0) {
                this.children.forEach(function (node) {
                    node.remove();
                });
                this.children = [];
            }
        }

        /**
         * Remove instance
         */

    }, {
        key: 'remove',
        value: function remove() {
            var that = this;

            if (this.parentNode) {
                this.parentNode.removeNode(that);
            }
            if (isDOM(this.realDom)) {
                this.realDom.parentNode.removeChild(this.realDom);
                this.realDom = null;
            }
            this.width = 0;
            this.height = 0;
            this.top = 0;
            this.left = 0;
            this.classNames = '';
            this.styles = {};
            if (this.children && this.children.length > 0) {
                this.children.forEach(function (node) {
                    node.remove();
                });
                this.children = [];
            }
            this.parentNode = null;
        }

        /**
         * Render current vnode
         * @param {HTMLElement} node node
         * @return {HTMLElement} node
         */

    }, {
        key: 'render',
        value: function render(node) {
            if (!node) return node;

            var realDomClass = attr$1(node, 'class'),
                cls = realDomClass ? unique(splitWords(realDomClass).concat(splitWords(this.classNames))).join(' ') : this.classNames;

            if (cls) {
                attr$1(node, 'class', cls);
            }

            var w = this.width,
                h = this.height;

            // if (this.styles.width === undefined || this.styles.width === null) {
            this.setStyle({
                width: w ? this._getSize(w) : '100%',
                height: h ? this._getSize(h) : '100%'
            });
            // }

            // if (this.styles.height === undefined || this.styles.height === null) {
            // this.setStyle({
            //     height: h ? this._getSize(h) : '100%',
            // });
            // }

            if (this.top !== undefined) {
                this.setStyle({ top: this._getSize(this.top) });
            }

            if (this.left !== undefined) {
                this.setStyle({ left: this._getSize(this.left) });
            }

            if (this.margin !== undefined) {
                this.setStyle({ margin: this._getSize(this.margin) });
            }

            if (!isEmptyObject(this.styles)) {
                css$1(node, this.styles);
            }

            if (this[CT.COMPONENT_ID_KEY]) {
                attr$1(node, CT.COMPONENT_ID_KEY, this[CT.COMPONENT_ID_KEY]);
            }

            if (this.role) {
                attr$1(node, 'data-popo-role', this.role);
            }

            if (this.id) {
                node.id = this.id;
            }

            if (this.html) {
                node.innerHTML = this.html;
            }

            return node;
        }

        /**
         * Set node innerHTML
         * @param {String} html html
         * @return {VNode} current vnode instance
         */

    }, {
        key: 'setHtml',
        value: function setHtml(html$$1) {
            if (html$$1 && isString(html$$1)) {
                this.html = html$$1;
            }

            return this;
        }

        /**
         * Update vnode
         */

    }, {
        key: 'update',
        value: function update() {
            var realDom = this.realDom;

            if (realDom) {
                this.render(realDom);
                this.children.forEach(function (vnode) {
                    vnode.update();
                });
            }
        }

        /**
         * Create Html element
         * @return {HTMLElement} node
         */

    }, {
        key: 'createElement',
        value: function createElement() {
            var node = this.realDom || document.createElement(this.nodeName);

            /*eslint-disable */
            node._popo_id = this._popo_id;
            /*eslint-enable */

            this.render(node);
            this.children.forEach(function (c) {
                node.appendChild(c.createElement());
            });

            this.realDom = node;
            node.vnode = this;

            return node;
        }

        /**
         * Get last child
         * @return {Vnode} vnode
         */

    }, {
        key: 'getLastChild',
        value: function getLastChild() {
            var c = this.children,
                len = c.length;

            return len > 0 ? c[len - 1] : c[0];
        }

        /**
         * Get new Id
         * @return {Number} id
         */

    }, {
        key: 'getNewId',
        value: function getNewId() {
            var lastChild = this.getLastChild();

            return lastChild ? lastChild.getId() + 1 : 1;
        }
    }]);
    return VNode;
}();

function sumArrFirst(arr) {
    var sum = 0;

    if (isArray(arr)) {
        arr.forEach(function (a) {
            if (isNumber(a)) {
                sum += a;
            }
            if (isArray(a) && isNumber(a[0])) {
                sum += a[0];
            }
        });
    }

    return sum;
}

function sumItem(o) {
    var sum = sumArr(o);

    return sum <= 0 ? sumArrFirst(o) : sum;
}

function sumArr(arr) {
    var sum = 0;

    if (isArray(arr)) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (isNumber(arr[i])) {
                sum += arr[i];
            } else {
                return -1;
            }
        }
    }

    return sum;
}

function validateAllLy(ly, rows, cols, startType) {
    var great = true;
    var firstCount = startType === 'row' ? rows : cols;

    function validateCore(arr, type) {
        // const count = type == 'row' ? (startType === 'row' ? cols : rows) : (startType === 'row' ? rows : cols);
        var count = type === 'row' ? cols : rows;

        if (!isArray(arr) && !isArray(arr[1])) return;
        if (sumItem(arr[1]) > count) {
            great = false;
        }
        if (isArray(arr[1])) {
            arr[1].forEach(function (a) {
                if (isArray(a)) {
                    validateCore(a, type === 'row' ? 'col' : 'row');
                }
            });
        }
    }

    if (sumArrFirst(ly) > firstCount) {
        great = false;
    } else {
        for (var i = 0, len = ly.length; i < len; i++) {
            validateCore(ly[i], startType);
        }
    }

    return great;
}

function initSize(rows, cols) {
    if (!rows || !cols) return null;
    var unitRow = 100 / rows,
        unitCol = 100 / cols,
        sizes = {};

    for (var i = 1; i <= rows; i++) {
        sizes[CT.SINGLE_ROW + '-' + i] = (unitRow * i).toFixed(5);
    }
    for (var _i = 1; _i <= cols; _i++) {
        sizes[CT.COL + '-' + _i] = (unitCol * _i).toFixed(5);
    }

    return sizes;
}

/**
 * Validate layout number
 * @param {Number} num number
 * @param {Number} end end
 * @param {Number} cols cols
 * @param {Number} rows rows
 * @return {Boolean} validate result
 */
function validateLayoutNumber(num, end, cols, rows) {
    return isNumber(num) && num >= 1 && num <= (end || Math.max(cols, rows));
}

/**
 * Get layout wrap count
 * @param {Array} layouts layout
 * @param {Number} cols cols
 * @param {Number} rows rows
 * @return {Number} layout wrap count
 */
function getLayoutWrapCount(layouts, cols, rows) {
    var count = 0;

    for (var i = 0, len = layouts.length; i < len; i++) {
        var start = layouts[i][0];

        if (!validateLayoutNumber(start, null, cols, rows)) {
            return 0;
        }
        count += start;
    }

    return count;
}

/**
 * Validate layout.
 * @param {Array} layouts layout array
 * @param {Number} cols column count
 * @param {Number} rows row count
 * @return {Boolean} valite layout result
 */
function validateLayout(layouts, cols, rows) {
    if (!layouts || !layouts.length) return false;
    var count = getLayoutWrapCount(layouts, cols, rows);

    if (!count) {
        throw new Error(ERROR_MSG.LY_INVALID);
    }

    return true;
}

function getRowClassName(row, rows) {
    return row < 0 ? CT.SINGLE_ROW + '-' + rows : CT.SINGLE_ROW + '-' + row;
}

/*eslint-disable */
function getColClassName(col, hasRow) {
    return col < 0 ? hasRow ? ' ' + CT.ROW : '' : CT.COL + '-' + col + (hasRow ? ' ' + CT.ROW : '');
}
/*eslint-enable*/

function generateEvLy(rows, cols, rowNumber, colNumber) {
    rowNumber = Math.floor(rows / legalNumber(rowNumber, 1, rows)) || 1;
    colNumber = Math.floor(cols / legalNumber(colNumber, 1, cols)) || 1;

    var result = new Array(Math.floor(rows / rowNumber)),
        colsLength = Math.floor(cols / colNumber);

    for (var i = 0; i < result.length; i++) {
        result[i] = [rowNumber, []];
        for (var j = 0; j < colsLength; j++) {
            result[i][1].push(colNumber);
        }
    }

    return result;
}

function newVNode(parent, classNames, setId, type) {
    var node = new VNode().addClassName(classNames).insertTo(parent);

    node.type = type;

    if (setId) {
        node.setRole(CT.PANEL);
        // .addClassName(CT.PANEL);
    }

    return node;
}

function removeUnused(vc, panels) {
    function selectPanel(vnode) {
        var nodes = vnode.children;

        nodes.forEach(function (node) {
            if (node.role === CT.PANEL) {
                panels.push(node);
                node.setId(panels.length);
            }
            if (node.children.length > 0) {
                selectPanel(node);
            }
        });
    }

    selectPanel(vc);
}

function newLy(layout, type, vc, rows, cols) {
    type = type || 'row';
    var parent = layout[0],
        childrens = layout[1];

    var vparentNode = null,
        classname = '';

    if (validateLayoutNumber(parent, null, cols, rows)) {
        classname = type === 'col' ? getColClassName(parent, true) : getRowClassName(parent, rows);
        vparentNode = newVNode(vc, classname, false, type === 'col' ? 'col' : 'row', parent);
    }
    if (!vparentNode) return;

    if (validateLayoutNumber(childrens, null, cols, rows)) {
        newVNode(vparentNode, classname, true, type);
    } else if (isArray(childrens)) {
        childrens.forEach(function (c) {
            if (validateLayoutNumber(c, null, cols, rows)) {
                classname = type === 'col' ? getRowClassName(c, rows) : getColClassName(c, true);
                newVNode(vparentNode, classname, true, type === 'col' ? 'row' : 'col', c);
            } else if (isArray(c)) {
                newLy(c, type === 'col' ? 'row' : 'col', vparentNode, rows, cols);
            }
        });
    } else if (!childrens) {
        classname = type === 'col' ? getColClassName(-1, true) : getRowClassName(-1, rows);
        newVNode(vparentNode, classname, true, type === 'col' ? 'row' : 'col', -1);
    }
}

function updateVnodeSize(vc, sizes, options, container) {
    if (!vc || !sizes || !options) return;

    var keys = Object.keys(sizes).join(','),
        gutter = options.gutter,
        freeLy = options.freeLy;

    var fixedHeight = options.fixedHeight || 0,
        fixedWidth = options.fixedWidth || 0;

    if (fixedHeight > 0) {
        fixedHeight = legalNumber(fixedHeight, 0.01);
    }
    if (fixedWidth > 0) {
        fixedWidth = legalNumber(fixedWidth, 0.01);
    }

    function setSize(vnode) {
        var nodes = vnode.children;

        nodes.forEach(function (node) {
            node.classNames.split(' ').forEach(function (cls) {
                cls = trim(cls);
                if (keys.indexOf(cls) >= 0) {
                    if (cls.indexOf('-col-') >= 0) {
                        node.setWidth(sizes[cls]);

                        return;
                    }
                    if (cls.indexOf('-row-') >= 0) {
                        node.setHeight(sizes[cls]);

                        return;
                    }
                }
            });
            if (node.children.length > 0) {
                setSize(node);
            }
        });
    }
    setSize(vc);

    function updateFixedSize(node) {
        if (fixedHeight > 0 && !fixedWidth) {
            node.height = fixedHeight > 1 ? fixedHeight : node.width * fixedHeight + gutter * (1 - fixedHeight);
        }
        if (fixedWidth > 0 && !fixedHeight) {
            node.width = fixedWidth > 1 ? fixedWidth : node.height * fixedWidth + gutter * (1 - fixedWidth);
        }
        if (fixedHeight > 1 && fixedWidth > 1) {
            node.height = fixedHeight;
            node.width = fixedWidth;
        }
    }

    function updateRealsize(vnode) {
        var nodes = vnode.children;

        nodes.forEach(function (node) {
            if (node.width !== 0) {
                node.width = Number(vnode.width * node.width / 100);
            }
            if (node.height !== 0) {
                node.height = freeLy && freeLy.col === 1 ? vnode.height : Number(vnode.height * node.height / 100);
            }
            if (node.width === 0 && vnode.width !== 0) {
                node.width = Number(vnode.width);
            }
            if (node.height === 0 && vnode.height !== 0) {
                node.height = Number(vnode.height);
            }
            updateFixedSize(node);
            if (node.children.length > 0) {
                updateRealsize(node);
            }
        });
    }
    /*eslint-disable */
    var padding = options.padding,
        paddingLeft = padding.left + padding.right,
        paddingTop = padding.top + padding.bottom;

    var width = options.width,
        height = options.height;
    /*eslint-enable */

    if ((!width || !height) && container) {
        var target = container.parentNode || container,
            ch = target.clientHeight,
            cw = target.clientWidth,
            rect = getRect(target),
            th = ch / rect.height > 1 ? ch : rect.height,
            tw = cw / rect.width > 1 ? cw : rect.width;

        if (width === 0) {
            container._origionWidth = width = tw;
        }
        if (height === 0) {
            container._origionHeight = height = th;
        }
    }

    setStyle(container, {
        width: width + 'px'
        // height: `${height}px`,
    });
    // container.setWidth(width).setHeight(height);

    width -= paddingLeft;
    height -= paddingTop;

    vc.children.forEach(function (node) {
        if (node.width !== 0) {
            node.width = width * Number(node.width) / 100;
        }
        if (node.height !== 0) {
            node.height = height * Number(node.height) / 100;
        }
        if (node.width === 0) {
            node.width = width;
        }
        if (node.height === 0) {
            node.height = height;
        }

        updateRealsize(node);
        var child = node.children[0];

        if (child) {
            if (fixedHeight > 0) {
                node.height = child.height;
            }
            if (fixedWidth > 0) {
                node.width = child.width;
            }
        }
    });

    vc.setWidth(width).setHeight(height);
    if (fixedHeight > 0) {
        if (fixedHeight <= 1) {
            fixedHeight = vc.children[0].height;
        }
        var fixedTotalHeight = fixedHeight * options.layout.length;

        vc.setHeight(fixedTotalHeight);
        container._origionHeight = fixedTotalHeight;
    }

    if (fixedWidth > 0) {
        if (fixedWidth <= 1) {
            fixedWidth = vc.children[0].width;
        }
        var length = 0;

        if (options.layoutStartType === 'row') {
            length = options.layout[0][1].length;
        } else {
            length = options.layout.length;
        }

        var fixedTotalWidth = fixedWidth * length;

        vc.setWidth(fixedTotalWidth);
        container._origionWidth = fixedTotalWidth;
    }
}

function updateAbs(vc, o, panels) {
    if (!vc || !o || !panels) return;
    var _step = 0;

    vc.children.forEach(function (node) {
        if (node.type === 'row') {
            node.left = 0;
            node.top = _step;
            _step += node.height;
        }
        if (node.type === 'col') {
            node.top = 0;
            node.left = _step;
            _step += node.width;
        }
    });

    _step = 0;
    panels.forEach(function (node) {
        if (node.type === 'row') {
            node.left = 0;
            node.top = _step;
            _step += node.height;
        }
        if (node.type === 'col') {
            node.top = 0;
            node.left = _step;
            _step += node.width;
        }
    });

    function setAbs(vnode) {
        var nodes = vnode.children;
        var step = vnode.type === 'row' ? vnode.left : vnode.top;

        nodes.forEach(function (node) {
            if (node.type === 'row' && vnode.type === 'col') {
                node.left = vnode.left;
                node.top = step;
                step += node.height;
            }
            if (node.type === 'col' && vnode.type === 'row') {
                node.top = vnode.top;
                node.left = step;
                step += node.width;
            }
            if (node.children.length > 0) {
                setAbs(node);
            }
        });
    }

    vc.children.forEach(function (node) {
        setAbs(node);
    });

    var gutter = o.gutter;

    panels.forEach(function (panel) {
        panel.setWidth(panel.width - gutter).setHeight(panel.height - gutter).setTop(formatNum(panel.top + gutter * 0.5, 5)).setLeft(formatNum(panel.left + gutter * 0.5, 5)).clearClassName().setRole(CT.PANEL).setStyle({
            position: 'absolute',
            zIndex: CT.PANEL_DEFAULT_ZINDEX
        });
        panel.parentNode = null;
    });

    vc.children = panels;
    vc.children.forEach(function (node) {
        node.parentNode = vc;
    });
    panels = null;
}

function initLayoutSet(o) {
    var ly = o.layout,
        gutter = o.gutter,
        rows = legalNumber(o.rows, CT.MIN_LY_COUNT),
        cols = legalNumber(o.cols, CT.MIN_LY_COUNT);
    var startType = o.layoutStartType,
        _ly = ly;

    if (isString(ly) && ly.toLocaleLowerCase() === 'whole') {
        _ly = [[rows]];
    }

    if (isArray(ly)) {
        if (ly.length === 0) {
            _ly = [[rows]];
        }
        _ly = ly.map(function (n) {
            if (isNumber(n)) {
                n = [n];
            }

            return n;
        });
    }

    if (isObject(ly)) {
        var fh = legalNumber(ly.height, 0),
            fw = legalNumber(ly.width, 0);

        _ly = generateEvLy(rows, cols, ly.rows, ly.cols);

        if (fh || fw) {
            if (fh > 1 && fw > 0 && fw <= 1) {
                fw = fh * fw;
            }
            if (fh > 0 && fh <= 1 && fw > 1) {
                fh = fw * fh;
            }
            if (fw > 1) {
                fw += gutter;
            }
            if (fh > 1) {
                fh += gutter;
            }
            if (fh > 0 && fh <= 1 && fw > 0 && fw <= 1) {
                throw new Error(ERROR_MSG.LY_FIXED_LESS);
            }
        }

        o.fixedHeight = fh;
        o.fixedWidth = fw;
        o.freeLy = {
            col: ly.cols || o.cols,
            row: ly.rows || o.rows,
            fh: fh,
            fw: fw
        };
        o.layoutStartType = startType = 'row';
    }

    if (_ly && !validateAllLy(_ly, rows, cols, startType)) {
        throw new Error(ERROR_MSG.LY_INVALID);
    }

    o.layout = _ly;

    return true;
}

function initLayout(o, vc) {
    if (!o || !vc || !o.layout) return false;
    var lys = o.layout,
        cols = o.cols,
        rows = o.rows,
        type = o.layoutStartType;

    if (!validateLayout(lys, cols, rows)) return false;

    lys.forEach(function (ly) {
        newLy(ly, type, vc, rows, cols);
    });

    return true;
}

function updateLayout(vc, c, sizes, options, panels) {
    updateVnodeSize(vc, sizes, options, c);
    removeUnused(vc, panels);
    updateAbs(vc, options, panels);
}

/**
 * Generate Panel layout
 * @param {Object} layout layoutOptions
 * @param {Number} scale fontscale
 * @return {Object} layout size
 */
function genPanelLy(_ref) {
    var _ref$gutter = _ref.gutter,
        gutter = _ref$gutter === undefined ? 0 : _ref$gutter,
        _ref$headHeight = _ref.headHeight,
        headHeight = _ref$headHeight === undefined ? 0 : _ref$headHeight,
        _ref$footHeight = _ref.footHeight,
        footHeight = _ref$footHeight === undefined ? 0 : _ref$footHeight,
        _ref$rightWidth = _ref.rightWidth,
        rightWidth = _ref$rightWidth === undefined ? 0 : _ref$rightWidth,
        _ref$leftWidth = _ref.leftWidth,
        leftWidth = _ref$leftWidth === undefined ? 0 : _ref$leftWidth;
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    gutter = formatMargin2(gutter, scale);
    headHeight = getCssSize(headHeight, scale);
    footHeight = getCssSize(footHeight, scale);
    rightWidth = getCssSize(rightWidth, scale);
    leftWidth = getCssSize(leftWidth, scale);

    var containerHeight = 'calc(100% - ' + headHeight + ' - ' + footHeight + ' - ' + gutter.top + ' - ' + gutter.bottom + ')',
        centerWidth = 'calc(100% - ' + rightWidth + ' - ' + leftWidth + ' - ' + gutter.left + ' - ' + gutter.right + ')';

    return {
        headHeight: headHeight,
        footHeight: footHeight,
        rightWidth: rightWidth,
        leftWidth: leftWidth,
        containerHeight: containerHeight,
        centerWidth: centerWidth,
        gutter: gutter
    };
}

function addPanel(panel, layout, fontScale) {
    var _genPanelLy = genPanelLy(layout, fontScale),
        headHeight = _genPanelLy.headHeight,
        footHeight = _genPanelLy.footHeight,
        rightWidth = _genPanelLy.rightWidth,
        leftWidth = _genPanelLy.leftWidth,
        containerHeight = _genPanelLy.containerHeight,
        centerWidth = _genPanelLy.centerWidth,
        gutter = _genPanelLy.gutter;

    var containerNode = null;

    // head
    if (headHeight !== '0px' && headHeight !== '0%') {
        new VNode().setRole(CT.GRID_HEAD).setHeight(headHeight).insertTo(panel);
    }

    // center\left\right container
    if (headHeight !== '100%' && footHeight !== '100%') {
        containerNode = new VNode().setRole(CT.GRID_L_C_R).setHeight(containerHeight).setStyle({ marginBottom: gutter.bottom, marginTop: gutter.top }).insertTo(panel);
    }

    // foot
    if (footHeight !== '0px' && footHeight !== '0%') {
        new VNode().setRole(CT.GRID_FOOT).setHeight(footHeight).insertTo(panel);
    }

    // left
    if (leftWidth !== '0px' && leftWidth !== '0%') {
        var left = new VNode().setRole(CT.GRID_LEFT).setWidth(leftWidth);

        if (containerNode) {
            left.insertTo(containerNode);
        }
    }

    // center
    if (containerNode) {
        new VNode().setRole(CT.GRID_CENTER).setWidth(centerWidth).setStyle({
            marginLeft: gutter.left,
            marginRight: gutter.right
        }).insertTo(containerNode);
    }

    // right
    if (rightWidth !== '0px' && rightWidth !== '0%') {
        var right = new VNode().setRole(CT.GRID_RIGHT).setWidth(rightWidth);

        if (containerNode) {
            right.insertTo(containerNode);
        }
    }

    return panel;
}

function addLayoutToPanel(panel, layout, fontScale) {
    if (!panel || !layout) return;
    if (panel.queryByRole(CT.PANEL_CONTAINER)) {
        return;
    }

    var panelContainer = new VNode().setStyle({ position: 'relative' }).setRole(CT.PANEL_CONTAINER);

    addPanel(panelContainer, layout, fontScale || 1).insertTo(panel);
}

function addPanels(vc, o) {
    if (!vc || !o.panel || !o.panel.enable) return;
    var df = o.panel.default,
        custom = o.panel.custom,
        customIds = [],
        fullId = o.fullId,
        fullZIndex = o.fullZIndex;

    if (custom && isArray(custom)) {
        custom.forEach(function (c) {
            var panels = c.panels;

            if (isNumber(panels)) {
                panels = [panels];
            }

            if (isArray(panels)) {
                var customVnodes = [];

                c.panels = panels = unique(panels);
                panels.forEach(function (id) {
                    customIds.push(id);
                    var _vn = vc.getChild(id);

                    if (_vn) {
                        customVnodes.push(_vn);
                    }
                });

                customVnodes.forEach(function (vnode) {
                    var zIndex = c.zIndex;

                    if (vnode.getId() === fullId) {
                        zIndex = fullZIndex;
                    }
                    addLayoutToPanel(vnode, c, o.fontScale);
                    vnode.setStyle({ zIndex: zIndex }).update();
                });
            }
        });
    }

    vc.children.forEach(function (node) {
        if (contain(customIds, node[CT.COMPONENT_ID_KEY]) < 0) {
            var zIndex = df.zIndex;

            if (node.getId() === fullId) {
                zIndex = fullZIndex;
            }
            addLayoutToPanel(node, df, o.fontScale);
            node.setStyle({ zIndex: zIndex }).update();
        }
    });
}

var defaultOptions = {

  // Layout container
  // It can be either DOM or ID and classname
  container: '',

  // Define grid rows number. Sets the number of rows in the layout. default value is 12.
  rows: CT.ROWS,

  // Sets the number of columns in the layout. default value is 24.
  cols: CT.COLS,

  // Define grid cols number. The default will be stretched over the width of the entire container.
  // px
  width: 0,

  // The default will be full of the entire container height.
  // px
  height: 0,

  // Gutter
  gutter: 10,

  // The default is the panel that is spread across the container.
  // []
  // {row:4, col:6, height:0, width:0}
  layout: null,

  // Layout start type
  layoutStartType: 'row',

  // font scale, only setting for panel size.
  fontScale: 1,

  // html root font-size
  rem: 1,

  // Full screen display of panel
  fullId: 0,

  // Full screen panel zIndex
  fullZIndex: 0,

  // scroll, when zoom is enable, scroll will be disabled.
  scroll: {
    x: false,
    y: false
  },

  // drag enable or disable.
  drag: false,

  // Panel setting
  panel: {
    enable: false,
    default: {
      headHeight: 0,
      footHeight: 0,
      leftWidth: 0,
      rightWidth: 0,
      gutter: 0,
      zIndex: CT.PANEL_DEFAULT_ZINDEX
    },
    custom: []
  },

  overflowVisible: false,

  // Setting Panel overflow
  panelOverflow: {
    visible: '',
    overflowX: '',
    overflowY: ''
  },

  /**
   * dev options
   * @type {Object}
   * @define
   */
  dev: {
    /**
     * @param {Boolean} enable enbale or disable dev. @default false
     */
    enable: false,
    // Panel info setting
    panel: {
      show: true,
      id: true,
      size: false,
      position: false,
      background: '',
      fontSize: 14,
      fontColor: '#333'
    },
    // layout guideline setting
    guideline: {
      show: false,
      identifier: true,
      lineSize: 1,
      color: 'rgba(0,0,0,.25)',
      zIndex: 0,
      fontSize: 14,
      fontColor: '#333'
    },
    // panel guidlines setting
    panelGuideline: {
      show: false,
      ids: 'all',
      lineSize: 0.5,
      size: 15,
      zIndex: 0,
      color: '#888'
    },
    // Screen splitline setting
    splitline: {
      show: false,
      lineSize: 1,
      width: 100,
      height: 100,
      color: '#000',
      zIndex: 0,
      identifier: true,
      fontColor: '#333333',
      fontSize: 12
    },
    // only show one or some pannels.
    showIds: 0
  },

  // Zoom setting
  zoom: {
    enable: false,
    control: true,
    auto: true,
    scale: 0,
    ratio: 0.1,
    min: 0.1,
    max: 1,
    position: 'rightTop', // leftTop, leftBottom, rightBottom, rightTop
    wheelZoom: true
  },

  /**
   * Focus option
   * @type {Object}
   * @define fouces
   * @param {Number|String} id focus id @default 0
   * @param {Number} offsetX offsetX @default 0
   * @param {Number} offsetY offsetY @default 0
   */
  focus: {
    id: 0,
    offsetX: 0,
    offsetY: 0
  },

  // set auto line-height. lineheight will to be eqaul element height
  // [{ids: 1, type: 'center, head'}, {ids:[2,3], type:'head'}]
  lineHeight: null,

  /**
   * Hide ids
   * @type {Array|Number|String}
   * @default
   */
  hideIds: null,

  /**
   * hide type. include panel, wrap, center, head, foot, left, right
   * @type {String}
   * @default
   */
  hideType: 'panel',

  /**
   * trace window resize
   * @type {Boolean}
   * @default
   */
  trackResize: true,

  /**
   * update interval time.ms
   * @type {Number}
   * @default
   */
  updateInterval: 200,

  /**
   * render delay time. ms
   * @type {Number}
   * @default
   */
  renderDelay: 0,

  /**
   * theme setting.
   * @type {Object}
   * @default
   */
  style: null,

  /**
   * Extend Panels setting
   * @type {Array}
   * @default
   */
  extends: [],

  /**
   * onload function
   * @type {Function}
   * @default
   */
  onload: null,

  /**
   * update function
   * @type {Function}
   * @default
   */
  update: null,

  /**
   * Alias
   * @type {Object}
   * @default
   */
  alias: null,

  env: 'js' // js, vue
};

var prefix = CT.NAME + '-';

/**
 * Theme option
 * @typedef {Object} theme
 * @prop {Object} container container theme
 * @prop {Object} default panel default theme
 * @prop {Object|Array} custom custom panel theme
 */
var defaultStyle = {
    container: prefix + CT.WRAP,
    inner: prefix + CT.CONTAINER,
    zoomContainer: prefix + CT.ZOOMCONTAINER,
    zoomPane: prefix + CT.ZOOMPANE,
    pane: prefix + CT.PANE,
    default: {
        panel: prefix + CT.PANEL,
        panelContainer: prefix + CT.PANEL_CONTAINER,
        head: prefix + CT.GRID_HEAD,
        foot: prefix + CT.GRID_FOOT,
        center: prefix + CT.GRID_CENTER,
        right: prefix + CT.GRID_RIGHT,
        left: prefix + CT.GRID_LEFT,
        lcr: prefix + CT.GRID_L_C_R
    },
    custom: null
};

var keys = ['baseFrequency', 'stdDeviation', 'viewBox', 'numOctaves', 'tableValues', 'markerWidth', 'markerHeight', 'refX', 'refY', 'patternUnits', 'patternTransform'].join(' ');

/**
 * SVG
 * @class
 * @ignore
 */

var SVG$2 = function () {

    /**
     * @constructor
     * @param {String} nodeName node tagNae
     * @param {SVG} parent parent node
     */
    function SVG(nodeName, parent) {
        classCallCheck(this, SVG);

        this.nodeName = nodeName || 'svg';
        this.attrs = {};
        this.children = [];
        this.parentNode = null;
        this.realNode = null;
        this._stamp();
        this.id = this._popo_id;
        this.styles = {};
        this.style = '';
        this.html = '';
        if (parent) {
            this.insertTo(parent);
        }
    }

    /**
     * Stamp svg node
     * @ignore
     */


    createClass(SVG, [{
        key: '_stamp',
        value: function _stamp() {
            var preffix = '';

            switch (this.nodeName) {
                case 'filter':
                    preffix = CT.FILTER;
                    break;
                case 'linearGradient':
                    preffix = CT.LINER_GRADIENT;
                    break;
                case 'radialGradient':
                    preffix = CT.RADIAL_GRADIENT;
                    break;
                case 'marker':
                    preffix = CT.MARKER;
                    break;
                default:
                    break;
            }
            stamp(this, preffix);
        }

        /**
         * Set node id
         * @ignore
         * @return {SVG} current svg instance
         */

    }, {
        key: '_setId',
        value: function _setId() {
            this.attr({
                id: this.getId()
            });

            return this;
        }

        /**
         * Get node id
         * @return {String} id
         */

    }, {
        key: 'getId',
        value: function getId() {
            return this.attr('id') || CT.DRAW_ID_KEY + '-' + this._popo_id;
        }

        /**
         * Set style
         * @param {Object} styles styles
         * @return {SVG} current svg instance
         */

    }, {
        key: 'setStyle',
        value: function setStyle(styles) {
            for (var key in styles) {
                this.styles[key] = styles[key];
            }

            return this;
        }

        /**
         * Add attibutes
         * @param {Object|String} name name
         * @param {Any} value value
         * @return {SVG} current svg instance
         */

    }, {
        key: 'attr',
        value: function attr(name, value) {
            if (!name) return this;
            if (isString(name)) {
                if (value !== undefined && value !== null) {
                    if (keys.indexOf(name) < 0) {
                        name = reverseCamelcase(name);
                    }
                    this.attrs[name] = value;

                    return this;
                }

                return this.attrs[name];
            }

            if (isObject(name)) {
                for (var key in name) {
                    if (isObject(name[key]) && name[key] instanceof SVG) {
                        var _key = key;

                        if (keys.indexOf(key) < 0) {
                            _key = reverseCamelcase(key);
                        }
                        this.attrs[_key] = 'url(#' + name[key].getId() + ')';
                    } else if (keys.indexOf(key) < 0) {
                        var _key2 = reverseCamelcase(key);

                        if (_key2 === 'id') {
                            this.attrs[_key2] = CT.DRAW_ID_KEY + '-' + name[key];
                        } else {
                            this.attrs[_key2] = name[key];
                        }
                    } else {
                        this.attrs[key] = name[key];
                    }
                }
            }

            return this;
        }

        /**
         * Set SVG Filter
         * @ignore
         * @param {Object} filters filters
         * @param {Object} node node
         * @return {SVG} current svg instance
         */

    }, {
        key: '_filter',
        value: function _filter(filters, node) {
            node = node || this;
            for (var i = 0, len = filters.length; i < len; i++) {
                var f = filters[i];

                for (var key in f) {
                    var filter = new SVG(key, node),
                        pureKeys = {};

                    if (isArray(f[key])) {
                        this._filter(f[key], filter);
                    } else {
                        for (var _key in f[key]) {
                            if (isObject(f[key][_key])) {
                                new SVG(_key, filter).attr(f[key][_key]);
                            } else {
                                pureKeys[_key] = f[key][_key];
                            }
                        }
                        filter.attr(pureKeys);
                    }
                }
            }

            return this;
        }

        /**
         * Set gradient
         * @ignore
         * @param {Array} stops  [offset, stopColor, stopOpacity]
         * @return {SVG} current svg instance
         */

    }, {
        key: '_stops',
        value: function _stops(stops) {
            for (var i = 0; i < stops.length; i++) {
                new SVG('stop', this).attr({
                    offset: getPercentage(stops[i][0]) + '%',
                    stopColor: stops[i][1] || '#333',
                    stopOpacity: stops[i][2] || 1
                });
            }

            return this;
        }

        /**
         * Insert to parent
         * @param {Object} parent parentNode
         * @return {SVG} current svg instance
         */

    }, {
        key: 'insertTo',
        value: function insertTo(parent) {
            if (parent && parent.children) {
                parent.children.push(this);
                this.parentNode = parent;
            }

            return this;
        }

        /**
         * Create svg
         * @param {String} nodeName svg tag name
         * @param {Object} attrs attributies
         * @return {SVG} current svg instance
         */

    }, {
        key: 'create',
        value: function create(nodeName, attrs) {
            return new SVG(nodeName, this).attr(attrs);
        }

        /**
         * Add child
         * @param {Object} son svg instance
         * @return {SVG} current svg instance
         */

    }, {
        key: 'add',
        value: function add(son) {
            if (son) {
                this.children.push(son);
                son.parentNode = this;
            }

            return this;
        }

        /**
         * Remove svg node
         * @param {Object} node svg node instance
         * @return {SVG} current svg instance
         */

    }, {
        key: 'remove',
        value: function remove(node) {
            if (node && node._popo_id && this.children.length > 0) {
                return removeObjectFromArray(this.children, '_popo_id', node._popo_id);
            }

            return this;
        }

        /**
         * Render node
         * @ignore
         * @param {SVG} node svg node
         */

    }, {
        key: 'render',
        value: function render(node) {
            if (!isEmptyObject(this.styles)) {
                var style = '';

                for (var key in this.styles) {
                    if (isObject(this.styles[key]) && this.styles[key] instanceof SVG) {
                        style += key + ':url(#' + this.styles[key].getId() + ');';
                    } else {
                        style += key + ':' + this.styles[key] + ';';
                    }
                }
                if (style) {
                    this.attr({ style: style });
                }
            }

            var attrs = this.attrs;

            for (var _key3 in attrs) {
                if (_key3.indexOf('xlink') >= 0) {
                    node.setAttributeNS('http://www.w3.org/1999/xlink', _key3, attrs[_key3]);
                } else {
                    node.setAttribute(_key3, attrs[_key3]);
                }
            }

            if (this.nodeName === 'style' || this.nodeName === 'text') {
                node.innerHTML = this.html;
            }
        }

        /**
         * Set svg inner html
         * @param {String} html html content
         * @return {SVG} current svg instance
         */

    }, {
        key: 'setHtml',
        value: function setHtml(html) {
            if (html) {
                this.html = html;
            }

            return this;
        }

        /**
         * Create svg element
         * @param {Boolean} hidden hidden
         * @return {HTMLObject} html object
         */

    }, {
        key: 'createElement',
        value: function createElement(hidden) {
            if (hidden) {
                this.attr({ width: '0%', height: '0%' });
            }

            var node = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);

            this.render(node);

            if (this.children && this.children.length > 0) {
                this.children.forEach(function (c) {
                    if (c.nodeName === 'defs' && c.children.length === 0) {
                        return;
                    }
                    if (c.nodeName === 'style' && c.html === '') {
                        return;
                    }
                    node.appendChild(c.createElement());
                });
            }

            this.realNode = node;

            if (hidden) {
                node.style.width = '0px';
                node.style.height = '0px';
                node.style.zIndex = -9999;
                node.style.position = 'fixed';
                node.style.top = '-100%';
                node.style.left = '-100%';
            }

            return node;
        }
    }]);
    return SVG;
}();

/**
 * SVG
 * @class
 * @ignore
 */

var SVG = function (_VSVG) {
    inherits(SVG, _VSVG);

    /**
     * @constructor
     * @param {String} nodeName node tagName
     * @param {SVG} parent parent svg
     * @param {Object} options options
     */
    function SVG(nodeName, parent, options) {
        classCallCheck(this, SVG);

        var _this = possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).call(this, nodeName, parent, options));

        _this.attr({
            width: '100%',
            height: '100%'
        });
        _this.globalStyle = new SVG$2('style', _this);
        _this.defs = new SVG$2('defs', _this);
        _this._setId();
        return _this;
    }

    /**
     * Get custom defines
     * @param {string|Number} id defined id
     * @return {String} format defined object
     */


    createClass(SVG, [{
        key: 'def',
        value: function def(id) {
            return this.defs._getDefById(id) || '';
        }

        /**
         * Get Custom defined item
         * @ignore
         * @param {String} id id
         * @return {String} defined object
         */

    }, {
        key: '_getDefById',
        value: function _getDefById(id) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                var childId = this.children[i].getId();

                if (childId) {
                    if (childId === id || childId === CT.DRAW_ID_KEY + '-' + id) {
                        return 'url(#' + childId + ')';
                    }
                }
            }

            return '';
        }

        /**
         * Add global style
         * @param {String} style style content
         * @return {SVG} current svg instance
         */

    }, {
        key: 'addGlobalStyle',
        value: function addGlobalStyle(style) {
            this.globalStyle.html += style;

            return this;
        }

        /**
         * Add radial gradient
         * @param {Number} cx circle x center position
         * @param {Number} cy circle y center position
         * @param {Number} r radius
         * @param {Array} stops  stops
         * @return {SVG} new gradient svg
         */

    }, {
        key: 'addRG',
        value: function addRG(cx, cy, r, stops) {
            stops = stops || [[0, '#333', 1], [1, '#555', 1]];

            return new SVG$2('radialGradient', this.defs)._setId().attr({ cx: cx, cy: cy, r: r })._stops(stops);
        }

        /**
         * Add linear gradient
         * @param {*} x1 start x position
         * @param {*} y1 start y position
         * @param {*} x2 end x position
         * @param {*} y2 end y position
         * @param {*} stops  stops array
         * @return {SVG} new gradient svg node
         */

    }, {
        key: 'addLG',
        value: function addLG(x1, y1, x2, y2, stops) {
            x1 = getPercentage(x1) + '%';
            y1 = getPercentage(y1) + '%';
            x2 = getPercentage(x2, 1) + '%';
            y2 = getPercentage(y2) + '%';
            stops = stops || [[0, '#333', 1], [1, '#555', 1]];

            return new SVG$2('linearGradient', this.defs)._setId().attr({ x1: x1, x2: x2, y1: y1, y2: y2 })._stops(stops);
        }

        /**
         * Add Group
         * @param {Array} units units
         */

    }, {
        key: 'g',
        value: function g(units) {
            var g = new SVG$2('g', this)._setId();

            if (isArray(units)) {
                /*eslint-disable */
                units.forEach(function (u) {
                    new SVG$2('path', g);
                });
                /*eslint-enable */
            }
        }

        /**
         * Add filters
         * @param {Object} filters filter
         * @return {SVG} new filter svg
         */

    }, {
        key: 'addFilter',
        value: function addFilter(filters) {
            return new SVG$2('filter', this.defs)._setId()._filter(filters);
        }

        /**
         * Add marker
         * @param {Object} markers markers
         * @param {String} color color
         * @return {SVG} new marker svg
         */

    }, {
        key: 'addMarker',
        value: function addMarker(markers, color) {
            var marker = new SVG$2('marker', this.defs)._setId().attr(markers);

            new SVG$2('circle', marker).attr({
                cx: 5,
                cy: 5,
                r: 4,
                fill: 'none',
                stroke: color || '#ffffff',
                strokeWidth: 1
            });

            return marker;
        }

        /**
         * Add pattern
         * @param {Object} patterns patterns
         * @return {SVG} new pattern svg
         */

    }, {
        key: 'addPattern',
        value: function addPattern(patterns) {
            var pattern = new SVG$2('pattern', this.defs)._setId().attr(patterns),
                _pattern$attrs = pattern.attrs,
                width = _pattern$attrs.width,
                height = _pattern$attrs.height;


            new SVG$2('line', pattern).attr({
                x1: width / 2,
                y1: 0,
                x2: width / 2,
                y2: height,
                strokeWidth: width / 2,
                stroke: 'rgba(0,0,0,.2)'
            });

            return pattern;
        }

        /**
         * Create SVG
         * @param {String} nodeName node tagName
         * @param {Object} attrs attributes
         * @return {SVG} new svg node
         */

    }, {
        key: 'create',
        value: function create(nodeName, attrs) {
            return new SVG$2(nodeName, this).attr(attrs);
        }
    }]);
    return SVG;
}(SVG$2);

/**
 * Screen extends panel option and addPanel option
 * @typedef {Object} panel
 * @property {Object} size panel size
 * @property {Object} position panel position
 * @property {String} id panel dom id
 * @property {Number} zIndex panel zIndex
 * @prop {Object} layout panel layout.
 */
var defaultPanel = {
    size: {
        width: 0,
        height: 0,
        responsive: true
    },
    position: {
        left: 0,
        top: 0,
        responsive: true
    },
    id: '',
    className: '',
    zIndex: CT.PANEL_DEFAULT_ZINDEX,
    layout: null,
    isWidget: false
};

//    layout: {
//     headHeight: 0,
//     footHeight: 0,
//     leftWidth: 0,
//     rightWidth: 0,
//     gutter: 0,
// },

// import { loadDev } from './dev';
function createPane(o) {
    var pd = o.padding,
        str = pd.top + 'px ' + pd.right + 'px ' + pd.bottom + 'px ' + pd.left + 'px';

    return new VNode().setRole(CT.PANE).setHeight('auto').setStyle({
        padding: str
    }).createElement();
}

function createVc() {
    return new VNode().setRole(CT.CONTAINER).setStyle({ position: 'relative' });
}

function vcToDom(vc) {
    return vc && vc.createElement();
}

function getAllIds(vc) {
    return vc ? vc.children.map(function (node) {
        return node.getId();
    }) : [];
}

function stampInner(c) {
    if (isDOM(c)) {
        [CT.ZOOMPANE, CT.ZOOMCONTAINER].forEach(function (role) {
            if (attr$1(c, CT.ROLE) === role) {
                /*eslint-disable */
                c._popo_inner = true;
                /*eslint-enable */

                return;
            }
        });
    }
}

function addExtend(vc, padding, options, scale, createPanel) {
    if (!vc || !padding || !options) return null;
    var left = padding.left,
        top = padding.top,
        right = padding.right,
        bottom = padding.bottom,
        width = vc.width + left + right,
        height = vc.height + top + bottom;


    if (isObject(options)) {
        var panelOption = merge$1(defaultPanel, options),
            position = panelOption.position,
            size = panelOption.size,
            id = panelOption.id,
            zIndex = panelOption.zIndex,
            layout = panelOption.layout,
            style = panelOption.style,
            isWidget = panelOption.isWidget,
            className = panelOption.className,
            node = new VNode().setRole(CT.PANEL).setHeight(multiplyBy(size.height || 0, height)).setWidth(multiplyBy(size.width || 0, width)).setTop(multiplyBy(position.top || 0, height) - top).setLeft(multiplyBy(position.left || 0, width) - left).setStyle({
            position: 'absolute',
            zIndex: zIndex
        });


        if (id) {
            node.id = id;
        }

        node[CT.COMPONENT_ID_KEY] = vc.getNewId();
        node.isExtend = true;
        node.isWidget = isWidget;
        if (isWidget && className) {
            node.addClassName(className);
        }
        node.extendInfo = {
            position: {
                left: node.left / (position.responsive ? width : 1),
                top: node.top / (position.responsive ? height : 1)
            },
            size: {
                width: node.width / (size.responsive ? width : 1),
                height: node.height / (size.responsive ? height : 1)
            },
            zIndex: zIndex
        };

        if (layout && isObject(layout) && createPanel) {
            addLayoutToPanel(node, layout, scale);
        }
        if (style && !isWidget) {
            var _style = merge$1(defaultStyle.default, style);

            _setStyle(node, _style.panel, false, true);
            for (var key in style) {
                var son = node.queryByRole(key);

                if (son && _style[key]) {
                    _setStyle(son, _style[key], false, true);
                }
            }
        }
        vc.addNode(node);

        return node;
    }

    return null;
}

function loadExtends(vc, exts, o, createPanel) {
    if (!vc || !o) return;
    var ext = exts;

    if (ext && isObject(ext)) {
        ext = [ext];
    }
    if (ext && isArray(ext)) {
        ext.forEach(function (e) {
            addExtend(vc, o.padding, e, o.fontScale, createPanel);
        });
    }
}

function updateExtends(vc, o) {
    if (!vc || !o) return;
    var exts = vc.children.filter(function (n) {
        return n.isExtend === true;
    }),
        _o$padding = o.padding,
        left = _o$padding.left,
        top = _o$padding.top,
        right = _o$padding.right,
        bottom = _o$padding.bottom,
        width = vc.width + left + right,
        height = vc.height + top + bottom;


    exts.forEach(function (panel) {
        if (isObject(panel.extendInfo)) {
            var _panel$extendInfo = panel.extendInfo,
                size = _panel$extendInfo.size,
                position = _panel$extendInfo.position,
                panelWidth = multiplyBy(size.width || 0, width),
                panelHeight = multiplyBy(size.height || 0, height);


            panel.setHeight(panel._oldHeight !== undefined ? panel.height : panelHeight).setWidth(panel._oldWidth !== undefined ? panel.width : panelWidth).setTop(multiplyBy(panel._oldTop !== undefined ? panel.top : position.top || 0, height)).setLeft(multiplyBy(panel._oldLeft !== undefined ? panel.left : position.left || 0, width)).update();
        }
    });
}

function getIdByAlias(alias, key) {
    if (isArray(alias) && key) {
        var _alias = alias.slice(0),
            result = _alias.filter(function (a) {
            return a && a.name === key;
        });

        if (result.length === 1) {
            return result[0].id || -1;
        }
        if (result.length > 1) {
            return result.map(function (r) {
                return r.id || -1;
            })[0];
        }
    }

    return -1;
}

function getAliasById(alias, id) {
    if (isArray(alias) && id) {
        var result = isArray(alias) && id && alias.slice(0).filter(function (a) {
            return a && a.id === id;
        })[0];

        if (isObject(result)) {
            return result.name;
        }
    }

    return null;
}

function getId(id, alias) {
    if (!isNaN(Number(id))) {
        return Number(id);
    } else if (alias && isString(id)) {
        return getIdByAlias(alias, id);
    }

    return -1;
}

function getRealIds(vc, id, alias) {
    if (!vc || id === null || id === undefined) return -1;
    var length = vc.children.length;

    if (id === 'all') {
        return getAllIds(vc);
    }
    if (!isArray(id)) {
        id = getId(id, alias);

        return id < 0 ? -1 : id;
    }

    return id.map(function (_id) {
        _id = getId(_id, alias);

        return _id < 0 ? -1 : _id;
    });
}

function getNode(panel, type) {
    if (panel) {
        type = type || CT.GRID_CENTER;

        /*eslint-disable */
        if (contain([CT.PANEL, CT.GRID_HEAD, CT.GRID_CENTER, CT.GRID_LEFT, CT.GRID_RIGHT, CT.GRID_L_C_R, CT.PANEL_CONTAINER, CT.GRID_FOOT], type) < 0) {
            return null;
        }
        /*eslint-enable */

        return type === CT.PANEL ? panel : panel.queryByRole(type);
    }

    return null;
}

function getNodesByPanel(panel) {
    if (panel) {
        return {
            panel: panel,
            head: getNode(panel, CT.GRID_HEAD),
            left: getNode(panel, CT.GRID_LEFT),
            right: getNode(panel, CT.GRID_RIGHT),
            center: getNode(panel, CT.GRID_CENTER),
            panelContainer: getNode(panel, CT.PANEL_CONTAINER),
            lcr: getNode(panel, CT.GRID_L_C_R),
            foot: getNode(panel, CT.GRID_FOOT)
        };
    }

    return null;
}

function getRealNodesByPanel(panel, id, options) {
    if (panel) {
        var nodes = getNodesByPanel(panel);

        if (isObject(nodes)) {
            var head = nodes.head,
                foot = nodes.foot,
                left = nodes.left,
                right = nodes.right,
                center = nodes.center,
                lcr = nodes.lcr,
                panelContainer = nodes.panelContainer;

            var elements = {
                panel: panel.realDom,
                panelContainer: panelContainer && panelContainer.realDom,
                lcr: lcr && lcr.realDom,
                head: head && head.realDom,
                foot: foot && foot.realDom,
                left: left && left.realDom,
                center: center && center.realDom,
                right: right && right.realDom,
                id: id || panel.getId(),
                isExtend: panel.isExtend,
                alias: getAliasById(options.alias, id),
                size: {
                    width: formatNum(panel.width, 5),
                    height: formatNum(panel.height, 5)
                },
                position: {
                    top: formatNum(panel.top, 5),
                    left: formatNum(panel.left, 5),
                    zIndex: panel.styles.zIndex
                }
            };

            return elements;
        }
    }

    return null;
}

function getRealdomsById(vc, id, o) {
    var realId = getId(id, o.alias),
        panel = vc.getChild(realId);

    return getRealNodesByPanel(panel, realId, o);
}

function getNodeById(vc, id, type) {
    if (!vc || !id || id <= 0) return null;
    var panel = vc.getChild(id);

    if (panel) {
        return getNode(panel, type || CT.GRID_CENTER);
    }

    return null;
}

// DEV

function n2px(fz) {
    if (isNumber(fz)) return fz + 'px';
    if (isString(fz)) {
        if (fz.indexOf('px') < 0 || fz.indexOf('em') > 0) {
            return fz;
        } else if (!isNaN(Number(fz))) {
            return fz + 'px';
        }
    }

    return fz;
}

function px2n(str) {
    if (isString(str)) {
        var i = str.indexOf('px');

        if (i >= 0) {
            return Number(str.substring(0, i));
        }
    }

    if (isNumber(str)) {
        return str;
    }

    return 0;
}

function _addGGL(panel, o) {
    if (!panel || !isDOM(panel.realDom) || !o || !o.show) return;
    removeByClass(CT.PANEL_GUIDELINES, panel.realDom);
    var ggl = query(panel.realDom, '.' + CT.GUIDELINES),
        width = panel.width,
        height = panel.height,
        zIndex = o.zIndex,
        size = o.size || 15,
        color = o.color,
        lineSize = o.lineSize,
        lines = new SVG(),
        svg = create$1('div', CT.PANEL_GUIDELINES, {
        zIndex: zIndex,
        height: height + 'px',
        width: width + 'px',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
        userSelect: 'none'
    }, panel.realDom);

    if (isDOM(ggl)) {
        panel.realDom.removeChild(ggl);
    }

    var rows = Math.ceil(height / size),
        cols = Math.ceil(width / size),
        points = '',
        points2 = '';

    for (var i = 1; i <= rows; i++) {
        var y = size * i;

        points += 'M0 ' + y + ' L' + width + ' ' + y + ' ';
    }
    for (var _i = 1; _i <= cols; _i++) {
        var x = size * _i;

        points += 'M' + x + ' 0 L' + x + ' ' + height + ' ';
    }

    rows = Math.ceil(height / size / 4);
    cols = Math.ceil(width / size / 4);
    for (var _i2 = 1; _i2 <= rows; _i2++) {
        var _y = size * _i2 * 4;

        points2 += 'M0 ' + _y + ' L' + width + ' ' + _y + ' ';
    }
    for (var _i3 = 1; _i3 <= cols; _i3++) {
        var _x = size * _i3 * 4;

        points2 += 'M' + _x + ' 0 L' + _x + ' ' + height + ' ';
    }

    lines.create('path', { d: points, stroke: color, strokeWidth: lineSize });
    lines.create('path', { d: points2, stroke: color, strokeWidth: lineSize * 1.5 });
    svg.appendChild(lines.createElement());
}

function addPanelGuidelines(vc, o) {
    if (!vc || !o || !o.dev || !o.dev.enable || !o.dev.panelGuideline.show) return;
    var gg = o.dev.panelGuideline,
        options = merge$1({
        color: 'rgba(0,0,0,.25)',
        width: 1,
        size: 10,
        zIndex: 0
    }, gg || {});

    var ids = gg.ids;

    if (ids === 'all') {
        ids = getAllIds(vc);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach(function (id) {
            id = getRealIds(vc, id, o.alias);
            if (id > 0) {
                var node = vc.getChild(id);

                if (node && node.realDom) {
                    _addGGL(node, options);
                }
            }
        });
    }
}

function createPanelInfo(panel, size, id, position, color, fontSize) {
    fontSize = n2px(fontSize);
    if (panel && panel.realDom) {
        var width = Math.round(panel.width),
            height = Math.round(panel.height),
            left = Math.round(panel.left),
            top = Math.round(panel.top);

        if (size || id || position) {
            var info = '';

            if (id) {
                info += panel[CT.COMPONENT_ID_KEY];
            }
            if (size) {
                info += (id ? ' - ' : '') + ' W' + width + ' H' + height;
            }
            if (position) {
                info += (id || size ? ' - ' : '') + ' L' + left + ' T' + top;
            }

            return new VNode('span').addClassName(CT.INFO).setTop(panel.top + 5).setLeft(panel.left + 5).setWidth('auto').setHeight('auto').setStyle({ color: color, fontSize: fontSize }).setHtml(info);
        }
    }

    return null;
}

function createDebugInfo(vc, dev) {
    if (!vc || !dev || !dev.enable || !dev.panel.show) return;
    var o = dev.panel,
        id = o.id,
        size = o.size,
        position = o.position,
        background = o.background,
        fontSize = n2px(o.fontSize),
        fontColor = o.fontColor;

    if (vc.realDom && (id || size || position || background)) {
        for (var i = 0, len = vc.children.length; i < len; i++) {
            if (vc.children[i].realDom && background && isString(background)) {
                css$1(vc.children[i].realDom, { background: background });
            }
            if (vc.children[i].isWidget) continue;
            var span = createPanelInfo(vc.children[i], size, id, position, fontColor, fontSize);

            if (span) {
                vc.realDom.appendChild(span.createElement());
            }
        }
    }
}

function createSVGText(svg, text, x, y, fontSize, fill) {
    if (svg) {
        svg.create('text', { x: x, y: y, fontSize: fontSize, fill: fill }).setHtml(text);
    }
}

function addGuidelines(c, vc, o) {
    if (!c || !vc || !o || !o.dev.guideline.show) return;
    removeByClass(CT.GUIDELINES, c);
    var gl = o.dev.guideline,
        padding = o.padding,
        width = vc.width + padding.left + padding.right,
        height = vc.height + padding.top + padding.bottom,
        identifier = gl.identifier,
        fontSize = gl.fontSize,
        fontColor = gl.fontColor,
        zIndex = gl.zIndex,
        rows = o.rows,
        cols = o.cols,
        unitRowHeight = (100 / rows).toFixed(5) * height / 100,
        unitColWidth = (100 / cols).toFixed(5) * width / 100,
        lines = new SVG(),
        svg = create$1('div', CT.GUIDELINES, {
        zIndex: zIndex,
        height: height + 'px',
        width: width + 'px',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
        userSelect: 'none'
    }, c),
        position = c.style.position;

    if (position === '' || position === 'static') {
        css$1(c, {
            position: 'relative'
        });
    }

    var points = '';

    for (var i = 0; i <= rows; i++) {
        var y = unitRowHeight * i;

        points += 'M0 ' + y + ' L' + width + ' ' + y + ' ';
        if (identifier) {
            createSVGText(lines, i, 5, y - unitRowHeight + px2n(fontSize) + 5, fontSize, fontColor);
        }
    }
    for (var _i4 = 0; _i4 <= cols; _i4++) {
        var x = unitColWidth * _i4;

        points += 'M' + x + ' 0 L' + x + ' ' + height + ' ';
        if (identifier && _i4 !== 1) {
            createSVGText(lines, _i4, x - unitColWidth + 5, px2n(fontSize) + 5, fontSize, fontColor);
        }
    }

    lines.create('path', { d: points, stroke: gl.color, strokeWidth: gl.lineSize });
    svg.appendChild(lines.createElement());
}

function addSplitLine(c, vc, o) {
    if (!c || !vc || !o || !o.dev.splitline.show) return;
    removeByClass(CT.SPLITLINES, c);
    var sl = o.dev.splitline,
        fontSize = n2px(sl.fontSize),
        fontColor = sl.fontColor,
        padding = o.padding,
        identifier = sl.identifier,
        width = vc.width + padding.left + padding.right,
        height = vc.height + padding.top + padding.bottom,
        unitRowHeight = sl.height,
        unitColWidth = sl.width,
        zIndex = sl.zIndex,
        rows = Math.ceil(height / unitRowHeight),
        cols = Math.ceil(width / unitColWidth),
        svg = create$1('div', CT.SPLITLINES, {
        zIndex: zIndex,
        height: height + 'px',
        width: width + 'px',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
        userSelect: 'none'
    }, c),
        lines = new SVG(),
        position = c.style.position,
        infoY = [],
        infoX = [];

    if (position === '' || position === 'static') {
        css$1(c, { position: 'relative' });
    }

    var points = '';

    for (var i = 0; i <= rows; i++) {
        var y = unitRowHeight * i;

        points += 'M0 ' + y + ' L' + width + ' ' + y + ' ';
        infoY.push(y);
    }
    for (var _i5 = 0; _i5 <= cols; _i5++) {
        var x = unitColWidth * _i5;

        points += 'M' + x + ' 0 L' + x + ' ' + height + ' ';
        infoX.push(x);
    }

    if (identifier) {
        infoX.forEach(function (x) {
            infoY.forEach(function (y) {
                createSVGText(lines, x + ', ' + y, x + 10, y + 10 + px2n(fontSize), fontSize, fontColor);
            });
        });
    }

    lines.create('path', { d: points, stroke: sl.color, strokeWidth: sl.lineSize });
    svg.appendChild(lines.createElement());
}

function loadDev(c, vc, o) {
    if (!vc || !c || !o || !o.dev || !o.dev.enable) return false;
    removeByClass(CT.INFO, c);
    createDebugInfo(vc, o.dev);
    addGuidelines(c, vc, o);
    addSplitLine(c, vc, o);
    addPanelGuidelines(vc, o);

    return true;
}



function setHide(ids, vcontainer, o, showIds) {
    if (!ids || !vcontainer) return;
    var type = showIds ? o.hideType : o.hideType || 'panel';

    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach(function (id) {
            var node = getNodeById(vcontainer, getRealIds(vcontainer, id, o.alias), type);

            if (node) {
                if (node.realDom) {
                    css$1(node.realDom, {
                        display: 'none'
                    });
                } else {
                    node.setStyle({
                        display: 'none'
                    });
                }
            }
        });
    }
}

function createZoomContainer(c, options) {
    if (!c || !options || hasClass$1(c, CT.ZOOMCONTAINER)) return null;
    var z = options.zoom,
        zoomContainer = new VNode().setRole(CT.ZOOMCONTAINER),
        zoomPane = new VNode().setRole(CT.ZOOMPANE).addNode(zoomContainer).createElement();

    c.appendChild(zoomPane);

    if (z.enable && z.control) {
        var zoomControl = new VNode().addClassName(CT.EXT_PANE).setRole(CT.EXT_PANE).setWidth(34).setHeight(94).setHtml('\n            <a class=\'' + CT.ZOOMIN + '\' href=\'javascript:;\' title=\'Zoom in\'>+</a>\n            <span class=\'' + CT.ZOOMINFO + '\' title=\'Current Scale\'></span>\n            <a class=\'' + CT.ZOOMOUT + '\' href=\'javascript:;\' title=\'Zoom out\'>-</a>').createElement(),
            size = '10px';

        switch (z.position) {
            case 'leftTop':
                css$1(zoomControl, { top: size, left: size });
                break;
            case 'leftBottom':
                css$1(zoomControl, { bottom: size, left: size });
                break;
            case 'rightBottom':
                css$1(zoomControl, { bottom: size, right: size });
                break;
            default:
                css$1(zoomControl, { right: size, top: size });
                break;
        }

        c.appendChild(zoomControl);
    }

    return zoomContainer.realDom;
}



function isInPoPo(c) {
    return c && c._popo_inner;
}

function veach(vcontainer, fn, ids, context) {
    if (!vcontainer) return;
    if (!ids || ids === 'all') {
        ids = getAllIds(vcontainer);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids) && ids.length > 0) {
        ids.forEach(function (id) {
            var panel = vcontainer.getChild(id);

            if (panel) {
                if (context) {
                    fn = bind$1(fn, context);
                }
                if (fn(getNodesByPanel(panel)) === false) {
                    return;
                }
            }
        });
    }
}

function updateHideIds(showIds, all) {
    var ids = showIds || [];

    if (isNumber(ids)) {
        ids = [ids];
    }
    if (ids.length > 0) {
        var done = false;

        ids.forEach(function (id) {
            var index = contain(all, id);

            if (index >= 0) {
                all.splice(index, 1);
                done = true;
            }
        });
        if (done) {
            return all;
        }
    }

    return null;
}

function _each(vcontainer, options, fn, ids, context) {
    if (!vcontainer || !options || !isFunction(fn)) return;
    if (ids === 'all') {
        ids = getAllIds(vcontainer);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }

    if (isArray(ids) && ids.length > 0) {
        ids.forEach(function (id) {
            id = getId(id, options.alias);
            if (id > 0) {
                var panel = vcontainer.getChild(id);

                if (panel && isDOM(panel.realDom)) {
                    var elements = getRealNodesByPanel(panel, id, options);

                    if (context) {
                        fn = bind$1(fn, context);
                    }
                    if (fn(elements) === false) {
                        return;
                    }
                }
            }
        });
    }
}

function _full(vc, id, zIndex) {
    if (id > 0 && vc) {
        var node = vc.getChild(id);

        if (node) {
            node.oldSize = {
                zIndex: node.styles.zIndex,
                width: node.width,
                height: node.height,
                top: node.top,
                left: node.left
            };
            node.setWidth(vc.width).setHeight(vc.height).setTop(0).setLeft(0).setStyle({ zIndex: zIndex }).update();

            return true;
        }
    }

    return false;
}

function _unFull(vcontainer, id) {
    if (isNumber(id) && id > 0) {
        var node = vcontainer.getChild(id);

        if (node && node.oldSize && node.realDom) {
            node.setStyle({
                zIndex: node.oldSize.zIndex || 1
            });
            node.width = node.oldSize.width;
            node.height = node.oldSize.height;
            node.top = node.oldSize.top;
            node.left = node.oldSize.left;
            node.update();
            node.oldSize = null;

            return true;
        }
    }

    return false;
}

function _removeStyle(node, option) {
    if (!node || !option) return;

    var _class = '',
        _css = null;

    if (isString(option)) {
        _class = option;
    }
    if (isObject(option) && !isEmptyObject(option)) {
        if (option.classname && isString(option.classname)) {
            _class = option.classname;
        }
        if (isObject(option.css) && !isEmptyObject(option.css)) {
            _css = cloneJsonObject(option.css);
        }
        if (!option.classname && !option.css) {
            _css = cloneJsonObject(option);
        }
    }
    if (_class) {
        if (isDOM(node)) {
            removeClass$1(node, _class);
        } else {
            node.removeClassName(_class);
            if (node.realDom) {
                removeClass$1(node.realDom, _class);
            }
        }
    }
    if (_css) {
        for (var key in _css) {
            _css[key] = '';
        }
        if (isDOM(node)) {
            css$1(node, _css);
        } else {
            node.setStyle(_css);
            if (node.realDom) {
                css$1(node.realDom, _css);
            }
        }
    }
    if (!isDOM(node) && node.update) {
        node.update();
    }
}

function removeStyle(c, vc, o, style) {
    if (isObject(style)) {
        var container = style.container,
            custom = style.custom,
            df = style.default;


        if (container) {
            _removeStyle(c, container);
        }
        if (isObject(df)) {
            vc.children.forEach(function (panel) {
                for (var key in df) {
                    var target = getNodesByPanel(panel)[key];

                    if (target) {
                        _removeStyle(target, df[key]);
                    }
                }
            });
        }
        (isArray(custom) ? custom : [custom]).forEach(function (com) {
            if (isObject(com) && com.panels) {
                veach(vc, function (elements) {
                    for (var key in com) {
                        if (com[key] && elements[key]) {
                            _removeStyle(elements[key], com[key]);
                        }
                    }
                }, getRealIds(vc, com.panels, o.alias));
            }
        });

        vc.update();
    }
}

function _setStyle(node, option, isUpdate, overwrite) {
    if (!node || !option) return;

    var _class = '',
        _css = null;

    if (isString(option)) {
        _class = option;
    }
    if (isObject(option) && !isEmptyObject(option)) {
        if (option.classname && isString(option.classname)) {
            _class = option.classname;
        }
        if (isObject(option.css) && !isEmptyObject(option.css)) {
            _css = option.css;
        }
        if (!option.classname && !option.css) {
            _css = option;
        }
    }
    if (_class) {
        if (isDOM(node)) {
            if (isUpdate) {
                if (overwrite) {
                    setClass(node, _class);
                } else {
                    addClass$1(node, _class);
                }
            }
        } else {
            if (overwrite) {
                node.setClassName(_class);
            } else {
                node.addClassName(_class);
            }
            if (isUpdate && node.realDom) {
                if (overwrite) {
                    setClass(node.realDom, _class);
                } else {
                    addClass$1(node.realDom, _class);
                }
            }
        }
    }
    if (_css) {
        if (isDOM(node)) {
            if (isUpdate) {
                css$1(node, _css);
            }
        } else {
            node.setStyle(_css);
            if (isUpdate && node.realDom) {
                css$1(node.realDom, _css);
            }
        }
    }
    if (!isDOM(node) && node.update) {
        node.update();
    }
}

function _initStyle(c, vc, zoom, zoomParent, o, p, styleOption, update) {
    if (!vc || !o) return;
    var style = styleOption || {},
        custom = style.custom,
        inner = style.inner,
        zoomContainer = style.zoomContainer,
        zoomPane = style.zoomPane,
        pane = style.pane,
        container = style.container,
        df = style.default;


    if (container && update) {
        _setStyle(c, container, true);
    }

    if (inner) {
        _setStyle(vc, inner);
    }
    if (zoomContainer) {
        _setStyle(zoom, zoomContainer, true);
    }
    if (zoomPane) {
        _setStyle(zoomParent, zoomPane, true);
    }
    if (pane) {
        _setStyle(p, pane, true);
    }
    if (isObject(df)) {
        vc.children.forEach(function (panel) {
            if (!panel.isWidget) {
                for (var key in df) {
                    _setStyle(getNodesByPanel(panel)[key], df[key], true);
                }
            }
        });
    }
    if (custom) {
        (isArray(custom) ? custom : [custom]).forEach(function (com) {
            if (isObject(com) && com.panels) {
                veach(vc, function (elements) {
                    for (var key in com) {
                        if (com[key] && elements[key] && !elements[key].isExtend) {
                            _setStyle(elements[key], com[key], true, true);
                        }
                    }
                }, getRealIds(vc, com.panels, o.alias));
            }
        });
    }
}





/*eslint-disable */
function getNewSize(old, percent, vsize, vvsize, totalSize) {
    return old !== undefined ? percent !== null ? percent * totalSize : vsize : vvsize;
}
/*eslint-enable*/

function setNodeLayout(vnode, vvnode, size, fullId, fullzIndex) {
    if ((vvnode.width !== undefined || vvnode.width !== null) && !vnode.isExtend) {
        var _oldWidth = vnode._oldWidth,
            _oldHeight = vnode._oldHeight,
            _oldTop = vnode._oldTop,
            _oldLeft = vnode._oldLeft,
            width = vnode.width,
            height = vnode.height,
            top = vnode.top,
            left = vnode.left,
            percentWidth = vnode.percentWidth,
            percentHeight = vnode.percentHeight,
            percentLeft = vnode.percentLeft,
            percentTop = vnode.percentTop;


        vnode.setHeight(getNewSize(_oldHeight, percentHeight, height, vvnode.height, size.height)).setWidth(getNewSize(_oldWidth, percentWidth, width, vvnode.width, size.width)).setTop(getNewSize(_oldTop, percentTop, top, vvnode.top, size.height)).setLeft(getNewSize(_oldLeft, percentLeft, left, vvnode.left, size.width));
    }

    if (vvnode.oldSize) {
        vnode.oldSize = vvnode.oldSize;
        vnode.setStyle({
            zIndex: vvnode.styles.zIndex || CT.PANEL_DEFAULT_ZINDEX
        });
    }
    if (fullId > 0 && vnode.getId() === fullId) {
        vnode.setLeft(0).setTop(0).setStyle({
            zIndex: fullzIndex
        });
    }
}

function updateOldVc(vnode, vvnode, size, o, fullId, fullzIndex) {
    setNodeLayout(vnode, vvnode, size, fullId, fullzIndex);
    vnode.children.forEach(function (vn) {
        vvnode.children.forEach(function (vvn) {
            if (vn.getId() === vvn.getId() && vnode.getRole() !== CT.PANEL) {
                setNodeLayout(vn, vvn, size, fullId, fullzIndex);
            }
        });
    });
}

function _setOverflow(vc, ids, type) {
    if (!vc || !ids || !type) return;
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach(function (id) {
            var panel = getNodeById(vc, id, 'wrap');
            var style = null;

            if (panel) {
                if (type === 'auto' || type === 'visible') {
                    style = { overflow: type };
                }
                if (type === 'overflowX' || type === 'overflowY') {
                    style[type] = 'auto';
                }

                panel.setStyle(style).update();
            }
        });
    }
}

function setOverflows(vc, o) {
    if (!vc || !o || !o.panelOverflow) return;
    var overflow = o.panelOverflow;

    if (overflow) {
        for (var key in overflow) {
            if (overflow[key] === 'all') {
                overflow[key] = getAllIds(vc);
            }
            if (isNumber(overflow[key]) || isArray(overflow[key])) {
                _setOverflow(vc, overflow[key], key);
            }
        }
    }
}

function updateContainerSize(vc, o) {
    var _o$padding2 = o.padding,
        left = _o$padding2.left,
        right = _o$padding2.right,
        bottom = _o$padding2.bottom,
        top = _o$padding2.top;


    return {
        width: vc.width + left + right,
        height: vc.height + top + bottom
    };
}

function updateVCC(vc, c, sizes, o, fullId, zIndex) {
    if (!vc || !isDOM(c) || !sizes || !o) return;

    var vcc = createVc(),
        panels = [],
        ids = [];

    initLayout(o, vcc);

    updateLayout(vcc, c, sizes, o, panels, ids);

    loadExtends(vcc, o, false);

    if (fullId) {
        _full(vcc, fullId, zIndex || 0);
    }

    updateOldVc(vc, vcc, updateContainerSize(vcc, o), o, fullId, zIndex);

    updateExtends(vc, o);

    vc.update();

    if (o.dev.enable) {
        loadDev(c, vc, o);
    }

    setLineheight(vc, o.lineHeight);
}

function _setNodeLineHeight(target) {
    if (target && target.realDom) {
        var realDom = target.realDom,
            height = getPureStyle(realDom, 'height') || realDom.clientHeight,
            pt = getPureStyle(realDom, 'padding-top'),
            pb = getPureStyle(realDom, 'padding-bottom'),
            bt = getPureStyle(realDom, 'border-top-width'),
            bb = getPureStyle(realDom, 'border-bottom-width');


        target.setStyle({ lineHeight: height - pt - pb - bt - bb + 'px' }).update();
    }
}

function setLineheight(vc, option) {
    if (!vc || !option) return;
    var op = isObject(option) ? [option] : option;

    if (isArray(op)) {
        op.forEach(function (o) {
            var panels = o.panels;
            var type = o.type || 'head';

            if (isNumber(panels)) {
                panels = [panels];
            }
            if (isString(panels) && panels === 'all') {
                panels = getAllIds(vc);
            }
            if (isArray(panels)) {
                veach(vc, function (nodes) {
                    (isArray(type) ? type : [type]).forEach(function (t) {
                        if (isString(t) && nodes) {
                            if (t === 'all') {
                                ['head', 'center', 'right', 'foot', 'left'].forEach(function (_t) {
                                    _setNodeLineHeight(nodes[_t]);
                                });
                            } else {
                                _setNodeLineHeight(nodes[t]);
                            }
                        }
                    });
                }, panels);
            }
        });
    }
}

function insertTplDomToVc(target, vnode, type) {
    if (isDOM(target) && attr$1(target, CT.TARGET) === type && vnode && vnode.realDom) {
        vnode.realDom.appendChild(target);
    }
}

function loadTemplate(c, vc, o) {
    if (!isDOM(c) || !vc || !isDOM(vc.realDom) || !o) return;
    var env = o.env;

    eachChild(c, function (node) {
        if (isDOM(node) && node.hasAttribute(CT.POPO)) {
            var id = getRealIds(vc, node.getAttribute(CT.POPO), o.alias),
                panel = getNodeById(vc, id, 'panel'),
                title = node.getAttribute('title'),
                cls = node.getAttribute('class');

            if (panel && panel.realDom) {
                var els = getNodesByPanel(panel);

                addClass$1(panel.realDom, cls);

                var children = node.childNodes;
                for (var i = 0, len = children.length; i < len; i++) {
                    var target = children[env === 'vue' ? 0 : i];
                    var __t = attr$1(target, CT.TARGET);
                    if (__t && els[__t]) {
                        insertTplDomToVc(target, els[__t], __t);
                    }
                }

                if (!query(node, '[' + CT.TARGET + '=head]') && title && els.head && els.head.realDom && !els.head.realDom.hasChildNodes()) {
                    els.head.realDom.innerHTML = title;
                }
            }
        }
    });
}

function restorePanelTemplate(panel, c, vc, o) {
    if (!panel || !isDOM(panel.realDom) || !isDOM(c) || !vc || !o) return;
    eachChild(c, function (node) {
        if (isDOM(node) && node.hasAttribute(CT.POPO)) {
            var id = getRealIds(vc, node.getAttribute(CT.POPO), o.alias);

            if (panel.getId() === id) {
                var nodes = getNodesByPanel(panel);

                for (var type in nodes) {
                    if (nodes[type] && nodes[type].realDom) {
                        var target = nodes[type].realDom.firstChild;

                        if (isDOM(target) && type === target.getAttribute(CT.TARGET)) {
                            node.appendChild(target);
                        }
                    }
                }

                return false;
            }
        }

        return true;
    });
}

function restoreTemplate(c, vc, o) {
    if (!isDOM(c) || !vc || !isDOM(vc.realDom) || !o) return;
    eachChild(c, function (node) {
        if (isDOM(node) && node.hasAttribute(CT.POPO)) {
            var id = getRealIds(vc, node.getAttribute(CT.POPO), o.alias),
                panel = getNodeById(vc, id, 'panel');

            if (panel && panel.realDom) {
                var nodes = getNodesByPanel(panel);

                for (var type in nodes) {
                    if (nodes[type] && nodes[type].realDom) {
                        var target = nodes[type].realDom.firstChild;

                        if (isDOM(target) && type === target.getAttribute(CT.TPL)) {
                            target.removeAttribute(CT.TPL);
                            addClass$1(target, type);
                            node.appendChild(target);
                        }
                    }
                }
            }
        }
    });
}

function getScrollPane(o, c, init) {
    /*eslint-disable */
    var target = o.zoom.enable ? c.parentNode.parentNode : c.parentNode;
    /*eslint-enable */

    if (init && isDOM(target)) {
        target.scrollLeft = 0;
        target.scrollTop = 0;
    }

    return target;
}

function focusOn(vc, c, o, id, offsetX, offsetY) {
    if (!vc || !c || !o || !id < 0) return;

    var panel = getNodeById(vc, getId(id, o.alias), 'panel');

    if (panel) {
        var pane = getScrollPane(o, c, true),
            scale = o.zoom.enable ? o.zoom.scale : 1;

        if (pane && isDOM(pane)) {
            pane.scrollLeft = (panel.left + offsetX) * scale;
            pane.scrollTop = (panel.top + offsetY) * scale;
        }
    }
}

function zoomUpdate(vc, c, scale) {
    if (!vc || !c || !scale) return;
    var rect = getRect(c.parentNode.parentNode),
        width = c._origionWidth || vc.width,
        height = c._origionHeight || vc.height;

    var top = (rect.height - height * scale) / 2,
        left = (rect.width - width * scale) / 2;

    if (top < 0 || scale === 1) top = 0;
    if (left < 0 || scale === 1) left = 0;

    css$1(c.parentNode, {
        paddingTop: top + 'px',
        paddingLeft: left + 'px'
    });
}

function togglePoPo(c, show) {
    var display = show ? '' : 'none';

    eachChild(c, function (node) {
        if (isDOM(node) && node.getAttribute(CT.POPO)) {
            css$1(node, { display: display });
        }
    });
}

function n2px$1(fz) {
    if (isNumber(fz)) return fz + 'px';
    if (isString(fz)) {
        if (fz.indexOf('px') < 0 || fz.indexOf('em') > 0) {
            return fz;
        } else if (!isNaN(Number(fz))) {
            return fz + 'px';
        }
    }

    return fz;
}

function px2n$1(str) {
    if (isString(str)) {
        var i = str.indexOf('px');

        if (i >= 0) {
            return Number(str.substring(0, i));
        }
    }

    if (isNumber(str)) {
        return str;
    }

    return 0;
}

function _addGGL$1(panel, o) {
    if (!panel || !isDOM(panel.realDom) || !o || !o.show) return;
    removeByClass(CT.PANEL_GUIDELINES, panel.realDom);
    var ggl = query(panel.realDom, '.' + CT.GUIDELINES),
        width = panel.width,
        height = panel.height,
        zIndex = o.zIndex,
        size = o.size || 15,
        color = o.color,
        lineSize = o.lineSize,
        lines = new SVG(),
        svg = create$1('div', CT.PANEL_GUIDELINES, {
        zIndex: zIndex,
        height: height + 'px',
        width: width + 'px',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
        userSelect: 'none'
    }, panel.realDom);

    if (isDOM(ggl)) {
        panel.realDom.removeChild(ggl);
    }

    var rows = Math.ceil(height / size),
        cols = Math.ceil(width / size),
        points = '',
        points2 = '';

    for (var i = 1; i <= rows; i++) {
        var y = size * i;

        points += 'M0 ' + y + ' L' + width + ' ' + y + ' ';
    }
    for (var _i = 1; _i <= cols; _i++) {
        var x = size * _i;

        points += 'M' + x + ' 0 L' + x + ' ' + height + ' ';
    }

    rows = Math.ceil(height / size / 4);
    cols = Math.ceil(width / size / 4);
    for (var _i2 = 1; _i2 <= rows; _i2++) {
        var _y = size * _i2 * 4;

        points2 += 'M0 ' + _y + ' L' + width + ' ' + _y + ' ';
    }
    for (var _i3 = 1; _i3 <= cols; _i3++) {
        var _x = size * _i3 * 4;

        points2 += 'M' + _x + ' 0 L' + _x + ' ' + height + ' ';
    }

    lines.create('path', { d: points, stroke: color, strokeWidth: lineSize });
    lines.create('path', { d: points2, stroke: color, strokeWidth: lineSize * 1.5 });
    svg.appendChild(lines.createElement());
}

function addPanelGuidelines$1(vc, o) {
    if (!vc || !o || !o.dev || !o.dev.enable || !o.dev.panelGuideline.show) return;
    var gg = o.dev.panelGuideline,
        options = merge$1({
        color: 'rgba(0,0,0,.25)',
        width: 1,
        size: 10,
        zIndex: 0
    }, gg || {});

    var ids = gg.ids;

    if (ids === 'all') {
        ids = getAllIds(vc);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach(function (id) {
            id = getRealIds(vc, id, o.alias);
            if (id > 0) {
                var node = vc.getChild(id);

                if (node && node.realDom) {
                    _addGGL$1(node, options);
                }
            }
        });
    }
}

function createPanelInfo$1(panel, size, id, position, color, fontSize) {
    fontSize = n2px$1(fontSize);
    if (panel && panel.realDom) {
        var width = Math.round(panel.width),
            height = Math.round(panel.height),
            left = Math.round(panel.left),
            top = Math.round(panel.top);

        if (size || id || position) {
            var info = '';

            if (id) {
                info += panel[CT.COMPONENT_ID_KEY];
            }
            if (size) {
                info += (id ? ' - ' : '') + ' W' + width + ' H' + height;
            }
            if (position) {
                info += (id || size ? ' - ' : '') + ' L' + left + ' T' + top;
            }

            return new VNode('span').addClassName(CT.INFO).setTop(panel.top + 5).setLeft(panel.left + 5).setWidth('auto').setHeight('auto').setStyle({ color: color, fontSize: fontSize }).setHtml(info);
        }
    }

    return null;
}

function createDebugInfo$1(vc, dev) {
    if (!vc || !dev || !dev.enable || !dev.panel.show) return;
    var o = dev.panel,
        id = o.id,
        size = o.size,
        position = o.position,
        background = o.background,
        fontSize = n2px$1(o.fontSize),
        fontColor = o.fontColor;

    if (vc.realDom && (id || size || position || background)) {
        for (var i = 0, len = vc.children.length; i < len; i++) {
            if (vc.children[i].realDom && background && isString(background)) {
                css$1(vc.children[i].realDom, { background: background });
            }
            if (vc.children[i].isWidget) continue;
            var span = createPanelInfo$1(vc.children[i], size, id, position, fontColor, fontSize);

            if (span) {
                vc.realDom.appendChild(span.createElement());
            }
        }
    }
}

function createSVGText$1(svg, text, x, y, fontSize, fill) {
    if (svg) {
        svg.create('text', { x: x, y: y, fontSize: fontSize, fill: fill }).setHtml(text);
    }
}

function addGuidelines$1(c, vc, o) {
    if (!c || !vc || !o || !o.dev.guideline.show) return;
    removeByClass(CT.GUIDELINES, c);
    var gl = o.dev.guideline,
        padding = o.padding,
        width = vc.width + padding.left + padding.right,
        height = vc.height + padding.top + padding.bottom,
        identifier = gl.identifier,
        fontSize = gl.fontSize,
        fontColor = gl.fontColor,
        zIndex = gl.zIndex,
        rows = o.rows,
        cols = o.cols,
        unitRowHeight = (100 / rows).toFixed(5) * height / 100,
        unitColWidth = (100 / cols).toFixed(5) * width / 100,
        lines = new SVG(),
        svg = create$1('div', CT.GUIDELINES, {
        zIndex: zIndex,
        height: height + 'px',
        width: width + 'px',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
        userSelect: 'none'
    }, c),
        position = c.style.position;

    if (position === '' || position === 'static') {
        css$1(c, {
            position: 'relative'
        });
    }

    var points = '';

    for (var i = 0; i <= rows; i++) {
        var y = unitRowHeight * i;

        points += 'M0 ' + y + ' L' + width + ' ' + y + ' ';
        if (identifier) {
            createSVGText$1(lines, i, 5, y - unitRowHeight + px2n$1(fontSize) + 5, fontSize, fontColor);
        }
    }
    for (var _i4 = 0; _i4 <= cols; _i4++) {
        var x = unitColWidth * _i4;

        points += 'M' + x + ' 0 L' + x + ' ' + height + ' ';
        if (identifier && _i4 !== 1) {
            createSVGText$1(lines, _i4, x - unitColWidth + 5, px2n$1(fontSize) + 5, fontSize, fontColor);
        }
    }

    lines.create('path', { d: points, stroke: gl.color, strokeWidth: gl.lineSize });
    svg.appendChild(lines.createElement());
}

function addSplitLine$1(c, vc, o) {
    if (!c || !vc || !o || !o.dev.splitline.show) return;
    removeByClass(CT.SPLITLINES, c);
    var sl = o.dev.splitline,
        fontSize = n2px$1(sl.fontSize),
        fontColor = sl.fontColor,
        padding = o.padding,
        identifier = sl.identifier,
        width = vc.width + padding.left + padding.right,
        height = vc.height + padding.top + padding.bottom,
        unitRowHeight = sl.height,
        unitColWidth = sl.width,
        zIndex = sl.zIndex,
        rows = Math.ceil(height / unitRowHeight),
        cols = Math.ceil(width / unitColWidth),
        svg = create$1('div', CT.SPLITLINES, {
        zIndex: zIndex,
        height: height + 'px',
        width: width + 'px',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
        userSelect: 'none'
    }, c),
        lines = new SVG(),
        position = c.style.position,
        infoY = [],
        infoX = [];

    if (position === '' || position === 'static') {
        css$1(c, { position: 'relative' });
    }

    var points = '';

    for (var i = 0; i <= rows; i++) {
        var y = unitRowHeight * i;

        points += 'M0 ' + y + ' L' + width + ' ' + y + ' ';
        infoY.push(y);
    }
    for (var _i5 = 0; _i5 <= cols; _i5++) {
        var x = unitColWidth * _i5;

        points += 'M' + x + ' 0 L' + x + ' ' + height + ' ';
        infoX.push(x);
    }

    if (identifier) {
        infoX.forEach(function (x) {
            infoY.forEach(function (y) {
                createSVGText$1(lines, x + ', ' + y, x + 10, y + 10 + px2n$1(fontSize), fontSize, fontColor);
            });
        });
    }

    lines.create('path', { d: points, stroke: sl.color, strokeWidth: sl.lineSize });
    svg.appendChild(lines.createElement());
}

function loadDev$1(c, vc, o) {
    if (!vc || !c || !o || !o.dev || !o.dev.enable) return false;
    removeByClass(CT.INFO, c);
    createDebugInfo$1(vc, o.dev);
    addGuidelines$1(c, vc, o);
    addSplitLine$1(c, vc, o);
    addPanelGuidelines$1(vc, o);

    return true;
}

var dragHandle = {

    /**
     * Start drag
     * @ignore
     * @param {Object} e mouse event param
     */
    _onDragStart: function _onDragStart(e) {
        stop(e);
        var pane = this._scrollPane;

        if (isDOM(pane)) {
            var clientX = e.clientX,
                clientY = e.clientY,
                scrollLeft = pane.scrollLeft,
                scrollTop = pane.scrollTop;


            this._startDrag = {
                x: clientX,
                y: clientY,
                width: getPureStyle(pane, 'width'),
                height: getPureStyle(pane, 'height'),
                left: scrollLeft,
                top: scrollTop
            };
            // css(pane, { cursor: 'move' });   
            addClass$1(pane, CT.NAME + '-grabbing');
            on(pane, 'mousemove', this._onDragging, this);
            on(pane, 'mouseup', this._onDragend, this);
        }
    },


    /**
     * Dragging
     * @ignore
     * @param {Object} e mouse event param
     */
    /*eslint-disable */
    _onDragging: function _onDragging(e) {
        // DomEvent.stop(e);
        var pane = this._scrollPane,
            dr = this._startDrag;

        if (isDOM(pane) && isObject(dr)) {
            pane.scrollLeft = (dr.left || 0) - e.clientX + dr.x;
            pane.scrollTop = (dr.top || 0) - e.clientY + dr.y;
        }
    },


    /**
     * End drag
     * @ignore
     * @param {Object} e mouse event param
     */
    _onDragend: function _onDragend(e) {
        // DomEvent.stop(e);
        off(this._scrollPane, 'mousemove', this._onDragging, this);
        removeClass$1(this._scrollPane, CT.NAME + '-grabbing');
    },

    /*eslint-enable */

    /**
     * Disable mouse drag
     */
    disableDrag: function disableDrag() {
        var pane = this._scrollPane;

        if (isDOM(pane)) {
            off(pane, 'mousedown', this._onDragStart, this);
            off(pane, 'mousemove', this._onDragging, this);
            off(pane, 'mouseup', this._onDragend, this);
            this._startDrag = null;
            removeClass$1(pane, CT.NAME + '-grab');
        }
    },


    /**
     * Enable drag on container and start drag
     */
    enableDrag: function enableDrag() {
        var o = this.options;

        if (o.drag && this._pane) {
            var dragPane = getScrollPane(o, this._pane);

            if (isDOM(dragPane)) {
                this._scrollPane = dragPane;
                // this.disableDrag();
                addClass$1(dragPane, CT.NAME + '-grab');
                on(dragPane, 'mousedown', this._onDragStart, this);
            }
        }
    }
};

var resize = {

    /**
     * Add container resize event on window resize
     * @ignore.
     */
    _resize: function _resize() {
        var _this = this;

        var o = this.options,
            c = this._pane,
            vc = this.vc,
            ui = o.updateInterval;

        if (!this._onResize && o.trackResize) {
            var interval = o.renderDelay > 0 ? Math.max(ui, o.renderDelay) : ui;
            // const interval = ui;

            this._onResize = throttle(function (_fn, _context) {
                if (!o.trackResize) return;
                if (o.zoom.enable) {
                    zoomUpdate(vc, c, _this.scale);
                } else {
                    _this.update();
                    if (typeof o.update === 'function') {
                        o.update(_this);
                    }
                    if (typeof _fn === 'function') {
                        bind$1(_fn, _context)(_this);
                    }
                }
            }, interval, this);
            on(window, 'resize', this._onResize, this);
        }
    },


    /**
     * Remove resize event listener
     * @ignore
     */
    _removeResize: function _removeResize() {
        if (this._onResize) {
            off(window, 'resize', this._onResize, this);
            this._onResize = null;
        }
    }
};

var wheelzoom = {
    /**
     * wheel zoom handle
     * @ignore
     */
    _performZoom: function _performZoom(center) {
        var ratio = this.options.zoom.ratio;

        this.zoom(this.scale + (this._wheelScroll.delta > 0 ? ratio : -ratio), center);
    },


    /**
     * Wheel scrolling
     * @ignore
     * @param {Object} e wheel event param
     */
    _onWheelScroll: function _onWheelScroll(e) {
        var _this = this;

        stop(e);
        var delta = getWheelDelta(e),
            time = this._wheelScroll.startTime;

        /*eslint-disable */
        this._wheelScroll.delta = delta;
        if (!time) {
            this._wheelScroll.startTime = +new Date();
        }
        var left = Math.max(CT.DEBOUNCE - (+new Date() - time), 0);
        /*eslint-enable */

        clearTimeout(this._wheelScroll.timer);

        this._wheelScroll.timer = setTimeout(function () {
            _this._performZoom({ x: e.offsetX, y: e.offsetY });
        }, left);
    },
    enableScrollWheel: function enableScrollWheel() {
        this.disableScrollWheel();

        if (!this._scrollPane) {
            this._scrollPane = getScrollPane(this.options, this._pane);
        }
        this._wheelScroll = {
            delta: 0,
            startTime: 0,
            timer: 0
        };
        on(this._scrollPane, 'mousewheel', this._onWheelScroll, this);
    },
    disableScrollWheel: function disableScrollWheel() {
        if (this._scrollPane) {
            off(this._scrollPane, 'mousewheel', this._onWheelScroll, this);
        }
    }
};

/**
 * PoPoInstance
 * @class
 */

var PoPoInstance = function () {

    /**
     * @constructor
     * @param {Object} options options
     */
    function PoPoInstance(options) {
        classCallCheck(this, PoPoInstance);

        var o = this.options = merge$1(defaultOptions, options),
            c = this.container = o.container ? get$$1(o.container) : null;

        this._initOptions();

        this._fullId = o.fullId;

        this._fullZIndex = o.fullZIndex || 0;

        this._hideIds = o.hideIds || [];

        this._showIds = o.dev.showIds || [];

        this.style = merge$1(defaultStyle, o.style || {});

        this._sizes = initSize(o.rows, o.cols);

        this._vc = createVc();

        if (options.uuid) {
            this.uuid = options.uuid;
        }

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


    createClass(PoPoInstance, [{
        key: '_initOptions',
        value: function _initOptions() {
            var o = this.options,
                scale = legalNumber(o.fontScale, 0.1);

            o.padding = formatMargin(o.padding, scale);

            if (isObject(o.panel.custom)) {
                o.panel.custom = [o.panel.custom];
            }
            if (isArray(o.panel.custom)) {
                o.panel.custom = o.panel.custom.map(function (panel) {
                    return merge$1({
                        headHeight: 0,
                        footHeight: 0,
                        leftWidth: 0,
                        rightWidth: 0,
                        gutter: 0,
                        zIndex: CT.PANEL_DEFAULT_ZINDEX
                    }, panel);
                });
            }

            if (isObject(o.widgets)) {
                o.widgets.isWidget = true;
            }
            if (isArray(o.widgets)) {
                o.widgets.forEach(function (w) {
                    w.isWidget = true;
                });
            }

            var el = document.documentElement;

            if (css$1(el, 'fontSize') === '16px' && o.rem > 1) {
                var rem = formatNumber(o.rem);

                css$1(el, {
                    fontSize: isNumber(rem) ? translateNumberToPercentage(rem) : o.rem
                });
            }
        }

        /**
         * Initialization container
         * @ignore
         */

    }, {
        key: '_initContainer',
        value: function _initContainer() {
            var vc = this._vc,
                c = this.container,
                o = this.options,
                sizes = this._sizes;

            if (vc && c && o && sizes) {
                // Mark container if it is in another popo instance.
                stampInner(c);

                this._oldContainerStyle = {
                    display: getStyle(c, 'display')
                };

                // Set container position when zoom on.
                if (getStyle(c, 'position') === 'static' && o.zoom.enable) {
                    // save origin container style state
                    this._oldContainerStyle.position = 'static';
                    css$1(c, { position: 'relative' });
                }

                // Hide data-popo elements in container.
                togglePoPo(c, false);

                // Add custom style to container
                var style = this.style;


                if (style) {
                    _setStyle(c, style.container, true);
                }

                // Nest PoPo resize update interval.
                if (isInPoPo(c)) {
                    o.updateInterval += 50;
                }

                // Create Zoom Container and Pane
                var zoomContainer = this._zoomContainer = createZoomContainer(c, o),
                    scroll = o.scroll,
                    _style = {},
                    p = this._pane = createPane(o);

                // If zoom mode on, drag option auto enable.
                if (o.zoom.enable) {
                    o.drag = true;
                }

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
                css$1(zoomContainer, _style);
                css$1(zoomContainer.parentNode, {
                    overflow: o.overflowVisible ? 'visible' : 'hidden'
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
                loadExtends(vc, o.extends, o, true);

                // Add widget pannel
                loadExtends(vc, o.widgets, o, true);

                // Set Panel Overflow style.
                setOverflows(vc, o);

                // Full the select full panel
                if (this._fullId) {
                    _full(vc, this._getId(this._fullId), this._fullZIndex);
                }

                css$1(c, { display: 'none' });

                // Update style
                _initStyle(c, vc, zoomContainer, zoomContainer.parentNode, o, p, this.style);

                this._render();
            }
        }

        /**
         * Prepare render
         * @ignore
         */

    }, {
        key: '_render',
        value: function _render() {
            var _this = this;

            var c = this._pane,
                o = this.options;

            if (c && o) {
                var delay = o.renderDelay;

                if (delay > 0 && o.updateInterval > 0) {
                    delay = Math.max(delay, o.updateInterval);
                }
                if (delay > 0) {
                    setTimeout(function () {
                        _this._onRender();
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

    }, {
        key: '_onRender',
        value: function _onRender() {
            var vc = this._vc,
                c = this.container,
                pane = this._pane,
                o = this.options;

            if (c && vc && o) {
                var ids = this._showIds;

                if (ids) {
                    this._hideIds = updateHideIds(ids, this.getIds()) || this._hideIds;
                }
                setHide(this._hideIds, vc, o, ids && ids.length > 0);

                pane.appendChild(vcToDom(vc));

                if (o.dev.enable) {
                    loadDev$1(pane, vc, o);
                }

                loadTemplate(c, vc, o);

                this._resize();

                css$1(c, {
                    display: this._oldContainerStyle.display
                });

                this._updateSize();

                if (o.zoom.enable) {
                    var scale = legalNumber(o.zoom.auto ? Math.min(c.clientHeight / this.height, c.clientWidth / this.width) : o.zoom.scale, CT.MIN_ZOOM, CT.MAX_ZOOM);

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
                    var _o$focus = o.focus,
                        id = _o$focus.id,
                        offsetX = _o$focus.offsetX,
                        offsetY = _o$focus.offsetY;


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

    }, {
        key: '_initZoomEvent',
        value: function _initZoomEvent() {
            var _this2 = this;

            var o = this.options,
                c = this.container,
                zoom = o.zoom;

            if (zoom.enable && zoom.control) {
                var zoomin = query(c, '.' + CT.ZOOMIN),
                    zoomout = query(c, '.' + CT.ZOOMOUT),
                    ratio = zoom.ratio;

                this._zoomInfoPane = query(c, '.' + CT.ZOOMINFO);

                if (isDOM(zoomin) && isDOM(zoomout)) {
                    on(zoomin, 'click', function () {
                        _this2.zoom(_this2.scale + ratio);
                    }, this);

                    on(zoomout, 'click', function () {
                        _this2.zoom(_this2.scale - ratio);
                    }, this);
                }
            }
        }

        /**
         * Get component real id.
         * @param {String|Number} id panel id or alias.
         * @return {Array} component ids
         */

    }, {
        key: '_getId',
        value: function _getId(id) {
            return isNumber(id) ? id : getRealIds(this._vc, id, this.options.alias);
        }

        /**
         * Get vnode by id and type.
         * @ignore
         * @param {String|Number} id panel id or alias
         * @param {String} type component type:panel, panelContainer, lcr, center,left, right, head, foot @default panel
         * @return {VNode} vnode
         */

    }, {
        key: '_getNode',
        value: function _getNode(id, type) {
            return getNodeById(this._vc, this._getId(id), type || CT.PANEL);
        }

        /**
         * Get Option
         * @return {Object} option
         */

    }, {
        key: 'getOption',
        value: function getOption() {
            return this.options;
        }

        /**
         * Get Panel count
         * @return {Number} panel count
         */

    }, {
        key: 'getPanelCount',
        value: function getPanelCount() {
            return this.getIds().length;
        }

        /**
         * Get all panel id.
         * @return {Array} ids array
         */

    }, {
        key: 'getIds',
        value: function getIds() {
            return getAllIds(this._vc);
        }

        /**
         * @Get component alias
         * @return {Array} alias
         */

    }, {
        key: 'getAliasName',
        value: function getAliasName() {
            var alias = this.options.alias;

            if (alias && isArray(alias)) {
                return alias.map(function (a) {
                    return a.name;
                });
            }

            return [];
        }

        /**
         * Get component alias
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {Array|String} component alias
         */

    }, {
        key: 'getAlias',
        value: function getAlias(target) {
            var alias = this.options.alias;

            if (target === undefined) {
                return alias;
            }
            var result = (isArray(target) ? target : [target]).map(function (t) {
                return getAliasById(alias, getTargetDataId(t));
            });

            return result.length === 1 ? result[0] : result;
        }

        /**
         * Get screen container
         * @return {HTMLElement} app container
         */

    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.container;
        }

        /**
         * Zoom screen
         * @param {Number} scale scale
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'zoom',
        value: function zoom(scale) {
            var c = this._pane,
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

            style[TRANSFORM] = 'scale(' + scale + ')';
            css$1(c, style);

            /*eslint-disable */
            var rect = getRect(preview.parentNode);
            /*eslint-enable */

            var top = (rect.height - height * scale) / 2,
                left = (rect.width - width * scale) / 2;

            if (top < 0 || scale === 1) top = 0;
            if (left < 0 || scale === 1) left = 0;

            css$1(preview, {
                width: width * scale + 'px',
                height: height * scale + 'px',
                paddingTop: top + 'px',
                paddingLeft: left + 'px'
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

    }, {
        key: 'focus',
        value: function focus(id, offsetX, offsetY) {
            focusOn(this._vc, this._pane, this.options, id, offsetX || 0, offsetY || 0);

            return this;
        }

        /**
         * Get elements
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {Object} elements, include panel, panelContainer, lcr, center,left, right, head, foot
         */

    }, {
        key: 'get',
        value: function get$$2(target) {
            var _this3 = this;

            if (!target) return null;

            var result = (!isArray(target) ? [target] : target).map(function (t) {
                return getRealdomsById(_this3._vc, getTargetDataId(t), _this3.options);
            });

            return result.length === 1 ? result[0] : result;
        }

        /**
         * Get all elements
         * @return {Array} all elements.
         */

    }, {
        key: 'getAll',
        value: function getAll() {
            return this.get(this.getIds());
        }

        /**
         * Get component
         * @ignore
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @param {String} type component type: panel, panelContainer, lcr, center,head, left, right, foot
         * @return {HTMLElement} component container
         */

    }, {
        key: '_getXComponent',
        value: function _getXComponent(target, type) {
            var result = this.get(target);

            return isArray(result) ? result.map(function (r) {
                return r && r[type];
            }) : result && result[type];
        }

        /**
         * get panel container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} wrap container
         */

    }, {
        key: 'panel',
        value: function panel(target) {
            return this._getXComponent(target, 'panel');
        }

        /**
         * get wrap container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} wrap container
         */

    }, {
        key: 'wrap',
        value: function wrap(target) {
            return this._getXComponent(target, 'wrap');
        }

        /**
         * get center container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} center container
         */

    }, {
        key: 'center',
        value: function center(target) {
            return this._getXComponent(target, 'center');
        }

        /**
         * get head container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} head container
         */

    }, {
        key: 'head',
        value: function head(target) {
            return this._getXComponent(target, 'head');
        }

        /**
         * get left container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} left container
         */

    }, {
        key: 'left',
        value: function left(target) {
            return this._getXComponent(target, 'left');
        }

        /**
         * get right container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} right container
         */

    }, {
        key: 'right',
        value: function right(target) {
            return this._getXComponent(target, 'right');
        }

        /**
         * get foot container
         * @param {String|Number|HTMLElement|Array} target panel id , map key, panel dom and their by array.
         * @return {HTMLElement} foot container
         */

    }, {
        key: 'foot',
        value: function foot(target) {
            return this._getXComponent(target, 'foot');
        }

        /**
         * Clear Panel
         * @param {String|Number|HTMLElement|Array} target panel id or alias, or panel dom.
         * @param {Boolean} clearTpl if true will delete template content
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'clearPanel',
        value: function clearPanel(target, clearTpl) {
            var _this4 = this;

            if (target) {
                (!isArray(target) ? [target] : target).forEach(function (t) {
                    var node = _this4._getNode(getTargetDataId(t));

                    if (node) {
                        if (!clearTpl) {
                            restorePanelTemplate(node, _this4.container, _this4._vc, _this4.options);
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

    }, {
        key: 'clearAllPanel',
        value: function clearAllPanel(clearTpl) {
            return this.clearPanel(this._vpanels, clearTpl);
        }

        /**
         * Set Panel Layout
         * @param {Object} option panel layout options
         */

    }, {
        key: '_setPanel',
        value: function _setPanel(_ref) {
            var _this5 = this;

            var panels = _ref.panels,
                _ref$headHeight = _ref.headHeight,
                headHeight = _ref$headHeight === undefined ? 0 : _ref$headHeight,
                _ref$footHeight = _ref.footHeight,
                footHeight = _ref$footHeight === undefined ? 0 : _ref$footHeight,
                _ref$leftWidth = _ref.leftWidth,
                leftWidth = _ref$leftWidth === undefined ? 0 : _ref$leftWidth,
                _ref$rightWidth = _ref.rightWidth,
                rightWidth = _ref$rightWidth === undefined ? 0 : _ref$rightWidth,
                _ref$gutter = _ref.gutter,
                gutter = _ref$gutter === undefined ? 0 : _ref$gutter;

            var o = this.options.panel;

            if (!panels) return;
            if (!isArray(panels)) {
                panels = [panels];
            }
            if (!o.custom) {
                o.custom = [];
            }
            if (isObject(o.custom)) {
                o.custom = [o.custom];
            }
            if (isArray(o.custom)) {
                this.clearPanel(panels);
                var nodes = panels.map(function (id) {
                    return _this5._getNode(getTargetDataId(id));
                });

                o.custom.forEach(function (c, i) {
                    if (c.panels === panels) {
                        o.custom.splice(i, 1);

                        return;
                    }
                    if (!isArray(c.panels)) {
                        c.panels = [c.panels];
                    }

                    var exsit = false;

                    c.panels.forEach(function (cid, index) {
                        var rcid = _this5._getId(cid);

                        panels.forEach(function (id) {
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

                o.custom = o.custom.filter(function (c) {
                    return c.panels.length > 0;
                });

                var panelOption = {
                    panels: panels,
                    headHeight: headHeight,
                    footHeight: footHeight,
                    leftWidth: leftWidth,
                    rightWidth: rightWidth,
                    gutter: gutter
                };

                o.custom.push(panelOption);

                nodes.forEach(function (node) {
                    addLayoutToPanel(node, panelOption, _this5.options.fontScale);
                    node.createElement();
                });
            }
        }

        /**
         * Set Panels Layout
         * @param {Object|Array<Object>} options panel layout options array
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'setPanelLayout',
        value: function setPanelLayout(options) {
            var _this6 = this;

            if (options) {
                (isArray(options) ? options : [options]).forEach(function (option) {
                    return _this6._setPanel(option);
                });
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

    }, {
        key: '_updatePanel',
        value: function _updatePanel(_ref2) {
            var _this7 = this;

            var panels = _ref2.panels,
                left = _ref2.left,
                top = _ref2.top,
                width = _ref2.width,
                height = _ref2.height,
                zIndex = _ref2.zIndex;

            (isArray(panels) ? panels : [panels]).forEach(function (panel) {
                var node = _this7._getNode(getTargetDataId(panel));

                if (node) {
                    if (left) {
                        var pl = node.percentLeft = isPercentage(left) ? translatePercentage(left) : null;

                        if (pl !== null) left = pl;
                        if (isNumber(left)) {
                            if (node._oldLeft === undefined) {
                                node._oldLeft = node.getLeft();
                            }
                            node.setLeft(pl !== null ? left * _this7.width : left);
                        }
                    }
                    if (top) {
                        var pt = node.percentTop = isPercentage(top) ? translatePercentage(top) : null;

                        if (pt !== null) top = pt;
                        if (isNumber(top)) {
                            if (node._oldTop === undefined) {
                                node._oldTop = node.getTop();
                            }
                            node.setTop(pt !== null ? top * _this7.height : top);
                        }
                    }
                    if (isNumber(zIndex)) {
                        if (node._oldZIndex === undefined) {
                            node._oldZIndex = node.styles.zIndex;
                        }
                        node.setStyle({ zIndex: zIndex });
                    }
                    if (width !== undefined && width !== null) {
                        width = width || node.width;
                        var pw = node.percentWidth = isPercentage(width) ? translatePercentage(width) : null;

                        if (pw !== null) width = pw;
                        if (isNumber(width)) {
                            if (node._oldWidth === undefined) {
                                node._oldWidth = node.getWidth();
                            }
                            node.setWidth(pw !== null ? width * _this7.width : width);
                        }
                    }
                    if (height !== undefined && height !== null) {
                        height = height || node.height;

                        var ph = node.percentHeight = isPercentage(height) ? translatePercentage(height) : null;

                        if (ph !== null) height = ph;
                        if (isNumber(height)) {
                            if (node._oldHeight === undefined) {
                                node._oldHeight = node.getHeight();
                            }
                            node.setHeight(ph !== null ? height * _this7.height : height);
                        }
                    }

                    if (node._oldWidth !== undefined || node._oldHeight !== undefined || node._classChange || node._styleChange) {
                        setLineheight(_this7._vc, _this7.options.lineHeight);
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

    }, {
        key: '_restorePanel',
        value: function _restorePanel(_ref3) {
            var _this8 = this;

            var panels = _ref3.panels,
                _ref3$size = _ref3.size,
                size = _ref3$size === undefined ? true : _ref3$size,
                _ref3$position = _ref3.position,
                position = _ref3$position === undefined ? true : _ref3$position,
                _ref3$zIndex = _ref3.zIndex,
                zIndex = _ref3$zIndex === undefined ? true : _ref3$zIndex;

            (isArray(panels) ? panels : [panels]).forEach(function (panel) {
                var node = _this8._getNode(getTargetDataId(panel));

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
                                zIndex: node._oldZIndex
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

    }, {
        key: 'restore',
        value: function restore(options) {
            var _this9 = this;

            if (options === undefined) {
                this._restorePanel({
                    panels: this.getIds(),
                    size: true,
                    position: true,
                    zIndex: true
                });
            } else {
                (isArray(options) ? options : [options]).forEach(function (option) {
                    if (option.panels) {
                        _this9._restorePanel(option);
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

    }, {
        key: '$top',
        value: function $top(target) {
            var node = this._getNode(getTargetDataId(target));

            return node ? node.getTop() : 0;
        }

        /**
         * Get panel left, only for panel container.
         * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
         * @return {Number} left
         */

    }, {
        key: '$left',
        value: function $left(target) {

            var node = this._getNode(getTargetDataId(target));

            return node ? node.getLeft() : 0;
        }

        /**
         * Get component element width
         * @param {String|Number|HTMLElement} target panel id or alias, or panel dom.
         * @param {String} type element type: panel, panelContainer, lcr, center,head, foot, left, right
         * @return {Number} width
         */

    }, {
        key: '$width',
        value: function $width(target, type) {
            if (arguments.length === 0) {
                return this.width;
            }
            var dom = target;

            if (!isDOM(target)) {
                var node = this._getNode(getTargetDataId(target), type);

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

    }, {
        key: '$height',
        value: function $height(target, type) {
            if (arguments.length === 0) {
                return this.height;
            }
            var dom = target;

            if (!isDOM(target)) {
                var node = this._getNode(getTargetDataId(target), type);

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

    }, {
        key: 'show',
        value: function show(target) {
            var _this10 = this;

            var c = this.container;

            if (!target && c && isHidden$1(c)) {
                css$1(c, { display: 'block' });
            } else {
                (isArray(target) ? target : [target]).forEach(function (t) {
                    var id = _this10._getId(getTargetDataId(t)),
                        node = _this10.panel(id);

                    if (isDOM(node) && isHidden$1(node)) {
                        var index = contain(_this10._hideIds, id);

                        if (index >= 0) {
                            _this10._hideIds.splice(index, 1);
                        }
                        css$1(node, { display: 'block' });
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

    }, {
        key: 'hide',
        value: function hide(target) {
            var _this11 = this;

            var c = this.container;

            if (!target && c && !isHidden$1(c)) {
                css$1(c, { display: 'none' });
            } else {
                var ids = [];

                (isArray(target) ? target : [target]).forEach(function (t) {
                    var id = _this11._getId(getTargetDataId(t));

                    ids.push(id);
                    if (contain(_this11._hideIds, id) < 0) {
                        _this11._hideIds.push(id);
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

    }, {
        key: 'each',
        value: function each(fn, targets, context) {
            var _targets = targets ? (isArray(targets) ? targets : targets).map(function (t) {
                return getTargetDataId(t);
            }) : this.getIds();

            _each(this._vc, this.options, fn, _targets, context);

            return this;
        }

        /**
         * remvoe screen or component
         * @param {String|Number|null} target panel id or alias, if it's null that will be the screen container.
         * @param {Boolean} clearTpl if true will delete template content
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'remove',
        value: function remove(target, clearTpl) {
            var _this12 = this;

            if (arguments.length === 0) {
                this._remove();
            } else {
                (isArray(target) ? target : [target]).forEach(function (t) {
                    var node = _this12._getNode(getTargetDataId(t));

                    if (node && node.remove) {
                        if (!clearTpl) {
                            restorePanelTemplate(node, _this12.container, _this12._vc, _this12.options);
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

    }, {
        key: 'addPanel',
        value: function addPanel(options) {
            var o = this.options;
            var panel = addExtend(this._vc, o.padding, options, o.fontScale, true);

            if (this._vc.realDom && panel) {
                this._vc.realDom.appendChild(panel.createElement());
            }

            return this.get(panel.getId());
        }

        /**
         * Remove screen
         * @ignore
         */

    }, {
        key: '_remove',
        value: function _remove() {
            var p = this._pane,
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
                css$1(c, { position: old.position });
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

    }, {
        key: 'full',
        value: function full(target, zIndex) {
            if (target) {
                var id = this._getId(getTargetDataId(target));

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

    }, {
        key: 'unFull',
        value: function unFull() {
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

    }, {
        key: '_updateSize',
        value: function _updateSize() {
            var size = updateContainerSize(this._vc, this.options);

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

    }, {
        key: 'update',
        value: function update(options) {
            var _this13 = this;

            if (options === undefined) {
                updateVCC(this._vc, this._pane, this._sizes, this.options, this._getId(this._fullId), this._fullZIndex || 0);
                this._updateSize();
            } else {
                (isArray(options) ? options : [options]).forEach(function (t) {
                    if (isObject(t)) {
                        _this13._updatePanel(t);
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

    }, {
        key: 'setBodyScroll',
        value: function setBodyScroll() {
            var body = document.body,
                zc = this._zoomContainer;

            if (zc && zc.parentNode) {
                this._oldBodyScroll = {
                    body: body.style.overflow,
                    zc: zc.style.overflow,
                    zcParent: zc.parentNode.style.overflow
                };

                css$1(document.body, {
                    overflowY: 'auto'
                });
                css$1(this._zoomContainer.parentNode, {
                    overflow: 'visible'
                });
                css$1(this._zoomContainer, {
                    overflow: ''
                });
            }

            return this;
        }

        /**
         * Reset Body Scroll
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'resetBodyScroll',
        value: function resetBodyScroll() {
            var old = this._oldBodyScroll;

            if (old) {
                var body = document.body,
                    zc = this._zoomContainer;

                this._oldBodyScroll = {
                    body: body.style.overflow,
                    zc: zc.style.overflow,
                    zcParent: zc.parentNode.style.overflow
                };
                css$1(document.body, {
                    overflow: old.body
                });
                css$1(this._zoomContainer.parentNode, {
                    overflow: old.zc
                });
                css$1(this._zoomContainer, {
                    overflow: old.zcParent
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

    }, {
        key: '_setStyle',
        value: function _setStyle$$1(style, isUpdate) {
            if (isObject(style)) {
                var _vc = this._vc,
                    options = this.options,
                    container = this.container,
                    _zoomContainer = this._zoomContainer;


                if (!isEmptyObject(this.style)) {
                    removeStyle(container, _vc, options, this.style, this);
                }
                this.style = isUpdate ? merge$1(this.style, style) : style;
                _initStyle(container, _vc, _zoomContainer, _zoomContainer.parentNode, options, this._pane, this.style, true);
            }

            return this;
        }

        /**
         * Set style
         * @ignore
         * @param {Object} style style options
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'setStyle',
        value: function setStyle$$1(style) {
            return this._setStyle(style, false);
        }

        /**
         * Update style
         * @param {Object} style style option
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'updateStyle',
        value: function updateStyle$$1(style) {
            return this._setStyle(style, true);
        }

        /**
         * 移除主题
         * @return {PoPoInstance} current popo instance
         */

    }, {
        key: 'removeStyle',
        value: function removeStyle$$1() {
            var style = this.style,
                _vc = this._vc,
                options = this.options,
                container = this.container;


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

    }, {
        key: 'addTo',
        value: function addTo(container, delay) {
            var _this14 = this;

            if (this.container) {
                throw new Error(ERROR_MSG.POPO_EXSIT);
            } else {
                var c = get$$1(container);

                if (c && isDOM(c)) {
                    this.container = c;
                    if (delay > 0) {
                        setTimeout(function () {
                            _this14._initContainer();
                        }, delay);
                    } else {
                        this._initContainer();
                    }
                }
            }

            return this;
        }
    }]);
    return PoPoInstance;
}();

mixins(PoPoInstance.prototype, [dragHandle, resize, wheelzoom]);

var _instances = [];

function init(options) {
    var oc = options.container;
    var popo = null;

    if (oc) {
        var c = get$$1(oc);

        if (isDOM(c)) {
            var instance = getObjectFromArray(_instances, 'container', c);

            if (instance) {
                throw new Error(ERROR_MSG.POPO_EXSIT);
            }
        } else {
            throw new Error(ERROR_MSG.CONTAINER_ERR);
        }
    }

    popo = new PoPoInstance(options);

    _instances.push(popo);

    return popo;
}

function getInstanceByDom(container) {
    var c = get$$1(container);

    return isDOM(c) ? getObjectFromArray(_instances, 'container', c) : null;
}

function dispose(target) {
    if (!target) return;
    if (target instanceof PoPoInstance) {
        var index = contain(_instances, target);

        if (index >= 0) {
            _instances.splice(index, 1);
            target.remove();
        }
    }
    if (target && (isString(target) || isDOM(target))) {
        var c = get$$1(target);

        if (isDOM(c)) {
            var instance = removeObjectFromArray(_instances, 'container', c);

            if (instance && instance[0] && instance[0].remove) {
                instance[0].remove();
            }
        }
    }
}

var bind$$1 = bind$1;
var merge$$1 = merge$1;
var extend$$1 = extend$1;
var addClass$$1 = addClass$1;
var hasClass$$1 = hasClass$1;
var removeClass$$1 = removeClass$1;
var css$$1 = css$1;
var attr$$1 = attr$1;
var isHidden$$1 = isHidden$1;
var create$$1 = create$1;
var html$$1 = html$1;


var oldP = window && window.P;

function noConflict() {
    if (window && oldP) {
        window.P = oldP;
    }
    return this;
}

exports.DomUtil = dom;
exports.DomEvent = dom_event;
exports.Util = util;
exports.Browser = Browser;
exports.addClass = addClass$$1;
exports.hasClass = hasClass$$1;
exports.removeClass = removeClass$$1;
exports.css = css$$1;
exports.attr = attr$$1;
exports.isHidden = isHidden$$1;
exports.create = create$$1;
exports.html = html$$1;
exports.bind = bind$$1;
exports.merge = merge$$1;
exports.extend = extend$$1;
exports.noConflict = noConflict;
exports.version = version;
exports.validateLayoutExp = validateAllLy;
exports.init = init;
exports.dispose = dispose;
exports.getInstanceByDom = getInstanceByDom;

Object.defineProperty(exports, '__esModule', { value: true });

})));

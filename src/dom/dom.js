import {
    isString, isDOM, isObject, splitWords, bind, trim, isFunction,
    validateNumber, isEmptyObject, camelize, reverseCamelcase,
} from '../utils/util';
import CT from '../constant/constant';

export function testProp(props) {
    const style = document.documentElement.style;

    for (let i = 0; i < props.length; i++) {
        if (props[i] in style) {
            return props[i];
        }
    }

    return false;
}

/*eslint-disable */
export const TRANSFORM = testProp(['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

export const TRANSITION = testProp(['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

export const TRANSITION_END = (TRANSITION === 'webkitTransition') || (TRANSITION === 'OTransition')
    ? TRANSITION + 'End' : 'transitionend';

/*eslint-enable */

export function getClass(el) {
    if (!isDOM(el)) return null;

    return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}

export function hasClass(el, name) {
    if (!isDOM(el) && !name) return false;
    if (el.classList !== undefined) {
        return el.classList.contains(name);
    }
    const className = getClass(el);

    /*eslint-disable */
    return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    /*eslint-enable */
}

export function setClass(el, name) {
    if (el.className.baseVal === undefined) {
        el.className = name;
    } else {
        el.className.baseVal = name;
    }
}

export function addClass(el, name) {
    if (!isDOM(el) || !name) return;
    if (el.classList !== undefined) {
        const classes = splitWords(name);

        for (let i = 0, len = classes.length; i < len; i++) {
            el.classList.add(classes[i]);
        }
    } else if (!hasClass(el, name)) {
        const className = getClass(el);

        setClass(el, (className ? `${className} ` : '') + name);
    }
}

export function removeClass(el, names) {
    if (!isDOM(el) || !names) return;
    names = splitWords(names);
    names.forEach((name) => {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        } else {
            const cls = getClass(el);

            setClass(el, trim((` ${cls} `).replace(` ${name} `, ' ')));
        }
    });
}

export function setStyle(dom, styles, addOn) {
    if (!isDOM(dom) || isEmptyObject(styles)) return;
    for (const key in styles) {
        let _key = key;

        if (addOn && _key) {
            _key = camelize(_key);
            _key = testProp([_key, `webkit${_key}`, `moz${_key}`, `ms${_key}`, `o${_key}`]);
        }
        if (_key && styles[_key] !== null && styles[_key] !== undefined) {
            dom.style[_key] = styles[_key];
        }
    }
}

export function css(el, styles) {

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

export function create(tag, classnames, styles, container) {
    const el = document.createElement(tag || 'div');

    if (classnames) {
        addClass(el, classnames);
    }
    if (isObject(styles)) {
        css(el, styles);
    }
    if (isDOM(container)) {
        container.appendChild(el);
    }

    return el;
}

export function html(el, html) {
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

export function isHidden(el) {
    return isDOM(el) && getStyle(el, 'display') === 'none';
}

function addHStyle(css) {
    if (!isString(css)) return;
    const head = document.querySelector('head');

    if (head) {
        const oldStyle = head.querySelector('style');

        if (oldStyle) {
            oldStyle.innerHTML += css;
        } else {
            const style = document.createElement('style'),
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

export function removeByClass(classname, container) {
    Array.prototype.forEach.call((container || document).querySelectorAll(`.${classname}`), (el) => {
        if (isDOM(el)) el.parentNode.removeChild(el);
    });
}

export function removeByRole(attr, container) {
    Array.prototype.forEach.call((container || document).querySelectorAll(`[${CT.ROLE}="${attr}"]`), (el) => {
        if (isDOM(el)) el.parentNode.removeChild(el);
    });
}

export function query(el, filter) {
    return isDOM(el) && filter && el.querySelector(filter);
}

export function eachChild(parent, fn, context) {
    if (isDOM(parent)) {
        fn = bind(fn, context);
        Array.prototype.forEach.call(parent.childNodes, (node) => {
            if (isFunction(fn) && fn(node) === false) {
                return;
            }
        });
    }
}

export function attr(el, name, value) {
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

export function getStyle(dom, key) {
    if (dom && isDOM(dom)) {
        if (dom.currentStyle) {
            return dom.currentStyle[key];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(dom, null)[key];
        }
    }

    return null;
}

export function getPureStyle(dom, key) {
    if (dom) {
        const style = getStyle(dom, key);

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

export function getRect(el) {
    return isDOM(el) ? el.getBoundingClientRect() : null;
}

export function getTargetDataId(el) {
    if (isDOM(el)) {
        const id = el.getAttribute(CT.COMPONENT_ID_KEY);

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
export function createPublicStyle() {
    const css
        = `\/* PoPo Public Style *\/
    div[${CT.POPO}] {display:none}
    div[${CT.ROLE}], div[${CT.ROLE}]:after,div[${CT.ROLE}]:before{box-sizing: border-box;}
    div[data-popo-role=${CT.PANE}]{transform-origin: 0 0;-ms-transform-origin: 0 0;-webkit-transform-origin: 0 0;}
    div[data-popo-role=${CT.GRID_L_C_R}]{zoom:1;position:relative;}
    div[data-popo-role=${CT.GRID_L_C_R}]:after{content:'';display:block;clear:both;height:0;}
    div[data-popo-role=${CT.GRID_LEFT}],div[data-popo-role=${CT.GRID_CENTER}],div[data-popo-role=${CT.GRID_RIGHT}]{float:left;position:relative;}
    div[data-popo-role=${CT.GRID_FOOT}],div[data-popo-role=${CT.GRID_HEAD}] {position:relative;}
    .${CT.INFO}, .${CT.EXT_PANE}{position:absolute;z-index:100;box-sizing:border-box;}
    .${CT.EXT_PANE} *{box-sizing:border-box;}
    .${CT.EXT_PANE}{border:2px solid rgba(0,0,0,0.2);border-radius: 2px;overflow:hidden;}
    .${CT.EXT_PANE} a, .${CT.EXT_PANE} span{font: bold 18px 'Lucida Console', Monaco, monospace;width:30px;height:30px;text-align:center;display:block;border-bottom:1px solid #bbb;line-height:30px;color:#333;background-color:#ffffff;text-decoration:none;outline:none;}
    .${CT.EXT_PANE} a:hover{background-color:#f2f2f2;}
    .${CT.EXT_PANE} span{font-size:11px;}
    `;

    addHStyle(css);
}
/*eslint-enable */

createPublicStyle();

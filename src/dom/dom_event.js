import { stamp, splitWords } from '../utils/util';
import CT from '../constant/constant';
import Browser from '../utils/browser';

/*eslint-disable*/
const eventsKey = CT.EVENT,
    wheelPxFactor = (Browser.win && Browser.chrome) ? (2 * window.devicePixelRatio)
        : (Browser.gecko ? window.devicePixelRatio : 1);
/*eslint-enable*/

function addOne(obj, type, fn, context) {
    if (!obj) return null;
    function handler(e) {
        return fn.call(context || obj, e || window.event);
    }

    const id = type + stamp(fn) + (context ? `{_${stamp(context)}}` : '');

    if (obj[eventsKey] && obj[eventsKey][id]) {
        return this;
    }

    if ('addEventListener' in obj) {
        obj.addEventListener(type, handler, false);
    } else if ('attachEvent' in obj) {
        obj.attachEvent(`on{$type}`, handler);
    }

    obj[eventsKey] = obj[eventsKey] || {};
    obj[eventsKey][id] = handler;

    return null;
}

function removeOne(obj, type, fn, context) {
    if (!obj) return null;
    const id = type + stamp(fn) + (context ? `{_${stamp(context)}}` : ''),
        handler = obj[eventsKey] && obj[eventsKey][id];

    if (!handler) {
        return this;
    }

    if ('removeEventListener' in obj) {
        obj.removeEventListener(type, handler, false);
    } else if ('detachEvent' in obj) {
        obj.detachEvent(`on${type}`, handler);
    }
    obj[eventsKey][id] = null;

    return null;
}

export function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (e.originalEvent) {
        e.originalEvent._stopped = true;
    } else {
        e.cancelBubble = true;
    }

    return this;
}

export function preventDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }

    return this;
}

export function stop(e) {
    preventDefault(e);
    stopPropagation(e);

    return this;
}

export function on(obj, types, fn, context) {
    if (obj && types) {
        types = splitWords(types);
        for (let i = 0, len = types.length; i < len; i++) {
            addOne(obj, types[i], fn, context);
        }
    }

    return this;
}

export function off(obj, types, fn, context) {
    if (obj) {
        if (types) {
            types = splitWords(types);
            for (let i = 0, len = types.length; i < len; i++) {
                removeOne(obj, types[i], fn, context);
            }
        } else {
            for (const j in obj[eventsKey]) {
                removeOne(obj, j, obj[eventsKey][j]);
            }
            delete obj[eventsKey];
        }
    }
}

/*eslint-disable */
export function getWheelDelta(e) {
    return (Browser.edge) ? e.wheelDeltaY / 2 // Don't trust window-geometry-based delta
        : (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor // Pixels
            : (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 // Lines
                : (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 // Pages
                    : (e.deltaX || e.deltaZ) ? 0
                        : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 // Legacy IE pixels
                            : (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 // Legacy Moz lines
                                : e.detail ? e.detail / -32765 * 60 // Legacy Moz pages
                                    : 0;
}
/*eslint-enable */

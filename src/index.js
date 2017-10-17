import { version } from '../package.json';
import * as DomUtil from './dom/dom';
import * as DomEvent from './dom/dom_event';
import * as Util from './utils/util';
import { validateAllLy as validateLayoutExp } from './popo/core/layout';
import Browser from './utils/browser';
import PoPoInstance from './popo/index';
import ERR from './constant/error';

const P = {

    version,

    instances: [],

    init(options) {
        const oc = options.container;
        let popo = null;

        if (oc) {
            const c = Util.get(oc);

            if (Util.isDOM(c)) {
                const instance = Util.getObjectFromArray(P.instances, 'container', c);

                if (instance) {
                    throw new Error(ERR.POPO_EXSIT);
                }
            } else {
                throw new Error(ERR.CONTAINER_ERR);
            }
        }

        popo = new PoPoInstance(options);

        P.instances.push(popo);

        return popo;
    },

    extend: (obj) => {
        if (Util.isObject(obj)) {
            const keys = Object.keys(P);

            for (const key in obj) {
                if (Util.contain(keys, key) < 0) {
                    if (Util.isFunction(obj[key])) {
                        P[key] = (...args) => {
                            const result = obj[key].apply(null, args);

                            return result !== undefined ? result : P;
                        }
                    } else {
                        P[key] = obj[key];
                    }
                }
            }
        }
    },

    getInstanceByDom: (container) => {
        const c = Util.get(container);

        return Util.isDOM(c) ? Util.getObjectFromArray(P.instances, 'container', c) : null;
    },

    dispose: (target) => {
        if (!target) return;
        if (target instanceof PoPoInstance) {
            const index = Util.contain(P.instances, target);

            if (index >= 0) {
                P.instances.splice(index, 1);
                target.remove();
            }
        }
        if (target && (Util.isString(target) || Util.isDOM(target))) {
            const c = Util.get(target);

            if (Util.isDOM(c)) {
                const instance = Util.removeObjectFromArray(P.instances, 'container', c);

                if (instance) {
                    instance[0].remove();
                }
            }
        }
    },

    DomUtil,

    DomEvent,

    Browser,

    Util,
};

const { bind, merge, extend } = Util,
    { addClass, hasClass, removeClass, css, attr, isHidden, create, html } = DomUtil;

P.extend({ addClass, hasClass, removeClass, css, attr, isHidden, create, html, bind, merge, extend, validateLayoutExp });

if (typeof window !== 'undefined') {
    const oldP = window.P;

    P.noConflict = function noConflict() {
        window.P = oldP;

        return this;
    };

    window.P = P;
}

export default P;

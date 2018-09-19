import * as Util from './utils/util';
import PoPoInstance from './popo/index';
import ERR from './constant/error';

const _instances = [];

export function init(options) {
    const oc = options.container;
    let popo = null;

    if (oc) {
        const c = Util.get(oc);

        if (Util.isDOM(c)) {
            const instance = Util.getObjectFromArray(_instances, 'container', c);

            if (instance) {
                throw new Error(ERR.POPO_EXSIT);
            }
        } else {
            throw new Error(ERR.CONTAINER_ERR);
        }
    }

    popo = new PoPoInstance(options);

    _instances.push(popo);

    return popo;
}

export function getInstanceByDom(container) {
    const c = Util.get(container);

    return Util.isDOM(c) ? Util.getObjectFromArray(_instances, 'container', c) : null;
}

export function dispose(target) {
    if (!target) return;
    if (target instanceof PoPoInstance) {
        const index = Util.contain(_instances, target);

        if (index >= 0) {
            _instances.splice(index, 1);
            target.remove();
        }
    }
    if (target && (Util.isString(target) || Util.isDOM(target))) {
        const c = Util.get(target);

        if (Util.isDOM(c)) {
            const instance = Util.removeObjectFromArray(_instances, 'container', c);

            if (instance && instance[0] && instance[0].remove) {
                instance[0].remove();
            }
        }
    }
}
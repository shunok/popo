export { version } from '../package.json';

import * as DomUtil from './dom/dom';
export { DomUtil };

import * as DomEvent from './dom/dom_event';
export { DomEvent };

import * as Util from './utils/util';
export { Util };

export { validateAllLy as validateLayoutExp } from './popo/core/layout';

import Browser from './utils/browser';
export { Browser };

const { bind, merge, extend } = Util,
    { addClass, hasClass, removeClass, css, attr, isHidden, create, html } = DomUtil;

export { addClass, hasClass, removeClass, css, attr, isHidden, create, html, bind, merge, extend };

export { init, dispose, getInstanceByDom } from './manage';

const oldP = window && window.P;

export function noConflict() {
    if(window && oldP) {
        window.P = oldP;
    }
    return this;
}
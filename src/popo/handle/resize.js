import * as DomEvent from '../../dom/dom_event';
import { bind, throttle } from '../../utils/util';
import { zoomUpdate } from '../core/popo';

export default {

    /**
     * Add container resize event on window resize
     * @ignore.
     */
    _resize() {
        const o = this.options,
            c = this._pane,
            vc = this.vc,
            ui = o.updateInterval;

        if (!this._onResize && o.trackResize) {
            const interval = o.renderDelay > 0 ? Math.max(ui, o.renderDelay) : ui;
            // const interval = ui;

            this._onResize = throttle((_fn, _context) => {
                if (!o.trackResize) return;
                if (o.zoom.enable) {
                    zoomUpdate(vc, c, this.scale);
                } else {
                    this.update();
                    if (typeof o.update === 'function') {
                        o.update(this);
                    }
                    if (typeof _fn === 'function') {
                        bind(_fn, _context)(this);
                    }
                }
            }, interval, this);
            DomEvent.on(window, 'resize', this._onResize, this);
        }
    },

    /**
     * Remove resize event listener
     * @ignore
     */
    _removeResize() {
        if (this._onResize) {
            DomEvent.off(window, 'resize', this._onResize, this);
            this._onResize = null;
        }
    },
};

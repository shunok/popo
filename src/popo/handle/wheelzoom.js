import * as DomEvent from '../../dom/dom_event';
import { getScrollPane } from '../core/popo';
import CT from '../../constant/constant';

export default {
    /**
     * wheel zoom handle
     * @ignore
     */
    _performZoom(center) {
        const ratio = this.options.zoom.ratio;

        this.zoom(this.scale + (this._wheelScroll.delta > 0 ? ratio : -ratio), center);
    },

    /**
     * Wheel scrolling
     * @ignore
     * @param {Object} e wheel event param
     */
    _onWheelScroll(e) {
        DomEvent.stop(e);
        const delta = DomEvent.getWheelDelta(e),
            time = this._wheelScroll.startTime;

        /*eslint-disable */
        this._wheelScroll.delta = delta;
        if (!time) {
            this._wheelScroll.startTime = +new Date();
        }
        const left = Math.max(CT.DEBOUNCE - (+new Date() - time), 0);
        /*eslint-enable */

        clearTimeout(this._wheelScroll.timer);

        this._wheelScroll.timer = setTimeout(() => {
            this._performZoom({x: e.offsetX, y: e.offsetY});
        }, left);
    },

    enableScrollWheel() {
        this.disableScrollWheel();

        if (!this._scrollPane) {
            this._scrollPane = getScrollPane(this.options, this._pane);
        }
        this._wheelScroll = {
            delta: 0,
            startTime: 0,
            timer: 0,
        };
        DomEvent.on(this._scrollPane, 'mousewheel', this._onWheelScroll, this);
    },

    disableScrollWheel() {
        if (this._scrollPane) {
            DomEvent.off(this._scrollPane, 'mousewheel', this._onWheelScroll, this);
        }
    },
};

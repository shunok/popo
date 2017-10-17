import { isDOM, isObject } from '../../utils/util';
import * as DomEvent from '../../dom/dom_event';
import { css, getPureStyle } from '../../dom/dom';
import { getScrollPane } from '../core/popo';

export default {

    /**
     * Start drag
     * @ignore
     * @param {Object} e mouse event param
     */
    _onDragStart(e) {
        DomEvent.stop(e);
        const pane = this._scrollPane;

        if (isDOM(pane)) {
            const { clientX, clientY } = e,
                { scrollLeft, scrollTop } = pane;

            this._startDrag = {
                x: clientX,
                y: clientY,
                width: getPureStyle(pane, 'width'),
                height: getPureStyle(pane, 'height'),
                left: scrollLeft,
                top: scrollTop,
            };
            css(pane, { cursor: 'move' });            
            DomEvent.on(pane, 'mousemove', this._onDragging, this);
            DomEvent.on(pane, 'mouseup', this._onDragend, this);
        }
    },

    /**
     * Dragging
     * @ignore
     * @param {Object} e mouse event param
     */
    /*eslint-disable */
    _onDragging(e) {
        // DomEvent.stop(e);
        const pane = this._scrollPane,
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
    _onDragend(e) {
        // DomEvent.stop(e);
        DomEvent.off(this._scrollPane, 'mousemove', this._onDragging, this);
    },
    /*eslint-enable */

    /**
     * Disable mouse drag
     */
    disableDrag() {
        const pane = this._scrollPane;

        if (isDOM(pane)) {
            DomEvent.off(pane, 'mousedown', this._onDragStart, this);
            DomEvent.off(pane, 'mousemove', this._onDragging, this);
            DomEvent.off(pane, 'mouseup', this._onDragend, this);
            this._startDrag = null;
        }
    },

    /**
     * Enable drag on container and start drag
     */
    enableDrag() {
        const o = this.options;

        if (o.drag && this._pane) {
            const dragPane = getScrollPane(o, this._pane);

            if (isDOM(dragPane)) {
                this._scrollPane = dragPane;
                // this.disableDrag();
                DomEvent.on(dragPane, 'mousedown', this._onDragStart, this);
            }
        }
    },

};

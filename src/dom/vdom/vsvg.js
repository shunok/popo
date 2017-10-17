import { isArray, getPercentage } from '../../utils/util';
import CT from '../../constant/constant';
import VSVG from './vsvg_base';

/**
 * SVG
 * @class
 * @ignore
 */
export default class SVG extends VSVG {

    /**
     * @constructor
     * @param {String} nodeName node tagName
     * @param {SVG} parent parent svg
     * @param {Object} options options
     */
    constructor(nodeName, parent, options) {
        super(nodeName, parent, options);
        this.attr({
            width: '100%',
            height: '100%',
        });
        this.globalStyle = new VSVG('style', this);
        this.defs = new VSVG('defs', this);
        this._setId();
    }

    /**
     * Get custom defines
     * @param {string|Number} id defined id
     * @return {String} format defined object
     */
    def(id) {
        return this.defs._getDefById(id) || '';
    }

    /**
     * Get Custom defined item
     * @ignore
     * @param {String} id id
     * @return {String} defined object
     */
    _getDefById(id) {
        for (let i = 0, len = this.children.length; i < len; i++) {
            const childId = this.children[i].getId();

            if (childId) {
                if (childId === id || childId === (`${CT.DRAW_ID_KEY}-${id}`)) {
                    return `url(#${childId})`;
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
    addGlobalStyle(style) {
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
    addRG(cx, cy, r, stops) {
        stops = stops || [
            [0, '#333', 1],
            [1, '#555', 1],
        ];

        return new VSVG('radialGradient', this.defs)._setId().attr({ cx, cy, r })._stops(stops);
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
    addLG(x1, y1, x2, y2, stops) {
        x1 = `${getPercentage(x1)}%`;
        y1 = `${getPercentage(y1)}%`;
        x2 = `${getPercentage(x2, 1)}%`;
        y2 = `${getPercentage(y2)}%`;
        stops = stops || [
            [0, '#333', 1],
            [1, '#555', 1],
        ];

        return new VSVG('linearGradient', this.defs)._setId().attr({ x1, x2, y1, y2 })._stops(stops);
    }

    /**
     * Add Group
     * @param {Array} units units
     */
    g(units) {
        const g = new VSVG('g', this)._setId();

        if (isArray(units)) {
            /*eslint-disable */
            units.forEach((u) => {
                new VSVG('path', g);
            })
            /*eslint-enable */
        }
    }

    /**
     * Add filters
     * @param {Object} filters filter
     * @return {SVG} new filter svg
     */
    addFilter(filters) {
        return new VSVG('filter', this.defs)._setId()._filter(filters);
    }

    /**
     * Add marker
     * @param {Object} markers markers
     * @param {String} color color
     * @return {SVG} new marker svg
     */
    addMarker(markers, color) {
        const marker = new VSVG('marker', this.defs)._setId().attr(markers);

        new VSVG('circle', marker).attr({
            cx: 5,
            cy: 5,
            r: 4,
            fill: 'none',
            stroke: color || '#ffffff',
            strokeWidth: 1,
        });

        return marker;
    }

    /**
     * Add pattern
     * @param {Object} patterns patterns
     * @return {SVG} new pattern svg
     */
    addPattern(patterns) {
        const pattern = new VSVG('pattern', this.defs)._setId().attr(patterns),
            { width, height } = pattern.attrs;

        new VSVG('line', pattern).attr({
            x1: width / 2,
            y1: 0,
            x2: width / 2,
            y2: height,
            strokeWidth: width / 2,
            stroke: 'rgba(0,0,0,.2)',
        });

        return pattern;
    }

    /**
     * Create SVG
     * @param {String} nodeName node tagName
     * @param {Object} attrs attributes
     * @return {SVG} new svg node
     */
    create(nodeName, attrs) {
        return new VSVG(nodeName, this).attr(attrs);
    }

}

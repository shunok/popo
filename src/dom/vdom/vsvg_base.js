import {
    isString, isObject, isEmptyObject, removeObjectFromArray,
    stamp, reverseCamelcase, getPercentage, isArray,
} from '../../utils/util';
import CT from '../../constant/constant';

const keys = ['baseFrequency', 'stdDeviation', 'viewBox', 'numOctaves',
    'tableValues', 'markerWidth', 'markerHeight', 'refX', 'refY',
    'patternUnits', 'patternTransform'].join(' ');

/**
 * SVG
 * @class
 * @ignore
 */
export default class SVG {

    /**
     * @constructor
     * @param {String} nodeName node tagNae
     * @param {SVG} parent parent node
     */
    constructor(nodeName, parent) {
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
    _stamp() {
        let preffix = '';

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
    _setId() {
        this.attr({
            id: this.getId(),
        });

        return this;
    }

    /**
     * Get node id
     * @return {String} id
     */
    getId() {
        return this.attr('id') || `${CT.DRAW_ID_KEY}-${this._popo_id}`;
    }

    /**
     * Set style
     * @param {Object} styles styles
     * @return {SVG} current svg instance
     */
    setStyle(styles) {
        for (const key in styles) {
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
    attr(name, value) {
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
            for (const key in name) {
                if (isObject(name[key]) && name[key] instanceof SVG) {
                    let _key = key;

                    if (keys.indexOf(key) < 0) {
                        _key = reverseCamelcase(key);
                    }
                    this.attrs[_key] = `url(#${name[key].getId()})`;
                } else if (keys.indexOf(key) < 0) {
                    const _key = reverseCamelcase(key);

                    if (_key === 'id') {
                        this.attrs[_key] = `${CT.DRAW_ID_KEY}-${name[key]}`;
                    } else {
                        this.attrs[_key] = name[key];
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
    _filter(filters, node) {
        node = node || this;
        for (let i = 0, len = filters.length; i < len; i++) {
            const f = filters[i];

            for (const key in f) {
                const filter = new SVG(key, node),
                    pureKeys = {};

                if (isArray(f[key])) {
                    this._filter(f[key], filter);
                } else {
                    for (const _key in f[key]) {
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
    _stops(stops) {
        for (let i = 0; i < stops.length; i++) {
            new SVG('stop', this).attr({
                offset: `${getPercentage(stops[i][0])}%`,
                stopColor: stops[i][1] || '#333',
                stopOpacity: stops[i][2] || 1,
            });
        }

        return this;
    }

    /**
     * Insert to parent
     * @param {Object} parent parentNode
     * @return {SVG} current svg instance
     */
    insertTo(parent) {
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
    create(nodeName, attrs) {
        return new SVG(nodeName, this).attr(attrs);
    }

    /**
     * Add child
     * @param {Object} son svg instance
     * @return {SVG} current svg instance
     */
    add(son) {
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
    remove(node) {
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
    render(node) {
        if (!isEmptyObject(this.styles)) {
            let style = '';

            for (const key in this.styles) {
                if (isObject(this.styles[key]) && this.styles[key] instanceof SVG) {
                    style += `${key}:url(#${this.styles[key].getId()});`;
                } else {
                    style += `${key}:${this.styles[key]};`;
                }
            }
            if (style) {
                this.attr({ style });
            }
        }

        const attrs = this.attrs;

        for (const key in attrs) {
            if (key.indexOf('xlink') >= 0) {
                node.setAttributeNS('http://www.w3.org/1999/xlink', key, attrs[key]);
            } else {
                node.setAttribute(key, attrs[key]);
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
    setHtml(html) {
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
    createElement(hidden) {
        if (hidden) {
            this.attr({ width: '0%', height: '0%' });
        }

        const node = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);

        this.render(node);

        if (this.children && this.children.length > 0) {
            this.children.forEach((c) => {
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
}

import {
    isNumber, isString, isDOM, isObject, contain, isEmptyObject, getObjectFromArray,
    removeObjectFromArray, stamp, splitWords, mixin, formatNum, unique,
} from '../../utils/util';
import { css, attr } from '../dom';
import CT from '../../constant/constant';

/**
 * @class VNode
 * @ignore
 */
export default class VNode {

    /**
     * @constructor
     * @param {String} nodeName node TagName
     */
    constructor(nodeName) {
        this.nodeName = nodeName || 'div';
        this.width = 0;
        this.height = 0;
        this.classNames = '';
        this.children = [];
        this.styles = {};
        this.parentNode = null;
        this.html = '';
        this.role = '';
        this.isExtend = false;
        stamp(this);
    }

    /**
     * Add class
     * @param {String} name classname
     * @return {VNode} current vnode instance
     */
    addClassName(name) {
        if (isString(name)) {
            if (this.classNames === '') {
                this.classNames = name;

                return this;
            }
            const cns = splitWords(this.classNames);

            splitWords(name).forEach((n) => {
                const inner = contain(cns, n);

                if (inner < 0) {
                    this.classNames += ` ${n}`;
                }
            });
        }

        return this;
    }

    /**
     * remove class name
     * @param {String} name classname
     * @return {VNode} current vnode instance
     */
    removeClassName(name) {
        if (isString(name)) {
            const cns = splitWords(this.classNames),
                inner = contain(cns, name);

            if (inner >= 0) {
                cns[inner] = '';
                this.classNames = cns.join(' ');
            }
        }

        return this;
    }

    /**
     * Clear node class
     * @return {VNode} current vnode instance
     */
    clearClassName() {
        this.classNames = '';

        return this;
    }

    /**
     * Clear current class and set new class
     * @param {String} classname classname
     * @return {VNode} current vnode instance
     */
    setClassName(classname) {
        if (classname && isString(classname)) {
            this.classNames = classname;
        }

        return this;
    }

    /**
     * Get child
     * @param {Number|String} id id
     * @return {VNode} vnode
     */
    getChild(id) {
        if (!isNumber(id)) {
            id = Number(id);
        }
        if (!isNaN(id) && id > 0) {
            return getObjectFromArray(this.children, CT.COMPONENT_ID_KEY, id);
        }

        return null;
    }

    /**
     * Set node role
     * @param {String} role node role.
     * @return {VNode} vnode
     */
    setRole(role) {
        this.role = role;

        return this;
    }

    /**
     * Get node role
     * @return {String} role
     */
    getRole() {
        return this.role;
    }

    /**
     * Query child by role
     * @param {String} role node role
     * @return {VNode} node
     */
    queryByRole(role) {
        let result = null;

        function _query(vnode) {
            if (vnode && vnode.children.length > 0) {
                vnode.children.forEach((node) => {
                    if (node.role === role) {
                        result = node;

                        return;
                    }
                    _query(node);
                });
            }

            return result;
        }

        return _query(this);
    }

    /**
     * Set node id
     * @param {String} id id
     * @return {VNode} current vnode instance
     */
    setId(id) {
        this[CT.COMPONENT_ID_KEY] = id;

        return this;
    }

    /**
     * Get vnode id
     * @return {Number} id
     */
    getId() {
        return this[CT.COMPONENT_ID_KEY];
    }

    /**
     * Set width
     * @param {Number} width width
     * @return {VNode} current vnode instance
     */
    setWidth(width) {
        this.width = width;

        return this;
    }

    /**
     * Set Height
     * @param {Number} height height
     * @return {VNode} current vnode instance
     */
    setHeight(height) {
        this.height = height;

        return this;
    }

    /**
     * Get node width
     * @return {Number} width
     */
    getWidth() {
        return this.width;
    }

    /**
     * Get node height
     * @return {Number} height
     */
    getHeight() {
        return this.height;
    }

    /**
     * Set margin
     * @param {Number} margin margin
     * @return {VNode} current vnode instance
     */
    setMargin(margin) {
        this.margin = margin;

        return this;
    }

    /**
     * Get margin
     * @return {Number} margin
     */
    getMargin() {
        return this.margin;
    }

    /**
     * Get px size
     * @ignore
     * @param {Number|String} size size
     * @return {String} size
     */
    _getSize(size) {
        return isNumber(size) ? `${formatNum(size, 5)}px` : size;
    }

    /**
     * Set styles
     * @param {Object} styles styles
     * @return {VNode} current vnode instance
     */
    setStyle(styles) {
        mixin(this.styles, styles);

        return this;
    }

    /**
     * Set top
     * @param {Number} top top
     * @return {VNode} current vnode instance
     */
    setTop(top) {
        this.top = top;

        return this;
    }

    /**
     * Get top
     * @return {Number} top
     */
    getTop() {
        return this.top;
    }

    /**
     * Set left
     * @param {Number} left left
     * @return {VNode} current vnode instance
     */
    setLeft(left) {
        this.left = left;

        return this;
    }

    /**
     * Get left
     * @return {Number} left
     */
    getLeft() {
        return this.left;
    }

    /**
     * Insert to parent vnode
     * @param {VNode} parent parent vnode
     * @return {VNode} current vnode instance
     */
    insertTo(parent) {
        if (parent && parent.children) {
            parent.children.push(this);
            this.parentNode = parent;
        }

        return this;
    }

    /**
     * Add child vnode
     * @param {VNode} son child vnode
     * @return {VNode} current vnode instance
     */
    addNode(son) {
        if (son) {
            this.children.push(son);
            son.parentNode = this;
        }

        return this;
    }

    /**
     * Remove child
     * @param {VNode} node child vnode
     */
    removeNode(node) {
        if (isObject(node)) {
            if (node && node._popo_id && this.children.length > 0) {
                removeObjectFromArray(this.children, '_popo_id', node._popo_id);
            }
        }
    }

    /**
     * Remove All Child
     */
    clear() {
        if (this.children && this.children.length > 0) {
            this.children.forEach((node) => {
                node.remove();
            });
            this.children = [];
        }
    }

    /**
     * Remove instance
     */
    remove() {
        const that = this;

        if (this.parentNode) {
            this.parentNode.removeNode(that);
        }
        if (isDOM(this.realDom)) {
            this.realDom.parentNode.removeChild(this.realDom);
            this.realDom = null;
        }
        this.width = 0;
        this.height = 0;
        this.top = 0;
        this.left = 0;
        this.classNames = '';
        this.styles = {};
        if (this.children && this.children.length > 0) {
            this.children.forEach((node) => {
                node.remove();
            });
            this.children = [];
        }
        this.parentNode = null;
    }

    /**
     * Render current vnode
     * @param {HTMLElement} node node
     * @return {HTMLElement} node
     */
    render(node) {
        if (!node) return node;

        const realDomClass = attr(node, 'class'),
            cls = realDomClass ? unique(splitWords(realDomClass)
                .concat(splitWords(this.classNames))).join(' ') : this.classNames;

        if (cls) {
            attr(node, 'class', cls);
        }

        const w = this.width,
            h = this.height;

        // if (this.styles.width === undefined || this.styles.width === null) {
        this.setStyle({
            width: w ? this._getSize(w) : '100%',
            height: h ? this._getSize(h) : '100%',
        });
        // }

        // if (this.styles.height === undefined || this.styles.height === null) {
        // this.setStyle({
        //     height: h ? this._getSize(h) : '100%',
        // });
        // }

        if (this.top !== undefined) {
            this.setStyle({ top: this._getSize(this.top) });
        }

        if (this.left !== undefined) {
            this.setStyle({ left: this._getSize(this.left) });
        }

        if (this.margin !== undefined) {
            this.setStyle({ margin: this._getSize(this.margin) });
        }

        if (!isEmptyObject(this.styles)) {
            css(node, this.styles);
        }

        if (this[CT.COMPONENT_ID_KEY]) {
            attr(node, CT.COMPONENT_ID_KEY, this[CT.COMPONENT_ID_KEY]);
        }

        if (this.role) {
            attr(node, 'data-popo-role', this.role);
        }

        if (this.id) {
            node.id = this.id;
        }

        if (this.html) {
            node.innerHTML = this.html;
        }

        return node;
    }

    /**
     * Set node innerHTML
     * @param {String} html html
     * @return {VNode} current vnode instance
     */
    setHtml(html) {
        if (html && isString(html)) {
            this.html = html;
        }

        return this;
    }

    /**
     * Update vnode
     */
    update() {
        const realDom = this.realDom;

        if (realDom) {
            this.render(realDom);
            this.children.forEach((vnode) => { vnode.update(); });
        }
    }

    /**
     * Create Html element
     * @return {HTMLElement} node
     */
    createElement() {
        const node = this.realDom || document.createElement(this.nodeName);

        /*eslint-disable */
        node._popo_id = this._popo_id;
        /*eslint-enable */

        this.render(node);
        this.children.forEach((c) => {
            node.appendChild(c.createElement());
        });

        this.realDom = node;
        node.vnode = this;

        return node;
    }

    /**
     * Get last child
     * @return {Vnode} vnode
     */
    getLastChild() {
        const c = this.children,
            len = c.length;

        return len > 0 ? c[len - 1] : c[0];
    }

    /**
     * Get new Id
     * @return {Number} id
     */
    getNewId() {
        const lastChild = this.getLastChild();

        return lastChild ? lastChild.getId() + 1 : 1;
    }
}

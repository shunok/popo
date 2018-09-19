import Vnode from '../../dom/vdom/vnode';
import CT from '../../constant/constant';
import SVG from '../../dom/vdom//vsvg';
import { updateLayout, initLayout } from './layout';
import { addLayoutToPanel } from './panel';
import {
    css, addClass, setClass, hasClass, query, eachChild,
    removeClass, getPureStyle, getRect, attr,
} from '../../dom/dom';
import {
    isNumber, isArray, isString, isDOM, isObject, contain, isEmptyObject, merge,
    bind, multiplyBy, isFunction, formatNum, cloneJsonObject,
} from '../../utils/util';
// import { loadDev } from './dev';
import defaultPanel from '../options/panel';
import defaultStyle from '../options/style';

export function createPane(o) {
    const pd = o.padding,
        str = `${pd.top}px ${pd.right}px ${pd.bottom}px ${pd.left}px`;

    return new Vnode()
        .setRole(CT.PANE)
        .setHeight('auto')
        .setStyle({
            padding: str,
        })
        .createElement();
}

export function createVc() {
    return new Vnode()
        .setRole(CT.CONTAINER)
        .setStyle({ position: 'relative' });
}

export function vcToDom(vc) {
    return vc && vc.createElement();
}

export function getAllIds(vc) {
    return vc ? vc.children.map((node) => node.getId()) : [];
}

export function stampInner(c) {
    if (isDOM(c)) {
        [CT.ZOOMPANE, CT.ZOOMCONTAINER].forEach((role) => {
            if (attr(c, CT.ROLE) === role) {
                /*eslint-disable */
                c._popo_inner = true;
                /*eslint-enable */

                return;
            }
        });
    }
}

export function addExtend(vc, padding, options, scale, createPanel) {
    if (!vc || !padding || !options) return null;
    const { left, top, right, bottom } = padding,
        width = vc.width + left + right,
        height = vc.height + top + bottom;

    if (isObject(options)) {
        const panelOption = merge(defaultPanel, options),
            { position, size, id, zIndex, layout, style, isWidget, className } = panelOption,
            node = new Vnode()
                .setRole(CT.PANEL)
                .setHeight(multiplyBy(size.height || 0, height))
                .setWidth(multiplyBy(size.width || 0, width))
                .setTop(multiplyBy(position.top || 0, height) - top)
                .setLeft(multiplyBy(position.left || 0, width) - left)
                .setStyle({
                    position: 'absolute',
                    zIndex,
                });

        if (id) { node.id = id; }

        node[CT.COMPONENT_ID_KEY] = vc.getNewId();
        node.isExtend = true;
        node.isWidget = isWidget;
        if (isWidget && className) {
            node.addClassName(className);
        }
        node.extendInfo = {
            position: {
                left: node.left / (position.responsive ? width : 1),
                top: node.top / (position.responsive ? height : 1),
            },
            size: {
                width: node.width / (size.responsive ? width : 1),
                height: node.height / (size.responsive ? height : 1),
            },
            zIndex,
        };

        if (layout && isObject(layout) && createPanel) {
            addLayoutToPanel(node, layout, scale);
        }
        if (style && !isWidget) {
            const _style = merge(defaultStyle.default, style);

            _setStyle(node, _style.panel, false, true);
            for (const key in style) {
                const son = node.queryByRole(key);

                if (son && _style[key]) {
                    _setStyle(son, _style[key], false, true);
                }
            }
        }
        vc.addNode(node);

        return node;
    }

    return null;
}

export function loadExtends(vc, exts, o, createPanel) {
    if (!vc || !o) return;
    let ext = exts;

    if (ext && isObject(ext)) {
        ext = [ext];
    }
    if (ext && isArray(ext)) {
        ext.forEach((e) => {
            addExtend(vc, o.padding, e, o.fontScale, createPanel);
        });
    }
}

export function updateExtends(vc, o) {
    if (!vc || !o) return;
    const exts = vc.children.filter((n) => n.isExtend === true),
        { left, top, right, bottom } = o.padding,
        width = vc.width + left + right,
        height = vc.height + top + bottom;

    exts.forEach((panel) => {
        if (isObject(panel.extendInfo)) {
            const { size, position } = panel.extendInfo,
                panelWidth = multiplyBy(size.width || 0, width),
                panelHeight = multiplyBy(size.height || 0, height);

            panel.setHeight(panel._oldHeight !== undefined ? panel.height : panelHeight)
                .setWidth(panel._oldWidth !== undefined ? panel.width : panelWidth)
                .setTop(multiplyBy(panel._oldTop !== undefined ? panel.top : position.top || 0, height))
                .setLeft(multiplyBy(panel._oldLeft !== undefined ? panel.left : position.left || 0, width))
                .update();
        }
    });
}

export function getIdByAlias(alias, key) {
    if (isArray(alias) && key) {
        const _alias = alias.slice(0),
            result = _alias.filter((a) => a && a.name === key);

        if (result.length === 1) {
            return result[0].id || -1;
        }
        if (result.length > 1) {
            return result.map((r) => r.id || -1)[0];
        }
    }

    return -1;
}

export function getAliasById(alias, id) {
    if (isArray(alias) && id) {
        const result = isArray(alias) && id && alias.slice(0).filter((a) => a && a.id === id)[0];

        if (isObject(result)) {
            return result.name;
        }
    }

    return null;
}

function getId(id, alias) {
    if (!isNaN(Number(id))) {
        return Number(id);
    } else if (alias && isString(id)) {
        return getIdByAlias(alias, id);
    }

    return -1;
}

export function getRealIds(vc, id, alias) {
    if (!vc || id === null || id === undefined) return -1;
    const length = vc.children.length;

    if (id === 'all') {
        return getAllIds(vc);
    }
    if (!isArray(id)) {
        id = getId(id, alias);

        return id < 0 ? -1 : id;
    }

    return id.map((_id) => {
        _id = getId(_id, alias);

        return _id < 0 ? -1 : _id;
    });
}

function getNode(panel, type) {
    if (panel) {
        type = type || CT.GRID_CENTER;

        /*eslint-disable */
        if (contain([CT.PANEL, CT.GRID_HEAD, CT.GRID_CENTER, CT.GRID_LEFT, CT.GRID_RIGHT, CT.GRID_L_C_R,
        CT.PANEL_CONTAINER, CT.GRID_FOOT], type) < 0) {
            return null;
        }
        /*eslint-enable */

        return type === CT.PANEL ? panel : panel.queryByRole(type);
    }

    return null;
}

export function getNodesByPanel(panel) {
    if (panel) {
        return {
            panel,
            head: getNode(panel, CT.GRID_HEAD),
            left: getNode(panel, CT.GRID_LEFT),
            right: getNode(panel, CT.GRID_RIGHT),
            center: getNode(panel, CT.GRID_CENTER),
            panelContainer: getNode(panel, CT.PANEL_CONTAINER),
            lcr: getNode(panel, CT.GRID_L_C_R),
            foot: getNode(panel, CT.GRID_FOOT),
        };
    }

    return null;
}

export function getRealNodesByPanel(panel, id, options) {
    if (panel) {
        const nodes = getNodesByPanel(panel);

        if (isObject(nodes)) {
            const { head, foot, left, right, center, lcr, panelContainer } = nodes;
            const elements = {
                panel: panel.realDom,
                panelContainer: panelContainer && panelContainer.realDom,
                lcr: lcr && lcr.realDom,
                head: head && head.realDom,
                foot: foot && foot.realDom,
                left: left && left.realDom,
                center: center && center.realDom,
                right: right && right.realDom,
                id: id || panel.getId(),
                isExtend: panel.isExtend,
                alias: getAliasById(options.alias, id),
                size: {
                    width: formatNum(panel.width, 5),
                    height: formatNum(panel.height, 5),
                },
                position: {
                    top: formatNum(panel.top, 5),
                    left: formatNum(panel.left, 5),
                    zIndex: panel.styles.zIndex,
                },
            };

            return elements;
        }
    }

    return null;
}

export function getRealdomsById(vc, id, o) {
    const realId = getId(id, o.alias),
        panel = vc.getChild(realId);

    return getRealNodesByPanel(panel, realId, o);
}

export function getNodeById(vc, id, type) {
    if (!vc || !id || id <= 0) return null;
    const panel = vc.getChild(id);

    if (panel) {
        return getNode(panel, type || CT.GRID_CENTER);
    }

    return null;
}

// DEV

function n2px(fz) {
    if (isNumber(fz)) return `${fz}px`;
    if (isString(fz)) {
        if (fz.indexOf('px') < 0 || fz.indexOf('em') > 0) {
            return fz;
        } else if (!isNaN(Number(fz))) {
            return `${fz}px`;
        }
    }

    return fz;
}

function px2n(str) {
    if (isString(str)) {
        const i = str.indexOf('px');

        if (i >= 0) {
            return Number(str.substring(0, i));
        }
    }

    if (isNumber(str)) {
        return str;
    }

    return 0;
}

function _addGGL(panel, o) {
    if (!panel || !isDOM(panel.realDom) || !o || !o.show) return;
    removeByClass(CT.PANEL_GUIDELINES, panel.realDom);
    const ggl = query(panel.realDom, `.${CT.GUIDELINES}`),
        width = panel.width,
        height = panel.height,
        zIndex = o.zIndex,
        size = o.size || 15,
        color = o.color,
        lineSize = o.lineSize,
        lines = new SVG(),
        svg = create('div', CT.PANEL_GUIDELINES, {
            zIndex,
            height: `${height}px`,
            width: `${width}px`,
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            userSelect: 'none',
        }, panel.realDom);

    if (isDOM(ggl)) {
        panel.realDom.removeChild(ggl);
    }

    let rows = Math.ceil(height / size),
        cols = Math.ceil(width / size),
        points = '',
        points2 = '';

    for (let i = 1; i <= rows; i++) {
        const y = size * i;

        points += `M0 ${y} L${width} ${y} `;
    }
    for (let i = 1; i <= cols; i++) {
        const x = size * i;

        points += `M${x} 0 L${x} ${height} `;
    }

    rows = Math.ceil(height / size / 4);
    cols = Math.ceil(width / size / 4);
    for (let i = 1; i <= rows; i++) {
        const y = size * i * 4;

        points2 += `M0 ${y} L${width} ${y} `;
    }
    for (let i = 1; i <= cols; i++) {
        const x = size * i * 4;

        points2 += `M${x} 0 L${x} ${height} `;
    }

    lines.create('path', { d: points, stroke: color, strokeWidth: lineSize });
    lines.create('path', { d: points2, stroke: color, strokeWidth: lineSize * 1.5 });
    svg.appendChild(lines.createElement());
}

function addPanelGuidelines(vc, o) {
    if (!vc || !o || !o.dev || !o.dev.enable || !o.dev.panelGuideline.show) return;
    const gg = o.dev.panelGuideline,
        options = merge({
            color: 'rgba(0,0,0,.25)',
            width: 1,
            size: 10,
            zIndex: 0,
        }, gg || {});

    let ids = gg.ids;

    if (ids === 'all') {
        ids = getAllIds(vc);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach((id) => {
            id = getRealIds(vc, id, o.alias);
            if (id > 0) {
                const node = vc.getChild(id);

                if (node && node.realDom) {
                    _addGGL(node, options);
                }
            }
        });
    }
}

function createPanelInfo(panel, size, id, position, color, fontSize) {
    fontSize = n2px(fontSize);
    if (panel && panel.realDom) {
        const width = Math.round(panel.width),
            height = Math.round(panel.height),
            left = Math.round(panel.left),
            top = Math.round(panel.top);

        if (size || id || position) {
            let info = '';

            if (id) {
                info += panel[CT.COMPONENT_ID_KEY];
            }
            if (size) {
                info += `${(id ? ' - ' : '')} W${width} H${height}`;
            }
            if (position) {
                info += `${(id || size) ? ' - ' : ''} L${left} T${top}`;
            }

            return new Vnode('span')
                .addClassName(CT.INFO)
                .setTop(panel.top + 5)
                .setLeft(panel.left + 5)
                .setWidth('auto')
                .setHeight('auto')
                .setStyle({ color, fontSize })
                .setHtml(info);
        }
    }

    return null;
}

function createDebugInfo(vc, dev) {
    if (!vc || !dev || !dev.enable || !dev.panel.show) return;
    const o = dev.panel,
        id = o.id,
        size = o.size,
        position = o.position,
        background = o.background,
        fontSize = n2px(o.fontSize),
        fontColor = o.fontColor;

    if (vc.realDom && (id || size || position || background)) {
        for (let i = 0, len = vc.children.length; i < len; i++) {
            if (vc.children[i].realDom && background && isString(background)) {
                css(vc.children[i].realDom, { background });
            }
            if (vc.children[i].isWidget) continue;
            const span = createPanelInfo(vc.children[i], size, id, position, fontColor, fontSize);

            if (span) {
                vc.realDom.appendChild(span.createElement());
            }
        }
    }
}

function createSVGText(svg, text, x, y, fontSize, fill) {
    if (svg) {
        svg.create('text', { x, y, fontSize, fill }).setHtml(text);
    }
}

export function addGuidelines(c, vc, o) {
    if (!c || !vc || !o || !o.dev.guideline.show) return;
    removeByClass(CT.GUIDELINES, c);
    const gl = o.dev.guideline,
        padding = o.padding,
        width = vc.width + padding.left + padding.right,
        height = vc.height + padding.top + padding.bottom,
        identifier = gl.identifier,
        fontSize = gl.fontSize,
        fontColor = gl.fontColor,
        zIndex = gl.zIndex,
        rows = o.rows,
        cols = o.cols,
        unitRowHeight = (100 / rows).toFixed(5) * height / 100,
        unitColWidth = (100 / cols).toFixed(5) * width / 100,
        lines = new SVG(),
        svg = create('div', CT.GUIDELINES, {
            zIndex,
            height: `${height}px`,
            width: `${width}px`,
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            userSelect: 'none',
        }, c),
        position = c.style.position;

    if (position === '' || position === 'static') {
        css(c, {
            position: 'relative',
        });
    }

    let points = '';

    for (let i = 0; i <= rows; i++) {
        const y = unitRowHeight * i;

        points += `M0 ${y} L${width} ${y} `;
        if (identifier) {
            createSVGText(lines, i, 5, y - unitRowHeight + px2n(fontSize) + 5, fontSize, fontColor);
        }
    }
    for (let i = 0; i <= cols; i++) {
        const x = unitColWidth * i;

        points += `M${x} 0 L${x} ${height} `;
        if (identifier && i !== 1) {
            createSVGText(lines, i, x - unitColWidth + 5, px2n(fontSize) + 5, fontSize, fontColor);
        }
    }

    lines.create('path', { d: points, stroke: gl.color, strokeWidth: gl.lineSize });
    svg.appendChild(lines.createElement());
}

export function addSplitLine(c, vc, o) {
    if (!c || !vc || !o || !o.dev.splitline.show) return;
    removeByClass(CT.SPLITLINES, c);
    const sl = o.dev.splitline,
        fontSize = n2px(sl.fontSize),
        fontColor = sl.fontColor,
        padding = o.padding,
        identifier = sl.identifier,
        width = vc.width + padding.left + padding.right,
        height = vc.height + padding.top + padding.bottom,
        unitRowHeight = sl.height,
        unitColWidth = sl.width,
        zIndex = sl.zIndex,
        rows = Math.ceil(height / unitRowHeight),
        cols = Math.ceil(width / unitColWidth),
        svg = create('div', CT.SPLITLINES, {
            zIndex,
            height: `${height}px`,
            width: `${width}px`,
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            userSelect: 'none',
        }, c),
        lines = new SVG(),
        position = c.style.position,
        infoY = [],
        infoX = [];

    if (position === '' || position === 'static') {
        css(c, { position: 'relative' });
    }

    let points = '';

    for (let i = 0; i <= rows; i++) {
        const y = unitRowHeight * i;

        points += `M0 ${y} L${width} ${y} `;
        infoY.push(y);
    }
    for (let i = 0; i <= cols; i++) {
        const x = unitColWidth * i;

        points += `M${x} 0 L${x} ${height} `;
        infoX.push(x);
    }

    if (identifier) {
        infoX.forEach((x) => {
            infoY.forEach((y) => {
                createSVGText(lines, `${x}, ${y}`, x + 10, y + 10 + px2n(fontSize), fontSize, fontColor);
            });
        });
    }

    lines.create('path', { d: points, stroke: sl.color, strokeWidth: sl.lineSize });
    svg.appendChild(lines.createElement());
}

export function loadDev(c, vc, o) {
    if (!vc || !c || !o || !o.dev || !o.dev.enable) return false;
    removeByClass(CT.INFO, c);
    createDebugInfo(vc, o.dev);
    addGuidelines(c, vc, o);
    addSplitLine(c, vc, o);
    addPanelGuidelines(vc, o);

    return true;
}

export function validateType(type) {
    return !isString(type) ? 'panel' : (type || 'panel').toLowerCase();
}

export function setHide(ids, vcontainer, o, showIds) {
    if (!ids || !vcontainer) return;
    const type = showIds ? o.hideType : (o.hideType || 'panel');

    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach((id) => {
            const node = getNodeById(vcontainer, getRealIds(vcontainer, id, o.alias), type);

            if (node) {
                if (node.realDom) {
                    css(node.realDom, {
                        display: 'none',
                    });
                } else {
                    node.setStyle({
                        display: 'none',
                    });
                }
            }
        });
    }
}

export function createZoomContainer(c, options) {
    if (!c || !options || hasClass(c, CT.ZOOMCONTAINER)) return null;
    const z = options.zoom,
        zoomContainer = new Vnode()
            .setRole(CT.ZOOMCONTAINER),
        zoomPane = new Vnode()
            .setRole(CT.ZOOMPANE)
            .addNode(zoomContainer)
            .createElement();

    c.appendChild(zoomPane);

    if (z.enable && z.control) {
        const zoomControl = new Vnode()
            .addClassName(CT.EXT_PANE)
            .setRole(CT.EXT_PANE)
            .setWidth(34)
            .setHeight(94)
            .setHtml(`
            <a class=\'${CT.ZOOMIN}\' href=\'javascript:;\' title=\'Zoom in\'>+</a>
            <span class='${CT.ZOOMINFO}' title=\'Current Scale\'></span>
            <a class=\'${CT.ZOOMOUT}\' href=\'javascript:;\' title=\'Zoom out\'>-</a>`)
            .createElement(),
            size = '10px';

        switch (z.position) {
            case 'leftTop':
                css(zoomControl, { top: size, left: size });
                break;
            case 'leftBottom':
                css(zoomControl, { bottom: size, left: size });
                break;
            case 'rightBottom':
                css(zoomControl, { bottom: size, right: size });
                break;
            default:
                css(zoomControl, { right: size, top: size });
                break;
        }

        c.appendChild(zoomControl);
    }

    return zoomContainer.realDom;
}

export function getComponent(vcontainer, id, classname) {
    if (isNumber(id) && id > 0) {
        const node = vcontainer.getChild(id);

        if (node && isDOM(node.realDom)) {
            return node.realDom.querySelector(`.${classname}`);
        }
    }

    return null;
}

export function isInPoPo(c) {
    return c && c._popo_inner;
}

function veach(vcontainer, fn, ids, context) {
    if (!vcontainer) return;
    if (!ids || ids === 'all') {
        ids = getAllIds(vcontainer);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids) && ids.length > 0) {
        ids.forEach((id) => {
            const panel = vcontainer.getChild(id);

            if (panel) {
                if (context) {
                    fn = bind(fn, context);
                }
                if (fn(getNodesByPanel(panel)) === false) {
                    return;
                }
            }
        });
    }
}

export function updateHideIds(showIds, all) {
    let ids = showIds || [];

    if (isNumber(ids)) {
        ids = [ids];
    }
    if (ids.length > 0) {
        let done = false;

        ids.forEach((id) => {
            const index = contain(all, id);

            if (index >= 0) {
                all.splice(index, 1);
                done = true;
            }
        });
        if (done) {
            return all;
        }
    }

    return null;
}

export function _each(vcontainer, options, fn, ids, context) {
    if (!vcontainer || !options || !isFunction(fn)) return;
    if (ids === 'all') {
        ids = getAllIds(vcontainer);
    }
    if (isNumber(ids)) {
        ids = [ids];
    }

    if (isArray(ids) && ids.length > 0) {
        ids.forEach((id) => {
            id = getId(id, options.alias);
            if (id > 0) {
                const panel = vcontainer.getChild(id);

                if (panel && isDOM(panel.realDom)) {
                    const elements = getRealNodesByPanel(panel, id, options);

                    if (context) {
                        fn = bind(fn, context);
                    }
                    if (fn(elements) === false) {
                        return;
                    }
                }
            }
        });
    }
}

export function _full(vc, id, zIndex) {
    if (id > 0 && vc) {
        const node = vc.getChild(id);

        if (node) {
            node.oldSize = {
                zIndex: node.styles.zIndex,
                width: node.width,
                height: node.height,
                top: node.top,
                left: node.left,
            };
            node.setWidth(vc.width)
                .setHeight(vc.height)
                .setTop(0)
                .setLeft(0)
                .setStyle({ zIndex })
                .update();

            return true;
        }
    }

    return false;
}

export function _unFull(vcontainer, id) {
    if (isNumber(id) && id > 0) {
        const node = vcontainer.getChild(id);

        if (node && node.oldSize && node.realDom) {
            node.setStyle({
                zIndex: node.oldSize.zIndex || 1,
            });
            node.width = node.oldSize.width;
            node.height = node.oldSize.height;
            node.top = node.oldSize.top;
            node.left = node.oldSize.left;
            node.update();
            node.oldSize = null;

            return true;
        }
    }

    return false;
}

export function _removeStyle(node, option) {
    if (!node || !option) return;

    let _class = '',
        _css = null;

    if (isString(option)) {
        _class = option;
    }
    if (isObject(option) && !isEmptyObject(option)) {
        if (option.classname && isString(option.classname)) {
            _class = option.classname;
        }
        if (isObject(option.css) && !isEmptyObject(option.css)) {
            _css = cloneJsonObject(option.css);
        }
        if (!option.classname && !option.css) {
            _css = cloneJsonObject(option);
        }
    }
    if (_class) {
        if (isDOM(node)) {
            removeClass(node, _class);
        } else {
            node.removeClassName(_class);
            if (node.realDom) {
                removeClass(node.realDom, _class);
            }
        }
    }
    if (_css) {
        for (const key in _css) {
            _css[key] = '';
        }
        if (isDOM(node)) {
            css(node, _css);
        } else {
            node.setStyle(_css);
            if (node.realDom) {
                css(node.realDom, _css);
            }
        }
    }
    if (!isDOM(node) && node.update) {
        node.update();
    }
}

export function removeStyle(c, vc, o, style) {
    if (isObject(style)) {
        const { container, custom } = style,
            df = style.default;

        if (container) {
            _removeStyle(c, container);
        }
        if (isObject(df)) {
            vc.children.forEach((panel) => {
                for (const key in df) {
                    const target = getNodesByPanel(panel)[key];

                    if (target) {
                        _removeStyle(target, df[key]);
                    }
                }
            });
        }
        (isArray(custom) ? custom : [custom]).forEach((com) => {
            if (isObject(com) && com.panels) {
                veach(vc, (elements) => {
                    for (const key in com) {
                        if (com[key] && elements[key]) {
                            _removeStyle(elements[key], com[key]);
                        }
                    }
                }, getRealIds(vc, com.panels, o.alias));
            }
        });

        vc.update();
    }
}

export function _setStyle(node, option, isUpdate, overwrite) {
    if (!node || !option) return;

    let _class = '',
        _css = null;

    if (isString(option)) {
        _class = option;
    }
    if (isObject(option) && !isEmptyObject(option)) {
        if (option.classname && isString(option.classname)) {
            _class = option.classname;
        }
        if (isObject(option.css) && !isEmptyObject(option.css)) {
            _css = option.css;
        }
        if (!option.classname && !option.css) {
            _css = option;
        }
    }
    if (_class) {
        if (isDOM(node)) {
            if (isUpdate) {
                if (overwrite) {
                    setClass(node, _class);
                } else {
                    addClass(node, _class);
                }
            }
        } else {
            if (overwrite) {
                node.setClassName(_class);
            } else {
                node.addClassName(_class);
            }
            if (isUpdate && node.realDom) {
                if (overwrite) {
                    setClass(node.realDom, _class);
                } else {
                    addClass(node.realDom, _class);
                }
            }
        }
    }
    if (_css) {
        if (isDOM(node)) {
            if (isUpdate) {
                css(node, _css);
            }
        } else {
            node.setStyle(_css);
            if (isUpdate && node.realDom) {
                css(node.realDom, _css);
            }
        }
    }
    if (!isDOM(node) && node.update) {
        node.update();
    }
}

export function _initStyle(c, vc, zoom, zoomParent, o, p, styleOption, update) {
    if (!vc || !o) return;
    const style = styleOption || {},
        { custom, inner, zoomContainer, zoomPane, pane, container } = style,
        df = style.default;

    if (container && update) {
        _setStyle(c, container, true);
    }

    if (inner) {
        _setStyle(vc, inner);
    }
    if (zoomContainer) {
        _setStyle(zoom, zoomContainer, true);
    }
    if (zoomPane) {
        _setStyle(zoomParent, zoomPane, true);
    }
    if (pane) {
        _setStyle(p, pane, true);
    }
    if (isObject(df)) {
        vc.children.forEach((panel) => {
            if (!panel.isWidget) {
                for (const key in df) {
                    _setStyle(getNodesByPanel(panel)[key], df[key], true);
                }
            }
        });
    }
    if (custom) {
        (isArray(custom) ? custom : [custom]).forEach((com) => {
            if (isObject(com) && com.panels) {
                veach(vc, (elements) => {
                    for (const key in com) {
                        if (com[key] && elements[key] && !(elements[key].isExtend)) {
                            _setStyle(elements[key], com[key], true, true);
                        }
                    }
                }, getRealIds(vc, com.panels, o.alias));
            }
        });
    }
}

export function updateStyle(c, vc, zoom, zoomParent, o, styleOption, isExtend) {
    if (!vc || !o) return;
    const style = styleOption || {},
        { container, custom, inner, zoomContainer, zoomPane } = style,
        df = style.default;

    if (container) {
        _setStyle(c, container, true);
    }

    if (inner) {
        _setStyle(vc, inner, true);
    }

    if (zoomContainer) {
        _setStyle(zoom, zoomContainer, true);
    }

    if (zoomPane) {
        _setStyle(zoomParent, zoomPane, true);
    }
    if (isObject(df)) {
        vc.children.forEach((panel) => {
            for (const key in df) {
                _setStyle(getNodesByPanel(panel)[key], df[key], true);
            }
        });
    }
    if (custom) {
        (isArray(custom) ? custom : [custom]).forEach((com) => {
            if (isObject(com) && com.panels) {
                veach(vc, (elements) => {
                    for (const key in com) {
                        if (com[key] && elements[key]) {
                            _setStyle(elements[key], com[key], true, false);
                        }
                    }
                }, getRealIds(vc, com.panels, o.alias));
            }
        });
    }
}

export function removeGuidelines(container) {
    if (isDOM(container)) {
        const gd = container.querySelector(`.${CT.GUIDELINES}`);

        if (isDOM(gd)) {
            gd.parentNode.removeChild(gd);
        }
    }
}

/*eslint-disable */
function getNewSize(old, percent, vsize, vvsize, totalSize) {
    return old !== undefined ? (percent !== null ? percent * totalSize : vsize) : vvsize;
}
/*eslint-enable*/

function setNodeLayout(vnode, vvnode, size, fullId, fullzIndex) {
    if ((vvnode.width !== undefined || vvnode.width !== null) && !vnode.isExtend) {
        const { _oldWidth, _oldHeight, _oldTop, _oldLeft,
            width, height, top, left,
            percentWidth, percentHeight, percentLeft, percentTop } = vnode;

        vnode
            .setHeight(getNewSize(_oldHeight, percentHeight, height, vvnode.height, size.height))
            .setWidth(getNewSize(_oldWidth, percentWidth, width, vvnode.width, size.width))
            .setTop(getNewSize(_oldTop, percentTop, top, vvnode.top, size.height))
            .setLeft(getNewSize(_oldLeft, percentLeft, left, vvnode.left, size.width));
    }

    if (vvnode.oldSize) {
        vnode.oldSize = vvnode.oldSize;
        vnode.setStyle({
            zIndex: vvnode.styles.zIndex || CT.PANEL_DEFAULT_ZINDEX,
        });
    }
    if (fullId > 0 && vnode.getId() === fullId) {
        vnode.setLeft(0).setTop(0).setStyle({
            zIndex: fullzIndex,
        });
    }
}

function updateOldVc(vnode, vvnode, size, o, fullId, fullzIndex) {
    setNodeLayout(vnode, vvnode, size, fullId, fullzIndex);
    vnode.children.forEach((vn) => {
        vvnode.children.forEach((vvn) => {
            if (vn.getId() === vvn.getId() && vnode.getRole() !== CT.PANEL) {
                setNodeLayout(vn, vvn, size, fullId, fullzIndex);
            }
        });
    });
}

function _setOverflow(vc, ids, type) {
    if (!vc || !ids || !type) return;
    if (isNumber(ids)) {
        ids = [ids];
    }
    if (isArray(ids)) {
        ids.forEach((id) => {
            const panel = getNodeById(vc, id, 'wrap');
            let style = null;

            if (panel) {
                if (type === 'auto' || type === 'visible') {
                    style = { overflow: type };
                }
                if (type === 'overflowX' || type === 'overflowY') {
                    style[type] = 'auto';
                }

                panel.setStyle(style).update();
            }
        });
    }
}

export function setOverflows(vc, o) {
    if (!vc || !o || !o.panelOverflow) return;
    const overflow = o.panelOverflow;

    if (overflow) {
        for (const key in overflow) {
            if (overflow[key] === 'all') {
                overflow[key] = getAllIds(vc);
            }
            if (isNumber(overflow[key]) || isArray(overflow[key])) {
                _setOverflow(vc, overflow[key], key);
            }
        }
    }
}

export function updateContainerSize(vc, o) {
    const { left, right, bottom, top } = o.padding;

    return {
        width: vc.width + left + right,
        height: vc.height + top + bottom,
    };
}

export function updateVCC(vc, c, sizes, o, fullId, zIndex) {
    if (!vc || !isDOM(c) || !sizes || !o) return;

    const vcc = createVc(),
        panels = [],
        ids = [];

    initLayout(o, vcc);

    updateLayout(vcc, c, sizes, o, panels, ids);

    loadExtends(vcc, o, false);

    if (fullId) {
        _full(vcc, fullId, zIndex || 0);
    }

    updateOldVc(vc, vcc, updateContainerSize(vcc, o), o, fullId, zIndex);

    updateExtends(vc, o);

    vc.update();

    if (o.dev.enable) {
        loadDev(c, vc, o);
    }

    setLineheight(vc, o.lineHeight);
}

function _setNodeLineHeight(target) {
    if (target && target.realDom) {
        const { realDom } = target,
            height = getPureStyle(realDom, 'height') || realDom.clientHeight,
            pt = getPureStyle(realDom, 'padding-top'),
            pb = getPureStyle(realDom, 'padding-bottom'),
            bt = getPureStyle(realDom, 'border-top-width'),
            bb = getPureStyle(realDom, 'border-bottom-width');

        target.setStyle({ lineHeight: `${height - pt - pb - bt - bb}px` }).update();
    }
}

export function setLineheight(vc, option) {
    if (!vc || !option) return;
    const op = isObject(option) ? [option] : option;

    if (isArray(op)) {
        op.forEach((o) => {
            let panels = o.panels;
            const type = o.type || 'head';

            if (isNumber(panels)) {
                panels = [panels];
            }
            if (isString(panels) && panels === 'all') {
                panels = getAllIds(vc);
            }
            if (isArray(panels)) {
                veach(vc, (nodes) => {
                    (isArray(type) ? type : [type]).forEach((t) => {
                        if (isString(t) && nodes) {
                            if (t === 'all') {
                                ['head', 'center', 'right', 'foot', 'left'].forEach((_t) => {
                                    _setNodeLineHeight(nodes[_t]);
                                });
                            } else {
                                _setNodeLineHeight(nodes[t]);
                            }
                        }
                    });
                }, panels);
            }
        });
    }
}

function insertTplDomToVc(target, vnode, type) {
    if (isDOM(target) && attr(target, CT.TARGET) === type && vnode && vnode.realDom) {
        vnode.realDom.appendChild(target);
    }
}

export function loadTemplate(c, vc, o) {
    if (!isDOM(c) || !vc || !isDOM(vc.realDom) || !o) return;
    const { env } = o;
    eachChild(c, (node) => {
        if (isDOM(node) && node.hasAttribute(CT.POPO)) {
            const id = getRealIds(vc, node.getAttribute(CT.POPO), o.alias),
                panel = getNodeById(vc, id, 'panel'),
                title = node.getAttribute('title'),
                cls = node.getAttribute('class');

            if (panel && panel.realDom) {
                const els = getNodesByPanel(panel);

                addClass(panel.realDom, cls);

                const children = node.childNodes;
                for (let i = 0, len = children.length; i < len; i++) {
                    const target = children[env === 'vue' ? 0 : i];
                    const __t = attr(target, CT.TARGET);
                    if (__t && els[__t]) {
                        insertTplDomToVc(target, els[__t], __t);
                    }
                }

                if (!query(node, `[${CT.TARGET}=head]`) && title && els.head
                    && els.head.realDom && !els.head.realDom.hasChildNodes()) {
                    els.head.realDom.innerHTML = title;
                }
            }
        }
    });
}

export function restorePanelTemplate(panel, c, vc, o) {
    if (!panel || !isDOM(panel.realDom) || !isDOM(c) || !vc || !o) return;
    eachChild(c, (node) => {
        if (isDOM(node) && node.hasAttribute(CT.POPO)) {
            const id = getRealIds(vc, node.getAttribute(CT.POPO), o.alias);

            if (panel.getId() === id) {
                const nodes = getNodesByPanel(panel);

                for (const type in nodes) {
                    if (nodes[type] && nodes[type].realDom) {
                        const target = nodes[type].realDom.firstChild;

                        if (isDOM(target) && type === target.getAttribute(CT.TARGET)) {
                            node.appendChild(target);
                        }
                    }
                }

                return false;
            }
        }

        return true;
    });
}

export function restoreTemplate(c, vc, o) {
    if (!isDOM(c) || !vc || !isDOM(vc.realDom) || !o) return;
    eachChild(c, (node) => {
        if (isDOM(node) && node.hasAttribute(CT.POPO)) {
            const id = getRealIds(vc, node.getAttribute(CT.POPO), o.alias),
                panel = getNodeById(vc, id, 'panel');

            if (panel && panel.realDom) {
                const nodes = getNodesByPanel(panel);

                for (const type in nodes) {
                    if (nodes[type] && nodes[type].realDom) {
                        const target = nodes[type].realDom.firstChild;

                        if (isDOM(target) && type === target.getAttribute(CT.TPL)) {
                            target.removeAttribute(CT.TPL);
                            addClass(target, type);
                            node.appendChild(target);
                        }
                    }
                }
            }
        }
    });
}

export function getScrollPane(o, c, init) {
    /*eslint-disable */
    const target = o.zoom.enable ? c.parentNode.parentNode : c.parentNode;
    /*eslint-enable */

    if (init && isDOM(target)) {
        target.scrollLeft = 0;
        target.scrollTop = 0;
    }

    return target;
}

export function focusOn(vc, c, o, id, offsetX, offsetY) {
    if (!vc || !c || !o || !id < 0) return;

    const panel = getNodeById(vc, getId(id, o.alias), 'panel');

    if (panel) {
        const pane = getScrollPane(o, c, true),
            scale = o.zoom.enable ? o.zoom.scale : 1;

        if (pane && isDOM(pane)) {
            pane.scrollLeft = (panel.left + offsetX) * scale;
            pane.scrollTop = (panel.top + offsetY) * scale;
        }
    }
}

export function zoomUpdate(vc, c, scale) {
    if (!vc || !c || !scale) return;
    const rect = getRect(c.parentNode.parentNode),
        width = (c._origionWidth || vc.width),
        height = (c._origionHeight || vc.height);

    let top = (rect.height - (height * scale)) / 2,
        left = (rect.width - (width * scale)) / 2;

    if (top < 0 || scale === 1) top = 0;
    if (left < 0 || scale === 1) left = 0;

    css(c.parentNode, {
        paddingTop: `${top}px`,
        paddingLeft: `${left}px`,
    });
}

export function togglePoPo(c, show) {
    const display = show ? '' : 'none';

    eachChild(c, (node) => {
        if (isDOM(node) && node.getAttribute(CT.POPO)) {
            css(node, { display });
        }
    });
}
import Vnode from '../../dom/vdom/vnode';
import SVG from '../../dom/vdom//vsvg';
import CT from '../../constant/constant';
import { css, create, removeByClass, query } from '../../dom/dom';
import { isNumber, isArray, isString, isDOM, merge } from '../../utils/util';
import { getRealIds, getAllIds } from './popo';

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

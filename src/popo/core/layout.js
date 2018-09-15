import {
    isNumber, isArray, legalNumber, trim, isObject, isString, formatNum,
} from '../../utils/util';
import { getRect, setStyle } from '../../dom/dom';
import CT from '../../constant/constant';
import ERROR_MSG from '../../constant/error';
import Vnode from '../../dom/vdom/vnode';

function sumArrFirst(arr) {
    let sum = 0;

    if (isArray(arr)) {
        arr.forEach((a) => {
            if (isNumber(a)) {
                sum += a;
            }
            if (isArray(a) && isNumber(a[0])) {
                sum += a[0];
            }
        });
    }

    return sum;
}

function sumItem(o) {
    const sum = sumArr(o);

    return sum <= 0 ? sumArrFirst(o) : sum;
}

function sumArr(arr) {
    let sum = 0;

    if (isArray(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (isNumber(arr[i])) {
                sum += arr[i];
            } else {
                return -1;
            }
        }
    }

    return sum;
}

export function validateAllLy(ly, rows, cols, startType) {
    let great = true;
    const firstCount = startType === 'row' ? rows : cols;

    function validateCore(arr, type) {
        // const count = type == 'row' ? (startType === 'row' ? cols : rows) : (startType === 'row' ? rows : cols);
        const count = type === 'row' ? cols : rows;

        if (!isArray(arr) && !isArray(arr[1])) return;
        if (sumItem(arr[1]) > count) {
            great = false;
        }
        if (isArray(arr[1])) {
            arr[1].forEach((a) => {
                if (isArray(a)) {
                    validateCore(a, type === 'row' ? 'col' : 'row');
                }
            });
        }
    }

    if (sumArrFirst(ly) > firstCount) {
        great = false;
    } else {
        for (let i = 0, len = ly.length; i < len; i++) {
            validateCore(ly[i], startType);
        }
    }

    return great;
}

export function initSize(rows, cols) {
    if (!rows || !cols) return null;
    const unitRow = (100 / rows),
        unitCol = 100 / cols,
        sizes = {};

    for (let i = 1; i <= rows; i++) {
        sizes[`${CT.SINGLE_ROW}-${i}`] = (unitRow * i).toFixed(5);
    }
    for (let i = 1; i <= cols; i++) {
        sizes[`${CT.COL}-${i}`] = (unitCol * i).toFixed(5);
    }

    return sizes;
}

/**
 * Validate layout number
 * @param {Number} num number
 * @param {Number} end end
 * @param {Number} cols cols
 * @param {Number} rows rows
 * @return {Boolean} validate result
 */
function validateLayoutNumber(num, end, cols, rows) {
    return isNumber(num) && num >= 1 && num <= (end || Math.max(cols, rows));
}

/**
 * Get layout wrap count
 * @param {Array} layouts layout
 * @param {Number} cols cols
 * @param {Number} rows rows
 * @return {Number} layout wrap count
 */
export function getLayoutWrapCount(layouts, cols, rows) {
    let count = 0;

    for (let i = 0, len = layouts.length; i < len; i++) {
        const start = layouts[i][0];

        if (!validateLayoutNumber(start, null, cols, rows)) {
            return 0;
        }
        count += start;
    }

    return count;
}

/**
 * Validate layout.
 * @param {Array} layouts layout array
 * @param {Number} cols column count
 * @param {Number} rows row count
 * @return {Boolean} valite layout result
 */
export function validateLayout(layouts, cols, rows) {
    if (!layouts || !layouts.length) return false;
    const count = getLayoutWrapCount(layouts, cols, rows);

    if (!count) {
        throw new Error(ERROR_MSG.LY_INVALID);
    }

    return true;
}

export function getRowClassName(row, rows) {
    return row < 0 ? `${CT.SINGLE_ROW}-${rows}` : `${CT.SINGLE_ROW}-${row}`;
}

/*eslint-disable */
export function getColClassName(col, hasRow) {
    return col < 0 ? (hasRow ? ` ${CT.ROW}` : '') : (`${CT.COL}-${col}${(hasRow ? ` ${CT.ROW}` : '')}`);
}
/*eslint-enable*/

export function generateEvLy(rows, cols, rowNumber, colNumber) {
    rowNumber = Math.floor(rows / legalNumber(rowNumber, 1, rows)) || 1;
    colNumber = Math.floor(cols / legalNumber(colNumber, 1, cols)) || 1;

    const result = new Array(Math.floor(rows / rowNumber)),
        colsLength = Math.floor(cols / colNumber);

    for (let i = 0; i < result.length; i++) {
        result[i] = [rowNumber, []];
        for (let j = 0; j < colsLength; j++) {
            result[i][1].push(colNumber);
        }
    }

    return result;
}

export function newVNode(parent, classNames, setId, type) {
    const node = new Vnode().addClassName(classNames).insertTo(parent);

    node.type = type;

    if (setId) {
        node.setRole(CT.PANEL);
        // .addClassName(CT.PANEL);
    }

    return node;
}

export function removeUnused(vc, panels) {
    function selectPanel(vnode) {
        const nodes = vnode.children;

        nodes.forEach((node) => {
            if (node.role === CT.PANEL) {
                panels.push(node);
                node.setId(panels.length);
            }
            if (node.children.length > 0) {
                selectPanel(node);
            }
        });
    }

    selectPanel(vc);
}

export function newLy(layout, type, vc, rows, cols) {
    type = type || 'row';
    const parent = layout[0],
        childrens = layout[1];

    let vparentNode = null,
        classname = '';

    if (validateLayoutNumber(parent, null, cols, rows)) {
        classname = type === 'col' ? getColClassName(parent, true) : getRowClassName(parent, rows);
        vparentNode = newVNode(vc, classname, false, type === 'col' ? 'col' : 'row', parent);
    }
    if (!vparentNode) return;

    if (validateLayoutNumber(childrens, null, cols, rows)) {
        newVNode(vparentNode, classname, true, type);
    } else if (isArray(childrens)) {
        childrens.forEach((c) => {
            if (validateLayoutNumber(c, null, cols, rows)) {
                classname = type === 'col' ? getRowClassName(c, rows) : getColClassName(c, true);
                newVNode(vparentNode, classname, true, type === 'col' ? 'row' : 'col', c);
            } else if (isArray(c)) {
                newLy(c, type === 'col' ? 'row' : 'col', vparentNode, rows, cols);
            }
        });
    } else if (!childrens) {
        classname = type === 'col' ? getColClassName(-1, true) : getRowClassName(-1, rows);
        newVNode(vparentNode, classname, true, type === 'col' ? 'row' : 'col', -1);
    }
}

export function updateVnodeSize(vc, sizes, options, container) {
    if (!vc || !sizes || !options) return;

    const keys = Object.keys(sizes).join(','),
        gutter = options.gutter,
        freeLy = options.freeLy;

    let fixedHeight = options.fixedHeight || 0,
        fixedWidth = options.fixedWidth || 0;

    if (fixedHeight > 0) {
        fixedHeight = legalNumber(fixedHeight, 0.01);
    }
    if (fixedWidth > 0) {
        fixedWidth = legalNumber(fixedWidth, 0.01);
    }

    function setSize(vnode) {
        const nodes = vnode.children;

        nodes.forEach((node) => {
            node.classNames.split(' ').forEach((cls) => {
                cls = trim(cls);
                if (keys.indexOf(cls) >= 0) {
                    if (cls.indexOf('-col-') >= 0) {
                        node.setWidth(sizes[cls]);

                        return;
                    }
                    if (cls.indexOf('-row-') >= 0) {
                        node.setHeight(sizes[cls]);

                        return;
                    }
                }
            });
            if (node.children.length > 0) {
                setSize(node);
            }
        });
    }
    setSize(vc);

    function updateFixedSize(node) {
        if (fixedHeight > 0 && !fixedWidth) {
            node.height = fixedHeight > 1 ? fixedHeight : ((node.width * fixedHeight) + (gutter * (1 - fixedHeight)));
        }
        if (fixedWidth > 0 && !fixedHeight) {
            node.width = fixedWidth > 1 ? fixedWidth : ((node.height * fixedWidth) + (gutter * (1 - fixedWidth)));
        }
        if (fixedHeight > 1 && fixedWidth > 1) {
            node.height = fixedHeight;
            node.width = fixedWidth;
        }
    }

    function updateRealsize(vnode) {
        const nodes = vnode.children;

        nodes.forEach((node) => {
            if (node.width !== 0) {
                node.width = Number((vnode.width * node.width / 100));
            }
            if (node.height !== 0) {
                node.height = (freeLy && freeLy.col === 1) ? vnode.height : Number((vnode.height * node.height / 100));
            }
            if (node.width === 0 && vnode.width !== 0) {
                node.width = Number(vnode.width);
            }
            if (node.height === 0 && vnode.height !== 0) {
                node.height = Number(vnode.height);
            }
            updateFixedSize(node);
            if (node.children.length > 0) {
                updateRealsize(node);
            }
        });
    }
    /*eslint-disable */
    const padding = options.padding,
        paddingLeft = padding.left + padding.right,
        paddingTop = padding.top + padding.bottom;

    let width = options.width,
        height = options.height;
    /*eslint-enable */

    if ((!width || !height) && container) {
        const target = container.parentNode || container,
            ch = target.clientHeight,
            cw = target.clientWidth,
            rect = getRect(target),
            th = ch / rect.height > 1 ? ch : rect.height,
            tw = cw / rect.width > 1 ? cw : rect.width;

        if (width === 0) {
            container._origionWidth = width = tw;
        }
        if (height === 0) {
            container._origionHeight = height = th;
        }
    }   

    setStyle(container, {
        width: `${width}px`,
        // height: `${height}px`,
    });
    // container.setWidth(width).setHeight(height);

    width -= paddingLeft;
    height -= paddingTop;

    vc.children.forEach((node) => {
        if (node.width !== 0) {
            node.width = width * Number(node.width) / 100;
        }
        if (node.height !== 0) {
            node.height = height * Number(node.height) / 100;
        }
        if (node.width === 0) {
            node.width = width;
        }
        if (node.height === 0) {
            node.height = height;
        }

        updateRealsize(node);
        const child = node.children[0];

        if (child) {
            if (fixedHeight > 0) {
                node.height = child.height;
            }
            if (fixedWidth > 0) {
                node.width = child.width;
            }
        }
    });

    vc.setWidth(width).setHeight(height);
    if (fixedHeight > 0) {
        if (fixedHeight <= 1) {
            fixedHeight = vc.children[0].height;
        }
        const fixedTotalHeight = fixedHeight * options.layout.length;

        vc.setHeight(fixedTotalHeight);
        container._origionHeight = fixedTotalHeight;
    }

    if (fixedWidth > 0) {
        if (fixedWidth <= 1) {
            fixedWidth = vc.children[0].width;
        }
        let length = 0;

        if (options.layoutStartType === 'row') {
            length = options.layout[0][1].length;
        } else {
            length = options.layout.length;
        }

        const fixedTotalWidth = fixedWidth * length;

        vc.setWidth(fixedTotalWidth);
        container._origionWidth = fixedTotalWidth;
    }
}

function updateAbs(vc, o, panels) {
    if (!vc || !o || !panels) return;
    let _step = 0;

    vc.children.forEach((node) => {
        if (node.type === 'row') {
            node.left = 0;
            node.top = _step;
            _step += node.height;
        }
        if (node.type === 'col') {
            node.top = 0;
            node.left = _step;
            _step += node.width;
        }
    });

    _step = 0;
    panels.forEach((node) => {
        if (node.type === 'row') {
            node.left = 0;
            node.top = _step;
            _step += node.height;
        }
        if (node.type === 'col') {
            node.top = 0;
            node.left = _step;
            _step += node.width;
        }
    });

    function setAbs(vnode) {
        const nodes = vnode.children;
        let step = vnode.type === 'row' ? vnode.left : vnode.top;

        nodes.forEach((node) => {
            if (node.type === 'row' && vnode.type === 'col') {
                node.left = vnode.left;
                node.top = step;
                step += node.height;
            }
            if (node.type === 'col' && vnode.type === 'row') {
                node.top = vnode.top;
                node.left = step;
                step += node.width;
            }
            if (node.children.length > 0) {
                setAbs(node);
            }
        });
    }

    vc.children.forEach((node) => {
        setAbs(node);
    });

    const gutter = o.gutter;

    panels.forEach((panel) => {
        panel.setWidth(panel.width - gutter)
            .setHeight(panel.height - gutter)
            .setTop(formatNum((panel.top + (gutter * 0.5)), 5))
            .setLeft(formatNum((panel.left + (gutter * 0.5)), 5))
            .clearClassName()
            .setRole(CT.PANEL)
            .setStyle({
                position: 'absolute',
                zIndex: CT.PANEL_DEFAULT_ZINDEX,
            });
        panel.parentNode = null;
    });

    vc.children = panels;
    vc.children.forEach((node) => {
        node.parentNode = vc;
    });
    panels = null;
}

export function initLayoutSet(o) {
    const ly = o.layout,
        gutter = o.gutter,
        rows = legalNumber(o.rows, CT.MIN_LY_COUNT),
        cols = legalNumber(o.cols, CT.MIN_LY_COUNT);
    let startType = o.layoutStartType,
        _ly = ly;

    if (isString(ly) && ly.toLocaleLowerCase() === 'whole') {
        _ly = [[rows]];
    }

    if (isArray(ly)) {
        if (ly.length === 0) {
            _ly = [[rows]];
        }
        _ly = ly.map((n) => {
            if (isNumber(n)) { n = [n]; }

            return n;
        });
    }

    if (isObject(ly)) {
        let fh = legalNumber(ly.height, 0),
            fw = legalNumber(ly.width, 0);

        _ly = generateEvLy(rows, cols, ly.rows, ly.cols);

        if (fh || fw) {
            if (fh > 1 && fw > 0 && fw <= 1) {
                fw = fh * fw;
            }
            if (fh > 0 && fh <= 1 && fw > 1) {
                fh = fw * fh;
            }
            if (fw > 1) {
                fw += gutter;
            }
            if (fh > 1) {
                fh += gutter;
            }
            if (fh > 0 && fh <= 1 && fw > 0 && fw <= 1) {
                throw new Error(ERROR_MSG.LY_FIXED_LESS);
            }
        }

        o.fixedHeight = fh;
        o.fixedWidth = fw;
        o.freeLy = {
            col: ly.cols || o.cols,
            row: ly.rows || o.rows,
            fh,
            fw,
        };
        o.layoutStartType = startType = 'row';
    }

    if (_ly && !validateAllLy(_ly, rows, cols, startType)) {
        throw new Error(ERROR_MSG.LY_INVALID);
    }

    o.layout = _ly;

    return true;
}

export function initLayout(o, vc) {
    if (!o || !vc || !o.layout) return false;
    const lys = o.layout,
        cols = o.cols,
        rows = o.rows,
        type = o.layoutStartType;

    if (!validateLayout(lys, cols, rows)) return false;

    lys.forEach((ly) => { newLy(ly, type, vc, rows, cols); });

    return true;
}

export function updateLayout(vc, c, sizes, options, panels) {
    updateVnodeSize(vc, sizes, options, c);
    removeUnused(vc, panels);
    updateAbs(vc, options, panels);
}

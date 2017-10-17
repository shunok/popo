import {
    isNumber, isArray, contain, unique, getCssSize, formatMargin2, isPercentage, translatePercentage,
} from '../../utils/util';
import { getTargetDataId, } from '../../dom/dom';
import CT from '../../constant/constant';
import Vnode from '../../dom/vdom/vnode';

/**
 * Generate Panel layout
 * @param {Object} layout layoutOptions
 * @param {Number} scale fontscale
 * @return {Object} layout size
 */
function genPanelLy({ gutter = 0, headHeight = 0, footHeight = 0, rightWidth = 0, leftWidth = 0 }, scale = 1) {
    gutter = formatMargin2(gutter, scale);
    headHeight = getCssSize(headHeight, scale);
    footHeight = getCssSize(footHeight, scale);
    rightWidth = getCssSize(rightWidth, scale);
    leftWidth = getCssSize(leftWidth, scale);

    const containerHeight = `calc(100% - ${headHeight} - ${footHeight} - ${gutter.top} - ${gutter.bottom})`,
        centerWidth = `calc(100% - ${rightWidth} - ${leftWidth} - ${gutter.left} - ${gutter.right})`;

    return {
        headHeight,
        footHeight,
        rightWidth,
        leftWidth,
        containerHeight,
        centerWidth,
        gutter,
    };
}

function addPanel(panel, layout, fontScale) {
    const { headHeight, footHeight, rightWidth, leftWidth,
        containerHeight, centerWidth, gutter } = genPanelLy(layout, fontScale);
    let containerNode = null;

    // head
    if (headHeight !== '0px' && headHeight !== '0%') {
        new Vnode().setRole(CT.GRID_HEAD)
            .setHeight(headHeight)
            .insertTo(panel);
    }

    // center\left\right container
    if (headHeight !== '100%' && footHeight !== '100%') {
        containerNode = new Vnode().setRole(CT.GRID_L_C_R)
            .setHeight(containerHeight)
            .setStyle({ marginBottom: gutter.bottom, marginTop: gutter.top })
            .insertTo(panel);
    }

    // foot
    if (footHeight !== '0px' && footHeight !== '0%') {
        new Vnode().setRole(CT.GRID_FOOT).setHeight(footHeight).insertTo(panel);
    }

    // left
    if (leftWidth !== '0px' && leftWidth !== '0%') {
        const left = new Vnode().setRole(CT.GRID_LEFT)
            .setWidth(leftWidth);

        if (containerNode) {
            left.insertTo(containerNode);
        }
    }

    // center
    if (containerNode) {
        new Vnode().setRole(CT.GRID_CENTER)
            .setWidth(centerWidth)
            .setStyle({
                marginLeft: gutter.left,
                marginRight: gutter.right,
            })
            .insertTo(containerNode);
    }

    // right
    if (rightWidth !== '0px' && rightWidth !== '0%') {
        const right = new Vnode().setRole(CT.GRID_RIGHT)
            .setWidth(rightWidth);

        if (containerNode) {
            right.insertTo(containerNode);
        }
    }

    return panel;
}

export function addLayoutToPanel(panel, layout, fontScale) {
    if (!panel || !layout) return;
    if (panel.queryByRole(CT.PANEL_CONTAINER)) {
        return;
    }

    const panelContainer = new Vnode()
        .setStyle({ position: 'relative' })
        .setRole(CT.PANEL_CONTAINER);

    addPanel(panelContainer, layout, fontScale || 1).insertTo(panel);
}

export function addPanels(vc, o) {
    if (!vc || !o.panel || !o.panel.enable) return;
    const df = o.panel.default,
        custom = o.panel.custom,
        customIds = [],
        fullId = o.fullId,
        fullZIndex = o.fullZIndex;

    if (custom && isArray(custom)) {
        custom.forEach((c) => {
            let panels = c.panels;

            if (isNumber(panels)) {
                panels = [panels];
            }

            if (isArray(panels)) {
                const customVnodes = [];

                c.panels = panels = unique(panels);
                panels.forEach((id) => {
                    customIds.push(id);
                    const _vn = vc.getChild(id);

                    if (_vn) {
                        customVnodes.push(_vn);
                    }
                });

                customVnodes.forEach((vnode) => {
                    let zIndex = c.zIndex;

                    if (vnode.getId() === fullId) {
                        zIndex = fullZIndex;
                    }
                    addLayoutToPanel(vnode, c, o.fontScale);
                    vnode.setStyle({ zIndex }).update();
                });
            }
        });
    }

    vc.children.forEach((node) => {
        if (contain(customIds, node[CT.COMPONENT_ID_KEY]) < 0) {
            let zIndex = df.zIndex;

            if (node.getId() === fullId) {
                zIndex = fullZIndex;
            }
            addLayoutToPanel(node, df, o.fontScale);
            node.setStyle({ zIndex }).update();
        }
    });
}
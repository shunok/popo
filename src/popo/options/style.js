import CT from '../../constant/constant';

const prefix = `${CT.NAME}-`;

/**
 * Theme option
 * @typedef {Object} theme
 * @prop {Object} container container theme
 * @prop {Object} default panel default theme
 * @prop {Object|Array} custom custom panel theme
 */
export default {
    container: prefix + CT.WRAP,
    inner: prefix + CT.CONTAINER,
    zoomContainer: prefix + CT.ZOOMCONTAINER,
    zoomPane: prefix + CT.ZOOMPANE,
    default: {
        panel: prefix + CT.PANEL,
        panelContainer: prefix + CT.PANEL_CONTAINER,
        head: prefix + CT.GRID_HEAD,
        foot: prefix + CT.GRID_FOOT,
        center: prefix + CT.GRID_CENTER,
        right: prefix + CT.GRID_RIGHT,
        left: prefix + CT.GRID_LEFT,
        lcr: prefix + CT.GRID_L_C_R,
    },
    custom: null,
};
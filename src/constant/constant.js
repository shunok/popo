const NM = 'popo';

/**
 * Enum for system constant
 * @enum
 * @readonly
 */
export default {

    /**
     * @const
     * @type {Number}
     * @default
     */
    MIN_LY_COUNT: 1,

    /**
     * Grids system column count
     * @const
     * @type {Number}
     * @default
     */
    COLS: 24,

    /**
     * Grids system row count
     * @const
     * @type {Number}
     * @default
     */
    ROWS: 12,

    /**
     * Panel default zIndex
     * @const
     * @type {Number}
     * @default
     */
    PANEL_DEFAULT_ZINDEX: 1,

    NAME: NM,

    POPO: `data-${NM}`,

    ROLE: `data-${NM}-role`,

    TARGET: `data-${NM}-target`,

    COMPONENT_ID_KEY: `data-${NM}-id`,

    EXT_PANE: `${NM}-ext-pane`,

    PANE: `pane`,

    CONTAINER: `container`,

    PANEL: `panel`,

    PANEL_CONTAINER: `panel-container`,

    WRAP: `wrap`,

    GRID_L_C_R: 'lcr',

    GRID_HEAD: `head`,

    GRID_CENTER: `center`,

    GRID_LEFT: `left`,

    GRID_RIGHT: `right`,

    GRID_FOOT: `foot`,

    SINGLE_ROW: `${NM}-s-row`,

    ROW: `${NM}-row`,

    COL: `${NM}-col`,

    INFO: `${NM}-dev-info`,

    GUIDELINES: `${NM}-guideline`,

    PANEL_GUIDELINES: `${NM}-panel-guideline`,

    SPLITLINES: `${NM}-splitline`,

    ZOOMPANE: `zoom-pane`,

    ZOOMCONTAINER: `zoom-container`,

    ATTRIBUTTION: `${NM}-attribution`,

    ZOOMIN: `${NM}-ct-zoom-in`,

    ZOOMOUT: `${NM}-ct-zoom-out`,

    ZOOMINFO: `${NM}-ct-zoom-info`,

    TPL: `data-${NM}-tpl`,

    DRAW_ID_KEY: `${NM}-ts`,

    LINE: 'l',

    PATH: 'p',

    CIRCLE: 'c',

    FILTER: 'f',

    MARKER: 'm',

    LINER_GRADIENT: 'lg',

    RADIAL_GRADIENT: 'rg',

    BORDER: 'b',

    EVENT: `_${NM}_event`,

};

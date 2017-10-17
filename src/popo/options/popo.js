import CT from '../../constant/constant';

export default {

    // Layout container
    // It can be either DOM or ID and classname
    container: '',

    // Define grid rows number. Sets the number of rows in the layout. default value is 12.
    rows: CT.ROWS,

    // Sets the number of columns in the layout. default value is 24.
    cols: CT.COLS,

    // Define grid cols number. The default will be stretched over the width of the entire container.
    // px
    width: 0,

    // The default will be full of the entire container height.
    // px
    height: 0,

    // Gutter
    gutter: 10,

    // The default is the panel that is spread across the container.
    // []
    // {row:4, col:6, height:0, width:0}
    layout: null,

    // Layout start type
    layoutStartType: 'row',

    // font scale, only setting for panel size.
    fontScale: 1,

    // Full screen display of panel
    fullId: 0,

    // Full screen panel zIndex
    fullZIndex: 0,

    // scroll, when zoom is enable, scroll will be disabled.
    scroll: {
        x: false,
        y: false,
    },

    // drag enable or disable.
    drag: false,

    // Panel setting
    panel: {
        enable: false,
        default: {
            headHeight: 0,
            footHeight: 0,
            leftWidth: 0,
            rightWidth: 0,
            gutter: 0,
            zIndex: CT.PANEL_DEFAULT_ZINDEX,
        },
        custom: [],
    },

    overflowVisible: false,

    // Setting Panel overflow
    panelOverflow: {
        visible: '',
        overflowX: '',
        overflowY: '',
    },

    /**
     * dev options
     * @type {Object}
     * @define
     */
    dev: {
        /**
         * @param {Boolean} enable enbale or disable dev. @default false
         */
        enable: false,
        // Panel info setting
        panel: {
            show: true,
            id: true,
            size: false,
            position: false,
            background: '',
            fontSize: 14,
            fontColor: '#333',
        },
        // layout guideline setting
        guideline: {
            show: false,
            identifier: true,
            lineSize: 1,
            color: 'rgba(0,0,0,.25)',
            zIndex: 0,
            fontSize: 14,
            fontColor: '#333',
        },
        // panel guidlines setting
        panelGuideline: {
            show: false,
            ids: 'all',
            lineSize: 0.5,
            size: 15,
            zIndex: 0,
            color: '#888',
        },
        // Screen splitline setting
        splitline: {
            show: false,
            lineSize: 1,
            width: 100,
            height: 100,
            color: '#000',
            zIndex: 0,
            identifier: true,
            fontColor: '#333333',
            fontSize: 12,
        },
        // only show one or some pannels.
        showIds: 0,
    },

    // Zoom setting
    zoom: {
        enable: false,
        control: true,
        scale: 1,
        ratio: 0.1,
        min: 0.1,
        max: 1,
        position: 'rightTop', // leftTop, leftBottom, rightBottom, rightTop
        wheelZoom: true,
    },

    /**
     * Focus option
     * @type {Object}
     * @define fouces
     * @param {Number|String} id focus id @default 0
     * @param {Number} offsetX offsetX @default 0
     * @param {Number} offsetY offsetY @default 0
     */
    focus: {
        id: 0,
        offsetX: 0,
        offsetY: 0,
    },

    // set auto line-height. lineheight will to be eqaul element height
    // [{ids: 1, type: 'center, head'}, {ids:[2,3], type:'head'}]
    lineHeight: null,

    /**
     * Hide ids
     * @type {Array|Number|String}
     * @default
     */
    hideIds: null,

    /**
     * hide type. include panel, wrap, center, head, foot, left, right
     * @type {String}
     * @default
     */
    hideType: 'panel',

    /**
     * trace window resize
     * @type {Boolean}
     * @default
     */
    trackResize: true,

    /**
     * update interval time.ms
     * @type {Number}
     * @default
     */
    updateInterval: 200,

    /**
     * render delay time. ms
     * @type {Number}
     * @default
     */
    renderDelay: 0,

    /**
     * theme setting.
     * @type {Object}
     * @default
     */
    style: null,

    /**
     * Extend Panels setting
     * @type {Array}
     * @default
     */
    extends: [],

    /**
     * onload function
     * @type {Function}
     * @default
     */
    onload: null,

    /**
     * update function
     * @type {Function}
     * @default
     */
    update: null,

    /**
     * Alias
     * @type {Object}
     * @default
     */
    alias: null,
};

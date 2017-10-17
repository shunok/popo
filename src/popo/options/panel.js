import CT from '../../constant/constant';

/**
 * Screen extends panel option and addPanel option
 * @typedef {Object} panel
 * @property {Object} size panel size
 * @property {Object} position panel position
 * @property {String} id panel dom id
 * @property {Number} zIndex panel zIndex
 * @prop {Object} layout panel layout.
 */
export default {
    size: {
        width: 0,
        height: 0,
        responsive: true,
    },
    position: {
        left: 0,
        top: 0,
        responsive: true,
    },
    id: '',
    zIndex: CT.PANEL_DEFAULT_ZINDEX,
    layout: null,
};

//    layout: {
//     headHeight: 0,
//     footHeight: 0,
//     leftWidth: 0,
//     rightWidth: 0,
//     gutter: 0,
// },
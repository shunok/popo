const ua = navigator.userAgent.toLowerCase(),
    doc = document.documentElement,
    width = window.innerWidth || doc.clientWidth || document.body.clientWidth,
    height = window.innerHeight || doc.clientHeight || document.body.clientHeight,
    ie = 'ActiveXObject' in window,
    webkit = ua.indexOf('webkit') !== -1,
    mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1;

export default {

    ie,

    width,

    height,

    aspectRatio: width / height,

    webkit,

    mobile,

};

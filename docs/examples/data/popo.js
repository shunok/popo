// this js file will translate to be the json file.
module.exports =
    {

        base: {
            lineHeight: {
                panels: 'all',
                type: 'head'
            }
        },
        screen_1440: {
            layout: [
                [6, [4, 4, 4]],
                [12, [1, 7, 4]],
                [6, [5, 7]],
            ],
            layoutStartType: 'col',
            alias: [
                { name: "caption", id: 4, type: "title" },
                { name: "chart1", id: 1, type: "chart" },
                { name: "chart2", id: 2, type: "chart" },
                { name: "chart3", id: 6, type: "chart" },
                { name: "chart4", id: 6, type: "chart" },
                { name: "chart5", id: 7, type: "chart" },
                { name: "chart7", id: 8, type: "chart" },
                { name: "chinamap", id: 5, type: "map" }
            ],
            gutter: 0,
            fontScale: 1,
            panelOverflow: {
                visible: 'all'
            },
            panel: {
                enable: true,
                default: {
                    headHeight: 40,
                    gutter: 10
                },
                custom: [{
                    panels: 4,
                    headHeight: '100%',
                }, {
                    panels: [5, 6],
                    gutter: 0
                }]
            },
            style: {
                container: 'screen-1440',
                custom: [{
                    panels: [1, 2, 3, 7, 8, 9],
                    head: 'badge',
                }]
            },
        },
        screen_1920: {
            layout: [
                [4, [4, 4, 4]],
                [16, [1, 7, 4]],
                [4, [3, 3, 6]],
            ],
            layoutStartType: 'col',
            alias: [
                { name: "caption", id: 4, type: "title" },
                { name: "chart1", id: 1, type: "chart" },
                { name: "chart2", id: 2, type: "chart" },
                { name: "chart3", id: 3, type: "chart" },
                { name: "chart4", id: 6, type: "chart" },
                { name: "chart5", id: 7, type: "chart" },
                { name: "chart6", id: 8, type: "chart" },
                { name: "chart7", id: 9, type: "chart" },
                { name: "chinamap", id: 5, type: "map" }
            ],
            gutter: 15,
            fontScale: 1.35,
            panelOverflow: {
                visible: 'all'
            },
            panel: {
                enable: true,
                default: {
                    headHeight: 40,
                    gutter: 10
                },
                custom: [{
                    panels: 4,
                    headHeight: '100%',
                }, {
                    panels: [5, 6],
                    gutter: 0
                }]
            },
            style: {
                container: 'screen-1920',
                custom: [{
                    panels: [1, 2, 3, 7, 8, 9],
                    head: 'badge',
                }]
            },
        },

        screen_bigger: {
            layout: [
                [3, [4, 4, 4]],
                [18, [1, 7, 4]],
                [3, [3, 3, 6]],
            ],
            layoutStartType: 'col',
            alias: [
                { name: "caption", id: 4, type: "title" },
                { name: "chart1", id: 1, type: "chart" },
                { name: "chart2", id: 2, type: "chart" },
                { name: "chart3", id: 3, type: "chart" },
                { name: "chart4", id: 6, type: "chart" },
                { name: "chart5", id: 7, type: "chart" },
                { name: "chart6", id: 8, type: "chart" },
                { name: "chart7", id: 9, type: "chart" },
                { name: "chinamap", id: 5, type: "map" }
            ],
            gutter: 15,
            fontScale: 2,
            panelOverflow: {
                visible: 'all'
            },
            panel: {
                enable: true,
                default: {
                    headHeight: 40,
                    gutter: 10
                },
                custom: [{
                    panels: 4,
                    headHeight: '100%',
                }, {
                    panels: [5, 6],
                    gutter: 0
                }]
            },
            style: {
                container: 'screen-bigger',
                custom: [{
                    panels: [1, 2, 3, 7, 8, 9],
                    head: 'badge',
                }]
            },
        },

        mobile: {
            rows: 29,
            height: 1700,
            layout: [1, 3, 5, 5, 5, 5, 5],
            style: {
                custom: [{
                    panels: 1,
                    panel: 'mobiletitle'
                }]
            },
            alias: [
                { name: "caption", id: 1, type: "title" },
                { name: "mobile_note", id: 2, type: "summary" },
                { name: "chinamap", id: 3, type: "map" },
                { name: "chart2", id: 4, type: "chart" },
                { name: "chart3", id: 5, type: "chart" },
                { name: "chart6", id: 6, type: "chart" },
                { name: "chart1", id: 7, type: "chart" },
            ],
            scroll: {
                y: true,
            },
            panelOverflow: {
                visible: 'all'
            },
            panel: {
                enable: true,
                default: {
                    headHeight: 40,
                    gutter: 10,
                },
                custom: [{
                    panels: 1,
                    headHeight: '100%',
                }, {
                    panels: [2, 3],
                }]
            },
            style: {
                container: 'mobiletitle',
                custom: [{
                    panels: [4, 5, 6, 7],
                    panel: {
                        padding: '5px'
                    },
                    head: 'badge',
                }]
            }
        },
    }
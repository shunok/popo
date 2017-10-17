describe('PoPo', function () {

    var test = null,
        container = P.create('div', null, {
            width: '1000px',
            height: '500px'
        }, document.body);

    describe('Global', function () {
        it('init', function () {
            test = P.init({
                container: container,
                layout: {
                    rows: 3,
                    cols: 4
                }
            });

            expect(test.options.rows).eql(12);
        });

        it('getInstanceByDom', function () {
            expect(P.getInstanceByDom(container)).eql(test);
        });

        it('dispose', function () {
            P.dispose(container);
            expect(test.options).eql(null);
        });

        it('validateLayoutExp', function () {
            var rowOkLys = [[
                [1, [4, 6, 14]],
                [11, [[4, [4, 4, 4]], [5, [2, [2, [12, 6, 6]], 4, 4]], [15, [9, [3, [8, 8, 8]]]],]]
            ],
            [
                [1, [8, 7, 4, 5]],
                [11, [
                    [7, [6, 3, 3]],
                    [11, [7, [4, [12, 12]], 1]],
                    [2, [2, 2, 1, 4, 2, 1]],
                    [4, [2, 2, 1, 1, 2, 2, 2]]
                ]]
            ],
            [
                [1, [4, 16, 4]],
                [1, [4, 7, 7, 6]],
                [1, [10, 14]],
                [1, [6, 6, 6, 6]],
                [1, [4, 12, 8]],
                [1, [24]],
                [1, [6, 8, 10]],
                [1, [6, 8, 10]],
                [2, [6, 8, 10]],
                [1, [6, 8, 10]],
                [1, [6, 8, 10]],
            ],


            [[4, [8, 8, 8]], [4, [8, 8, 8]], [4, [8, 8, 8]]],
            [[2, [24]], [5, [8, 8, 8]], [5, [8, 8, 8]],],
            [[7, [12, 12]], [1, [24]], [4, [5, 5, 5, 5, 4]]],
            [[5, [11, 13]], [7, [24]]],
            [[3, [4, 6, 14]], [9, [[10, [6, 6]], 14]]],
            [[2, [[24, [8, 4]]]], [5, [6, 12, 6]], [1, [24]], [3, [6, 6, 6, 6]], [1, [24]]],
            [[1], [11, [[4, [4, 4, 4]], [4, [2, 2, 2, 2, 4]], 4, 4, 8]]],
            [[1, [3, 15, 3, 3]], [3, [4, 12, 4, 4]], [3, [4, 4, 4, 12]], [4, [4, 12, 4, 4]], [1, [4, 12, 4, 4]]],

            ];
            var rowWrongLys = [
                [[2, [24]], [11, [[5, [4, 4, 4]], [14, [[5, [7, 10, 7]], 3, 4]], [5, [4, 4, 4]]]]],
                [[1, [3, 15, 3, 3]], [3, [4, 12, 4, 4]], [3, [4, 4, 8, 12]], [4, [4, 12, 4, 4]], [1, [4, 12, 4, 4]]],
            ]


            var colOkLys = [
                [[4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
                [[4], [4], [4], [4, [6, 6]], [4, [12]], [4, [10, [2, [12, 12]]]],],
                // wrong
            ];

            var colWrongLys = [
                [[4, [4, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
                [[4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [6, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
                [[4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, [3, [18, 3, 4, 5]]]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
            ];

            rowOkLys.forEach(function (ly) {
                expect(P.validateLayoutExp(ly, 12, 24, 'row')).eql(true);
                expect(P.validateLayoutExp(ly, 24, 12, 'col')).eql(true);
            });

            rowWrongLys.forEach(function (ly) {
                expect(P.validateLayoutExp(ly, 12, 24, 'row')).eql(false);
                expect(P.validateLayoutExp(ly, 24, 12, 'col')).eql(false);
            });

            colOkLys.forEach(function (ly) {
                expect(P.validateLayoutExp(ly, 24, 12, 'row')).eql(true);
                expect(P.validateLayoutExp(ly, 12, 24, 'col')).eql(true);
            });

            colWrongLys.forEach(function (ly) {
                expect(P.validateLayoutExp(ly, 24, 12, 'row')).eql(false);
                expect(P.validateLayoutExp(ly, 12, 24, 'col')).eql(false);
            });
        });
    });

    describe('Instance', function () {

        var st = null;

        before(function () {
            test = P.init({
                container: container,
                layout: {
                    rows: 3,
                    cols: 4
                },
                panel: {
                    enable: true,
                    custom: [{
                        panels: [1, 2],
                        headHeight: 40
                    }, {
                        panels: [3],
                        leftWidth: 40,
                        rightWidth: 40
                    }, {
                        panels: [4],
                        footHeight: 40
                    },]
                },
                style: {
                    container: 'popo-hello'
                },
                alias: [{
                    name: 'hey',
                    id: 2
                }, {
                    name: 'haha',
                    id: 13
                }]
            });
        });

        it('getOption', function () {
            expect(test.getOption().rows).eql(12);
        });

        it('getPanelCount', function () {
            expect(test.getPanelCount()).eql(12);
        });

        it('getIds', function () {
            expect(test.getIds()).eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        });

        it('getAlias', function () {
            expect(test.getAlias()[0].name).eql('hey');
        });

        it('getAliasName', function () {
            expect(test.getAliasName()).eql(['hey', 'haha']);
        });

        it('$top', function () {
            expect(test.$top(1)).eql(5);
        });

        it('$left', function () {
            expect(test.$left(1)).eql(5);
        });

        it('$width', function () {
            expect(test.$width(1)).eql(240);
        });

        it('$height', function () {
            expect(Math.floor(test.$height(1))).eql(156);
        });

        it('get', function () {
            expect(test.get(1).id).eql(1);
            expect(test.get(1).panel).not.to.be.empty();
        });

        it('getAll', function () {
            expect(test.getAll().length).eql(12);
            expect(test.getAll()[0].id).eql(1);
        });

        it('getContainer', function () {
            expect(test.getContainer()).eql(container);
        });

        it('panel', function () {
            expect(test.panel(1)).eql(test.get(1).panel);
        });

        it('center', function () {
            expect(test.center(1)).to.be.ok();
            expect(test.center(1)).eql(test.get(1).center);
        });

        it('head', function () {
            expect(test.head(3)).eql(null);
            expect(P.Util.isDOM(test.head(1))).eql(true);
            expect(test.head(1)).eql(test.get(1).head);
        });

        it('left', function () {
            expect(P.Util.isDOM(test.left(3))).eql(true);
            expect(test.left(3)).eql(test.get(3).left);
        });

        it('right', function () {
            expect(P.Util.isDOM(test.right(3))).eql(true);
            expect(test.right(3)).eql(test.get(3).right);
        });


        it('foot', function () {
            expect(P.Util.isDOM(test.foot(3))).eql(false);
            expect(P.Util.isDOM(test.foot(4))).eql(true);
            expect(test.foot(4)).eql(test.get(4).foot);
        });

        it('addTo', function () {
            st = P.init({}).addTo(test.panel(1));
            expect(P.getInstanceByDom(test.panel(1))).eql(st);
        });

        it('update', function () {
            test.update({
                panels: [2],
                width: 200,
                height: 200,
                left: 100,
                top: 50,
                zIndex: 100
            });

            var target = test.get(2);
            expect(target.size.width).eql(200);
            expect(target.size.height).eql(200);
            expect(target.position.left).eql(100);
            expect(target.position.top).eql(50);
            expect(target.position.zIndex).eql(100);
        });

        it('restore', function () {
            test.restore({
                panels: 2,
                position: false
            });

            expect(test.get(2).size.width).eql(240);
            expect(test.get(2).position.left).eql(100);
            expect(test.get(2).position.zIndex).eql(1);

            test.restore({
                panels: 2
            })

            expect(test.get(2).position.left).not.to.eql(100);

        });

        it('remove', function () {
            expect(test.get(2)).to.be.ok();
            test.remove(2);
            expect(test.get(2)).eql(null);
        });

        it('setStyle', function () {
            expect(test.style.container).eql('popo-hello');   
            test.setStyle({
                container: 'popo-news',
                custom: [{
                    panels: [1, 3],
                    panel: 'popo-news-panel',
                }]
            });
            
            expect(test.style.container).eql('popo-news');
            expect(P.DomUtil.getClass(test.getContainer())).eql('popo-news');
            expect(P.Util.isDOM(P.DomUtil.query(test.getContainer(), '.popo-news-panel'))).eql(true);
        });

        it('updateStyle', function () {
            test.updateStyle({
                container: 'popo-hey',
                custom: [{
                    panels: [2],
                    classname: 'popo-news-panel2'
                }, {
                    panels: 3,
                    classname: 'popo-news-3'
                }]
            });

            expect(test.style.container).eql('popo-hey');
            expect(P.DomUtil.getClass(test.getContainer())).eql('popo-hey');
        });

        it('removeStyle', function () {
            test.removeStyle();
            expect(test.style).eql(null);
            expect(P.DomUtil.getClass(test.getContainer())).eql('');
        });

        it('hide', function () {
            test.hide(1);
            expect(P.DomUtil.isHidden(test.panel(1))).eql(true);
            test.hide();
            expect(P.DomUtil.isHidden(test.getContainer())).eql(true);
        });

        it('show', function () {
            test.show();
            expect(P.DomUtil.isHidden(test.getContainer())).eql(false);
            test.show(1);
            expect(P.DomUtil.isHidden(test.panel(1))).eql(false);
        });

        it('each', function () {
            test.each(function (elements) {
                expect(elements).to.be.ok();
            });
        });

        it('full', function () {
            test.full(4);
            expect(test.get(4).size.width).eql(1000);
        });

        it('unFull', function () {
            test.unFull();
            expect(test.get(4).size.width).eql(240);
        });

        it('addPanle', function () {
            test.addPanel({
                size: {
                    width: 200,
                    height: 100
                },
                position: {
                    left: 50,
                    top: 50
                },
                id: 'hello',
                layout: {
                    headHeight: 40
                }
            });

            expect(test.get(13).size.width).eql(200);
            expect(test.get(13).position.top).eql(50);
        });

        it('setPanelLayout', function () {
            test.setPanelLayout({
                panels: 'haha',
                headHeight: 80
            });

            expect(test.$height(test.head(13))).eql(80);
        });

        it('clearPanel', function () {
            test.clearPanel('haha');
            expect(test.head('haha')).eql(null);
        });

        it('clearAllPanel', function () {
            test.clearAllPanel();
            test.each(function (elements) {
                expect(elements.center).eql(null);
            });
        });

    });

    after(function () {
        test.remove();
        test = null;
        document.body.removeChild(container);
    })

});

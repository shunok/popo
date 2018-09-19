describe('Util', function () {

    var Util = P.Util;

    it('stmap ', function () {
        var obj = {},
            id = Util.stamp(obj);

        expect(typeof id).to.eql('number');
        expect(Util.stamp(obj)).to.eql(id);

        var obj2 = {},
            id2 = P.Util.stamp(obj2);

        expect(id2).not.to.eql(id);
    });

    it('bind', function () {
        var fn = function () {
            return this;
        };

        var fn2 = Util.bind(fn, { foo: 'bar' });

        expect(fn2()).to.eql({ foo: 'bar' });

        var fn = sinon.spy(),
            foo = {},
            a = {},
            b = {},
            c = {};

        var fn2 = Util.bind(fn, foo, a, b);

        fn2(c);

        expect(fn.calledWith(a, b, c)).to.be.ok();
    });

    it('extend', function () {
        var a = {
            foo: 5,
            bar: 'asd'
        };

        Util.extend(a, {
            bar: 7,
            baz: 3
        });

        expect(a).to.eql({
            foo: 5,
            bar: 7,
            baz: 3
        });

        Util.extend(a, { bar: 7 }, { baz: 3 });

        expect(a).to.eql({
            foo: 5,
            bar: 7,
            baz: 3
        });

    });

    it('legalNumber', function () {
        expect(Util.legalNumber(2, 1, 3)).to.eql(2);
        expect(Util.legalNumber(0, 1, 3)).to.eql(1);
        expect(Util.legalNumber(4, 1, 3)).to.eql(3);
    });

    it('formatNum', function () {
        expect(Util.formatNum(13.12325555, 3)).to.eql(13.123);
        expect(Util.formatNum(13.12325555)).to.eql(13.12326);
    });

    it('trim', function () {
        expect(Util.trim(' 12')).to.eql('12');
        expect(Util.trim('12 ')).to.eql('12');
    });

    it('splitWords', function () {
        expect(Util.splitWords('foo bar baz')).to.eql(['foo', 'bar', 'baz']);
    });

    it('isArray', function () {
        expect(Util.isArray([1, 2, 3])).to.be(true);
        expect(Util.isArray(new Array(1, 2, 3))).to.be(true);
        expect(Util.isArray('blabla')).to.be(false);
        expect(Util.isArray({ 0: 1, 1: 2 })).to.be(false);
    });

    it('isNumber', function () {
        expect(Util.isNumber(0)).to.be(true);
        expect(Util.isNumber(-1)).to.be(true);
        expect(Util.isNumber('blabla')).to.be(false);
        expect(Util.isNumber({ 0: 1, 1: 2 })).to.be(false);
        expect(Util.isNumber(null)).to.be(false);
        expect(Util.isNumber(undefined)).to.be(false);
        expect(Util.isNumber([])).to.be(false);
    });

    it('isString', function () {
        expect(Util.isString(0)).to.be(false);
        expect(Util.isString(-1)).to.be(false);
        expect(Util.isString('blabla')).to.be(true);
        expect(Util.isString('')).to.be(true);
        expect(Util.isString({ 0: 1, 1: 2 })).to.be(false);
        expect(Util.isString(null)).to.be(false);
        expect(Util.isString(undefined)).to.be(false);
        expect(Util.isString([])).to.be(false);
    });

    it('isObject', function () {
        expect(Util.isObject(0)).to.be(false);
        expect(Util.isObject(-1)).to.be(false);
        expect(Util.isObject('blabla')).to.be(false);
        expect(Util.isObject('')).to.be(false);
        expect(Util.isObject({ 0: 1, 1: 2 })).to.be(true);
        expect(Util.isObject(null)).to.be(false);
        expect(Util.isObject(undefined)).to.be(false);
        expect(Util.isObject([])).to.be(false);
    });

    it('isEmptyObject', function () {
        expect(Util.isEmptyObject(0)).to.be(false);
        expect(Util.isEmptyObject(-1)).to.be(false);
        expect(Util.isEmptyObject('blabla')).to.be(false);
        expect(Util.isEmptyObject('')).to.be(false);
        expect(Util.isEmptyObject({ 0: 1, 1: 2 })).to.be(false);
        expect(Util.isEmptyObject({})).to.be(true);
        expect(Util.isEmptyObject(null)).to.be(false);
        expect(Util.isEmptyObject(undefined)).to.be(false);
        expect(Util.isEmptyObject([])).to.be(false);
    });

    it('mixin', function () {
        var obj = { a: 1 },
            source = { b: 3, a: 2 };
        expect(Util.mixin(obj, source)).eql({
            a: 2,
            b: 3
        });

        expect(Util.mixin(obj, { b: [1, 2] })).eql({
            a: 2,
            b: [1, 2]
        });

        expect(Util.mixin(obj, { b: null })).eql({
            a: 2,
            b: null
        });
    });

    it('mixins', function () {
        var obj = { a: 1 },
            source = [{ b: 3, a: 2 }, { c: 0 }, { b: [] }];
        expect(Util.mixins(obj, source)).eql({
            a: 2,
            c: 0,
            b: []
        });
    });

    it('getObjectFromArray', function () {
        var arr = [{
            k: 12,
            c: 1
        }, { k: 5 }, { o: 3 }, { k: { k: 1 } }];

        expect(Util.getObjectFromArray(arr, 'k', 5)).eql({ k: 5 });
        expect(Util.getObjectFromArray(arr, 'k', 1)).eql(undefined);
    });

    it('removeObjectFromArray', function () {
        var arr = [{ k: 12, c: 1 }, { k: 5 }, { o: 3 }, { k: { k: 1 } }];

        expect(Util.removeObjectFromArray(arr, 'k', 5)).eql([{ k: 5 }]);
        expect(arr).eql([{ k: 12, c: 1 }, { o: 3 }, { k: { k: 1 } }]);
        expect(Util.removeObjectFromArray(arr, 'k', 5)).eql([]);
    });

    it('get && isDOM', function () {
        var dom = document.createElement('div');
        dom.id = 'mocha';
        document.body.appendChild(dom);
        var mocha = Util.get('mocha');
        expect(Util.isDOM(mocha)).to.be(true);
    });

    it('merge', function () {
        var obj = { a: 1, b: 2, c: { a: 1, b: { b: 1 } } };
        var c = function () { };
        obj.d = c;
        expect(Util.merge(obj, { c: { a: 5, b: 6 } })).eql({
            a: 1,
            b: 2,
            c: { a: 5, b: 6 },
            d: c,
        })
    });

    it('getPercentage', function () {
        expect(Util.getPercentage(0.1)).eql(10);
        expect(Util.getPercentage(10)).eql(100);
        expect(Util.getPercentage(-1)).eql(0);
    });

    it('reverseCamelcase', function () {
        expect(Util.reverseCamelcase('popoTestATest')).eql('popo-test-a-test');
        expect(Util.reverseCamelcase('popo')).eql('popo');
        expect(Util.reverseCamelcase('po-po')).eql('po-po');
    });

    it('unique', function () {
        expect(Util.unique([1, 5, 1, 2, 3, 4, 3, 5]).length).eql(5);
    });

    it('firstUpperCase', function () {
        expect(Util.firstUpperCase('abc')).eql('Abc');
    });

    it('contain', function () {
        expect(Util.contain([1, 2, 3], 2)).eql(1);
        expect(Util.contain([1, 2, 3], 4)).eql(-1);
    });

    it('throttle', function (done) {
        var spy = sinon.spy();

        var fn = Util.throttle(spy, 20);

        fn();
        fn();
        fn();

        expect(spy.callCount).to.eql(1);

        setTimeout(function () {
            expect(spy.callCount).to.eql(2);
            done();
        }, 30);
    });

    it('formatNumber', function () {
        expect(Util.formatNumber(3)).eql(3);
        expect(Util.formatNumber(0.1)).eql(0.1);
        expect(Util.formatNumber('10%')).eql(0.1);
        expect(Util.formatNumber('10.5%')).eql(0.105);
    });

    it('multiplyBy', function () {
        expect(Util.multiplyBy(0)).eql(0);
        expect(Util.multiplyBy(0.5, 10)).eql(5);
        expect(Util.multiplyBy(5, 10)).eql(5);
    });

    it('formatMargin', function () {
        expect(Util.formatMargin(10)).eql({ top: 10, left: 10, right: 10, bottom: 10 })
        expect(Util.formatMargin('10')).eql({ top: 10, left: 10, right: 10, bottom: 10 })
        expect(Util.formatMargin('10 10')).eql({ top: 10, left: 10, right: 10, bottom: 10 })
        expect(Util.formatMargin('10 10 0 10')).eql({ top: 10, left: 10, right: 10, bottom: 0 })
    });

    it('getPureValue', function () {
        expect(Util.getPureValue('10px')).eql(10);
        expect(Util.getPureValue('10')).eql(10);
    });

    // it('validateAllLy', function () {

    //     var rowOkLys = [[
    //         [1, [4, 6, 14]],
    //         [11, [[4, [4, 4, 4]], [5, [2, [2, [12, 6, 6]], 4, 4]], [15, [9, [3, [8, 8, 8]]]],]]
    //     ],
    //     [
    //         [1, [8, 7, 4, 5]],
    //         [11, [
    //             [7, [6, 3, 3]],
    //             [11, [7, [4, [12, 12]], 1]],
    //             [2, [2, 2, 1, 4, 2, 1]],
    //             [4, [2, 2, 1, 1, 2, 2, 2]]
    //         ]]
    //     ],
    //     [
    //         [1, [4, 16, 4]],
    //         [1, [4, 7, 7, 6]],
    //         [1, [10, 14]],
    //         [1, [6, 6, 6, 6]],
    //         [1, [4, 12, 8]],
    //         [1, [24]],
    //         [1, [6, 8, 10]],
    //         [1, [6, 8, 10]],
    //         [2, [6, 8, 10]],
    //         [1, [6, 8, 10]],
    //         [1, [6, 8, 10]],
    //     ],

    //     [[4, [8, 8, 8]], [4, [8, 8, 8]], [4, [8, 8, 8]]],
    //     [[2, [24]], [5, [8, 8, 8]], [5, [8, 8, 8]],],
    //     [[7, [12, 12]], [1, [24]], [4, [5, 5, 5, 5, 4]]],
    //     [[5, [11, 13]], [7, [24]]],
    //     [[3, [4, 6, 14]], [9, [[10, [6, 6]], 14]]],
    //     [[2, [[24, [8, 4]]]], [5, [6, 12, 6]], [1, [24]], [3, [6, 6, 6, 6]], [1, [24]]],
    //     [[1], [11, [[4, [4, 4, 4]], [4, [2, 2, 2, 2, 4]], 4, 4, 8]]],
    //     [[1, [3, 15, 3, 3]], [3, [4, 12, 4, 4]], [3, [4, 4, 4, 12]], [4, [4, 12, 4, 4]], [1, [4, 12, 4, 4]]],

    //     ];
    //     var rowWrongLys = [
    //         [[2, [24]], [11, [[5, [4, 4, 4]], [14, [[5, [7, 10, 7]], 3, 4]], [5, [4, 4, 4]]]]],
    //         [[1, [3, 15, 3, 3]], [3, [4, 12, 4, 4]], [3, [4, 4, 8, 12]], [4, [4, 12, 4, 4]], [1, [4, 12, 4, 4]]],
    //     ]

    //     var colOkLys = [
    //         [[4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
    //         [[4], [4], [4], [4, [6, 6]], [4, [12]], [4, [10, [2, [12, 12]]]],],
    //         // wrong
    //     ];

    //     var colWrongLys = [
    //         [[4, [4, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
    //         [[4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [6, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
    //         [[4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, [3, [18, 3, 4, 5]]]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]], [4, [3, 3, 3, 3]],],
    //     ];

    //     rowOkLys.forEach(function (ly) {
    //         expect(Util.validateAllLy(ly, 12, 24, 'row')).eql(true);
    //         expect(Util.validateAllLy(ly, 24, 12, 'col')).eql(true);
    //     });

    //     rowWrongLys.forEach(function (ly) {
    //         expect(Util.validateAllLy(ly, 12, 24, 'row')).eql(false);
    //         expect(Util.validateAllLy(ly, 24, 12, 'col')).eql(false);
    //     });

    //     colOkLys.forEach(function (ly) {
    //         expect(Util.validateAllLy(ly, 24, 12, 'row')).eql(true);
    //         expect(Util.validateAllLy(ly, 12, 24, 'col')).eql(true);
    //     });

    //     colWrongLys.forEach(function (ly) {
    //         expect(Util.validateAllLy(ly, 24, 12, 'row')).eql(false);
    //         expect(Util.validateAllLy(ly, 12, 24, 'col')).eql(false);
    //     });

    // });

});
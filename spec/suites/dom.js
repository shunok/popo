describe('Dom', function () {

    var DomUtil = P.DomUtil,
        Util = P.Util,
        testDom = null;

    it('create', function () {
        testDom = DomUtil.create('div', 'testdom testdom2', {
            width: "600px",
            height: "500px"
        }, document.body);
        expect(Util.isDOM(testDom)).eql(true);
    });

    it("getClass", function () {
        expect(DomUtil.getClass(testDom)).eql('testdom testdom2');
    });

    it("hasClass", function () {
        expect(DomUtil.hasClass(testDom, 'testdom')).eql(true);
    });

    it("setClass", function () {
        DomUtil.setClass(testDom, 'testdom');
        expect(DomUtil.getClass(testDom)).eql('testdom');
    });

    it('addClass', function () {
        DomUtil.addClass(testDom, 'testdom2');
        expect(DomUtil.getClass(testDom)).eql('testdom testdom2');
    });

    it('removeClass', function () {
        DomUtil.removeClass(testDom, 'testdom2');
        expect(DomUtil.getClass(testDom)).eql('testdom');
    });

    it('getStyle', function () {
        expect(DomUtil.getStyle(testDom, 'width')).eql('600px');
    });

    it('setStyle', function () {
        DomUtil.setStyle(testDom, {
            width: '520px'
        });
        expect(DomUtil.getStyle(testDom, 'width')).eql('520px');
    });

    
    it('getPureStyle', function () {
        expect(DomUtil.getPureStyle(testDom, 'width')).eql(520);
    });

    it('getRect', function () {
        expect(DomUtil.getRect(testDom).width).eql(520);
    });

    it('css', function() {
        DomUtil.css(testDom, {
            width: '540px'
        });
        expect(DomUtil.getStyle(testDom, 'width')).eql('540px');
        expect(DomUtil.css(testDom, 'width')).eql('540px');
    }); 

    it('attr', function () {
        testDom.setAttribute('data-popo', 1);
        expect(DomUtil.attr(testDom, 'data-popo')).eql(1);
        expect(DomUtil.attr(testDom, 'data-popo2')).eql(null);
        DomUtil.attr(testDom, 'data-popo', 2);
        expect(DomUtil.attr(testDom, 'data-popo')).eql(2);
        DomUtil.attr(testDom, 'data-popo-role', 'panel');
        expect(DomUtil.attr(testDom, 'data-popo-role')).eql('panel');
    });

    it('eachChild', function () {
        var i = 1,
            len = 4;
        for (; i < len; i++) {
            DomUtil.create('span', 'pospan' + i, null, testDom);
        }
        i = 1;
        DomUtil.eachChild(testDom, function(el) {
            expect(DomUtil.getClass(el)).eql('pospan' + (i++));
        });
    });

    it('query', function() {
        expect(DomUtil.query(testDom, '.testdom .pospan1')).to.be.ok();
    });

    it('removeByClass', function() {
        DomUtil.removeByClass('pospan1', testDom);
        expect(DomUtil.query(testDom, '.testdom .pospan1')).eql(null);
    });

    it('isHidden', function() {
        expect(DomUtil.isHidden(testDom)).eql(true);
    });

    it('removeByRole', function() {
        DomUtil.removeByRole('panel', document.body);
        expect(DomUtil.query(document.body, '.testdom')).eql(null);
    });

    after(function() {
        testDom = null;
    });
});
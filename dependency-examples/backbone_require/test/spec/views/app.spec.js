/**
 * Specs für die AppView
 */
define('AppViewSpec', [
    'jquery',
    'backbone',
    'collections/todos',
    'views/app'
], function ($, Backbone, Todos, AppView) {
    'use strict';

    describe('AppView', function () {

        before(function () {
            this.view = new AppView();
        });

        it('should extend Backbone.View', function () {
            expect(this.view instanceof Backbone.View).to.equal(true);
        });

        it('should bind to the #todoapp Element', function () {
            expect(this.view.el.nodeName).to.equal('SECTION');
            expect($(this.view.el).attr('id')).to.equal('todoapp');
        });

//        it('should fetch some Todos on init', function () {
//            var spy = sinon.spy();
//
//            Todos.on('reset', spy);
//
//            new AppView();
//
//            expect(spy.called).to.equal(true);
//        });

        it('should render on the "all" event of the Todos collection', function () {
            // sinon.stub(this.view, "render");
            // sinon.spy(this.view, "render");

            // TODO hook into this.view.render ?
//            var called = false,
//                render = this.view.render;
//
//            this.view.render = function () {
//                called = true;
//                alert("OK")
//            };
//
//             Todos.trigger('all');
//            // this.view.render()
//
//            expect(called).to.equal(true);

//            log(this.view.render.calledOnce)
//            expect(this.view.render.calledOnce).to.equal(true);
//
//            var args = this.view.render.getCall(0).args;
//            log(args);
        });

    });
});
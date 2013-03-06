/**
 * Specs für die TodoView
 */
define('TodoViewSpec', [
    'jquery',
    'underscore',
    'backbone',
    'models/todo',
    'views/todos'
], function ($, _, Backbone, Todo, TodoView) {
    'use strict';

    describe('TodoView', function () {

        before(function () {
            this.todoModel = new Todo({
                title    : 'write tests',
                completed: true
            });

            // die TodoView bekommt ein Model injiziert
            this.view = new TodoView({
                model: this.todoModel
            });
        });

        after(function () {
            this.view.remove();
        });

        it('should extend Backbone.View', function () {
            expect(this.view instanceof Backbone.View).to.equal(true);
        });

        it('should create a list element', function () {
            expect(this.view.el.nodeName).to.equal('LI');
        });

        it('should be backed by a model instance, which provides the data to display', function () {
            expect(_.isUndefined(this.view.model)).to.equal(false);
            expect(this.view.model.get('completed')).to.equal(true);
        });

        describe('rendering', function () {
            beforeEach(function () {

            });

            it('returns the view object', function () {
                var v = this.view.render();
                expect(v instanceof Backbone.View).to.equal(true);
                expect(v).to.equal(this.view);
            });

            it('produces the correct HTML', function () {
                this.view.render();

                // überprüfe das generierte Markup
                var html = $(this.view.el.innerHTML);
                expect(html.find('.toggle').length).to.equal(1);
            });

            // TODO
//            it('should render itself if the model changes', function () {
//                var spy = sinon.spy(this.view, 'render');
//
//                // hmm should trigger render() ?
//                // tut es auch !!!!! hmmmm
//                this.todoModel.set({completed: true});
//
//                // hmm ugly?
////                this.view.render();
//                expect(spy.called).to.equal(true);
//            });
        });
    });
});
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

    });
});
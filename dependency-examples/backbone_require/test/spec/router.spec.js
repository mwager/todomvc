/**
 * Tests für AppRouter und evtl. SubRouter
 */
define('AppRouterSpec', [
    'backbone',
    'views/app',
    'routers/router'
], function (Backbone, AppView, Workspace) {
    'use strict';

    describe('AppRouter', function () {

        before(function () {
            this.router = new Workspace();
        });

        it('should extend Backbone.Router', function () {
            expect(this.router instanceof Backbone.Router).to.equal(true);
        });

        it('should extend Backbone.Events', function () {
            var spy = sinon.spy();

            this.router.on('foo', spy);
            this.router.trigger('foo');

            // Wurde spy mind. einmal aufgerufen?
            expect(spy.called).to.equal(true);
        });

        describe('routing', function () {
            beforeEach(function () {
                this.router = new Workspace();
                this.routeSpy = sinon.spy();
                try {
                    Backbone.history.start({
                        silent   : true,
                        pushState: false
                    });
                } catch (e) {
                }

                // Initialize the application view
                new AppView();

                this.router.navigate('elsewhere');
            });

            it('should fire the "all" event while navigating around', function () {
                this.router.on('all', this.routeSpy);
                this.router.navigate('active', {trigger: true});
                expect(this.routeSpy.called).to.equal(true);
            });
        });
    });
});

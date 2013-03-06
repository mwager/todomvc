/**
 * Specs für Todo-Model und -Collection
 *
 * Einige der Techniken von hier:
 *  http://tinnedfruit.com/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html
 */
define('TodoSpec', function (require) {
    'use strict';

    // module dependencies
    // 'simplified CommonJS wrapping'
    // http://requirejs.org/docs/whyamd.html
    // weniger fehleranfällig, besser lesbar...
    var jQuery = require('jquery'),
        Backbone = require('backbone'),
        Todo = require('models/todo'),
        Todos = require('collections/todos'),
        testTitle = 'write tests';


    // muss sein weil sich evtl noch Todos im localStorage befinden
    localStorage.clear();


    describe('Todos', function () {

        describe('Model::Todo', function () {

            beforeEach(function () {
                this.todo = new Todo({
                    title: testTitle
                });

                // ein model muss ein urlRoot Property besitzen
                // wenn es mit einem Backend synchronisiert werden will
                // Wird hier zu demozwecken zur Laufzeit verändert, sonst
                // meckert Backbone...
                this.todo.urlRoot = '/todos';
            });

            describe('Common stuff', function () {

                it('should extend Backbone.Model', function () {
                    expect(this.todo instanceof Backbone.Model).to.equal(true);
                });

                it('should expose an attribute', function () {
                    expect(this.todo.get('title')).to.equal(testTitle);
                });

                it('should not be completed by default', function () {
                    expect(this.todo.get('completed')).to.equal(false);
                });

                it('should fire events', function () {
                    var spy = sinon.spy();
                    this.todo.on('change', spy);
                    this.todo.set('title', 'write more tests');
                    expect(spy.called).to.equal(true);
                });

                it('should validate attributes', function (done) {
                    var spy = sinon.spy();

                    this.todo.on('error', spy);
                    this.todo.on('error', function (model, error) {
                        expect(spy.called).to.equal(true);

                        // nur ein Beispiel, fixe Werte sollten möglichst gemieden werden!
                        expect(error).to.equal('title cannot be empty');
                        done();

                    });

                    // löse den fehler in validate() aus
                    this.todo.set({title: ''}, {validate: true});
                });
            });

            describe('Basic CRUD stuff', function () {

                beforeEach(function () {
                    // Initialisiere einen fake server
                    // Somit können wir hier steuern wie auf bestimmte AJAX
                    // Anfrage reagiert, also was zurückgegeben
                    // werden soll. Statuscode und Body im JSON Format
                    this.server = sinon.fakeServer.create();

                    this.server.respondWith('GET', '/todos/123',
                        [200, {'Content-Type': 'application/json'}, // 200 success
                         '{"id":123,"title":"' + testTitle + '","completed":false}']);

                    this.server.respondWith('POST', '/todos',
                        [201, {'Content-Type': 'application/json'}, // 201 created
                         '{"id":777,"title":"' + testTitle + '","completed":false}']);

                    // hmm hier ohne :id !?
                    this.server.respondWith('PUT', '/todos/777',
                        [204, {'Content-Type': 'application/json'},
                         '']); // 204 success, no content

                    this.server.respondWith('DELETE', '/todos/777',
                        [204, {'Content-Type': 'application/json'},
                         '']); // 204 success, no content
                });

                afterEach(function () {
                    this.server.restore();
                });

                it('should make the correct server request', function () {
                    // Spy auf jQuery's ajax
                    var spy = sinon.spy(jQuery, 'ajax');

                    this.todo.set({id: 123});

                    // Das Model speichern bedeutet POST oder PUT
                    // abhängig von model.isNew() bzw dem Vorhandensein
                    // einer id
                    this.todo.save();

                    // Spy wurde aufgerufen
                    expect(spy.called).to.equal(true);

                    // URL muss die id des todos enthalten haben
                    expect(spy.getCall(0).args[0].url).to.equal('/todos/123');

                    jQuery.ajax.restore();
                });

                it('should read using GET', function () {
                    var spy = sinon.spy();

                    this.todo.set({id: 123});

                    // binde an das "sync" event
                    this.todo.on('sync', spy);

                    // dies würde ein ajax request an den server sein
                    this.todo.fetch();

                    // log(this.todo.url()) // now "/todos/123"

                    // wir können anhand des server objekts informationen
                    // über die requests abfragen
                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal('GET');
                    expect(this.server.requests[0].url).to.equal('/todos/123');

                    // Fake server responds to the request
                    this.server.respond();

                    // Expect that the spy was called with the new model
                    expect(spy.called).to.equal(true);
                    expect(spy.getCall(0).args[0].attributes.id).to.equal(123);
                    expect(spy.getCall(0).args[0].attributes.title)
                        .to.equal(testTitle);
                });

                it('should create using POST', function (done) {
                    var self = this,
                        spy = sinon.spy();

                    expect(this.todo.isNew()).to.equal(true);

                    this.todo.on('change', spy);

                    this.todo.save(null, {
                        success: function (model) {
                            expect(spy.called).to.equal(true);

                            expect(model.get('id')).to.equal(777);
                            expect(model.get('title')).to.equal(testTitle);

                            // jetzt haben wir eine ID
                            expect(self.todo.get('id')).to.equal(777);
                            expect(self.todo.isNew()).to.equal(false);

                            done();
                        }
                    });

                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal('POST');
                    expect(this.server.requests[0].url).to.equal('/todos');

                    this.server.respond();
                });

                it('should update using PUT', function (done) {
                    this.todo.set('id', 777);
                    this.todo.set({title: 'edited'});

                    expect(this.todo.isNew()).to.equal(false);

                    this.todo.save(null, {
                        success: function (model) {
                            expect(model.get('title')).to.equal('edited');
                            done();
                        }
                    });

                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal('PUT');
                    expect(this.server.requests[0].url).to.equal('/todos/777');

                    this.server.respond();
                });

                it('should delete using DELETE', function (done) {
                    this.todo.set('id', 777);

                    this.todo.destroy({
                        success: function (model/*, json*/) {
                            expect(model.get('title')).to.equal(testTitle);

                            // man kann auch basierend auf json-rückgaben testen:
                            // expect(json.success).to.equal(true);
                            done();
                        }
                    });

                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal('DELETE');
                    expect(this.server.requests[0].url).to.equal('/todos/777');

                    this.server.respond();
                });
            });
        });

        describe('Collection::Todos', function () {

            describe('Common stuff', function () {

                beforeEach(function () {
                    this.todos = Todos;
                    this.todos.reset();
                });

                it('should extend Backbone.Collection', function () {
                    expect(Todos instanceof Backbone.Collection).to.equal(true);
                });

                it('should have zero todos', function () {
                    expect(this.todos.toJSON().length).to.equal(0);
                });

                it('should extend Backbone.Events', function () {
                    expect(typeof this.todos.on).to.equal('function');
                    expect(typeof this.todos.off).to.equal('function');
                    expect(typeof this.todos.trigger).to.equal('function');
                });

                it('should extend underscore methods', function () {
                    expect(typeof this.todos.map).to.equal('function');
                });

                it('should return all completed todos', function () {
                    this.todos.add([
                        new Todo({title: 't1', completed: true}),
                        new Todo({title: 't2', completed: false})
                    ]);

                    expect(this.todos.completed().length).to.equal(1);
                    expect(this.todos.completed()[0].toJSON().title).to.equal('t1');
                });

                it('should return all remaining todos', function () {
                    this.todos.add([
                        new Todo({title: 't1', completed: true}),
                        new Todo({title: 't2', completed: false}),
                        new Todo({title: 't3', completed: false})
                    ]);

                    expect(this.todos.remaining().length).to.equal(2);
                    expect(this.todos.remaining()[0].toJSON().title).to.equal('t2');
                });
            });

            describe('Basic CRUD stuff', function () {

                beforeEach(function () {
                    // Könnten sich auch in JSON Datei befinden
                    this.fixtures = {
                        Todos: {
                            valid: { // response starts here
                                'status'  : 'OK',
                                'version' : '1.0',
                                'response': {
                                    'todos': [
                                        {
                                            'id'       : 1,
                                            'title'    : testTitle,
                                            'completed': false
                                        },
                                        {
                                            'id'       : 2,
                                            'title'    : 'buy milk',
                                            'completed': true
                                        }
                                    ]
                                }
                            }
                        }
                    };

                    this.fixture = this.fixtures.Todos.valid.response.todos;
                    this.server = sinon.fakeServer.create();

                    this.server.respondWith('GET', '/todos',
                        [200, {'Content-Type': 'application/json'}, // 200 success
                         JSON.stringify(this.fixture)
                        ]);

                    // Dies dient hier nur zu Demonstrationszwecken!
                    // Da die echte Collection localStorage zur Synchronisation
                    // verwendet, wir hier aber sinon's fake server auch in Verbindung
                    // mit Backbone Collections demonstrieren wollen, überschreiben
                    // wir temporär die Collection
                    var Todos = Backbone.Collection.extend({
                        url: '/todos'
                    });

                    this.todos = new Todos();
                });

                afterEach(function () {
                    this.server.restore();
                });

                it('should parse todos from the response', function (done) {
                    var self = this;

                    // AJAX Call: GET /todos
                    this.todos.fetch({
                        success: function (coll, json) {
                            expect(json.length).to.equal(self.fixture.length);
                            done();
                        }
                    });

                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal('GET');
                    expect(this.server.requests[0].url).to.equal('/todos');

                    this.server.respond();

                    expect(this.todos.length)
                        .to.equal(this.fixture.length);

                    expect(this.todos.get(1).get('title'))
                        .to.equal(this.fixture[0].title);
                });
            });
        });
    });
});
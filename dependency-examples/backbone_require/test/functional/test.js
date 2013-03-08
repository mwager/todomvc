/* global $:true */

/**
 * Democode für CasperJS
 *
 * Lokal muss ein Webserver laufen, die App also unter:
 *      http://localhost/todomvc/dependency-examples/backbone_require
 * erreichbar sein.
 *
 * Ausführen:
 * ----------
 *  $ cd path/to/dependency-examples/backbone_require
 *  $ casperjs test test/functional
 */

'use strict';

var casper = require('casper').create();
var URL = 'http://localhost/todomvc/dependency-examples/backbone_require/';

/**
 * Dise Funktion wird im Browser DOM Kontext ausgeführt.
 *
 * @see http://casperjs.org/api.html#casper.evaluate
 */
var addTodo = function (args) {
    var todoField = $('#new-todo');
    todoField.val(args.title).focus();
    var e = $.Event('keypress');
    e.which = 13; // ENTER
    todoField.trigger(e);
};

// ----- start -----

casper.start(URL, function () {
    // teste auf existierende DOM Elemente
    this.test.assertExists('#main', '#main exists');
});

casper.then(function () {
    this.evaluate(addTodo, {
        title: 'write functional tests',
        completed: false
    });
});

casper.run(function () {
    casper.capture('test/functional/screenshot_via_casperjs.png');
    this.echo('OK').exit();
});
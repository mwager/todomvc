// TODO
'use strict';

var casper = require('casper').create();
var URL = 'http://localhost/todomvc/dependency-examples/backbone_require/';

casper.start(URL, function () {
    this.test.assertExists('#main', '#main exists');

});

casper.run(function () {
    //casper.test.screenshot('test.png');
    // echo results in some pretty fashion
//    this.echo(links.length + ' links found:');
    this.echo('OK').exit();
});
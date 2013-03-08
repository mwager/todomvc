/**
 * Headless Functional Testing with Selenium and PhantomJS
 * -------------------------------------------------------
 * http://net.tutsplus.com/tutorials/javascript-ajax/headless-functional-testing-with-selenium-and-phantomjs
 *
 * 1. In anderem Terminal den Selenium Server starten, zB:
 *      $ java -jar selenium-server-standalone-2.31.0.jar
 *
 * 2. Dieses Skript ausführen:
 *      $ cd path/to/dependency-examples/backbone_require
 *      $ node test/functional/webdriverjs_test.js
 */
'use strict';

var URL = 'http://localhost/todomvc/dependency-examples/backbone_require/';

// Use webdriverjs to create a Selenium Client
var client = require('webdriverjs').remote({
    desiredCapabilities: {
        // You may choose other browsers
        // http://code.google.com/p/selenium/wiki/DesiredCapabilities
        // {phantomjs|android|chrome|firefox|htmlunit|
        // internet explorer|iPhone|iPad|opera}
        browserName: 'firefox'
    }
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    // logLevel           : 'silent'
});

client.init();

// ----- start -----

client.url(URL);
client.getTitle(function (title) {
    console.log('Title is', title);
});
client.saveScreenshot('test/functional/screenshot_via_webdriverjs.png', function () {
    console.log('Screenshot erstellt');
});
// client.setValue('#field', 'value');
// client.submitForm();
client.end();
/*global __app_config__:true, requirejs:true, mocha:true */

/**
 * Diese Datei ist verantwortlich für die Konfiguration von requirejs,
 * sowie das Starten aller Tests
 *
 * @author Michael Wager <mail@mwager.de>
 */
'use strict';

// globaler logging helper für die Tests
window.log = function () {
    if (!console) {
        return;
    }

    console.log.apply(console, arguments);
};

window.getTime = function() {
    return new Date().getTime();
};

window.start = window.getTime();

var conf = {
    urlArgs: 'v' + (new Date()).getTime(),

    baseUrl: '/js/', // absoluter Pfad für testem (läuft als node-app)

    // shim von main.js
    shim   : {
        underscore          : {
            exports: '_'
        },
        backbone            : {
            deps   : [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps   : ['backbone'],
            exports: 'Store'
        }
    }
};

// die folgenden Pfade sind relativ zur baseUrl
// 1. teste optimierte version des skripts?
if (__app_config__.browser && __app_config__.optimized) {
    conf.baseUrl = '../build/';
    conf.paths = {};
}
// 2. oder direkt browser nicht-optimiert:
else if ((__app_config__.browser && !__app_config__.optimized)) {
    conf.baseUrl = '../js/'; // relativ zum test-Verzeichnis
    // paths von main.js
    conf.paths = {
        jquery              : '../../../assets/jquery.min',
        underscore          : '../../../assets/lodash.min',
        backbone            : 'lib/backbone/backbone',
        backboneLocalstorage: 'lib/backbone/backbone.localStorage',
        text                : 'lib/require/text'
    };
}
// 3. via testem
else if (__app_config__.testem) {
    // paths von main.js
    conf.paths = {
        jquery              : '../test/lib/assets/jquery.min',
        underscore          : '../test/lib/assets/lodash.min',
        backbone            : 'lib/backbone/backbone',
        backboneLocalstorage: 'lib/backbone/backbone.localStorage',
        text                : 'lib/require/text'
    };
}
conf.paths.chai = '../test/lib/chai';

// ----- specs -----
conf.paths.TodoSpec = '../test/spec/todo.spec';
conf.paths.AppRouterSpec = '../test/spec/router.spec';
conf.paths.AppViewSpec = '../test/spec/views/app.spec';
conf.paths.TodoViewSpec = '../test/spec/views/todo.spec';



requirejs.config(conf);

require(['require', 'chai'], function (require, chai) {

    // chai.use(chaiSpies);

    // window.expect = chai.expect;
    // window.should = chai.should();
    window.chai = chai;

    var assertion_counter = 0;

    // hook into assertion methods...
    window.expect = function (a) {
        assertion_counter++;
        return chai.expect(a);
    };

    // hmmm... XXX better way
    window.should = function () {
        assertion_counter++;
        return chai.should();
    };

    // from http://robdodson.me/blog/2012/05/29/testing-backbone-modules/
    // ignoreLeaks is useful because it’s easy for mocha to see jQuery or any other
    // global variable as a good reason to abort a test. IMO that’s what JSLint/Hint
    // is for, and bailing everytime you see a global is going to make testing 3rd
    // party code especially difficult.
    // -------------------------------------------------------------------------
    // After mocha.run will be called it will check the global vars for leaks
    // You can setup allowed globals by setting the globals opt to an array
    // in mocha.setup(opts);
    // Any global vars defined before mocha.run() are accepted
    mocha.setup({
        ui         : 'bdd',
        ignoreLeaks: true,
        timeout: 10000
    });


    require([
        'jquery',

        // Models & Collections
        'TodoSpec',

        // Routers
        'AppRouterSpec',

        // Views
        'AppViewSpec',
        'TodoViewSpec'

        // Die Specs exportieren kein AMD-Modul und müssen nicht explizit
        // initialisiert werden. Alle via describe() initialisierten Specs
        // sind nun bei mocha registriert und werden via mocha.run() abgearbeitet.
    ], function ($) {

        // Zeige gesamte Anzahl an Assertions
        // Callback wird ausgeführt, sobald die Testsuite abgearbeitet wurde
        var onTestsDone = function () {
            // console.log('assertion_counter: ' + assertion_counter);

            // append assertion count to mocha results
            var resultList = $('#mocha-stats li:last');
            resultList.prepend('<li>assertions: <em>' + assertion_counter + '</em></li>');

            var msg = 'OK, tests run in: ' + (window.getTime() - window.start) / 1000.0 + 's';

            window.log(msg);
            $('#mocha').after(msg);
        };

        // es wird zb todo.spec schneller ausgeführt als main.js )-:
        // setTimeout(function () {
        mocha.run(onTestsDone);

        $('#loading').html('');
        // }, 1000)
    });
});

# TodoMVC Fork

Democode zum Artikel `Moderne JavaScript-Applikationen - ein Überblick` im PHPMagazin, Ausgabe 05/2013.

[![Build Status](https://travis-ci.org/mwager/todomvc.png?branch=master)](https://travis-ci.org/mwager/todomvc)

Dieses Repo ist ein Fork des [TodoMVC-Projekts](http://todomvc.com/) und dient als Democode zum Artikel [Moderne JavaScript-Applikationen - ein Überblick](http://phpmagazin.de/artikel/Moderne-JavaScript-Applikationen-ein-Ueberblick) aus dem PHPMagazin, Ausgabe 05/2013.

Es wurden nur Dateien im Verzeichnis `/dependency-examples/backbone_require/` modifiziert. Dieser Fork erweitert lediglich die Backbone-RequireJS Demo um einige Tests und versucht anhand einfacher Beispiele einige Best-Practises moderner JavaScript-Entwicklung vorzustellen.



## Lokale Installation

    $ cd path/to/local/htdocs # lokal muss ein webserver laufen
    $ git clone https://github.com/mwager/todomvc.git
    $ cd todomvc/dependency-examples/backbone_require
    # NOTE: node.js muss installiert sein
    $ npm install




## Tasks via [grunt](http://gruntjs.com)

Grunt ist ein mächtiges Tool zur Automatisierung, ähnlich dem guten
alten `Makefile`.

### JSHint via Grunt

    $ cd path/to/dependency-examples/backbone_require
    $ ./node_modules/.bin/grunt jshint -v

### Build via Require.js Optimizer

Der Buildprozess erstellt die Datei `build/build.js`. Diese muss dann nur noch
in der `index.html` eingebunden werden, und schon ist die App "production ready" (-:

    $ cd path/to/dependency-examples/backbone_require
    $ ./node_modules/.bin/grunt -v




## Relevante Dateien und Verzeichnisse

* `.jshintrc`           - JSHint Konfiguration. Wird in der Gruntfile.js verwendet, jedoch auch wenn JSHint direkt aufgerufen wird.
* `Gruntfile.js`        - Grunt Konfiguration
* `js/`                 - Das Verzeichnis der Original-Quellen der TodoMVC Implementierung mit Backbone.js und Require.js
* `test/`               - Alle Tests. UNIT-Tests via [Mocha](http://visionmedia.github.com/mocha/) und [testem](https://github.com/airportyh/testem), funktionale Tests via [CasperJS](http://casperjs.org/).
* `test/functional`     - `CasperJS` Tests
* `test/spec`           - Mocha UNIT Tests
* `testem.yml`          - Konfigurationsdatei für `testem`.



## Tests ##

### UNIT Tests ###

Es gibt 2 Möglichkeiten zum Ausführen der UNIT-Tests: Direkt via webserver (zB apache) oder via `testem`:

1. Browser direkt: `/test/index_browser.html` im Browser öffnen
2. Via `testem`:

        $ cd path/to/dependency-examples/backbone_require
        $ ./node_modules/.bin/testem     # dev mode
        $ ./node_modules/.bin/testem ci  # ci mode

### Funktionale Tests (CasperJS) ###

[CasperJS installieren](http://docs.casperjs.org/en/latest/installation.html)
Die Tests befinden sich in `test/functional/`

    $ cd path/to/dependency-examples/backbone_require
    $ casperjs test test/functional


#### Selenium + PhantomJS ####

Es existiert auch ein Beispiel mit Selenium und PhantomJS:

    1. In anderem Terminal den Selenium Server starten, zB:
    $ java -jar selenium-server-standalone-2.31.0.jar

    2. Ausführen der Tests:
    $ cd path/to/dependency-examples/backbone_require
    $ node test/functional/webdriverjs_test.js



## Quellen und weiterführende Informationen ##

* [Testing Backbone applications with Jasmine and Sinon](http://tinnedfruit.com/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html)
* [Warum AMD/Require.js](https://gist.github.com/desandro/4686136)

### Literatur ###

* [Douglas Crockford - JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)
* [John Resig - Secrets of the JavaScript Ninja](http://jsninja.com)

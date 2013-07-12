# TodoMVC Fork

Democode zum Artikel "Single Page Apps" im PHPMagazin, Ausgabe 05/2013.

[![Build Status](https://travis-ci.org/mwager/todomvc.png?branch=master)](https://travis-ci.org/mwager/todomvc)

Es wurden nur Dateien im Verzeichnis `dependency-examples/backbone_require/` modifiziert.


## Installation

    $ cd path/to/local/htdocs # lokal muss ein webserver laufen
    $ git clone https://github.com/mwager/todomvc.git
    $ cd todomvc/dependency-examples/backbone_require
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

### `.jshintrc`

JSHint Konfiguration. Wird in der Gruntfile.js verwendet, jedoch auch wenn JSHint
direkt aufgerufen wird.

### `js/`

Das Verzeichnis der Original-Quellen der TodoMVC Implementierung mit Backbone.js
und Require.js


### `test/`

Alle Tests. UNIT-Tests via [Mocha](http://visionmedia.github.com/mocha/) und
[testem](https://github.com/airportyh/testem), funktionale Tests via
[CasperJS](http://casperjs.org/).

#### `test/functional`

`CasperJS` Tests

Zuerst [CasperJS installieren](http://casperjs.org/installation.html)
Die Tests befinden sich in `test/functional/`

    $ cd path/to/dependency-examples/backbone_require
    $ casperjs test test/functional

#### `test/spec`

Mocha UNIT Tests


### `testem.yml`

Konfigurationsdatei für `testem`.

### Ausführen der Tests

Es gibt 2 Möglichkeiten zum Ausführen der Tests: Direkt (zB apache) oder via
`testem`

1. Browser direkt: `/test/index_browser.html` im Browser öffnen
2. Via `testem`:

        $ cd path/to/dependency-examples/backbone_require
        $ ./node_modules/.bin/testem     # dev mode
        $ ./node_modules/.bin/testem ci  # ci mode


### `test/bootstrap_tests.js`

Konfiguration von Require.js für die Tests, Laden der Tests.


### `test/index_browser.html`

HTML Startdatei zum direkten Aufruf per Browser.


### `test/index_testem.html`

HTML Startdatei wird von testem geladen. Siehe `testem.yml`.



## Quellen und weiterführende Informationen

* [Testing Backbone applications with Jasmine and Sinon](http://tinnedfruit.com/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html)
* [Warum AMD/Require.js](https://gist.github.com/desandro/4686136)

### Literatur

* [Douglas Crockford - JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)
* [John Resig - Secrets of the JavaScript Ninja](http://jsninja.com)

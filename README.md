# ng-easy-translate [![Build Status](https://travis-ci.org/KillerCodeMonkey/ng-easy-translate.svg?branch=develop)](https://travis-ci.org/KillerCodeMonkey/ng-easy-translate)
Simple translate module for AngularJS 1.x working with static json files. It uses 2-char locales for simplification, e.g. 'de', 'en', 'ru', ...

Take a look at this [little github page](http://killercodemonkey.github.io/ng-easy-translate/example/index.html "Little demo") for a working example.

## Installation

- download a package from the release page
- use bower `bower install ng-easy-translate`
- use npm `npm install ng-easy-translate`
- load the ng-easy-translate(.min).js file (in the dist-folder) after angularjs
- add `ngEasyTranslate` to your module dependencies

```
angular
    .module('app', ['ngEasyTranslate']);
```

## Components

- configure it in the config-Block of your app through the `$easyTranslateProvider`
- change language or get current dict/language with the `$easyTranslate` service in other parts of your app
- use the `translate` filter in your template

## Configuration with `$easyTranslateProvider`

- load `$easyTranslateProvider` in your config-block
- `$easyTranslateProvider.setLanguages(locales)` - sets the supported languages as an array of two-char locals, the first locale is the default language
- `$easyTranslateProvider.setDictFolder(path)` - sets the location path/folder of your dictionaries

```
angular
    .module('app')
    .config([
        '$easyTranslateProvider',
        function ($easyTranslateProvider) {
            $easyTranslateProvider.setLanguages(['de', 'en']);
            $easyTranslateProvider.setDictFolder('./src/dicts');
        }
    ]);
```

## Switch language with `$easyTranslate`

- load `$easyTranslate` via dependency injection
- `$easyTranslate.setActiveLanguage(locale)` - sets the language to the given folder, if locale is supported and dictionary is available, returns a promise resolved with the dict
- `$easyTranslate.getBrowserLanguage()` - returns the first two chars of the browser language (`$window.navigator.language`)
- `$easyTranslate.getActiveLanguage()` - returns current language as two char locale
- `$easyTranslate.getActiveDictionary()` - return current dictionary

```
angular
    .module('app')
    .controller('AppCtrl', [
        '$easyTranslate',
        function ($easyTranslate) {
            $easyTranslate.setActiveLanguage('de'); // returns promise
        }
    ]);
```

## Translate with `translate`

- use the `translate` filter in your template
- use the `translate` filter in your angular-components, e.g. controller, to translate on JS-side
- you can pass any string you want --> it will use $parse to also support nested or array keys

```
angular
    .module('app')
    .controller('AppCtrl', [
        '$filter',
        function ($filter) {
            var text = $filter('translate')('huhu');
        }
    ]);
```

```
<span>{{'huhu' | translate}}</span>
```

'use strict';

angular
    .module('myApp', ['ngEasyTranslate'])
    .config([
        '$easyTranslateProvider',
        function ($easyTranslateProvider) {
            // set supported languages 2-char locales
            $easyTranslateProvider.setLanguages(['de', 'en']);
            // set dict path
            $easyTranslateProvider.setDictFolder('./');
        }
    ])
    .run([
        '$easyTranslate',
        function ($easyTranslate) {
            return $easyTranslate.setActiveLanguage($easyTranslate.getBrowserLanguage());
        }
    ])
    .controller('AppCtrl', [
        '$scope',
        '$timeout',
        '$filter',
        '$easyTranslate',
        function ($scope, $timeout, $filter, $easyTranslate) {
            var locale = 'de';

            $timeout(function () {
                $scope.dict = $easyTranslate.getActiveDictionary();
                console.log('Translation for "hey":', $filter('translate')('hey'));
            }, 300);

            $scope.switch = function () {
                if (locale === 'de') {
                    locale = 'en';
                } else {
                    locale = 'de';
                }

                $easyTranslate.setActiveLanguage(locale).then(function (dict) {
                    console.log('Translation for "hey":', $filter('translate')('hey'));
                    $scope.dict = dict;
                });
            };
        }
    ]);

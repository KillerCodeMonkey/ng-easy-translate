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
        '$easyTranslate',
        function ($scope, $timeout, $easyTranslate) {
            var locale = 'de';

            $timeout(function () {
                $scope.dict = $easyTranslate.getActiveDictionary();
            }, 300);

            $scope.switch = function () {
                if (locale === 'de') {
                    locale = 'en';
                } else {
                    locale = 'de';
                }

                $easyTranslate.setActiveLanguage(locale).then(function (dict) {
                    $scope.dict = dict;
                });
            };
        }
    ]);

'use strict';

angular
    .module('ngEasyTranslate')
    .provider('$easyTranslate', [
        function () {
            var languages = [],
                dictPath = null,
                activeDictionary = {},
                activeLanguage = null;

            this.setLanguages = function (locales) {
                languages = locales;
            };

            this.setDictFolder = function (path) {
                dictPath = path;
            };

            this.$get =  ['$rootScope', '$window', '$http', '$q', function ($rootScope, $window, $http, $q) {
                return {
                    getBrowserLanguage: function () {
                        return $window.navigator.language.toLowerCase().substring(0, 2);
                    },
                    setActiveLanguage: function (locale) {
                        var oldActive = activeLanguage;

                        if (locale === activeLanguage) {
                            return $q.resolve(activeDictionary);
                        }
                        // set default language
                        if (languages.indexOf(locale) === -1) {
                            activeLanguage = languages[0];
                            return $q.reject('Unknown locale: ' + locale);
                        } else {
                            activeLanguage = locale;
                        }

                        return $http
                            .get(dictPath + '/' + locale + '.dict.json', {
                                cache: true
                            })
                            .then(function (res) {
                                activeDictionary = res.data;
                                $rootScope.$broadcast('$easyTranslate.changed', activeLanguage, activeDictionary);

                                return activeDictionary;
                            }, function (err) {
                                activeLanguage = oldActive;
                                console.error('Can not request dictionary', err);

                                return $q.reject(err);
                            });
                    },
                    getActiveLanguage: function () {
                        return activeLanguage;
                    },
                    getActiveDictionary: function () {
                        return activeDictionary;
                    }
                };
            }];
        }
    ]);

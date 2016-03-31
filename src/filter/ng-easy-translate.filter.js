'use strict';

angular
    .module('ngEasyTranslate')
    .filter('translate', [
        '$parse',
        '$easyTranslate',
        function ($parse, $easyTranslate) {
            var translateFilter = function (dictKey) {
                var dict = $easyTranslate.getActiveDictionary();

                if (!Object.keys(dict).length) {
                    return dictKey;
                }

                return $parse(dictKey)(dict);
            };

            translateFilter.$stateful = true;

            return translateFilter;
        }
    ]);

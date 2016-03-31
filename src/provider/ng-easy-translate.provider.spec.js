'use strict';

describe('ngEasyTranslate', function () {

    describe('$easyTranslate', function () {

        beforeEach(module('ngEasyTranslate', function ($easyTranslateProvider) {
            $easyTranslateProvider
                .setLanguages(['de', 'en']);

            $easyTranslateProvider
                .setDictFolder(['dicts']);
        }));

        var $httpBackend, $easyTranslate, $window, $rootScope, oldWindow;

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $easyTranslate = $injector.get('$easyTranslate');

            $httpBackend.whenGET('dicts/de.dict.json').respond({
                'huhu': 'Hallo'
            });
            $httpBackend.whenGET('dicts/en.dict.json').respond(404);

            $window = $injector.get('$window');
            oldWindow = $window;

            $window = angular.extend($window, {
                navigator: {
                    language: 'de_DE'
                }
            });
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            $window = oldWindow;
        });

        it('should be an object', function () {
            expect($easyTranslate).to.be.an('object');
        });

        it('should return with translation key if translation doesn\'t exist', function () {
            expect($easyTranslate.getBrowserLanguage()).to.equal('de');
        });

        it('should return translation if after active language set', function () {
            $httpBackend.expectGET('dicts/de.dict.json');
            $easyTranslate.setActiveLanguage('de');
            $httpBackend.flush();
            expect($easyTranslate.getActiveLanguage()).to.equal('de');
            console.log($easyTranslate.getActiveDictionary());
            expect($easyTranslate.getActiveDictionary()).to.eql({
                'huhu': 'Hallo'
            });
        });

        it('should return translation if after set active language again', function () {
            $httpBackend.expectGET('dicts/de.dict.json');
            $easyTranslate.setActiveLanguage('de');
            $httpBackend.flush();
            expect($easyTranslate.getActiveLanguage()).to.equal('de');
            expect($easyTranslate.getActiveDictionary()).to.eql({
                'huhu': 'Hallo'
            });

            $easyTranslate.setActiveLanguage('de');
        });

        it('should return error if unkown locale', function () {
            $easyTranslate.setActiveLanguage('ru');
            $rootScope.$digest();
            expect($easyTranslate.getActiveLanguage()).to.equal('de');
            expect($easyTranslate.getActiveDictionary()).to.eql({});
        });

        it('should return error if dictionary not exists locale', function () {
            $httpBackend.expectGET('dicts/en.dict.json');
            $easyTranslate.setActiveLanguage('en');
            $httpBackend.flush();
            expect($easyTranslate.getActiveLanguage()).to.be.null;
            expect($easyTranslate.getActiveDictionary()).to.eql({});
        });

    });
});

'use strict';

describe('ngEasyTranslate', function () {

    describe('translateFilter', function () {

        beforeEach(module('ngEasyTranslate', function ($easyTranslateProvider) {
            $easyTranslateProvider
                .setLanguages(['de']);

            $easyTranslateProvider
                .setDictFolder(['dicts']);
        }));

        var $filter, $translate, $httpBackend, $easyTranslate;

        beforeEach(inject(function ($injector) {
            $filter = $injector.get('$filter');
            $translate = $filter('translate');
            $httpBackend = $injector.get('$httpBackend');

            $easyTranslate = $injector.get('$easyTranslate');

            $httpBackend.whenGET('dicts/de.dict.json').respond({
                'huhu': 'Hallo'
            });
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be a function object', function () {
            expect($translate).to.be.a('function');
        });

        it('should return with translation key if translation doesn\'t exist', function () {
            expect($translate('WOOP')).to.equal('WOOP');
        });
        it('should return translation if translation id exist', function () {
            $httpBackend.expectGET('dicts/de.dict.json');
            $easyTranslate.setActiveLanguage('de');
            $httpBackend.flush();
            expect($translate('huhu')).to.equal('Hallo');
        });

    });
});

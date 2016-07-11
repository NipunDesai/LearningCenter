/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />

"use strict";
describe("contentControllerSpec", () => {
    var scope,
        $controllerConstructor: ng.IControllerService,
        contentMockService,
        modal,
        $qService,
        defered,
        rootScope,
        contentController;

    beforeEach(angular.mock.module("app"));

    beforeEach(inject((
        $controller: ng.IControllerService,
        $rootScope: ng.IRootScopeService,
        $q: ng.IQService,
        contentService,
        $modal) => {
        $controllerConstructor = $controller;
        scope = $rootScope.$new(true);
        contentMockService = contentService;
        modal = $modal;
        $qService = $q;
        defered = $qService.defer();
        rootScope = $rootScope;
        intialization();

    }));

      it('Should Be Setup Controller scope', () => {
            expect(contentController).toBeDefined();
            expect(contentController.getContentList).toBeDefined();
            expect(contentController.viewCreatorDetails).toBeDefined();
        });

    it('should Be Get ELearning Content List', () => {
        var defered1 = $qService.defer();
        var contentCollection = [{ Id: 1, Rate: 3, Title: "sdeseds", UserId: 2 }];
        spyOn(contentMockService, "getContentList").and.returnValue(defered1.promise);
        contentController.getContentList();
        defered1.resolve(contentCollection);
        rootScope.$apply();
        expect(scope.eLearningContentCollection.length).toBe(contentCollection.length);
    });

    it('Should Be get content creator details.', () => {
        var defered1 = $qService.defer();
        var userId = 1;
        var user = [{ Age: "23", JobTitle: "Software Developer" ,CompanyName: "Promact info", Education: "BE", FirstName: "Nipun", LastName: "Desai", UserId: 1, UserName: "nipun@promactinfo.com" }];
        spyOn(contentMockService, "viewCreatorDetails").and.returnValue(defered1.promise);
        spyOn(modal, "open").and.callFake(() => { });
        contentController.viewCreatorDetails(userId);
        defered1.resolve(user);
        rootScope.$apply();
        expect(scope.userCollection.length).toBe(user.length);
    });

    function intialization() {
        contentController = $controllerConstructor("contentController", {
            $scope: scope,
            contentService: contentMockService,
            $modal: modal,
            $rootScope: rootScope
        });

    }
});








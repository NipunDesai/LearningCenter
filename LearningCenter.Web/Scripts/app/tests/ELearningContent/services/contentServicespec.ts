/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />

"use strict";
describe("contentServicespec", () => {
    var contentMockedService,
        $qServices: ng.IQService,
        httpBackend;

    beforeEach(angular.mock.module("app"));

    beforeEach(inject((contentService,
        $q:ng.IQService,
        $httpBackend:ng.IHttpBackendService
        ) => {
        contentMockedService = contentService;
        $qServices = $q;
        httpBackend = $httpBackend;
    }));

    it("should call GET on api/ELearningContent/getContentList to get all eLearning content.", () => {
        httpBackend.when("GET", apiPaths.getContentList).respond([{Id : 1}]);
        var promise = contentMockedService.getContentList();
        httpBackend.flush();
        promise.then((result)=> {
            expect(result.length).toBe(1);
        });
    });

    it("should Call GET on api/ELearningContent/viewCreatorDetails to get contentCreator Details", () => {
        var id = 1;
        httpBackend.when("GET", apiPaths.contentCreatorDetails + '?id=1').respond(id);
        var promise = contentMockedService.viewCreatorDetails(id);
        promise.then(result => {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
 });
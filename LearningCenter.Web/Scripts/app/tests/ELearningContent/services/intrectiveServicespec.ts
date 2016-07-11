/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
"user strict";

describe("interactiveServicespec", () => {
    var intrectiveMockService,
        $qService: ng.IQService,
        httpBackend;
    beforeEach(angular.mock.module("app"));

    beforeEach(inject((interactiveService,
        $q: ng.IQService,
        $httpBackend:ng.IHttpBackendService
        ) => {
        intrectiveMockService = interactiveService;
        $qService = $q;
        httpBackend = $httpBackend;
    }));

    it("should call GET on api/interactiveController/getAllInteractiveQuestions to get all intrectiveQuestion by id", () => {
        var contentId = 22;
        httpBackend.when("GET",apiPaths.getIntrectiveQuestions+ '?id=22').respond(contentId);
        var promise = intrectiveMockService.getAllInteractiveQuestions(contentId);
        httpBackend.flush();
        promise.then((result)=> {
            expect(result[0].Id).toBe(contentId);
        });
      
    });

    it("should call GET on api/interactiveController/saveInteractiveResult to save interactive Result", () => {
        var id = 1;
        httpBackend.when("POST",apiPaths.saveInteractiveResult + '?id=1').respond(id);
        var promise = intrectiveMockService.saveInteractiveResult(id);
        httpBackend.flush();
        promise.then((result) => {
            expect(result[0].Id).toBe(id);
        });
       
    });

    it("should Call GET on api/interactiveController/getAllInteractiveResult to get all interactive result", () => {
        var id = 1;
        httpBackend.when("GET",apiPaths.getAllInteractiveResult + '?id=1').respond(id);
        var promise = intrectiveMockService.getAllInteractiveResult(id);
        promise.then((result) => {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });

    it("should call GET on api/interactiveController/getInteractiveQuestionById to get interactive question by id", () => {
        var id = 1;
        httpBackend.when("GET",apiPaths.getInteractiveQuestionById + '?id=1').respond(id);
        var promise = intrectiveMockService.getInteractiveQuestionById(id);
        promise.then((result) => {
            expect(result[0].Id).toBe(id);

        });
        httpBackend.flush();
    });

    it("should call GET on api/interactiveController/getAllUser to get all User", () => {

        httpBackend.when("GET",apiPaths.getAllUserName).respond([{Id : 1}]);
        var promise = intrectiveMockService.getAllUserName();
        promise.then((result) => {
            expect(result.length).toBe(1);
        });
        httpBackend.flush();
    });

    it("should call GET on api/interactiveController/getInteractiveResultByUserId to get interactive result by user Id", () => {
        var id = 1;
        httpBackend.when("GET",apiPaths.getInteractiveResultByUserId + '?id=1').respond(id);
        var promise = intrectiveMockService.getInteractiveResultByUserId(id);
        promise.then((result) => {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
});
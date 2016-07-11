/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
"user strict";

describe("eLearningLeacturePageServicesspec", () => {
    var eLearningmockService,
        $qService: ng.IQService,
        httpBackend;
    beforeEach(angular.mock.module("app"));

    beforeEach(inject((eLearningLecturePageService,
        $q: ng.IQService,
        $httpBackend: ng.IHttpBackendService
        ) => {
        eLearningmockService = eLearningLecturePageService;
        $qService = $q;
        httpBackend = $httpBackend;
    }));

    it("should call GET on api/ELearningContent/getELearningLectureById to get ELearning Lecture.", () => {
        var id = 1;
        httpBackend.when("GET", apiPaths.eLearningLectureById + '?id=1').respond(id);
        var promise = eLearningmockService.getELearningLectureById(id);
        promise.then((result)=> {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });

    it("should call GET on api/ELearningContent/viewELearningSectionById to get ELarning Section Details", () => {
        var id = 1;
        httpBackend.when("GET", apiPaths.viewELearningSectionById + '?id=1').respond(id);
        var promise = eLearningmockService.viewELearningSectionById(id);
        promise.then((result) => {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });

});
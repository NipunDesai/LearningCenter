/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
"user strict";
describe("eLearningLeacturePageServicesspec", function () {
    var eLearningmockService, $qService, httpBackend;
    beforeEach(angular.mock.module("app"));
    beforeEach(inject(function (eLearningLecturePageService, $q, $httpBackend) {
        eLearningmockService = eLearningLecturePageService;
        $qService = $q;
        httpBackend = $httpBackend;
    }));
    it("should call GET on api/ELearningContent/getELearningLectureById to get ELearning Lecture.", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.eLearningLectureById + '?id=1').respond(id);
        var promise = eLearningmockService.getELearningLectureById(id);
        promise.then(function (result) {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
    it("should call GET on api/ELearningContent/viewELearningSectionById to get ELarning Section Details", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.viewELearningSectionById + '?id=1').respond(id);
        var promise = eLearningmockService.viewELearningSectionById(id);
        promise.then(function (result) {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
});
//# sourceMappingURL=eLearningLeacturePageServicesspec.js.map
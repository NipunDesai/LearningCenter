/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var eLearningLecturePageService = (function () {
    function eLearningLecturePageService($resource, $q, $log) {
        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('E-LearningContent Service Call');
        this.eLearningLectureById = this.$resource(apiPaths.eLearningLectureById);
        this.eLearningSectionById = this.$resource(apiPaths.viewELearningSectionById);
        this.viewIntrective = this.$resource(apiPaths.viewInteractiveDetails);
    }
    eLearningLecturePageService.prototype.getELearningLectureById = function (id) {
        return this.eLearningLectureById.query({ id: id }).$promise;
    };
    eLearningLecturePageService.prototype.viewELearningSectionById = function (id) {
        return this.eLearningSectionById.query({ id: id }).$promise;
    };
    eLearningLecturePageService.prototype.viewInteractiveDetail = function (id) {
        return this.viewIntrective.get({ id: id }).$promise;
    };
    eLearningLecturePageService.serviceId = "eLearningLecturePageService";
    return eLearningLecturePageService;
}());
app.service('eLearningLecturePageService', ['$resource', '$q', '$log', function ($resource, $q, $log) {
        return new eLearningLecturePageService($resource, $q, $log);
    }]);
//# sourceMappingURL=ELearningLecturePageService.js.map
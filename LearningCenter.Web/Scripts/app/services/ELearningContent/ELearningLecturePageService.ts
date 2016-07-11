/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


interface IeLearningLecturePageService {
    getELearningLectureById: (id) => void;
    viewELearningSectionById : (id)=>void;
    viewInteractiveDetail :(id)=>void;
}
class eLearningLecturePageService {
    static serviceId = "eLearningLecturePageService";
    private $resource;
    private $q;
    public eLearningLectureById;
    public eLearningSectionById;
    public viewIntrective;
    private $log;
    constructor($resource: ng.resource.IResourceService, $q: ng.IQService,$log:ng.ILogService) {

        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('E-LearningContent Service Call');
        this.eLearningLectureById = this.$resource(apiPaths.eLearningLectureById);
        this.eLearningSectionById = this.$resource(apiPaths.viewELearningSectionById);
        this.viewIntrective = this.$resource(apiPaths.viewInteractiveDetails);
    }
    getELearningLectureById(id) {
        return this.eLearningLectureById.query({ id: id }).$promise;
    }
    viewELearningSectionById(id) {
        return this.eLearningSectionById.query({id:id }).$promise;
    }
    viewInteractiveDetail(id) {
        return this.viewIntrective.get({ id: id }).$promise;
    }
}

app.service('eLearningLecturePageService', ['$resource', '$q','$log', ($resource, $q,$log) => {
    return new eLearningLecturePageService($resource, $q,$log);
}]);
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var interactiveService = (function () {
    function interactiveService($resource, $q, $log) {
        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.getIntrectiveQuestions = $resource(apiPaths.getIntrectiveQuestions);
        this.intrectiveResult = $resource(apiPaths.saveInteractiveResult, { id: "@id" });
        this.getInteractiveResult = $resource(apiPaths.getAllInteractiveResult);
        //  this.currentIntrectiveResult = $resource(apiPaths.currentuserInteractiveResult);
        this.getQuestion = $resource(apiPaths.getAllInteractiveQuestion);
        this.getQuestionById = $resource(apiPaths.getInteractiveQuestionById);
        this.getUserName = $resource(apiPaths.getAllUserName);
        this.getUserId = $resource(apiPaths.getInteractiveResultByUserId);
    }
    interactiveService.prototype.getAllInteractiveQuestions = function (id) {
        this.$log.log("Get All interactive Questions.");
        return this.getIntrectiveQuestions.query({ id: id }).$promise;
    };
    interactiveService.prototype.saveInteractiveResult = function (id) {
        this.$log.log("Save Intrective Result.");
        return this.intrectiveResult.save({ id: id }).$promise;
    };
    interactiveService.prototype.getAllInteractiveResult = function (id) {
        this.$log.log("Get All Intrective Result By Id.");
        return this.getInteractiveResult.query({ id: id }).$promise;
    };
    //currentuserInteractiveResult() {
    //    return this.currentIntrectiveResult.query().$promise;
    //}
    interactiveService.prototype.getAllInteractiveQuestion = function (id) {
        this.$log.log("Get All IntrectiveQuestion By Id");
        return this.getQuestion.query({ id: id }).$promise;
    };
    interactiveService.prototype.getInteractiveQuestionById = function (id) {
        this.$log.log("Get All IntrectiveQuestion By Id");
        return this.getQuestionById.query({ id: id }).$promise;
    };
    interactiveService.prototype.getAllUserName = function () {
        this.$log.log("Get All User Name");
        return this.getUserName.query().$promise;
    };
    interactiveService.prototype.getInteractiveResultByUserId = function (id) {
        // var defer = this.$q.defer();
        this.$log.log("Get IntrectiveResult By UserId");
        return this.getUserId.query({ id: id }).$promise;
        //this.getUserId.query(id,result=> {
        //    defer.resolve(result);
        //}, result=> {
        //    defer.reject(result);
        //    this.$log.log("api 500 error");
        //});
        //return defer.promise;
    };
    interactiveService.serviceId = "interactiveService";
    return interactiveService;
}());
app.service('interactiveService', ['$resource', '$q', '$log', function ($resource, $q, $log) {
        return new interactiveService($resource, $q, $log);
    }]);
//# sourceMappingURL=InteractiveService.js.map
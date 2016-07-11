/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
interface IinteractiveService {
    getAllInteractiveQuestions: (id) => void;
    saveInteractiveResult: (id) => void;
    getAllInteractiveResult: (id) => void;
   // currentuserInteractiveResult: () => void;
    getAllInteractiveQuestion: (id) => void;
    getInteractiveQuestionById: (id) => void;
    getAllUserName: () => void;
    getInteractiveResultByUserId:(id)=>void;
}
class interactiveService {
    static serviceId = "interactiveService";
    private $resource;
    private $q;
    public getIntrectiveQuestions;
    public intrectiveResult;
    public getInteractiveResult;
   // public currentIntrectiveResult;
    public getQuestion;
    public getQuestionById;
    public getUserName;
    public getUserId;
    private $log;

    constructor($resource: ng.resource.IResourceService, $q: ng.IQService,$log:ng.ILogService) {
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

    getAllInteractiveQuestions(id) {
        this.$log.log("Get All interactive Questions.");
        return this.getIntrectiveQuestions.query({id:id}).$promise;
    }

    saveInteractiveResult(id) {
        this.$log.log("Save Intrective Result.");
        return this.intrectiveResult.save({id:id}).$promise;
    }

    getAllInteractiveResult(id) {
        this.$log.log("Get All Intrective Result By Id.");
        return this.getInteractiveResult.query({ id: id }).$promise;
    }

    //currentuserInteractiveResult() {
    //    return this.currentIntrectiveResult.query().$promise;
    //}

    getAllInteractiveQuestion(id) {
        this.$log.log("Get All IntrectiveQuestion By Id");
        return this.getQuestion.query({id:id}).$promise;
    }

    getInteractiveQuestionById(id) {
        this.$log.log("Get All IntrectiveQuestion By Id");
        return this.getQuestionById.query({ id: id }).$promise;
    }
    getAllUserName() {
        this.$log.log("Get All User Name");
        return this.getUserName.query().$promise;
    }

    getInteractiveResultByUserId(id) {
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
  
    }
}

app.service('interactiveService', ['$resource', '$q','$log', ($resource, $q,$log) => {
    return new interactiveService($resource, $q,$log);
}]);
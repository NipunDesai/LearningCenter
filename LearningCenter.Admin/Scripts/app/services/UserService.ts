/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />

interface IuserService {
    SaveUserInviteeInfo: (resource) => void;
}
class userService implements IuserService {
    static serviceId = "userService";
    private $resource;
    private $q;
    private $log;
    public saveUserInvitee;

    constructor($resource: ng.resource.IResourceService, $q: ng.IQService, $log: ng.ILogService) {

        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('userService Call');
        this.saveUserInvitee = this.$resource(apiPaths.saveUserInviteeInfo);

    }

    SaveUserInviteeInfo(resource : Model.UserInvitee) {
        return this.saveUserInvitee.save(resource).$promise;
    }
   
}

app.service('userService', ['$resource', '$q', '$log', ($resource, $q, $log) => {
    return new userService($resource, $q, $log);
}]);
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
var userService = (function () {
    function userService($resource, $q, $log) {
        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('userService Call');
        this.saveUserInvitee = this.$resource(apiPaths.saveUserInviteeInfo);
    }
    userService.prototype.SaveUserInviteeInfo = function (resource) {
        return this.saveUserInvitee.save(resource).$promise;
    };
    userService.serviceId = "userService";
    return userService;
}());
app.service('userService', ['$resource', '$q', '$log', function ($resource, $q, $log) {
        return new userService($resource, $q, $log);
    }]);
//# sourceMappingURL=userservice.js.map
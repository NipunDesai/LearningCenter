/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
var profileService = (function () {
    function profileService($resource, $q, $log) {
        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('profileService Call');
        this.getUserProfileInfo = this.$resource(apiPaths.getProfileInfo);
        this.postUserProfileInfo = this.$resource(apiPaths.postProfileInfo);
        this.deleteUserProfileInfo = this.$resource(apiPaths.deleteImage);
    }
    profileService.prototype.ProfileInfo = function () {
        return this.getUserProfileInfo.get().$promise;
    };
    profileService.prototype.SaveUserInfo = function (resource) {
        return this.postUserProfileInfo.save(resource).$promise;
    };
    profileService.prototype.DeleteImage = function (profilePic) {
        return this.deleteUserProfileInfo.delete({ fileInfoAc: profilePic }).$promise;
    };
    profileService.serviceId = "profileService";
    return profileService;
}());
app.service('profileService', ['$resource', '$q', '$log', function ($resource, $q, $log) {
        return new profileService($resource, $q, $log);
    }]);
//# sourceMappingURL=profileservice.js.map
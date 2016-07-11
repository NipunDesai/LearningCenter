/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />

interface IprofileService {
    ProfileInfo: () => void;
    SaveUserInfo: (resource) => void;
    DeleteImage: (profilePic) => void;
}
class profileService implements IprofileService {
    static serviceId = "profileService";
    private $resource;
    private $q;
    private $log;
    public getUserProfileInfo; 
    public postUserProfileInfo;
    public deleteUserProfileInfo;

    constructor($resource: ng.resource.IResourceService, $q: ng.IQService,$log:ng.ILogService) {

        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('profileService Call');
        this.getUserProfileInfo = this.$resource(apiPaths.getProfileInfo);
        this.postUserProfileInfo = this.$resource(apiPaths.postProfileInfo);
        this.deleteUserProfileInfo = this.$resource(apiPaths.deleteImage);
       
    }

    ProfileInfo() {
        return this.getUserProfileInfo.get().$promise;
    } 

    SaveUserInfo(resource: Model.UserInfo) {
        return this.postUserProfileInfo.save(resource).$promise;
    }

    DeleteImage(profilePic)
    {
        return this.deleteUserProfileInfo.delete({ fileInfoAc: profilePic }).$promise;
    }
}

app.service('profileService', ['$resource', '$q','$log', ($resource, $q,$log) => {
    return new profileService($resource, $q,$log);
}]);
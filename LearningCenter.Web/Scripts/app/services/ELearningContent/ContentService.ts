/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />

interface IcontentService {
    getContentList: () => void;
    viewCreatorDetails: (id) => void;
}
class contentService {
    static serviceId = "contentService";
    private $resource;
    private $q;
    public contentList;
    public contentCreatorDetails;


    constructor($resource: ng.resource.IResourceService, $q: ng.IQService) {
        this.$resource = $resource;
        this.$q = $q;
        this.contentList = $resource(apiPaths.getContentList);
        this.contentCreatorDetails = this.$resource(apiPaths.contentCreatorDetails);
    }

    getContentList () {
        return this.contentList.query().$promise;
    }

    viewCreatorDetails(id) {
        return this.contentCreatorDetails.query({id : id}).$promise;
    }
}

app.service('contentService', ['$resource', '$q', ($resource, $q) => {
    return new contentService($resource, $q);
}]);
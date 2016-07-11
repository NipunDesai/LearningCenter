/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
var contentService = (function () {
    function contentService($resource, $q) {
        this.$resource = $resource;
        this.$q = $q;
        this.contentList = $resource(apiPaths.getContentList);
        this.contentCreatorDetails = this.$resource(apiPaths.contentCreatorDetails);
    }
    contentService.prototype.getContentList = function () {
        return this.contentList.query().$promise;
    };
    contentService.prototype.viewCreatorDetails = function (id) {
        return this.contentCreatorDetails.query({ id: id }).$promise;
    };
    contentService.serviceId = "contentService";
    return contentService;
}());
app.service('contentService', ['$resource', '$q', function ($resource, $q) {
        return new contentService($resource, $q);
    }]);
//# sourceMappingURL=ContentService.js.map
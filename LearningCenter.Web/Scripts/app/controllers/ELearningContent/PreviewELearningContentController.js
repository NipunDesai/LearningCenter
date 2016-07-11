/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../services/elearningcontent/elearningcontentservice.ts" />
var previewELearningContentController = (function () {
    function previewELearningContentController($scope, $log, eLearningContentService, $location, $routeParams, $rootScope) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.eLearningContentService = eLearningContentService;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.$rootScope = $rootScope;
        this.$scope.previewELearningContent = function (resource) { return _this.previewELearningContent(); };
        this.$scope.returnELearningPage = function () { return _this.returnELearningPage(); };
        this.$scope.eLearningContent = new Model.ELearningContent();
        // this.$rootScope.contentId = " ";
    }
    previewELearningContentController.prototype.previewELearningContent = function () {
        var scope = this.$scope;
        var rootScope = this.$rootScope;
        var promise = this.eLearningContentService.previewContent(this.$routeParams.id);
        promise.then(function (data) {
            scope.eLearningContent.Id = data.Id;
            scope.eLearningContent.Title = data.Title;
            scope.eLearningContent.CreatedOn = data.CreatedOn;
            scope.eLearningContent.CreatedDateTime = data.DisplayDateTime;
            rootScope.contentId = data.Id;
            if (data.ContentImageGuid == null) {
                scope.eLearningContent.ContentImageGuid = "/Images/Content-Default.png";
            }
            else {
                scope.eLearningContent.ContentImageGuid = data.ContentImageGuid;
            }
            console.log(data);
        });
    };
    previewELearningContentController.prototype.returnELearningPage = function () {
        this.$location.path("/ELearning/CreateCourse");
        this.$scope.$apply();
    };
    previewELearningContentController.controllerId = "previewELearningContentController";
    return previewELearningContentController;
}());
app.controller(previewELearningContentController.controllerId, ['$scope', '$log', 'eLearningContentservice', '$location', '$routeParams', '$rootScope', function ($scope, $log, eLearningContentService, $location, $routeParams, $rootScope) {
        if (previewELearningContentController.instance === undefined)
            previewELearningContentController.instance = new previewELearningContentController($scope, $log, eLearningContentService, $location, $routeParams, $rootScope);
        return previewELearningContentController.instance;
    }]);
//# sourceMappingURL=PreviewELearningContentController.js.map
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../services/elearningcontent/elearningcontentservice.ts" />

interface IpreviewELearningContentScope extends ng.IScope {
    previewELearningContent: (resource) => any;
    eLearningContent: Model.ELearningContent;
    returnELearningPage: () => any;
    contentId: any;
}
interface IpreviewELearningContentController {

}
class previewELearningContentController implements IpreviewELearningContentController {
    static controllerId = "previewELearningContentController";
    static instance;
    constructor(private $scope: IpreviewELearningContentScope, private $log: ng.ILogService, public eLearningContentService: eLearningContentService, private $location: ng.ILocationService, private $routeParams, private $rootScope) {
        this.$scope.previewELearningContent = (resource) => this.previewELearningContent();
        this.$scope.returnELearningPage = () => this.returnELearningPage();
        this.$scope.eLearningContent = new Model.ELearningContent();
       // this.$rootScope.contentId = " ";
    }

    private previewELearningContent()
    {
        var scope = this.$scope;
        var rootScope = this.$rootScope;
        var promise = this.eLearningContentService.previewContent(this.$routeParams.id);
        promise.then((data) => {
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
    }

    private returnELearningPage() {

        this.$location.path("/ELearning/CreateCourse");
        this.$scope.$apply();
    }
}

app.controller(previewELearningContentController.controllerId, ['$scope', '$log', 'eLearningContentservice', '$location', '$routeParams','$rootScope', ($scope, $log, eLearningContentService, $location, $routeParams, $rootScope) => {
    if (previewELearningContentController.instance === undefined)
        previewELearningContentController.instance = new previewELearningContentController($scope, $log, eLearningContentService, $location, $routeParams, $rootScope);
    return previewELearningContentController.instance;
}]);
 
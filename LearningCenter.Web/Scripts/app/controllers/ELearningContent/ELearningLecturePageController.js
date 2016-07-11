/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var eLearningLecturePageController = (function () {
    function eLearningLecturePageController($scope, $log, $resource, $location, $routeParams, $sce, eLearningLecturePageService, $rootScope, $modal, apiPath) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.$resource = $resource;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.$sce = $sce;
        this.eLearningLecturePageService = eLearningLecturePageService;
        this.$rootScope = $rootScope;
        this.$modal = $modal;
        this.apiPath = apiPath;
        this.$scope.getAllELearningLecturePage = function () { return _this.getAllELearningLecturePage(); };
        this.$scope.eLearningContentCollection = [];
        this.$scope.sectionPageCollection = [];
        this.$scope.viewELearningSectionById = function (id) { return _this.viewELearningSectionById(id); };
        this.$scope.totalPageCollection = [];
        this.$scope.currentPage = 1;
        this.$scope.itemPerCurrentPage = 1;
        this.$scope.viewSelectedSectionDetailsBySectionId = function (id) { return _this.viewSelectedSectionDetailsBySectionId(id); };
        this.$scope.errorMessage = "";
        this.$scope.lectureErrorMessageDisplay = false;
        this.$scope.currentIndex = 0;
        this.$scope.progressBarWidth = "";
        this.$scope.progressWidth = "";
        this.$scope.currentContentIndex = 0;
        this.$scope.viewInteractiveDetail = function (id) { return _this.viewInteractiveDetail(id); };
        this.$scope.exceptionMessageDisplayDialog = function (errorMessage) { return _this.exceptionMessageDisplayDialog(errorMessage); };
        this.$scope.exceptionMessage = "";
        this.$scope.closeCatchDialogBox = function () { return _this.closeCatchDialogBox(); };
    }
    eLearningLecturePageController.prototype.getAllELearningLecturePage = function () {
        var _this = this;
        var sectionId = this.$routeParams.id;
        var controllerScope = this.$scope;
        var thats = this;
        var promise = this.eLearningLecturePageService.getELearningLectureById(sectionId);
        promise.then(function (result) {
            controllerScope.eLearningContentCollection = [];
            var eLearningLectureList = controllerScope.eLearningContentCollection;
            controllerScope.sectionPageCollection = [];
            var selectionPageList = controllerScope.sectionPageCollection;
            _this.$log.log("get Elearning Lecture Byid successfully");
            for (var i = 0; i < result.length; i++) {
                eLearningLectureList.push(result[i]);
            }
            for (var j = 0; j < eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage.length; j++) {
                // YoutubeAndExternalLink
                var s = eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage.length;
                if (eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage[j].YouTubeLink == null) {
                    selectionPageList.push(eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage[j]);
                }
                else {
                    eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage[j].SectionContentFileGuid = eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage[j].YouTubeLink;
                    selectionPageList.push(eLearningLectureList[0].ELearningLecture[0].ELearningSectionPage[j]);
                }
            }
            for (var k = 0; k < controllerScope.eLearningContentCollection[0].ELearningLecture.length; k++) {
                if (controllerScope.eLearningContentCollection[0].ELearningLecture[k].ELearningLectureId == thats.$rootScope.lectureId) {
                    controllerScope.progressWidth = 100;
                    controllerScope.currentIndex = k;
                    controllerScope.currentContentIndex = controllerScope.currentIndex;
                    controllerScope.eLearningContentCollection[0].ELearningLecture[k].Width = controllerScope.currentPage * 100 / controllerScope.sectionPageCollection.length;
                    break;
                }
            }
            var that = _this;
            _this.$scope.$watch("currentPage + itemPerCurrentPage", function () {
                _this.$scope.totalPageCollection = [];
                var begin = ((that.$scope.currentPage - 1) * that.$scope.itemPerCurrentPage), end = begin + that.$scope.itemPerCurrentPage;
                controllerScope.totalPageCollection = selectionPageList.slice(begin, end);
                controllerScope.eLearningContentCollection[0].ELearningLecture[controllerScope.currentIndex].Width = controllerScope.currentPage * 100 / controllerScope.sectionPageCollection.length;
                _this.$log.log(controllerScope.totalPageCollection);
            });
            controllerScope.totalPageItem = controllerScope.sectionPageCollection.length;
        }).catch(function (error) {
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
            }
            else if (error.status == 500) {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                _this.$scope.lectureErrorMessageDisplay = true;
            }
            else {
                //    // controllerScope.contentLoading = false;
                location.replace(_this.apiPath);
            }
        });
    };
    eLearningLecturePageController.prototype.viewELearningSectionById = function (id) {
        var controllerScope = this.$scope;
        controllerScope.sectionPageCollection = [];
        controllerScope.totalPageItem = [];
        controllerScope.currentPage = 1;
        controllerScope.totalPageItem = controllerScope.sectionPageCollection.length;
        for (var i = 0; i < controllerScope.eLearningContentCollection[0].ELearningLecture.length; i++) {
            if (controllerScope.eLearningContentCollection[0].ELearningLecture[i].ELearningLectureId == id)
                for (var j = 0; j < controllerScope.eLearningContentCollection[0].ELearningLecture[i].ELearningSectionPage.length; j++) {
                    controllerScope.currentIndex = i;
                    controllerScope.sectionPageCollection.push(controllerScope.eLearningContentCollection[0].ELearningLecture[i].ELearningSectionPage[j]);
                    controllerScope.currentContentIndex = controllerScope.currentIndex;
                    controllerScope.eLearningContentCollection[0].ELearningLecture[i].Width = controllerScope.currentPage * 100 / controllerScope.sectionPageCollection.length;
                }
            controllerScope.totalPageItem = controllerScope.sectionPageCollection.length;
            controllerScope.progressWidth = 100;
        }
    };
    eLearningLecturePageController.prototype.viewSelectedSectionDetailsBySectionId = function (id) {
        var controllerScope = this.$scope;
        this.$scope.progressBarWidth = "";
        controllerScope.currentContentIndex = controllerScope.currentIndex;
        for (var i = 0; i < controllerScope.eLearningContentCollection[0].ELearningLecture.length; i++) {
            for (var j = 0; j < controllerScope.eLearningContentCollection[0].ELearningLecture[i].ELearningSectionPage.length; j++) {
                if (controllerScope.eLearningContentCollection[0].ELearningLecture[i].ELearningSectionPage[j].ELearningSectionPageId == id) {
                    controllerScope.currentPage = j + 1;
                    var s = controllerScope.eLearningContentCollection[0].ELearningLecture[i].ELearningSectionPage.length;
                    controllerScope.eLearningContentCollection[0].ELearningLecture[i].Width = controllerScope.currentPage * 100 / s;
                    break;
                }
            }
        }
        //    for (var i = 0; i < controllerScope.sectionPageCollection[0].ELearningSectionPage.length; i++) {
        //     if (controllerScope.sectionPageCollection[0].ELearningSectionPage[i].ELearningSectionPageId == id) {
        //         controllerScope.currentPage = i + 1;
        //         break;
        //     }
        //}
        //  for (var j = 0; j < controllerScope.eLearningLectureCollection[0].ELearningSection[this.$scope.currentIndex].ELearningSectionPage.length; j++) {
        //      if (controllerScope.eLearningLectureCollection[0].ELearningSection[controllerScope.currentContentIndex].ELearningSectionPage[j].ELearningSectionPageId == id) {
        //          controllerScope.eLearningLectureCollection[0].ELearningSection[controllerScope.currentContentIndex].Width = this.$scope.currentPage * 100 / controllerScope.sectionPageCollection[0].ELearningSectionPage.length;
        //          controllerScope.progressWidth = 100;
        //          break;
        //      } 
        //}
    };
    eLearningLecturePageController.prototype.viewInteractiveDetail = function (id) {
        var _this = this;
        var promise = this.eLearningLecturePageService.viewInteractiveDetail(id);
        promise.then(function (result) {
            _this.$log.log("get content Id" + result.ContentId);
            _this.$location.path("/ELearning/Participate/" + result.ContentId);
        });
    };
    eLearningLecturePageController.prototype.exceptionMessageDisplayDialog = function (errorMessage) {
        var controllerScope = this.$scope;
        controllerScope.exceptionMessage = errorMessage;
        this.catchConfirmationModal = this.$modal.open({
            templateUrl: 'catchErrorMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    eLearningLecturePageController.prototype.closeCatchDialogBox = function () {
        this.catchConfirmationModal.dismiss('cancel');
    };
    eLearningLecturePageController.controllerId = "eLearningLecturePageController";
    return eLearningLecturePageController;
}());
app.controller(eLearningLecturePageController.controllerId, ['$scope', '$log', '$resource', '$location', '$routeParams', '$sce', 'eLearningLecturePageService', '$rootScope', '$modal', 'apiPath',
    function ($scope, $log, $resource, $location, $routeParams, $sce, eLearningLecturePageService, $rootScope, $modal, apiPath) {
        return new eLearningLecturePageController($scope, $log, $resource, $location, $routeParams, $sce, eLearningLecturePageService, $rootScope, $modal, apiPath);
    }
]);
//# sourceMappingURL=ELearningLecturePageController.js.map
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../services/elearningcontent/elearningcontentservice.ts" />
var eLearningContentController = (function () {
    function eLearningContentController($scope, $log, eLearningContentService, $location, $upload, $http, $modal, $rootScope, $window, $routeParams, $sce, apiPath, ngToast, $timeout) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.eLearningContentService = eLearningContentService;
        this.$location = $location;
        this.$upload = $upload;
        this.$http = $http;
        this.$modal = $modal;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$routeParams = $routeParams;
        this.$sce = $sce;
        this.apiPath = apiPath;
        this.ngToast = ngToast;
        this.$timeout = $timeout;
        this.$scope.eLearningContentList = function () { return _this.eLearningContentList(); };
        this.$scope.eLearningContentCollection = [];
        this.$scope.itemsPerPage = 10;
        this.$scope.currentPage = 1;
        this.$scope.maxSize = 10;
        this.$scope.bigTotalItems = 175;
        this.$scope.bigCurrentPage = 1;
        this.$scope.rate = 0;
        this.$scope.max = 5;
        this.$scope.hoveringOver = function (value, content) { return _this.hoveringOver(value, content); };
        this.$scope.ratingStates = [
            { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
            { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
            { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
            { stateOn: 'glyphicon-heart' },
            { stateOff: 'glyphicon-off' }
        ];
        this.$scope.viewCreatorDetails = function (id) { return _this.viewCreatorDetails(id); };
        this.$scope.closeUserDetailDialogBox = function () { return _this.closeUserDetailDialogBox(); };
        this.$scope.userCollection = [];
        this.$scope.handleCreateELearningEvent = function () { return _this.handleCreateELearningEvent(); };
        this.$scope.isProfileCreated = false;
        this.$scope.viewContentDetail = function () { return _this.viewContentDetail(); };
        this.$scope.isCollapsed = true;
        this.$scope.contentCollection = [];
        this.$scope.viewContentDetails = false;
        this.$scope.eLearningSectionDetailById = function (id) { return _this.eLearningSectionDetailById(id); };
        //this.initialize();
        this.$scope.eLearningSectionPageList = [];
        this.$scope.eLearningSectionDetail = function () { return _this.eLearningSectionDetail(); };
        this.$scope.myInterval = 5000;
        this.$scope.itemPerCurrentPage = 1;
        this.$scope.deleteConfirmationDialog = function (id) { return _this.deleteConfiramtionDialog(id); };
        this.$scope.closeDeleteDialogBox = function () { return _this.closeDeleteDialogBox(); };
        this.$scope.editELearningContent = function (id) { return _this.editELearningContent(id); };
        this.$scope.deleteELearningContentById = function (id) { return _this.deleteELearningContentById(id); };
        this.$scope.isLoading = false;
        this.$scope.openELearningLecturePage = function (id, lecId) { return _this.openELearningLecturePage(id, lecId); };
        this.$scope.getAllInteractiveQuestions = function (id) { return _this.getAllInteractiveQuestions(id); };
        this.$scope.getInteractiveResult = function (id) { return _this.getInteractiveResult(id); };
        this.$scope.errorMessage = "";
        this.$scope.contentErrorMessageDisplay = false;
        this.$scope.contentDetailErrorMessageDisplay = false;
        this.$scope.creatorDetailErrorMessageDisplay = false;
        this.$scope.fblink = this.$sce.trustAsResourceUrl('http://www.facebook.com/sharer.php?u=' + apiPath);
        this.$scope.maillink = this.$sce.trustAsResourceUrl('mailto:?to=&subject=LearningCenter%20&body=I wanted to share this course on LearningCenter with you ' + apiPath);
        //mailto:?to=&subject=LearningCenter%20examples&body=I wanted to share this course on LearningCenter with you
        this.$scope.twitterlink = this.$sce.trustAsResourceUrl('http://twitter.com/home?status=LearningCenter ' + apiPath);
        this.$scope.viewInteractiveDetails = function (id) { return _this.viewInteractiveDetails(id); };
        this.$scope.isDialogOpen = false;
        this.$scope.isDeleteDialogOpen = false;
        this.$scope.contentDetail = function (id) { return _this.contentDetail(id); };
        this.$scope.isCreateELeaningContentDialogOpen = false;
        this.$scope.closeContentCreateDialogBox = function () { return _this.closeContentCreateDialogBox(); };
        this.$scope.redirectToProfilePage = function () { return _this.redirectToProfilePage(); };
        this.$scope.contentLoading = false;
        this.$scope.exceptionMessage = "";
        this.$scope.closeCatchDialogBox = function () { return _this.closeCatchDialogBox(); };
        this.$scope.exceptionMessageDisplayDialog = function (exceptionMessage) { return _this.exceptionMessageDisplayDialog(exceptionMessage); };
        this.$scope.elearningSectionErrorMessageDisplay = false;
        this.$scope.getAllMyContentsList = function () { return _this.getAllMyContentList(); };
        this.$scope.mycontentDisplayButton = false;
        this.$scope.entryLimit = 10; //max rows for data table
        this.$scope.noOfPages = 0;
        this.$scope.filtered = 0;
        this.$scope.filter = function () { return _this.filter(); };
        this.$scope.serachFilter = 0;
    }
    //private initialize() {
    //   // this.eLearningContentList();
    //}
    eLearningContentController.prototype.eLearningContentList = function () {
        var _this = this;
        var controllerScope = this.$scope;
        this.$scope.eLearningContentCollection = [];
        controllerScope.contentErrorMessageDisplay = false;
        controllerScope.totalCollection = [];
        var contentList = this.$scope.eLearningContentCollection;
        controllerScope.mycontentDisplayButton = true;
        var promise = this.eLearningContentService.eLearningContentList();
        this.$scope.isLoading = true;
        promise.then(function (response) {
            if (response.length == 0) {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            }
            else {
                _this.$log.log("Get All ELearningContent List successfully");
                for (var i = 0; i < response.length; i++) {
                    contentList.push(response[i]);
                }
                var that = _this;
                _this.$scope.$watch("currentPage + itemsPerPage", function () {
                    controllerScope.totalCollection = [];
                    var begin = ((that.$scope.currentPage - 1) * that.$scope.itemsPerPage), end = begin + that.$scope.itemsPerPage;
                    controllerScope.totalCollection = contentList.slice(begin, end);
                    that.$log.log("Current Page ", controllerScope.totalCollection);
                });
                /* init pagination with $scope.list */
                // controllerScope.noOfPages
                //controllerScope.noOfPages = Math.ceil(controllerScope.eLearningContentCollection.length / controllerScope.entryLimit);
                controllerScope.totalItems = controllerScope.eLearningContentCollection.length;
                that.$scope.isLoading = false;
            }
        }).catch(function (error) {
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.isLoading = false;
            }
            else if (error.status == 500) {
                controllerScope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    eLearningContentController.prototype.hoveringOver = function (value, content) {
        var _this = this;
        if (content.IsReadonly == false) {
            this.$scope.overStar = content.Rate;
            for (var i = 0; i < this.$scope.eLearningContentCollection.length; i++) {
                if (this.$scope.eLearningContentCollection[i].ContentId == content.ContentId) {
                    this.$scope.eLearningContentCollection[i].Rate = content.Rate;
                    break;
                }
                this.$log.log('ReadOnly ELearning Content Rate' + content.Rate);
            }
        }
        else {
            content.Rate = value;
            var promise = this.eLearningContentService.updateELearningContentRate(content);
            promise.then(function (result) {
                _this.$scope.overStar = result.Rate;
                for (var j = 0; j < _this.$scope.eLearningContentCollection.length; j++) {
                    if (_this.$scope.eLearningContentCollection[j].ContentId == content.ContentId) {
                        _this.$scope.eLearningContentCollection[j].Rate = result.Rate;
                        break;
                    }
                }
                _this.$log.log('Update ELearning Content Rate successfully');
            }).catch(function () {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                location.replace(_this.apiPath);
            });
        }
    };
    eLearningContentController.prototype.viewCreatorDetails = function (id) {
        var _this = this;
        //   this.$scope.contentErrorMessageDisplay = false;
        //  this.$scope.contentDetailErrorMessageDisplay = false;
        if (this.$scope.isDialogOpen == false) {
            this.$scope.isDialogOpen = true;
            var promise = this.eLearningContentService.viewCreatorDetails(id);
            promise.then(function (result) {
                _this.$scope.userCollection = [];
                var userList = _this.$scope.userCollection;
                for (var i = 0; i < result.length; i++) {
                    _this.$log.log('get user Details successfully.');
                    if (result[i].ProfilePicGuid == null) {
                        result[i].ProfilePicGuid = stringConstatnts.profilePicDefaultUrl;
                    }
                    userList.push(result[i]);
                }
                _this.openUserDetailModal = _this.$modal.open({
                    templateUrl: 'viewCreatorDetail',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'lg',
                    scope: _this.$scope,
                });
                _this.$scope.isDialogOpen = false;
            }).catch(function (error) {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
            });
        }
    };
    eLearningContentController.prototype.closeUserDetailDialogBox = function () {
        this.openUserDetailModal.dismiss('cancel');
    };
    eLearningContentController.prototype.viewContentDetail = function () {
        var _this = this;
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
        //   this.$scope.contentErrorMessageDisplay = false;
        this.$scope.contentLoading = true;
        var promise = this.eLearningContentService.viewContentDetail(contentId);
        promise.then(function (response) {
            _this.$log.log("get Content Details successfully");
            controllerScope.contentCollection = [];
            var contentCollectionTable = controllerScope.contentCollection;
            for (var i = 0; i < response.length; i++) {
                if (response[i].UserImageGuid == null) {
                    response[i].UserImageGuid = stringConstatnts.profilePicDefaultUrl;
                }
                contentCollectionTable.push(response[i]);
            }
            controllerScope.contentLoading = false;
        }).catch(function (error) {
            _this.$scope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.contentLoading = false;
            }
            else if (error.status == 500) {
                controllerScope.contentDetailErrorMessageDisplay = true;
                controllerScope.contentLoading = false;
            }
            else {
                // controllerScope.contentLoading = false;
                location.replace(_this.apiPath);
            }
        });
    };
    eLearningContentController.prototype.eLearningSectionDetailById = function (id) {
        this.$scope.eLearningSectionId = id;
        this.$location.path("/ELearning/ViewSectionDetail/" + this.$scope.eLearningSectionId);
    };
    eLearningContentController.prototype.eLearningSectionDetail = function () {
        var _this = this;
        var controllerScope = this.$scope;
        var sectionId = this.$routeParams.id;
        var promise = this.eLearningContentService.eLearningSectionDetail(sectionId);
        promise.then(function (result) {
            _this.$log.log('get ELearningSection Page Details successfully');
            _this.$scope.eLearningSectionPageList = [];
            var selectionPageList = _this.$scope.eLearningSectionPageList;
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].ELearningSectionPage.length; j++) {
                    switch (result[i].ELearningSectionPage[j].SectionContentType) {
                        case "video":
                            {
                                if (result[i].ELearningSectionPage[j].YouTubeLink == null) {
                                    selectionPageList.push(result[i].ELearningSectionPage[j]);
                                    break;
                                }
                                else {
                                    //result[i].ELearningSectionPage[j].SectionContentFileGuid = this.$sce.trustAsResourceUrl(result[i].ELearningSectionPage[j].EmbeddedYouTubeLink);
                                    result[i].ELearningSectionPage[j].SectionContentFileGuid = result[i].ELearningSectionPage[j].YouTubeLink;
                                    selectionPageList.push(result[i].ELearningSectionPage[j]);
                                    break;
                                }
                            }
                        default:
                            {
                                selectionPageList.push(result[i].ELearningSectionPage[j]);
                                break;
                            }
                    }
                }
                var that = _this;
                _this.$scope.$watch("currentPage + itemPerCurrentPage", function () {
                    _this.$scope.totalPageCollection = [];
                    var begin = ((that.$scope.currentPage - 1) * that.$scope.itemPerCurrentPage), end = begin + that.$scope.itemPerCurrentPage;
                    controllerScope.totalPageCollection = selectionPageList.slice(begin, end);
                    _this.$log.log(controllerScope.totalPageCollection);
                });
                controllerScope.totalPageItem = controllerScope.eLearningSectionPageList.length;
            }
        }).catch(function (error) {
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
            }
            else if (error.status == 500) {
                controllerScope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.elearningSectionErrorMessageDisplay = true;
            }
            else {
                // controllerScope.contentLoading = false;
                location.replace(_this.apiPath);
            }
        });
    };
    eLearningContentController.prototype.handleCreateELearningEvent = function () {
        var _this = this;
        var scope = this.$scope;
        this.$rootScope.url = stringConstatnts.elearning;
        var promise = this.eLearningContentService.getCurrentUserProfileInfo();
        promise.then(function (result) {
            //if profile is already created
            if (result.isProfileCreated) {
                _this.$location.path(stringConstatnts.createELearningContentStep1);
            }
            else {
                if (scope.isCreateELeaningContentDialogOpen == false) {
                    scope.isCreateELeaningContentDialogOpen = true;
                    _this.elearningContentHandlerModal = _this.$modal.open({
                        templateUrl: 'createcontent',
                        backdrop: 'static',
                        keyboard: true,
                        scope: _this.$scope,
                    });
                }
            }
        });
    };
    eLearningContentController.prototype.redirectToProfilePage = function () {
        this.closeContentCreateDialogBox();
        this.$location.path(stringConstatnts.profilePagePath);
    };
    eLearningContentController.prototype.closeContentCreateDialogBox = function () {
        this.$scope.isCreateELeaningContentDialogOpen = false;
        this.elearningContentHandlerModal.dismiss('cancel');
    };
    eLearningContentController.prototype.deleteConfiramtionDialog = function (id) {
        var _this = this;
        if (this.$scope.isDeleteDialogOpen == false) {
            this.$scope.isDeleteDialogOpen = true;
            var promise = this.eLearningContentService.getELearningContentById(id);
            promise.then(function (result) {
                _this.$scope.deleteContentCollection = [];
                var deleteContentList = _this.$scope.deleteContentCollection;
                for (var i = 0; i < result.length; i++) {
                    deleteContentList.push(result[i]);
                }
                _this.deleteConfirmationModal = _this.$modal.open({
                    templateUrl: 'deleteELearningContent',
                    backdrop: 'static',
                    keyboard: true,
                    scope: _this.$scope,
                });
                _this.$scope.isDeleteDialogOpen = false;
            });
        }
    };
    eLearningContentController.prototype.closeDeleteDialogBox = function () {
        this.deleteConfirmationModal.dismiss('cancel');
    };
    eLearningContentController.prototype.editELearningContent = function (id) {
        this.$location.path(stringConstatnts.createELearningContentStep1).search({ cid: id });
    };
    eLearningContentController.prototype.deleteELearningContentById = function (id) {
        var _this = this;
        var controllerScope = this;
        var controller = this.$scope;
        var promise = this.eLearningContentService.deleteELearningContentById(id);
        promise.then(function (result) {
            _this.$log.log("ELearning Delete successfully");
            controllerScope.closeDeleteDialogBox();
            controllerScope.eLearningContentList();
            controllerScope.ngToast.create(stringConstatnts.contentDelete);
        }).catch(function (error) {
            controller.errorMessage = stringConstatnts.errorMessage;
            location.replace(_this.apiPath);
        });
    };
    eLearningContentController.prototype.openELearningLecturePage = function (id, lecId) {
        this.$log.log("Open ELearning LecturePage");
        this.$rootScope.lectureId = lecId;
        this.$location.path("/ELearning/Lecture-SectionSliderPage/" + id);
    };
    eLearningContentController.prototype.getAllInteractiveQuestions = function (id) {
        // this.$rootScope.ContentTitle = title;
        this.$log.log("get content Id" + id);
        this.$location.path("/ELearning/Participate/" + id);
    };
    eLearningContentController.prototype.getInteractiveResult = function (id) {
        this.$log.log("get content Id" + id);
        //  this.$rootScope.ContentTitle = title;
        this.$location.path("/ELearning/ViewInteractiveResult/" + id);
    };
    eLearningContentController.prototype.viewInteractiveDetails = function (id) {
        var _this = this;
        var promise = this.eLearningContentService.viewInteractiveDetails(id);
        promise.then(function (result) {
            _this.$log.log("get content Id" + result.ContentId);
            _this.$location.path("/ELearning/Participate/" + result.ContentId);
        });
    };
    eLearningContentController.prototype.contentDetail = function (id) {
        this.$location.path("/ELearning/ViewCourseDetail/" + id);
    };
    eLearningContentController.prototype.exceptionMessageDisplayDialog = function (exceptionMessage) {
        var controllerScope = this.$scope;
        controllerScope.exceptionMessage = exceptionMessage;
        this.catchConfirmationModal = this.$modal.open({
            templateUrl: 'catchErrorMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    eLearningContentController.prototype.closeCatchDialogBox = function () {
        this.catchConfirmationModal.dismiss('cancel');
    };
    eLearningContentController.prototype.getAllMyContentList = function () {
        var controllerScope = this.$scope;
        var thatScope = this;
        this.$scope.eLearningContentCollection = [];
        controllerScope.mycontentDisplayButton = false;
        controllerScope.isLoading = true;
        controllerScope.totalCollection = [];
        controllerScope.contentErrorMessageDisplay = false;
        var contentList = this.$scope.eLearningContentCollection;
        var promise = this.eLearningContentService.getAllMyContentList();
        promise.then(function (response) {
            if (response.length == 0) {
                controllerScope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            }
            else {
                for (var i = 0; i < response.length; i++) {
                    contentList.push(response[i]);
                }
                controllerScope.$watch("currentPage + itemsPerPage", function () {
                    controllerScope.totalCollection = [];
                    var begin = ((controllerScope.currentPage - 1) * controllerScope.itemsPerPage), end = begin + controllerScope.itemsPerPage;
                    controllerScope.totalCollection = contentList.slice(begin, end);
                    thatScope.$log.log("Current Page ", controllerScope.totalCollection);
                });
                controllerScope.totalItems = controllerScope.eLearningContentCollection.length;
                controllerScope.isLoading = false;
            }
        }).catch(function (error) {
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.isLoading = false;
            }
            else if (error.status == 500) {
                controllerScope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            }
            else {
                location.replace(this.apiPath);
            }
        });
    };
    eLearningContentController.prototype.filter = function () {
        var _this = this;
        var controllerScope = this.$scope;
        controllerScope.totalItems = 0;
        this.$timeout(function () {
            //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            controllerScope.serachFilter = Math.ceil(controllerScope.totalCollection.length / controllerScope.entryLimit);
            if (controllerScope.serachFilter == 0) {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
            }
            else {
                controllerScope.totalItems = controllerScope.totalCollection.length;
                controllerScope.contentErrorMessageDisplay = false;
            }
        }, 10);
    };
    eLearningContentController.controllerId = "eLearningContentController";
    return eLearningContentController;
}());
app.controller(eLearningContentController.controllerId, ['$scope', '$log', 'eLearningContentservice', '$location', '$upload', '$http', '$modal', '$rootScope', '$window', '$routeParams', '$sce', 'apiPath', 'ngToast', '$timeout',
    function ($scope, $log, eLearningContentService, $location, $upload, $http, $modal, $rootScope, $window, $routeParams, $sce, apiPath, ngToast, $timeout) {
        return new eLearningContentController($scope, $log, eLearningContentService, $location, $upload, $http, $modal, $rootScope, $window, $routeParams, $sce, apiPath, ngToast, $timeout);
    }
]);
//# sourceMappingURL=ELearningContentController.js.map
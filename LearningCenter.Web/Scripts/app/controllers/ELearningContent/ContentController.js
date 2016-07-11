/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
var contentController = (function () {
    function contentController($scope, contentService, $modal, $log, $timeout) {
        var _this = this;
        this.$scope = $scope;
        this.contentService = contentService;
        this.$modal = $modal;
        this.$log = $log;
        this.$timeout = $timeout;
        this.$scope.getContentList = function () { return _this.getContentList(); };
        this.$scope.eLearningContentCollection = [];
        this.$scope.isLoading = false;
        this.$scope.contentErrorMessageDisplay = false;
        this.$scope.totalCollection = [];
        this.$scope.itemsPerPage = 10;
        this.$scope.currentPage = 1;
        this.$scope.maxSize = 20;
        this.$scope.bigTotalItems = 175;
        this.$scope.bigCurrentPage = 1;
        this.$scope.rate = 0;
        this.$scope.max = 5;
        this.$scope.viewCreatorDetails = function (id) { return _this.viewCreatorDetails(id); };
        this.$scope.closeUserDetailDialogBox = function () { return _this.closeUserDetailDialogBox(); };
        this.$scope.isDialogOpen = false;
        this.$scope.serachFilter = 0;
        this.$scope.entryLimit = 10;
        this.$scope.filter = function () { return _this.filter(); };
    }
    contentController.prototype.getContentList = function () {
        var _this = this;
        var controllerScope = this.$scope;
        this.$scope.eLearningContentCollection = [];
        var contentList = this.$scope.eLearningContentCollection;
        var promise = this.contentService.getContentList();
        this.$scope.isLoading = true;
        promise.then(function (response) {
            if (response.length == 0) {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            }
            else {
                _this.$log.log('Get All ELearningContent List successfully ');
                for (var i = 0; i < response.length; i++) {
                    contentList.push(response[i]);
                }
                var that = _this;
                _this.$scope.$watch("currentPage + itemsPerPage", function () {
                    controllerScope.totalCollection = [];
                    var begin = ((that.$scope.currentPage - 1) * that.$scope.itemsPerPage), end = begin + that.$scope.itemsPerPage;
                    controllerScope.totalCollection = contentList.slice(begin, end);
                    _this.$log.log("Current Page ", controllerScope.totalCollection);
                });
                that.$scope.totalItems = controllerScope.eLearningContentCollection.length;
                that.$scope.isLoading = false;
            }
        }).catch(function () {
            //location.replace(this.apiPath);
            controllerScope.errorMessage = stringConstatnts.errorMessage;
            controllerScope.contentErrorMessageDisplay = true;
            controllerScope.isLoading = false;
        });
    };
    contentController.prototype.viewCreatorDetails = function (id) {
        var _this = this;
        if (this.$scope.isDialogOpen == false) {
            this.$scope.isDialogOpen = true;
            var promise = this.contentService.viewCreatorDetails(id);
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
            }).catch(function () {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
            });
        }
    };
    contentController.prototype.closeUserDetailDialogBox = function () {
        this.openUserDetailModal.dismiss('cancel');
    };
    contentController.prototype.filter = function () {
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
    contentController.controllerId = "contentController";
    return contentController;
}());
app.controller(contentController.controllerId, ['$scope', 'contentService', '$modal', '$log', '$timeout', function ($scope, contentService, $modal, $log, $timeout) {
        return new contentController($scope, contentService, $modal, $log, $timeout);
    }
]);
//# sourceMappingURL=ContentController.js.map
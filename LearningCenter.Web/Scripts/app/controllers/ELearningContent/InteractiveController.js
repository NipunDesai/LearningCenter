/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var interactiveController = (function () {
    function interactiveController($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath, $timeout) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.$sce = $sce;
        this.interactiveService = interactiveService;
        this.$modal = $modal;
        this.apiPath = apiPath;
        this.$timeout = $timeout;
        this.$scope.getAllInteractiveQuestions = function () { return _this.getAllInteractiveQuestions(); };
        this.$scope.interactiveTreeViewCollection = [];
        this.$scope.treeViewCollection = [];
        this.$scope.saveInteractiveResult = function (id) { return _this.saveInteractiveResult(id); };
        this.$scope.getAllInteractiveResult = function () { return _this.getAllInteractiveResult(); };
        this.$scope.closeResultConfirmationDialog = function () { return _this.closeResultConfirmationDialog(); };
        this.$scope.userInteractiveResult = false;
        this.$scope.interactiveResultCollection = [];
        this.$scope.getAllInteractiveQuestion = function (id) { return _this.getAllInteractiveQuestion(id); };
        this.$scope.interactiveQuestionCollection = [];
        this.$scope.getInteractiveQuestionById = function (id) { return _this.getInteractiveQuestionById(id); };
        this.$scope.isCollapsed = false;
        this.$scope.getAllUserName = function () { return _this.getAllUserName(); };
        this.$scope.getAllUserCollection = [];
        this.$scope.getInteractiveResultByUserId = function (id) { return _this.getInteractiveResultByUserId(id); };
        this.$scope.getInteractiveResult = function () { return _this.getInteractiveResult(); };
        this.$scope.errorMessage = "";
        this.$scope.interactiveErrorMessageDisplay = false;
        this.$scope.interactiveResultErrorMessageDisplay = false;
        this.$scope.nullInteractiveResult = false;
        this.$scope.interactiveLoading = false;
        this.$scope.interactiveResultLoading = false;
        this.$scope.treeCollection = [];
        this.$scope.viewIntrectivePortionByIntrectiveQuestionId = function (id) { return _this.viewIntrectivePortionByIntrectiveQuestionId(id); };
        this.$scope.ContentTitle = "";
        this.$scope.questionResultLoding = false;
        this.$scope.studentResultLoding = false;
        this.$scope.participatePartLoding = false;
        this.$scope.exceptionMessage = "";
        this.$scope.exceptionMessageDisplayDialog = function (errorMessage) { return _this.exceptionMessageDisplayDialog(errorMessage); };
        this.$scope.closeCatchDialogBox = function () { return _this.closeCatchDialogBox(); };
        this.$scope.intrectiveNoDataFoundMessage = false;
        this.initialize();
    }
    interactiveController.prototype.initialize = function () {
        //this.getAllInteractiveQuestions();
    };
    interactiveController.prototype.getAllInteractiveQuestions = function () {
        var _this = this;
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
        controllerScope.treeViewCollection = [];
        var that = this;
        controllerScope.interactiveLoading = true;
        var promise = that.interactiveService.getAllInteractiveQuestions(contentId);
        promise.then(function (result) {
            if (result.length == 0) {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.interactiveLoading = false;
                controllerScope.interactiveErrorMessageDisplay = true;
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    controllerScope.ContentTitle = result[i].ContentTitle;
                    controllerScope.treeCollection.push(result[i]);
                }
                controllerScope.userInteractiveResult = false;
                controllerScope.interactiveLoading = false;
                _this.$log.log("Get all Intrective Question SuccessFully");
            }
        }).catch(function (error) {
            _this.$scope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.interactiveLoading = false;
            }
            else if (error.status == 500) {
                controllerScope.interactiveErrorMessageDisplay = true;
                controllerScope.interactiveLoading = false;
            }
            else {
                location.replace(_this.apiPath);
            }
            //this.$scope.interactiveErrorMessageDisplay = true;
        });
    };
    interactiveController.prototype.saveInteractiveResult = function (id) {
        var _this = this;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.saveInteractiveResult(id);
        promise.then(function (result) {
            _this.$log.log("Intrective Result save successfully");
            if (result.UserResponse == true) {
                _this.resultConfirmationModal = _this.$modal.open({
                    templateUrl: 'resultConfirmation',
                    backdrop: 'static',
                    keyboard: true,
                    scope: _this.$scope,
                });
            }
            else {
                _this.$location.path("/CourseList");
            }
        }).catch(function (error) {
            if (error.status == 0 || error.status == 500) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
            }
            else {
                _this.$scope.errorMessage = stringConstatnts.errorMessage;
                location.replace(_this.apiPath);
            }
        });
    };
    interactiveController.prototype.getAllInteractiveResult = function () {
        var _this = this;
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getAllInteractiveResult(contentId);
        promise.then(function (result) {
            for (var i = 0; i < result.length; i++) {
                controllerScope.interactiveTreeViewCollection.push(result[i]);
            }
            _this.$log.log("get all interactive result successfully.");
        }).catch(function (error) {
            _this.$scope.errorMessage = stringConstatnts.errorMessage;
            location.replace(_this.apiPath);
        });
    };
    interactiveController.prototype.closeResultConfirmationDialog = function () {
        this.resultConfirmationModal.dismiss('cancel');
        this.$location.path("/CourseList");
    };
    interactiveController.prototype.getAllInteractiveQuestion = function (id) {
        var _this = this;
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getAllInteractiveQuestion(contentId);
        controllerScope.intrectiveNoDataFoundMessage = false;
        this.$scope.interactiveResultLoading = true;
        promise.then(function (result) {
            controllerScope.interactiveQuestionCollection = [];
            var questionCollection = controllerScope.interactiveQuestionCollection;
            for (var i = 0; i < result.length; i++) {
                _this.$scope.ContentTitle = result[i].ContentTitle;
                questionCollection.push(result[i]);
            }
            _this.$log.log("get all interactive Question successfully");
            _this.$scope.interactiveResultLoading = false;
        }).catch(function (error) {
            _this.$scope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.interactiveResultLoading = false;
            }
            else if (error.status == 500) {
                controllerScope.intrectiveNoDataFoundMessage = true;
                controllerScope.interactiveResultLoading = false;
            }
            else {
                controllerScope.errorMessage = stringConstatnts.errorMessage;
                //controllerScope.nullInteractiveResult = true;
                location.replace(_this.apiPath);
            }
        });
    };
    interactiveController.prototype.getInteractiveQuestionById = function (id) {
        var _this = this;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getInteractiveQuestionById(id);
        this.$scope.questionResultLoding = true;
        controllerScope.intrectiveNoDataFoundMessage = false;
        promise.then(function (result) {
            if (result.length == 0) {
                for (var k = 0; k < controllerScope.interactiveQuestionCollection.length; k++) {
                    if (controllerScope.interactiveQuestionCollection[k].InteractiveQuestionId == id) {
                        //controllerScope.getAllUserCollection[j].IsError = true;
                        if (controllerScope.interactiveQuestionCollection[k].IsError == true) {
                            controllerScope.interactiveQuestionCollection[k].IsError = false;
                            controllerScope.interactiveQuestionCollection[k].isCollapsed = false;
                        }
                        else {
                            controllerScope.interactiveQuestionCollection[k].IsError = true;
                            controllerScope.interactiveQuestionCollection[k].isCollapsed = true;
                        }
                        //  this.$scope.interactiveResultErrorMessageDisplay = true;
                        controllerScope.questionResultLoding = false;
                        _this.$scope.errorMessage = stringConstatnts.errorMessage;
                    }
                    else {
                        controllerScope.interactiveQuestionCollection[k].IsError = false;
                        controllerScope.interactiveQuestionCollection[k].isCollapsed = false;
                        controllerScope.questionResultLoding = false;
                    }
                }
            }
            else {
                _this.$log.log("get interactive result successfully");
                for (var j = 0; j < controllerScope.interactiveQuestionCollection.length; j++) {
                    if (controllerScope.interactiveQuestionCollection[j].InteractiveQuestionId == id) {
                        controllerScope.interactiveQuestionCollection[j].ResultAc = result;
                        controllerScope.interactiveQuestionCollection[j].IsError = false;
                        if (controllerScope.interactiveQuestionCollection[j].isCollapsed == true) {
                            controllerScope.interactiveQuestionCollection[j].isCollapsed = false;
                        }
                        else {
                            controllerScope.interactiveQuestionCollection[j].isCollapsed = true;
                        }
                        controllerScope.questionResultLoding = false;
                    }
                    else {
                        controllerScope.interactiveQuestionCollection[j].IsError = false;
                        controllerScope.interactiveQuestionCollection[j].ResultAc = null;
                        controllerScope.interactiveQuestionCollection[j].isCollapsed = false;
                        controllerScope.questionResultLoding = false;
                    }
                }
            }
        }).catch(function (error) {
            controllerScope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.questionResultLoding = false;
            }
            else if (error.status == 500) {
                controllerScope.intrectiveNoDataFoundMessage = false;
                controllerScope.questionResultLoding = false;
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    interactiveController.prototype.getAllUserName = function () {
        var _this = this;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getAllUserName();
        promise.then(function (result) {
            controllerScope.userInteractiveResult = true;
            controllerScope.getAllUserCollection = [];
            var userCollection = controllerScope.getAllUserCollection;
            _this.$log.log("get all user successfully");
            for (var i = 0; i < result.length; i++) {
                userCollection.push(result[i]);
            }
        }).catch(function (error) {
            _this.$scope.errorMessage = stringConstatnts.errorMessage;
            location.replace(_this.apiPath);
        });
    };
    interactiveController.prototype.getInteractiveResultByUserId = function (id) {
        var _this = this;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getInteractiveResultByUserId(id);
        this.$scope.studentResultLoding = true;
        promise.then(function (result) {
            _this.$log.log("get interactive result by user id successfully");
            for (var j = 0; j < controllerScope.getAllUserCollection.length; j++) {
                if (controllerScope.getAllUserCollection[j].UserId == id) {
                    controllerScope.getAllUserCollection[j].ResultAc = result;
                    if (controllerScope.getAllUserCollection[j].isCollapsed == true) {
                        controllerScope.getAllUserCollection[j].isCollapsed = false;
                        controllerScope.getAllUserCollection[j].IsError = false;
                    }
                    else {
                        controllerScope.getAllUserCollection[j].isCollapsed = true;
                        controllerScope.getAllUserCollection[j].IsError = false;
                    }
                    controllerScope.studentResultLoding = false;
                }
                else {
                    controllerScope.getAllUserCollection[j].ResultAc = null;
                    controllerScope.getAllUserCollection[j].isCollapsed = false;
                    controllerScope.getAllUserCollection[j].IsError = false;
                    controllerScope.studentResultLoding = false;
                }
            }
        }).catch(function (error) {
            for (var j = 0; j < controllerScope.getAllUserCollection.length; j++) {
                if (controllerScope.getAllUserCollection[j].UserId == id) {
                    //controllerScope.getAllUserCollection[j].IsError = true;
                    if (controllerScope.getAllUserCollection[j].IsError == true) {
                        controllerScope.getAllUserCollection[j].IsError = false;
                        controllerScope.getAllUserCollection[j].isCollapsed = false;
                    }
                    else {
                        controllerScope.getAllUserCollection[j].IsError = true;
                        controllerScope.getAllUserCollection[j].isCollapsed = true;
                    }
                    //  this.$scope.interactiveResultErrorMessageDisplay = true;
                    _this.$scope.errorMessage = stringConstatnts.errorMessage;
                    controllerScope.studentResultLoding = false;
                }
                else {
                    controllerScope.getAllUserCollection[j].IsError = false;
                    controllerScope.getAllUserCollection[j].isCollapsed = false;
                    controllerScope.studentResultLoding = false;
                }
            }
        });
    };
    interactiveController.prototype.getInteractiveResult = function () {
        this.$scope.userInteractiveResult = false;
    };
    interactiveController.prototype.viewIntrectivePortionByIntrectiveQuestionId = function (id) {
        var controllerScope = this.$scope;
        this.$scope.participatePartLoding = true;
        controllerScope.treeViewCollection = [];
        this.$timeout(function () {
            for (var i = 0; i < controllerScope.treeCollection.length; i++) {
                if (controllerScope.treeCollection[i].id == id) {
                    if (controllerScope.treeCollection[i].isCollapsed == true) {
                        controllerScope.treeCollection[i].isCollapsed = false;
                    }
                    else {
                        for (var j = 0; j < controllerScope.treeCollection[i].children.length; j++) {
                            if (controllerScope.treeCollection[i].children[j].InteractiveQuestionId == id) {
                                controllerScope.treeViewCollection.push(controllerScope.treeCollection[i].children[j]);
                                controllerScope.treeCollection[i].isCollapsed = true;
                            }
                        }
                        controllerScope.participatePartLoding = false;
                    }
                }
                else {
                    controllerScope.treeCollection[i].isCollapsed = false;
                }
            }
            controllerScope.participatePartLoding = false;
        }, 1000);
    };
    interactiveController.prototype.exceptionMessageDisplayDialog = function (exceptionMessage) {
        var controllerScope = this.$scope;
        controllerScope.exceptionMessage = exceptionMessage;
        this.catchConfirmationModal = this.$modal.open({
            templateUrl: 'catchErrorMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    interactiveController.prototype.closeCatchDialogBox = function () {
        this.catchConfirmationModal.dismiss('cancel');
    };
    interactiveController.controllerId = "interactiveController";
    return interactiveController;
}());
// Update the app1 variable name to be that of your module variable
app.controller(interactiveController.controllerId, ['$scope', '$log', '$location', '$routeParams', '$sce', 'interactiveService', '$modal', 'apiPath', '$timeout',
    function ($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath, $timeout) {
        return new interactiveController($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath, $timeout);
    }
]);
//app.controller(interactiveController.controllerId, ['$scope', '$log', '$location', '$routeParams', '$sce', 'interactiveService', '$modal', 'apiPath', ($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath) => {
//    if (interactiveController.instance === undefined)
//        interactiveController.instance = new interactiveController($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath);
//    return interactiveController.instance;
//}]); 
//# sourceMappingURL=InteractiveController.js.map
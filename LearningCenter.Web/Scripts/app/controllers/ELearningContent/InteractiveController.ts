/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


interface IinteractiveControllerScope extends ng.IScope {
    getAllInteractiveQuestions: Function;
    interactiveTreeViewCollection: any;
    treeViewCollection:any;
    saveInteractiveResult: Function;
    getAllInteractiveResult: Function;
    closeResultConfirmationDialog: Function;
    userInteractiveResult: boolean;
    interactiveResultCollection: any;
    getAllInteractiveQuestion: Function;
    interactiveQuestionCollection: any;
    getInteractiveQuestionById: Function;
    isCollapsed: boolean;
    getAllUserName: Function;
    getAllUserCollection: any;
    getInteractiveResultByUserId: Function;
    getInteractiveResult:Function;
    errorMessage: string;
    interactiveErrorMessageDisplay: boolean;
    interactiveResultErrorMessageDisplay: boolean;
    nullInteractiveResult: boolean;
    interactiveLoading: boolean;
    interactiveResultLoading: boolean;
    treeCollection: any;
    viewIntrectivePortionByIntrectiveQuestionId :Function;
    ContentTitle: string;
    questionResultLoding: boolean;
    studentResultLoding: boolean;
    participatePartLoding: boolean;
    exceptionMessage: string;
    exceptionMessageDisplayDialog: Function;
    closeCatchDialogBox: Function;
    intrectiveNoDataFoundMessage : boolean;

}

interface IinteractiveController {
}

class interactiveController implements IinteractiveController {
    static controllerId: string = "interactiveController";
    static instance;
    public resultConfirmationModal;
    public catchConfirmationModal;
    constructor(private $scope: IinteractiveControllerScope, private $log: ng.ILogService, private $location: ng.ILocationService, private $routeParams, private $sce, public interactiveService: interactiveService, public $modal, public apiPath, private $timeout
        ) {
        this.$scope.getAllInteractiveQuestions = () => this.getAllInteractiveQuestions();
        this.$scope.interactiveTreeViewCollection = [];
        this.$scope.treeViewCollection = [];
        this.$scope.saveInteractiveResult = (id: number) => this.saveInteractiveResult(id);
        this.$scope.getAllInteractiveResult = () => this.getAllInteractiveResult();
        this.$scope.closeResultConfirmationDialog = () => this.closeResultConfirmationDialog();
        this.$scope.userInteractiveResult = false;
        this.$scope.interactiveResultCollection = [];
        this.$scope.getAllInteractiveQuestion = (id:number) => this.getAllInteractiveQuestion(id);
        this.$scope.interactiveQuestionCollection = [];
        this.$scope.getInteractiveQuestionById = (id: number) => this.getInteractiveQuestionById(id);
        this.$scope.isCollapsed = false;
        this.$scope.getAllUserName = () => this.getAllUserName();
        this.$scope.getAllUserCollection = [];
        this.$scope.getInteractiveResultByUserId = (id: number) => this.getInteractiveResultByUserId(id);
        this.$scope.getInteractiveResult = () => this.getInteractiveResult();
        this.$scope.errorMessage = "";
        this.$scope.interactiveErrorMessageDisplay = false;
        this.$scope.interactiveResultErrorMessageDisplay = false;
        this.$scope.nullInteractiveResult = false;
       
        this.$scope.interactiveLoading = false;
        this.$scope.interactiveResultLoading = false;
        this.$scope.treeCollection = [];
        this.$scope.viewIntrectivePortionByIntrectiveQuestionId = (id: number) => this.viewIntrectivePortionByIntrectiveQuestionId(id);
        this.$scope.ContentTitle = "";
        this.$scope.questionResultLoding = false;
        this.$scope.studentResultLoding = false;
        this.$scope.participatePartLoding = false;
        this.$scope.exceptionMessage = "";
        this.$scope.exceptionMessageDisplayDialog = (errorMessage : string) => this.exceptionMessageDisplayDialog(errorMessage);
        this.$scope.closeCatchDialogBox = () => this.closeCatchDialogBox();
        this.$scope.intrectiveNoDataFoundMessage = false;
        this.initialize();
    }

    private initialize() {
        //this.getAllInteractiveQuestions();
    }

    private getAllInteractiveQuestions() {
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
        controllerScope.treeViewCollection = [];
        var that = this;
        controllerScope.interactiveLoading = true;
        var promise = that.interactiveService.getAllInteractiveQuestions(contentId);
        promise.then((result) => {
            if (result.length == 0) {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.interactiveLoading = false;
                controllerScope.interactiveErrorMessageDisplay = true;
            } else {
               
                for (var i = 0; i < result.length; i++) {
                    controllerScope.ContentTitle = result[i].ContentTitle;
                    controllerScope.treeCollection.push(result[i]);
                    //for (var j = 0; j < result[i].children.length; j++) {
                    //    controllerScope.treeViewCollection.push(result[i].children[j]); 
                    //}
                      
                }
                controllerScope.userInteractiveResult = false;
                controllerScope.interactiveLoading = false;
                this.$log.log("Get all Intrective Question SuccessFully");
            }
           
        }).catch((error) => {
            this.$scope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.interactiveLoading = false;
            } else if (error.status == 500) {
                controllerScope.interactiveErrorMessageDisplay = true;
                controllerScope.interactiveLoading = false;
            } else {
                location.replace(this.apiPath);
            }
          
            //this.$scope.interactiveErrorMessageDisplay = true;
          
        });
    }

    private saveInteractiveResult(id) {
        var controllerScope = this.$scope;
        var promise = this.interactiveService.saveInteractiveResult(id);
        promise.then((result) => {
            this.$log.log("Intrective Result save successfully");
            if (result.UserResponse == true) {
                this.resultConfirmationModal = this.$modal.open({
                    templateUrl: 'resultConfirmation',
                    backdrop: 'static',
                    keyboard: true,
                    scope: this.$scope,
                });
            } else {
                this.$location.path("/CourseList");
            }
           
        }).catch((error) => {
            if (error.status == 0 || error.status == 500) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
            } else {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
                location.replace(this.apiPath);
            }
           });
    }

    private getAllInteractiveResult() {
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getAllInteractiveResult(contentId);
        promise.then((result) => {
            for (var i = 0; i < result.length; i++) {
                controllerScope.interactiveTreeViewCollection.push(result[i]);
            }
            this.$log.log("get all interactive result successfully.");
        }).catch((error) => {
            this.$scope.errorMessage = stringConstatnts.errorMessage;
            location.replace(this.apiPath);
        });
    }

    private closeResultConfirmationDialog() {
        this.resultConfirmationModal.dismiss('cancel');
        this.$location.path("/CourseList");
    }

   private getAllInteractiveQuestion(id) {
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
       var promise = this.interactiveService.getAllInteractiveQuestion(contentId);
       controllerScope.intrectiveNoDataFoundMessage = false;
       this.$scope.interactiveResultLoading = true;
        promise.then((result) => {

            controllerScope.interactiveQuestionCollection = [];
            var questionCollection = controllerScope.interactiveQuestionCollection;
            for (var i = 0; i < result.length; i++) {
                this.$scope.ContentTitle = result[i].ContentTitle;
                questionCollection.push(result[i]);
            }
            this.$log.log("get all interactive Question successfully");
            this.$scope.interactiveResultLoading = false;
        }).catch((error) => {
            this.$scope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.interactiveResultLoading = false;
            }
            else if (error.status == 500) {
                controllerScope.intrectiveNoDataFoundMessage = true;
               controllerScope.interactiveResultLoading = false;
           } else {
               controllerScope.errorMessage = stringConstatnts.errorMessage;
               //controllerScope.nullInteractiveResult = true;
               location.replace(this.apiPath);
            }
         
        });
    }

    private getInteractiveQuestionById(id) {
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getInteractiveQuestionById(id);
        this.$scope.questionResultLoding = true;
        controllerScope.intrectiveNoDataFoundMessage = false;
        promise.then((result) => {

            if (result.length == 0) {
                for (var k = 0; k < controllerScope.interactiveQuestionCollection.length; k++) {
                    if (controllerScope.interactiveQuestionCollection[k].InteractiveQuestionId == id) {
                        //controllerScope.getAllUserCollection[j].IsError = true;
                        if (controllerScope.interactiveQuestionCollection[k].IsError == true) {
                            controllerScope.interactiveQuestionCollection[k].IsError = false;
                            controllerScope.interactiveQuestionCollection[k].isCollapsed = false;
                        } else {
                            controllerScope.interactiveQuestionCollection[k].IsError = true;
                            controllerScope.interactiveQuestionCollection[k].isCollapsed = true;
                        }
                        //  this.$scope.interactiveResultErrorMessageDisplay = true;
                        controllerScope.questionResultLoding = false;
                        this.$scope.errorMessage = stringConstatnts.errorMessage;
                    } else {
                        controllerScope.interactiveQuestionCollection[k].IsError = false;
                        controllerScope.interactiveQuestionCollection[k].isCollapsed = false;
                        controllerScope.questionResultLoding = false;
                    }
                }
            }
            else {
                this.$log.log("get interactive result successfully");
                for (var j = 0; j < controllerScope.interactiveQuestionCollection.length; j++) {
                    if (controllerScope.interactiveQuestionCollection[j].InteractiveQuestionId == id) {
                        controllerScope.interactiveQuestionCollection[j].ResultAc = result;
                        controllerScope.interactiveQuestionCollection[j].IsError = false;
                        if (controllerScope.interactiveQuestionCollection[j].isCollapsed == true) {
                            controllerScope.interactiveQuestionCollection[j].isCollapsed = false;
                        } else {
                            controllerScope.interactiveQuestionCollection[j].isCollapsed = true;
                        }
                        controllerScope.questionResultLoding = false;
                    } else {
                        controllerScope.interactiveQuestionCollection[j].IsError = false;
                        controllerScope.interactiveQuestionCollection[j].ResultAc = null;
                        controllerScope.interactiveQuestionCollection[j].isCollapsed = false;
                        controllerScope.questionResultLoding = false;
                    }
                }
            }
        }).catch((error) => {
            controllerScope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.questionResultLoding = false;
            }
            else if (error.status == 500) {
                controllerScope.intrectiveNoDataFoundMessage = false;
                controllerScope.questionResultLoding = false;
            } else {
                location.replace(this.apiPath);
            }
        });
    }

    private getAllUserName() {
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getAllUserName();
        promise.then((result) => {
            controllerScope.userInteractiveResult = true;
           controllerScope.getAllUserCollection = [];
            var userCollection = controllerScope.getAllUserCollection;
            this.$log.log("get all user successfully");
            for (var i = 0; i < result.length; i++) {
                userCollection.push(result[i]);
            }
        }).catch((error) => {
            this.$scope.errorMessage = stringConstatnts.errorMessage;
            location.replace(this.apiPath);
        });
    }

    private getInteractiveResultByUserId(id) {
        var controllerScope = this.$scope;
        var promise = this.interactiveService.getInteractiveResultByUserId(id);
        this.$scope.studentResultLoding = true;
        promise.then((result) => {
            this.$log.log("get interactive result by user id successfully");
            for (var j = 0; j < controllerScope.getAllUserCollection.length; j++) {
                if (controllerScope.getAllUserCollection[j].UserId == id) {
                    controllerScope.getAllUserCollection[j].ResultAc = result;
                    if (controllerScope.getAllUserCollection[j].isCollapsed == true) {
                        controllerScope.getAllUserCollection[j].isCollapsed = false;
                        controllerScope.getAllUserCollection[j].IsError = false;
                    } else {
                        controllerScope.getAllUserCollection[j].isCollapsed = true;
                        controllerScope.getAllUserCollection[j].IsError = false;
                    }
                    controllerScope.studentResultLoding = false;
                } else {
               controllerScope.getAllUserCollection[j].ResultAc = null;
               controllerScope.getAllUserCollection[j].isCollapsed = false;
                    controllerScope.getAllUserCollection[j].IsError = false;
                    controllerScope.studentResultLoding = false;
                }
            }
        }).catch((error) => {
            for (var j = 0; j < controllerScope.getAllUserCollection.length; j++) {
                if (controllerScope.getAllUserCollection[j].UserId == id) {
                    //controllerScope.getAllUserCollection[j].IsError = true;
                    if (controllerScope.getAllUserCollection[j].IsError == true) {
                        controllerScope.getAllUserCollection[j].IsError = false;
                        controllerScope.getAllUserCollection[j].isCollapsed = false;
                    } else {
                        controllerScope.getAllUserCollection[j].IsError = true;
                        controllerScope.getAllUserCollection[j].isCollapsed = true;
                    }
                  //  this.$scope.interactiveResultErrorMessageDisplay = true;
                    this.$scope.errorMessage = stringConstatnts.errorMessage;
                    controllerScope.studentResultLoding = false;
                } else {
                    controllerScope.getAllUserCollection[j].IsError = false;
                    controllerScope.getAllUserCollection[j].isCollapsed = false;
                    controllerScope.studentResultLoding = false;
                }
            }
        });
    }

    private getInteractiveResult() {
        this.$scope.userInteractiveResult = false;
    }

    private viewIntrectivePortionByIntrectiveQuestionId(id) {
        var controllerScope = this.$scope;
        this.$scope.participatePartLoding = true;
        controllerScope.treeViewCollection = [];
        this.$timeout(() => {
            for (var i = 0; i < controllerScope.treeCollection.length; i++) {
                if (controllerScope.treeCollection[i].id == id) {
                    if (controllerScope.treeCollection[i].isCollapsed == true) {
                        controllerScope.treeCollection[i].isCollapsed = false;
                       // controllerScope.participatePartLoding = false;
                    } else {

                        for (var j = 0; j < controllerScope.treeCollection[i].children.length; j++) {
                            if (controllerScope.treeCollection[i].children[j].InteractiveQuestionId == id) {
                                controllerScope.treeViewCollection.push(controllerScope.treeCollection[i].children[j]);
                                controllerScope.treeCollection[i].isCollapsed = true;
//controllerScope.participatePartLoding = false;
                            }
                        }
                        controllerScope.participatePartLoding = false;
                    }
                } else {
                    controllerScope.treeCollection[i].isCollapsed = false;
                    
                }
            }
            controllerScope.participatePartLoding = false;
        },1000);
    }

    private exceptionMessageDisplayDialog(exceptionMessage) {
        var controllerScope = this.$scope;
        controllerScope.exceptionMessage = exceptionMessage;
        this.catchConfirmationModal = this.$modal.open({
            templateUrl: 'catchErrorMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    }

    private closeCatchDialogBox() {
        this.catchConfirmationModal.dismiss('cancel');
    }
}

// Update the app1 variable name to be that of your module variable
app.controller(interactiveController.controllerId,
    ['$scope', '$log', '$location', '$routeParams', '$sce', 'interactiveService', '$modal', 'apiPath','$timeout',
        ($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath, $timeout) => {
            return new interactiveController($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath, $timeout);
        }
    ]);

//app.controller(interactiveController.controllerId, ['$scope', '$log', '$location', '$routeParams', '$sce', 'interactiveService', '$modal', 'apiPath', ($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath) => {
//    if (interactiveController.instance === undefined)
//        interactiveController.instance = new interactiveController($scope, $log, $location, $routeParams, $sce, interactiveService, $modal, apiPath);
//    return interactiveController.instance;
//}]);
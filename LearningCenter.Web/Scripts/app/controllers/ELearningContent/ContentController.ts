/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />


interface IcontentControllerScope extends ng.IScope {
    getContentList: () => void;
    eLearningContentCollection: any;
    isLoading: boolean;
    errorMessage: string;
    contentErrorMessageDisplay: boolean;
    totalCollection: any;
    currentPage: any;
    itemsPerPage: any;
    totalItems: number;
    maxSize: number;
    bigTotalItems: number;
    bigCurrentPage: number;
    rate: number;
    max: number;
    viewCreatorDetails: Function;
    userCollection: any;
    closeUserDetailDialogBox: Function;
    isDialogOpen: boolean;
    serachFilter: number;
    entryLimit: number;
    filter:Function;
}

interface IcontentController {
   
}

class contentController implements IcontentController {
    static controllerId = "contentController";
    public openUserDetailModal;
    
    constructor(private $scope: IcontentControllerScope, public contentService, public $modal, private $log: ng.ILogService, private $timeout) {
        this.$scope.getContentList = () => this.getContentList();
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
        this.$scope.viewCreatorDetails = (id: number) => this.viewCreatorDetails(id);
        this.$scope.closeUserDetailDialogBox = () => this.closeUserDetailDialogBox();
        this.$scope.isDialogOpen = false;
        this.$scope.serachFilter = 0;
        this.$scope.entryLimit = 10;
        this.$scope.filter = () => this.filter();
    }

    private getContentList() {
        var controllerScope = this.$scope;
        this.$scope.eLearningContentCollection = [];
        var contentList = this.$scope.eLearningContentCollection;
        var promise = this.contentService.getContentList();
        this.$scope.isLoading = true;
        promise.then((response) => {
            if (response.length == 0) {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            } else {
                this.$log.log('Get All ELearningContent List successfully ');
                for (var i = 0; i < response.length; i++) {
                    contentList.push(response[i]);
                }
                var that = this;
                this.$scope.$watch("currentPage + itemsPerPage", () => {
                    controllerScope.totalCollection = [];
                    var begin = ((that.$scope.currentPage - 1) * that.$scope.itemsPerPage),
                        end = begin + that.$scope.itemsPerPage;
                    controllerScope.totalCollection = contentList.slice(begin, end);
                    this.$log.log("Current Page ", controllerScope.totalCollection);
                });
                that.$scope.totalItems = controllerScope.eLearningContentCollection.length;
                that.$scope.isLoading = false;
            }
        }).catch(() => {
                //location.replace(this.apiPath);
            controllerScope.errorMessage = stringConstatnts.errorMessage;
            controllerScope.contentErrorMessageDisplay = true;
            controllerScope.isLoading = false;
            });
    }

    private viewCreatorDetails(id) {
        if (this.$scope.isDialogOpen == false) {
            this.$scope.isDialogOpen = true;
            var promise = this.contentService.viewCreatorDetails(id);
            promise.then((result) => {
                this.$scope.userCollection = [];
                var userList = this.$scope.userCollection;
                for (var i = 0; i < result.length; i++) {
                    this.$log.log('get user Details successfully.');
                    if (result[i].ProfilePicGuid == null) {
                        result[i].ProfilePicGuid = stringConstatnts.profilePicDefaultUrl;
                    }
              
                    userList.push(result[i]);
                }
                this.openUserDetailModal = this.$modal.open({
                    templateUrl: 'viewCreatorDetail',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'lg',
                    scope: this.$scope,
                });
                this.$scope.isDialogOpen = false;
            }).catch(() => {
                    this.$scope.errorMessage = stringConstatnts.errorMessage;
                });
        }
    }

    private closeUserDetailDialogBox() {
        this.openUserDetailModal.dismiss('cancel');
    }

    private filter() {
        var controllerScope = this.$scope;
        controllerScope.totalItems = 0;
        this.$timeout(() => {
            //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            controllerScope.serachFilter = Math.ceil(controllerScope.totalCollection.length / controllerScope.entryLimit);
            if (controllerScope.serachFilter == 0) {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
            } else {
                controllerScope.totalItems = controllerScope.totalCollection.length;
                controllerScope.contentErrorMessageDisplay = false;
            }
        }, 10);
    }
}


app.controller(contentController.controllerId, ['$scope', 'contentService', '$modal', '$log', '$timeout', ($scope, contentService, $modal, $log, $timeout) =>
    new contentController($scope, contentService, $modal, $log, $timeout)
]);

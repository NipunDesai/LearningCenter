/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/userservice.ts" />


interface IuserControllerScope extends ng.IScope {
    userInvitee: Model.UserInvitee;
    saveUserInvitee: Function;
    errorMessage: string;
    //clickButton: Function;
    submitted: boolean;
    successMessage: string;
    isLoading: boolean;
    exceptionMessageDisplayDialog: Function;
    closeDeleteDialogBox: Function;
    exceptionMessage: string;
}
interface IuserController {

}
class userController implements IuserController {
    static controllerId = "userController";
    public exceptionModal;
    constructor(private $scope: IuserControllerScope, private $log: ng.ILogService, public userService: userService, public $modal, public ngToast) {
        this.$scope.userInvitee = new Model.UserInvitee();
        this.$scope.saveUserInvitee = () => this.saveUserInvitee();  
        this.$scope.exceptionMessageDisplayDialog = (exceptionMessage) => this.exceptionMessageDisplayDialog(exceptionMessage);
        this.$scope.closeDeleteDialogBox = () => this.closeDeleteDialogBox();
        this.$scope.submitted = false;
        this.$scope.isLoading = false;
    }

    private saveUserInvitee() {
        var scope = this.$scope;
        scope.isLoading = true;
        var promise = this.userService.SaveUserInviteeInfo(scope.userInvitee);
        promise.then((result) => {
            scope.isLoading = false;
            if (result.successMessage != undefined) {
                scope.userInvitee = new Model.UserInvitee();
              //  scope.successMessage = result.successMessage;
                scope.errorMessage = "";
                scope.submitted = false;
                this.ngToast.create(result.successMessage);
             
            }
            else if (result.errorMessage != undefined) {
                scope.errorMessage = result.errorMessage;
                scope.successMessage = "";
            }
            this.$log.log(result);
        }).catch((error) => {
            location.replace('/');
            if (error.status == 0 || error.status == 500) {
                scope.isLoading = false;
                scope.exceptionMessage = stringConstatnts.exceptionMessage;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }

            else {
                
            }
          //  scope.isLoading = false;
            this.$log.error(error);
        });
    }

    private exceptionMessageDisplayDialog(exceptionMessage) {
        var scope = this.$scope;
        scope.exceptionMessage = "";
        scope.exceptionMessage = exceptionMessage;
        this.exceptionModal = this.$modal.open({
            templateUrl: 'catchMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    }

    private closeDeleteDialogBox() {
        this.exceptionModal.dismiss('cancel');
    }
}

app.controller(userController.controllerId, ['$scope', '$log', 'userService', '$modal', 'ngToast', ($scope, $log, userService, $modal, ngToast) => {

    return new userController($scope, $log, userService, $modal, ngToast);

}]);  
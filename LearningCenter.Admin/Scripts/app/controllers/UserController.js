/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/userservice.ts" />
var userController = (function () {
    function userController($scope, $log, userService, $modal, ngToast) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.userService = userService;
        this.$modal = $modal;
        this.ngToast = ngToast;
        this.$scope.userInvitee = new Model.UserInvitee();
        this.$scope.saveUserInvitee = function () { return _this.saveUserInvitee(); };
        this.$scope.exceptionMessageDisplayDialog = function (exceptionMessage) { return _this.exceptionMessageDisplayDialog(exceptionMessage); };
        this.$scope.closeDeleteDialogBox = function () { return _this.closeDeleteDialogBox(); };
        this.$scope.submitted = false;
        this.$scope.isLoading = false;
    }
    userController.prototype.saveUserInvitee = function () {
        var _this = this;
        var scope = this.$scope;
        scope.isLoading = true;
        var promise = this.userService.SaveUserInviteeInfo(scope.userInvitee);
        promise.then(function (result) {
            scope.isLoading = false;
            if (result.successMessage != undefined) {
                scope.userInvitee = new Model.UserInvitee();
                //  scope.successMessage = result.successMessage;
                scope.errorMessage = "";
                scope.submitted = false;
                _this.ngToast.create(result.successMessage);
            }
            else if (result.errorMessage != undefined) {
                scope.errorMessage = result.errorMessage;
                scope.successMessage = "";
            }
            _this.$log.log(result);
        }).catch(function (error) {
            location.replace('/');
            if (error.status == 0 || error.status == 500) {
                scope.isLoading = false;
                scope.exceptionMessage = stringConstatnts.exceptionMessage;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
            }
            //  scope.isLoading = false;
            _this.$log.error(error);
        });
    };
    userController.prototype.exceptionMessageDisplayDialog = function (exceptionMessage) {
        var scope = this.$scope;
        scope.exceptionMessage = "";
        scope.exceptionMessage = exceptionMessage;
        this.exceptionModal = this.$modal.open({
            templateUrl: 'catchMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    userController.prototype.closeDeleteDialogBox = function () {
        this.exceptionModal.dismiss('cancel');
    };
    userController.controllerId = "userController";
    return userController;
}());
app.controller(userController.controllerId, ['$scope', '$log', 'userService', '$modal', 'ngToast', function ($scope, $log, userService, $modal, ngToast) {
        return new userController($scope, $log, userService, $modal, ngToast);
    }]);
//# sourceMappingURL=UserController.js.map
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var apiPaths = {
    //saveUserInviteeInfo: 'Account/UserInvitee'
    saveUserInviteeInfo: 'api/admin/UserInvitee'
};
var app = angular.module('app', [
    // Angular modules 
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ngToast' // ng toaster
]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/UserInvitee', {
        templateUrl: 'Templates/UserInvitee.html'
    }).when('/', {
        templateUrl: 'Templates/AdminDashboard.html'
    });
    //$routeProvider.otherwise({ redirectTo: '/' });
});
//# sourceMappingURL=app.js.map
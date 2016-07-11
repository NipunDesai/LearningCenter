/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var apiPaths = {
 
    //saveUserInviteeInfo: 'Account/UserInvitee'

    saveUserInviteeInfo: 'api/admin/UserInvitee'

};

interface IApp extends ng.IModule {

}

var app: IApp = angular.module('app', [
// Angular modules 
    'ngResource', // $resource for REST queries
    'ngRoute',//routing
    'ui.bootstrap',//ui.bootstrap
    'ngToast'// ng toaster
    
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/UserInvitee',
        {
            templateUrl: 'Templates/UserInvitee.html'
            //controller: 'profileController'
        }).when('/',
        {
            templateUrl: 'Templates/AdminDashboard.html'

        })
   
    //$routeProvider.otherwise({ redirectTo: '/' });
});

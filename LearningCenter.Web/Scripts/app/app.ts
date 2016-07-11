/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var apiPaths = {
    getAllELearningContentList: "api/ELearningContent/getELearningContentList",
    getProfileInfo: 'api/values/getCurrentUserInfo',
    getContentCreatorName: 'api/ELearningContent/getContentCreatorName',
    createContent: 'api/ELearningContent/createContent',
    postProfileInfo: 'api/values/postCurrentUserInfo',
    updateELearningContentRate: 'api/ELearningContent/updateELearningContentRate',
    categoryList: 'api/ELearningContent/GetCategoryList',
    deleteImage: 'api/ELearningContent/DeleteImage',
    contentCreatorDetails: 'api/ELearningContent/viewCreatorDetails',
    getContentById: 'api/ELearning/GetById',
    isProfileCreated: 'api/values/IsProfileCreated',
    addLecture: 'api/ELearningContent/AddLecture',
    getLectureList: 'api/ELearningContent/GetLectureListById',
    addSection: 'api/ELearningContent/AddSection',
    viewContentDetails: 'api/ELearningContent/viewContentDetail',
    eLearningSectionDetails: 'api/ELearningContent/eLearningSectionDetail',
    addSectionPage: 'api/ELearningContent/AddSectionPageImage',
    DeleteSectionPageContent: 'api/ELearningContent/DeleteSectionPageContent',
    addSectionPageDateInHtml: 'api/ELearningContent/AddSectionPageDataInHtml',
    getELearningContentById: 'api/ELearningContent/getELearningContentById',
    deleteLectureById: 'api/ELearningContent/DeleteLectureById',
    deleteSectionById: 'api/ELearningContent/DeleteSectionById',
    deleteELearningContentById: 'api/ELearningContent/deleteELearningContentById',
    eLearningLectureById: 'api/ELearningContent/getELearningLectureById',
    viewELearningSectionById: 'api/ELearningContent/viewELearningSectionById',
    getIntrectiveQuestions: 'api/InteractiveController/getAllInteractiveQuestions',
    saveInteractiveResult: 'api/InteractiveController/saveInteractiveResult',
    getAllInteractiveResult: 'api/InteractiveController/getAllInteractiveResult',
    //  currentuserInteractiveResult: 'api/InteractiveController/currentuserInteractiveResult',
    getAllInteractiveQuestion: 'api/InteractiveController/getAllInteractiveQuestion',
    getInteractiveQuestionById:'api/InteractiveController/getInteractiveQuestionById',
    getAllUserName: 'api/InteractiveController/getAllUser',
    getInteractiveResultByUserId: 'api/InteractiveController/getInteractiveResultByUserId',
    addInteractiveQuestion: 'api/Interactive/AddInteractiveQuestion',
    addInteractiveOption: 'api/Interactive/AddInteractiveOption',
    viewInteractiveDetails: 'api/ELearningContent/viewInteractiveDetails',
    getContentList: 'api/ELearningContent/getContentList',
    saveYouTubeLink: 'api/ELearningContent/SaveYouTubeLink',
    getAllMyContentList: 'api/ELearningContent/getAllMyContentList',
    launchContent: 'api/ELearningContent/LaunchContent',
    getInteractiveDetail: 'api/InteractiveController/GetInteractiveDetailBySectionPageId'
  
};



interface IApp extends ng.IModule {
    
}


var app: IApp = angular.module('app', [
// Angular modules 
    'ngResource', // $resource for REST queries
    'ngRoute',//routing
'ui.bootstrap',// ui.bootstrap
    'angularFileUpload', //upload files  
    'ngTagsInput' ,//ng tags with autocomplete
    'angularTreeview',
    'ngToast' ,// toaster notification
  
    'angular-jwplayer'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/Profile',
        {
            templateUrl: 'Templates/Profile.html'
            //controller: 'profileController'
        })
    //elearning is a replaced by course
        .when('/1/ELearning/CreateCourse',
        {
            templateUrl: 'Templates/ELearningContent/CreateELearningContentOne.html'
            
        }).when('/2/ELearning/CreateCourse',
        {
            templateUrl: 'Templates/ELearningContent/CreateELearningContentTwo.html'

        })
    
        .when('/CourseList', {
            templateUrl: 'Templates/ELearningContentList.html'
            
        })    
       .when('/ELearning/ViewSectionDetail/:id', {
            templateUrl: 'Templates/ELearningContent/ViewSectionDetail.html'
        })
        .when('/ELearning/Lecture-SectionSliderPage/:id', {
            templateUrl: 'Templates/ELearningContent/Lecture-SectionSliderPage.html'
        })
        .when('/ELearning/Participate/:id', {
            templateUrl: 'Templates/ELearningContent/Participate.html'
        }
        ).when('/ELearning/ViewInteractiveResult/:id', {
            templateUrl: 'Templates/ELearningContent/ViewInteractiveResult.html'
        }).when('/ELearning/ViewCourseDetail/:id', {
            templateUrl:'Templates/ViewContentDetail.html'
    });      
    
    //$routeProvider.otherwise({ redirectTo: '/' });
});

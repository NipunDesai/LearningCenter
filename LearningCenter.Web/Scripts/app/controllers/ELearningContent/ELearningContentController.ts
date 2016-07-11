/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../services/elearningcontent/elearningcontentservice.ts" />

// e-Learning Content Controller
interface IeLearningContentScope extends ng.IScope {
    eLearningContentList: () => void;
    eLearningContentCollection: any;
    totalItems: number;
    itemsPerPage: number;
    currentPage: any;
    maxSize: number;
    bigTotalItems: number;
    bigCurrentPage: number;
    totalCollection: any;
    pageCount: Function;
    rate: number;
    max: number;
    hoveringOver: Function;
    overStar: any;
    percent: any;
    ratingStates: any;
    isReadonly: boolean;
    viewCreatorDetails: Function; 
    closeUserDetailDialogBox: Function;
    userCollection: any;
    viewContentDetail: Function;
    isCollapsed: boolean;
    contentCollection: any;
    viewContentDetails: boolean;
    eLearningSectionDetailById: Function;
    handleCreateELearningEvent: any;
    isProfileCreated: boolean;
    eLearningSectionPageList: any;
    eLearningSection: Model.ELearningSection;
    eLearningSectionId: any;
    eLearningSectionDetail: Function;
    myInterval: any;
    getUrl: any;
    itemPerCurrentPage: number;
    totalPageCollection: any;
    totalPageItem: number;
    trustedHtml: any;
    deleteConfirmationDialog: Function;
    closeDeleteDialogBox: Function;
    editELearningContent: Function;
    deleteContentCollection: any;
    deleteELearningContentById: Function;
    isLoading: boolean;
    openELearningLecturePage: Function;
    getAllInteractiveQuestions: Function;
    getInteractiveResult: Function;
    errorMessage: string;
    contentErrorMessageDisplay: boolean;
    contentDetailErrorMessageDisplay: boolean;
    creatorDetailErrorMessageDisplay: boolean;
    fblink: any;
    maillink: any;
    twitterlink: any;
    viewInteractiveDetails: Function;
    isDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
    isCreateELeaningContentDialogOpen: boolean;
    closeContentCreateDialogBox: Function;
    redirectToProfilePage: Function;
    contentDetail: Function;
    contentLoading: boolean;
    exceptionMessage: string;
    closeCatchDialogBox: Function;
    exceptionMessageDisplayDialog: Function;
    elearningSectionErrorMessageDisplay: boolean;
    getAllMyContentsList: Function;
    mycontentDisplayButton: boolean;
    entryLimit:any;
    noOfPages: any;
    filter: Function;
    filtered: any;
    serachFilter : any;
    
}
interface IeLearningContentController {
    
}
class eLearningContentController implements IeLearningContentController {
        static controllerId = "eLearningContentController";
        static instance;
    public openUserDetailModal;
    public deleteConfirmationModal;
    public elearningContentHandlerModal;
    public catchConfirmationModal;
    constructor(private $scope: IeLearningContentScope, private $log: ng.ILogService, public eLearningContentService: eLearningContentService, private $location: ng.ILocationService, private $upload, private $http: ng.IHttpService, public $modal, public $rootScope, private $window: ng.IWindowService, private $routeParams, private $sce, public apiPath, public ngToast, private $timeout) {
        this.$scope.eLearningContentList = () => this.eLearningContentList();
        this.$scope.eLearningContentCollection = [];
        this.$scope.itemsPerPage = 10;
        this.$scope.currentPage = 1;
        this.$scope.maxSize = 10;
        this.$scope.bigTotalItems = 175;
        this.$scope.bigCurrentPage = 1;
        this.$scope.rate = 0;
        this.$scope.max = 5;
        this.$scope.hoveringOver = (value: number, content: Model.Content) => this.hoveringOver(value, content);
        this.$scope.ratingStates = [
            { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
            { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
            { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
            { stateOn: 'glyphicon-heart' },
            { stateOff: 'glyphicon-off' }
        ];
       
        this.$scope.viewCreatorDetails = (id: number) => this.viewCreatorDetails(id);
        this.$scope.closeUserDetailDialogBox = () => this.closeUserDetailDialogBox();
        this.$scope.userCollection = [];
        this.$scope.handleCreateELearningEvent = () => this.handleCreateELearningEvent();
        this.$scope.isProfileCreated = false;
        this.$scope.viewContentDetail = () => this.viewContentDetail();
        this.$scope.isCollapsed = true;
        this.$scope.contentCollection = [];
        this.$scope.viewContentDetails = false;
        this.$scope.eLearningSectionDetailById = (id: number) => this.eLearningSectionDetailById(id);
        //this.initialize();
        this.$scope.eLearningSectionPageList = [];
        this.$scope.eLearningSectionDetail = () => this.eLearningSectionDetail();
        this.$scope.myInterval = 5000;
        this.$scope.itemPerCurrentPage = 1;
        this.$scope.deleteConfirmationDialog = (id:number) => this.deleteConfiramtionDialog(id);
        this.$scope.closeDeleteDialogBox = () => this.closeDeleteDialogBox();
        this.$scope.editELearningContent = (id: number) => this.editELearningContent(id);
        this.$scope.deleteELearningContentById = (id: number) => this.deleteELearningContentById(id);
        this.$scope.isLoading = false;
        this.$scope.openELearningLecturePage = (id: number,lecId:number) => this.openELearningLecturePage(id,lecId);
        this.$scope.getAllInteractiveQuestions = (id: number) => this.getAllInteractiveQuestions(id);
        this.$scope.getInteractiveResult = (id: number) => this.getInteractiveResult(id);
        this.$scope.errorMessage = "";
        this.$scope.contentErrorMessageDisplay = false;
        this.$scope.contentDetailErrorMessageDisplay = false;
        this.$scope.creatorDetailErrorMessageDisplay = false;
        this.$scope.fblink = this.$sce.trustAsResourceUrl('http://www.facebook.com/sharer.php?u=' + apiPath);
        this.$scope.maillink = this.$sce.trustAsResourceUrl('mailto:?to=&subject=LearningCenter%20&body=I wanted to share this course on LearningCenter with you ' + apiPath);
        //mailto:?to=&subject=LearningCenter%20examples&body=I wanted to share this course on LearningCenter with you
        this.$scope.twitterlink = this.$sce.trustAsResourceUrl('http://twitter.com/home?status=LearningCenter ' + apiPath);
        this.$scope.viewInteractiveDetails = (id: number) => this.viewInteractiveDetails(id);
        this.$scope.isDialogOpen = false;
        this.$scope.isDeleteDialogOpen = false;
        this.$scope.contentDetail = (id : number) => this.contentDetail(id);
        this.$scope.isCreateELeaningContentDialogOpen = false;
        this.$scope.closeContentCreateDialogBox = () => this.closeContentCreateDialogBox();
        this.$scope.redirectToProfilePage = () => this.redirectToProfilePage();
        this.$scope.contentLoading = false;
        this.$scope.exceptionMessage = "";
        this.$scope.closeCatchDialogBox = () => this.closeCatchDialogBox();
        this.$scope.exceptionMessageDisplayDialog = (exceptionMessage: any) => this.exceptionMessageDisplayDialog(exceptionMessage);
        this.$scope.elearningSectionErrorMessageDisplay = false;
        this.$scope.getAllMyContentsList = () => this.getAllMyContentList();
        this.$scope.mycontentDisplayButton = false;
        this.$scope.entryLimit = 10; //max rows for data table
        this.$scope.noOfPages = 0;
        this.$scope.filtered = 0;
        this.$scope.filter = () => this.filter();
        this.$scope.serachFilter = 0;
    }
    //private initialize() {
    //   // this.eLearningContentList();
    //}

    private eLearningContentList() {
        var controllerScope = this.$scope;
        this.$scope.eLearningContentCollection = [];
        controllerScope.contentErrorMessageDisplay = false;
        controllerScope.totalCollection = [];
        var contentList = this.$scope.eLearningContentCollection;
        controllerScope.mycontentDisplayButton = true;
        var promise = this.eLearningContentService.eLearningContentList();
        this.$scope.isLoading = true;
        promise.then((response) => {
            if (response.length == 0) {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
               controllerScope.contentErrorMessageDisplay = true;
               controllerScope.isLoading = false;
            } else {
                this.$log.log("Get All ELearningContent List successfully");
                for (var i = 0; i < response.length; i++) {
                    contentList.push(response[i]);
                }
                var that = this;
                this.$scope.$watch("currentPage + itemsPerPage", () => {
                    controllerScope.totalCollection = [];
                    var begin = ((that.$scope.currentPage - 1) * that.$scope.itemsPerPage),
                        end = begin + that.$scope.itemsPerPage;
                    controllerScope.totalCollection = contentList.slice(begin, end);
                    that.$log.log("Current Page ", controllerScope.totalCollection);
                });

                /* init pagination with $scope.list */
              // controllerScope.noOfPages
               //controllerScope.noOfPages = Math.ceil(controllerScope.eLearningContentCollection.length / controllerScope.entryLimit);
                controllerScope.totalItems = controllerScope.eLearningContentCollection.length;
                that.$scope.isLoading = false;
            }
        }).catch((error) => {
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
    }

    private hoveringOver(value, content) {
      if (content.IsReadonly == false) {
                this.$scope.overStar = content.Rate;
                for (var i = 0; i < this.$scope.eLearningContentCollection.length; i++) {
                    if (this.$scope.eLearningContentCollection[i].ContentId == content.ContentId) {
                        this.$scope.eLearningContentCollection[i].Rate = content.Rate;
                        break;
                    }          
                this.$log.log('ReadOnly ELearning Content Rate' + content.Rate);
            }
        } else {
            content.Rate = value;
            var promise = this.eLearningContentService.updateELearningContentRate(content);
            promise.then((result) => {
                this.$scope.overStar = result.Rate;
                for (var j = 0; j < this.$scope.eLearningContentCollection.length; j++) {
                    if (this.$scope.eLearningContentCollection[j].ContentId == content.ContentId) {
                        this.$scope.eLearningContentCollection[j].Rate = result.Rate;
                        break;
                    }
                }
                this.$log.log('Update ELearning Content Rate successfully');
            }).catch(() => {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
                location.replace(this.apiPath);
            });
        }
        
    }

    private viewCreatorDetails(id) {
     //   this.$scope.contentErrorMessageDisplay = false;
      //  this.$scope.contentDetailErrorMessageDisplay = false;
        if (this.$scope.isDialogOpen == false) {
            this.$scope.isDialogOpen = true;
            var promise = this.eLearningContentService.viewCreatorDetails(id);
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
            }).catch((error) => {
                this.$scope.errorMessage = stringConstatnts.errorMessage;
            });
        }
    }

    private closeUserDetailDialogBox() {
        this.openUserDetailModal.dismiss('cancel');
    }

    private viewContentDetail() {
        var contentId = this.$routeParams.id;
        var controllerScope = this.$scope;
     //   this.$scope.contentErrorMessageDisplay = false;
        this.$scope.contentLoading = true;
        var promise = this.eLearningContentService.viewContentDetail(contentId);
        promise.then((response) => {
            this.$log.log("get Content Details successfully");
            controllerScope.contentCollection = [];
            var contentCollectionTable = controllerScope.contentCollection;
            for (var i = 0; i < response.length; i++) {
                if (response[i].UserImageGuid == null) {
                    response[i].UserImageGuid = stringConstatnts.profilePicDefaultUrl;
                }
              
                contentCollectionTable.push(response[i]);
            }
            controllerScope.contentLoading = false;
        }).catch((error) => {
            this.$scope.errorMessage = stringConstatnts.errorMessage;
            if (error.status == 0) {
                controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                controllerScope.contentLoading = false;
            } else if (error.status == 500) {
                controllerScope.contentDetailErrorMessageDisplay = true;
                controllerScope.contentLoading = false;
            }
            else {
                // controllerScope.contentLoading = false;
                location.replace(this.apiPath);
            }
        });
    }

    private eLearningSectionDetailById(id) {
        this.$scope.eLearningSectionId = id;
        this.$location.path("/ELearning/ViewSectionDetail/"+this.$scope.eLearningSectionId);
    }

    private eLearningSectionDetail() {
        var controllerScope = this.$scope;
        var sectionId = this.$routeParams.id;
        var promise = this.eLearningContentService.eLearningSectionDetail(sectionId);
        promise.then((result) => {
            this.$log.log('get ELearningSection Page Details successfully');
            this.$scope.eLearningSectionPageList = [];
            var selectionPageList = this.$scope.eLearningSectionPageList;
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].ELearningSectionPage.length; j++) {
                    switch (result[i].ELearningSectionPage[j].SectionContentType) {
                    case "video":
                        {
                            if (result[i].ELearningSectionPage[j].YouTubeLink == null) {
                                
                                selectionPageList.push(result[i].ELearningSectionPage[j]);
                                break;
                            } else {
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
                var that = this;
                this.$scope.$watch("currentPage + itemPerCurrentPage", () => {
                    this.$scope.totalPageCollection = [];
                    var begin = ((that.$scope.currentPage - 1) * that.$scope.itemPerCurrentPage),
                        end = begin + that.$scope.itemPerCurrentPage;
                    controllerScope.totalPageCollection = selectionPageList.slice(begin, end);
                    this.$log.log(controllerScope.totalPageCollection);
                });
                controllerScope.totalPageItem = controllerScope.eLearningSectionPageList.length;
             }
          }).catch((error) => {
              if (error.status == 0) {
                  controllerScope.exceptionMessageDisplayDialog(stringConstatnts.catchErrorMessage);
                 
              } else if (error.status == 500) {
                  controllerScope.errorMessage = stringConstatnts.errorMessage;
                  controllerScope.elearningSectionErrorMessageDisplay = true;
               
              }
              else {
                  // controllerScope.contentLoading = false;
                  location.replace(this.apiPath);
              }       });
        
    }
    private handleCreateELearningEvent() {
        var scope = this.$scope;
        this.$rootScope.url = stringConstatnts.elearning;
        var promise = this.eLearningContentService.getCurrentUserProfileInfo();
        promise.then((result) => {
            //if profile is already created
            if (result.isProfileCreated) {
              
               
                this.$location.path(stringConstatnts.createELearningContentStep1);
             
            }
            else {
            if (scope.isCreateELeaningContentDialogOpen == false) {
                scope.isCreateELeaningContentDialogOpen = true;
                this.elearningContentHandlerModal = this.$modal.open({
                    templateUrl: 'createcontent',
                    backdrop: 'static',
                    keyboard: true,
                    scope: this.$scope,

                });
                
            }
              
             //   this.$location.path(stringConstatnts.profilePagePath);
              
            }
        });

    }

    private redirectToProfilePage()
    {
        this.closeContentCreateDialogBox();
        this.$location.path(stringConstatnts.profilePagePath);
    }

    private closeContentCreateDialogBox()
    {
        this.$scope.isCreateELeaningContentDialogOpen = false;
        this.elearningContentHandlerModal.dismiss('cancel');
    }

    private deleteConfiramtionDialog(id) {
        if (this.$scope.isDeleteDialogOpen == false) {
            this.$scope.isDeleteDialogOpen = true;
            var promise = this.eLearningContentService.getELearningContentById(id);
            promise.then((result) => {
                this.$scope.deleteContentCollection = [];
                var deleteContentList = this.$scope.deleteContentCollection;
                for (var i = 0; i < result.length; i++) {
                    deleteContentList.push(result[i]);
                }
                this.deleteConfirmationModal = this.$modal.open({
                    templateUrl: 'deleteELearningContent',
                    backdrop: 'static',
                    keyboard: true,
                    scope: this.$scope,
                });
                this.$scope.isDeleteDialogOpen = false;
            });
        }
    }

    private closeDeleteDialogBox() {
        this.deleteConfirmationModal.dismiss('cancel');
    }

    private editELearningContent(id) {
        this.$location.path(stringConstatnts.createELearningContentStep1).search({ cid: id });
    }

    private deleteELearningContentById(id) {
        var controllerScope = this;
        var controller = this.$scope;
        var promise = this.eLearningContentService.deleteELearningContentById(id);
        promise.then((result) => {
            this.$log.log("ELearning Delete successfully");
            controllerScope.closeDeleteDialogBox();
            controllerScope.eLearningContentList();
            controllerScope.ngToast.create(stringConstatnts.contentDelete);
        }).catch((error) => {
         controller.errorMessage = stringConstatnts.errorMessage;
            location.replace(this.apiPath);
        });
    }

    private openELearningLecturePage(id,lecId) {
        this.$log.log("Open ELearning LecturePage");
        this.$rootScope.lectureId = lecId;
        this.$location.path("/ELearning/Lecture-SectionSliderPage/" + id);
    }

    private getAllInteractiveQuestions(id) {
       // this.$rootScope.ContentTitle = title;
        this.$log.log("get content Id" + id);
        this.$location.path("/ELearning/Participate/" + id);
    }

    private getInteractiveResult(id){
        this.$log.log("get content Id" + id);
      //  this.$rootScope.ContentTitle = title;
        this.$location.path("/ELearning/ViewInteractiveResult/" + id);
    }

    private viewInteractiveDetails(id) {
        var promise = this.eLearningContentService.viewInteractiveDetails(id);
        promise.then((result) => {
            this.$log.log("get content Id" + result.ContentId);
            this.$location.path("/ELearning/Participate/" + result.ContentId);
        });
    }

  

    private contentDetail(id) {
        this.$location.path("/ELearning/ViewCourseDetail/" + id);
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

    private getAllMyContentList() {
        var controllerScope = this.$scope;
        var thatScope = this;
        this.$scope.eLearningContentCollection = [];
        controllerScope.mycontentDisplayButton = false;
        controllerScope.isLoading = true;
        controllerScope.totalCollection = [];
        controllerScope.contentErrorMessageDisplay = false;
        var contentList = this.$scope.eLearningContentCollection;
        var promise = this.eLearningContentService.getAllMyContentList();
        promise.then((response) => {
            if (response.length == 0) {
                controllerScope.errorMessage = stringConstatnts.errorMessage;
                controllerScope.contentErrorMessageDisplay = true;
                controllerScope.isLoading = false;
            } else {
              for (var i = 0; i < response.length; i++) {
                    contentList.push(response[i]);
                }
                
           controllerScope.$watch("currentPage + itemsPerPage",  ()=>{
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
                } else if (error.status == 500) {
                    controllerScope.errorMessage = stringConstatnts.errorMessage;
                    controllerScope.contentErrorMessageDisplay = true;
                    controllerScope.isLoading = false;
                } else {
                    location.replace(this.apiPath);
                }
            });
    }

    private filter() {
        var controllerScope = this.$scope;
        controllerScope.totalItems = 0;
        this.$timeout(()=> {
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

app.controller(eLearningContentController.controllerId,
    ['$scope', '$log', 'eLearningContentservice', '$location', '$upload', '$http', '$modal', '$rootScope', '$window', '$routeParams', '$sce', 'apiPath', 'ngToast','$timeout',
        ($scope, $log, eLearningContentService, $location, $upload, $http, $modal, $rootScope, $window, $routeParams, $sce, apiPath, ngToast, $timeout) => {
            return new eLearningContentController($scope, $log, eLearningContentService, $location, $upload, $http, $modal, $rootScope, $window, $routeParams, $sce, apiPath, ngToast, $timeout);
        }
    ]);
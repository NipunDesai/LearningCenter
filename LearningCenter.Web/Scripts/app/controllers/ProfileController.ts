/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/profileservice.ts" />


interface IprofileControllerScope extends ng.IScope {
    getAllUserInfo: () => void;
    saveUserInfo: Function;
    profileClick: () => void;
    onFileSelect: ($files) => void;
    upload: string[];
    profilePic: string;
    fileUploadObj: string;
    user: Model.UserInfo;
    unsupportedFileTypeFlag: boolean;
    unsupportedFileTypeMsg: string;
    unsupportedFileSizeMsg: string;
    unsupportedFileSizeFlag: boolean;
    loadingFlag: boolean;
    errorMessage: string;
    errorMsgDisplay: boolean;
    deleteImage: Function;
    countryList: any;
    fileType: string;
    exceptionMessageDisplayDialog: Function;
    exceptionMessage: string;
    closeDeleteDialogBox: Function;
    errorMessageBit: boolean;
    selectAnyCountry: Function;
    result2: string;
    options2: { country; types: string };
    noRecordFoundbit: boolean;
    cityAutoCompleteTextBox: boolean;
    countryCollection: any;
    location: any;
    format: any;
    dateOptions: any;
    openDatePicker: Function;
    opened: boolean;
    fbEducation: any;
    fbExperience: any;
    linkedinEducation: any;
    linkedinExperience: any;
    maxDate: any;
    minDate: any;
    fbSkills: any;
    linkedinSkills: any;
    checkValidation: any;
    submitted: boolean;

}
interface IprofileController {
    
}
class profileController implements IprofileController {
    static controllerId = "profileController";
    static instance;
    public exceptionModal;
    constructor(private $scope: IprofileControllerScope, private $log: ng.ILogService, public profileService: profileService, private $location: ng.ILocationService, private $upload, public $rootScope, public $modal, public apiPath) {
        this.$scope.getAllUserInfo = () => this.getAllUserInfo();
        this.$scope.saveUserInfo = (isValid) => this.saveUserInfo(isValid);
        this.$scope.onFileSelect = ($files) => this.onFileSelect($files);
        this.$scope.user = new Model.UserInfo();
        this.$scope.loadingFlag = false;
        this.$scope.profileClick = () => this.profileClick();
        this.$scope.errorMsgDisplay = false;
        this.$scope.deleteImage = (profilePic) => this.deleteImage(profilePic);
        this.$scope.countryList = [];
        this.$scope.fileType = stringConstatnts.imageFileSupportedExtension;
        this.$scope.exceptionMessageDisplayDialog = (exceptionMessage) => this.exceptionMessageDisplayDialog(exceptionMessage);
        this.$scope.closeDeleteDialogBox = () => this.closeDeleteDialogBox();
        this.$scope.result2 = '';
        this.$scope.cityAutoCompleteTextBox = false;
        this.$rootScope.$on('NoCityRecordFound', (eve,result) => {
            this.$scope.noRecordFoundbit = result;
            this.$scope.$apply();
        });
        this.$scope.selectAnyCountry = (code:string) => this.selectAnyCountry(code);
      
        this.$scope.location = "";
        this.$scope.format = 'dd-MMMM-yyyy';
        this.$scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        this.$scope.maxDate = new Date();
        this.$scope.minDate = new Date().getFullYear() - 100 + '-01-01';
        this.$log.log(this.$scope.minDate);
        this.$scope.openDatePicker = (event) => this.openDatePicker(event);
        this.$scope.opened = false;
        this.$scope.fbEducation = [];
        this.$scope.fbExperience = [];
        this.$scope.fbSkills = [];
        this.$scope.linkedinEducation = [];
        this.$scope.linkedinExperience = [];
        this.$scope.linkedinSkills = [];
        this.$scope.checkValidation = () => this.checkValidation();
        this.$scope.submitted = false;
        this.$scope.$watch('profileform.$valid', () => {

        });
    }

    private getAllUserInfo() {
        var userScope = this.$scope;
        userScope.loadingFlag = true;
        var promise = this.profileService.ProfileInfo();
        promise.then((data) => {
            userScope.user.FirstName = data.FirstName;
            userScope.user.LastName = data.LastName;
            userScope.user.AboutMe = data.AboutMe;
            this.$scope.location = data.Location;
            userScope.user.DateOfBirth = data.DateOfBirth;
            userScope.user.ProfilePicGuid = data.ProfilePicGuid;
            userScope.user.ProfilePicName = data.ProfilePicName;
            if (data.Gender == null) { userScope.user.Gender = "male"; }
            else { userScope.user.Gender = data.Gender; }
            //   userScope.countryList = userScope.countryCollection;
            userScope.user.LoginProvider = data.LoginProvider == null ? undefined: data.LoginProvider.toLowerCase();
          
            userScope.user.FacebookLink = data.FacebookLink;
            userScope.user.TwitterLink = data.TwitterLink;
           
            if (userScope.user.ProfilePicGuid == null) {
                userScope.profilePic = stringConstatnts.profilePicDefaultUrl;
            }
            else {
                userScope.profilePic = data.ProfilePicGuid;
            }
            userScope.loadingFlag = false;
            if (userScope.user.LoginProvider == 'facebook') {
               
                userScope.fbEducation = angular.fromJson(data.Education);
                userScope.fbExperience = angular.fromJson(data.WorkInfo);
                userScope.fbSkills = angular.fromJson(data.Skils);
                
            }
            else if (userScope.user.LoginProvider == 'linkedin') {
                userScope.linkedinEducation = angular.fromJson(data.Education);
                userScope.linkedinExperience = angular.fromJson(data.WorkInfo);
                userScope.linkedinSkills = angular.fromJson(data.Skils);
               
            }
            else {
                userScope.user.JobTitle = data.JobTitle;
                userScope.user.CompanyName = data.CompanyName;
                
            }
            userScope.user.Skill = data.Skils;
            userScope.user.WorkInfo = data.WorkInfo;
            userScope.user.Education = data.Education;
            userScope.user.Experience = data.Experience;
        }).catch((error) => {
            this.$log.error(error);
            if (error.status == 0) {
                userScope.loadingFlag = false;
                userScope.exceptionMessage = stringConstatnts.exceptionMessage;
                userScope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else if (error.status == 500)
            {
                userScope.loadingFlag = false;
                userScope.errorMsgDisplay = true;
            }
            else {
                location.replace(this.apiPath);
            }
          
           
   });
    }

    private openDatePicker(event) {
        event.preventDefault();
        event.stopPropagation();
        this.$scope.opened = true;
    }

       // $scope.opened = true; }

    private saveUserInfo(isValid) {
    
        this.$scope.submitted = true;
        if (isValid) {
            var scope = this.$scope;
            var rootScope = this.$rootScope;
            scope.loadingFlag = true;
            scope.user.Location = this.$scope.location;
            //scope.user.Education = angular.toJson(scope.fbEducation);
            //scope.user.WorkInfo = angular.toJson(scope.fbExperience);
            var promise = this.profileService.SaveUserInfo(scope.user);
            promise.then((data) => {
                if (rootScope.url == stringConstatnts.elearning) {
                    this.$location.path(stringConstatnts.createELearningContentStep1);


                }
                else {
                    this.$location.path(stringConstatnts.defaultPath);

                }

            }).catch((error) => {
                    this.$log.error(error);
                    if (error.status == 0 || error.status == 500) {
                        scope.loadingFlag = false;
                        scope.exceptionMessage = stringConstatnts.exceptionMessage;
                        scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
                    }

                    else {
                        location.replace(this.apiPath);
                    }

                });
        }
    }

    private profileClick() {
        this.$rootScope.url = stringConstatnts.profile;
       
    }

    private onFileSelect($files) {
        var currentScope = this.$scope;
        //$files: an array of files selected, each file has name, size, and type.
        currentScope.unsupportedFileSizeFlag = false;
        currentScope.unsupportedFileTypeFlag = false;
        if(angular.isDefined($files[0])) {
            var files = $files;
            var fileData = files[0];
            var fileSize = fileData.size; // size in byte
            var fileName = files[0].name;
            currentScope.user.ProfilePicName = fileName;
            var fileSplit = fileName.split('.');
            var fileExtension = fileSplit[fileSplit.length - 1].toLowerCase();
            var fileObj = new Model.FileInfo();
            fileObj.Name = fileName;
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "gif") {
                if (fileSize <= 8000000) {
                    currentScope.loadingFlag = true;
                    this.$upload.upload({
                        url: "/api/files/upload", // webapi url
                        method: "POST",
                        data: { fileUploadObj: fileObj },
                        file: fileData
                    }).progress(function (evt) {
                            // get upload percentage
                            // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function (data, status, headers, config) {
                            // file is uploaded successfully
                            currentScope.profilePic = data.Name;
                            currentScope.user.ProfilePicGuid = data.Name;
                            currentScope.loadingFlag = false;
                            console.log(data);
                        }).error(function (data, status, headers, config) {
                            // file failed to upload
                            console.log(data);
                        });
                }
                else {
                    //currentScope.unsupportedFileSizeFlag = true;
                    //currentScope.unsupportedFileSizeMsg = stringConstatnts.maxFileSizeLimit;
                    currentScope.exceptionMessage = stringConstatnts.maxFileSizeLimit;
                    this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                }

            }
            else {

                //currentScope.unsupportedFileTypeFlag = true;
                //currentScope.unsupportedFileTypeMsg = stringConstatnts.unsupprtedFileType;
                currentScope.exceptionMessage = stringConstatnts.unsupprtedFileType;
                this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
            }

        }
        else {
            return;
        }
    }

    private deleteImage(profilePic) {
        var deleteScope = this.$scope;
        deleteScope.profilePic = stringConstatnts.profilePicDefaultUrl;
        deleteScope.user.ProfilePicGuid = null;
        deleteScope.user.ProfilePicName = null;
        deleteScope.unsupportedFileTypeFlag = false;
        deleteScope.unsupportedFileTypeMsg = "";
        deleteScope.unsupportedFileSizeFlag = false;
        deleteScope.unsupportedFileSizeMsg = "";
       
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

    private selectAnyCountry(code) {
        this.$scope.options2 = {
            country: code,
            types: '(cities)'
        };
        this.$scope.cityAutoCompleteTextBox = true;
    }

    private checkValidation() {
        this.$scope.submitted = true;
    }
}

app.controller(profileController.controllerId, ['$scope', '$log', 'profileService', '$location', '$upload', '$rootScope', '$modal','apiPath', ($scope, $log, profileService, $location, $upload, $rootScope, $modal, apiPath) => {
    
    return new profileController($scope, $log, profileService, $location, $upload, $rootScope, $modal, apiPath);
   
}]); 
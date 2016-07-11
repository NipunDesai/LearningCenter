/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/profileservice.ts" />
var profileController = (function () {
    function profileController($scope, $log, profileService, $location, $upload, $rootScope, $modal, apiPath) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.profileService = profileService;
        this.$location = $location;
        this.$upload = $upload;
        this.$rootScope = $rootScope;
        this.$modal = $modal;
        this.apiPath = apiPath;
        this.$scope.getAllUserInfo = function () { return _this.getAllUserInfo(); };
        this.$scope.saveUserInfo = function (isValid) { return _this.saveUserInfo(isValid); };
        this.$scope.onFileSelect = function ($files) { return _this.onFileSelect($files); };
        this.$scope.user = new Model.UserInfo();
        this.$scope.loadingFlag = false;
        this.$scope.profileClick = function () { return _this.profileClick(); };
        this.$scope.errorMsgDisplay = false;
        this.$scope.deleteImage = function (profilePic) { return _this.deleteImage(profilePic); };
        this.$scope.countryList = [];
        this.$scope.fileType = stringConstatnts.imageFileSupportedExtension;
        this.$scope.exceptionMessageDisplayDialog = function (exceptionMessage) { return _this.exceptionMessageDisplayDialog(exceptionMessage); };
        this.$scope.closeDeleteDialogBox = function () { return _this.closeDeleteDialogBox(); };
        this.$scope.result2 = '';
        this.$scope.cityAutoCompleteTextBox = false;
        this.$rootScope.$on('NoCityRecordFound', function (eve, result) {
            _this.$scope.noRecordFoundbit = result;
            _this.$scope.$apply();
        });
        this.$scope.selectAnyCountry = function (code) { return _this.selectAnyCountry(code); };
        this.$scope.location = "";
        this.$scope.format = 'dd-MMMM-yyyy';
        this.$scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        this.$scope.maxDate = new Date();
        this.$scope.minDate = new Date().getFullYear() - 100 + '-01-01';
        this.$log.log(this.$scope.minDate);
        this.$scope.openDatePicker = function (event) { return _this.openDatePicker(event); };
        this.$scope.opened = false;
        this.$scope.fbEducation = [];
        this.$scope.fbExperience = [];
        this.$scope.fbSkills = [];
        this.$scope.linkedinEducation = [];
        this.$scope.linkedinExperience = [];
        this.$scope.linkedinSkills = [];
        this.$scope.checkValidation = function () { return _this.checkValidation(); };
        this.$scope.submitted = false;
        this.$scope.$watch('profileform.$valid', function () {
        });
    }
    profileController.prototype.getAllUserInfo = function () {
        var _this = this;
        var userScope = this.$scope;
        userScope.loadingFlag = true;
        var promise = this.profileService.ProfileInfo();
        promise.then(function (data) {
            userScope.user.FirstName = data.FirstName;
            userScope.user.LastName = data.LastName;
            userScope.user.AboutMe = data.AboutMe;
            _this.$scope.location = data.Location;
            userScope.user.DateOfBirth = data.DateOfBirth;
            userScope.user.ProfilePicGuid = data.ProfilePicGuid;
            userScope.user.ProfilePicName = data.ProfilePicName;
            if (data.Gender == null) {
                userScope.user.Gender = "male";
            }
            else {
                userScope.user.Gender = data.Gender;
            }
            //   userScope.countryList = userScope.countryCollection;
            userScope.user.LoginProvider = data.LoginProvider == null ? undefined : data.LoginProvider.toLowerCase();
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
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0) {
                userScope.loadingFlag = false;
                userScope.exceptionMessage = stringConstatnts.exceptionMessage;
                userScope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else if (error.status == 500) {
                userScope.loadingFlag = false;
                userScope.errorMsgDisplay = true;
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    profileController.prototype.openDatePicker = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.$scope.opened = true;
    };
    // $scope.opened = true; }
    profileController.prototype.saveUserInfo = function (isValid) {
        var _this = this;
        this.$scope.submitted = true;
        if (isValid) {
            var scope = this.$scope;
            var rootScope = this.$rootScope;
            scope.loadingFlag = true;
            scope.user.Location = this.$scope.location;
            //scope.user.Education = angular.toJson(scope.fbEducation);
            //scope.user.WorkInfo = angular.toJson(scope.fbExperience);
            var promise = this.profileService.SaveUserInfo(scope.user);
            promise.then(function (data) {
                if (rootScope.url == stringConstatnts.elearning) {
                    _this.$location.path(stringConstatnts.createELearningContentStep1);
                }
                else {
                    _this.$location.path(stringConstatnts.defaultPath);
                }
            }).catch(function (error) {
                _this.$log.error(error);
                if (error.status == 0 || error.status == 500) {
                    scope.loadingFlag = false;
                    scope.exceptionMessage = stringConstatnts.exceptionMessage;
                    scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
                }
                else {
                    location.replace(_this.apiPath);
                }
            });
        }
    };
    profileController.prototype.profileClick = function () {
        this.$rootScope.url = stringConstatnts.profile;
    };
    profileController.prototype.onFileSelect = function ($files) {
        var currentScope = this.$scope;
        //$files: an array of files selected, each file has name, size, and type.
        currentScope.unsupportedFileSizeFlag = false;
        currentScope.unsupportedFileTypeFlag = false;
        if (angular.isDefined($files[0])) {
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
                        url: "/api/files/upload",
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
    };
    profileController.prototype.deleteImage = function (profilePic) {
        var deleteScope = this.$scope;
        deleteScope.profilePic = stringConstatnts.profilePicDefaultUrl;
        deleteScope.user.ProfilePicGuid = null;
        deleteScope.user.ProfilePicName = null;
        deleteScope.unsupportedFileTypeFlag = false;
        deleteScope.unsupportedFileTypeMsg = "";
        deleteScope.unsupportedFileSizeFlag = false;
        deleteScope.unsupportedFileSizeMsg = "";
    };
    profileController.prototype.exceptionMessageDisplayDialog = function (exceptionMessage) {
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
    profileController.prototype.closeDeleteDialogBox = function () {
        this.exceptionModal.dismiss('cancel');
    };
    profileController.prototype.selectAnyCountry = function (code) {
        this.$scope.options2 = {
            country: code,
            types: '(cities)'
        };
        this.$scope.cityAutoCompleteTextBox = true;
    };
    profileController.prototype.checkValidation = function () {
        this.$scope.submitted = true;
    };
    profileController.controllerId = "profileController";
    return profileController;
}());
app.controller(profileController.controllerId, ['$scope', '$log', 'profileService', '$location', '$upload', '$rootScope', '$modal', 'apiPath', function ($scope, $log, profileService, $location, $upload, $rootScope, $modal, apiPath) {
        return new profileController($scope, $log, profileService, $location, $upload, $rootScope, $modal, apiPath);
    }]);
//# sourceMappingURL=ProfileController.js.map
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../services/elearningcontent/elearningcontentservice.ts" />
var createELearningContentController = (function () {
    function createELearningContentController($scope, $log, eLearningContentService, $location, $upload, $http, $window, $rootScope, $routeParams, $modal, $q, $sce, apiPath, ngToast) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.eLearningContentService = eLearningContentService;
        this.$location = $location;
        this.$upload = $upload;
        this.$http = $http;
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.$routeParams = $routeParams;
        this.$modal = $modal;
        this.$q = $q;
        this.$sce = $sce;
        this.apiPath = apiPath;
        this.ngToast = ngToast;
        this.$scope.getELearningContentCreatorName = function () { return _this.getELearningContentCreatorName(); };
        this.$scope.createELearningContent = function (resource) { return _this.createELearningContent(resource); };
        this.$scope.onFileSelect = function ($files) { return _this.onFileSelect($files); };
        this.$scope.onFileSelection = function ($files, ELearningSectionId, topicName) { return _this.onFileSelection($files, ELearningSectionId, topicName); };
        this.$scope.eLearningContent = new Model.ELearningContent();
        this.$scope.contentPicType = stringConstatnts.imageFileSupportedExtension;
        this.$scope.categoryCollection = [];
        this.$scope.categorySelection = [];
        this.$scope.tagCollection = [];
        this.$scope.targetCollection = [];
        this.$scope.categoryList = [];
        this.$scope.tagList = [];
        this.$scope.tagSelection = [];
        this.$scope.targetList = [];
        this.$scope.targetSelection = [];
        this.$scope.loadCategory = function (query) { return _this.loadCategory(query); };
        this.$scope.loadTag = function (query) { return _this.loadTag(query); };
        this.$scope.loadTarget = function (query) { return _this.loadTarget(query); };
        this.$scope.loadnigFlags = false;
        this.$scope.deleteImage = function (contentPic) { return _this.deleteImage(); };
        this.$scope.deleteContentPageImage = function (sectionContentFileGuidName) { return _this.deleteContentPageImage(); };
        this.$scope.eLearningLecture = new Model.ELearningLecture();
        this.$scope.eLearningSection = new Model.ELearningSection();
        this.$scope.eLearningSectionPage = new Model.ELearningSectionPage();
        this.$scope.getELearningLectureList = function (contentID) { return _this.getELearningLectureList(); };
        this.$scope.addLecture = function (resource) { return _this.addLecture(); };
        this.$scope.lectureList = [];
        this.$scope.previewList = [];
        this.$scope.addSection = function (lectureId) { return _this.addSection(lectureId); };
        this.$scope.next = function () { return _this.next(); };
        this.$scope.previous = function () { return _this.previous(); };
        this.$scope.isVideo = false;
        this.$scope.contentclick = function (resource) { return _this.contentclick(resource); };
        this.$scope.saveSectionPageImage = function (sectionId) { return _this.saveSectionPageImage(sectionId); };
        this.$scope.deleteSectionPageContent = function (sectionPageId) { return _this.deleteSectionPageContent(sectionPageId); };
        this.$scope.isCreateELearningContent = true;
        this.$scope.isELearningContentPage = false;
        this.$scope.textEditorContent = new Model.TextEditorContent();
        this.$scope.saveEditorContent = function (sectionId, text, topicName) { return _this.saveEditorContent(sectionId, text, topicName); };
        this.$scope.lectureNameExistFlag = false;
        this.$scope.sectionNameExistFlag = false;
        this.$scope.isPreview = false;
        this.$scope.isLectureNameRequired = false;
        this.$scope.isSectionNameRequired = false;
        this.$scope.isEditLectureNameRequired = false;
        this.$scope.isEditSectionNameRequired = false;
        this.$scope.lectureEditNameExistFlag = false;
        this.$scope.sectionEditNameExistFlag = false;
        this.$scope.preview = function () { return _this.preview(); };
        this.$scope.textData = "";
        this.$scope.editLectureTitle = function (title, id) { return _this.editLectureTitle(title, id); };
        this.$scope.editLecturePanelHideAndShow = false;
        this.$scope.editSectionPanelHideAndShow = false;
        this.$scope.editSectionTitle = function (title, id) { return _this.editSectionTitle(title, id); };
        this.$scope.updateLectureTitle = function (lectureId, title) { return _this.updateLectureTitle(lectureId, title); };
        this.$scope.updateSectionTitle = function (sectionId, title) { return _this.updateSectionTitle(sectionId, title); };
        this.$scope.deleteLectureConfiramtionDialog = function (ELearningLectureId) { return _this.deleteLectureConfiramtionDialog(ELearningLectureId); };
        this.$scope.closeDeleteDialogBox = function () { return _this.closeDeleteDialogBox(); };
        this.$scope.deleteLecture = function (ELearningLectureId) { return _this.deleteLecture(ELearningLectureId); };
        this.$scope.deleteSection = function (ELearningSectionId) { return _this.deleteSection(ELearningSectionId); };
        this.$scope.deleteSectionConfiramtionDialog = function (ELearningSectionId) { return _this.deleteSectionConfiramtionDialog(ELearningSectionId); };
        this.$scope.deleteSectionPageConfiramtionDialog = function (sectionFileGuidName) { return _this.deleteSectionPageConfiramtionDialog(sectionFileGuidName); };
        this.$scope.exceptionMessageDisplayDialog = function (exceptionMessage) { return _this.exceptionMessageDisplayDialog(exceptionMessage); };
        this.$scope.uploadContentType = "";
        this.$scope.questionText = "";
        this.$scope.answerText = "";
        this.$scope.editEditorContent = function (editorData, eLearningSectionPageId) { return _this.editEditorContent(editorData, eLearningSectionPageId); };
        this.$scope.cancelEditor = function () { return _this.cancelEditor(); };
        this.$scope.updateEditorContent = function (eLearningSectionPageId, text) { return _this.updateEditorContent(eLearningSectionPageId, text); };
        this.$scope.interactive = new Model.Interactive();
        this.$scope.isQuestion = false;
        this.$scope.addInteractiveQuestion = function (questionText, sectionId, topicName) { return _this.addInteractiveQuestion(questionText, sectionId, topicName); };
        this.$scope.treeViewCollection = [];
        this.$scope.addInteractiveRootOption = function (answerText) { return _this.addInteractiveRootOption(answerText); };
        this.$scope.addInteractiveChildOption = function (answerText, currentNode) { return _this.addInteractiveChildOption(answerText, currentNode); };
        this.$scope.removeNode = function (currentNode, mytree) { return _this.removeNode(currentNode, mytree); };
        this.$scope.errorMessageString = "";
        this.$scope.cancelLectureEdit = function (id) { return _this.cancelLectureEdit(id); };
        this.$scope.cancelSectionEdit = function (id) { return _this.cancelSectionEdit(id); };
        this.$scope.cancelSectionClick = function () { return _this.cancelSectionClick(); };
        this.$scope.cancelLectureClick = function () { return _this.cancelLectureClick(); };
        this.$scope.addSectionClick = function () { return _this.addSectionClick(); };
        this.$scope.checkContentSectionPanelOpen = function () { return _this.checkContentSectionPanelOpen(); };
        this.$scope.resetAllValue = function () { return _this.resetAllValue(); };
        this.$scope.isContentNull = true;
        this.$scope.isInteractiveQuestion = true;
        this.$scope.isTopicNameRequired = false;
        this.$scope.isErrorMessage = false;
        this.$scope.hidePreview = function () { return _this.hidePreview(); };
        this.$scope.editYoutubeLink = function (youtubelink, sectionPageId) { return _this.editYoutubeLink(youtubelink, sectionPageId); };
        this.$scope.cancelMessageDisplayDialog = function () { return _this.cancelMessageDisplayDialog(); };
        //this.$scope.$watch("text", () => {
        //    alert("a");
        //});
        this.$scope.isInteractiveDisabled = false;
        this.$scope.isImage = false;
        this.$scope.isCkEditor = false;
        this.$scope.isInteractive = false;
        this.$scope.fileContentCollection = [
            {
                Type: "video",
                Title: "Video",
                Icon: "glyphicon glyphicon-play-circle",
                fileSelectedbit: false,
                msg: stringConstatnts.movieSuggestionMsg
            },
            {
                Type: "image",
                Title: "Image",
                Icon: 'glyphicon glyphicon-picture',
                fileSelectedbit: false,
                msg: stringConstatnts.imageSuggestionMsg
            },
            {
                Type: "interactive",
                Title: "Interactive",
                Icon: 'glyphicon glyphicon-book',
                fileSelectedbit: false,
                msg: "Add interactive content"
            },
            {
                Type: "doc",
                Title: "Document",
                Icon: 'glyphicon glyphicon-list-alt',
                fileSelectedbit: false,
                msg: stringConstatnts.docSuggestionMsg
            },
            {
                Type: "text",
                Title: "Text",
                Icon: 'glyphicon glyphicon-text-width',
                fileSelectedbit: false,
                msg: "Add text"
            }
        ];
        this.$scope.addContent = function (id) { return _this.addContent(id); };
        this.$scope.closeaddContent = function (id) { return _this.closeaddContent(id); };
        this.$scope.addContentDisplay = false;
        this.$scope.isImage = false;
        this.$scope.isCkEditor = false;
        this.$scope.isInteractive = false;
        this.$scope.isYoutubeEdit = false;
        this.$scope.saveYouTubeLink = function (youtubeLink, topicName, sectionId) { return _this.saveYouTubeLink(youtubeLink, topicName, sectionId); };
        this.$scope.updateYouTubeLink = function (youtubeLink, sectionPageId) { return _this.updateYouTubeLink(youtubeLink, sectionPageId); };
        this.$scope.changeVideoUrl = function (url) { return _this.changeVideoUrl(url); };
        this.$scope.videoErrorMessage = false;
        this.$scope.editInteractive = function (sectionPageId) { return _this.editInteractive(sectionPageId); };
        this.$scope.editInteractiveOption = function (currentNode) { return _this.editInteractiveOption(currentNode); };
        this.$scope.cancelYouTubeLink = function () { return _this.cancelYouTubeLink(); };
        this.$scope.updateInteractive = function (currentNode, optionText) { return _this.updateInteractive(currentNode, optionText); };
        this.$scope.isInteractiveEdit = false;
        this.$scope.cancelElearningContent = function () { return _this.cancelElearningContent(); };
        this.$scope.redirectDefaultPage = function () { return _this.redirectDefaultPage(); };
        this.$scope.closeSectionPage = function () { return _this.closeSectionPage(); };
        this.$scope.deleteInteractiveOption = function (currentNode) { return _this.deleteInteractiveOption(currentNode); };
    }
    createELearningContentController.prototype.getELearningContentCreatorName = function () {
        var _this = this;
        var eLearningScope = this.$scope;
        var id = angular.isDefined(this.$routeParams.cid) ? this.$routeParams.cid : 0;
        eLearningScope.loadnigFlags = true;
        var promise = this.eLearningContentService.eLearningContentCreatorName(id);
        promise.then(function (response) {
            if (response.isContentNull) {
                eLearningScope.isContentNull = true;
                eLearningScope.loadnigFlags = false;
            }
            else if (response.isAuthorizedUser) {
                eLearningScope.isErrorMessage = true;
                eLearningScope.errorMessageString = stringConstatnts.authorizedErrorMessage;
                eLearningScope.loadnigFlags = true;
            }
            else {
                eLearningScope.isContentNull = false;
                eLearningScope.eLearningContent.CreatedOn = response.CreatedOn;
                eLearningScope.eLearningContent.UserId = response.UserId;
                eLearningScope.eLearningContent.Title = response.Title;
                eLearningScope.eLearningContent.Description = response.Description;
                eLearningScope.categoryCollection = response.CategoryCollection;
                eLearningScope.tagCollection = response.TagCollection;
                eLearningScope.targetCollection = response.TargetCollection;
                eLearningScope.eLearningContent.ContentImageGuid = response.ContentImageGuid;
                if (eLearningScope.eLearningContent.ContentImageGuid == null) {
                    eLearningScope.contentPic = stringConstatnts.contentPicDefaultUrl;
                }
                else {
                    eLearningScope.contentPic = eLearningScope.eLearningContent.ContentImageGuid;
                }
                eLearningScope.categoryList = response.CategoryList;
                eLearningScope.tagList = response.TagList;
                eLearningScope.targetList = response.TargetList;
                eLearningScope.loadnigFlags = false;
            }
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0) {
                eLearningScope.loadnigFlags = false;
                eLearningScope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else if (error.status == 500) {
                eLearningScope.loadnigFlags = false;
                eLearningScope.isErrorMessage = true;
                eLearningScope.errorMessageString = stringConstatnts.errorMessage;
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.createELearningContent = function (preview) {
        var _this = this;
        var scope = this.$scope;
        //  var current_fs, next_fs; //div of steps
        //  var left, opacity, scale; //step div properties which we will animate
        //  var animating; //flag to prevent quick multi-click glitches
        scope.eLearningContent.Id = angular.isDefined(this.$routeParams.cid) ? this.$routeParams.cid : 0;
        scope.eLearningContent.CategoryList = scope.categoryList;
        scope.eLearningContent.TagList = scope.tagList;
        scope.eLearningContent.TargetList = scope.targetList;
        scope.loadnigFlags = true;
        var promise = this.eLearningContentService.createELearningContent(scope.eLearningContent);
        promise.then(function (data) {
            scope.loadnigFlags = false;
            scope.eLearningContent.Id = data.Id;
            scope.isCreateELearningContent = false;
            scope.isELearningContentPage = true;
            // scope.isSecondStep = true;
            _this.$rootScope.contentId = data.Id;
            _this.$location.path(stringConstatnts.createELearningContentStep2).search({ cid: data.Id });
            //code of steps on click on next
            //if (animating) return false;
            //animating = true;
            //current_fs = angular.element("button.next").parents('div.steps');
            //next_fs = angular.element("button.next").parents('div.steps').next();
            ////activate next step on progressbar using the index of next_fs
            //angular.element("#progressbar li").eq(angular.element(".steps").index(next_fs)).addClass("active");
            ////show the next step
            //next_fs.show();
            ////hide the current fieldset with style
            //current_fs.animate({ opacity: 0 }, {
            //    step: function (now, mx) {
            //        scale = 1 - (1 - now) * 0.2;
            //        left = (now * 50) + "%";
            //        opacity = 1 - now;
            //        current_fs.css({ 'transform': 'scale(' + scale + ')' });
            //        next_fs.css({ 'left': left, 'opacity': opacity });
            //    },
            //    duration: 200,
            //    complete: function () {
            //        current_fs.hide();
            //        animating = false;
            //    },
            //    //this comes from the custom easing plugin
            //    easing: 'easeInOutBack'
            //});
            //end of step code
            //in edit time of create elearning content step-1
            //if (angular.isDefined(this.$routeParams.cid)) {
            //    scope.lectureList = [];
            //    this.getELearningLectureList();
            //}
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 500 || error.staus == 0) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.previous = function () {
        this.$location.path(stringConstatnts.createELearningContentStep1);
        //var current_fs, previous_fs; //div of steps
        //var left, opacity, scale; //step div properties which we will animate
        //var animating; //flag to prevent quick multi-click glitches
        //if (animating) return false;
        //animating = true;
        //current_fs = angular.element("button.previous").parents('div.steps');
        //previous_fs = angular.element("button.previous").parents('div.steps').prev();
        ////de-activate current step on progressbar
        //angular.element("#progressbar li").eq(angular.element("div.steps").index(current_fs)).removeClass("active");
        ////show the previous divstep
        //previous_fs.show();
        ////hide the current fieldset with style
        //current_fs.animate({ opacity: 0 }, {
        //    step: function (now, mx) {
        //        scale = 0.8 + (1 - now) * 0.2;
        //        left = ((1 - now) * 50) + "%";
        //        opacity = 1 - now;
        //        current_fs.css({ 'left': left });
        //        previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        //    },
        //    duration: 200,
        //    complete: function () {
        //        current_fs.hide();
        //        animating = false;
        //    },
        //    //this comes from the custom easing plugin
        //    easing: 'easeInOutBack'
        //});
    };
    createELearningContentController.prototype.onFileSelect = function ($files) {
        var currentScope = this.$scope;
        var log = this.$log;
        //$files: an array of files selected, each file has name, size, and type.
        currentScope.unsupportedFileTypeFlag = false;
        currentScope.unsupportedFileSizeFlag = false;
        if (angular.isDefined($files[0])) {
            var files = $files;
            var fileData = files[0];
            var fileName = files[0].name;
            currentScope.eLearningContent.ContentImage = fileName;
            var fileSplit = fileName.split('.');
            var fileExtension = fileSplit[fileSplit.length - 1].toLowerCase();
            ;
            var fileObj = new Model.FileInfo();
            var fileSize = fileData.size; // size in byte
            fileObj.Name = fileName;
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "gif") {
                if (fileSize <= 8000000) {
                    currentScope.loadnigFlags = true;
                    this.$upload.upload({
                        url: "./api/ELearningContent/uploadContentDisplayImages",
                        method: "POST",
                        data: { fileUploadObj: fileObj },
                        file: fileData
                    }).progress(function (evt) {
                        // get upload percentage
                        // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        // file is uploaded successfully
                        currentScope.contentPic = data.Name;
                        currentScope.eLearningContent.ContentImageGuid = data.Name;
                        currentScope.loadnigFlags = false;
                        log.log(data);
                    }).error(function (data, status, headers, config) {
                        // file failed to upload
                        log.log(data);
                    });
                }
                else {
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
    createELearningContentController.prototype.loadCategory = function (query) {
        this.$scope.categorySelection = [];
        var q = this.$q.defer();
        for (var i = 0; i < this.$scope.categoryCollection.length; i++) {
            if (this.$scope.categoryCollection[i].Name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                this.$scope.categorySelection.push(this.$scope.categoryCollection[i]);
            }
        }
        q.resolve(this.$scope.categorySelection);
        //  return this.$http.get('api/ELearningContent/GetCategoryList');
        return q.promise;
    };
    createELearningContentController.prototype.loadTag = function (query) {
        this.$scope.tagSelection = [];
        var q = this.$q.defer();
        for (var i = 0; i < this.$scope.tagCollection.length; i++) {
            if (this.$scope.tagCollection[i].Name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                this.$scope.tagSelection.push(this.$scope.tagCollection[i]);
            }
        }
        q.resolve(this.$scope.tagSelection);
        return q.promise;
        //  return this.$http.get('api/ELearningContent/GetTagList');
    };
    createELearningContentController.prototype.loadTarget = function (query) {
        this.$scope.targetSelection = [];
        var q = this.$q.defer();
        for (var i = 0; i < this.$scope.targetCollection.length; i++) {
            if (this.$scope.targetCollection[i].Name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                this.$scope.targetSelection.push(this.$scope.targetCollection[i]);
            }
        }
        q.resolve(this.$scope.targetSelection);
        return q.promise;
        //  return this.$http.get('api/ELearningContent/GetTargetList');
    };
    createELearningContentController.prototype.deleteImage = function () {
        var deleteScope = this.$scope;
        deleteScope.contentPic = stringConstatnts.contentPicDefaultUrl;
        deleteScope.eLearningContent.ContentImageGuid = null;
        deleteScope.eLearningContent.ContentImage = null;
        deleteScope.unsupportedFileTypeFlag = false;
        deleteScope.unsupportedFileTypeMsg = "";
        deleteScope.unsupportedFileSizeFlag = false;
        deleteScope.unsupportedFileSizeMsg = "";
    };
    createELearningContentController.prototype.getELearningLectureList = function () {
        var _this = this;
        var scope = this.$scope;
        var contentId = this.$routeParams.cid;
        scope.eLearningContent.Id = contentId;
        scope.isErrorMessage = false;
        scope.loadnigFlags = true;
        var promise = this.eLearningContentService.getELearningLectureList(contentId);
        promise.then(function (data) {
            if (data.isAuthorizedUser) {
                scope.loadnigFlags = false;
                scope.isErrorMessage = true;
                scope.errorMessageString = stringConstatnts.authorizedErrorMessage;
            }
            else {
                var result = data.eLearningContentCollection[0].ELearningLecture;
                for (var i = 0; i < result.length; i++) {
                    scope.lectureList.push(result[i]);
                }
                scope.loadnigFlags = false;
            }
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else if (error.status == 500) {
                scope.loadnigFlags = false;
                scope.isErrorMessage = true;
                scope.errorMessageString = stringConstatnts.errorMessage;
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.addLecture = function () {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningLecture.ContentId = scope.eLearningContent.Id;
        scope.loadnigFlags = true;
        if (scope.eLearningLecture.Title == "" || scope.eLearningLecture.Title == null) {
            scope.lectureNameExistFlag = false;
            scope.isLectureNameRequired = true;
            scope.lectureNameRequiredMsg = stringConstatnts.lectureRequired;
            angular.element("#lecturenamere").text(scope.lectureNameRequiredMsg);
            scope.loadnigFlags = false;
            return;
        }
        var promise = this.eLearningContentService.createLecture(scope.eLearningLecture);
        promise.then(function (data) {
            if (data.isLectureNameExist) {
                scope.isLectureNameRequired = false;
                scope.lectureNameExistFlag = true;
                scope.lectureNameExistMsg = stringConstatnts.lectureexist;
                angular.element("#lecturenameexist").text(scope.lectureNameExistMsg);
                scope.loadnigFlags = false;
                return;
            }
            else {
                scope.lectureNameExistFlag = false;
                scope.lectureList.push({ ContentId: data.ContentId, ELearningLectureId: data.Id, editLecturePanelHideAndShow: false, ELearningSection: [], Title: data.Title });
                angular.element("div.lecture-content-div").find("div#addlectureDiv").removeClass("hide show").addClass("hide");
                angular.element("div.lecture-content-div").find("div#addlectureHeader").removeClass("hide show").addClass("show");
                angular.element("#lecname").val(null);
                scope.eLearningLecture.Title = "";
                scope.eLearningLecture.ContentId = 0;
                scope.isLectureNameRequired = false;
                scope.loadnigFlags = false;
            }
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.editLectureTitle = function (title, id) {
        var controllerScope = this.$scope;
        controllerScope.eLearningLecture.EditTitle = title;
        controllerScope.lectureEditNameExistFlag = false;
        controllerScope.isEditLectureNameRequired = false;
        for (var i = 0; i < controllerScope.lectureList.length; i++) {
            if (controllerScope.lectureList[i].ELearningLectureId == id) {
                controllerScope.lectureList[i].editLecturePanelHideAndShow = true;
            }
            else {
                controllerScope.lectureList[i].editLecturePanelHideAndShow = false;
            }
        }
    };
    createELearningContentController.prototype.updateLectureTitle = function (lectureId, title) {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningLecture.ContentId = scope.eLearningContent.Id;
        scope.eLearningLecture.Id = lectureId;
        scope.eLearningLecture.Title = title;
        if (scope.eLearningLecture.Title == "" || scope.eLearningLecture.Title == null) {
            scope.lectureEditNameExistFlag = false;
            scope.isEditLectureNameRequired = true;
            scope.lectureNameRequiredMsg = stringConstatnts.lectureRequired;
            return;
        }
        var promise = this.eLearningContentService.createLecture(scope.eLearningLecture);
        promise.then(function (data) {
            if (data.isLectureNameExist) {
                scope.isEditLectureNameRequired = false;
                scope.lectureEditNameExistFlag = true;
                scope.lectureNameExistMsg = stringConstatnts.lectureexist;
            }
            else {
                scope.lectureEditNameExistFlag = false;
                for (var i = 0; i < scope.lectureList.length; i++) {
                    if (scope.lectureList[i].ELearningLectureId == lectureId) {
                        scope.lectureList[i].Title = data.Title;
                        scope.lectureList[i].editLecturePanelHideAndShow = false;
                    }
                }
                scope.isEditLectureNameRequired = false;
                angular.element("div.lecture_div").find("div#addlectureDiv").removeClass("hide show").addClass("hide");
                angular.element("div.lecture_div").find("div#addlectureHeader").removeClass("hide show").addClass("show");
                angular.element("#lecname").val(null);
                scope.eLearningLecture.Title = "";
                scope.eLearningLecture.ContentId = 0;
                scope.eLearningLecture.Id = 0;
            }
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.cancelLectureEdit = function (id) {
        this.$scope.lectureEditNameExistFlag = false;
        this.$scope.isEditLectureNameRequired = false;
        var controllerScope = this.$scope;
        for (var i = 0; i < controllerScope.lectureList.length; i++) {
            if (controllerScope.lectureList[i].ELearningLectureId == id) {
                controllerScope.lectureList[i].editLecturePanelHideAndShow = false;
            }
            else {
                controllerScope.lectureList[i].editLecturePanelHideAndShow = false;
            }
        }
    };
    createELearningContentController.prototype.deleteLectureConfiramtionDialog = function (ELearningLectureId) {
        var scope = this.$scope;
        scope.eLearningLecture.Id = ELearningLectureId;
        var lectureList = scope.lectureList;
        if (lectureList.length == 1) {
            this.$scope.exceptionMessageDisplayDialog(stringConstatnts.canNotDelete + ' ' + stringConstatnts.minLectureValidation);
            return;
        }
        this.deleteConfirmationModal = this.$modal.open({
            templateUrl: 'deleteELearningLecture',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    createELearningContentController.prototype.closeDeleteDialogBox = function () {
        this.deleteConfirmationModal.dismiss('cancel');
    };
    createELearningContentController.prototype.deleteLecture = function (ELearningLectureId) {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningLecture.Id = ELearningLectureId;
        scope.loadnigFlags = true;
        var promise = this.eLearningContentService.deleteContentLectureByid(scope.eLearningLecture.Id);
        promise.then(function (data) {
            if (data.isDelete) {
                _this.closeDeleteDialogBox();
                scope.sectionContentFileName = null;
                scope.sectionContentFileGuidName = null;
                for (var i = 0; i < scope.lectureList.length; i++) {
                    if (scope.lectureList[i].ELearningLectureId == ELearningLectureId) {
                        scope.lectureList.splice(i, 1);
                    }
                }
                scope.eLearningLecture.Id = 0;
                _this.$log.log("lecture is deleted");
                scope.loadnigFlags = false;
                _this.ngToast.create(stringConstatnts.lectureDelete);
            }
            else {
                scope.loadnigFlags = false;
                scope.closeDeleteDialogBox();
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
        }).catch(function (error) {
            _this.$log.error(error);
            scope.loadnigFlags = false;
            scope.closeDeleteDialogBox();
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.addSection = function (lectureId) {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningSection.ELearningLectureId = lectureId;
        scope.loadnigFlags = true;
        if (scope.eLearningSection.Title == "" || scope.eLearningSection.Title == null) {
            scope.sectionNameExistFlag = false;
            scope.isSectionNameRequired = true;
            scope.sectionNameRequiredMsg = stringConstatnts.sectionRequired;
            scope.loadnigFlags = false;
            return;
        }
        var promise = this.eLearningContentService.createSection(scope.eLearningSection);
        promise.then(function (result) {
            if (result.isSectionNameExist) {
                scope.isSectionNameRequired = false;
                scope.sectionNameExistFlag = true;
                scope.sectionNameExistMsg = stringConstatnts.sectionExist;
                scope.loadnigFlags = false;
                return;
            }
            else {
                scope.sectionNameExistFlag = false;
                for (var i = 0; i < scope.lectureList.length; i++) {
                    if (scope.lectureList[i].ELearningLectureId == result.ELearningLectureId) {
                        scope.lectureList[i].ELearningSection.push({ ELearningLectureId: result.ELearningLectureId, ELearningSectionId: result.Id, editSectionPanelHideAndShow: false, ContentShowandHidebit: result.ContentShowandHidebit, ELearningSectionPage: [], Title: result.Title });
                    }
                }
                angular.element("div.section_div").find("div#addsectionDiv").removeClass("hide show").addClass("hide");
                angular.element("div.section_div").find("div#addsectionHeader").removeClass("hide show").addClass("show");
                angular.element("#secname").val(null);
                scope.eLearningSection.Title = "";
                scope.eLearningSection.ELearningLectureId = 0;
                scope.eLearningSection.Id = 0;
                scope.isSectionNameRequired = false;
                scope.loadnigFlags = false;
            }
            //submitSection = false; 
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.editSectionTitle = function (sectionName, id) {
        var controllerScope = this.$scope;
        controllerScope.eLearningSection.EditSectTitle = sectionName;
        controllerScope.sectionEditNameExistFlag = false;
        controllerScope.isEditSectionNameRequired = false;
        for (var i = 0; i < controllerScope.lectureList.length; i++) {
            for (var j = 0; j < controllerScope.lectureList[i].ELearningSection.length; j++) {
                if (controllerScope.lectureList[i].ELearningSection[j].ELearningSectionId == id) {
                    controllerScope.lectureList[i].ELearningSection[j].editSectionPanelHideAndShow = true;
                }
                else {
                    controllerScope.lectureList[i].ELearningSection[j].editSectionPanelHideAndShow = false;
                }
            }
        }
    };
    createELearningContentController.prototype.updateSectionTitle = function (sectionId, title) {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningSection.Id = sectionId;
        scope.eLearningSection.Title = title;
        //  scope.validationMsgFlag = false;
        if (scope.eLearningSection.Title == "" || scope.eLearningSection.Title == null) {
            scope.sectionEditNameExistFlag = false;
            scope.isEditSectionNameRequired = true;
            scope.sectionNameRequiredMsg = stringConstatnts.sectionRequired;
            return;
        }
        var promise = this.eLearningContentService.createSection(scope.eLearningSection);
        promise.then(function (result) {
            if (result.isSectionNameExist) {
                scope.isEditSectionNameRequired = false;
                scope.sectionEditNameExistFlag = true;
                scope.sectionNameExistMsg = stringConstatnts.sectionExist;
            }
            else {
                scope.sectionEditNameExistFlag = false;
                for (var i = 0; i < scope.lectureList.length; i++) {
                    for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                        if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == sectionId) {
                            scope.lectureList[i].ELearningSection[j].Title = result.Title;
                            scope.lectureList[i].ELearningSection[j].editSectionPanelHideAndShow = false;
                        }
                    }
                }
                angular.element("div.section_div").find("div#addsectionDiv").removeClass("hide show").addClass("hide");
                angular.element("div.section_div").find("div#addsectionHeader").removeClass("hide show").addClass("show");
                angular.element("#secname").val(null);
                scope.eLearningSection.Title = "";
                scope.eLearningSection.ELearningLectureId = 0;
                scope.eLearningSection.Id = 0;
                scope.isEditSectionNameRequired = false;
            }
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.cancelSectionEdit = function (id) {
        var controllerScope = this.$scope;
        controllerScope.isEditSectionNameRequired = false;
        controllerScope.sectionEditNameExistFlag = false;
        for (var i = 0; i < controllerScope.lectureList.length; i++) {
            for (var j = 0; j < controllerScope.lectureList[i].ELearningSection.length; j++) {
                if (controllerScope.lectureList[i].ELearningSection[j].ELearningSectionId == id) {
                    controllerScope.lectureList[i].ELearningSection[j].editSectionPanelHideAndShow = false;
                }
                else {
                    controllerScope.lectureList[i].ELearningSection[j].editSectionPanelHideAndShow = false;
                }
            }
        }
    };
    createELearningContentController.prototype.deleteSectionConfiramtionDialog = function (ELearningSectionId) {
        var scope = this.$scope;
        var lectureList = scope.lectureList;
        for (var i = 0; i < lectureList.length; i++) {
            for (var j = 0; j < lectureList[i].ELearningSection.length; j++) {
                if (lectureList[i].ELearningSection[j].ELearningSectionId == ELearningSectionId) {
                    if (lectureList[i].ELearningSection.length == 1) {
                        this.$scope.exceptionMessageDisplayDialog(stringConstatnts.canNotDelete + ' ' + "Lecture:" + ' ' + lectureList[i].Title + ' ' + stringConstatnts.minSectionValidation);
                        return;
                    }
                }
            }
        }
        scope.eLearningSection.Id = ELearningSectionId;
        this.deleteConfirmationModal = this.$modal.open({
            templateUrl: 'deleteELearningSection',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    createELearningContentController.prototype.exceptionMessageDisplayDialog = function (exceptionMessage) {
        var scope = this.$scope;
        scope.exceptionMessage = "";
        scope.exceptionMessage = exceptionMessage;
        this.deleteConfirmationModal = this.$modal.open({
            templateUrl: 'catchMessage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    createELearningContentController.prototype.deleteSection = function (ELearningSectionId) {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningSection.Id = ELearningSectionId;
        scope.loadnigFlags = true;
        var promise = this.eLearningContentService.deleteContentSectionById(scope.eLearningSection.Id);
        promise.then(function (data) {
            if (data.isDelete) {
                _this.closeDeleteDialogBox();
                scope.sectionContentFileName = null;
                scope.sectionContentFileGuidName = null;
                for (var i = 0; i < scope.lectureList.length; i++) {
                    for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                        if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == ELearningSectionId) {
                            scope.lectureList[i].ELearningSection.splice(j, 1);
                        }
                    }
                }
                scope.eLearningSection.Id = 0;
                scope.loadnigFlags = false;
                _this.$log.log("section is deleted");
                _this.ngToast.create(stringConstatnts.sectionDelete);
            }
            else {
                scope.loadnigFlags = false;
                scope.closeDeleteDialogBox();
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
        }).catch(function (error) {
            _this.$log.error(error);
            scope.loadnigFlags = false;
            scope.closeDeleteDialogBox();
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.next = function () {
        var _this = this;
        var lectureList = this.$scope.lectureList;
        if (lectureList.length == 0) {
            this.$scope.exceptionMessageDisplayDialog(stringConstatnts.minLectureValidation);
            return;
        }
        else {
            for (var i = 0; i < lectureList.length; i++) {
                for (var j = 0; j < lectureList[i].ELearningSection.length; j++) {
                    if (lectureList[i].ELearningSection[j].ELearningSectionPage.length < 1) {
                        this.$scope.exceptionMessageDisplayDialog("Section:" + ' ' + lectureList[i].ELearningSection[j].Title + ' ' + stringConstatnts.minContentValidation);
                        return;
                    }
                }
                if (lectureList[i].ELearningSection.length < 1) {
                    this.$scope.exceptionMessageDisplayDialog("Lecture:" + ' ' + lectureList[i].Title + ' ' + stringConstatnts.minSectionValidation);
                    return;
                }
            }
        }
        //this portion is for 3rd step, in this method it is temporary 
        var scope = this.$scope;
        var contentId = this.$routeParams.cid;
        var content = new Model.Content();
        content.ContentId = contentId;
        var promise = this.eLearningContentService.launchContent(content);
        promise.then(function (data) {
            _this.$log.log(data);
            if (data.$resolved) {
                _this.$window.location.href = stringConstatnts.defaultHref;
            }
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.checkContentSectionPanelOpen = function () {
        var scope = this.$scope;
        //to check any section page panel is open or not 
        if (scope.isImage || scope.isCkEditor || scope.isYoutubeEdit || scope.isInteractive || scope.isEditorEdit) {
            this.exceptionMessageDisplayDialog(stringConstatnts.closeSectionPagePanelMsg);
            return true;
        }
        return false;
    };
    createELearningContentController.prototype.contentclick = function (resource) {
        var controllerScope = this.$scope;
        //  this.checkContentSectionPanelOpen();
        if (this.checkContentSectionPanelOpen()) {
            return;
        }
        else {
            this.$scope.uploadContentType = resource;
            this.$scope.unsupportedFileTypeFlag = false;
            controllerScope.isTopicNameRequired = false;
            controllerScope.isEditorEdit = false;
            controllerScope.isYoutubeEdit = false;
            controllerScope.eLearningSectionPage.YouTubeLink = "";
            controllerScope.interactiveQuestion = null;
            controllerScope.videoErrorMessage = false;
            controllerScope.cancelEditor();
            controllerScope.youTubeLinkRequired = "";
            controllerScope.eLearningSectionPageId = 0;
            controllerScope.treeViewCollection = [];
            // controllerScope.validationMsgFlag = false;
            controllerScope.textEditorContent.TopicName = "";
            controllerScope.interactive = new Model.Interactive();
            var contentCollection = this.$scope.fileContentCollection;
            for (var i = 0; i < contentCollection.length; i++) {
                if (contentCollection[i].Type == resource) {
                    if (contentCollection[i].Type == "image" || contentCollection[i].Type == "video" || contentCollection[i].Type == "doc") {
                        if (contentCollection[i].Type == "video") {
                            controllerScope.isVideo = true;
                            controllerScope.tooltipMessage = stringConstatnts.videoTooltip;
                        }
                        else {
                            controllerScope.isVideo = false;
                            controllerScope.tooltipMessage = stringConstatnts.imageTooltip;
                        }
                        controllerScope.isImage = true;
                        contentCollection[i].fileSelectedbit = true;
                        controllerScope.isInteractive = false;
                        controllerScope.isCkEditor = false;
                    }
                    else if (contentCollection[i].Type == "interactive") {
                        contentCollection[i].fileSelectedbit = true;
                        controllerScope.isImage = false;
                        controllerScope.isInteractive = true;
                        controllerScope.isCkEditor = false;
                        controllerScope.isVideo = false;
                    }
                    else {
                        contentCollection[i].fileSelectedbit = true;
                        controllerScope.isImage = false;
                        controllerScope.isCkEditor = true;
                        controllerScope.isInteractive = false;
                        controllerScope.isVideo = false;
                    }
                }
                else {
                    contentCollection[i].fileSelectedbit = false;
                }
                controllerScope.isInteractiveQuestion = true;
                controllerScope.treeViewCollection = [];
            }
        }
    };
    createELearningContentController.prototype.onFileSelection = function ($files, ELearningSectionId, topicName) {
        var currentScope = this.$scope;
        var log = this.$log;
        if (topicName == "" || topicName == null) {
            currentScope.isTopicNameRequired = true;
            currentScope.topicNameRequiredMSg = stringConstatnts.topicNameRequiredMsg;
            return;
        }
        //$files: an array of files selected, each file has name, size, and type.
        currentScope.unsupportedFileTypeFlag = false;
        if (angular.isDefined($files[0])) {
            var files = $files;
            var sectionId = ELearningSectionId;
            var fileData = files[0];
            var fileSize = fileData.size; // size in byte
            var fileName = files[0].name;
            currentScope.sectionContentFileName = fileName;
            currentScope.topicName = topicName;
            var fileSplit = fileName.split('.');
            var fileExtension = fileSplit[fileSplit.length - 1].toLowerCase();
            var fileObj = new Model.FileInfo();
            fileObj.Name = fileName;
            fileObj.ResourceId = ELearningSectionId;
            switch (currentScope.uploadContentType) {
                case stringConstatnts.video: {
                    if (fileExtension == "mp4" || fileExtension == "flv" || fileExtension == "webm") {
                        if (fileSize <= 1000000000) {
                            currentScope.isFileUpload = true;
                            break;
                        }
                        else {
                            currentScope.exceptionMessage = stringConstatnts.maxFileSizeLimitForVideo;
                            this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                        }
                    }
                    else {
                        currentScope.exceptionMessage = stringConstatnts.unsupportedMovieFileMsg;
                        this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                        //currentScope.unsupportedFileTypeFlag = true;
                        //currentScope.unsupportedFileTypeMsg = stringConstatnts.unsupportedMovieFileMsg;
                        return;
                    }
                }
                case stringConstatnts.image: {
                    if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "gif") {
                        if (fileSize <= 8000000) {
                            currentScope.isFileUpload = true;
                            break;
                        }
                        else {
                            currentScope.exceptionMessage = stringConstatnts.maxFileSizeLimit;
                            this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                        }
                    }
                    else {
                        currentScope.exceptionMessage = stringConstatnts.unsupportedImageFileMsg;
                        this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                        //currentScope.unsupportedFileTypeFlag = true;
                        //currentScope.unsupportedFileTypeMsg = stringConstatnts.unsupportedImageFileMsg;
                        return;
                    }
                }
                default: {
                    if (fileExtension == "doc" || fileExtension == "docx" || fileExtension == "txt") {
                        if (fileSize <= 8000000) {
                            currentScope.isFileUpload = true;
                            break;
                        }
                        else {
                            currentScope.exceptionMessage = stringConstatnts.maxFileSizeLimit;
                            this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                        }
                    }
                    else {
                        currentScope.exceptionMessage = stringConstatnts.unsupportedDocFileMsg;
                        this.exceptionMessageDisplayDialog(currentScope.exceptionMessage);
                        //currentScope.unsupportedFileTypeFlag = true;
                        //currentScope.unsupportedFileTypeMsg = stringConstatnts.unsupportedDocFileMsg;
                        return;
                    }
                }
            }
            if (currentScope.isFileUpload) {
                currentScope.loadnigFlags = true;
                this.$upload.upload({
                    url: "./api/ELearningContent/UploadSectionContentImages?sectionId=" + sectionId + "&uploadContentType=" + currentScope.uploadContentType + "&topicName=" + currentScope.topicName,
                    method: "POST",
                    data: { fileUploadObj: fileObj },
                    file: fileData
                }).progress(function (evt) {
                    // get upload percentage
                    // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    // file is uploaded successfully
                    for (var i = 0; i < currentScope.lectureList.length; i++) {
                        for (var j = 0; j < currentScope.lectureList[i].ELearningSection.length; j++) {
                            if (currentScope.lectureList[i].ELearningSection[j].ELearningSectionId == sectionId) {
                                currentScope.lectureList[i].ELearningSection[j].ELearningSectionPage.push({ ELearningSectionId: data.ELearningSectionId, ELearningSectionPageId: data.Id, IsInteractive: data.IsInteractive, SectionContentFileGuid: data.SectionContentFileGuid, SectionContentFileName: data.SectionContentFileName, SectionContentType: data.SectionContentType, TopicName: data.TopicName });
                            }
                        }
                    }
                    currentScope.loadnigFlags = false;
                    currentScope.topicName = "";
                    currentScope.textEditorContent.TopicName = "";
                    currentScope.isTopicNameRequired = false;
                    currentScope.topicNameRequiredMSg = "";
                    log.log(data);
                }).error(function (data, status, headers, config) {
                    // file failed to upload
                    log.log(data);
                });
            }
        }
        else {
            return;
        }
    };
    createELearningContentController.prototype.saveYouTubeLink = function (youtubeLink, topicName, sectionId) {
        var _this = this;
        var scope = this.$scope;
        scope.loadnigFlags = true;
        if ((topicName == "" || topicName == null) && (youtubeLink == null || youtubeLink == "")) {
            scope.isTopicNameRequired = true;
            scope.topicNameRequiredMSg = stringConstatnts.topicNameRequiredMsg;
            scope.youTubeLinkRequired = stringConstatnts.youtubeLinkRequired;
            scope.loadnigFlags = false;
            return;
        }
        else if (youtubeLink == null || youtubeLink == "") {
            scope.isTopicNameRequired = false;
            scope.topicNameRequiredMSg = "";
            scope.youTubeLinkRequired = stringConstatnts.youtubeLinkRequired;
            scope.loadnigFlags = false;
            return;
        }
        else if (topicName == "" || topicName == null) {
            scope.isTopicNameRequired = true;
            scope.topicNameRequiredMSg = stringConstatnts.topicNameRequiredMsg;
            scope.youTubeLinkRequired = "";
            scope.loadnigFlags = false;
            return;
        }
        scope.eLearningSectionPage.YouTubeLink = youtubeLink;
        scope.eLearningSectionPage.ELearningSectionId = sectionId;
        scope.eLearningSectionPage.TopicName = topicName;
        scope.eLearningSectionPage.SectionContentType = stringConstatnts.video;
        scope.eLearningSectionPage.EmbeddedYouTubeLink = scope.videoUrl;
        var promise = this.eLearningContentService.addYoutubeLink(scope.eLearningSectionPage);
        promise.then(function (data) {
            for (var i = 0; i < scope.lectureList.length; i++) {
                for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                    if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == sectionId) {
                        scope.lectureList[i].ELearningSection[j].ELearningSectionPage.push({ ELearningSectionId: data.ELearningSectionId, ELearningSectionPageId: data.Id, IsInteractive: data.IsInteractive, SectionContentFileGuid: data.SectionContentFileGuid, SectionContentFileName: data.SectionContentFileName, SectionContentType: data.SectionContentType, TopicName: data.TopicName, YouTubeLink: data.YouTubeLink });
                    }
                }
            }
            scope.loadnigFlags = false;
            scope.eLearningSectionPage.YouTubeLink = "";
            scope.textEditorContent.TopicName = "";
            scope.isTopicNameRequired = false;
            scope.topicNameRequiredMSg = "";
            scope.youTubeLinkRequired = "";
        }).catch(function (error) {
            _this.$log.error(error);
            scope.closeDeleteDialogBox();
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.editYoutubeLink = function (youtubelink, sectionPageId) {
        var scope = this.$scope;
        //  this.checkContentSectionPanelOpen();
        if (this.checkContentSectionPanelOpen()) {
            return;
        }
        else {
            var contentCollection = scope.fileContentCollection;
            //to change the color of interactive icon
            for (var i = 0; i < contentCollection.length; i++) {
                if (contentCollection[i].Type == "video") {
                    contentCollection[i].fileSelectedbit = true;
                }
            }
            scope.eLearningSectionPage.YouTubeLink = youtubelink;
            scope.interactiveQuestion = "";
            scope.eLearningSectionPageId = sectionPageId;
            scope.isYoutubeEdit = true;
            scope.isImage = false;
            scope.isInteractive = false;
            scope.isCkEditor = false;
            scope.videoErrorMessage = false;
        }
    };
    createELearningContentController.prototype.updateYouTubeLink = function (youtubeLink, sectionPageId) {
        var _this = this;
        var scope = this.$scope;
        scope.eLearningSectionPage.YouTubeLink = youtubeLink;
        scope.eLearningSectionPage.Id = sectionPageId;
        scope.eLearningSectionPage.EmbeddedYouTubeLink = scope.videoUrl;
        var promise = this.eLearningContentService.addYoutubeLink(scope.eLearningSectionPage);
        promise.then(function (data) {
            for (var i = 0; i < scope.lectureList.length; i++) {
                for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                    for (var k = 0; k < scope.lectureList[i].ELearningSection[j].ELearningSectionPage.length; k++) {
                        if (scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].ELearningSectionPageId == sectionPageId) {
                            scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].YouTubeLink = data.YouTubeLink;
                        }
                    }
                }
            }
            scope.eLearningSectionPageId = undefined;
            scope.isYoutubeEdit = false;
            scope.eLearningSectionPage.YouTubeLink = "";
        }).catch(function (error) {
            _this.$log.error(error);
            scope.closeDeleteDialogBox();
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
        ;
    };
    createELearningContentController.prototype.cancelYouTubeLink = function () {
        var scope = this.$scope;
        scope.eLearningSectionPage.YouTubeLink = "";
        scope.interactiveQuestion = "";
        scope.eLearningSectionPageId = undefined;
        scope.isYoutubeEdit = false;
    };
    //remove
    createELearningContentController.prototype.deleteContentPageImage = function () {
        var _this = this;
        var scope = this.$scope;
        var promise = this.eLearningContentService.deleteCategoryImage(scope.sectionContentFileGuidName);
        promise.then(function (result) {
            if (result.isDeleted) {
                _this.closeDeleteDialogBox();
                scope.sectionContentFileName = null;
                scope.sectionContentFileGuidName = null;
            }
        });
    };
    createELearningContentController.prototype.cancelSectionClick = function () {
        var scope = this.$scope;
        scope.isSectionNameRequired = false;
        scope.sectionNameExistFlag = false;
        scope.eLearningSection.Title = "";
    };
    createELearningContentController.prototype.cancelLectureClick = function () {
        var scope = this.$scope;
        scope.isLectureNameRequired = false;
        scope.lectureNameExistFlag = false;
        scope.eLearningLecture.Title = "";
    };
    createELearningContentController.prototype.addSectionClick = function () {
        var scope = this.$scope;
        scope.isSectionNameRequired = false;
        scope.sectionNameExistFlag = false;
        scope.eLearningSection.Title = "";
    };
    //remove 
    createELearningContentController.prototype.saveSectionPageImage = function (sectionId) {
        var scope = this.$scope;
        scope.eLearningSectionPage.ELearningSectionId = sectionId;
        scope.eLearningSectionPage.SectionContentFileGuid = scope.sectionContentFileGuidName;
        scope.eLearningSectionPage.SectionContentFileName = scope.sectionContentFileName;
        scope.eLearningSectionPage.SectionContentType = scope.uploadContentType;
        var promise = this.eLearningContentService.saveSectionPageImage(scope.eLearningSectionPage);
        promise.then(function (result) {
            for (var i = 0; i < scope.lectureList.length; i++) {
                for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                    if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == sectionId) {
                        scope.lectureList[i].ELearningSection[j].ELearningSectionPage.push({ ELearningSectionId: result.ELearningSectionId, ELearningSectionPageId: result.Id, IsInteractive: result.IsInteractive, SectionContentFileGuid: result.SectionContentFileGuid, SectionContentFileName: result.SectionContentFileName, SectionContentType: result.SectionContentType });
                    }
                }
            }
        });
    };
    createELearningContentController.prototype.deleteSectionPageContent = function (sectionPageId) {
        var _this = this;
        var scope = this.$scope;
        scope.loadnigFlags = true;
        var sectionPageId = sectionPageId;
        var promise = this.eLearningContentService.deleteSectionPageContent(sectionPageId);
        promise.then(function (result) {
            if (result.isFileDeleted) {
                _this.closeDeleteDialogBox();
                for (var i = 0; i < scope.lectureList.length; i++) {
                    for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                        for (var k = 0; k < scope.lectureList[i].ELearningSection[j].ELearningSectionPage.length; k++) {
                            if (scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].ELearningSectionPageId == sectionPageId) {
                                scope.lectureList[i].ELearningSection[j].ELearningSectionPage.splice(k, 1);
                            }
                        }
                    }
                }
                scope.eLearningSectionPage.Id = 0;
                scope.loadnigFlags = false;
                //scope.treeViewCollection = [];
                //scope.isCkEditor = false;
                //scope.isImage = false;
                //scope.isInteractive = false;
                //scope.isEditorEdit = false;
                //scope.isYoutubeEdit = false;
                //scope.interactiveQuestion = "";
                //scope.interactive = null;
                //scope.eLearningSectionPage.YouTubeLink = "";
                _this.$log.log("Section content is deleted");
                _this.ngToast.create(stringConstatnts.sectionPageDelete);
            }
            else {
                scope.loadnigFlags = false;
                scope.closeDeleteDialogBox();
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
        }).catch(function (error) {
            _this.$log.error(error);
            scope.closeDeleteDialogBox();
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.deleteSectionPageConfiramtionDialog = function (ELearningSectionPageId) {
        this.$scope.sectionContentFileGuidName = ELearningSectionPageId;
        var scope = this.$scope;
        var lectureList = scope.lectureList;
        for (var i = 0; i < lectureList.length; i++) {
            for (var j = 0; j < lectureList[i].ELearningSection.length; j++) {
                for (var k = 0; k < lectureList[i].ELearningSection[j].ELearningSectionPage.length; k++) {
                    if (lectureList[i].ELearningSection[j].ELearningSectionPage[k].ELearningSectionPageId == ELearningSectionPageId) {
                        if (lectureList[i].ELearningSection[j].ELearningSectionPage.length == 1) {
                            this.$scope.exceptionMessageDisplayDialog(stringConstatnts.canNotDelete + ' ' + "Section:" + ' ' + lectureList[i].ELearningSection[j].Title + ' ' + stringConstatnts.minContentValidation);
                            return;
                        }
                    }
                }
            }
        }
        this.deleteConfirmationModal = this.$modal.open({
            templateUrl: 'deleteELearningSectionPage',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    createELearningContentController.prototype.saveEditorContent = function (sectionId, text, topicName) {
        var _this = this;
        var scope = this.$scope;
        scope.loadnigFlags = true;
        if (topicName == "" || topicName == null) {
            scope.isTopicNameRequired = true;
            scope.topicNameRequiredMSg = stringConstatnts.topicNameRequiredMsg;
            scope.loadnigFlags = false;
            return;
        }
        scope.textData = text;
        scope.textEditorContent.Data = scope.textData;
        scope.textEditorContent.ELearningSectionId = sectionId;
        scope.textEditorContent.ContentId = scope.eLearningContent.Id;
        scope.textEditorContent.SectionContentType = stringConstatnts.textEditor;
        scope.textEditorContent.TopicName = topicName;
        if (scope.textEditorContent.Data.length > 0) {
            var promise = this.eLearningContentService.saveEditorData(scope.textEditorContent);
            promise.then(function (result) {
                for (var i = 0; i < scope.lectureList.length; i++) {
                    for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                        if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == sectionId) {
                            scope.lectureList[i].ELearningSection[j].ELearningSectionPage.push({ ELearningSectionId: result.ELearningSectionId, ELearningSectionPageId: result.Id, IsInteractive: result.IsInteractive, SectionContentFileGuid: result.SectionContentFileGuid, SectionContentFileName: result.SectionContentFileName, SectionContentType: result.SectionContentType, SectionContentData: result.SectionContentData, TopicName: result.TopicName });
                        }
                    }
                }
                scope.textData = "";
                scope.textEditorContent.TopicName = "";
                scope.topicName = "";
                scope.isTopicNameRequired = false;
                scope.topicNameRequiredMSg = "";
                _this.$rootScope.$broadcast('clearData');
                scope.loadnigFlags = false;
            }).catch(function (error) {
                _this.$log.error(error);
                if (error.status == 0 || error.ststus == 500) {
                    scope.loadnigFlags = false;
                    scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
                }
                else {
                    location.replace(_this.apiPath);
                }
            });
        }
        else {
            scope.loadnigFlags = false;
            scope.exceptionMessageDisplayDialog(stringConstatnts.editorContentRequired);
        }
    };
    createELearningContentController.prototype.editEditorContent = function (editorData, eLearningSectionPageId) {
        var scope = this.$scope;
        //  this.checkContentSectionPanelOpen();
        if (this.checkContentSectionPanelOpen()) {
            return;
        }
        else {
            scope.loadnigFlags = true;
            var contentCollection = scope.fileContentCollection;
            //to change the color of interactive icon
            for (var i = 0; i < contentCollection.length; i++) {
                if (contentCollection[i].Type == "text") {
                    contentCollection[i].fileSelectedbit = true;
                }
            }
            scope.textData = editorData;
            this.$rootScope.$broadcast('editData', editorData);
            scope.eLearningSectionPageId = eLearningSectionPageId;
            scope.isEditorEdit = true;
            scope.isCkEditor = true;
            scope.isImage = false;
            scope.isInteractive = false;
            scope.interactiveQuestion = "";
            scope.loadnigFlags = false;
        }
    };
    createELearningContentController.prototype.updateEditorContent = function (eLearningSectionPageId, text) {
        var _this = this;
        var scope = this.$scope;
        scope.textData = text;
        scope.textEditorContent.Data = scope.textData;
        scope.textEditorContent.ELearningSectionPageId = eLearningSectionPageId;
        scope.textEditorContent.ContentId = scope.eLearningContent.Id;
        scope.textEditorContent.SectionContentType = stringConstatnts.textEditor;
        scope.textEditorContent.ELearningSectionId = 0;
        var promise = this.eLearningContentService.saveEditorData(scope.textEditorContent);
        promise.then(function (result) {
            for (var i = 0; i < scope.lectureList.length; i++) {
                for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                    for (var k = 0; k < scope.lectureList[i].ELearningSection[j].ELearningSectionPage.length; k++) {
                        if (scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].ELearningSectionPageId == eLearningSectionPageId) {
                            scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentData = result.SectionContentData;
                        }
                    }
                }
            }
            scope.isEditorEdit = false;
            _this.$scope.isCkEditor = false;
            scope.textData = "";
            _this.$rootScope.$broadcast('clearData');
            scope.eLearningSectionPageId = undefined;
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.cancelEditor = function () {
        this.$rootScope.$broadcast('clearData');
        // this.$scope.isEditorEdit = false;
        //this.$scope.eLearningSectionPageId = undefined;
    };
    createELearningContentController.prototype.preview = function () {
        var scope = this.$scope;
        scope.isPreview = true;
        // this.$window.open("Home#/ELearning/Lecture-SectionSliderPage/" + this.$scope.eLearningContent.Id, '_blank');
        //for (var i = 0; i < scope.lectureList.length; i++) {
        //    scope.previewList.push({ ContentId: scope.lectureList[i].ContentId, ELearningLectureId: scope.lectureList[i].ELearningLectureId, ELearningSectionPage: [], Title: scope.lectureList[i].Title });
        //    for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
        //        for (var k = 0; k < scope.lectureList[i].ELearningSection[j].ELearningSectionPage.length; k++) {
        //            if (scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentFileGuid != null) {
        //                scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentFileGuid = "/UploadFiles/ContentPages/" + "scope.lectureList[i].ContentId" + "/" + scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentFileGuid;
        //                scope.previewList[i].ELearningSectionPage.push({ ELearningSectionId: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].ELearningSectionId, ELearningSectionPageId: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].ELearningSectionPageId, IsInteractive: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].IsInteractive, SectionContentFileGuid: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentFileGuid, SectionContentFileName: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentFileName, SectionContentType: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].SectionContentType, TopicName: scope.lectureList[i].ELearningSection[j].ELearningSectionPage[k].TopicName });
        //            }
        //        }
        //    }
        //}
    };
    createELearningContentController.prototype.hidePreview = function () {
        this.$scope.isPreview = false;
    };
    createELearningContentController.prototype.addContent = function (id) {
        var controllerScope = this.$scope;
        controllerScope.unsupportedFileTypeFlag = false;
        controllerScope.isCkEditor = false;
        controllerScope.isImage = false;
        controllerScope.isInteractive = false;
        controllerScope.isEditorEdit = false;
        controllerScope.isYoutubeEdit = false;
        controllerScope.eLearningSectionPage.YouTubeLink = "";
        for (var i = 0; i < controllerScope.lectureList.length; i++) {
            for (var j = 0; j < controllerScope.lectureList[i].ELearningSection.length; j++) {
                if (controllerScope.lectureList[i].ELearningSection[j].ELearningSectionId == id) {
                    controllerScope.lectureList[i].ELearningSection[j].ContentShowandHidebit = true;
                }
                else {
                    controllerScope.lectureList[i].ELearningSection[j].ContentShowandHidebit = false;
                }
            }
        }
        for (var k = 0; k < controllerScope.fileContentCollection.length; k++) {
            controllerScope.fileContentCollection[k].fileSelectedbit = false;
        }
    };
    createELearningContentController.prototype.resetAllValue = function () {
        var scope = this.$scope;
        scope.isImage = false;
        scope.isCkEditor = false;
        scope.isInteractive = false;
        scope.isEditorEdit = false;
        scope.isYoutubeEdit = false;
        scope.treeViewCollection = [];
        scope.interactive = new Model.Interactive();
        scope.eLearningSectionPageId = 0;
        scope.interactiveQuestionId = 0;
        scope.questionText = "";
        this.$rootScope.$broadcast('removeCurrentNode');
    };
    createELearningContentController.prototype.closeaddContent = function (id) {
        var controllerScope = this.$scope;
        this.resetAllValue();
        for (var i = 0; i < controllerScope.lectureList.length; i++) {
            for (var j = 0; j < controllerScope.lectureList[i].ELearningSection.length; j++) {
                if (controllerScope.lectureList[i].ELearningSection[j].ELearningSectionId == id) {
                    controllerScope.lectureList[i].ELearningSection[j].ContentShowandHidebit = false;
                }
                else {
                    controllerScope.lectureList[i].ELearningSection[j].ContentShowandHidebit = false;
                }
            }
        }
        for (var k = 0; k < controllerScope.fileContentCollection.length; k++) {
            controllerScope.fileContentCollection[k].fileSelectedbit = false;
        }
    };
    createELearningContentController.prototype.closeSectionPage = function () {
        var scope = this.$scope;
        this.resetAllValue();
        for (var k = 0; k < scope.fileContentCollection.length; k++) {
            scope.fileContentCollection[k].fileSelectedbit = false;
        }
    };
    createELearningContentController.prototype.addInteractiveQuestion = function (questionText, sectionId, topicName) {
        var scope = this.$scope;
        scope.loadnigFlags = true;
        if ((topicName == "" || topicName == null) && (questionText == null || questionText == "")) {
            scope.isTopicNameRequired = true;
            scope.topicNameRequiredMSg = stringConstatnts.topicNameRequiredMsg;
            scope.interactiveQuestionRequired = stringConstatnts.interactiveQuestionRequired;
            scope.loadnigFlags = false;
            return;
        }
        else if (questionText == null || questionText == "") {
            scope.isTopicNameRequired = false;
            scope.topicNameRequiredMSg = "";
            scope.interactiveQuestionRequired = stringConstatnts.interactiveQuestionRequired;
            scope.loadnigFlags = false;
            return;
        }
        else if (topicName == "" || topicName == null) {
            scope.isTopicNameRequired = true;
            scope.topicNameRequiredMSg = stringConstatnts.topicNameRequiredMsg;
            scope.interactiveQuestionRequired = "";
            scope.loadnigFlags = false;
            return;
        }
        var eLearningSectionId = sectionId;
        scope.interactive.ELearningSectionId = eLearningSectionId;
        scope.interactive.QuestionText = questionText;
        scope.interactive.TopicName = topicName;
        //var promise = this.eLearningContentService.addInteractiveQuestion(scope.interactive);
        //promise.then((result) => {
        //    scope.interactiveQuestionId = result.Id;
        // //   scope.treeViewCollection.push({ collapsed: false, id: result.Id, name: result.Text, parent: true, children: [] });
        //    for (var i = 0; i < scope.lectureList.length; i++) {
        //        for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
        //            if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == sectionId) {
        //                scope.lectureList[i].ELearningSection[j].ELearningSectionPage.push({ ELearningSectionId: eLearningSectionId, ELearningSectionPageId: result.ELearningSectionPageId, IsInteractive: true, SectionContentFileName: result.Text, TopicName: scope.interactive.TopicName });
        //            }
        //        }
        //    }
        scope.interactiveQuestion = scope.interactive.QuestionText;
        //    scope.interactive.QuestionText = "";
        //    scope.interactive.TopicName = "";
        //    scope.textEditorContent.TopicName = "";
        //    scope.isTopicNameRequired = false;
        //    scope.topicNameRequiredMSg = "";
        scope.isInteractiveQuestion = false;
        //    scope.interactiveQuestionRequired = "";
        //    scope.interactiveOptionRequired = "";
        scope.isInteractiveDisabled = true;
        scope.loadnigFlags = false;
        //}).catch((error) => {
        //     this.$log.error(error);
        //    if (error.status == 0 || error.ststus == 500) {
        //        scope.loadnigFlags = false;
        //        scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
        //    }
        //    else {
        //        location.replace(this.apiPath);
        //    }  
        // });
    };
    createELearningContentController.prototype.addInteractiveRootOption = function (answerText) {
        var _this = this;
        var scope = this.$scope;
        scope.loadnigFlags = true;
        if (answerText == null || answerText == "") {
            scope.interactiveOptionRequired = stringConstatnts.interactiveOptionRequired;
            scope.loadnigFlags = false;
            return;
        }
        scope.interactive.interactiveOptionText = answerText;
        scope.interactive.ParentIntrectiveOptionId = 0;
        scope.interactive.InteractiveQuestionId = scope.interactiveQuestionId;
        var promise = this.eLearningContentService.addInteractiveOption(scope.interactive);
        promise.then(function (result) {
            if (scope.treeViewCollection.length == 0) {
                scope.isInteractiveDisabled = false;
                for (var i = 0; i < scope.lectureList.length; i++) {
                    for (var j = 0; j < scope.lectureList[i].ELearningSection.length; j++) {
                        if (scope.lectureList[i].ELearningSection[j].ELearningSectionId == scope.interactive.ELearningSectionId) {
                            scope.lectureList[i].ELearningSection[j].ELearningSectionPage.push({ ELearningSectionId: scope.interactive.ELearningSectionId, ELearningSectionPageId: result.elearningsectionpageid, IsInteractive: true, SectionContentFileName: result.questiontext, TopicName: scope.interactive.TopicName });
                        }
                    }
                }
                scope.treeViewCollection.push({ id: result.interactiveoptionid, name: result.interactiveoptiontext, children: [] });
                scope.interactive.ELearningSectionPageId = result.elearningsectionpageid;
                scope.interactive.QuestionText = "";
                scope.interactive.TopicName = "";
                scope.textEditorContent.TopicName = "";
                scope.interactiveQuestionId = result.interactivequestionid;
            }
            else {
                scope.treeViewCollection.push({ id: result.Id, name: result.Option, children: [] });
            }
            //   scope.treeViewCollection[0].children.push({ collapsed: true, id: result.Id, name: result.Option, parent: false, children: [] });
            scope.interactive.interactiveOptionText = "";
            scope.interactiveOptionRequired = "";
            scope.isInteractiveEdit = false;
            scope.loadnigFlags = false;
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.addInteractiveChildOption = function (answerText, mytree) {
        var _this = this;
        var scope = this.$scope;
        scope.loadnigFlags = true;
        if (answerText == null || answerText == "") {
            scope.interactiveOptionRequired = stringConstatnts.interactiveOptionRequired;
            scope.loadnigFlags = false;
            return;
        }
        scope.interactive.interactiveOptionText = answerText;
        scope.interactive.ParentIntrectiveOptionId = mytree.currentNode.id;
        scope.interactive.InteractiveQuestionId = scope.interactiveQuestionId;
        var promise = this.eLearningContentService.addInteractiveOption(scope.interactive);
        promise.then(function (result) {
            mytree.currentNode.children.push({ id: result.Id, name: result.Option, children: [] });
            mytree.currentNode.selected = undefined;
            mytree.currentNode = undefined;
            scope.interactive.interactiveOptionText = "";
            scope.interactiveOptionRequired = "";
            scope.isInteractiveEdit = false;
            scope.loadnigFlags = false;
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.editInteractive = function (elearningSectionPageId) {
        var _this = this;
        var scope = this.$scope;
        //this.checkContentSectionPanelOpen();
        if (this.checkContentSectionPanelOpen()) {
            return;
        }
        else {
            scope.isImage = false;
            scope.isCkEditor = false;
            scope.isYoutubeEdit = false;
            var contentCollection = this.$scope.fileContentCollection;
            //to change the color of interactive icon
            for (var i = 0; i < contentCollection.length; i++) {
                if (contentCollection[i].Type == "interactive") {
                    contentCollection[i].fileSelectedbit = true;
                }
            }
            //  scope.interactive.ELearningSectionPageId = elearningSectionPageId;
            //  scope.isInteractiveEdit = true;
            scope.loadnigFlags = true;
            var promise = this.eLearningContentService.interactiveDetail(elearningSectionPageId);
            promise.then(function (result) {
                scope.interactive.ELearningSectionPageId = result.ELearningSectionPageId;
                scope.interactiveQuestionId = result.id;
                scope.interactiveQuestion = result.name;
                scope.treeViewCollection = result.children;
                scope.isInteractiveQuestion = false;
                scope.isInteractive = true;
                scope.loadnigFlags = false;
                _this.$log.log(result);
            }).catch(function (error) {
                if (error.status == 0) {
                    scope.loadnigFlags = false;
                    scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
                }
                else if (error.status == 500) {
                    scope.loadnigFlags = false;
                    scope.isErrorMessage = true;
                    scope.errorMessageString = stringConstatnts.errorMessage;
                }
                else {
                    location.replace(_this.apiPath);
                }
            });
        }
    };
    createELearningContentController.prototype.editInteractiveOption = function (currentNode) {
        var scope = this.$scope;
        scope.interactive.interactiveOptionText = currentNode.name;
        scope.isInteractiveEdit = true;
    };
    createELearningContentController.prototype.updateInteractive = function (currentNode, optionText) {
        var _this = this;
        var scope = this.$scope;
        scope.loadnigFlags = true;
        if (optionText == null || optionText == "") {
            scope.interactiveOptionRequired = stringConstatnts.interactiveOptionRequired;
            scope.loadnigFlags = false;
            return;
        }
        scope.interactive.interactiveOptionText = optionText;
        scope.interactive.interactiveOptionId = currentNode.id;
        scope.interactive.InteractiveQuestionId = scope.interactiveQuestionId;
        var promise = this.eLearningContentService.addInteractiveOption(scope.interactive);
        promise.then(function (result) {
            //   scope.treeViewCollection[0].children.push({ collapsed: true, id: result.Id, name: result.Option, parent: false, children: [] });
            scope.interactive.interactiveOptionText = "";
            currentNode.name = optionText;
            currentNode.selected = undefined;
            scope.loadnigFlags = false;
            scope.isInteractiveEdit = false;
            scope.interactive.interactiveOptionId = 0;
        }).catch(function (error) {
            _this.$log.error(error);
            if (error.status == 0 || error.ststus == 500) {
                scope.loadnigFlags = false;
                scope.exceptionMessageDisplayDialog(stringConstatnts.exceptionMessage);
            }
            else {
                location.replace(_this.apiPath);
            }
        });
    };
    createELearningContentController.prototype.deleteInteractiveOption = function (currentNode) {
        var scope = this.$scope;
    };
    createELearningContentController.prototype.removeNode = function (currentNode, mytree) {
        //var index = this.$scope.treeViewCollection[0].children.indexOf(currentNode);
        //this.$scope.treeViewCollection[0].children.splice(index, 1);
        currentNode.children = [];
    };
    createELearningContentController.prototype.changeVideoUrl = function (url) {
        if (url == "") {
            this.$scope.videoErrorMessage = false;
        }
        else {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                this.$scope.videoErrorMessage = false;
                var embedlink = 'http://www.youtube.com/embed/' + match[2];
                this.$scope.videoUrl = embedlink;
                //  this.$scope.videoDisplay = false;
                this.$scope.videoErrorMessage = false;
            }
            else {
                this.$scope.videoErrorMessage = true;
                return this.$scope.errorMessage = stringConstatnts.invalidLink;
            }
        }
    };
    createELearningContentController.prototype.cancelElearningContent = function () {
        var scope = this.$scope;
        if (scope.isInteractiveDisabled) {
            this.cancelMessageDisplayDialog();
        }
        else {
            this.$window.location.href = stringConstatnts.defaultHref;
        }
    };
    createELearningContentController.prototype.cancelMessageDisplayDialog = function () {
        var scope = this.$scope;
        this.deleteConfirmationModal = this.$modal.open({
            templateUrl: 'cancelDialogBox',
            backdrop: 'static',
            keyboard: true,
            scope: this.$scope
        });
    };
    createELearningContentController.prototype.redirectDefaultPage = function () {
        this.closeDeleteDialogBox();
        this.$scope.interactive = null;
        this.$scope.isInteractiveDisabled = false;
        this.$window.location.href = stringConstatnts.defaultHref;
    };
    createELearningContentController.controllerId = "createELearningContentController";
    return createELearningContentController;
}());
app.controller(createELearningContentController.controllerId, ['$scope', '$log', 'eLearningContentservice', '$location', '$upload', '$http', '$window', '$rootScope', '$routeParams', '$modal', '$q', '$sce', 'apiPath', 'ngToast', function ($scope, $log, eLearningContentService, $location, $upload, $http, $window, $rootScope, $routeParams, $modal, $q, $sce, apiPath, ngToast) {
        return new createELearningContentController($scope, $log, eLearningContentService, $location, $upload, $http, $window, $rootScope, $routeParams, $modal, $q, $sce, apiPath, ngToast);
    }]);
//# sourceMappingURL=CreateELearningContentController.js.map
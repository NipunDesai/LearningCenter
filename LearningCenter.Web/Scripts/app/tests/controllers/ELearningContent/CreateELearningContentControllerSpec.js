"use strict";
describe("CreateELearningContentControllerSpec", function () {
    var scope, $controllerConstructor, $qService, createELearningContentController, defered, log, location, mockedeLearningContentService, http, window, routeParams, modal, element, rootScope, apiPath;
    beforeEach(angular.mock.module("app"));
    beforeEach(inject(function ($controller, $rootScope, $q, $log, $location, $upload, $http, $window, $routeParams, $modal, $compile, eLearningContentservice) {
        $controllerConstructor = $controller;
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new(true);
        $qService = $q;
        log = $log;
        location = $location;
        http = $http;
        window = $window;
        routeParams = $routeParams;
        modal = $modal;
        mockedeLearningContentService = eLearningContentservice;
        rootScope = $rootScope;
        defered = $qService.defer();
        apiPath = "http://localhost:4424";
        initialize();
    }));
    it('Should setup controller scope', function () {
        expect(scope).toBeDefined();
        expect(scope.getELearningContentCreatorName).toBeDefined();
        expect(scope.createELearningContent).toBeDefined();
        expect(scope.deleteContentPageImage).toBeDefined();
        expect(scope.getELearningLectureList).toBeDefined();
        expect(scope.addLecture).toBeDefined();
        expect(scope.addSection).toBeDefined();
        expect(scope.contentclick).toBeDefined();
        expect(scope.deleteSectionPageContent).toBeDefined();
        expect(scope.saveEditorContent).toBeDefined();
        expect(scope.editLectureTitle).toBeDefined();
        expect(scope.editSectionTitle).toBeDefined();
        expect(scope.updateLectureTitle).toBeDefined();
        expect(scope.updateSectionTitle).toBeDefined();
        expect(scope.deleteLecture).toBeDefined();
        expect(scope.deleteSection).toBeDefined();
        expect(scope.editEditorContent).toBeDefined();
        expect(scope.updateEditorContent).toBeDefined();
        expect(scope.preview).toBeDefined();
        expect(scope.hidePreview).toBeDefined();
    });
    it("Should get content creator name", function () {
        var content = new Object();
        content["CreatedOn"] = "Pooja Shah";
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "eLearningContentCreatorName").and.returnValue(defer.promise);
        scope.getELearningContentCreatorName();
        defer.resolve(content);
        scope.$root.$apply();
        expect(scope.eLearningContent.CreatedOn).toBe("Pooja Shah");
        expect(scope.isContentNull).toBeFalsy();
        expect(scope.loadnigFlags).toBeFalsy();
    });
    it("Should not get content creator name if content is deleted", function () {
        routeParams.cid = 1;
        var content = new Object();
        content["isContentNull"] = true;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "eLearningContentCreatorName").and.returnValue(defer.promise);
        scope.getELearningContentCreatorName();
        defer.resolve(content);
        scope.$root.$apply();
        expect(scope.isContentNull).toBeTruthy();
        expect(scope.loadnigFlags).toBeFalsy();
    });
    it("Should create elearning content", function () {
        var content = new Object();
        content["CreatedOn"] = "Pooja Shah";
        content["Title"] = "Test Content";
        content["Id"] = '1';
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createELearningContent").and.returnValue(defer.promise);
        scope.createELearningContent();
        defer.resolve(content);
        scope.$root.$apply();
        expect(scope.eLearningContent.Id).toBe('1');
        expect(scope.loadnigFlags).toBeFalsy();
    });
    //it("Should delete image", () => {
    //    var actualContentPic = "Penguins.jpg";
    //    scope.contentPic = actualContentPic;
    //    var isDeleted;
    //    var defer = $qService.defer();
    //    spyOn(mockedeLearningContentService, "deleteCategoryImage").and.returnValue(defer.promise);
    //    defer.resolve(isDeleted);
    //    scope.deleteImage();
    //    scope.$root.$apply();
    //    expect(scope.contentPic).toBe("/Images/Content-Default.png");
    //    expect(scope.eLearningContent.ContentImageGuid).toBe("");
    //    expect(scope.eLearningContent.ContentImage).toBe("");
    //});
    it("Should get elearninglecture list", function () {
        scope.eLearningContent.Id = 1;
        routeParams.cid = 1;
        var lectureList = new Array();
        var lectureCollection = [{ Id: '1', Title: 'Content sample', ELearningLecture: [{ ELearningLectureId: '1', Title: 'Lecture' }] }];
        lectureList.push(lectureCollection[0].ELearningLecture);
        var contentCollection = new Object();
        contentCollection["eLearningContentCollection"] = lectureCollection;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "getELearningLectureList").and.returnValue(defer.promise);
        defer.resolve(contentCollection);
        scope.getELearningLectureList();
        scope.$root.$apply();
        expect(scope.lectureList.length).toBe(1);
    });
    it("Should not add lecture without title", function () {
        scope.eLearningLecture.Title = "";
        scope.addLecture();
        scope.$root.$apply();
        expect(scope.isLectureNameRequired).toBeTruthy();
    });
    it("Should not add same lecture title", function () {
        scope.eLearningLecture.Title = "lecture";
        var lecture = new Object();
        lecture["isLectureNameExist"] = true;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createLecture").and.returnValue(defer.promise);
        scope.addLecture();
        defer.resolve(lecture);
        scope.$root.$apply();
        expect(scope.lectureNameExistFlag).toBeTruthy();
    });
    it("Should add lecture", function () {
        var lectureList = new Array();
        var lectureCollection = [{ Id: '1', ELearningLecture: [{ ELearningLectureId: '1', Title: 'Lecture' }] }];
        scope.eLearningContent.Id = 1;
        scope.eLearningLecture.Title = "Lecture";
        lectureList.push(lectureCollection[0].ELearningLecture);
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createLecture").and.returnValue(defer.promise);
        scope.addLecture();
        defer.resolve(lectureList);
        scope.$root.$apply();
        expect(scope.lectureList.length).toBe(lectureList.length);
        expect(scope.isLectureNameRequired).toBeFalsy();
        expect(scope.lectureNameExistFlag).toBeFalsy();
        expect(scope.eLearningLecture.Title).toBe('');
        ;
    });
    it("should bind lecturename when edit lecture", function () {
        var title = "Title";
        scope.editLectureTitle(title);
        scope.$root.$apply();
        expect(scope.eLearningLecture.EditTitle).toBe(title);
    });
    it("should update lecture title", function () {
        scope.lectureList = [{ Id: '1', Title: 'Lecture1' }];
        var lectureCollection = [{ Id: '1', Title: 'Lecture' }];
        scope.eLearningContent.Id = 1;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createLecture").and.returnValue(defer.promise);
        scope.updateLectureTitle(1, "Lecture1");
        defer.resolve(lectureCollection);
        scope.$root.$apply();
        expect(scope.lectureList[0].Title).toBe("Lecture1");
    });
    it("should not update lecture without title", function () {
        scope.updateLectureTitle(1, "");
        scope.$root.$apply();
        expect(scope.isEditLectureNameRequired).toBeTruthy();
    });
    it("should cancel lecture edit", function () {
        scope.cancelLectureEdit();
        scope.$root.$apply();
        expect(scope.lectureEditNameExistFlag).toBeFalsy();
        expect(scope.isEditLectureNameRequired).toBeFalsy();
    });
    it("should delete lecture", function () {
        var isDelete = true;
        scope.lectureList = [{ ELearningLectureId: '1', Title: 'Lecture1' }];
        var defer = $qService.defer();
        spyOn(modal, "open").and.returnValue({
            dismiss: function () { }
        });
        createELearningContentController.deleteConfirmationModal = modal.open("templateUrl");
        spyOn(mockedeLearningContentService, "deleteContentLectureByid").and.returnValue(defer.promise);
        spyOn(createELearningContentController.deleteConfirmationModal, "dismiss");
        scope.deleteLecture(1);
        defer.resolve(isDelete);
        scope.$root.$apply();
        expect(scope.lectureList.length).toBe(1);
    });
    it("Should not add section without section title", function () {
        scope.eLearningSection.Title = "";
        scope.addSection(1);
        scope.$root.$apply();
        expect(scope.isSectionNameRequired).toBeTruthy();
    });
    it("shuld not enter same section title", function () {
        scope.eLearningSection.Title = "section";
        var section = new Object();
        section["isSectionNameExist"] = true;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createSection").and.returnValue(defer.promise);
        scope.addSection(1);
        defer.resolve(section);
        scope.$root.$apply();
        expect(scope.sectionNameExistFlag).toBeTruthy();
    });
    it("should add section", function () {
        var lectureList = new Array();
        var sectionCollection = [{ ELearningLectureId: '1', Title: 'Lecture', ELearningSection: [{ ELearningLectureId: 1, ELearningSectionId: 1, Title: "Section" }] }];
        scope.lectureList = sectionCollection;
        scope.eLearningSection.Title = "Section";
        var elearningsection = new Object();
        elearningsection["ELearningLectureId"] = 1;
        elearningsection["Title"] = "Section";
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createSection").and.returnValue(defer.promise);
        scope.addSection(1);
        defer.resolve(elearningsection);
        scope.$root.$apply();
        expect(scope.lectureList[0].ELearningSection.length).toBe(sectionCollection[0].ELearningSection.length);
    });
    it("should bind section name when edit section", function () {
        var title = "Title";
        scope.editSectionTitle(title);
        scope.$root.$apply();
        expect(scope.eLearningSection.EditSectTitle).toBe(title);
    });
    it("should update section title", function () {
        var elearningsection = new Object();
        elearningsection["ELearningLectureId"] = 1;
        elearningsection["Title"] = "Section2";
        scope.lectureList = [{ ELearningLectureId: '1', Title: 'Lecture', ELearningSection: [{ ELearningLectureId: 1, ELearningSectionId: 1, Title: "Section1" }] }];
        scope.eLearningContent.Id = 1;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "createSection").and.returnValue(defer.promise);
        scope.updateSectionTitle(1, "Section2");
        defer.resolve(elearningsection);
        scope.$root.$apply();
        expect(scope.lectureList[0].ELearningSection[0].Title).toBe("Section2");
        expect(scope.isEditSectionNameRequired).toBeFalsy();
        expect(scope.eLearningSection.Title).toBe("");
    });
    it("should not update section without title", function () {
        scope.updateSectionTitle(1, "");
        scope.$root.$apply();
        expect(scope.isEditSectionNameRequired).toBeTruthy();
    });
    it("should cancel section edit", function () {
        scope.cancelSectionEdit();
        scope.$root.$apply();
        expect(scope.isEditSectionNameRequired).toBeFalsy();
        expect(scope.sectionEditNameExistFlag).toBeFalsy();
    });
    it("should delete section", function () {
        var isDelete = true;
        scope.lectureList = [{ ELearningLectureId: '1', Title: 'Lecture', ELearningSection: [{ ELearningLectureId: 1, ELearningSectionId: 1, Title: "Section1" }] }];
        var defer = $qService.defer();
        spyOn(modal, "open").and.returnValue({
            dismiss: function () { }
        });
        createELearningContentController.deleteConfirmationModal = modal.open("templateUrl");
        spyOn(mockedeLearningContentService, "deleteContentSectionById").and.returnValue(defer.promise);
        spyOn(createELearningContentController.deleteConfirmationModal, "dismiss");
        scope.deleteSection(1);
        defer.resolve(isDelete);
        scope.$root.$apply();
        expect(scope.lectureList[0].ELearningSection.length).toBe(1);
    });
    it("Should atleat one lecture popup display", function () {
        scope.lectureList.length = 0;
        spyOn(scope, "exceptionMessageDisplayDialog");
        scope.next();
        scope.$root.$apply();
        expect(scope.exceptionMessageDisplayDialog).toHaveBeenCalled();
    });
    it("Should atleat one section in every lecture popup display", function () {
        scope.lectureList = [{ Id: '1', Title: 'Lecture1', ELearningSection: [] }];
        spyOn(scope, "exceptionMessageDisplayDialog");
        scope.next();
        scope.$root.$apply();
        expect(scope.exceptionMessageDisplayDialog).toHaveBeenCalled();
    });
    it("Should atleat one section content in every section popup display", function () {
        scope.lectureList = [{ Id: '1', Title: 'Lecture1', ELearningSection: [{ ELearningLectureId: 1, ELearningSectionId: 1, Title: "Section1", ELearningSectionPage: [] }] }];
        spyOn(scope, "exceptionMessageDisplayDialog");
        scope.next();
        scope.$root.$apply();
        expect(scope.exceptionMessageDisplayDialog).toHaveBeenCalled();
    });
    it("Should call editData broadcast", function () {
        spyOn(rootScope, "$broadcast");
        scope.editEditorContent("<p>Testing</p>", 1);
        expect(rootScope.$broadcast).toHaveBeenCalled();
        expect(scope.eLearningSectionPageId).toBe(1);
        expect(scope.isEditorEdit).toBeTruthy();
    });
    it("Should call clearData broadcast", function () {
        spyOn(rootScope, "$broadcast");
        scope.cancelEditor();
        expect(rootScope.$broadcast).toHaveBeenCalled();
        expect(scope.isEditorEdit).toBeFalsy();
        expect(scope.eLearningSectionPageId).toBeUndefined();
    });
    it("Should call preview", function () {
        scope.preview();
        scope.$root.$apply();
        expect(scope.isPreview).toBeTruthy();
    });
    it("Should save youtubeLink", function () {
        var youTubeLink = "https://www.youtube.com/watch?v=OSP7o4lzIoQ";
        var topicName = "Topic";
        var sectionId = 1;
        var sectionCollection = [{ ELearningLectureId: '1', Title: 'Lecture', ELearningSection: [{ ELearningLectureId: 1, ELearningSectionId: 1, Title: "Section", ELearningSectionPage: [] }] }];
        scope.lectureList = sectionCollection;
        scope.videoUrl = "http://www.youtube.com/embed/OSP7o4lzIoQ";
        scope.eLearningSectionPage.YouTubeLink = youTubeLink;
        scope.eLearningSectionPage.ELearningSectionId = sectionId;
        scope.eLearningSectionPage.TopicName = topicName;
        scope.eLearningSectionPage.SectionContentType = stringConstatnts.video;
        scope.eLearningSectionPage.EmbeddedYouTubeLink = scope.videoUrl;
        var sectionId = 1;
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "addYoutubeLink").and.returnValue(defer.promise);
        scope.saveYouTubeLink(youTubeLink, topicName, sectionId);
        defer.resolve(scope.eLearningSectionPage);
        scope.$root.$apply();
        expect(scope.lectureList[0].ELearningSection[0].ELearningSectionPage.length).toBe(1);
        expect(scope.loadnigFlags).toBeFalsy();
        expect(scope.eLearningSectionPage.YouTubeLink).toBe("");
        expect(scope.textEditorContent.TopicName).toBe("");
        expect(scope.isTopicNameRequired).toBeFalsy();
        expect(scope.topicNameRequiredMSg).toBe("");
        expect(scope.youTubeLinkRequired).toBe("");
    });
    it("should bind youtube link when link edit ", function () {
        var youtubeLink = "https://www.youtube.com/watch?v=OSP7o4lzIoQ";
        var sectionPageId = 1;
        scope.editYoutubeLink(youtubeLink, sectionPageId);
        scope.$root.$apply();
        expect(scope.eLearningSectionPage.YouTubeLink).toBe(youtubeLink);
        expect(scope.interactiveQuestion).toBe("");
        expect(scope.eLearningSectionPageId).toBe(sectionPageId);
        expect(scope.isYoutubeEdit).toBeTruthy();
        expect(scope.isImage).toBeFalsy();
        expect(scope.isInteractive).toBeFalsy();
        expect(scope.isCkEditor).toBeFalsy();
        expect(scope.videoErrorMessage).toBeFalsy();
    });
    it("should update youtube link", function () {
        var elearningsectionPage = new Object();
        elearningsectionPage["ELearningSectionPageId"] = 1;
        elearningsectionPage["YouTubeLink"] = "https://www.youtube.com/watch?v=mdoKpg4miiQ";
        var youtubeLink = "https://www.youtube.com/watch?v=mdoKpg4miiQ";
        scope.lectureList = [{ ELearningLectureId: '1', Title: 'Lecture', ELearningSection: [{ ELearningLectureId: 1, ELearningSectionId: 1, Title: "Section", ELearningSectionPage: [{ ELearningSectionId: 1, ELearningSectionPageId: 1, YouTubeLink: "https://www.youtube.com/watch?v=OSP7o4lzIoQ" }] }] }];
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "addYoutubeLink").and.returnValue(defer.promise);
        scope.updateYouTubeLink(youtubeLink, 1);
        defer.resolve(elearningsectionPage);
        scope.$root.$apply();
        expect(scope.lectureList[0].ELearningSection[0].ELearningSectionPage[0].YouTubeLink).toBe(youtubeLink);
        expect(scope.isYoutubeEdit).toBeFalsy();
        expect(scope.eLearningSectionPage.YouTubeLink).toBe("");
    });
    it("should cancel youtube link", function () {
        scope.cancelYouTubeLink();
        scope.$root.$apply();
        expect(scope.eLearningSectionPage.YouTubeLink).toBe("");
        expect(scope.interactiveQuestion).toBe("");
        expect(scope.eLearningSectionPageId).toBeUndefined();
        expect(scope.isYoutubeEdit).toBeFalsy();
    });
    it("should add interactive question", function () {
        var interactive = new Model.Interactive();
        interactive.ELearningSectionId = 1;
        interactive.QuestionText = "Question";
        var topicName = "interactive";
        // var defer = $qService.defer();
        // spyOn(mockedeLearningContentService, "addInteractiveQuestion").and.returnValue(defer.promise);
        scope.addInteractiveQuestion(interactive.QuestionText, interactive.ELearningSectionId, topicName);
        //   defer.resolve(interactive);
        scope.$root.$apply();
        // expect(scope.treeViewCollection.length).toBe(1);
        expect(scope.interactiveQuestion).toBe(interactive.QuestionText);
        // expect(scope.interactive.QuestionText).toBe("");
        //  expect(scope.interactive.TopicName).toBe("");
        expect(scope.isInteractiveQuestion).toBeFalsy();
        expect(scope.isInteractiveDisabled).toBeTruthy();
        //  expect(scope.interactiveQuestionRequired).toBe("");
    });
    it("should not add interactive question without question text", function () {
        var interactive = new Model.Interactive();
        interactive.ELearningSectionId = 1;
        interactive.QuestionText = "";
        var topicName = "Interactive";
        scope.addInteractiveQuestion(interactive.QuestionText, interactive.ELearningSectionId, topicName);
        scope.$root.$apply();
        expect(scope.interactiveQuestionRequired).toBe(stringConstatnts.interactiveQuestionRequired);
    });
    it("should not add interactive question without topic name", function () {
        var interactive = new Model.Interactive();
        interactive.ELearningSectionId = 1;
        interactive.QuestionText = "question";
        var topicName = "";
        scope.addInteractiveQuestion(interactive.QuestionText, interactive.ELearningSectionId, topicName);
        scope.$root.$apply();
        expect(scope.isTopicNameRequired).toBeTruthy();
        expect(scope.topicNameRequiredMSg).toBe(stringConstatnts.topicNameRequiredMsg);
    });
    it("should add interactive parent option", function () {
        var interactive = new Model.Interactive();
        interactive.InteractiveQuestionId = 1;
        interactive.interactiveOptionText = "Option";
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "addInteractiveOption").and.returnValue(defer.promise);
        scope.addInteractiveRootOption(interactive.interactiveOptionText);
        defer.resolve(interactive);
        scope.$root.$apply();
        expect(scope.treeViewCollection.length).toBe(1);
        expect(scope.interactive.interactiveOptionText).toBe("");
        expect(scope.interactiveOptionRequired).toBe("");
    });
    it("should not add interactive parent option without entering text", function () {
        var interactive = new Model.Interactive();
        interactive.InteractiveQuestionId = 1;
        interactive.interactiveOptionText = "";
        scope.addInteractiveRootOption(interactive.interactiveOptionText);
        scope.$root.$apply();
        expect(scope.interactiveOptionRequired).toBe(stringConstatnts.interactiveOptionRequired);
    });
    it("should add interactive child option", function () {
        var tree = new Object();
        var currentNode = { collapsed: false, id: 1, name: "Option", parent: true, children: [] };
        tree["currentNode"] = currentNode;
        var interactive = new Model.Interactive();
        interactive.InteractiveQuestionId = 1;
        interactive.ParentIntrectiveOptionId = currentNode.id;
        interactive.interactiveOptionText = "Option1";
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "addInteractiveOption").and.returnValue(defer.promise);
        scope.addInteractiveChildOption(interactive.interactiveOptionText, tree);
        defer.resolve(interactive);
        scope.$root.$apply();
        expect(currentNode.children.length).toBe(1);
        expect(scope.interactive.interactiveOptionText).toBe("");
        expect(scope.interactiveOptionRequired).toBe("");
    });
    it("should not add interactive child option without entering text", function () {
        var interactive = new Model.Interactive();
        interactive.InteractiveQuestionId = 1;
        interactive.interactiveOptionText = "";
        var currentNode = { collapsed: false, id: 1, name: "Option", parent: true, children: [] };
        scope.addInteractiveChildOption(interactive.interactiveOptionText, currentNode);
        scope.$root.$apply();
        expect(scope.interactiveOptionRequired).toBe(stringConstatnts.interactiveOptionRequired);
    });
    it("should bind interactive tree for edit", function () {
        var sectionPageId = 1;
        var interactive = new Object();
        interactive["id"] = 2;
        interactive["name"] = "Interactive";
        interactive["ELearningSectionPageId"] = 1;
        interactive["children"] = [{ id: 1, name: "child1" }];
        var defer = $qService.defer();
        spyOn(mockedeLearningContentService, "interactiveDetail").and.returnValue(defer.promise);
        defer.resolve(interactive);
        scope.editInteractive(sectionPageId);
        scope.$root.$apply();
        expect(scope.interactive.ELearningSectionPageId).toBe(interactive["ELearningSectionPageId"]);
        expect(scope.interactiveQuestionId).toBe(interactive["id"]);
        expect(scope.interactiveQuestion).toBe(interactive["name"]);
        expect(scope.treeViewCollection).toBe(interactive["children"]);
        expect(scope.isInteractiveQuestion).toBeFalsy();
        expect(scope.isInteractive).toBeTruthy();
        expect(scope.loadnigFlags).toBeFalsy();
    });
    it("should visible preview panel", function () {
        scope.preview();
        scope.$root.$apply();
        expect(scope.isPreview).toBeTruthy();
    });
    it("should hide preview panel", function () {
        scope.hidePreview();
        scope.$root.$apply();
        expect(scope.isPreview).toBeFalsy();
    });
    function initialize() {
        createELearningContentController = $controllerConstructor('createELearningContentController', {
            $scope: scope,
            mockedeLearningContentService: eLearningContentService,
            $rootScope: rootScope,
            $log: log,
            $location: location,
            $http: http,
            $window: window,
            $routeParams: routeParams,
            $modal: modal,
            apiPath: "http://localhost:4424"
        });
    }
});
//# sourceMappingURL=CreateELearningContentControllerSpec.js.map
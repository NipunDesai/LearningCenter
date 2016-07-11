/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
"user strict";
describe("eLearningContentServicesspec", function () {
    var eLearningContentMockservice, $qService, httpBackend;
    beforeEach(angular.mock.module("app"));
    beforeEach(inject(function (eLearningContentservice, $q, $httpBackend) {
        eLearningContentMockservice = eLearningContentservice;
        $qService = $q;
        httpBackend = $httpBackend;
    }));
    it("should call GET on api/ELearningContent/getELearningContentList to get all eLearning content.", function () {
        httpBackend.when("GET", apiPaths.getAllELearningContentList).respond([{ Id: 1 }]);
        var promise = eLearningContentMockservice.eLearningContentList();
        httpBackend.flush();
        promise.then(function (result) {
            expect(result.length).toBe(1);
        });
    });
    it("should call GET on api/ELearningContent/updateELearningContentRate to update content rate", function () {
        var content = new Model.Content;
        content.ContentId = 1;
        content.Title = "ELearning";
        content.Rate = 9;
        httpBackend.when("POST", apiPaths.updateELearningContentRate).respond(content);
        var promise = eLearningContentMockservice.updateELearningContentRate(content);
        httpBackend.flush();
        promise.then(function (result) {
            expect(result.length).toBe(1);
        });
    });
    it("should Call GET on api/ELearningContent/viewCreatorDetails to get contentCreator Details", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.contentCreatorDetails + '?id=1').respond(id);
        var promise = eLearningContentMockservice.viewCreatorDetails(id);
        promise.then(function (result) {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/viewContentDetail' to get contentDetails by Contentid", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.viewContentDetails + '?id=1').respond(id);
        var promise = eLearningContentMockservice.viewContentDetail(id);
        promise.then(function (result) {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/eLearningSectionDetail' to get eLearningSection Details.", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.eLearningSectionDetails + '?id=1').respond(id);
        var promise = eLearningContentMockservice.eLearningSectionDetail(id);
        promise.then(function (result) {
            expect(result.length).toBe(1);
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/getELearningContentById' to get eLearning content.", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.getELearningContentById + '?id=1').respond(id);
        var promise = eLearningContentMockservice.getELearningContentById(id);
        promise.then(function (result) {
            expect(result[0].Id).toBe(id);
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/deleteELearningContentById' to Delete ELearning Content.", function () {
        var id = 1;
        httpBackend.when("GET", apiPaths.deleteELearningContentById + '?id=1').respond(id);
        var promise = eLearningContentMockservice.deleteELearningContentById(id);
        promise.then(function (result) {
            expect(result).toBeNull();
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/getContentCreatorName' elearning content creator name.", function () {
        var content = new Model.Content();
        content.CreatedBy = "Pooja Shah";
        httpBackend.expectGET(apiPaths.getContentCreatorName).respond(content);
        var promise = eLearningContentMockservice.eLearningContentCreatorName();
        promise.then(function (result) {
            expect(content.CreatedBy).toBe("Pooja Shah");
        });
        httpBackend.flush();
    });
    it("should call POST on 'api/ELearningContent/createContent' save elearning content.", function () {
        var content = new Model.Content();
        content.CreatedBy = "Pooja Shah";
        httpBackend.expectPOST(apiPaths.createContent).respond(content);
        var promise = eLearningContentMockservice.createELearningContent(content);
        promise.then(function (result) {
            expect(content.CreatedBy).toBe("Pooja Shah");
        });
        httpBackend.flush();
    });
    it("should call GET on ' api/values/IsProfileCreated' get current user profile info.", function () {
        var user = new Model.UserInfo();
        user.FirstName = "Pooja";
        user.Location = "Vadodara";
        httpBackend.expectGET(apiPaths.isProfileCreated).respond(user);
        var promise = eLearningContentMockservice.getCurrentUserProfileInfo();
        promise.then(function (result) {
            expect(user.Location).toBe("Vadodara");
        });
        httpBackend.flush();
    });
    it("should call POST on 'api/ELearningContent/AddLecture' create lecture.", function () {
        var lecture = new Model.ELearningLecture();
        lecture.ContentId = 1;
        lecture.Title = "Lecture";
        httpBackend.expectPOST(apiPaths.addLecture).respond(lecture);
        var promise = eLearningContentMockservice.createLecture(lecture);
        promise.then(function (result) {
            expect(lecture.Title).toBe("Lecture");
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/GetLectureListById' get elearning lecture list.", function () {
        var contentId = 1;
        var lectureCollection = [{ Id: '1', Title: 'Content sample', ELearningLecture: [{ ELearningLectureId: '1', Title: 'Lecture', ELearningSection: [] }] }];
        var content = new Object();
        content["eLearningContentCollection"] = lectureCollection;
        httpBackend.expectGET(apiPaths.getLectureList + '?contentId=1').respond(content);
        var promise = eLearningContentMockservice.getELearningLectureList(contentId);
        promise.then(function (result) {
            expect(content["eLearningContentCollection"].length).toBe(1);
        });
        httpBackend.flush();
    });
    it("should call POST on 'api/ELearningContent/AddSection' create section.", function () {
        var setcion = new Model.ELearningSection();
        setcion.ELearningLectureId = 1;
        setcion.Title = "Section";
        httpBackend.expectPOST(apiPaths.addSection).respond(setcion);
        var promise = eLearningContentMockservice.createSection(setcion);
        promise.then(function (result) {
            expect(setcion.Title).toBe("Section");
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/DeleteLectureById' to Delete ELearning lecture.", function () {
        var lectureId = 1;
        httpBackend.expectDELETE(apiPaths.deleteLectureById + '?lectureId=1').respond(lectureId);
        var promise = eLearningContentMockservice.deleteContentLectureByid(lectureId);
        promise.then(function (result) {
            expect(result).toBeTruthy();
        });
        httpBackend.flush();
    });
    it("should call POST on 'api/ELearningContent/SaveYouTubeLink' to save youtube link.", function () {
        var setcionPage = new Model.ELearningSectionPage();
        setcionPage.Id = 1;
        setcionPage.YouTubeLink = "https://www.youtube.com/watch?v=OSP7o4lzIoQ";
        httpBackend.expectPOST(apiPaths.saveYouTubeLink).respond(setcionPage);
        var promise = eLearningContentMockservice.addYoutubeLink(setcionPage);
        promise.then(function (result) {
            expect(setcionPage.YouTubeLink).toBe("https://www.youtube.com/watch?v=OSP7o4lzIoQ");
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/ELearningContent/DeleteSectionById' to delete elearning section.", function () {
        var sectionId = 1;
        httpBackend.expectDELETE(apiPaths.deleteSectionById + '?sectionId=1').respond(sectionId);
        var promise = eLearningContentMockservice.deleteContentSectionById(sectionId);
        promise.then(function (result) {
            expect(result).toBeNull();
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/Interactive/AddInteractiveQuestion' to save interactive question.", function () {
        var interactiveQuestion = new Model.Interactive();
        interactiveQuestion.ELearningSectionId = 1;
        interactiveQuestion.QuestionText = "Question";
        httpBackend.expectPOST(apiPaths.addInteractiveQuestion).respond(interactiveQuestion);
        var promise = eLearningContentMockservice.addInteractiveQuestion(interactiveQuestion);
        promise.then(function (result) {
            expect(interactiveQuestion.QuestionText).toBe("Question");
        });
        httpBackend.flush();
    });
    it("should call GET on 'api/Interactive/AddInteractiveOption' to save interactive option.", function () {
        var interactiveOption = new Model.Interactive();
        interactiveOption.InteractiveQuestionId = 1;
        interactiveOption.interactiveOptionText = "Option";
        interactiveOption.ParentIntrectiveOptionId = 2;
        httpBackend.expectPOST(apiPaths.addInteractiveOption).respond(interactiveOption);
        var promise = eLearningContentMockservice.addInteractiveOption(interactiveOption);
        promise.then(function (result) {
            expect(interactiveOption.interactiveOptionText).toBe("Option");
        });
        httpBackend.flush();
    });
});
//# sourceMappingURL=eLearningContentServicesspec.js.map
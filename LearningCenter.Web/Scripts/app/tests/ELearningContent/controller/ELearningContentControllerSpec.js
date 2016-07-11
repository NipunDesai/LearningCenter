/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
"user strict";
describe("eLeaningControllerSpec", function () {
    var scope, $controllerConstuctor, log, eLearningContentMockService, location, upload, http, modal, window, routeParams, sce, $qService, defered, rootScope, eLearningContentController, httpBackend, apiPath;
    beforeEach(angular.mock.module("app"));
    beforeEach(inject(function ($controller, $rootScope, $log, eLearningContentservice, $location, $upload, $http, $modal, $window, $routeParams, $sce, $q, $httpBackend) {
        $controllerConstuctor = $controller;
        scope = $rootScope.$new(true);
        log = $log;
        eLearningContentMockService = eLearningContentservice;
        location = $location;
        upload = $upload;
        http = $http;
        modal = $modal;
        window = $window;
        routeParams = $routeParams;
        sce = $sce;
        $qService = $q;
        defered = $qService.defer();
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        apiPath = "http://localhost:4424";
        httpBackend.expectGET('api/ELearningContent/getELearningContentList').respond(200, null);
        httpBackend.expectGET('api/ELearningContent/getELearningContentList').respond(200, null);
        // httpBackend.expectGET('api/ELearningContent/getELearningContentById').respond(200, null);
        intialization();
    }));
    it("Should Be Setup Controller Scope", function () {
        expect(scope).toBeDefined();
        expect(eLearningContentController.eLearningContentList).toBeDefined();
        expect(eLearningContentController.hoveringOver).toBeDefined();
        expect(eLearningContentController.viewCreatorDetails).toBeDefined();
        expect(eLearningContentController.viewContentDetail).toBeDefined();
        expect(eLearningContentController.eLearningSectionDetailById).toBeDefined();
        expect(eLearningContentController.eLearningSectionDetail).toBeDefined();
        expect(eLearningContentController.deleteConfiramtionDialog).toBeDefined();
        expect(eLearningContentController.deleteELearningContentById).toBeDefined();
    });
    it("Should Be Get ELearning ContentList", function () {
        var defered1 = $qService.defer();
        var contentCollection = [{ Id: 1, Rate: 3, Title: "sdeseds", UserId: 2 }];
        spyOn(eLearningContentMockService, "eLearningContentList").and.returnValue(defered1.promise);
        eLearningContentController.eLearningContentList();
        defered1.resolve(contentCollection);
        rootScope.$apply();
        expect(scope.eLearningContentCollection.length).toBe(contentCollection.length);
    });
    it("Should Be Update ELearning Content Rate", function () {
        var defered1 = $qService.defer();
        var contentCollection = { Id: 1, Rate: 3, Title: "sdeseds", UserId: 2, IsReadonly: true };
        var value = 1;
        spyOn(eLearningContentMockService, "updateELearningContentRate").and.returnValue(defered1.promise);
        eLearningContentController.hoveringOver(value, contentCollection);
        defered1.resolve(contentCollection);
        rootScope.$apply();
        expect(contentCollection.Rate).toBe(value);
    });
    it("Should Be ReadOnly ELearning Content Rate", function () {
        var defered1 = $qService.defer();
        var contentCollection = { Id: 1, Rate: 3, Title: "sdeseds", UserId: 2, IsReadonly: false };
        var value = 1;
        eLearningContentController.hoveringOver(value, contentCollection);
        defered1.resolve(contentCollection);
        rootScope.$apply();
        expect(scope.overStar).toBe(contentCollection.Rate);
    });
    it("Should Be Get Content Creator Details", function () {
        var defered1 = $qService.defer();
        var userId = 1;
        var user = [{ Age: "23", JobTitle: "Software Developer", CompanyName: "Promact info", Education: "BE", FirstName: "Nipun", LastName: "Desai", UserId: 1, UserName: "nipun@promactinfo.com" }];
        spyOn(eLearningContentMockService, "viewCreatorDetails").and.returnValue(defered1.promise);
        spyOn(modal, "open").and.callFake(function () { });
        eLearningContentController.viewCreatorDetails(userId);
        defered1.resolve(user);
        rootScope.$apply();
        expect(scope.userCollection.length).toBe(user.length);
    });
    it("Should Be Get ContentDetails By ContentId", function () {
        var defered1 = $qService.defer();
        var contentId = 1;
        var content = [{ Id: 1, ContentImage: "/UploadFiles/ContentFiles/22/0c4ce388-41eb-48ca-9fcd-66b3c38ec014.jpg", ContentImageGuid: "0c4ce388-41eb-48ca-9fcd-66b3c38ec014.jpg", CreatedBy: "Nipun Desai", CreatedDateTime: "21 November 2014", CreatedOn: "Nipun Desai", Description: "In this interactive object, learners review the parts of the gastrointestinal system and then check their knowledge in a matching exercise. Source: Wisc-Online (an online learning resource)", Title: "Gastrointestinal System Anatomy", UserId: 1 }];
        spyOn(eLearningContentMockService, "viewContentDetail").and.returnValue(defered1.promise);
        eLearningContentController.viewContentDetail(contentId);
        defered1.resolve(content);
        rootScope.$apply();
        expect(scope.contentCollection.length).toBe(content.length);
    });
    it("Should Be Get ELearning SectionDetail.", function () {
        var defered1 = $qService.defer();
        var id = 1;
        var sectionCollection = [{ ELearningLectureId: 41, ELearningSectionId: 58, ELearningSectionPage: [{ ELearningSectionId: 58, ELearningSectionPageId: 26, IsInteractive: false, SectionContentData: null, SectionContentFileGuid: "/UploadFiles/ContentPages/22/7c3046ae-3414-4d93-8803-2e94b8e540cd.jpg", SectionContentFileName: "Desert.jpg", SectionContentType: "image" }], Title: "ss" }];
        spyOn(eLearningContentMockService, "eLearningSectionDetail").and.returnValue(defered1.promise);
        eLearningContentController.eLearningSectionDetail(id);
        defered1.resolve(sectionCollection);
        rootScope.$apply();
        expect(scope.eLearningSectionPageList.length).toBe(sectionCollection.length);
    });
    it("Should Be Redirect to Detail Page.", function () {
        var id = 1;
        eLearningContentController.eLearningSectionDetailById(id);
        expect(scope.eLearningSectionId).toBe(id);
    });
    it("Should Be Open Delete ELearningContent Confirmation DialogBox", function () {
        var defered1 = $qService.defer();
        var contentId = 1;
        var contentCollection = [{ Id: 1, Title: "ELearning Content" }];
        spyOn(eLearningContentMockService, "getELearningContentById").and.returnValue(defered1.promise);
        spyOn(modal, "open").and.callFake(function () { });
        eLearningContentController.deleteConfiramtionDialog(contentId);
        defered1.resolve(contentCollection);
        rootScope.$apply();
        expect(scope.deleteContentCollection.length).toBe(contentCollection.length);
    });
    it("Should Be Delete ELearningContent By Content Id", function () {
        var defered1 = $qService.defer();
        var contentId = 1;
        var contentCollection = null;
        spyOn(modal, "open").and.returnValue({ dismiss: function () { }
        });
        eLearningContentController.deleteConfirmationModal = modal.open("templateUrl");
        spyOn(eLearningContentController.deleteConfirmationModal, "dismiss");
        spyOn(eLearningContentMockService, "deleteELearningContentById").and.returnValue(defered1.promise);
        eLearningContentController.deleteELearningContentById(contentId);
        rootScope.$apply();
        expect(contentCollection).toBeNull();
    });
    it("Should Be Redirect to LecturePage", function () {
        var id = 1;
        eLearningContentController.openELearningLecturePage(id);
        expect(id).toBe(1);
    });
    it("Should Be Redirect to IntrectivePage", function () {
        var id = 1;
        eLearningContentController.getAllInteractiveQuestions(id);
        expect(id).toBe(1);
    });
    it("Should Be Redirect To IntrectiveResultPage", function () {
        var id = 1;
        eLearningContentController.getInteractiveResult(id);
        expect(id).toBe(1);
    });
    function intialization() {
        eLearningContentController = $controllerConstuctor("eLearningContentController", {
            $scope: scope,
            $log: log,
            eLearningContentservice: eLearningContentMockService,
            $location: location,
            $upload: upload,
            $http: http,
            $modal: modal,
            $window: window,
            $routeParams: routeParams,
            $sce: sce,
            $rootScope: rootScope,
            apiPath: "http://localhost:4424"
        });
    }
});
//# sourceMappingURL=ELearningContentControllerSpec.js.map
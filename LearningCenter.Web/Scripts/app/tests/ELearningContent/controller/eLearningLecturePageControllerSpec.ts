/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
"user strict";
describe("eLearningLectureControllerSpec", () => {
    var scope,
        $controllerConstructor: ng.IControllerService,
        log,
        location,
        routeParams,
        sce,
        eLearningLectureMockupservices,
        defered,
        rootScope,
        $qService,
        eLearningLecturePageController;

    beforeEach(angular.mock.module("app"));

    beforeEach(inject(($controller: ng.IControllerService,
        $rootScope:ng.IRootScopeService,
        $log: ng.ILogService,
        $q:ng.IQService,
        $location,
        $routeParams,
        $sce,
        eLearningLecturePageService) => {
        $controllerConstructor = $controller;
        scope = $rootScope.$new(true);
        log = $log;
        location = $location;
        routeParams = $routeParams;
        sce = $sce;
        $qService = $q;
        rootScope = $rootScope;
        eLearningLectureMockupservices = eLearningLecturePageService;
        defered = $qService.defer();

        intialization();
    }));

    it("Should Be Setup Controller Scope", () => {
        expect(eLearningLecturePageController).toBeDefined();
        expect(eLearningLecturePageController.getAllELearningLecturePage).toBeDefined();
        expect(eLearningLecturePageController.viewELearningSectionById).toBeDefined();
    });

    it("Should Be Get All ELearningLeacturePage", () => {
        var sectionId = 1;
        var defered1 = $qService.defer();
        spyOn(eLearningLectureMockupservices, "getELearningLectureById").and.returnValue(defered1.promise);
        var sectionCollection = [{ContentId: 1, ContentImageGuid: "d88d2e4f-2b4e-499d-833a-6da16894c3a0.jpg", CreatedOn: "nipun desai", Description: "test content", ELearningLecture: [{ContentId: 1, ELearningLectureId: 1, ELearningSectionPage: [{ ELearningSectionId: 1, ELearningSectionPageId: 1, IsInteractive: false, SectionContentData: null, SectionContentFileGuid: "/UploadFiles/ContentPages/1/696c9d94-730a-4918-89cf-1f6c5782de83.jpg", SectionContentFileName: "Penguins.jpg", SectionContentType: "image", TopicName: "image1" }],Title: "lecture 1",Width: 0}],Title: "ELearning Test",UserId: 1}];
       // scope.selectionPageList = [{ELearningLectureId: 41, ELearningSectionId: 58, ELearningSectionPage: [{ELearningSectionId: 58,ELearningSectionPageId: 26,IsInteractive: false,SectionContentData: null,SectionContentFileGuid: "/UploadFiles/ContentPages/22/7c3046ae-3414-4d93-8803-2e94b8e540cd.jpg",SectionContentFileName: "Desert.jpg",SectionContentType: "image"}],Title: "ss"}];
        eLearningLecturePageController.getAllELearningLecturePage(sectionId);
        defered1.resolve(sectionCollection);
        rootScope.$apply();
        expect(scope.sectionPageCollection.length).toBe(sectionCollection.length);
    });

    //it("Should Be Get All ELearningSection By Id", () => {
    //    var sectionId = 1;
    //    var defered1 = $qService.defer();
    //    spyOn(eLearningLectureMockupservices, "viewELearningSectionById").and.returnValue(defered1.promise);
    //    var sectionCollection = [{ ELearningLectureId: 41, ELearningSectionId: 58, ELearningSectionPage: [{ ELearningSectionId: 58, ELearningSectionPageId: 26, IsInteractive: false, SectionContentData: null, SectionContentFileGuid: "/UploadFiles/ContentPages/22/7c3046ae-3414-4d93-8803-2e94b8e540cd.jpg", SectionContentFileName: "Desert.jpg", SectionContentType: "image" }], Title: "ss" }];
    //    //scope.selectionPageList = [{ ELearningLectureId: 41, ELearningSectionId: 58, ELearningSectionPage: [{ ELearningSectionId: 58, ELearningSectionPageId: 26, IsInteractive: false, SectionContentData: null, SectionContentFileGuid: "/UploadFiles/ContentPages/22/7c3046ae-3414-4d93-8803-2e94b8e540cd.jpg", SectionContentFileName: "Desert.jpg", SectionContentType: "image" }], Title: "ss" }];
    //    eLearningLecturePageController.viewELearningSectionById(sectionId);
    //    defered1.resolve(sectionCollection);
    //    rootScope.$apply();
    //    expect(scope.sectionPageCollection[0].ELearningSectionPage.length).toBe(sectionCollection.length);
    //});

    //it("should be get participate details", () => {
    //    var sectionId = 1;
    //    var defered1 = $qService.defer();
    //    eLearningLecturePageController.viewInteractiveDetail(sectionId);
    //    defered1.resolve(sectionId);
    //    rootScope.$apply();
    //    expect(1).toBe(sectionId);

    //});

    function intialization() {
        eLearningLecturePageController = $controllerConstructor("eLearningLecturePageController", {
            $scope:scope,
            $log: log,
            $location: location,
            $routeParams: routeParams,
            $sce: sce,
            $rootScope: rootScope,
            eLearningLecturePageService :eLearningLectureMockupservices
        });
    }
});
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
"use strict";

describe("interactiveControllerSpec", () => {
    var scope,
        $controllerConstructor: ng.IControllerService,
        log,
        location,
        routeParams,
        sce,
        intrectiveMockService,
        modal,
        $qService,
        defered,
        rootScope,
        interactiveController,
        apiPath;
    beforeEach(angular.mock.module("app"));

    beforeEach(inject(($controller: ng.IControllerService,
        $rootScope: ng.IRootScopeService,
        $log: ng.ILogService,
        $q: ng.IQService,
        $sce,
        interactiveService,
        $modal,
        $location,
        $routeParams
    ) => {
        $controllerConstructor = $controller;
        scope = $rootScope.$new(true);
        log = $log;
        location = $location;
        routeParams = $routeParams;
        sce = $sce;
        intrectiveMockService = interactiveService;
        modal = $modal;
        $qService = $q;
        defered = $qService.defer();
        rootScope = $rootScope;
        apiPath = "http://localhost:4424";
        intialization();

    }));

    it('Should Be Setup Controller scope', () => {
        expect(interactiveController).toBeDefined();
        expect(interactiveController.getAllInteractiveQuestions).toBeDefined();
        expect(interactiveController.getAllInteractiveQuestions).toBeDefined();
        expect(interactiveController.saveInteractiveResult).toBeDefined();
        expect(interactiveController.getInteractiveQuestionById).toBeDefined();
        expect(interactiveController.getInteractiveResultByUserId).toBeDefined();
        expect(interactiveController.getAllUserName).toBeDefined();
    });

    it("Should Be Get All User",() => {
        var defered1 = $qService.defer();
        var userCollection = [{ Age: "23", JobTitle: "Software Developer", CompanyName: "Promact info",Education: "BE",FirstName: "Nipun",LastName: "Desai",UserId: 1,UserName: "nipun@promactinfo.com" }];
        spyOn(intrectiveMockService, "getAllUserName").and.returnValue(defered1.promise);
        interactiveController.getAllUserName();
        defered1.resolve(userCollection);
        rootScope.$apply();
        expect(scope.getAllUserCollection.length).toBe(userCollection.length);
    });

    it("Should Be Get All Question", () => {
        var contentId = 1;
        var defered1 = $qService.defer();
        var questionCollection = [{Id : 1,ELearningSectionPageId: 26,IntrectiveQuestionId: 1,Option: "abc testing ?"}];
        spyOn(intrectiveMockService, "getAllInteractiveQuestions").and.returnValue(defered1.promise);
        interactiveController.getAllInteractiveQuestions(contentId);
        defered1.resolve(questionCollection);
        rootScope.$apply();
        expect(scope.treeCollection.length).toBe(questionCollection.length);
        expect(scope.userInteractiveResult).toBe(false);
    });

    it("Should Be SaveIntrective Result", () => {
        var defered1 = $qService.defer();
        var optionId = 1;
        var intrectiveResult = { Id: 1, UserResponse: false };
        spyOn(intrectiveMockService, "saveInteractiveResult").and.returnValue(defered1.promise);
        interactiveController.saveInteractiveResult(optionId);
        defered1.resolve(intrectiveResult);
        rootScope.$apply();
        expect(intrectiveResult.UserResponse).toBe(false);

    });

    it("Should Be Open Intrective result Already Exist DialogBox.", () => {
        var defered1 = $qService.defer();
        var optionId = 1;
        var intrectiveResult = { Id: 1, UserResponse: true };
        spyOn(modal, "open").and.callFake(() => { });
        spyOn(intrectiveMockService, "saveInteractiveResult").and.returnValue(defered1.promise);
        interactiveController.saveInteractiveResult(optionId);
        defered1.resolve(intrectiveResult);
        rootScope.$apply();
        expect(intrectiveResult.UserResponse).toBe(true);

    });

    it("Should Be Get All Question By Content Id", () => {
        var contentId = 1;
        var defered1 = $qService.defer();
        var questionCollection = [{ Id: 1, ELearningSectionPageId: 26, IntrectiveQuestionId: 1, Option: "abc testing ?" }];
        spyOn(intrectiveMockService, "getAllInteractiveQuestion").and.returnValue(defered1.promise);
        interactiveController.getAllInteractiveQuestion(contentId);
        defered1.resolve(questionCollection);
        rootScope.$apply();
        expect(scope.interactiveQuestionCollection.length).toBe(questionCollection.length);
    });

    it("Should Be Get IntrectiveQuestion Details By QuestionId", () => {
        var id = 1;
        var interactiveQuestionCollection = [{Id: 1, OptionAc: [{IntrectiveOptionId: 1,IntrectiveQuestionId: 0,IsCorrect: false,Option: "A",ParentIntrectiveOptionId: 0}],QuestionId: 1,QuestionText: "abcTest?",UserName: "nipun@promactinfo.com",UserResponse: false}];
        var defered1 = $qService.defer();
        scope.interactiveQuestionCollection =[{ Id: 1, OptionAc: [], QuestionId: 1, QuestionText: "abcTest?", UserName: "nipun@promactinfo.com", UserResponse: false }];
        spyOn(intrectiveMockService, "getInteractiveQuestionById").and.returnValue(defered1.promise);
        interactiveController.getInteractiveQuestionById(id);
        defered1.resolve(interactiveQuestionCollection);
        rootScope.$apply();
        expect(scope.interactiveQuestionCollection.length).toBe(interactiveQuestionCollection.length);

    });

    it("Should Be Get IntrectiveResult Details By UserId", () => {
        var userId = 1;
        var intrectiveCollection = [{Id: 1, FirstName: "Nipun", LastName: "Desai", ResultAc: [{ Id: 1,QuestionText: "abc testing ?",UserResponse: false,isCollapsed: false}], UserId: 1, UserName: "nipun@promactinfo.com" }];
        scope.getAllUserCollection = [{ Id: 1, FirstName: "Nipun", LastName: "Desai", ResultAc: [], UserId: 1, UserName: "nipun@promactinfo.com" }];
        var defered1 = $qService.defer();
        spyOn(intrectiveMockService, "getInteractiveResultByUserId").and.returnValue(defered1.promise);
        interactiveController.getInteractiveResultByUserId(userId);
        defered1.resolve(intrectiveCollection);
        rootScope.$apply();
        expect(scope.getAllUserCollection.length).toBe(intrectiveCollection.length);
    });
    function intialization() {
        interactiveController = $controllerConstructor("interactiveController", {
            $scope: scope,
            $log: log,
            $location: location,
            $routeParams: routeParams,
            $sce: sce,
            interactiveService: intrectiveMockService,
            $modal: modal,
            $rootScope: rootScope,
            apiPath:"http://localhost:4424"
        });
    }
});
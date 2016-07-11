"use strict";

describe("profileServiceSpec", () => {
    var profileMockService,
        $qService: ng.IQService,
        httpBackend;
    beforeEach(angular.mock.module("app"));

    beforeEach(inject((profileService,
        $q: ng.IQService,
        $httpBackend: ng.IHttpBackendService
        ) => {
        profileMockService = profileService;
        $qService = $q;
        httpBackend = $httpBackend;
    }));

    it("should call GET on api/values/getCurrentUserInfo to get user profile info", () => {
        var user = new Model.UserInfo;
        user.Id = 1;
        user.FirstName = "pooja";
        user.LastName = "shah";
        httpBackend.expectGET(apiPaths.getProfileInfo).respond(user);
        var promise = profileMockService.ProfileInfo();
        httpBackend.flush();
        promise.then((result) => {
            expect(result.FirstName).toBe(user.FirstName);
        });

    });

    it("should call save  on 'api/values/postCurrentUserInfo to save user profile info", () => {
        var user = new Model.UserInfo;
        user.Id = 1;
        user.FirstName = "pooja";
        user.LastName = "shah";
        httpBackend.expectPOST(apiPaths.postProfileInfo).respond(user);
        var promise = profileMockService.SaveUserInfo(user);
        httpBackend.flush();
        promise.then((result) => {
            expect(result.FirstName).toBe(user.FirstName);
        });

    });



});
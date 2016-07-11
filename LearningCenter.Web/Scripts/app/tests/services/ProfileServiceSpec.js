"use strict";
describe("profileServiceSpec", function () {
    var profileMockService, $qService, httpBackend;
    beforeEach(angular.mock.module("app"));
    beforeEach(inject(function (profileService, $q, $httpBackend) {
        profileMockService = profileService;
        $qService = $q;
        httpBackend = $httpBackend;
    }));
    it("should call GET on api/values/getCurrentUserInfo to get user profile info", function () {
        var user = new Model.UserInfo;
        user.Id = 1;
        user.FirstName = "pooja";
        user.LastName = "shah";
        httpBackend.expectGET(apiPaths.getProfileInfo).respond(user);
        var promise = profileMockService.ProfileInfo();
        httpBackend.flush();
        promise.then(function (result) {
            expect(result.FirstName).toBe(user.FirstName);
        });
    });
    it("should call save  on 'api/values/postCurrentUserInfo to save user profile info", function () {
        var user = new Model.UserInfo;
        user.Id = 1;
        user.FirstName = "pooja";
        user.LastName = "shah";
        httpBackend.expectPOST(apiPaths.postProfileInfo).respond(user);
        var promise = profileMockService.SaveUserInfo(user);
        httpBackend.flush();
        promise.then(function (result) {
            expect(result.FirstName).toBe(user.FirstName);
        });
    });
});
//# sourceMappingURL=ProfileServiceSpec.js.map
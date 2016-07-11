"use strict";
describe("ProfileControllerSpec", function () {
    var scope, $controllerConstructor, $qService, ProfileController, defered, log, location, mockedprofileService, apiPath, rootScope;
    beforeEach(angular.mock.module("app"));
    beforeEach(inject(function ($controller, $rootScope, $q, $log, $location, $upload, profileService) {
        $controllerConstructor = $controller;
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new(true);
        $qService = $q;
        mockedprofileService = profileService;
        rootScope = $rootScope;
        location = $location;
        defered = $qService.defer();
        apiPath = "http://localhost:4424";
        initialize();
    }));
    it('Should setup controller scope', function () {
        expect(scope).toBeDefined();
        expect(scope.getAllUserInfo).toBeDefined();
        expect(scope.saveUserInfo).toBeDefined();
        expect(scope.profileClick).toBeDefined();
    });
    it("Should get user info", function () {
        var users = new Object();
        users["FirstName"] = "Pooja";
        users["LastName"] = "Shah";
        var defer = $qService.defer();
        spyOn(mockedprofileService, "ProfileInfo").and.returnValue(defer.promise);
        scope.getAllUserInfo();
        defer.resolve(users);
        scope.$root.$apply();
        expect(scope.user.FirstName).toBe("Pooja");
    });
    it("Should redirect to create ELearningContent Page", function () {
        var users = new Object();
        users["FirstName"] = "Pooja";
        users["LastName"] = "Shah";
        users["Address"] = "Vadodara";
        rootScope.url = "ELearning";
        var cityName = "Vadodara,Gujarat,India";
        var countryIsoCode = "IN";
        var defer = $qService.defer();
        spyOn(mockedprofileService, "SaveUserInfo").and.returnValue(defer.promise);
        scope.saveUserInfo(cityName, countryIsoCode);
        defer.resolve(users);
        scope.$root.$apply();
        expect(location.$$path).toBe("/1/ELearning/CreateCourse");
    });
    it("Should redirect to Elearningcontentlist Page", function () {
        var users = new Object();
        users["FirstName"] = "Pooja";
        users["LastName"] = "Shah";
        users["Address"] = "Vadodara";
        var cityName = "Vadodara,Gujarat,India";
        var countryIsoCode = "IN";
        rootScope.url = "Sample";
        var defer = $qService.defer();
        spyOn(mockedprofileService, "SaveUserInfo").and.returnValue(defer.promise);
        scope.saveUserInfo(cityName, countryIsoCode);
        defer.resolve(users);
        scope.$root.$apply();
        expect(location.$$path).toBe("/CourseList");
    });
    it("Should Set rootscope Variable", function () {
        scope.profileClick();
        scope.$root.$apply();
        expect(rootScope.url).toEqual("profile");
    });
    function initialize() {
        ProfileController = $controllerConstructor('profileController', {
            $scope: scope,
            mockedprofileService: profileService,
            $rootScope: rootScope,
            $log: log,
            $location: location,
            apiPath: "http://localhost:4424"
        });
    }
});
//# sourceMappingURL=ProfileControllerSpec.js.map
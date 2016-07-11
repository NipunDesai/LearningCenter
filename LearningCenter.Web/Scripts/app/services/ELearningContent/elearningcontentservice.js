/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var eLearningContentService = (function () {
    function eLearningContentService($resource, $q, $log) {
        this.$resource = $resource;
        this.$q = $q;
        this.$log = $log;
        this.$log.log('E-LearningContent Service Call');
        this.getAllELearningContentList = this.$resource(apiPaths.getAllELearningContentList);
        this.getContentCreatorName = this.$resource(apiPaths.getContentCreatorName);
        this.createContent = this.$resource(apiPaths.createContent);
        this.eLearningContentRate = this.$resource(apiPaths.updateELearningContentRate);
        this.getCategoryList = this.$resource(apiPaths.categoryList);
        this.deleteImage = this.$resource(apiPaths.deleteImage);
        this.previewContentById = this.$resource(apiPaths.getContentById);
        this.viewContentDetails = this.$resource(apiPaths.viewContentDetails);
        this.contentCreatorDetails = this.$resource(apiPaths.contentCreatorDetails);
        this.viewDescriptionDetails = this.$resource();
        this.isProfileCreated = this.$resource(apiPaths.isProfileCreated);
        this.addLecture = this.$resource(apiPaths.addLecture);
        this.eLearningLectureList = this.$resource(apiPaths.getLectureList);
        this.addSection = this.$resource(apiPaths.addSection);
        this.addSectionPageImage = this.$resource(apiPaths.addSectionPage);
        this.removeSectionPageContent = this.$resource(apiPaths.DeleteSectionPageContent);
        this.eLearningSectionDetails = this.$resource(apiPaths.eLearningSectionDetails);
        this.addEditorData = this.$resource(apiPaths.addSectionPageDateInHtml);
        this.eLearningContentById = this.$resource(apiPaths.getELearningContentById);
        this.deleteContentById = this.$resource(apiPaths.deleteELearningContentById);
        this.deleteLectureById = this.$resource(apiPaths.deleteLectureById);
        this.deleteSectionById = this.$resource(apiPaths.deleteSectionById);
        this.addInteractive = this.$resource(apiPaths.addInteractiveQuestion);
        this.saveInteractiveOptionResource = this.$resource(apiPaths.addInteractiveOption);
        this.viewIntrective = this.$resource(apiPaths.viewInteractiveDetails);
        this.saveYoutubeLink = this.$resource(apiPaths.saveYouTubeLink);
        this.myContentList = this.$resource(apiPaths.getAllMyContentList);
        this.launchMyContent = this.$resource(apiPaths.launchContent);
        this.getInteractiveDetail = this.$resource(apiPaths.getInteractiveDetail);
    }
    eLearningContentService.prototype.eLearningContentList = function () {
        this.$log.log("get all elearning content list");
        return this.getAllELearningContentList.query().$promise;
    };
    eLearningContentService.prototype.eLearningContentCreatorName = function (id) {
        return this.getContentCreatorName.get({ id: id }).$promise;
    };
    eLearningContentService.prototype.createELearningContent = function (resource) {
        return this.createContent.save(resource).$promise;
    };
    eLearningContentService.prototype.updateELearningContentRate = function (content) {
        this.$log.log("update content rate");
        return this.eLearningContentRate.save(content).$promise;
    };
    eLearningContentService.prototype.deleteCategoryImage = function (contentPic) {
        return this.deleteImage.delete({ fileInfoAc: contentPic }).$promise;
    };
    eLearningContentService.prototype.previewContent = function (id) {
        return this.previewContentById.get({ id: id }).$promise;
    };
    eLearningContentService.prototype.viewCreatorDetails = function (id) {
        this.$log.log("get content creator user name");
        return this.contentCreatorDetails.query({ id: id }).$promise;
    };
    eLearningContentService.prototype.getCurrentUserProfileInfo = function () {
        return this.isProfileCreated.get().$promise;
    };
    eLearningContentService.prototype.createLecture = function (resource) {
        return this.addLecture.save(resource).$promise;
    };
    eLearningContentService.prototype.getELearningLectureList = function (contentId) {
        return this.eLearningLectureList.get({ contentId: contentId }).$promise;
    };
    eLearningContentService.prototype.createSection = function (resource) {
        return this.addSection.save(resource).$promise;
    };
    eLearningContentService.prototype.viewContentDetail = function (id) {
        this.$log.log("get content in details");
        return this.viewContentDetails.query({ id: id }).$promise;
    };
    eLearningContentService.prototype.saveSectionPageImage = function (resource) {
        return this.addSectionPageImage.save(resource).$promise;
    };
    eLearningContentService.prototype.deleteSectionPageContent = function (ELearningSectionPageId) {
        return this.removeSectionPageContent.delete({ eLearningSectionPageId: ELearningSectionPageId }).$promise;
    };
    eLearningContentService.prototype.eLearningSectionDetail = function (id) {
        this.$log.log("get elearning section detail by id");
        return this.eLearningSectionDetails.query({ id: id }).$promise;
    };
    eLearningContentService.prototype.saveEditorData = function (resource) {
        return this.addEditorData.save(resource).$promise;
    };
    eLearningContentService.prototype.addYoutubeLink = function (resource) {
        return this.saveYoutubeLink.save(resource).$promise;
    };
    eLearningContentService.prototype.getELearningContentById = function (id) {
        this.$log.log("get eLearning content by id");
        return this.eLearningContentById.query({ id: id }).$promise;
    };
    eLearningContentService.prototype.deleteELearningContentById = function (id) {
        this.$log.log("Delete ELearning Content by id");
        return this.deleteContentById.query({ id: id }).$promise;
    };
    eLearningContentService.prototype.deleteContentLectureByid = function (lectureId) {
        return this.deleteLectureById.delete({ lectureId: lectureId }).$promise;
    };
    eLearningContentService.prototype.deleteContentSectionById = function (sectionId) {
        return this.deleteSectionById.delete({ sectionId: sectionId }).$promise;
    };
    eLearningContentService.prototype.addInteractiveQuestion = function (resource) {
        return this.addInteractive.save(resource).$promise;
    };
    eLearningContentService.prototype.addInteractiveOption = function (resource) {
        return this.saveInteractiveOptionResource.save(resource).$promise;
    };
    eLearningContentService.prototype.viewInteractiveDetails = function (id) {
        return this.viewIntrective.get({ id: id }).$promise;
    };
    eLearningContentService.prototype.getAllMyContentList = function () {
        return this.myContentList.query().$promise;
    };
    eLearningContentService.prototype.launchContent = function (resource) {
        return this.launchMyContent.save(resource).$promise;
    };
    eLearningContentService.prototype.interactiveDetail = function (sectionPageId) {
        return this.getInteractiveDetail.get({ sectionPageId: sectionPageId }).$promise;
    };
    eLearningContentService.serviceId = "eLearningContentservice";
    return eLearningContentService;
}());
app.service('eLearningContentservice', ['$resource', '$q', '$log', function ($resource, $q, $log) {
        return new eLearningContentService($resource, $q, $log);
    }]);
//# sourceMappingURL=elearningcontentservice.js.map
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

interface IeLearningContentService {
    eLearningContentList: () => void;
    eLearningContentCreatorName: () => void;
    createELearningContent: (resource) => void;
    updateELearningContentRate: (content: Model.Content) => void;
    viewCreatorDetails: (id: number) => void;
    categoryList: (CategoryList) => void;
    deleteCategoryImage: (contentPic) => void;
    previewContent: (id) => void;
    getCurrentUserProfileInfo: () => void;
    createLecture: (resource) => void;
    getELearningLectureList: (contentId) => void;
    createSection: (resource) => void;
    saveSectionPageImage: (resource) => void;
    viewContentDetail: (id) => void;
    eLearningSectionDetail: (id) => void;
    viewDescriptionDetail: (id) => void;
    deleteSectionPageContent: (ELearningSectionPageId) => void;
    saveEditorData: (resource) => void;
    getELearningContentById: (id) => void;
    deleteELearningContentById: (id) => void;
    deleteContentLectureByid: (lectureId) => void;
    deleteContentSectionById: (sectionId) => void;
    addInteractiveQuestion: (resource) => void;
    addInteractiveOption: (resource) => void;
    viewInteractiveDetails: (id) => void;
    addYoutubeLink: (resource) => void;
    getAllMyContentList: () => void;
    launchContent: (resource) => void;
    interactiveDetail: (sectionPageId) => void;
  

}
class eLearningContentService {
    static serviceId = "eLearningContentservice";
    private $resource;
    private $q;
    private $log;
    public getAllELearningContentList;
    public getContentCreatorName;
    public createContent;
    public getCategoryList;
    public deleteImage;
    public previewContentById;
    public contentCreatorDetails;
    public isProfileCreated;
    public addLecture;
    public viewContentDetails;
    public eLearningContentRate;
    public eLearningLectureList;
    public addSection;
    public eLearningSectionDetails;
    public addSectionPageImage;
    public removeSectionPageContent;
    public addEditorData;
    public eLearningContentById;
    public deleteContentById;
    public deleteLectureById;
    public viewDescriptionDetails;
    public deleteSectionById;
    public addInteractive;
    public saveInteractiveOptionResource;
    public viewIntrective;
    public saveYoutubeLink;
    public myContentList;
    public launchMyContent;
    public getInteractiveDetail;
 
  
    constructor($resource: ng.resource.IResourceService, $q: ng.IQService,$log: ng.ILogService) {

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


    eLearningContentList() {
        this.$log.log("get all elearning content list");
        return this.getAllELearningContentList.query().$promise;
    }

    eLearningContentCreatorName(id) {
        return this.getContentCreatorName.get({id:id}).$promise;
    }

    createELearningContent(resource: Model.ELearningContent) {
        return this.createContent.save(resource).$promise;
    }

    updateELearningContentRate(content) {
        this.$log.log("update content rate");
        return this.eLearningContentRate.save(content).$promise;
    }

    
    deleteCategoryImage(contentPic) {
      
        return this.deleteImage.delete({ fileInfoAc: contentPic  }).$promise;
    }

    previewContent(id)
    {
        
        return this.previewContentById.get({ id: id}).$promise;
    }

    viewCreatorDetails(id) {
        this.$log.log("get content creator user name");
        return this.contentCreatorDetails.query({ id: id}).$promise;
    }

    getCurrentUserProfileInfo() {
        return this.isProfileCreated.get().$promise;
    }

    createLecture(resource:Model.ELearningLecture){
    
        return this.addLecture.save(resource).$promise;
    }

    getELearningLectureList(contentId) {
        return this.eLearningLectureList.get({ contentId: contentId }).$promise;
    }

    createSection(resource: Model.ELearningSection) {

        return this.addSection.save(resource).$promise;
    }

    viewContentDetail(id) {
        this.$log.log("get content in details");
        return this.viewContentDetails.query({ id: id }).$promise;
    }

    saveSectionPageImage(resource: Model.ELearningSectionPage) {
        return this.addSectionPageImage.save(resource).$promise;
    }

    deleteSectionPageContent(ELearningSectionPageId) {
        return this.removeSectionPageContent.delete({ eLearningSectionPageId: ELearningSectionPageId } ).$promise;
    }

    eLearningSectionDetail(id) {
        this.$log.log("get elearning section detail by id");
        return this.eLearningSectionDetails.query({ id: id }).$promise;
    }

    saveEditorData(resource: Model.TextEditorContent) {
        return this.addEditorData.save(resource).$promise;
    }

    addYoutubeLink(resource: Model.ELearningSectionPage) {
        return this.saveYoutubeLink.save(resource).$promise;
    }

    getELearningContentById(id) {
        this.$log.log("get eLearning content by id");
        return this.eLearningContentById.query({ id: id }).$promise;
    }

    deleteELearningContentById(id) {
        this.$log.log("Delete ELearning Content by id");
        return this.deleteContentById.query({ id: id }).$promise;
    }

    deleteContentLectureByid(lectureId) {
        return this.deleteLectureById.delete({ lectureId : lectureId}).$promise;
    }

    deleteContentSectionById(sectionId) {
        return this.deleteSectionById.delete({ sectionId : sectionId}).$promise;
    }

    addInteractiveQuestion(resource) {
        return this.addInteractive.save(resource).$promise;
    }

    addInteractiveOption(resource) {
        return this.saveInteractiveOptionResource.save(resource).$promise;
    }

    viewInteractiveDetails(id) {
        return this.viewIntrective.get({ id: id }).$promise;
    }

    getAllMyContentList() {
        return this.myContentList.query().$promise;
    }

    launchContent(resource) {
        return this.launchMyContent.save(resource).$promise;
    }

    interactiveDetail(sectionPageId) {
        return this.getInteractiveDetail.get({ sectionPageId: sectionPageId}).$promise;
    }
}

app.service('eLearningContentservice',['$resource','$q','$log',($resource,$q,$log)=> {
    return new eLearningContentService($resource, $q,$log);
}]);
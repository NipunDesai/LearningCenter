using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.ApplicationClasses;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;
using System.Diagnostics.CodeAnalysis;
using LearningCenter.Utility.Constants;
using LearningCenter.Utility.enums;

namespace LearningCenter.Core.Lib
{
    public class ELearningContentLib : IDisposable
    {
        # region "Private variables"

        private readonly IDataRepository<Content> _contentContext;
        private readonly IDataRepository<ELearningContent> _eLearningContentContext;
        private readonly IDataRepository<ELearningLecture> _eLearningLectureContext;
        private readonly IDataRepository<ELearningSection> _eLearningSectionContext;
        private readonly IDataRepository<ELearningSectionPage> _eLearningSectionPageContext;
        private readonly IDataRepository<InteractiveQuestion> _interactiveQuestionContext;
        private readonly IDataRepository<InteractiveOptions> _interactiveOptionsContext;
        private readonly IDataRepository<InteractiveResult> _interactiveResultContext;
       
        #endregion

        #region "Constructor(s) & Destructor(s)"

        public ELearningContentLib(IDataRepository<ELearningContent> eLearningContentContext, IDataRepository<ELearningLecture> eLearningLectureContext, IDataRepository<ELearningSection> eLearningSectionContext, IDataRepository<ELearningSectionPage> eLearningSectionPageContext, IDataRepository<InteractiveQuestion> interactiveQuestionContext, IDataRepository<InteractiveOptions> interactiveOptionsContext, IDataRepository<InteractiveResult> interactiveResultContext, IDataRepository<Content> contentContext)
        {

            _eLearningContentContext = eLearningContentContext;
            _eLearningLectureContext = eLearningLectureContext;
            _eLearningSectionContext = eLearningSectionContext;
            _eLearningSectionPageContext = eLearningSectionPageContext;
            _interactiveQuestionContext = interactiveQuestionContext;
            _interactiveOptionsContext = interactiveOptionsContext;
            _interactiveResultContext = interactiveResultContext;
            _contentContext = contentContext;

        }



        #endregion

        #region "Dispose Method(s)"
        /// <summary>
        /// Method call when 
        /// </summary>
        public void Dispose()
        {
            try
            {
                GC.SuppressFinalize(this);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            finally
            {

            }
        }

        #endregion

        #region add elearning content
        /// <summary>
        /// Save data in elearning content
        /// </summary>
        /// <param name="contentId"></param>
        /// <returns></returns>
        public void SaveELearningContent(int contentId)
        {
            try
            {
                var eLearningContent = new ELearningContent
                {
                    ContentId = contentId,
                    IsDeleted = false,
                    CreatedDateTime = DateTime.UtcNow
                };
                _eLearningContentContext.Add(eLearningContent);
                _eLearningContentContext.SaveChanges();
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

        #region save / edit/delete lecture
        /// <summary>
        /// save or edit lecture content
        /// </summary>
        /// <param name="elearningLecture"></param>
        /// <returns>elearninglecture object</returns>
        public ELearningLecture AddOrEditLecture(ELearningLecture elearningLecture)
        {
            try
            {
                var eLearningData = new ELearningLecture
                {
                    Title = elearningLecture.Title,
                    ContentId = elearningLecture.ContentId,
                    IsDeleted = false,
                    CreatedDateTime = DateTime.UtcNow,
                    Id = elearningLecture.Id

                };
                if (elearningLecture.Id == 0)
                {
                    _eLearningLectureContext.Add(eLearningData);
                }
                else
                {
                    _eLearningLectureContext.Update(eLearningData);
                }
                _eLearningLectureContext.SaveChanges();
                return eLearningData;
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }


        /// <summary>
        /// delete lecture by lecture id
        /// </summary>
        /// <param name="lectureId"></param>
        /// <returns></returns>
        [ExcludeFromCodeCoverage]
        public bool DeleteLectureById(int lectureId)
        {
            try {
                bool isDelete = false;
                //delete lecture -> section -> sectionPage content from server
                var sectionList = _eLearningSectionContext.Fetch(x => x.ELearningLectureId == lectureId).ToList();
                foreach (var section in sectionList)
                {
                    var sectionPageList = _eLearningSectionPageContext.Fetch(x => x.ELearningSectionId == section.Id).ToList();
                    foreach (var sectionPage in sectionPageList)
                    {
                        DeleteSectionPageContent(sectionPage.Id);
                    }
                }
                _eLearningLectureContext.Delete(lectureId);
                _eLearningLectureContext.SaveChanges();

                isDelete = true;
                return isDelete;
            
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }
        
       
        #endregion

        #region save/edit/delete section 
        /// <summary>
        /// save or edit section content
        /// </summary>
        /// <param name="elearningSection"></param>
        /// <returns>elearningsection object</returns>
        public ELearningSection AddOrEditSection(ELearningSection elearningSection)
        {
            try{

                 var eLearningSectionData = new ELearningSection
                {
                    Title = elearningSection.Title,
                    ELearningLectureId = elearningSection.ELearningLectureId,
                    IsDeleted = false,
                    CreatedDateTime = DateTime.UtcNow,
                    Id = elearningSection.Id

                };
                if (elearningSection.Id == 0) { _eLearningSectionContext.Add(eLearningSectionData); }
                else { _eLearningSectionContext.Update(eLearningSectionData);
                }
                    //a.Id = elearningSection.Id;
                    //a.Id = eLearningSectionData.Id;
                _eLearningSectionContext.SaveChanges();
                return eLearningSectionData;
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }

        /// <summary>
        /// delete section by section id
        /// </summary>
        /// <param name="sectionId"></param>
        /// <returns>is section is deleted or not</returns>
        [ExcludeFromCodeCoverage]
        public bool DeleteSectionById(int sectionId)
        {
            try {

                bool isDelete = false;
                //delete section -> sectionPage content from server
                //  var section = _eLearningSectionContext.FirstOrDefault(x => x.Id == sectionId);

                var sectionPageList = _eLearningSectionPageContext.Fetch(x => x.ELearningSectionId == sectionId).ToList();
                foreach (var sectionPage in sectionPageList)
                {
                    DeleteSectionPageContent(sectionPage.Id);
                }

                _eLearningSectionContext.Delete(sectionId);
                _eLearningSectionContext.SaveChanges();

                 isDelete = true;
                 return isDelete;
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

       
        #region section page
        /// <summary>
        /// save  section  pagecontent
        /// </summary>
        /// <param name="eLearningSectionPage"></param>
        /// <returns>elearningsectionpage object</returns>
        public ELearningSectionPage AddELearningSectionPage(ELearningSectionPage eLearningSectionPage)
        {
            try { 
            var eLearningSectionPageData = new ELearningSectionPage
            {
                ELearningSectionId = eLearningSectionPage.ELearningSectionId,
                SectionContentFileGuid = eLearningSectionPage.SectionContentFileGuid,
                SectionContentFileName = eLearningSectionPage.SectionContentFileName,
                IsDeleted = false,
                IsInteractive = false,
                CreatedDateTime = DateTime.UtcNow,
                SectionContentType = eLearningSectionPage.SectionContentType,
                TopicName = eLearningSectionPage.TopicName

            };
            _eLearningSectionPageContext.Add(eLearningSectionPageData);
            _eLearningSectionPageContext.SaveChanges();

            return eLearningSectionPageData;
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        /// <summary>
        /// save  section  pagecontent for interactive content 
        /// </summary>
        /// <param name="intrectiveQuestion"></param>
        /// <returns>elearningsectionpage object</returns>
        public ELearningSectionPage AddELearningSectionPageForInteractive(IntrectiveAc intrectiveQuestion)
        {
            try { 
            var eLearningSectionPage = new ELearningSectionPage
            {

                ELearningSectionId = intrectiveQuestion.elearningsectionid,
                IsDeleted = false,
                IsInteractive = true,
                SectionContentFileName = intrectiveQuestion.questiontext,
                CreatedDateTime = DateTime.UtcNow,
                SectionContentType = StringConstants.Interactive,
                TopicName = intrectiveQuestion.topicname
            };

            _eLearningSectionPageContext.Add(eLearningSectionPage);
            _eLearningSectionPageContext.SaveChanges();
            return eLearningSectionPage;
                }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }

        /// <summary>
        /// delete section page content
        /// </summary>
        /// <param name="eLearningSectionPageId"></param>
        /// <returns>return true if section page is deleted otherwise false</returns>
        [ExcludeFromCodeCoverage]
        public bool DeleteSectionPageContent(int eLearningSectionPageId)
        {
            try { 
          
            var isFileDeleted = false;
            var sectionPage = _eLearningSectionPageContext.FirstOrDefault(x => x.Id == eLearningSectionPageId);
           // var sectionPageId = sectionPage.Id;

          //for interactive page this code is not require
            if (!sectionPage.IsInteractive)
            {
                var fileInfoAc = sectionPage.SectionContentFileGuid;
                var lectureId = _eLearningSectionContext.FirstOrDefault(x => x.Id == sectionPage.ELearningSectionId).ELearningLectureId;
                var contentId = _eLearningLectureContext.FirstOrDefault(x => x.Id == lectureId).ContentId;
                if (!string.IsNullOrWhiteSpace(fileInfoAc) && sectionPage.SectionContentType != StringConstants.textEditor)
                {
                    var filePath = AppSettingsUtil.ContentPagesPath + contentId + '/' + fileInfoAc;
                    var serverPath = HttpContext.Current.Server.MapPath(filePath);
                    if (File.Exists(serverPath))
                    {
                        File.Delete(serverPath);
                        _eLearningSectionPageContext.Delete(sectionPage.Id);

                        _eLearningSectionPageContext.SaveChanges();

                        isFileDeleted = true;


                    }
                    
                  
                }
                //remove you tube link section page or text editor content
                if (!string.IsNullOrWhiteSpace(sectionPage.YouTubeLink) || sectionPage.SectionContentType == StringConstants.textEditor)
                {
                    _eLearningSectionPageContext.Delete(sectionPage.Id);

                    _eLearningSectionPageContext.SaveChanges();

                    isFileDeleted = true;
                }

                return isFileDeleted;
            }
            else
            {

                var questionId = _interactiveQuestionContext.FirstOrDefault(x => x.ELearningSectionPageId == eLearningSectionPageId).Id;
                var resultList = _interactiveResultContext.Fetch(x => x.InteractiveQuestionId == questionId).ToList();
                foreach (var result in resultList)
                {
                    _interactiveResultContext.Delete(result.Id);
                    _interactiveResultContext.SaveChanges();
                }

                _eLearningSectionPageContext.Delete(sectionPage.Id);

                _eLearningSectionPageContext.SaveChanges();

                isFileDeleted = true;
                return isFileDeleted;

            }

           
            }  
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        ///<summary>
        ///add/edit you tube link 
        /// </summary>
        /// <param name="eLearningSectionPage"></param>
        /// <returns>elearning section page object</returns>
        public ELearningSectionPage AddYouTubeLink(ELearningSectionPage eLearningSectionPage)
        {
            try {

               
                var eLearningSectionPageData = new ELearningSectionPage {

                    ELearningSectionId = eLearningSectionPage.ELearningSectionId,
                    CreatedDateTime = DateTime.UtcNow,
                    TopicName = eLearningSectionPage.TopicName,
                    YouTubeLink = eLearningSectionPage.YouTubeLink,
                    IsDeleted = false,
                    IsInteractive = false,
                    SectionContentType = eLearningSectionPage.SectionContentType,
                    EmbeddedYouTubeLink = eLearningSectionPage.EmbeddedYouTubeLink

                
                };

                if (eLearningSectionPage.Id == 0)
                {
                    _eLearningSectionPageContext.Add(eLearningSectionPageData);
                    _eLearningSectionPageContext.SaveChanges();
                    return eLearningSectionPageData;
                }
                else {
                    eLearningSectionPageData.Id = eLearningSectionPage.Id;
                    _eLearningSectionPageContext.Update(eLearningSectionPageData);
                    _eLearningSectionPageContext.SaveChanges();
                    return eLearningSectionPageData;
                
                }
                
               
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

       #endregion

        #region add interactive question / option

        /// <summary>
        /// add interactive question
        /// </summary>
        ///<param name="eLearningSectionPageId"></param>
        ///<param name="intrectiveQuestion"></param>
        /// <returns>IntrectiveQuestion object</returns>
        public InteractiveQuestion AddInteractiveQuestion(IntrectiveAc intrectiveQuestion, int eLearningSectionPageId)
        {
            try {
                var interactiveQuestionData = new InteractiveQuestion
            {
                Text = intrectiveQuestion.questiontext,
                IsDeleted = false,
                CreatedDateTime = DateTime.UtcNow,
                ELearningSectionPageId = eLearningSectionPageId

            };
            _interactiveQuestionContext.Add(interactiveQuestionData);
            _interactiveQuestionContext.SaveChanges();

            return interactiveQuestionData;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }

        /// <summary>
        /// add/edit interactive option
        /// </summary>
        ///<param name="interactiveOption"></param>
        /// <returns>IntrectiveOptions object</returns>
        public InteractiveOptions AddInteractiveOption(IntrectiveAc interactiveOption) 
        {
            try {
                var interactiveOptionsData = new InteractiveOptions
            {
                InteractiveQuestionId = interactiveOption.interactivequestionid,
                IsDeleted = false,
                CreatedDateTime = DateTime.UtcNow,
                ParentInteractiveOptionId = interactiveOption.parentintrectiveoptionid,
                Option = interactiveOption.interactiveoptiontext,
                IsCorrect = false

            };
                if(interactiveOption.interactiveoptionid == 0)
                {
                    _interactiveOptionsContext.Add(interactiveOptionsData);
                    _interactiveOptionsContext.SaveChanges();
                    return interactiveOptionsData;
                }
                else
                {
                    interactiveOptionsData.Id = interactiveOption.interactiveoptionid;
                    _interactiveOptionsContext.Update(interactiveOptionsData);
                    _interactiveOptionsContext.SaveChanges();
                    return interactiveOptionsData;
                }

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

        #region add/update content

        public Content AddContent(Content content)
        {
            try {
                var contentInfo = new Content
                {
                    CreatedOn = content.CreatedOn,

                    IsDeleted = false,
                    Title = content.Title,
                    CreatedDateTime = DateTime.UtcNow,
                    LaunchStartTime = DateTime.UtcNow,
                    LaunchEndTime = DateTime.UtcNow,
                    Description = content.Description,
                    ContentTypeId = (int)LearningCenter.Utility.enums.ContentType.ELearning,
                    LanguageId = (int)LearningCenter.Utility.enums.Language.English,
                    UserId = content.UserId,
                    ContentImage = content.ContentImage,
                    ContentImageGuid = content.ContentImageGuid,
                   
                    Id = content.Id

                };

                _contentContext.Add(contentInfo);
                _contentContext.SaveChanges();
                return contentInfo;

            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        public void EditContent(Content content)
        {
            try
            {
                var actualContent = _contentContext.FirstOrDefault(x => x.Id == content.Id);

                
                actualContent.CreatedOn = content.CreatedOn;
                actualContent.Title = content.Title;
                actualContent.Description = content.Description;
                actualContent.ContentImage = content.ContentImage == null && content.ContentImageGuid != null ? actualContent.ContentImage : content.ContentImage;
                actualContent.ContentImageGuid = content.ContentImageGuid;
               
                _contentContext.Update(actualContent);
                _contentContext.SaveChanges();
              
               
            }
            catch(Exception ex) {

                GlobalUtil.HandleAndLogException(ex, this);
                throw;

            }
        }

        #endregion
    }
}

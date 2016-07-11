using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebPages;
using Newtonsoft.Json.Schema;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.ApplicationClasses;
using LearningCenter.Repository.Helper;
using LearningCenter.Repository.Modules.ELearningContent;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;
using LearningCenter.Core.Lib;
using LearningCenter.Utility.enums;
using LearningCenter.Utility.Constants;
using System.IO;
using Newtonsoft.Json;



namespace LearningCenter.Core.Controllers
{
  
    public class ELearningContentController : ApiController
    {
        #region "Private Member(S)"

        private readonly IELearningContentRepository _eLearningContentRepository;
        private readonly IDataRepository<User> _userContext;
        private readonly IDataRepository<ELearningContent> _eLearningContentContext;
        private readonly IDataRepository<Content> _contentContext;
      
       
        private readonly IDataRepository<Category> _categoryContext;
        private readonly GlobalLib _globalLibContext;
        private readonly ContentLib _contentLibContext;
        private readonly ELearningContentLib _eLearningContentLibContext;
      
        private readonly IDataRepository<Tags> _tagContext;
        private readonly IDataRepository<Target> _targetContext;
      
        private readonly IDataRepository<ELearningLecture> _eLearningLectureContext;
        private readonly IDataRepository<ELearningSection> _eLearningSectionContext;
        private readonly IDataRepository<ELearningSectionPage> _eLearningSectionPageContext;
     
      
       
        #endregion

        #region "Constructor"
        /// <summary>
        /// Constructor that initialize private method.
        /// </summary>
        /// <param name="eLearningContentRepository">to access elearningcontent repository method</param>
        /// <param name="userContext"></param>
        /// <param name="eLearningContentContext"></param>
        /// <param name="contentContext">To access content properties.</param>
        /// <param name="globalLibContext"></param>
        /// <param name="contentLibContext"></param>
        /// <param name="eLearningContentLibContext"></param>
        /// <param name="categoryContext"></param>
        /// <param name="tagContext"></param>
        /// <param name="targetContext"></param>
        /// <param name="eLearningLectureContext">To access eLearninglecture properties.</param>
        /// <param name="eLearningSectionContext">To access elearningsection properties.</param>
        /// <param name="eLearningSectionPageContext">To access elearningsection page properties.</param>
       
        public ELearningContentController(IELearningContentRepository eLearningContentRepository, IDataRepository<User> userContext, IDataRepository<ELearningContent> eLearningContentContext, IDataRepository<Content> contentContext,  GlobalLib globalLibContext, ContentLib contentLibContext,ELearningContentLib eLearningContentLibContext,
            IDataRepository<Category> categoryContext, IDataRepository<Tags> tagContext, IDataRepository<Target> targetContext,  IDataRepository<ELearningLecture> eLearningLectureContext, IDataRepository<ELearningSection> eLearningSectionContext,IDataRepository<ELearningSectionPage> eLearningSectionPageContext
          )
        {
            _eLearningContentRepository = eLearningContentRepository;
            _userContext = userContext;
            _eLearningContentContext = eLearningContentContext;
            _contentContext = contentContext;
            _categoryContext = categoryContext;
        
            _globalLibContext = globalLibContext;
            _eLearningContentLibContext = eLearningContentLibContext;
            _contentLibContext = contentLibContext;
        
            _tagContext = tagContext;
          
            _targetContext = targetContext;
            _eLearningLectureContext = eLearningLectureContext;
            _eLearningSectionContext = eLearningSectionContext;
            _eLearningSectionPageContext = eLearningSectionPageContext;
          
          
        }
        #endregion
       
        #region ELearning Content List
        /// <summary>
        /// Get all e-Leraning Content List 
        /// </summary>
        /// <returns>collection of content object</returns>
        [Route("api/ELearningContent/getELearningContentList")]
        [HttpGet]
        public IHttpActionResult GetELearningContentList()
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated)
                {
                    var currentUser = HttpContext.Current.User.Identity.Name;


                    var contentAc = new ContentAc();
                    var contentCollection = new List<ContentAc>();
                    foreach (var contentitem in _eLearningContentRepository.GetELearningContentList())
                    {
                        contentAc = ApplicationClassHelper.ConvertType<Content, ContentAc>(contentitem);
                        contentAc.UserId = contentitem.User.Id;
                        contentAc.CreatedBy = contentitem.CreatedOn;
                        
                      if (contentAc.ContentImageGuid == null)
                      {
                          contentAc.ContentImage = StringConstants.contentImageDefaultPath;
                      }
                      else
                      {
                          contentAc.ContentImage = AppSettingsUtil.ContentPicturesPath + contentitem.Id + '/' +
                                                   contentitem.ContentImageGuid;
                      }
                        contentAc.Description = contentitem.Description;
                        contentAc.Title = contentitem.Title;
                        contentAc.ContentType = contentitem.ContentType.Name;
                        contentAc.CreatedDateTime = contentitem.LaunchStartTime.ToLongDateString();
                        contentAc.ContentId = contentitem.Id;
                        contentAc.Rate = contentitem.Rate;
                        contentAc.IsReadonly = true;
                        
                        if (currentUser == contentitem.User.Email)
                        {
                            contentAc.IsDeleteOnly = true;
                        }
                        else
                        {
                            contentAc.IsDeleteOnly = false;
                        }
                        foreach (var contentLecture in contentitem.ELearningLecture)
                        {
                            foreach (var contentSection in contentLecture.ELearningSection)
                            {
                                foreach (var contentSectionPage in contentSection.ELearningSectionPage)
                                {
                                    if (contentSectionPage.IsInteractive == true)
                                    {
                                        contentAc.IsInteractiveOnly = true;
                                        contentAc.IsInteractiveResultOnly = true;
                                      break;
                                    }
                                    
                                }
                            }
                        }
                        contentCollection.Add(contentAc);
                    }

                    return Ok(contentCollection);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw ;
            }

            
        }
        #endregion

        #region Update E-Learning Content Rate
            /// <summary>
            /// Update ELearning Content Rate
            /// </summary>
            /// <param name="contentAc">content Information</param>
            /// <returns>object of content</returns>
        [Route("api/ELearningContent/updateELearningContentRate")]
        [HttpPost]
        public IHttpActionResult UpdateELearningContentRate(ContentAc contentAc)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated)
                {
                    var usre = HttpContext.Current.User.Identity.Name;
                    var content = ApplicationClassHelper.ConvertType<ContentAc, Content>(contentAc);
                    content.Id = contentAc.ContentId;
                    content.Rate = contentAc.Rate;
                    _eLearningContentRepository.UpdateELearningContentRate(content);
                    contentAc = ApplicationClassHelper.ConvertType<Content, ContentAc>(content);
                    contentAc.ContentId = content.Id;
                    return Ok(contentAc);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                return BadRequest();
            }
        }


        #endregion

        #region Create/launch E-LearningContent"
        /// <summary>
        /// Get content creator name
        /// </summary>
        /// <param name="id"></param>
        /// <returns>content object</returns>
     
        [HttpGet]
        [Route("api/ELearningContent/getContentCreatorName")]
        public IHttpActionResult GetContentCreatorName(int? id)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated) { 
                var currentUser = HttpContext.Current.User.Identity.Name;
                if (id == 0)
                {
               
                var currentUserInfo = _userContext.FirstOrDefault(x => x.Email == currentUser);
                var content = new Content();
                content.CreatedOn = currentUserInfo.FirstName + ' ' + currentUserInfo.LastName;
                content.UserId = currentUserInfo.Id;
                content.CategoryCollection = _contentLibContext.GetCategoryList();
                content.TagCollection = _contentLibContext.GetTagList();
                content.TargetCollection = _contentLibContext.GetTargetList();
                return Ok(content);
                }
                else
                {
                    Content content = _contentContext.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                    //if content is not deleted(isdelete = false) than .....
                  //  if (content != null) {
                    var contentCreator = _userContext.FirstOrDefault(x => x.Id == content.UserId);
                    //if login user and content creator user is same then...
                    if (currentUser == contentCreator.Email)
                    {
                        var contentAc = ApplicationClassHelper.ConvertType<Content, ContentAc>(content);
                        contentAc.Title = content.Title;
                        contentAc.Description = content.Description;
                        contentAc.ContentImageGuid = content.ContentImageGuid != null ? AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid : null;
                        contentAc.CategoryList = _contentLibContext.GetCategoryListById(content.Id);
                        contentAc.TagList = _contentLibContext.GetTagListById(content.Id);
                        contentAc.TargetList = _contentLibContext.GetTargetListById(content.Id);
                        contentAc.CreatedOn = content.CreatedOn;
                        contentAc.CategoryCollection = _contentLibContext.GetCategoryList();
                        contentAc.TagCollection = _contentLibContext.GetTagList();
                        contentAc.TargetCollection = _contentLibContext.GetTargetList();


                        return Ok(contentAc);
                    }
                    else
                    {
                        bool isAuthorizedUser = true;
                        return Ok(new{isAuthorizedUser = isAuthorizedUser});
                    }
                   // }
                    //if content is  deleted(isdelete = true) than .....
                   // else {
                  //      bool isContentNull = true;
                   //     return Ok(new {isContentNull = isContentNull});
                   // }
                }
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }


        

        /// <summary>
        /// Get categorylist
        /// </summary>
        /// <returns>category list</returns>
        [HttpGet]
        [Route("api/ELearningContent/GetCategoryList")]
        public IHttpActionResult GetCategoryList()
        {
            var categoryList = new List<Category>();
            categoryList = _contentLibContext.GetCategoryList();
          
            return Ok(categoryList);

        }

        /// <summary>
        /// Get tagList
        /// </summary>
        /// <returns>tag list</returns>
        [HttpGet]
        [Route("api/ELearningContent/GetTagList")]
        public IHttpActionResult GetTagList()
        {
            var tagList = new List<Tags>();
            tagList = _contentLibContext.GetTagList();

            return Ok(tagList);
        }

        /// <summary>
        /// Get targetList
        /// </summary>
        /// <returns>target list</returns>
        [HttpGet]
        [Route("api/ELearningContent/GetTargetList")]
        public IHttpActionResult GetTargetList()
        {
            var targetList = new List<Target>();
            targetList = _contentLibContext.GetTargetList();

            return Ok(targetList);
        }



        /// <summary>
        /// create content
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("api/ELearningContent/createContent")]
        public IHttpActionResult CreateContent(Content content)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated) { 
               
                   
                    //if content is in add mode than ....
                   // if (content.Id == null) { 
                   
                    if (content.ContentImageGuid != null)
                        {
                            var guidName = content.ContentImageGuid.Split('/');
                            int arraySize = guidName.Length - 1;
                            var fileGuidName = guidName[arraySize];
                             content.ContentImageGuid = fileGuidName;
                        }
               
                   
                    if (content.Id == 0){

                        //add content 
                        Content contentInfo = _eLearningContentLibContext.AddContent(content);
                        content.Id = contentInfo.Id;
                        GlobalUtil.LogInfo("content created successfully", this.GetType());
                    
                    //save content info in elearning content table

                        _eLearningContentLibContext.SaveELearningContent(content.Id);
                    }
                    else {
                        //update content
                       _eLearningContentLibContext.EditContent(content);
                        GlobalUtil.LogInfo("content updated successfully", this.GetType());
                    }

                    
                    _contentLibContext.SaveContentCategoryInfo(content.Id, content.CategoryList);
                    _contentLibContext.SaveContentTagInfo(content.Id, content.TagList);
                    _contentLibContext.SaveContentTargetInfo(content.Id, content.TargetList);
                   
                    //store image in actual folder
                    if (content.ContentImageGuid != null)
                    {

                        var tempPath = AppSettingsUtil.ContentPicturesPath + StringConstants.Temp + '/' + content.ContentImageGuid;
                       // map path to directory in which images to be saved on server.
                        var finalPath = AppSettingsUtil.ContentPicturesPath + content.Id + '/';
                        var physicalPath = AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid;
                        string savepath = HttpContext.Current.Server.MapPath(finalPath);
                        string mapTempPath = HttpContext.Current.Server.MapPath(tempPath);
                        string mapPhysicalPath = HttpContext.Current.Server.MapPath(physicalPath);
                         //Check for existance of directory. if not then create it.
                         if (!Directory.Exists(savepath))
                                 Directory.CreateDirectory(savepath);

                        //check if file is exists or not
                         if (File.Exists(mapTempPath))
                        { 
                          
                             //move file temp folder to original folder
                            File.Move(mapTempPath, mapPhysicalPath);
                        }
                      
                    }

                    return Ok(content);
                 
                
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }


        }

        /// <summary>
        /// to launch content 
        /// </summary>
        /// <param name="contentId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/ELearningContent/LaunchContent")]
        public IHttpActionResult LaunchContent(ContentAc contentInfo) {

            try {

                var content = _contentContext.FirstOrDefault(x => x.Id == contentInfo.ContentId);
                content.IsLaunch = true;
                _contentContext.Update(content);
                _contentContext.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

        #region add/delete Lecture
        /// <summary>
        /// add lecture
        /// </summary>
        /// <param name="elearningLecture"></param>
        /// <returns>lecture object</returns>
        [HttpPost]
        [Route("api/ELearningContent/AddLecture")]
        public IHttpActionResult AddLecture(ELearningLecture elearningLecture)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated )
                {
                   
                    bool isLectureNameExist = false;
                    isLectureNameExist = _eLearningLectureContext.Fetch(x => x.ContentId == elearningLecture.ContentId && x.Title == elearningLecture.Title && x.Id != elearningLecture.Id).Any();
                    if (isLectureNameExist) { return Ok(new { isLectureNameExist = isLectureNameExist }); }
                    else
                    {

                        var eLearningData = _eLearningContentLibContext.AddOrEditLecture(elearningLecture);
                        return Ok(eLearningData);
                    }
                   
                   
                }
                else {
                    return BadRequest();
                }
                
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        /// <summary>
        /// get lecture list by id
        /// </summary>
        /// <param name="contentId"></param>
        /// <returns>lecture list</returns>
        [HttpGet]
        [Route("api/ELearningContent/GetLectureListById")]
        public IHttpActionResult GetLectureListById(int contentId)
        {

            try
            {
                if (HttpContext.Current.Request.IsAuthenticated) {
                 var currentUser = HttpContext.Current.User.Identity.Name;
                 var contentInfo = _contentContext.FirstOrDefault(x => x.Id == contentId);
                 var contentCreator = _userContext.FirstOrDefault(x => x.Id == contentInfo.UserId);
              //if login user and content creator user is same then....
                if (currentUser == contentCreator.Email) { 
                var eLearningContentCollection = new List<ContentAc>();
                var contentList = _eLearningContentRepository.ViewContentDetail(contentId);
                foreach (var content in contentList)
                {
                    var eLearningContent = new ContentAc();
                    eLearningContent = ApplicationClassHelper.ConvertType<Content, ContentAc>(content);
                    if (content.ContentImageGuid == null)
                    {
                        eLearningContent.ContentImage = StringConstants.contentImageDefaultPath;
                    }
                    else
                    {
                        eLearningContent.ContentImage = AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid;    
                    }
                   
                    eLearningContent.CreatedBy = content.CreatedOn;
                    eLearningContent.Rate = content.Rate;
                    eLearningContent.CreatedDateTime = content.LaunchStartTime.ToLongDateString();
                    var eLearningLectureCollection = new List<ELearningLectureAc>();
                    foreach (var contentLecture in content.ELearningLecture)
                    {
                        var a = new ELearningLectureAc();
                        var eLearningSectionCollection = new List<ELearningSectionAc>();
                        var eLearningLectureAc = ApplicationClassHelper.ConvertType<ELearningLecture, ELearningLectureAc>(contentLecture);
                        eLearningLectureAc.ContentId = contentLecture.ContentId;
                        eLearningLectureAc.ELearningLectureId = contentLecture.Id;
                        eLearningLectureAc.Title = contentLecture.Title;
                        foreach (var contentSection in contentLecture.ELearningSection)
                        {
                            var eLearningSectionAc = ApplicationClassHelper.ConvertType<ELearningSection, ELearningSectionAc>(contentSection);
                            eLearningSectionAc.ELearningLectureId = contentSection.ELearningLectureId;
                            eLearningSectionAc.Title = contentSection.Title;
                            eLearningSectionAc.ELearningSectionId = contentSection.Id;
                            eLearningSectionCollection.Add(eLearningSectionAc);

                            var eLearningSectionPage = new List<ELearningSectionPageAc>();
                            foreach (var sectionPage in contentSection.ELearningSectionPage)
                            {
                                var eLearningSectionPageAc = ApplicationClassHelper.ConvertType<ELearningSectionPage, ELearningSectionPageAc>(sectionPage);
                                eLearningSectionPageAc.ELearningSectionId = sectionPage.ELearningSectionId;
                                eLearningSectionPageAc.ELearningSectionPageId = sectionPage.Id;
                                eLearningSectionPageAc.SectionContentFileGuid = sectionPage.SectionContentFileGuid;
                                eLearningSectionPageAc.SectionContentData = sectionPage.SectionContentData;
                                eLearningSectionPageAc.YouTubeLink = sectionPage.YouTubeLink;
                                eLearningSectionPage.Add(eLearningSectionPageAc);
                            }
                            eLearningSectionAc.ELearningSectionPage = eLearningSectionPage;
                        }
                        eLearningLectureAc.ELearningSection = eLearningSectionCollection;
                        eLearningLectureCollection.Add(eLearningLectureAc);
                    }
                    eLearningContent.ELearningLecture = eLearningLectureCollection;

                    eLearningContentCollection.Add(eLearningContent);
                }

                return Ok(new { eLearningContentCollection = eLearningContentCollection });
                //  return Ok(eLearningContentCollection);
            
                }
                // login user and content creator user is different then error message is display
                 else
                 {
                     bool isAuthorizedUser = true;
                     return Ok(new { isAuthorizedUser = isAuthorizedUser });
                 }
                }
                 
                else
                {
                    return BadRequest();
                }
            }

            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

         

        }

        /// <summary>
        /// delete lecture by id
        /// </summary>
        /// <param name="lectureId"></param>
        /// <returns>lecture is deleted or not</returns>
       
        [Route("api/ELearningContent/DeleteLectureById")]
        public IHttpActionResult DeleteLectureById(int lectureId)
        {
            try {
                if (HttpContext.Current.Request.IsAuthenticated) { 
                    bool isDelete = false;
                    isDelete = _eLearningContentLibContext.DeleteLectureById(lectureId);
                    return Ok(new { isDelete = isDelete });
                }
                else
                {
                    return BadRequest();
                }
                }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

      

        #region add/delete Section
        /// <summary>
        /// add section
        /// </summary>
        /// <param name="elearningSection"></param>
        /// <returns>section object</returns>
        [HttpPost]
        [Route("api/ELearningContent/AddSection")]
        public IHttpActionResult AddSection(ELearningSection elearningSection) 
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated ) { 
                    
                var sectionAc = new SectionAc();
                bool isSectionNameExist = false;
                elearningSection.ELearningLectureId =  elearningSection.Id == 0 ? elearningSection.ELearningLectureId :
                    _eLearningSectionContext.FirstOrDefault(x => x.Id == elearningSection.Id).ELearningLectureId;
                isSectionNameExist = _eLearningSectionContext.Fetch(x => x.ELearningLectureId == elearningSection.ELearningLectureId && x.Title == elearningSection.Title && x.Id != elearningSection.Id).Any();
                if (isSectionNameExist)
                {
                    return Ok(new { isSectionNameExist = isSectionNameExist });
                }
                else { 
               var eLearningSectionData = _eLearningContentLibContext.AddOrEditSection(elearningSection);

                sectionAc.Id = eLearningSectionData.Id;
                sectionAc.Title = eLearningSectionData.Title;
                sectionAc.ELearningLectureId = eLearningSectionData.ELearningLectureId;
                sectionAc.ContentShowandHidebit = false;
                sectionAc.ContentButtonbit = false;
                return Ok(sectionAc);

                }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        /// <summary>
        /// delete section by id
        /// </summary>
        /// <param name="sectionId"></param>
        /// <returns>is section is deleted or not</returns>
       
        [Route("api/ELearningContent/DeleteSectionById")]
        public IHttpActionResult DeleteSectionById(int sectionId)
        {
            try 
            { 
            if(HttpContext.Current.Request.IsAuthenticated)
            { 
             bool isDelete = false;
             isDelete = _eLearningContentLibContext.DeleteSectionById(sectionId);
             return Ok(new { isDelete = isDelete });
            }
            else
            {
                return BadRequest();
            }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

        #region add/remove section Page Image/data/video
        /// <summary>
        /// add section page image in database
        /// </summary>
        /// <param name="eLearningSectionPage"></param>
        /// <returns>elearning section page object</returns>

        public ELearningSectionPage AddSectionPageImage(ELearningSectionPage eLearningSectionPage)
        {
            try {
              
                if (eLearningSectionPage.SectionContentFileGuid != null)
                {
                    var guidName = eLearningSectionPage.SectionContentFileGuid.Split('/');
                    int arraySize = guidName.Length - 1;
                    var fileGuidName = guidName[arraySize];
                    eLearningSectionPage.SectionContentFileGuid = fileGuidName;
                }

                var eLearningSectionPageData = _eLearningContentLibContext.AddELearningSectionPage(eLearningSectionPage);
              
                return eLearningSectionPageData;
               

            }
            catch(Exception ex) {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        /// <summary>
        /// delete section page content from database
        /// </summary>
        /// <returns></returns>
       
        [Route("api/ELearningContent/DeleteSectionPageContent")]
        public IHttpActionResult DeleteSectionPageContent(int eLearningSectionPageId)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated) { 
                var isFileDeleted = false;

                isFileDeleted = _eLearningContentLibContext.DeleteSectionPageContent(eLearningSectionPageId);
               
                return Ok(new { isFileDeleted = isFileDeleted });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

      

        ///<summary>
        ///add section page editor data in database and convert that data into html file
        ///</summary>
        [HttpPost]
        [Route("api/ELearningContent/AddSectionPageDataInHtml")]
        public IHttpActionResult AddSectionPageDataInHtml(TextEditorContentAc texteditor)
        {
            try {
                if (HttpContext.Current.Request.IsAuthenticated ) { 
                //add editor data
                if (texteditor.ELearningSectionPageId == 0)
                {
                   // var path = AppSettingsUtil.ContentPagesPath + texteditor.ContentId + '/';
                   // var filePath = _globalLibContext.GenerateHtmlAndUploadIt(texteditor.Data, path);
                    var eLearningSectionPage = new ELearningSectionPage
                    {
                        ELearningSectionId = texteditor.ELearningSectionId,
                        IsDeleted = false,
                        CreatedDateTime = DateTime.UtcNow,
                        IsInteractive = false,
                        SectionContentFileGuid = StringConstants.Text,
                        SectionContentFileName = StringConstants.Text,
                        SectionContentData = texteditor.Data,
                        SectionContentType = texteditor.SectionContentType,
                        TopicName = texteditor.TopicName
                    };

                    _eLearningSectionPageContext.Add(eLearningSectionPage);
                    _eLearningSectionPageContext.SaveChanges();
                    return Ok(eLearningSectionPage);
                }
                    //update editor data
                else {
                    var eLearningSectionPageInfo = _eLearningSectionPageContext.FirstOrDefault(x => x.Id == texteditor.ELearningSectionPageId);
                    eLearningSectionPageInfo.SectionContentData = texteditor.Data;
                    _eLearningSectionPageContext.Update(eLearningSectionPageInfo);
                    _eLearningSectionPageContext.SaveChanges();
                    var eLearningSectionPage = new ELearningSectionPageAc();
                        eLearningSectionPage = ApplicationClassHelper.ConvertType<ELearningSectionPage, ELearningSectionPageAc>(eLearningSectionPageInfo);
                        eLearningSectionPage.ELearningSectionId = eLearningSectionPageInfo.ELearningSectionId;
                        eLearningSectionPage.IsInteractive = eLearningSectionPageInfo.IsInteractive;
                        eLearningSectionPage.SectionContentFileGuid = eLearningSectionPageInfo.SectionContentFileGuid;
                        eLearningSectionPage.SectionContentFileName = eLearningSectionPageInfo.SectionContentFileName;
                        eLearningSectionPage.SectionContentData = eLearningSectionPageInfo.SectionContentData;
                        eLearningSectionPage.SectionContentType = eLearningSectionPageInfo.SectionContentType;
                        eLearningSectionPage.ELearningSectionPageId = eLearningSectionPageInfo.Id;

                    return Ok(eLearningSectionPage);
                }

                }
                else
                {
                    return BadRequest();
                }
               
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }


        /// <summary>
        /// add youtube link in database
        /// </summary>
        /// <param name="eLearningSectionPage"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/ELearningContent/SaveYouTubeLink")]
        public IHttpActionResult SaveYouTubeLink(ELearningSectionPage eLearningSectionPage)
        {
            try {
                if (HttpContext.Current.Request.IsAuthenticated ) { 
                if(eLearningSectionPage.Id != 0)
                {
                    var youTubeLink = eLearningSectionPage.YouTubeLink;
                    var embeddedYouTubeLink = eLearningSectionPage.EmbeddedYouTubeLink;
                    eLearningSectionPage = _eLearningSectionPageContext.FirstOrDefault(x => x.Id == eLearningSectionPage.Id);
                    eLearningSectionPage.YouTubeLink = youTubeLink;
                    eLearningSectionPage.EmbeddedYouTubeLink = embeddedYouTubeLink;
                }

                var eLearningSectionPageData = _eLearningContentLibContext.AddYouTubeLink(eLearningSectionPage);

                return Ok(eLearningSectionPageData);
                }
                else
                {
                    return BadRequest();
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
        ///<summary>
        ///add inteactive question
        /// </summary>
       //  [HttpPost]
        [Route("api/Interactive/AddInteractiveQuestion")]
     
        public InteractiveQuestion AddInteractiveQuestion(IntrectiveAc intrectiveQuestion)
        {
            try {
              //  if (HttpContext.Current.Request.IsAuthenticated) { 
                    var eLearningSectionPage = _eLearningContentLibContext.AddELearningSectionPageForInteractive(intrectiveQuestion);
                    var interactiveQuestionData = _eLearningContentLibContext.AddInteractiveQuestion(intrectiveQuestion, eLearningSectionPage.Id);
                    return interactiveQuestionData;
              //  }
                //else
                //{
                //    return BadRequest();
                //}
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
         
        }


        ///<summary>
        ///add interactive option
        /// </summary>
        [HttpPost]
        [Route("api/Interactive/AddInteractiveOption")]
        public IHttpActionResult AddInteractiveOption(IntrectiveAc interactiveOption)
        {
            try {
                if (HttpContext.Current.Request.IsAuthenticated) {
                    if (interactiveOption.interactivequestionid != 0)
                    {
                        //at the time of edit or when question is added only option needs to add then...
                        var interactiveOptionsData = _eLearningContentLibContext.AddInteractiveOption(interactiveOption);
                        return Ok(interactiveOptionsData);
                    }
                    else { 
                   // at first time question and option both will add together then...
                    var interactiveQuestion = AddInteractiveQuestion(interactiveOption);
                    interactiveOption.interactivequestionid = interactiveQuestion.Id;
                    var interactiveOptionsData = _eLearningContentLibContext.AddInteractiveOption(interactiveOption);

                    interactiveOption.elearningsectionpageid = interactiveQuestion.ELearningSectionPageId;
                    interactiveOption.interactiveoptionid = interactiveOptionsData.Id;

                    return Ok(interactiveOption);
                    }
                }
                else
                {
                    return BadRequest();
                }
                }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }


   

        #endregion

        #region get preview list

        public List<ContentAc> GetPreviewList(int contentId)
        {
            try
            {
                var eLearningContentCollection = new List<ContentAc>();
                var contentList = _eLearningContentRepository.ViewContentDetail(contentId);
                foreach (var content in contentList)
                {
                    var eLearningContent = new ContentAc();
                    eLearningContent = ApplicationClassHelper.ConvertType<Content, ContentAc>(content);
                    eLearningContent.ContentImage = AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid; ;
                    eLearningContent.CreatedBy = content.CreatedOn;
                    eLearningContent.Rate = content.Rate;
                    eLearningContent.CreatedDateTime = content.LaunchStartTime.ToLongDateString();
                    var eLearningLectureCollection = new List<ELearningLectureAc>();
                    foreach (var contentLecture in content.ELearningLecture)
                    {
                        var a = new ELearningLectureAc();
                        var eLearningSectionCollection = new List<ELearningSectionAc>();
                        var eLearningLectureAc = ApplicationClassHelper.ConvertType<ELearningLecture, ELearningLectureAc>(contentLecture);
                        eLearningLectureAc.ContentId = contentLecture.ContentId;
                        eLearningLectureAc.ELearningLectureId = contentLecture.Id;
                        eLearningLectureAc.Title = contentLecture.Title;
                        foreach (var contentSection in contentLecture.ELearningSection)
                        {
                            var eLearningSectionAc = ApplicationClassHelper.ConvertType<ELearningSection, ELearningSectionAc>(contentSection);
                            eLearningSectionAc.ELearningLectureId = contentSection.ELearningLectureId;
                            eLearningSectionAc.Title = contentSection.Title;
                            eLearningSectionAc.ELearningSectionId = contentSection.Id;
                            eLearningSectionCollection.Add(eLearningSectionAc);

                            var eLearningSectionPage = new List<ELearningSectionPageAc>();
                            foreach (var sectionPage in contentSection.ELearningSectionPage)
                            {
                                var eLearningSectionPageAc = ApplicationClassHelper.ConvertType<ELearningSectionPage, ELearningSectionPageAc>(sectionPage);
                                eLearningSectionPageAc.ELearningSectionId = sectionPage.ELearningSectionId;
                                eLearningSectionPageAc.ELearningSectionPageId = sectionPage.Id;
                                eLearningSectionPageAc.SectionContentFileGuid = sectionPage.SectionContentFileGuid;
                                eLearningSectionPageAc.SectionContentData = sectionPage.SectionContentData;
                                eLearningSectionPageAc.IsInteractive = sectionPage.IsInteractive;
                                eLearningSectionPage.Add(eLearningSectionPageAc);
                            }
                            eLearningSectionAc.ELearningSectionPage = eLearningSectionPage;
                        }
                        eLearningLectureAc.ELearningSection = eLearningSectionCollection;
                        eLearningLectureCollection.Add(eLearningLectureAc);
                    }
                    eLearningContent.ELearningLecture = eLearningLectureCollection;

                    eLearningContentCollection.Add(eLearningContent);
                }
                return eLearningContentCollection;
            }

            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

        #region upload image
        /// <summary>
        /// upload content image on server
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("api/ELearningContent/uploadContentDisplayImages")]
        public IHttpActionResult UploadContentDisplayImages()
        {
            try
            {
                
                var uploadFolder = AppSettingsUtil.ContentPicturesPath + StringConstants.Temp + '/';
                HttpPostedFile fileData = HttpContext.Current.Request.Files["file"];
                var result = _globalLibContext.UploadPictures(fileData, uploadFolder);
                var file = new FileInfoAc();
                file.Name = result;
                return Ok(file);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;

            }


        }

        /// <summary>
        /// upload section content page image on server
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("api/ELearningContent/UploadSectionContentImages")]
        public IHttpActionResult UploadSectionContentImages(int sectionId, string uploadContentType, string topicName)
        {
            try
            {
                var lectureId = _eLearningSectionContext.FirstOrDefault(x => x.Id == sectionId).ELearningLectureId;
                var contentId = _eLearningLectureContext.FirstOrDefault(x => x.Id == lectureId).ContentId;


                var uploadFolder = AppSettingsUtil.ContentPagesPath + contentId + '/';
                HttpPostedFile fileData = HttpContext.Current.Request.Files["file"];
                var result = _globalLibContext.UploadPictures(fileData, uploadFolder);
                var elearningSectionPage = new ELearningSectionPage
                {
                    ELearningSectionId = sectionId,
                    SectionContentFileName = fileData.FileName,
                    SectionContentFileGuid = result,
                    SectionContentType = uploadContentType,
                    TopicName = topicName
                };
                 var elearningSectionData=  AddSectionPageImage(elearningSectionPage);
              
                return Ok(elearningSectionData);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;

            }


        }

       

        /// <summary>
        /// delete content image on server
        /// </summary>
        /// <param name="fileInfoAc"></param>
        /// <returns>is file deleted or not</returns>
       
        [Route("api/ELearningContent/DeleteImage")]
        public IHttpActionResult DeleteContentImage(string fileInfoAc)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated) 
                { 
                var isDeleted = false;
                if (!string.IsNullOrWhiteSpace(fileInfoAc))
                {
                    if (File.Exists(HttpContext.Current.Server.MapPath(fileInfoAc)))
                    {
                        File.Delete(HttpContext.Current.Server.MapPath(fileInfoAc));
                        isDeleted = true;
                        return Ok(new { isDeleted = isDeleted });
                    }
                  
                }
                return Ok(new { isDeleted = isDeleted });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }

        #endregion

        #region preview content
        /// <summary>
        /// Get content information by id 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/ELearning/GetById")]
        public IHttpActionResult GetContentById(int id)
        {
             try 
            { 
                Content content = _contentContext.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                content.ContentImageGuid = content.ContentImageGuid != null ? AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid : null;
                content.DisplayDateTime = content.CreatedDateTime.ToLongDateString();
                return Ok(content);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

           
        }
       
        #endregion

        #region Creator Details

        /// <summary>
        /// View Content Creator Details.
        /// </summary>
        /// <param name="id">Id of UserId</param>
        /// <returns>Object of User</returns>
        [HttpGet]
       [Route("api/ELearningContent/viewCreatorDetails")]
        public List<UserAc> ViewCreatorDetails(int id)
        {
            try
            {
                var userAc = new UserAc();
                var userCollection = new List<UserAc>();
                foreach (var userDetails in _eLearningContentRepository.ViewCreatorDetails(id))
                {
                    userAc = ApplicationClassHelper.ConvertType<User, UserAc>(userDetails);
                    userAc.FirstName = userDetails.FirstName;
                    userAc.LastName = userDetails.LastName;
                  //if (userDetails.ProfilePicGuid == null)
                  //{
                  //    userAc.ProfilePicGuid = "/Images/up.png";
                  //}
                  //else
                  //{
                  //    userAc.ProfilePicGuid = AppSettingsUtil.ProfilePicturesPath + userDetails.Id + '/' + userDetails.ProfilePicGuid;
                  //}
                    userAc.ProfilePicGuid = userDetails.ProfilePicGuid == null ? null : ((userDetails.ProfilePicGuid.Contains("http://") || userDetails.ProfilePicGuid.Contains("https://")) ? userDetails.ProfilePicGuid : AppSettingsUtil.ProfilePicturesPath + userDetails.Id + '/' + userDetails.ProfilePicGuid);
                  userAc.Gender = userDetails.Gender;
                    userAc.Education = userDetails.Education;
                    userAc.Institute = userDetails.Institute;
                    userAc.City = userDetails.Location;
                    userCollection.Add(userAc);
                }
              return userCollection;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw ;
            }
        }

        #endregion

        #region Contnet Details
        /// <summary>
        /// View eLearning content in details
        /// </summary>
        /// <param name="id">Id Of ContentId</param>
        /// <returns>object of Content.</returns>
        [HttpGet]
        [Route("api/ELearningContent/viewContentDetail")]
        public IHttpActionResult ViewContentDetail(int id)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated)
                {
                    var eLearningContentCollection = new List<ContentAc>();
                    var contentList = _eLearningContentRepository.ViewContentDetail(id);
                    foreach (var content in contentList)
                    {
                        var eLearningContent = new ContentAc();
                        eLearningContent = ApplicationClassHelper.ConvertType<Content, ContentAc>(content);

                        if (content.ContentImageGuid == null)
                        {
                            eLearningContent.ContentImage = StringConstants.contentImageDefaultPath;
                        }
                        else
                        {
                            eLearningContent.ContentImage = AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid; 
                        }
                     //   eLearningContent.ContentImage = AppSettingsUtil.ContentPicturesPath + content.Id + '/' + content.ContentImageGuid; ;
                        eLearningContent.CreatedBy = content.CreatedOn;
                        eLearningContent.Rate = content.Rate;
                        eLearningContent.CreatedDateTime = content.LaunchStartTime.ToLongDateString();
                        eLearningContent.ContentId = content.Id;
                        //if (content.User.ProfilePicGuid == null)
                        //{
                        //    eLearningContent.UserImageGuid = "/Images/up.png";
                        //}
                        //else
                        //{
                        //    eLearningContent.UserImageGuid = AppSettingsUtil.ProfilePicturesPath + content.UserId + '/' +
                        //                                content.User.ProfilePicGuid;
                       
                        //}
                        eLearningContent.UserImageGuid = content.User.ProfilePicGuid == null ? null : ((content.User.ProfilePicGuid.Contains("http://") || content.User.ProfilePicGuid.Contains("https://")) ? content.User.ProfilePicGuid : AppSettingsUtil.ProfilePicturesPath + content.UserId + '/' + content.User.ProfilePicGuid);
                        var eLearningLectureCollection = new List<ELearningLectureAc>();
                        foreach (var contentLecture in content.ELearningLecture)
                        {
                            var a = new ELearningLectureAc();
                            var eLearningSectionCollection = new List<ELearningSectionAc>();
                            var eLearningLectureAc = ApplicationClassHelper.ConvertType<ELearningLecture, ELearningLectureAc>(contentLecture);
                            eLearningLectureAc.ContentId = contentLecture.ContentId;
                            eLearningLectureAc.ELearningLectureId = contentLecture.Id;
                            eLearningLectureAc.Title = contentLecture.Title;
                            foreach (var contentSection in contentLecture.ELearningSection)
                            {
                                var eLearningSectionAc = ApplicationClassHelper.ConvertType<ELearningSection, ELearningSectionAc>(contentSection);
                                eLearningSectionAc.ELearningLectureId = contentSection.ELearningLectureId;
                                eLearningSectionAc.Title = contentSection.Title;
                                eLearningSectionAc.ELearningSectionId = contentSection.Id;
                                eLearningSectionCollection.Add(eLearningSectionAc);
                            }
                            eLearningLectureAc.ELearningSection = eLearningSectionCollection;
                            eLearningLectureCollection.Add(eLearningLectureAc);
                        }
                        eLearningContent.ELearningLecture = eLearningLectureCollection;
                        eLearningContentCollection.Add(eLearningContent);
                    }
                    return Ok(eLearningContentCollection);
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        } 
        #endregion

        #region Elearning sectionpage Details
        /// <summary>
        /// Get ELearningSectionPage detail by ELearningSectionId
        /// </summary>
        /// <param name="id">Id Of SectionId</param>
        /// <returns>Object of ElearningSection</returns>
        [HttpGet]
        [Route("api/ELearningContent/eLearningSectionDetail")]
        public IHttpActionResult ELearningSectionDetail(int id)
        {
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var eLearningSectionPageCollection = new List<ELearningSectionAc>();
                    var sectionId = _eLearningSectionContext.FirstOrDefault(x => x.Id == id).ELearningLectureId;
                    var contentId = _eLearningLectureContext.FirstOrDefault(x => x.Id == sectionId).ContentId;
                    var content = _contentContext.FirstOrDefault(x => x.Id == contentId && !x.IsDeleted);
                    foreach (var eLearningSection in _eLearningContentRepository.ELearningSectionDetail(id))
                    {
                        var eLearningSectionAc = new ELearningSectionAc();
                        eLearningSectionAc = ApplicationClassHelper.ConvertType<ELearningSection, ELearningSectionAc>(eLearningSection);
                        eLearningSectionAc.ELearningSectionId = eLearningSection.Id;
                        eLearningSectionAc.ELearningLectureId = eLearningSection.ELearningLectureId;
                        eLearningSectionAc.Title = eLearningSection.Title;
                        var eLearningSectionPageAc = new List<ELearningSectionPageAc>();
                        foreach (var sectionPage in eLearningSection.ELearningSectionPage)
                        {
                            var eLearningSectionPage = ApplicationClassHelper.ConvertType<ELearningSectionPage, ELearningSectionPageAc>(sectionPage);
                            eLearningSectionPage.ELearningSectionId = sectionPage.ELearningSectionId;
                            eLearningSectionPage.ELearningSectionPageId = sectionPage.Id;
                            eLearningSectionPage.SectionContentFileGuid = AppSettingsUtil.ContentPagesPath + content.Id + '/' + sectionPage.SectionContentFileGuid;
                            eLearningSectionPage.SectionContentData = sectionPage.SectionContentData;
                            eLearningSectionPage.IsInteractive = sectionPage.IsInteractive;
                            eLearningSectionPageAc.Add(eLearningSectionPage);
                        }
                        eLearningSectionAc.ELearningSectionPage = eLearningSectionPageAc;
                        eLearningSectionPageCollection.Add(eLearningSectionAc);
                    }
                    return Ok(eLearningSectionPageCollection);
                }
                else
                {
                    return BadRequest();
                }
               
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }   
        #endregion

        #region Get ELeanringContent ById
        /// <summary>
        /// Get ELearning Content By contentId
        /// </summary>
        /// <param name="id">Id Of ContentId</param>
        /// <returns>object of content</returns>

        [HttpGet]
        [Route("api/ELearningContent/getELearningContentById")]
        public List<Content> GetELearningContentById(int id)
        {
            try
            {
                var contentCollection = new List<Content>();
                var contentById = _eLearningContentRepository.GetELearningContentById(id);
                foreach (var content in contentById)
                {
                    var contentList = new Content();
                    contentList.Id = content.Id;
                    contentList.Title = content.Title;
                    contentCollection.Add(contentList);
                }
                return contentCollection;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }    
        } 
        #endregion
       
        #region Delete ELearningContent By ContentId
        /// <summary>
        /// Delete eLearning content by content id.
        /// </summary>
        /// <param name="id">Id of content id to be delete content.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/ELearningContent/deleteELearningContentById")]
        public IHttpActionResult DeleteELearningContentById(int id)
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated)
                {
                    _eLearningContentRepository.DeleteELearningContentById(id);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
              
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                return BadRequest();
            }
        } 
        #endregion

        #region Get ELearningLecture By LectureId
        /// <summary>
        /// Get ELearning Lecture detail by LectureId.
        /// </summary>
        /// <param name="id">Id of LectureId</param>
        /// <returns>object of ELearningLecture</returns>
        [HttpGet]
        [Route("api/ELearningContent/getELearningLectureById")]
        public IHttpActionResult GetELearningLectureById(int id)
        {
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var contentId = _eLearningLectureContext.FirstOrDefault(x => x.ContentId == id).Id;
                    var contentCollection = new List<ContentAc>();
                    foreach (var eLearningcontent in _eLearningContentRepository.GetELearningLectureById(id))
                    {
                        var contentAc = new ContentAc();
                        contentAc = ApplicationClassHelper.ConvertType<Content, ContentAc>(eLearningcontent);
                        contentAc.ContentId = eLearningcontent.Id;
                        contentAc.Title = eLearningcontent.Title;
                        var lectureCollection = new List<ELearningLectureAc>();
                        foreach (var eLearningLecture in eLearningcontent.ELearningLecture)
                        {
                            var lectureAc = new ELearningLectureAc();
                            lectureAc = ApplicationClassHelper.ConvertType<ELearningLecture, ELearningLectureAc>(eLearningLecture);
                            lectureAc.ContentId = eLearningLecture.ContentId;
                            lectureAc.ELearningLectureId = eLearningLecture.Id;
                            lectureAc.Title = eLearningLecture.Title;
                            var sectionPageCollection = new List<ELearningSectionPageAc>();
                            foreach (var contentSection in eLearningLecture.ELearningSection)
                            {
                                foreach (var sectionPage in contentSection.ELearningSectionPage)
                                {
                                    var sectionPageAc = ApplicationClassHelper.ConvertType<ELearningSectionPage, ELearningSectionPageAc>(sectionPage);
                                    sectionPageAc.ELearningSectionId = sectionPage.ELearningSectionId;
                                    sectionPageAc.ELearningSectionPageId = sectionPage.Id;
                                    sectionPageAc.SectionContentFileGuid = AppSettingsUtil.ContentPagesPath + id + '/' + sectionPage.SectionContentFileGuid;
                                    sectionPageAc.TopicName = sectionPage.TopicName;
                                    sectionPageAc.SectionContentData = sectionPage.SectionContentData;
                                    sectionPageAc.YouTubeLink = sectionPage.YouTubeLink;
                                    sectionPageCollection.Add(sectionPageAc);
                                }
                            }
                            lectureAc.ELearningSectionPage = sectionPageCollection;
                            lectureCollection.Add(lectureAc);
                        }
                        contentAc.ELearningLecture = lectureCollection;
                        contentCollection.Add(contentAc);
                    }

                    return Ok(contentCollection);

                }
                else
                {
                    return BadRequest();
                }
                            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }   
        #endregion

        #region viewELearningSectionById
        /// <summary>
        /// view eLearningSection details by section id
        /// </summary>
        /// <param name="id">Id Of sectionId.</param>
        /// <returns>object of elearningsection.</returns>
        [HttpGet]
        [Route("api/ELearningContent/viewELearningSectionById")]
        public List<ELearningSectionAc> ViewELearningSectionById(int id)
        {
            try
            {

                var sectionId = _eLearningSectionContext.FirstOrDefault(x => x.Id == id).ELearningLectureId;
                var contentId = _eLearningLectureContext.FirstOrDefault(x => x.Id == sectionId).ContentId;
                var eLearningSectionCollection = new List<ELearningSectionAc>();
                foreach (var eLearningSection in _eLearningContentRepository.ViewELearningSectionById(id))
                {
                    var eLearningSectionAc = new ELearningSectionAc();
                    eLearningSectionAc = ApplicationClassHelper.ConvertType<ELearningSection, ELearningSectionAc>(eLearningSection);
                    eLearningSectionAc.ELearningLectureId = eLearningSection.ELearningLectureId;
                    eLearningSectionAc.ELearningSectionId = eLearningSection.Id;
                    eLearningSectionAc.Title = eLearningSection.Title;
                    var eLearningSectionPage = new List<ELearningSectionPageAc>();
                    foreach (var sectionPage in eLearningSection.ELearningSectionPage)
                    {
                        var eLearningSectionPageAc = ApplicationClassHelper.ConvertType<ELearningSectionPage, ELearningSectionPageAc>(sectionPage);
                        eLearningSectionPageAc.ELearningSectionId = sectionPage.ELearningSectionId;
                        eLearningSectionPageAc.ELearningSectionPageId = sectionPage.Id;
                        eLearningSectionPageAc.SectionContentFileGuid = AppSettingsUtil.ContentPagesPath + contentId + '/' + sectionPage.SectionContentFileGuid;
                        eLearningSectionPage.Add(eLearningSectionPageAc);
                    }
                    eLearningSectionAc.ELearningSectionPage = eLearningSectionPage;
                    eLearningSectionCollection.Add(eLearningSectionAc);
                }
                return eLearningSectionCollection;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        } 

        #endregion

        #region view Interactive Detail
        /// <summary>
        /// View Intrective details by section Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/ELearningContent/viewInteractiveDetails")]
        public IHttpActionResult viewInteractiveDetails(int id)
        {
            try
            {
                var contentid  = new ContentAc();
                var currentLecture = _eLearningSectionContext.FirstOrDefault(x => x.Id == id).ELearningLectureId;
                var currentcontent = _eLearningLectureContext.FirstOrDefault(x => x.Id == currentLecture).ContentId;
                contentid.ContentId = currentcontent;
                return Ok(contentid);
            }
            catch (Exception)
            {
                
                throw;
            }
            
        }
        #endregion

        #region Get All Content List
        /// <summary>
        /// Get all e-Leraning Content List 
        /// </summary>
        /// <returns>collection of content object</returns>
        [Route("api/ELearningContent/getContentList")]
        [HttpGet]
        public IHttpActionResult GetContentList()
        {
            try
            {
                var contentAc = new ContentAc();
                var contentCollection = new List<ContentAc>();
                foreach (var contentitem in _eLearningContentRepository.GetELearningContentList())
                {
                    contentAc = ApplicationClassHelper.ConvertType<Content, ContentAc>(contentitem);
                    contentAc.UserId = contentitem.User.Id;
                    contentAc.CreatedBy = contentitem.CreatedOn;

                    if (contentitem.ContentImageGuid == null)
                  {
                      contentAc.ContentImage = StringConstants.contentImageDefaultPath;
                  }
                  else
                  {
                      contentAc.ContentImage = AppSettingsUtil.ContentPicturesPath + contentitem.Id + '/' + contentitem.ContentImageGuid;
                  }
                    contentAc.Description = contentitem.Description;
                    contentAc.Title = contentitem.Title;
                    contentAc.ContentType = contentitem.ContentType.Name;
                    contentAc.CreatedDateTime = contentitem.LaunchStartTime.ToLongDateString();
                    contentAc.ContentId = contentitem.Id;
                    contentAc.Rate = contentitem.Rate;
                    contentAc.IsReadonly = false;
                    contentCollection.Add(contentAc);
                }

                return Ok(contentCollection);
            }

            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }

        #endregion

        [Route("api/ELearningContent/getAllMyContentList")]
        [HttpGet]
        public IHttpActionResult GetAllMyContentList()
        {
            try
            {
                if (HttpContext.Current.Request.IsAuthenticated)
                {
                    var currentUser = HttpContext.Current.User.Identity.Name;


                    var contentAc = new ContentAc();
                    var contentCollection = new List<ContentAc>();
                    var content = _eLearningContentRepository.GetAllMyContentList();
                    foreach (var contentitem in content)
                    {
                        contentAc = ApplicationClassHelper.ConvertType<Content, ContentAc>(contentitem);
                        contentAc.UserId = contentitem.User.Id;
                        contentAc.CreatedBy = contentitem.CreatedOn;

                        if (contentAc.ContentImageGuid == null)
                        {
                            contentAc.ContentImage = StringConstants.contentImageDefaultPath;
                        }
                        else
                        {
                            contentAc.ContentImage = AppSettingsUtil.ContentPicturesPath + contentitem.Id + '/' +
                                                     contentitem.ContentImageGuid;
                        }
                        contentAc.Description = contentitem.Description;
                        contentAc.Title = contentitem.Title;
                        contentAc.ContentType = contentitem.ContentType.Name;
                        contentAc.CreatedDateTime = contentitem.LaunchStartTime.ToLongDateString();
                        contentAc.ContentId = contentitem.Id;
                        contentAc.Rate = contentitem.Rate;
                        contentAc.IsReadonly = false;

                        if (currentUser == contentitem.User.Email)
                        {
                            contentAc.IsDeleteOnly = true;
                        }
                        else
                        {
                            contentAc.IsDeleteOnly = false;
                        }
                        foreach (var contentLecture in contentitem.ELearningLecture)
                        {
                            foreach (var contentSection in contentLecture.ELearningSection)
                            {
                                foreach (var contentSectionPage in contentSection.ELearningSectionPage)
                                {
                                    if (contentSectionPage.IsInteractive == true)
                                    {
                                        contentAc.IsInteractiveOnly = true;
                                        contentAc.IsInteractiveResultOnly = false;
                                        break;
                                    }

                                }
                            }
                        }
                        contentCollection.Add(contentAc);
                    }

                    return Ok(contentCollection);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }
    }
}

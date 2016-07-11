using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Repository.Modules.ELearningContent;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Core.Controllers
{
    public class ELearningController :Controller
    {
        private readonly IELearningContentRepository _eLearningContentRepository;
        private readonly IDataRepository<Content> _contentDataRepository;

        /// <summary>
        /// Constructor that initialize private method.
        /// </summary>
        /// <param name="eLearningContentRepository">to access elearning content repository.</param>
        /// <param name="contentDataRepository"></param>
        public ELearningController(IELearningContentRepository eLearningContentRepository,IDataRepository<Content> contentDataRepository)
        {
            _eLearningContentRepository = eLearningContentRepository;
            _contentDataRepository = contentDataRepository;
        }

        [HttpGet]
        public ActionResult Index()
        {

            return View();
        }

        #region View ELearning Content detail by content id. 
        /// <summary>
        /// view content details by content id
        /// </summary>
        /// <param name="id">id of content id</param>
        /// <returns>object of content</returns>
        [HttpGet]
        public ActionResult ViewCourse(int id)
        {
            try
            {
              
                GlobalUtil.LogInfo("View Course call", this.GetType());
                var contentCollection = new List<Content>();
                var contentList = new Content();
                var currentcontent = _contentDataRepository.FirstOrDefault(x => x.Id == id);
                if (currentcontent == null)
                {
                    ViewBag.ErrorMessage = "No data found.";

                }
                else
                {
                   var content = _contentDataRepository.FirstOrDefault(x => x.Id == currentcontent.Id);
                    contentList.Title = content.Title;
                    contentList.Description = content.Description;
                    contentList.ContentImageGuid = content.ContentImageGuid;
                    contentList.CreatedOn = content.CreatedOn;
                    contentList.CreatedDateTime = (content.CreatedDateTime);
                    contentList.Status = content.Status;
                    contentList.Rate = content.Rate;
                    contentList.UserId = content.UserId;
                    var userProfile  = content.User.ProfilePicGuid == null?null : ((content.User.ProfilePicGuid.Contains("http://") || content.User.ProfilePicGuid.Contains("https://")) ? content.User.ProfilePicGuid : AppSettingsUtil.ProfilePicturesPath + content.User.Id + '/' + content.User.ProfilePicGuid);
                    contentList.User = content.User;
                    contentList.User.ProfilePicGuid = userProfile;
                    contentList.ELearningLecture = content.ELearningLecture;

                    contentCollection.Add(contentList);
                    return View(contentCollection);
                    
                    

                }


                return View("ViewCourse");

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
             
            }
           
            }

        #endregion
    }
}

using System;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;
//using System.Web.Mvc.Html;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;
using LearningCenter.Repository.ApplicationClasses;
using LearningCenter.Core.Lib;
using LearningCenter.Utility.Constants;


namespace LearningCenter.Core.Controllers
{

    public class ProfileController : ApiController
    {
        #region "Private Variables"
       
        private readonly IDataRepository<User> _userContext;
        private readonly GlobalLib _globalLibContext;
        private readonly ContentLib _contentLibContext;
       
      
       
        #endregion

        #region constructor
        public ProfileController(IDataRepository<User> userContext, GlobalLib globalLibContext, ContentLib contentLibContext)
        {

            _userContext = userContext;
            _globalLibContext = globalLibContext;
            _contentLibContext = contentLibContext;
        }
           
       

       
        #endregion

        #region Profile
        //  GET: /api/values/getCurrentUserInfo
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <returns>current user object</returns>
        [HttpGet]
        [System.Web.Http.Route("api/values/getCurrentUserInfo")]
        public IHttpActionResult GetCurrentUserInfo()
        {
            try 
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated) { 
                var currentUserIdentity = HttpContext.Current.User.Identity.Name;
                //var identityModel = new LearningCenter.DomainModel.Models.Account.IdentityManager();
                //var user = identityModel.FindByEmail(currentUserIdentity);
                //var role = identityModel.FindUserRole(user.Id);
                
                var currentUser = _userContext.FirstOrDefault(x => x.Email == currentUserIdentity);
               
                currentUser.ProfilePicGuid = currentUser.ProfilePicGuid == null ? null : ((currentUser.ProfilePicGuid.Contains("http://") || currentUser.ProfilePicGuid.Contains("https://")) ? currentUser.ProfilePicGuid :AppSettingsUtil.ProfilePicturesPath + currentUser.Id+ '/' + currentUser.ProfilePicGuid);



                var fbUrl = currentUser.FacebookLink == null ? null : (currentUser.FacebookLink.Contains("https://") || currentUser.FacebookLink.Contains("http://")) ? currentUser.FacebookLink.Split(new string[] { StringConstants.fbStaticUrl }, StringSplitOptions.RemoveEmptyEntries) : null;
                currentUser.FacebookLink = fbUrl == null ? currentUser.FacebookLink : fbUrl[fbUrl.Length - 1];

                var twitterUrl = currentUser.TwitterLink == null ? null : (currentUser.TwitterLink.Contains("https://") || currentUser.FacebookLink.Contains("http://")) ? currentUser.TwitterLink.Split(new string[] { StringConstants.twitterStaticUrl }, StringSplitOptions.RemoveEmptyEntries) : null;
                currentUser.TwitterLink = twitterUrl == null ? currentUser.TwitterLink : twitterUrl[twitterUrl.Length - 1];
                //currentUser.CountryCollection = _contentLibContext.GetAllCountry();
                GlobalUtil.LogInfo(currentUser.ProfilePicGuid,typeof(string));
              

                return Ok(currentUser);
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


        //POST: /api/values/PostCurrentUserInfo
        /// <summary>
        /// Save User Profile Info
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        [System.Web.Http.Route("api/values/postCurrentUserInfo")]
        public IHttpActionResult PostCurrentUSerInfo(User user)
        {
            try { 
          
            var currentUserIdentity = HttpContext.Current.User.Identity.Name;
            var currentUser = _userContext.FirstOrDefault(x => x.Email == currentUserIdentity);
           
            if(HttpContext.Current.User.Identity.IsAuthenticated)
            {
                
                currentUser.AboutMe = user.AboutMe;
                currentUser.DateOfBirth = user.DateOfBirth;
                currentUser.Location = user.Location;
                currentUser.Gender = user.Gender;
               // currentUser.Country = user.Country;
                currentUser.FirstName = user.FirstName;
                currentUser.LastName = user.LastName;
                currentUser.Experience = user.Experience;
                currentUser.Education = user.Education;
                currentUser.Skils = user.Skils;
                currentUser.WorkInfo = user.WorkInfo;
                currentUser.IsProfileCreated = true;
                currentUser.ProfilePicName = user.ProfilePicName;
                currentUser.JobTitle = user.JobTitle;
                currentUser.CompanyName = user.CompanyName;
                //check facebook and twiteer link does not contain wrong url
                var fbUrl = currentUser.FacebookLink == null ? null : (currentUser.FacebookLink.Contains("https://") || currentUser.FacebookLink.Contains("http://")) ? currentUser.FacebookLink.Split(new string[] { StringConstants.fbStaticUrl }, StringSplitOptions.RemoveEmptyEntries) : null;
                currentUser.FacebookLink = fbUrl == null ? currentUser.FacebookLink : fbUrl[fbUrl.Length - 1]  ;
                var twitterUrl = currentUser.TwitterLink == null ? null : (currentUser.TwitterLink.Contains("https://") || currentUser.FacebookLink.Contains("http://")) ? currentUser.TwitterLink.Split(new string[] { StringConstants.twitterStaticUrl }, StringSplitOptions.RemoveEmptyEntries) : null;
                currentUser.TwitterLink = twitterUrl == null ? currentUser.TwitterLink : twitterUrl[twitterUrl.Length - 1];
                if (user.ProfilePicGuid != null && (!(user.ProfilePicGuid.Contains("http://") || user.ProfilePicGuid.Contains("https://"))))
                {
                    var guidName = user.ProfilePicGuid.Split('/');
                    int arraySize = guidName.Length - 1;
                    var fileGuidName = guidName[arraySize];
                    currentUser.ProfilePicGuid = fileGuidName;
                }
                else
                {
                    currentUser.ProfilePicGuid = user.ProfilePicGuid;
                }
               
                _userContext.Update(currentUser);
                _userContext.SaveChanges();
                return Ok();
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

        /// <summary>
        /// get current user created profile or not
        /// </summary>
        /// <param name="user"></param>
        /// <returns>isprofile created or not</returns>
        [HttpGet]
        [System.Web.Http.Route("api/values/IsProfileCreated")]
        public IHttpActionResult IsProfileCreated()
        {
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var currentUser = HttpContext.Current.User.Identity.Name;
                    bool isProfileCreated = _userContext.FirstOrDefault(x => x.Email == currentUser).IsProfileCreated;
                 
                    return Ok(new { isProfileCreated = isProfileCreated });
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

        #region upload image
        /// <summary>
        /// upload image on server
        /// </summary>
        /// <returns>uploaded file</returns>
        [HttpPost]
        [Route("api/files/upload")]
        public IHttpActionResult UploadProfileImages()
        {
            try 
            { 

            var uploadFolder = AppSettingsUtil.ProfilePicturesPath;
            var currentUserIdentity = HttpContext.Current.User.Identity.Name;
            var currentUserId = _userContext.FirstOrDefault(x => x.Email == currentUserIdentity).Id;
            var path = uploadFolder + currentUserId + "/";
            HttpPostedFile fileData = HttpContext.Current.Request.Files["file"];
            var result = _globalLibContext.UploadPictures(fileData, path);
            var file = new FileInfoAc();
            file.Name = result;
            return Ok(file);

            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            
            }

            
        }
        #endregion

      


    }
}

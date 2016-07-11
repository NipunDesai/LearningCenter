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
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;
using LearningCenter.Utility.Constants;
using System.IO;
using Newtonsoft.Json;

namespace LearningCenter.Core.Controllers
{
    public class AdminController : ApiController
    {
        #region "Private Variables"
      
        private IDataRepository<UserInvitee> _userInviteeContext;
        private IDataRepository<User> _userContext;

     
        #endregion

         #region Constructor

        public AdminController(IDataRepository<UserInvitee> userInviteeContext, IDataRepository<User> userContext)
        {
            _userInviteeContext = userInviteeContext;
            _userContext = userContext;
           // _componentContext = componentContext;
        }

        #endregion

        #region UserInvitee method

       
      
        /// <summary>
        /// save invitee user information and send mail to invitee
        /// </summary>
        /// <param name="userInvitee"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("api/admin/UserInvitee")]
        public IHttpActionResult UserInvitee(UserInvitee userInvitee)
        {
            try { 
           
                //check current email id is registerd as buyer or not
                var isBuyer = _userContext.Fetch(x => x.Email == userInvitee.Email).Any();
                if (isBuyer)
                {

                    return Ok(new { errorMessage = MessageResourceConstants.EmailRegistred });
                }
                else { 
                //check current email is exist or not in user invitee table
                var existUser = _userInviteeContext.FirstOrDefault(x => x.Email == userInvitee.Email);

                //save user email and send registration link mail 
                if (existUser == null) { 
              
                // Create token.
                var token = Guid.NewGuid().ToString();
                userInvitee.Token = token;
                    //if mail is successfully send then only save entry in userinvitee table
                if (IsMailSent(userInvitee))
                {
                    var invitee = new UserInvitee
                    {
                        Name = userInvitee.Name,
                        Email = userInvitee.Email,
                        IsRegistered = false,
                        IsDeleted = false,
                        Token = userInvitee.Token,
                        CreatedDateTime = DateTime.UtcNow

                    };
                  
                    _userInviteeContext.Add(invitee);
                    _userInviteeContext.SaveChanges();
                  
                 
                    return Ok(new { successMessage = MessageResourceConstants.InvitationSent });
                }
                else
                {
                    return Ok(new { errorMessage = MessageResourceConstants.InvitationMailFailure });
                }
                }
                else
                {
                    //check exist user is registerd or not 
                    if (existUser.IsRegistered) {

                        return Ok(new { errorMessage = MessageResourceConstants.EmailRegistred });
                    }

                    //update its current date and send again registration link mail
                    else
                    {
                        //if mail is send successfully then only update entry userinvitee table(update only created date time)
                        if (IsMailSent(existUser)) { 
                      
                         existUser.CreatedDateTime = DateTime.UtcNow;
                        _userInviteeContext.Update(existUser);
                        _userInviteeContext.SaveChanges();
                      
                     
                        return Ok(new { successMessage = MessageResourceConstants.InvitationSent });

                        }
                        else
                        {

                            return Ok(new { errorMessage = MessageResourceConstants.InvitationMailFailure });
                        }
                    }
                }
                }
           
            }
            catch(Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }
      

        #endregion

        #region send mail for registration

        public bool IsMailSent(UserInvitee userInvitee)
        {
            try { 
           
                  //  var callbackUrl = "http://localhost:4424/Account/Register?token=" + userInvitee.Token;
                 //   var callbackUrl = Url.Action(StringConstants.Register, StringConstants.Account, new RouteValueDictionary(new{ token = userInvitee.Token }), protocol: Request.Url.Scheme, hostName: AppSettingsUtil.PublicUrl);
                    var callbackUrl = AppSettingsUtil.PublicUrl + '/' + StringConstants.Account + '/' + StringConstants.Register + '/' + '?' + "token=" + userInvitee.Token;
                    const string subject = StringConstants.InviteeUserSubject;
                    string path = HttpContext.Current.Server.MapPath(@"\EmailTemplate\InviteeUser.html");
                    string finalTemplate = System.IO.File.ReadAllText(path);
                    finalTemplate = finalTemplate.Replace("${Email}$", userInvitee.Email).Replace("$CallBack$", callbackUrl);

                    //if mail is successfully sent than ..
                    if (Common.SendEmail(userInvitee.Email, subject, finalTemplate)) {
                        return true;
                    }
                    else { return false; }
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

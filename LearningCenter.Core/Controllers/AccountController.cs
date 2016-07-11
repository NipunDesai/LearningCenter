using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Models.Account;
using LearningCenter.Repository.ApplicationClasses;
using System.Collections.Generic;
using LinkedIn.Api.Client.Owin;
using LinkedIn.Api.Client.Owin.Profiles;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using Newtonsoft.Json;
using LearningCenter.Utility.Constants;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Core.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private IDataRepository<User> _userContext;
        private IDataRepository<UserInvitee> _userInviteeContext;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public AccountController(IDataRepository<User> userContext, IDataRepository<UserInvitee> userInviteeContext)
        {
            // _componentContext = componenetContext;
            _userContext = userContext;
            _userInviteeContext = userInviteeContext;
        }
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            HttpContext.GetOwinContext()
      .Response.Cookies.Append("OwinCookie", "SomeValue");
            var httpCookie = HttpContext.Response.Cookies["ASPCookie"];
            if (httpCookie != null)
                httpCookie.Value = "SomeValue";

            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return View(model);
            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        #region SignIn
        // GET: /Account/SignIn
        [AllowAnonymous]
        public ActionResult SignIn()
        {
            if (HttpContext.User.Identity.Name == AppSettingsUtil.AdminUserName)
            {

                return RedirectToAction("Dashboard", "Account");
            }
            else
            {
                return View();
            }
        }

        // POST: /Account/SignIn
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]

        public async Task<ActionResult> SignIn(LoginViewModel model, string returnUrl)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(model);
                }
               // var identityManager = new IdentityManager();

                //get current user object
                var user = UserManager.FindByEmail(model.Email);
                //check if the user is in the specified role

               // if (identityManager.IsUserInRole(user.Id, StringConstants.Admin))
               // {
                    var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);
                    switch (result)
                    {
                        case SignInStatus.Success:
                            // return RedirectToLocal(returnUrl);
                            return RedirectToAction("Dashboard", "Account");


                        case SignInStatus.Failure:
                        default:
                            ModelState.AddModelError("", MessageResourceConstants.InvalidEmailPassword);
                            ViewBag.Message = MessageResourceConstants.IncorrectEmailOrPassword;
                            return View(model);
                    }
               // }
               // else
               // {
                    ModelState.AddModelError("", MessageResourceConstants.InvalidEmailPassword);
                    ViewBag.Message = MessageResourceConstants.IncorrectEmailOrPassword;
                    return View(model);
               // }

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }

        }

        #endregion

        #region Dashboard
        // GET: /Account/Dashboard
        [Authorize(Roles = StringConstants.Admin)]
        public ActionResult Dashboard()
        {
            return View();
        }

        #endregion

        #region register
        //  GET: /Account/Register
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <returns></returns>


        [AllowAnonymous]
        public ActionResult Register()
        {
            var token = Request.QueryString["token"];
            if (token != null)
            {
                var userInvitee = _userInviteeContext.FirstOrDefault(x => x.Token == token);

                if (userInvitee != null)
                {
                    var model = new RegisterViewModel
                    {
                        Email = userInvitee.Email,
                        IsCreator = true
                    };
                    return View(model);
                }
                //if user enter invalid token then ...
                else
                {
                    var model = new RegisterViewModel
                    {
                        IsValidToken = true
                    };
                    ViewBag.meaasge = "Invalid Token";
                    return View(model);
                }
                // Email;

            }
            else
            {
                var model = new RegisterViewModel
                {
                    IsCreator = false
                };
                return View(model);
            }

        }


        // POST: /Account/Register
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    // using (TransactionScope ts = new TransactionScope()) { 
                    var user = new ELearningUser { UserName = model.Email, Email = model.Email };

                    var result = await UserManager.CreateAsync(user, model.Password);
                    //check user token 
                    List<string> tokenList = new List<string>();
                    tokenList = Request.UrlReferrer.AbsoluteUri.Split('=').ToList();
                    var token = tokenList.Count != 2 ? null : tokenList[1];
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);



                        //if(token == null)
                        //{
                        //    model.UserRoles = StringConstants.Buyer;
                        //}
                        //else
                        //{
                        //    //check is token is used or not
                        //    bool isTokenUsed = _userInviteeContext.Fetch(x => x.Token == token && x.IsRegistered).Any();
                        //    if (isTokenUsed) {
                        //        ViewBag.message = "Token is already used";
                        //        return View(model);
                        //    } 
                        //    else {
                        //        model.UserRoles = StringConstants.Creator;
                        //    }
                        //}
                        model.UserRoles = model.IsCreator ? StringConstants.Creator : StringConstants.Buyer;
                        //assign user to roles

                        var identityManager = new IdentityManager();
                        identityManager.AddUserToRole(user.Id, model.UserRoles);
                        var currentYear = DateTime.Now.Year;
                        var actualYear = currentYear - 100;
                        DateTime actualDate = new DateTime(actualYear, 1, 1);
                        var userInfo = new LearningCenter.DomainModel.Models.User
                        {
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            Email = user.Email,
                            UserName = user.Email,
                            IsDeleted = false,
                            CreatedDateTime = DateTime.UtcNow,
                            DateOfBirth = actualDate,
                            IsProfileCreated = model.IsCreator ? true : false  //this can be changed as per client's requirement

                        };

                        _userContext.Add(userInfo);
                        _userContext.SaveChanges();

                        //update isregistered = true in userinvitee table
                        if (token != null)
                        {

                            var userInvitee = _userInviteeContext.FirstOrDefault(x => x.Token == token);
                            //if current token userinvitee is not found in the userinvitee table then table is not updated
                            if (userInvitee != null)
                            {
                                userInvitee.IsRegistered = true;
                                _userInviteeContext.Update(userInvitee);
                                _userInviteeContext.SaveChanges();
                            }

                        }
                        return RedirectToAction(StringConstants.Index, StringConstants.Home);

                    }
                    else
                    {
                        if (token != null)
                        {
                            bool isTokenUsed = _userInviteeContext.Fetch(x => x.Token == token && x.IsRegistered).Any();
                            if (isTokenUsed)
                            {
                                ViewBag.message = "Registration token is already used";
                                return View(model);
                            }
                        }

                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError("", error);
                        }
                        ViewBag.Message = MessageResourceConstants.Email + model.Email + " " + MessageResourceConstants.AlreadyTaken;
                    }



                }
                return View(model);
            }
            catch (Exception ex)
            {

                GlobalUtil.HandleAndLogException(ex, this);
                throw;
            }
        }


        #endregion
      

        #region ForgetPassword
        // GET: /Account/ForgotPassword
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                //if user doesn't exist
                if (user == null)
                {

                    ViewBag.Error = model.Email + " " + MessageResourceConstants.UserDoesnotExist;
                    return View(StringConstants.ForgotPassword);
                }
                // if user is exist but login using external account than forget password doesn't do
                else if (user != null && user.PasswordHash == null)
                {
                    ViewBag.Error = MessageResourceConstants.ExternalUserDoesnotForgetPassword;
                    return View(StringConstants.ForgotPassword);
                }
                // if user is exist and do forget password than mail wiil be sent 
                else
                {
                    string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                    var callbackUrl = Url.Action(StringConstants.ResetPassword, StringConstants.Account, new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    const string subject = StringConstants.ForgetPasswordSubject;
                    string path = Server.MapPath(@"\EmailTemplate\ForgetPassword.html");
                    string finalTemplate = System.IO.File.ReadAllText(path);
                    finalTemplate = finalTemplate.Replace("${Email}$", model.Email).Replace("$CallBack$", callbackUrl);

                    //if mail is successfully sent than redirect to forgot password confirmation page
                    if (Common.SendEmail(model.Email, subject, finalTemplate))
                    {
                        return RedirectToAction("ForgotPasswordConfirmation", StringConstants.Account);
                    }

                    else
                    {
                        ViewBag.Error = MessageResourceConstants.SendEmailFailure;
                        return View(StringConstants.ForgotPassword);
                    }


                }

            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <returns>view</returns>
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        #endregion

        #region resetpassword

        // GET: /Account/ResetPassword
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <param name="code"></param>
        /// <returns>view</returns>
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }


        // POST: /Account/ResetPassword
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var url = Request.UrlReferrer.AbsoluteUri.Split('?', '&');
            var userId = url[1].Split('=');
            var currentUserId = userId[1];

            var user = await UserManager.FindByIdAsync(currentUserId);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error);
                }
                ViewBag.Message = StringConstants.InvalidToken;
            }

            return View();
        }


        // GET: /Account/ResetPasswordConfirmation
        /// <summary>
        /// <author>pooja shah</author>
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        #endregion
        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            //var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            //if (loginInfo == null)
            //{
            //    return RedirectToAction("Login");
            //}

            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }
            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                     // If the user does not have an account, then prompt the user to create an account
                      var currentYear = DateTime.Now.Year;
                    var actualYear = currentYear - 100;
                    DateTime actualDate = new DateTime(actualYear, 1, 1); 
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    var user = new ELearningUser { UserName = loginInfo.Email, Email = loginInfo.Email };
                var results = await UserManager.CreateAsync(user);
                if (results.Succeeded)
                {
                    results = await UserManager.AddLoginAsync(user.Id, loginInfo.Login);
                    if (results.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        if (loginInfo.Login.LoginProvider == "Facebook")
                        {
                            var identityManager = new IdentityManager();
                            identityManager.AddUserToRole(user.Id, StringConstants.Buyer);
                            var firstNameClaim = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:first_name");
                            var lastNameClaim = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:last_name");
                            var eduinfo = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:education");
                            var workinfo = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:work");
                            var aboutme = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:gender");
                            var fbworkInfo = new List<FbWorkInfoAc>();
                            var eductionInfo = new List<FbEduInfo>();
                            if (workinfo != null)
                            {
                                var workinfos = workinfo.Value;

                                fbworkInfo =
                           JsonConvert.DeserializeObject<List<FbWorkInfoAc>>(workinfos);

                            }
                            if (eduinfo != null)
                            {
                                var fbeduinfo = eduinfo.Value;
                                eductionInfo = JsonConvert.DeserializeObject<List<FbEduInfo>>(fbeduinfo);
                            }

                            var facebookUserID = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:id").Value;
                            var facebookUrl = loginInfo.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:link").Value;
                            string profilePicturePath = string.Format("http://graph.facebook.com/{0}/picture?type=large", facebookUserID);
                            var fbUrl = facebookUrl == null ? null : (facebookUrl.Contains("http://") || facebookUrl.Contains("https://")) ? facebookUrl.Split(new string[] { StringConstants.fbStaticUrl }, StringSplitOptions.RemoveEmptyEntries) : null;
                            var facebookPublicUrl = fbUrl == null ? facebookUrl : fbUrl[fbUrl.Length - 1];
                            var userInfo = new User
                            {
                                FirstName = firstNameClaim.Value,
                                LastName = lastNameClaim.Value,
                                Email = user.Email,
                                UserName = user.Email,
                                IsDeleted = false,
                                CreatedDateTime = DateTime.UtcNow,
                                FacebookLink = facebookPublicUrl,
                                ProfilePicGuid = profilePicturePath,
                                Education = eductionInfo.Count == 0 ? null : JsonConvert.SerializeObject(eductionInfo),
                                Gender = aboutme.Value.ToLower(),
                                WorkInfo = fbworkInfo.Count == 0 ? null : JsonConvert.SerializeObject(fbworkInfo),
                                LoginProvider = loginInfo.Login.LoginProvider,
                                DateOfBirth = actualDate

                            };

                            _userContext.Add(userInfo);
                            _userContext.SaveChanges();


                        }
                        else if (loginInfo.Login.LoginProvider == "Google")
                        {
                            var identityManager = new IdentityManager();
                            identityManager.AddUserToRole(user.Id, StringConstants.Buyer);
                            //get access token to use in profile image request
                            var accessToken = loginInfo.ExternalIdentity.Claims.Where(c => c.Type.Equals("urn:google:accesstoken")).Select(c => c.Value).FirstOrDefault();
                            var givenNameClaim = loginInfo.ExternalIdentity.Claims.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");
                            var surnameClain = loginInfo.ExternalIdentity.Claims.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname");
                            dynamic userPicture;
                            Uri apiRequestUri = new Uri("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken);
                            //request profile image
                            using (var webClient = new System.Net.WebClient())
                            {
                                var json = webClient.DownloadString(apiRequestUri);
                                dynamic re1 = JsonConvert.DeserializeObject(json);
                                userPicture = re1.picture;

                            }
                            var userInfo = new User
                            {
                                FirstName = givenNameClaim.Value,
                                LastName = surnameClain.Value,
                                Email = user.Email,
                                UserName = user.Email,
                                IsDeleted = false,
                                CreatedDateTime = DateTime.UtcNow,
                                ProfilePicGuid = userPicture,
                                LoginProvider = loginInfo.Login.LoginProvider,
                                DateOfBirth = actualDate

                            };

                            _userContext.Add(userInfo);
                            _userContext.SaveChanges();
                        }
                        else
                        {
                            var identityManager = new IdentityManager();
                            identityManager.AddUserToRole(user.Id, StringConstants.Creator);
                            var claim = loginInfo.ExternalIdentity.Claims.First(m => m.Type == "LinkedIn_AccessToken");
                            var client = new LinkedInApiClient(HttpContext.GetOwinContext().Request, claim.Value);
                            var profileApi = new LinkedInProfileApi(client);
                            var userProfile = await profileApi.GetFullProfileAsync();
                            var eductionCollection = new List<EducationsAc>();
                            if (userProfile.Educations != null)
                            {
                                foreach (var eduction in userProfile.Educations)
                                {
                                    var eductionAc = new EducationsAc();
                                    eductionAc.Degree = eduction.Degree;
                                    eductionAc.FieldOfStudy = eduction.FieldOfStudy;
                                    eductionAc.SchoolName = eduction.SchoolName;
                                    eductionCollection.Add(eductionAc);
                                }
                            }

                            var workCollection = new List<WorkInfoAc>();
                            if (userProfile.Positions != null)
                            {
                                foreach (var work in userProfile.Positions)
                                {
                                    var workAc = new WorkInfoAc();
                                    workAc.Id = work.Id;
                                    workAc.Company = work.Company.Name;
                                    workAc.StartTime = JsonConvert.SerializeObject(workAc.StartTime);
                                    workAc.EndTime = JsonConvert.SerializeObject(workAc.EndTime);
                                    workAc.IsCurrent = work.IsCurrent;
                                    workCollection.Add(workAc);

                                }
                            }

                            var skillCollection = new List<SkillsAc>();
                            if (userProfile.Skills != null)
                            {

                                foreach (var skills in userProfile.Skills)
                                {
                                    var skillAc = new SkillsAc();
                                    skillAc.SkillId = skills.Key;
                                    skillAc.SkillsValue = skills.Value;
                                    skillCollection.Add(skillAc);

                                }
                            }
                            var userInfo = new User
                            {
                                FirstName = userProfile.FirstName,
                                LastName = userProfile.LastName,
                                Email = user.Email,
                                UserName = user.Email,
                                IsDeleted = false,
                                CreatedDateTime = DateTime.UtcNow,
                                ProfilePicGuid = userProfile.PublicProfileUrl,
                                WorkInfo = workCollection.Count == 0 ? null : JsonConvert.SerializeObject(workCollection),
                                Education = eductionCollection.Count == 0 ? null : JsonConvert.SerializeObject(eductionCollection),
                                Skils = skillCollection.Count == 0 ? null : JsonConvert.SerializeObject(skillCollection),
                                Summary = userProfile.Summary,
                                LoginProvider = loginInfo.Login.LoginProvider,
                                DateOfBirth = actualDate,
                                IsProfileCreated = true //this can be changed according to client's requirement

                            };

                            _userContext.Add(userInfo);
                            _userContext.SaveChanges();
                        }
                        return RedirectToLocal(returnUrl);
                    }
                }
               
                    
                    foreach (var error in results.Errors)
                            {
                                ModelState.AddModelError("", error);
                            }
                            ViewBag.Message = "You have already logged in. Only one account can be used at a time.";
                        
                 
                    return View("Login");
                
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ELearningUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }



        /// <summary>
        /// logout admin 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOut()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("SignIn", "Account");
        }


        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}
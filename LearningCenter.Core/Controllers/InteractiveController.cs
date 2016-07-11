using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Http.Routing;
using Newtonsoft.Json.Schema;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.ApplicationClasses;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Repository.Helper;
using LearningCenter.Repository.Modules.ELearningContent;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Core.Controllers
{
   public class InteractiveController :ApiController
   {
       #region Private Members

       private readonly IInteractiveRepository _intrectiveRepository;
       private readonly IDataRepository<InteractiveOptions> _interactiveOptionDataRepository;
       private readonly IDataRepository<InteractiveQuestion> _interactiveQuestionDataRepository;
       private readonly IDataRepository<InteractiveResult> _interactiveResultRepository;
       private readonly IDataRepository<User> _userRepository;
       private readonly IDataRepository<Content> _contentDataRepository; 

    
       #endregion

       #region Constructor

       /// <summary>
       ///  Constructor that initialize private members.
       /// </summary>
       /// <param name="interactiveRepository"></param>
       /// <param name="interactiveOptionDataRepository">To access intrectiveoptions properties.</param>
       /// <param name="interactiveResultRepository">To access intrectiveresult properties.</param>
       /// <param name="userRepository">To access user properties.</param>
       public InteractiveController(IInteractiveRepository interactiveRepository, IDataRepository<InteractiveOptions> interactiveOptionDataRepository, IDataRepository<InteractiveResult> interactiveResultRepository, IDataRepository<User> userRepository, IDataRepository<Content> contentDataRepository, IDataRepository<InteractiveQuestion> interactiveQuestionDataRepository)
       {
           _intrectiveRepository = interactiveRepository;
           _interactiveOptionDataRepository = interactiveOptionDataRepository;
           _interactiveResultRepository = interactiveResultRepository;
           _userRepository = userRepository;
           _contentDataRepository = contentDataRepository;
           _interactiveQuestionDataRepository = interactiveQuestionDataRepository;

       }
       #endregion

       #region GetIntrectiveQuestions
       /// <summary>
       /// get all Interactive question.
       /// </summary>
       /// <returns></returns>

       [Route("api/InteractiveController/getAllInteractiveQuestions")]
       [HttpGet]
       public IHttpActionResult GetAllInteractiveQuestions(int id)
       {
           try
           {
               if (HttpContext.Current.User.Identity.IsAuthenticated)
               {
                   var treeCollection = new List<TreeNode>();
                   var currentUser = HttpContext.Current.User.Identity.Name;
                   var user = _userRepository.Fetch(x => x.UserName == currentUser).First();
                   var currentContent = _contentDataRepository.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                   var currentLecture = _contentDataRepository.FirstOrDefault(x => x.Id == id && x.UserId == user.Id && !x.IsDeleted);
                   if (currentLecture == null)
                   {
                       foreach (var section in _intrectiveRepository.GetAllInteractiveQuestions(id, user.Id))
                       {
                           foreach (var sectionPage in section.ELearningSectionPage)
                           {
                               foreach (var content in sectionPage.InteractiveQuestions)
                               {
                                   var treeNode = new TreeNode();
                                   treeNode.id = content.Id;
                                   treeNode.name = content.Text;
                                   treeNode.collapsed = false;
                                   treeNode.parent = true;
                                   treeNode.AlreadyExits = content.AlreadyExits;
                                   treeNode.CurrentUser = true;
                                   treeNode.ContentTitle = currentContent.Title;
                                   var childs = new List<TreeNode>();
                                   var getParentId = content.InteractiveOptions.Where(x => x.ParentInteractiveOptionId == 0).ToList();
                                   foreach (var intrectiveContent in getParentId)
                                   {
                                       var treeContent = new TreeNode();
                                       if (intrectiveContent.InteractiveQuestion.AlreadyExits == true)
                                       {
                                           treeContent.id = intrectiveContent.Id;
                                           treeContent.name = intrectiveContent.Option;
                                           treeContent.collapsed = true;
                                           treeContent.parent = false;
                                           treeContent.AlreadyExits = true;
                                           treeContent.CurrentUser = true;
                                           treeContent.InteractiveQuestionId = content.Id;
                                           treeContent.children = GetChildTree(treeContent.id, treeContent.AlreadyExits, treeContent.CurrentUser);
                                       }
                                       else
                                       {
                                           treeContent.id = intrectiveContent.Id;
                                           treeContent.name = intrectiveContent.Option;
                                           treeContent.collapsed = true;
                                           treeContent.parent = false;
                                           treeContent.AlreadyExits = false;
                                           treeContent.CurrentUser = true;
                                           treeContent.InteractiveQuestionId = content.Id;
                                           treeContent.children = GetChildTree(treeContent.id, treeContent.AlreadyExits, treeContent.CurrentUser);
                                       }
                                       childs.Add(treeContent);
                                   }
                                   treeNode.children = childs;
                                   treeCollection.Add(treeNode);
                               }
                           }

                       }
                   }
                   else
                   {
                       foreach (var section in _intrectiveRepository.GetAllInteractiveQuestions(id, user.Id))
                       {
                           foreach (var sectionPage in section.ELearningSectionPage)
                           {
                               foreach (var content in sectionPage.InteractiveQuestions)
                               {
                                   var treeNode = new TreeNode();
                                   treeNode.id = content.Id;
                                   treeNode.name = content.Text;
                                   treeNode.collapsed = false;
                                   treeNode.parent = true;
                                   treeNode.AlreadyExits = content.AlreadyExits;
                                   treeNode.CurrentUser = false;
                                   treeNode.ContentTitle = currentContent.Title;
                                   var childs = new List<TreeNode>();
                                   var getParentId = content.InteractiveOptions.Where(x => x.ParentInteractiveOptionId == 0).ToList();
                                   foreach (var intrectiveContent in getParentId)
                                   {
                                       var treeContent = new TreeNode();
                                       if (intrectiveContent.InteractiveQuestion.AlreadyExits == true)
                                       {
                                           treeContent.id = intrectiveContent.Id;
                                           treeContent.name = intrectiveContent.Option;
                                           treeContent.collapsed = true;
                                           treeContent.parent = false;
                                           treeContent.AlreadyExits = true;
                                           treeContent.CurrentUser = false;
                                           treeContent.InteractiveQuestionId = content.Id;
                                           treeContent.children = GetChildTree(treeContent.id, treeContent.AlreadyExits, treeContent.CurrentUser);
                                       }
                                       else
                                       {
                                           treeContent.id = intrectiveContent.Id;
                                           treeContent.name = intrectiveContent.Option;
                                           treeContent.collapsed = true;
                                           treeContent.parent = false;
                                           treeContent.AlreadyExits = false;
                                           treeContent.CurrentUser = false;
                                           treeContent.InteractiveQuestionId = content.Id;
                                           treeContent.children = GetChildTree(treeContent.id, treeContent.AlreadyExits, treeContent.CurrentUser);
                                       }
                                       childs.Add(treeContent);
                                   }
                                   treeNode.children = childs;
                                   treeCollection.Add(treeNode);
                               }
                           }

                       }
                   }
                   return Ok(treeCollection);
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
       /// Recursive Function.
       /// </summary>
       /// <param name="id"></param>
       /// <param name="alreadyExit"></param>
       /// <returns></returns>
       public List<TreeNode> GetChildTree(int id,bool alreadyExit,bool currentUser)
       {
           try
           {
               var intrectiveQuestionCollection = new List<TreeNode>();
               var childrens = new List<TreeNode>();
               foreach (var child in _interactiveOptionDataRepository.Fetch(x => x.ParentInteractiveOptionId == id).ToList())
               {
                   childrens.Add(new TreeNode
                   {
                       id = child.Id,
                       name = child.Option,
                       collapsed = true,
                       parent = false,
                       AlreadyExits = alreadyExit,
                       CurrentUser = currentUser,
                       children = GetChildTree(child.Id,alreadyExit,currentUser)
                   });
               }
               return childrens;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       #endregion

       #region GetInteractiveDetail
       ///<summary>
       ///get interactive detail by sectionpageid
       /// </summary>
       /// <returns></returns>
       [Route("api/InteractiveController/GetInteractiveDetailBySectionPageId")]
       [HttpGet]
       public IHttpActionResult GetInteractiveDetailBySectionPageId(int sectionPageId)
       {
           try
           {
               var interactiveQuestion = _interactiveQuestionDataRepository.FirstOrDefault(x => x.ELearningSectionPageId == sectionPageId);
               var treeNode = new TreeNode();
               treeNode.id = interactiveQuestion.Id;
               treeNode.name = interactiveQuestion.Text;
               treeNode.collapsed = false;
               treeNode.parent = true;
               treeNode.AlreadyExits = interactiveQuestion.AlreadyExits;
               treeNode.CurrentUser = true;
               treeNode.ELearningSectionPageId = sectionPageId;
               var childs = new List<TreeNode>();
               var getParentId = interactiveQuestion.InteractiveOptions.Where(x => x.ParentInteractiveOptionId == 0).ToList();
               foreach (var intrectiveContent in getParentId)
               {
                   var treeContent = new TreeNode();
                  
                       treeContent.id = intrectiveContent.Id;
                       treeContent.name = intrectiveContent.Option;
                       treeContent.collapsed = true;
                       treeContent.parent = false;
                       treeContent.AlreadyExits = true;
                       treeContent.CurrentUser = true;
                       treeContent.InteractiveQuestionId = interactiveQuestion.Id;
                       treeContent.children = GetChildTree(treeContent.id, treeContent.AlreadyExits, treeContent.CurrentUser);
                  
                   childs.Add(treeContent);
               }
               treeNode.children = childs;
               return Ok(treeNode);
           }
           catch (Exception ex) {

               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }
       #endregion

       #region SaveInteractiveOption
       /// <summary>
       /// Save Intrective Result by intrectiveOption id.
       /// </summary>
       /// <param name="id">Id of intrectiveoption id.</param>
       /// <returns>object of intrectiveresult.</returns>
       [Route("api/InteractiveController/saveInteractiveResult")]
       [HttpPost]
       public InteractiveResultAc SaveInteractiveResult(int id)
       {
           try
           {
               var currentUserName = HttpContext.Current.User.Identity.Name;
               var intrectiveResult = _intrectiveRepository.SaveInteractiveResult(id, currentUserName);
               return intrectiveResult;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw ;
           }
       }
       #endregion

       #region GetAllInteractiveResult
       /// <summary>
       /// get all intrective results by content Id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       [Route("api/InteractiveController/getAllInteractiveResult")]
       [HttpGet]
       public List<ResultsAc> GetAllInteractiveResult(int id)
       {
           try
           {
               var treeCollection = new List<ResultsAc>();
               var inrectiveResult = _intrectiveRepository.GetAllInteractiveResult(id);
               treeCollection.AddRange(inrectiveResult);
               return treeCollection;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }

       }

       #endregion


       #region Get all Interactive Question
       /// <summary>
       /// get all intrective question by content id.
       /// </summary>
       /// <param name="id">id of content id.</param>
       /// <returns>object of intrectivequestion.</returns>
       [Route("api/InteractiveController/getAllInteractiveQuestion")]
       [HttpGet]
       public IHttpActionResult GetAllIntrectiveQuestion(int id)
       {
           try
           {
               if (HttpContext.Current.Request.IsAuthenticated)
               {
                   var contentName = _contentDataRepository.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                   var intrectiveQuestionCollection = new List<InteractiveQuestionAc>();
                   foreach (var section in _intrectiveRepository.GetAllInteractiveQuestion(id))
                   {
                       foreach (var sectionPage in section.ELearningSectionPage)
                       {
                           foreach (var contentQuestion in sectionPage.InteractiveQuestions)
                           {
                               var intrectiveQuestionAc = new InteractiveQuestionAc();
                               intrectiveQuestionAc =
                           ApplicationClassHelper.ConvertType<InteractiveQuestion, InteractiveQuestionAc>(contentQuestion);
                               intrectiveQuestionAc.InteractiveQuestionId = contentQuestion.Id;
                               intrectiveQuestionAc.Option = contentQuestion.Text;
                               intrectiveQuestionAc.ContentTitle = contentName.Title;
                               intrectiveQuestionCollection.Add(intrectiveQuestionAc);

                           }
                       }
                   }
                   return Ok(intrectiveQuestionCollection);
               }
               else
               {
                   return BadRequest();
               }
              
           }
           catch
               (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       } 
       #endregion

       #region Get InteractiveQuestion By QuestionId
       /// <summary>
       /// get intrectivequestion by question id.
       /// </summary>
       /// <param name="id">id of question id</param>
       /// <returns>object of resultAC</returns>
       [Route("api/InteractiveController/getInteractiveQuestionById")]
       [HttpGet]
       public IHttpActionResult GetInteractiveQuestionById(int id)
       {
           try
           {
               if (HttpContext.Current.User.Identity.IsAuthenticated)
               {
                   var currentquestion = _intrectiveRepository.GetInteractiveQuestionById(id);
                   return Ok(currentquestion);
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

       #region Get All User
       /// <summary>
       /// get all user
       /// </summary>
       /// <returns>object of user.</returns>
       [Route("api/InteractiveController/getAllUser")]
       [HttpGet]
       public IHttpActionResult GetAllUser()
       {
           try
           {
               if (HttpContext.Current.Request.IsAuthenticated)
               {
                   var userCollection = new List<UserAc>();
                   foreach (var user in _intrectiveRepository.GetAllUser())
                   {
                       var userAc = new UserAc();
                       userAc = ApplicationClassHelper.ConvertType<User, UserAc>(user);
                       userAc.UserName = user.UserName;
                       userAc.UserId = user.Id;
                       userCollection.Add(userAc);
                   }
                   return Ok(userCollection);
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

       #region Get InteractiveResult ByUserId
       /// <summary>
       /// get all intrectiveresult by userid 
       /// </summary>
       /// <param name="id">id of intrectiveresult id.</param>
       /// <returns>object of resultAC.</returns>
       [Route("api/InteractiveController/getInteractiveResultByUserId")]
       [HttpGet]
       public List<ResultsAc> GetIntrectiveResultByUserId(int id)
       {
           try
           {
               var userResult = _intrectiveRepository.GetInteractiveResultByUserId(id);
               return userResult;
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

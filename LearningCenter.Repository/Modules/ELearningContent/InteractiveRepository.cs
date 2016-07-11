using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Schema;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.ApplicationClasses;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;
using Content = LearningCenter.DomainModel.Models.Content;

namespace LearningCenter.Repository.Modules.ELearningContent
{
    public class InteractiveRepository : IInteractiveRepository
    {
        private readonly IDataRepository<Content> _contentRepository;
       private readonly IDataRepository<User> _userRepository;
       private readonly IDataRepository<ELearningSection> _eLearningSelectionRepository;
       private readonly IDataRepository<ELearningLecture> _eLearningLectureRepository;
       private readonly IDataRepository<ELearningSectionPage> _eLearningSectionPageRepository;
       private readonly IDataRepository<InteractiveQuestion> _interactiveQuestionRepository;
       private readonly IDataRepository<InteractiveOptions> _interactiveOptionsRepository;
       private readonly IDataRepository<InteractiveResult> _interactiveResultRepository;
       List<int> list = new List<int>();

       public InteractiveRepository(IDataRepository<Content> contentRepository, IDataRepository<User> userRepository, IDataRepository<ELearningSection> eLearningSelectionRepository, IDataRepository<ELearningLecture> eLearningLectureRepository, IDataRepository<ELearningSectionPage> eLearningSectionPageRepository, IDataRepository<InteractiveQuestion> interactiveQuestionRepository, IDataRepository<InteractiveOptions> interactiveOptionsRepository, IDataRepository<InteractiveResult> interactiveResultRepository)
       {
           _contentRepository = contentRepository;
           _userRepository = userRepository;
           _eLearningSelectionRepository = eLearningSelectionRepository;
           _eLearningLectureRepository = eLearningLectureRepository;
           _eLearningSectionPageRepository = eLearningSectionPageRepository;
           _interactiveQuestionRepository = interactiveQuestionRepository;
           _interactiveOptionsRepository = interactiveOptionsRepository;
           _interactiveResultRepository = interactiveResultRepository;
       }
       public void Dispose()
       {
          _contentRepository.Dispose();
          _eLearningSelectionRepository.Dispose()  ;
          _eLearningLectureRepository.Dispose() ;
          _eLearningSectionPageRepository.Dispose() ;
          _interactiveQuestionRepository.Dispose() ;
           _interactiveResultRepository.Dispose();
       }


       /// <summary>
       /// get all intrective questions
       /// </summary>
       /// <param name="id">id of contentid</param>
       /// <returns>object of InteractiveQuestion .</returns>
       public IEnumerable<ELearningSection> GetAllInteractiveQuestions (int id,int userId)
       {
           try
           {
                var currentContent = _contentRepository.FirstOrDefault(x=>x.Id == id && !x.IsDeleted);
              var currentLecture = _eLearningLectureRepository.FirstOrDefault(x => x.ContentId == currentContent.Id).Id;
               var currentSection =
                   _eLearningSelectionRepository.Fetch(x => x.ELearningLectureId == currentLecture).ToList();
               var sectionCollection = new List<ELearningSection>();
               foreach (var sectionitem in currentSection)
               {
                   var elearningSection = new ELearningSection();
                   var sectionPageCollection = new List<ELearningSectionPage>();
                   var sectionpage = _eLearningSectionPageRepository.Fetch(x => x.ELearningSectionId == sectionitem.Id).ToList();
                   foreach (var sectionPageItem in sectionpage)
                   {
                       var eLearningSectionPage = new ELearningSectionPage();
                       var questionCollection = new List<InteractiveQuestion >();
                       var InteractiveQuestion  = _interactiveQuestionRepository.Fetch(x => x.ELearningSectionPageId == sectionPageItem.Id).ToList();
                       foreach (var questionitem in InteractiveQuestion )
                       {
                           var InteractiveResult = _interactiveResultRepository.FirstOrDefault(x => x.InteractiveQuestionId == questionitem.Id && x.UserId == userId);
                           if (InteractiveResult != null)
                           {
                               questionitem.AlreadyExits = true;
                           }
                           else
                           {
                               questionitem.AlreadyExits = false;
                           }
                           questionCollection.AddRange(InteractiveQuestion );
                       }
                       eLearningSectionPage.InteractiveQuestions  = questionCollection;
                       sectionPageCollection.Add(eLearningSectionPage);
                   }
                   elearningSection.ELearningSectionPage = sectionPageCollection;
                   sectionCollection.Add(elearningSection);

               }
              return sectionCollection;
               
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
          
       }

       /// <summary>
       /// 
       /// </summary>
       /// <param name="id">id of intrectiveoption id</param>
       /// <param name="currentUserName">name of currentuser</param>
       /// <returns>object of InteractiveResultAC</returns>
       public InteractiveResultAc SaveInteractiveResult(int id, string currentUserName)
       {
           try
           {
              var currentIntrectiveOption = _interactiveOptionsRepository.FirstOrDefault(x=>x.Id == id);
              var user = _userRepository.Fetch(x => x.UserName == currentUserName).First();
                   var currentResult =
                       _interactiveResultRepository.FirstOrDefault(x => x.InteractiveQuestionId == currentIntrectiveOption.InteractiveQuestionId && x.UserId == user.Id);
                   var InteractiveResultAc = new InteractiveResultAc();
                   if (currentResult != null)
                   {
                       InteractiveResultAc.UserResponse = true;
                   }
                   else
                   {

                       var InteractiveResult = new InteractiveResult
                       {
                           UserId = user.Id,
                           InteractiveQuestionId = currentIntrectiveOption.InteractiveQuestionId,
                           InteractiveOptionId = currentIntrectiveOption.Id,
                           CreatedDateTime = DateTime.UtcNow,
                       };
                       _interactiveResultRepository.Add(InteractiveResult);
                       _interactiveResultRepository.SaveChanges();

                       InteractiveResultAc.UserResponse = false;

                   }
                   return InteractiveResultAc;
              }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }
       /// <summary>
       /// get intrective result.
       /// </summary>
       /// <param name="id">Id of contentid.</param>
       /// <returns>object of result.</returns>
       public List<ResultsAc> GetAllInteractiveResult(int id)
       {
           try
           {
               var currentContent = _contentRepository.FirstOrDefault(x=>x.Id == id);
               
                   var currentLecture = _eLearningLectureRepository.FirstOrDefault(x => x.ContentId == currentContent.Id).Id;
                   var currentSection =
                       _eLearningSelectionRepository.FirstOrDefault(x => x.ELearningLectureId == currentLecture).Id;
                   var currentSectionPage =
                       _eLearningSectionPageRepository.FirstOrDefault(x => x.ELearningSectionId == currentSection).Id;
                   var currentInteractiveQuestion  =
                       _interactiveQuestionRepository.FirstOrDefault(x => x.ELearningSectionPageId == currentSectionPage).Id;
                   var currentInteractiveResults =
                       _interactiveResultRepository.Fetch(x => x.InteractiveQuestionId == currentInteractiveQuestion ).ToList();
                   var resultCollection = new List<ResultsAc>();
                   foreach (var a in currentInteractiveResults)
                   {
                       var currentInteractiveResult = _interactiveResultRepository.GetById(a.Id);
                       var currentUserName = _userRepository.GetById(a.UserId);
                       var questionText =
                     _interactiveQuestionRepository.FirstOrDefault(
                         x => x.Id == currentInteractiveResult.InteractiveQuestionId).Text;
                       list = new List<int>();
                       var tree = new TreeNode
                       {
                           id = currentInteractiveQuestion ,
                           name = questionText,
                           children = ParentTreeNodes(currentInteractiveResult.InteractiveOptionId)
                       };
                       var resultAc = new ResultsAc();
                       resultAc.QuestionId = currentInteractiveQuestion ;
                       resultAc.QuestionText = questionText;
                       resultAc.UserName = currentUserName.UserName;
                       var optionResultCollection = new List<InteractiveOptionsAc>();
                       list.Reverse();
                       foreach (var i in list)
                       {
                           var optionAc = new InteractiveOptionsAc();

                           var sss = _interactiveOptionsRepository.GetById(i);
                           optionAc.IntrectiveOptionId = sss.Id;
                           optionAc.Option = sss.Option;
                           optionResultCollection.Add(optionAc);

                       }
                       resultAc.OptionAc = optionResultCollection;
                       resultCollection.Add(resultAc);
                   }
                   return resultCollection;
               
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       
       /// <summary>
       /// Get All Intrective Question By Id
       /// </summary>
       /// <param name="id">id of content id</param>
       /// <returns>object of intrective question.</returns>
       public List<ELearningSection> GetAllInteractiveQuestion (int id)
       {
           try
           {

               var currentContent = _contentRepository.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
               var currentLecture = _eLearningLectureRepository.FirstOrDefault(x => x.ContentId == currentContent.Id).Id;
               var currentSection =
                   _eLearningSelectionRepository.Fetch(x => x.ELearningLectureId == currentLecture).ToList();
               var sectionCollection = new List<ELearningSection>();
               foreach (var sectionitem in currentSection)
               {
                   var elearningSection = new ELearningSection();
                   var sectionPageCollection = new List<ELearningSectionPage>();
                   var sectionpage = _eLearningSectionPageRepository.Fetch(x => x.ELearningSectionId == sectionitem.Id).ToList();
                   foreach (var sectionPageItem in sectionpage)
                   {
                       var eLearningSectionPage = new ELearningSectionPage();
                       var questionCollection = new List<InteractiveQuestion >();
                       var InteractiveQuestion  = _interactiveQuestionRepository.Fetch(x => x.ELearningSectionPageId == sectionPageItem.Id).ToList();
                       foreach (var questionitem in InteractiveQuestion )
                       {
                           var InteractiveResult = _interactiveResultRepository.FirstOrDefault(x => x.InteractiveQuestionId == questionitem.Id);
                           if (InteractiveResult != null)
                           {
                               questionitem.AlreadyExits = true;
                           }
                           else
                           {
                               questionitem.AlreadyExits = false;
                           }
                           questionCollection.AddRange(InteractiveQuestion );
                       }
                       eLearningSectionPage.InteractiveQuestions= questionCollection;
                       sectionPageCollection.Add(eLearningSectionPage);
                   }
                   elearningSection.ELearningSectionPage = sectionPageCollection;
                   sectionCollection.Add(elearningSection);

               }
     return sectionCollection;
               
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
           
       }
       
       /// <summary>
       /// get intrective question by question id.
       /// </summary>
       /// <param name="id">id of InteractiveQuestion  id.</param>
       /// <returns>object of resultAC.</returns>
       public List<ResultsAc> GetInteractiveQuestionById(int id)
       {
           try
           {
              var currentResult = _interactiveQuestionRepository.FirstOrDefault(x=>x.Id == id);
               var InteractiveResult =
             _interactiveResultRepository.Fetch(x => x.InteractiveQuestionId == currentResult.Id).ToList();
                   var resultCollection = new List<ResultsAc>();


                   foreach (var a in InteractiveResult)
                   {
                       var currentInteractiveResult = _interactiveResultRepository.GetById(a.Id);
                       var currentUserName = _userRepository.GetById(a.UserId);

                       list = new List<int>();
                       var tree = new TreeNode
                       {
                           children = ParentTreeNodes(currentInteractiveResult.InteractiveOptionId)
                       };
                       var resultAc = new ResultsAc();
                       resultAc.UserName = currentUserName.UserName;
                       resultAc.QuestionId = a.InteractiveQuestionId;
                       var optionResultCollection = new List<InteractiveOptionsAc>();
                       list.Reverse();
                       foreach (var i in list)
                       {
                           var optionAc = new InteractiveOptionsAc();
                           var getIntrectiveOption = _interactiveOptionsRepository.GetById(i);
                           optionAc.IntrectiveOptionId = getIntrectiveOption.Id;
                           optionAc.Option = getIntrectiveOption.Option;
                           if (getIntrectiveOption.IsCorrect == true)
                           {
                               resultAc.IsCorrect = true;
                           }
                           optionAc.IsCorrect = getIntrectiveOption.IsCorrect;
                           optionResultCollection.Add(optionAc);

                       }
                       resultAc.OptionAc = optionResultCollection;
                       resultCollection.Add(resultAc);
                   }
                   return resultCollection;
              
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
           
       }

       /// <summary>
       /// get all user.
       /// </summary>
       /// <returns>object of user</returns>
       public List<User> GetAllUser()
       {
          try
           {
               var getAllUser = _userRepository.Fetch(x => !x.IsDeleted).ToList();
               return getAllUser;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       /// <summary>
       /// get intrective result by user id.
       /// </summary>
       /// <param name="id">id of InteractiveResult id</param>
       /// <returns>object of resultAC.</returns>
       public List<ResultsAc> GetInteractiveResultByUserId(int id)
       {
           try
           {
               var currentresult = _interactiveResultRepository.FirstOrDefault(x => x.UserId == id);
             var getInteractiveResult = _interactiveResultRepository.Fetch(x => x.UserId == currentresult.UserId).ToList();
                   var resultCollection = new List<ResultsAc>();
                   foreach (var a in getInteractiveResult)
                   {
                       var currentInteractiveResult = _interactiveResultRepository.GetById(a.Id);
                       var currentInteractiveQuestion  = _interactiveQuestionRepository.FirstOrDefault(
                         x => x.Id == currentInteractiveResult.InteractiveQuestionId).Id;
                       var questionText =
                     _interactiveQuestionRepository.FirstOrDefault(
                         x => x.Id == currentInteractiveResult.InteractiveQuestionId).Text;
                       list = new List<int>();
                       var tree = new TreeNode
                       {
                           id = currentInteractiveQuestion ,
                           name = questionText,
                           children = ParentTreeNodes(currentInteractiveResult.InteractiveOptionId)
                       };
                       var resultAc = new ResultsAc();
                       resultAc.QuestionId = currentInteractiveQuestion ;
                       resultAc.QuestionText = questionText;
                       var optionResultCollection = new List<InteractiveOptionsAc>();
                       list.Reverse();
                       foreach (var i in list)
                       {
                           var optionAc = new InteractiveOptionsAc();

                           var getIntrectiveOption = _interactiveOptionsRepository.GetById(i);
                           optionAc.IntrectiveOptionId = getIntrectiveOption.Id;
                           if (getIntrectiveOption.IsCorrect == true)
                           {
                               resultAc.IsCorrect = getIntrectiveOption.IsCorrect;
                           }
                           optionAc.Option = getIntrectiveOption.Option;
                           optionResultCollection.Add(optionAc);

                       }
                       resultAc.OptionAc = optionResultCollection;
                       resultCollection.Add(resultAc);
                   }
                   return resultCollection;
               
              
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       /// <summary>
       /// 
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       public List<TreeNode> ParentTreeNodes(int id)
       {
           try
           {
             
               var childrens = new List<TreeNode>();
               var children = new List<TreeNode>();
               var ss = _interactiveOptionsRepository.Fetch(x => x.Id == id).ToList();
               if (id != 0)
               {
                   list.Add(id);
                   foreach (var child in ss)
                   {
                       children.Add(new TreeNode
                       {
                           children = ParentTreeNodes(child.ParentInteractiveOptionId),
                           id = child.Id,
                           //name = child.Option,
                       });
                   }       
                  return children;
               }
               else
               {
                   return null;
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

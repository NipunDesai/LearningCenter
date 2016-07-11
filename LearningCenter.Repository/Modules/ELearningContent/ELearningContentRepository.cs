using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Repository.Modules.ELearningContent
{
   public class ELearningContentRepository :IELearningContentRepository
   {
       private readonly IDataRepository<Content> _contentRepository;
       private readonly IDataRepository<User> _userRepository;
       private readonly IDataRepository<ELearningSection> _eLearningSelectionRepository;
       private readonly IDataRepository<ELearningLecture> _eLearningLectureRepository;
       public ELearningContentRepository(IDataRepository<Content> contentRepository, IDataRepository<User> userRepository, IDataRepository<ELearningSection> eLearningSelectionRepository, IDataRepository<ELearningLecture> eLearningLectureRepository)
       {
           _contentRepository = contentRepository;
           _userRepository = userRepository;
           _eLearningSelectionRepository = eLearningSelectionRepository;
           _eLearningLectureRepository = eLearningLectureRepository;
       }
       public void Dispose()
       {
         _contentRepository.Dispose();
       }

       /// <summary>
       /// Get ELearningContent List
       /// </summary>
       /// <returns>object of content</returns>
       public IEnumerable<Content> GetELearningContentList()
       {
           try
           {
               var contentList = _contentRepository.Fetch(x => !x.IsDeleted && x.IsLaunch).ToList();
               return contentList.OrderByDescending(x=>x.Id);
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
          
       }

       /// <summary>
       /// Update ELearning Content Rate
       /// </summary>
       /// <param name="content">content information</param>
       /// <returns>object of content</returns>
       public Content UpdateELearningContentRate(Content content)
       {
           try
           {
               var getContentById = _contentRepository.GetById(content.Id);
               var avarageRate = ((content.Rate + getContentById.Rate)/2);
            
               getContentById.Rate = avarageRate;
               content.Rate = getContentById.Rate;
               _contentRepository.Update(getContentById);
               _contentRepository.SaveChanges();
               return content;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       /// <summary>
       /// view content creator details
       /// </summary>
       /// <param name="id">Id of userid</param>
       /// <returns>object of user</returns>
       public List<User> ViewCreatorDetails(int id)
       {
           try
           {
               var currentUser = _userRepository.FirstOrDefault(x => x.Id == id);
              
                   var userList = new List<User>();
                   var user = _userRepository.Fetch(x => x.Id == currentUser.Id).ToList();
                   userList.AddRange(user);
                   return userList;
               
              
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
         
       }

       /// <summary>
       /// View Content Deatil by contentId
       /// </summary>
       /// <param name="id">id of contentid</param>
       /// <returns>object of content</returns>
       public List<Content> ViewContentDetail(int id)
       {
           try
           {
               
               var currentContent = _contentRepository.FirstOrDefault(x=>x.Id == id && !x.IsDeleted);
              
                   var contentList = new List<Content>();
                   var content = _contentRepository.Fetch(x => x.Id == currentContent.Id).ToList();
                   contentList.AddRange(content);

                   GlobalUtil.LogInfo("View ContentDetail call", this.GetType());
               return contentList;
              
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
         
       }

       /// <summary>
       /// View ELearningSectionPage Detail. 
       /// </summary>
       /// <param name="id">id of sectionid</param>
       /// <returns>object of section</returns>
       public List<ELearningSection> ELearningSectionDetail(int id)
       {
           try
           {
               var currentSection = _eLearningSelectionRepository.FirstOrDefault(x=>x.Id == id);
               
                   var eLarningSectionList = new List<ELearningSection>();
                   var elarningSection = _eLearningSelectionRepository.Fetch(x => x.Id == currentSection.Id).ToList();

                   eLarningSectionList.AddRange(elarningSection);
                   return eLarningSectionList;
               
               
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
          
       }

       /// <summary>
       /// Get ELearning Contnet by Id
       /// </summary>
       /// <param name="id">id of content id</param>
       /// <returns>object of content</returns>
       public List<Content> GetELearningContentById(int id)
       {
       try
           {
               //var currentContent = _contentRepository.GetById(id);
               var currentContent = _contentRepository.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
             
                   var contentList = new List<Content>();
                   var content = _contentRepository.Fetch(x => x.Id == currentContent.Id).ToList();

                   contentList.AddRange(content);
                   return contentList;
               
              
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw ;
           }
          
       }

       /// <summary>
       /// Delete Elearning content by id
       /// </summary>
       /// <param name="id">Id of content id</param>
       public void DeleteELearningContentById(int id)
       {
           try
           {
               var content = _contentRepository.FirstOrDefault(x => x.Id == id);
               if (content != null)
               {
                   content.IsDeleted = true;
                   _contentRepository.Update(content);
                   _contentRepository.SaveChanges();
               }
               else
               {
                   return;
               }
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
           
       }

       /// <summary>
       /// Get Elearning content details by lecture id 
       /// </summary>
       /// <param name="id">Id of Lectureid</param>
       /// <returns>object of elearning lecture.</returns>
       public List<Content> GetELearningLectureById(int id)
       {
           try
           {
               var currentContent = _contentRepository.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
               var eLearningContentList = new List<Content>();
               var eLearningContent = _contentRepository.Fetch(x => x.Id == currentContent.Id).ToList();
               eLearningContentList.AddRange(eLearningContent);
               return eLearningContentList;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }

       }

       /// <summary>
       /// view eLearning section detail by section id.
       /// </summary>
       /// <param name="id">Id of section id.</param>
       /// <returns>object of elearning section</returns>
       public List<ELearningSection> ViewELearningSectionById(int id)
       {
           try
           {
               var currentSection = _eLearningSelectionRepository.FirstOrDefault(x=>x.Id == id && !x.IsDeleted);
               
                   var eLearningSectionList = new List<ELearningSection>();
                   var elearningSection = _eLearningSelectionRepository.Fetch(x => x.Id == currentSection.Id).ToList();
                   eLearningSectionList.AddRange(elearningSection);
                   return eLearningSectionList;
               
             
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
          
       }

       public List<Content> GetAllMyContentList()
       {
           try
           {
               var currentUserName = HttpContext.Current.User.Identity.Name;
               var user = _userRepository.FirstOrDefault(x => x.Email == currentUserName);

               var contentList = _contentRepository.Fetch(x=> x.UserId == user.Id && !x.IsDeleted).ToList();
               return contentList;
           }
           catch (Exception ex)
           {

               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       public void SaveUserDetails(User user)
       {
           try
           {
               _userRepository.Add(user);
               _userRepository.SaveChanges();
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex,this);
               throw;
           }
       }
   }
}

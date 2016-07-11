using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models;

namespace LearningCenter.Repository.Modules.ELearningContent
{
   public interface IELearningContentRepository : IDisposable
   {
       /// <summary>
       /// Get ELearning Content List
       /// </summary>
       /// <returns></returns>
       IEnumerable<Content> GetELearningContentList();

       /// <summary>
       /// Update ELearning Content Rate
       /// </summary>
       /// <param name="content"></param>
       /// <returns></returns>
       Content UpdateELearningContentRate(Content content);

       /// <summary>
       /// view content Creator details.
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<User> ViewCreatorDetails(int id);

       /// <summary>
       /// View ELearning Content in details
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<Content> ViewContentDetail(int id);

       /// <summary>
       /// View ELearningSectionPage Details by ELearningSectionId
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<ELearningSection> ELearningSectionDetail(int id);

       /// <summary>
       /// Get ELearning Contnet by Id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<Content> GetELearningContentById(int id);

       /// <summary>
       /// Delete Elearning Content By Id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       void DeleteELearningContentById(int id);

       /// <summary>
       /// Get ELearningLecture By Id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<Content> GetELearningLectureById(int id);

       /// <summary>
       /// view ELearning Section By Id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<ELearningSection> ViewELearningSectionById(int id);

       List<Content> GetAllMyContentList();

       void SaveUserDetails(User user);
   }
}

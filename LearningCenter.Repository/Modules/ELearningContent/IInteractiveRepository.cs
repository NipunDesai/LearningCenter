using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.ApplicationClasses;

namespace LearningCenter.Repository.Modules.ELearningContent
{
    public interface IInteractiveRepository : IDisposable
   {
       /// <summary>
       /// get all intrective question.
       /// </summary>
       /// <returns></returns>
       IEnumerable<ELearningSection> GetAllInteractiveQuestions(int id, int userId);

       /// <summary>
       /// Save Intrective Result.
       /// </summary>
       /// <param name="id"></param>
       /// <param name="currentUserName"></param>
       InteractiveResultAc SaveInteractiveResult(int id, string currentUserName);

       /// <summary>
       /// get intrective result by content id.
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<ResultsAc> GetAllInteractiveResult(int id);

       /// <summary>
       /// Get User Intrective Result.
       /// </summary>
       /// <returns></returns>
     //  List<ResultsAc> CurrentUserIntrectiveResult(string currentUserName);

       /// <summary>
       /// Get All Intrective Question.
       /// </summary>
       /// <returns></returns>
       List<ELearningSection> GetAllInteractiveQuestion(int id);

       /// <summary>
       /// get intrective question by question id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<ResultsAc> GetInteractiveQuestionById(int id);

       /// <summary>
       /// Get all User.
       /// </summary>
       /// <returns></returns>
       List<User> GetAllUser();

       /// <summary>
       /// get all intrective result by user id.
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
       List<ResultsAc> GetInteractiveResultByUserId(int id);
   }
}

using Autofac;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Migrations;
using LearningCenter.DomainModel.Models;
using LearningCenter.DomainModel.Models.Account;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.Constants;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Admin.App_Start
{
    public class DatabaseConfig 
    {

       
        /// <summary>
        /// Initializes the database.
        /// </summary>
        public static void Initialize(IComponentContext componentContext)
        {
            try
            {
                Database.SetInitializer(new MigrateDatabaseToLatestVersion<LearningCenterDataContext, Configuration>("LearningCenterDataContext"));
                using (var LearningCenterDataContext = componentContext.Resolve<DbContext>())
                {
                    if (!LearningCenterDataContext.Database.Exists())
                    {
                        LearningCenterDataContext.Database.Initialize(false);

                    }
                }


                //if (!identityManager.RoleExists(StringConstants.Individual))
                //{
                //    identityManager.CreateRole(StringConstants.Individual);
                //}
                //if (!identityManager.RoleExists(StringConstants.Company))
                //{
                //    identityManager.CreateRole(StringConstants.Company);
                //}

                #region "Initialize Default Admin User"
                InitializeDefaultAdministrator();

                #endregion
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, typeof(DatabaseConfig));
                throw;
            }
        }

        /// <summary>
        /// Initialize default admin user
        /// </summary>
        private static void InitializeDefaultAdministrator()
        {
            try
            {

                //add roles 
                var identityManager = new IdentityManager();
                if (!identityManager.RoleExists(StringConstants.Admin))
                {
                    identityManager.CreateRole(StringConstants.Admin);
                }
               
                //check if admin user is exist or not 

                if (identityManager.FindByEmail(AppSettingsUtil.AdminUserName) == null)
                {
                    var eLearningUser = new ELearningUser
                    {
                        Email = AppSettingsUtil.AdminUserName,
                        UserName = AppSettingsUtil.AdminUserName


                    };

                    //create admin user
                    identityManager.Create(eLearningUser, AppSettingsUtil.AdminPassword);
                    identityManager.AddUserToRole(eLearningUser.Id, StringConstants.Admin);
                    // }
                    
                    //save admin user entry in user table
                    var currentYear = DateTime.Now.Year;
                    var actualYear = currentYear - 100;
                    DateTime actualDate = new DateTime(actualYear, 1, 1);
                    var userInfo = new LearningCenter.DomainModel.Models.User
                    {
                        FirstName = "LearningCenter",
                        LastName = "Admin",
                        Email = eLearningUser.Email,
                        UserName = eLearningUser.Email,
                        IsDeleted = false,
                        CreatedDateTime = System.DateTime.UtcNow,
                        DateOfBirth = actualDate

                    };
                      LearningCenterDataContext db = new LearningCenterDataContext();
                      db.User.Add(userInfo);
                      db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, typeof(DatabaseConfig));
                throw;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Autofac;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Migrations;
using LearningCenter.DomainModel.Models.Account;
using LearningCenter.Utility.Constants;


namespace LearningCenter.Web.App_Start
{
    public class DatabaseConfig
    {
        /// <summary>
        /// Initializes the database.
        /// </summary>
        public static void Initialize(IComponentContext componentContext)
        {

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<LearningCenterDataContext, Configuration>("LearningCenterDataContext"));
            using (var LearningCenterDataContext = componentContext.Resolve<DbContext>())
            {
                LearningCenterDataContext.Database.Initialize(false);

            }
            //add roles 
            var identityManager = new IdentityManager();
            if (!identityManager.RoleExists(StringConstants.Admin))
            {
                identityManager.CreateRole(StringConstants.Admin);
            }


            if (!identityManager.RoleExists(StringConstants.Creator))
            {
                identityManager.CreateRole(StringConstants.Creator);
            }
            if (!identityManager.RoleExists(StringConstants.Buyer))
            {
                identityManager.CreateRole(StringConstants.Buyer);
            }
                


        }
    }
}
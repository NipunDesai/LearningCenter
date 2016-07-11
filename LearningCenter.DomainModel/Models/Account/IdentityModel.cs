using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.DataContext;

namespace LearningCenter.DomainModel.Models.Account
{
    #region RoleManager
    public class IdentityManager
    {

        public IdentityResult Create(ELearningUser user, string password)
        {
            var userManager = new UserManager<ELearningUser>(
            new UserStore<ELearningUser>(new LearningCenterDataContext()));
            return userManager.Create(user, password);
        }

        public ELearningUser FindByEmail(string userName)
        {
            var userManager = new UserManager<ELearningUser>(
              new UserStore<ELearningUser>(new LearningCenterDataContext()));
            return userManager.FindByEmail(userName);
        }


        public bool RoleExists(string name)
        {
            var roleManager = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(new LearningCenterDataContext()));
            return roleManager.RoleExists(name);
        }


        public bool CreateRole(string name)
        {
            var roleManager = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(new LearningCenterDataContext()));
            var idResult = roleManager.Create(new IdentityRole(name));
            return idResult.Succeeded;
        }

        // Returns true if the user is in the specified role
        public bool IsUserInRole(string userId, string roleName)
        {
            var userManager = new UserManager<ELearningUser>(
                new UserStore<ELearningUser>(new LearningCenterDataContext()));
            return userManager.IsInRole(userId, roleName);
        }


        public bool AddUserToRole(string userId, string roleName)
        {
            var userManager = new UserManager<ELearningUser>(
                new UserStore<ELearningUser>(new LearningCenterDataContext()));
            var idResult = userManager.AddToRole(userId, roleName);
            return idResult.Succeeded;
        }

        public string FindUserRole(string userId)
        {
            var userManager = new UserManager<ELearningUser>(
                 new UserStore<ELearningUser>(new LearningCenterDataContext()));
            var role = userManager.GetRoles(userId);
            return role[0];
        }
        public void ClearUserRoles(string userId)
        {
            var userManager = new UserManager<ELearningUser>(
                new UserStore<ELearningUser>(new LearningCenterDataContext()));
            var user = userManager.FindById(userId);
            var currentRoles = new List<IdentityUserRole>();
            currentRoles.AddRange(user.Roles);
            foreach (var role in currentRoles)
            {
                userManager.RemoveFromRole(userId, role.RoleId);
            }
        }


    }

    #endregion
}

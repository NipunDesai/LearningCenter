using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class UserAc
    {
       public int UserId { get; set; }
       public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePicGuid { get; set; }
        public string Age { get; set; }
        public string Education { get; set; }
       // public string Experience { get; set; }
        public string JobTitle { get; set; }

        public string CompanyName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Institute { get; set; }
        public string Gender { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }
        public bool isCollapsed { get; set; }
        public List<ResultsAc> ResultAc { get; set; }
       
    }
}

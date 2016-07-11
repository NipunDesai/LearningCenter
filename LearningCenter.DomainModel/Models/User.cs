using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class User : LearningCenterBase
    {
       [MaxLength(256)]
       public string UserName { get; set; }
       [MaxLength(256)]
       public string Email	{ get; set; }
       [MaxLength(50)]
       public string FirstName	{ get; set; }
       [MaxLength(50)]
       public string LastName	{ get; set; }
	   public string ProfilePicName { get; set; }		
       public string ProfilePicGuid { get; set; }
      
       public string Education { get; set; }
       public string Experience { get; set; }
     
       public string JobTitle { get; set; }
       [MaxLength(100)]
       public string CompanyName { get; set; }

       public string WorkInfo { get; set; }
       public string Summary { get; set; }
       public string Skils { get; set; }
       public string Location { get; set; }
       //public string Country { get; set; }
       public string Institute { get; set; }		
       public string Gender { get; set; }

       public string AboutMe { get; set; }

       public DateTime DateOfBirth { get; set; }

        [MaxLength(256)]
        public string FacebookLink { get; set; }
        [MaxLength(256)]
        public string TwitterLink { get; set; }
       //if user profile is created than this flage is true 
       public bool IsProfileCreated { get; set; }

       public string LoginProvider { get; set; }
      public virtual ICollection<ContentComment> ContentComment { get; set; }

      //public virtual ICollection<Country> CountryCollection { get; set; } 
    }
}

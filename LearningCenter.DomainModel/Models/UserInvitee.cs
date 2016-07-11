using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;
using LearningCenter.Utility.Constants;

namespace LearningCenter.DomainModel.Models
{
    public class UserInvitee : LearningCenterBase
    {
        [MaxLength(256)]
       // [Required(ErrorMessage = MessageResourceConstants.NameRequired)]
        public string Name { get; set; }
      //  [Required(ErrorMessage = MessageResourceConstants.EmailRequired)]
     //   [EmailAddress(ErrorMessage = MessageResourceConstants.InvalidEmail)]
        [StringLength(256)]
        public string Email { get; set; }

        public string Token { get; set; }

        public bool IsRegistered { get; set; }

    }
}

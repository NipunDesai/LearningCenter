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
    //in this table per content invitee email id is stored
    public class InviteeUsers :LearningCenterBase
    {
        
        public int ContentId { get; set; }
        public string Email { get; set; }
         [ForeignKey("ContentId ")]
        public virtual Content Content { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class ELearningContent:LearningCenterBase
    {
     public int ContentId { get; set; }
    public int ELearningContentOption { get; set; }
    public string MaxInviteeLimit	{ get; set; }
    public bool IsPublic { get; set; }

    [ForeignKey("ContentId")]
    public virtual Content Content { get; set; }

   

    }
}

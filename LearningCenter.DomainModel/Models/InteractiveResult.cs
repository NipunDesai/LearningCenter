using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class InteractiveResult : LearningCenterBase
    {
       public int UserId { get; set; }
       public int InteractiveQuestionId { get; set; }
       public int InteractiveOptionId { get; set; }

       [ForeignKey("UserId")]
       public virtual User User { get; set; }

       [ForeignKey("InteractiveQuestionId")]
       public virtual InteractiveQuestion IntrectiveQuestion { get; set; }

       [ForeignKey("InteractiveOptionId")]
       public virtual InteractiveOptions InteractiveOptions { get; set; }

    }
}

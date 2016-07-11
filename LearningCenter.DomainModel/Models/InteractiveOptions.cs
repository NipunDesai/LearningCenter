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
    public class InteractiveOptions : LearningCenterBase
    {
        public int InteractiveQuestionId { get; set; }
         [MaxLength(1000)]
       public string Option { get; set; }
       public int ParentInteractiveOptionId { get; set; }
       public bool IsCorrect { get; set; }

       [ForeignKey("InteractiveQuestionId")]
       public virtual InteractiveQuestion InteractiveQuestion { get; set; }
 

    }
}

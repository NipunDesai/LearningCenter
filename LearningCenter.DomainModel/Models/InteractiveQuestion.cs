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
    public class InteractiveQuestion : LearningCenterBase
    {
       public int ELearningSectionPageId { get; set; }
         [MaxLength(1000)]
       public string Text { get; set; }
       [ForeignKey("ELearningSectionPageId")]
       public virtual ELearningSectionPage ELearningSectionPage { get; set; }
       public virtual ICollection<InteractiveOptions> InteractiveOptions { get; set; }
       public bool AlreadyExits { get; set; }

    }
}

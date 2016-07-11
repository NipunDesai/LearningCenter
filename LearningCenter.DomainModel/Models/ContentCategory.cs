using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
   public class ContentCategory :LearningCenterBase
    {
     public int ContentId { get; set; }
     public int CategoryId { get; set; }


     [ForeignKey("ContentId")]
     public virtual Content Content { get; set; }

     [ForeignKey("CategoryId")]
     public virtual Category Category { get; set; }

    }
}

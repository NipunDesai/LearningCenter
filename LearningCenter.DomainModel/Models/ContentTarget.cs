using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class ContentTarget : LearningCenterBase
    {
        public int ContentId { get; set; }
        public int TargetId { get; set; }


        [ForeignKey("ContentId")]
        public virtual Content Content { get; set; }

        [ForeignKey("TargetId")]
        public virtual Target  Target{ get; set; }
    }
}

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
    public class ELearningLecture : LearningCenterBase
    {
        public int ContentId { get; set; }

        [MaxLength(500)]
        public string Title { get; set; }

        [ForeignKey("ContentId")]
        public virtual Content Content { get; set; }

        public virtual ICollection<ELearningSection> ELearningSection { get; set; } 
    }
}

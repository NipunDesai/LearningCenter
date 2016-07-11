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
    public class ELearningSection : LearningCenterBase
    {
        public int ELearningLectureId { get; set; }

        [MaxLength(500)]
        public string Title { get; set; }
        [ForeignKey("ELearningLectureId")]
        public virtual ELearningLecture ELearningLecture { get; set; }
        public virtual ICollection<ELearningSectionPage> ELearningSectionPage { get; set; }

  
    }
}

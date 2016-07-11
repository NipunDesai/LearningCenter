using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class ContentComment :LearningCenterBase
    {
        public int UserId { get; set; }	
        public int ELearningContentId { get; set; }
        public string CommentText { get; set; }

        [ForeignKey("ELearningContentId")]
        public virtual ELearningContent ELearningContent { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}

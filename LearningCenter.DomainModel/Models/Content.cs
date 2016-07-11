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
    public class Content : LearningCenterBase
    {
        public int ContentTypeId { get; set; }
        public int LanguageId { get; set; }
        
        public int UserId { get; set; }

        [MaxLength(500)]
        public string Title { get; set; }
        public string Description { get; set; }
         [MaxLength(200)]
        public string ContentImage { get; set; }
         [MaxLength(200)]
        public string ContentImageGuid { get; set; }
        [MaxLength(150)]
        public string CreatedOn { get; set; }
        public DateTime LaunchStartTime { get; set; }
        public DateTime LaunchEndTime { get; set; }
        public int ContentViews { get; set; }
        //enum whether content is its own or external link

        public int TotalInvitee { get; set; }
        public bool Status { get; set; }
        public int Rate { get; set; }
        [NotMapped]
        public string DisplayDateTime { get; set; }
        [ForeignKey("ContentTypeId")]
        public virtual ContentType ContentType { get; set; }
        [ForeignKey("LanguageId")]
        public virtual Language Language { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public virtual ICollection<ELearningContent> ELearningContent { get; set; }
        public bool IsLaunch { get; set; }
        public virtual ICollection<Category> CategoryCollection { get; set; }
        public virtual ICollection<Tags> TagCollection { get; set; }
        public virtual ICollection<Target> TargetCollection { get; set; }
        public virtual List<Category> CategoryList { get; set; }
        public virtual List<Tags> TagList { get; set; }
        public virtual List<Target> TargetList { get; set; }
        public virtual ICollection<ELearningLecture> ELearningLecture { get; set; }

    }
}

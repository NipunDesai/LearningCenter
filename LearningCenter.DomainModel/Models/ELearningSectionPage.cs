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
    public class ELearningSectionPage : LearningCenterBase
    {
        public int ELearningSectionId { get; set; }
          [MaxLength(500)]
        public string TopicName { get; set; }
         [MaxLength(200)]
        public string SectionContentFileName { get; set; }
         [MaxLength(200)]
        public string SectionContentFileGuid { get; set; }
        public string SectionContentData { get; set; }
         [MaxLength(200)]
        public string SectionContentType { get; set; }

         [MaxLength(200)]
        public string YouTubeLink { get; set; }

         [MaxLength(200)]
        public string EmbeddedYouTubeLink { get; set; }
        public bool IsInteractive { get; set; }
        [ForeignKey("ELearningSectionId")]
        public virtual ELearningSection ELearningSection { get; set; }

        public virtual ICollection<InteractiveQuestion> InteractiveQuestions { get; set; } 

        }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
    public class ELearningSectionPageAc
    {
        public int ELearningSectionPageId { get; set; }
        public int ELearningSectionId { get; set; }
        public string SectionContentFileName { get; set; }
        public string SectionContentFileGuid { get; set; }
        public string SectionContentType { get; set; }
        public bool IsInteractive { get; set; }
        public string SectionContentData { get; set; }
        public string TopicName { get; set; }
        public bool UploadVideoShow { get; set; }
        public string YouTubeLink { get; set; }
        public string YouTubeUrl { get; set; }
        public string EmbeddedYouTubeLink { get; set; }
    }
}

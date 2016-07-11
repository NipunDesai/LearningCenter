using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class TextEditorContentAc
    {
       public int ELearningSectionId { get; set; }

       public int ContentId { get; set; }

       public int ELearningSectionPageId { get; set; }

       public string Data { get; set; }

       public string SectionContentType { get; set; }

       public string TopicName { get; set; }
    }
}

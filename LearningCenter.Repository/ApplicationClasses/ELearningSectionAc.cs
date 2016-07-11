using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class ELearningSectionAc
    {
       public int ELearningSectionId { get; set; }
        public int ELearningLectureId { get; set; }
       public string Title { get; set; }
       public int Width { get; set; }
       public List<ELearningSectionPageAc> ELearningSectionPage { get; set; } 
    }
}

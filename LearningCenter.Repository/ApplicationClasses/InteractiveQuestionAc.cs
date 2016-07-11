using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
    public class InteractiveQuestionAc
    {
        public int ELearningSectionPageId { get; set; }
        public string Option { get; set; }
        public int InteractiveQuestionId { get; set; }
        public List<InteractiveOptionsAc> InteractiveOptions { get; set; }

        public List<ResultsAc> ResultAc { get; set; }
        public string ContentTitle { get; set; }
        public bool isCollapsed { get; set; }

      
    }
}

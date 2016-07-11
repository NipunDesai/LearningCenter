using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class ResultsAc
    {
        public int QuestionId { get; set; }

        public string QuestionText { get; set; }

        public List<InteractiveOptionsAc> OptionAc { get; set; }

        public bool UserResponse { get; set; }

        public string UserName { get; set; }

        public bool isCollapsed { get; set; }

        public bool IsCorrect { get; set; }
        public bool IsError { get; set; }
    }
}

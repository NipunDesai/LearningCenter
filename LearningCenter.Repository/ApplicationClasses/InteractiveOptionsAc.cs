using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
    public class InteractiveOptionsAc
    {
        public int IntrectiveQuestionId { get; set; }
        public string Option { get; set; }
        public int ParentIntrectiveOptionId { get; set; }
        public bool IsCorrect { get; set; }
        public int IntrectiveOptionId { get; set; }
        public List<InteractiveOptionsAc> ChildIntrectiveOption { get; set; } 

    }
}

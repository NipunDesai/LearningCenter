using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class InteractiveAc
    {
       public string ContentTitle { get; set; }

       public List<InteractiveQuestionAc> InteractiveQuestion { get; set; } 
       }
}

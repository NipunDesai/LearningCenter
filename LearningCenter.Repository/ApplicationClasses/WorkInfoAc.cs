using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
    public class WorkInfoAc
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public bool IsCurrent { get; set; }
    }

  
}

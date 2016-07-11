using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{

    public class School
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class FbEduInfo
    {
        public School school { get; set; }
        public string type { get; set; }
    }
   
}

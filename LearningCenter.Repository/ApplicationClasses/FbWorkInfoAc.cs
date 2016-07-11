using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
    public class Employer
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class Location
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class Position
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class FbWorkInfoAc
    {
        public Employer employer { get; set; }
        public Location location { get; set; }
        public Position position { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
    }
 
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class IntrectiveAc
    {
        public int elearningsectionid { get; set; }
        public int elearningsectionpageid { get; set; }
        public string questiontext { get; set; }

        public int interactivequestionid { get; set; }

        public int parentintrectiveoptionid { get; set; }
        public string interactiveoptiontext { get; set; }
        public int interactiveoptionid { get; set; }
        public bool iscorrect { get; set; }

        public string topicname { get; set; }

     //   public int id { get; set; }
      //  public string name { get; set; }
     //   public List<IntrectiveAc> children { get; set; }
    }
}

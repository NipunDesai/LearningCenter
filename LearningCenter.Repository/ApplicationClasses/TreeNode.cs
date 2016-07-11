using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class TreeNode
   {
       public TreeNode()
        {
            children = new List<TreeNode>();
        }
        public int id { get; set; }
        public string name { get; set; }
        public bool collapsed { get; set; }
        public bool parent { get; set; }
        public bool buttonDisable { get; set; }
        public bool AlreadyExits { get; set; }
       public List<TreeNode> children { get; set; }

       public bool CurrentUser { get; set; }
       public bool isCollapsed { get; set; }
       public int InteractiveQuestionId { get; set; }

       public string ContentTitle { get; set; }

       public string InteractiveQuestionText { get; set; }

       public int ELearningSectionPageId { get; set; }


       }
}

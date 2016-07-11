using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models;

namespace LearningCenter.Repository.ApplicationClasses
{
    public class InteractiveResultAc
    {
       public int QuestionId { get; set; }

       public string QuestionText { get; set; }

       public List<TreeNode> OptionAc { get; set; }

       public bool UserResponse { get; set; }

       public string UserName { get; set; }
      
    }
}

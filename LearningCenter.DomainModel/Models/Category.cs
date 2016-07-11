using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class Category :LearningCenterBase
    {

        [MaxLength(200)]
       public string Name { get; set; }
       public string Description { get; set; }

   

     

    }
}

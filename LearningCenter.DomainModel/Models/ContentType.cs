using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
   public class ContentType :LearningCenterBase
    {
       [MaxLength(200)]
       public string Name { get; set; }
    }
}

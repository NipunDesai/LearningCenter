using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models;

namespace LearningCenter.Repository.ApplicationClasses
{
   public class SectionAc
    {
       public int Id { get; set; }
        public int ELearningLectureId { get; set; }

        public string Title { get; set; }
        public bool ContentShowandHidebit { get; set; }
        public bool ContentButtonbit { get; set; }
        
    }
}

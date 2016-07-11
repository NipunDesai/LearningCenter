using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models;


namespace LearningCenter.Repository.ApplicationClasses
{
    public class ContentAc
    {
        public int ContentId { get; set; }
        public string ContentType { get; set; }
        public string Category { get; set; }
        public string CreatedBy { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ContentImage { get; set; }
        public int Rate { get; set; }
        public string CreatedDateTime { get; set; }
        public int UserId { get; set; }
        public bool IsReadonly { get; set; }

      
        public string ContentImageGuid { get; set; }
        //in this field if created user wants to display other(except firstname lastname) name that will store and default firstname and last is bind 
        public string CreatedOn { get; set; }
        public bool IsDeleteOnly { get; set; }
        public bool IsInteractiveOnly { get; set; }
        public bool IsInteractiveResultOnly { get; set; }
        public bool IsAutorize { get; set; }
        public  List<Category> CategoryList { get; set; }

        public  List<Tags> TagList { get; set; }

        public  List<Target> TargetList { get; set; }
      
        public List<ELearningLectureAc> ELearningLecture { get; set; }

        public virtual ICollection<Category> CategoryCollection { get; set; }
        public virtual ICollection<Tags> TagCollection { get; set; }
        public virtual ICollection<Target> TargetCollection { get; set; }

        public string UserImageGuid { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models.Global;

namespace LearningCenter.DomainModel.Models
{
    public class ContentTags : LearningCenterBase
    {
        public int ContentId { get; set; }
        public int TagId { get; set; }


        [ForeignKey("ContentId")]
        public virtual Content Content { get; set; }

        [ForeignKey("TagId")]
        public virtual Tags Tags { get; set; }
    }
}

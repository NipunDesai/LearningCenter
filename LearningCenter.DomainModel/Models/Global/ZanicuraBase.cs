﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.DomainModel.Models.Global
{
   public class LearningCenterBase
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// The Created Date & Time when value is created in entity.
        /// </summary>
        public DateTime CreatedDateTime { get; set; }

        /// <summary>
        /// To check whether the value is already deleted or not in entity.
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}

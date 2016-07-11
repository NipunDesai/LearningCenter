using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.Utility.Constants;

namespace LearningCenter.Utility.enums
{
   public enum ELearningContentOption
    {
       [Description(StringConstants.PublicWithOutStatistic)]
       PublicWithOutStatistic = 1 ,
       [Description(StringConstants.PrivateWithOutStatistic)]
       PrivateWithOutStatistic = 2,
       [Description(StringConstants.PrivateWithStatistic)]
       PrivateWithStatistic = 3
      
    }
}

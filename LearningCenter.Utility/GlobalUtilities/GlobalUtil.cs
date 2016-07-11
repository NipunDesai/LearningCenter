using log4net;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Utility.GlobalUtilities
{
   public class GlobalUtil
    {

        /// <summary>
        /// Method for Handling and logging Exceptions.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="callingType"> </param>
        public static void HandleAndLogException(Exception ex, object callingType)
        {
            var log = LogManager.GetLogger(callingType.GetType());
            if (!log.IsErrorEnabled) return;
            log.Error(ex.Message, ex);
            throw ex;
        }

        /// <summary>
        /// Method for Handling and logging Exceptions.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="callingType"> </param>
        public static void HandleAndLogException(Exception ex, Type callingType)
        {
            var log = LogManager.GetLogger(callingType);
            if (!log.IsErrorEnabled) return;
            log.Error(ex.Message, ex);
            throw new Exception(ex.Message, ex);
        }

        /// <summary>
        /// Method for logging info 
        ///  </summary>
        /// <param name="info"></param>
        /// <param name="callingType"> </param>
        public static void LogInfo(string info, Type callingType)
        {
            try
            {
                var log = LogManager.GetLogger(callingType);
                if (log.IsInfoEnabled)
                {
                    log.Info(info);
                }
            }
            catch (Exception ex)
            {
                HandleAndLogException(ex, typeof(GlobalUtil));
            }
        }

        /// <summary>
        /// Returns description of enum value. ----- pooja shah.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

            if (attributes != null && attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }

    }
}

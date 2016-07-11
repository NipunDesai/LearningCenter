using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Utility.GlobalUtilities
{
   public class Common
    {
       public static bool SendEmail(string to, string subject, string body, string fromUserName = null)
       {
           try
           {
               using (var smtp = new SmtpClient())
               {
                   //using (var _mailMessage = new MailMessage("support@promactinfo.com", to, subject, body))
                   if (fromUserName == null)
                   {
                       using (var _mailMessage = new MailMessage(((System.Net.NetworkCredential)(smtp.Credentials)).UserName, to, subject, body))
                       {
                           _mailMessage.IsBodyHtml = true;

                           smtp.Send(_mailMessage);
                           return true;
                       }
                   }
                   else
                   {
                       var from = new MailAddress(((System.Net.NetworkCredential)(smtp.Credentials)).UserName, fromUserName);
                       //create receiver address
                       var receiver = new MailAddress(to, to);
                       var mailMessage = new MailMessage(from, receiver);
                       mailMessage.IsBodyHtml = true;
                       mailMessage.Subject = subject;
                       mailMessage.Body = body;
                       smtp.Send(mailMessage);
                       return true;
                   }
               }
           }
           catch (Exception ex)
           {
               var log = LogManager.GetLogger(System.Reflection.MethodInfo.GetCurrentMethod().DeclaringType);
               if (log.IsInfoEnabled)
               {
                   log.Info(ex.Message);
               }
               return false;
           }
       }
    }
}

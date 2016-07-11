using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Web;

namespace LearningCenter.Utility.GlobalUtilities
{
   public class AppSettingsUtil
    {
       private static string _currenntDomain;

       public static string CurrentDomain
       {
           get
           {
               if (HttpContext.Current == null)
                   return _currenntDomain;
               return HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
           }
           set { _currenntDomain = value; }
       }


       public static string ProfilePicturesPath
       {
           get { return ConfigurationManager.AppSettings["ProfileFiles"]; }
       }

       public static string ContentPicturesPath
       {
           get { return ConfigurationManager.AppSettings["ContentFiles"]; }
       }

       public static string ContentPagesPath
       {
           get { return ConfigurationManager.AppSettings["ContentPages"]; }
       }
       //returns Default Administrator Username
       public static string AdminUserName
       {
           get { return ConfigurationManager.AppSettings["AdminUsername"]; }
       }

       //returns default administrator password
       public static string AdminPassword
       {
           get { return ConfigurationManager.AppSettings["AdminPassword"]; }
       }

       public static string PublicUrl
       {
           get { return ConfigurationManager.AppSettings["PublicUrl"]; }
       }
    }
}

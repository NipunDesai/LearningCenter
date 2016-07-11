using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace LearningCenter.Admin
{
    public class LogConfig
    {
        public static void RegisterLog4NetConfig()
        {
            var log4NetFileInfo =
                new FileInfo(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "Conf\\log4net.config"));
            //log4net file info
            log4net.Config.XmlConfigurator.Configure(log4NetFileInfo); //log4net initializing configuration
        }
    }
}
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LearningCenter.Web.Startup))]
namespace LearningCenter.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

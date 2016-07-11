using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LearningCenter.Admin.Startup))]
namespace LearningCenter.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using LearningCenter.Core.Controllers;
using LearningCenter.Core.Lib;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Repository.Modules.ELearningContent;

namespace LearningCenter.Web.App_Start
{
    public class AutofacConfig
    {
        public static Autofac.IContainer RegisterDependencies()
        {

            var containerBuilder = new ContainerBuilder();

            //Register all Controller within current assembly
             containerBuilder.RegisterControllers(typeof(HomeController).Assembly);
           
            //Registers api controllers within the current assembly.
            containerBuilder.RegisterApiControllers(typeof(HomeController).Assembly);
        
            //Registers DbContext
            containerBuilder.RegisterType<LearningCenterDataContext>()
                            .As<DbContext>()
                            .InstancePerDependency();

            //Register all lib
            containerBuilder.RegisterType(typeof(GlobalLib)).InstancePerDependency();
            containerBuilder.RegisterType(typeof(ContentLib)).InstancePerDependency();
            containerBuilder.RegisterType(typeof(ELearningContentLib)).InstancePerDependency();
            //  containerBuilder.RegisterType(typeof(ProfileLib)).InstancePerDependency();

            //Registration of Generic DataRepository
            containerBuilder.RegisterGeneric(typeof(DataRepository<>)).As(typeof(IDataRepository<>)).InstancePerDependency();

            //Registration of Repository.
            containerBuilder.RegisterType<ELearningContentRepository>()
                .As<IELearningContentRepository>()
                .InstancePerDependency();
            containerBuilder.RegisterType<InteractiveRepository>().As<IInteractiveRepository>().InstancePerDependency();

          //  containerBuilder.RegisterType<AccountRepository>().As<IAccountRepository>().InstancePerDependency();
        
            var container = containerBuilder.Build();
            //container.ActivateGlimpse();

            //This will set dependency resolver for MVC
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            //This will set dependency resolver for WebAPI
            var resolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
            return container;


        }
    }
}
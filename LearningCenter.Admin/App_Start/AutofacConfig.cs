using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using LearningCenter.Core.Controllers;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.Repository.DataRepository;

namespace LearningCenter.Admin.App_Start
{
    public class AutofacConfig
    {
        public static Autofac.IContainer RegisterDependencies()
        {

            var containerBuilder = new ContainerBuilder();


            //Register all Controller within current assembly
            containerBuilder.RegisterControllers(typeof(HomeController).Assembly);
          //  containerBuilder.RegisterControllers(typeof(AdminController).Assembly);
           // Registers api controllers within the current assembly.
            containerBuilder.RegisterApiControllers(typeof(HomeController).Assembly);
            //Registers DbContext
            containerBuilder.RegisterType<LearningCenterDataContext>()
                            .As<DbContext>()
                            .InstancePerDependency();
           
            //Registration of Generic DataRepository
            containerBuilder.RegisterGeneric(typeof(DataRepository<>)).As(typeof(IDataRepository<>)).InstancePerDependency();
            //container.ActivateGlimpse();

            //create container
            var container = containerBuilder.Build();

            //This will set dependency resolver for MVC
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            //This will set dependency resolver for WebAPI
            var resolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
            return container;


        }
    }
}
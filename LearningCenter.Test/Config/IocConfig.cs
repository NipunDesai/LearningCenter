using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using LearningCenter.Core.Lib;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Repository.Modules.ELearningContent;
using LearningCenter.Test.MockObjects;
using LearningCenter.Test.Repository;
using System.Web;

namespace LearningCenter.Test.Config
{
   public class IocConfig
    {
       public static IContainer RegisterDependencies()
       {
           var containerBuilder = new ContainerBuilder();

           //Register all lib
           containerBuilder.RegisterType(typeof(GlobalLib)).InstancePerDependency();
           containerBuilder.RegisterType(typeof(ContentLib)).InstancePerDependency();
           containerBuilder.RegisterType(typeof(ELearningContentLib)).InstancePerDependency();
       //    containerBuilder.RegisterType(typeof(ProfileLib)).InstancePerDependency();

           //Registration of Generic DataRepository
           containerBuilder.RegisterGeneric(typeof(DataRepository<>)).As(typeof(IDataRepository<>)).InstancePerDependency();

           /*Register DbContexts*/
           containerBuilder.RegisterType<LearningCenterDataContext>()
                               .As<DbContext>()
                               .InstancePerDependency();

         
           /*Register other dependencies.*/
           containerBuilder.RegisterGeneric(typeof(DataRepositoryTest<>)).As(typeof(IDataRepository<>));

           /*Register HttpContextBase. */
          containerBuilder.Register<HttpContextBase>(ctx => MvcMockHelpers.FakeHttpContext()).SingleInstance();

           //Registration of ELearning Content Repository.
           containerBuilder.RegisterType<ELearningContentRepository>()
               .As<IELearningContentRepository>()
               .InstancePerDependency();


           containerBuilder.RegisterType<InteractiveRepository>().As<IInteractiveRepository>().InstancePerDependency();

           var container = containerBuilder.Build();
           var resolver = new AutofacDependencyResolver(container);
           DependencyResolver.SetResolver(resolver);

           return container;
       }
    }
}

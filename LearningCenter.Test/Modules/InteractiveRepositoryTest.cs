using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Moq;
using NUnit.Framework;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Repository.Modules.ELearningContent;
using LearningCenter.Test.Config;
using LearningCenter.Test.Repository;
using Database = LearningCenter.Test.Repository.Database;

namespace LearningCenter.Test.Modules
{
    [TestFixture]
    public class InteractiveRepositoryTest
    {
        private IInteractiveRepository _intrectiveRepository;
        private Mock<IDataRepository<Content>> _mockContent;
        private Mock<IDataRepository<User>> _mockUser;
        private Mock<IDataRepository<ELearningLecture>> _mockELearningLecture;
        private Mock<IDataRepository<ELearningSection>> _mockELearningSection;
        private Mock<IDataRepository<InteractiveQuestion>> _mockQuestion;
        private Mock<IDataRepository<InteractiveOptions>> _mockOptions;
        private Mock<IDataRepository<InteractiveResult>> _mockResult;
        private Mock<LearningCenterDataContext> _mockLearningCenterDataContext; 
        private IContainer _mainContainer;
        private IContainer _childContainer;

        #region Test Initialization and CleanUp
        [SetUp]
        public void InitializeTest()
        {
            Database.InitializeDatabase();
            _mainContainer = IocConfig.RegisterDependencies();
            var childContainerBuid = new ContainerBuilder();

            //For Generic IDataRepository Registeration
            _mockContent = new Mock<IDataRepository<Content>>();
            _mockELearningLecture =new Mock<IDataRepository<ELearningLecture>>();
            _mockELearningSection = new Mock<IDataRepository<ELearningSection>>();
            _mockUser = new Mock<IDataRepository<User>>();
            _mockQuestion = new Mock<IDataRepository<InteractiveQuestion>>();
            _mockOptions = new Mock<IDataRepository<InteractiveOptions>>();
            _mockResult = new Mock<IDataRepository<InteractiveResult>>();
            _mockLearningCenterDataContext = new Mock<LearningCenterDataContext>();

            //Set Up all above
            childContainerBuid.RegisterInstance(_mockContent.Object).As<IDataRepository<Content>>();
            childContainerBuid.RegisterInstance(_mockELearningLecture.Object).As<IDataRepository<ELearningLecture>>();
            childContainerBuid.RegisterInstance(_mockELearningSection.Object).As<IDataRepository<ELearningSection>>();
            childContainerBuid.RegisterInstance(_mockUser.Object).As<IDataRepository<User>>();
            childContainerBuid.RegisterInstance(_mockQuestion.Object).As<IDataRepository<InteractiveQuestion>>();
            childContainerBuid.RegisterInstance(_mockOptions.Object).As<IDataRepository<InteractiveOptions>>();
            childContainerBuid.RegisterInstance(_mockResult.Object).As<IDataRepository<InteractiveResult>>();
            childContainerBuid.RegisterInstance(_mockLearningCenterDataContext.Object).As<DbContext>();
            //Register other dependecy
            childContainerBuid.RegisterGeneric(typeof (DataRepositoryTest<>)).As(typeof(IDataRepository<>));
            childContainerBuid.RegisterType<InteractiveRepository>().As<IInteractiveRepository>().InstancePerDependency();

            _childContainer = childContainerBuid.Build();
            var reolve = new AutofacDependencyResolver(_childContainer);
            DependencyResolver.SetResolver(reolve);
        }

        [TearDown]
        public void CleanUpTest()
        {
            if(_intrectiveRepository !=null)
                _intrectiveRepository.Dispose();
        }
        #endregion

        #region Get All IntrectiveQuestion List By ContentId Test Method

        [Test]
        public void WhenGetAllIntrectiveQuestion()
        {
            const int contentId = 1;
            const int userId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllInteractiveQuestions(contentId, userId);
            Assert.IsNotNull(actual);
        }

        #endregion

        #region When GetAll Null IntrectiveQuestion Test Method.
        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullIntrectiveQuestion()
        {
            const int contentId = 0;
            const int userId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllInteractiveQuestions(contentId, userId);
           // Assert.IsNull(actual);
            

        }
        #endregion

        #region Save Intrective Result Test Method.

        [Test]
        public void WhenSaveIntrectiveResultByOptionId()
        {
            const string userName = "kanan@promactinfo.com";
            const int optionId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.SaveInteractiveResult(optionId, userName);
            Assert.AreEqual(actual.UserResponse,false);

        }
        #endregion

        #region Save Null IntrectiveResult Test Method.
        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenSaveNullIntrectiveResultById()
        {
            const string userName = "kanan@promactinfo.com";
            const int optionId = 0;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.SaveInteractiveResult(optionId, userName);
           // Assert.IsNull(actual);
         
        }
        #endregion

        #region Get All IntectiveResult By ContentId
        [Test]
        public void WhenGettingAllIntrectiveResultByContentId()
        {
            const int contentId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllInteractiveResult(contentId);
           Assert.IsNotNull(actual);
        }
        #endregion

        #region When Getting Null IntrectiveResult By Content Id
        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullIntrectiveResultListByContentId()
        {
            const int contentId = 0;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllInteractiveResult(contentId);
            //Assert.IsNull(actual);
           
        }
        #endregion

        #region Get All IntrectiveQuestion by ContentId

        [Test]
        public void WhenGettingAllIntrectiveQuestionByContentId()
        {
            const int contentId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllInteractiveQuestion(contentId);
           Assert.IsNotNull(actual);
        }
        #endregion

        #region Get Null IntrectiveQuestion By ContentId

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullIntrectiveQuestionByContentId()
        {
            const int contentId = 0;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllInteractiveQuestion(contentId);
            //Assert.IsNull(actual);
        }
        #endregion

        #region Get IntrectiveQuestion Details By QuestionId.

        [Test]
        public void WhenGettingIntrectiveQuestionByQuestionId()
        {
            const int questionId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetInteractiveQuestionById(questionId);
            Assert.IsNotNull(actual);
        }

        #endregion

        #region Get Null IntrectiveQuestion Details By Question Id.
        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullQuestionDetailsByQuestionId()
        {
            const int questionId = 0;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetInteractiveQuestionById(questionId);
          //  Assert.IsNull(actual);
           
          }

        #endregion

        #region Get All User Test Method.

        [Test]
        public void WhenGettingAllUser()
        {
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetAllUser();
            var expect = Database.GetAll<User>().Where(x => !x.IsDeleted).ToList();
            Assert.AreEqual(actual.Count(),expect.Count());
        }

        #endregion

        #region Get IntrectiveResult By UserId Test Method

        [Test]
        public void WhenGettingIntrctiveResultByUserId()
        {
            const int userId = 1;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            var actual = _intrectiveRepository.GetInteractiveResultByUserId(userId);
            Assert.IsNotNull(actual);
        }
        #endregion

        [Test]
       [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullIntrectiveResultByUserId()
        {
            const int userId = 0;
            _intrectiveRepository = _mainContainer.Resolve<IInteractiveRepository>();
            _intrectiveRepository.GetInteractiveResultByUserId(userId);
           }

      
    }
}

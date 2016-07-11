using System;
using System.ComponentModel.DataAnnotations;
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
    public class ELearningContentRepositoryTest
    {
        private IELearningContentRepository _eLearningContentRepository;
        private Mock<IDataRepository<Content>> _mockContent;
        private Mock<IDataRepository<User>> _mockUser;
        private Mock<IDataRepository<ELearningLecture>> _mockELearningLecture;
        private Mock<IDataRepository<ELearningSection>> _mockELearningSection;
        private Mock<LearningCenterDataContext> _mockLearningCenterDataContext; 
        private IContainer _childContainer;
        private IContainer _mainContainer;
        #region Test Initialization and CleanUp
        [SetUp]
        public void InitializeTest()
        {
            Database.InitializeDatabase();

            _mainContainer = IocConfig.RegisterDependencies();
            var childContainerBuilder = new ContainerBuilder();

            /*For Genric IDataRespository Registration*/
            _mockContent = new Mock<IDataRepository<Content>>();
            _mockUser =new Mock<IDataRepository<User>>();
            _mockELearningLecture =new Mock<IDataRepository<ELearningLecture>>();
            _mockELearningSection =new Mock<IDataRepository<ELearningSection>>();
            _mockLearningCenterDataContext =new Mock<LearningCenterDataContext>();
          

            //Setup all above
            childContainerBuilder.RegisterInstance(_mockUser.Object).As<IDataRepository<User>>();
            childContainerBuilder.RegisterInstance(_mockContent.Object).As<IDataRepository<Content>>();
            childContainerBuilder.RegisterInstance(_mockELearningLecture.Object).As<IDataRepository<ELearningLecture>>();
            childContainerBuilder.RegisterInstance(_mockELearningSection.Object).As<IDataRepository<ELearningSection>>();
            childContainerBuilder.RegisterInstance(_mockLearningCenterDataContext.Object).As<DbContext>();

            /*Register other dependencies.*/
            childContainerBuilder.RegisterGeneric(typeof(DataRepositoryTest<>)).As(typeof(IDataRepository<>));
            childContainerBuilder.RegisterType<ELearningContentRepository>()
                         .As<IELearningContentRepository>()
                         .InstancePerDependency();
           _childContainer = childContainerBuilder.Build();
            var resolver = new AutofacDependencyResolver(_childContainer);
            DependencyResolver.SetResolver(resolver);
        }

        [TearDown]
        public void CleanUpTest()
        {
            if (_eLearningContentRepository != null)
           _eLearningContentRepository.Dispose();
        }
        #endregion

        #region Get all ELearning Content List Test Methods

        [Test]
        public void WhenGetAllELearningContent()
        {
           _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.GetELearningContentList().Count();
            var expect = Database.GetAll<Content>().Where(x=>!x.IsDeleted).OrderBy(x=>x.Id).ToList().Count();
            Assert.AreEqual(expect,actual);
        }
        #endregion

        #region View ELearningContentDeatil By ContentId Test Method

        [Test]
        public void WhenViewELeaningContentDeatilById()
        {
            const int contentId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var expect = Database.GetAll<Content>().Where(x => x.Id == contentId).ToList();
            var actual = _eLearningContentRepository.ViewContentDetail(contentId);
            Assert.AreEqual(expect.Count(),actual.Count());
           
        }
        #endregion

        #region View Content Creator Detail By UserId Test method.

        [Test]
        public void WhenGettingUserDetailsByUserId()
        {
            const int userId = 2;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var expect = Database.GetAll<User>().Where(x => x.Id == userId).ToList();
            var actual = _eLearningContentRepository.ViewCreatorDetails(userId);
            Assert.IsNotNull(actual);
            Assert.AreEqual(expect.Count(),actual.Count());
        }
        #endregion

        #region Update ELearning ContentRate By ContentId Test Method

        [Test]
        public void WhenUpdateElearningContentRateById()
        {
            const int contentId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var content = Database.GetAll<Content>().Where(x => x.Id == contentId).ToList().First();
          var actual =
                _eLearningContentRepository.UpdateELearningContentRate(content);
            Assert.IsNotNull(actual);
        }

        #endregion

        #region Get ELearningLecture By Lecture Id Test Method

        [Test]
        public void WhenGettingELearningLectureByLectureId()
        {
            const int lectureId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var expect = Database.GetAll<ELearningLecture>().Where(x => x.Id == lectureId).ToList();
            var actual = _eLearningContentRepository.GetELearningLectureById(lectureId);
            Assert.AreEqual(expect.Count(),actual.Count());
        }

        #endregion

        #region Get ElearningSection by sectionId Test Method

        [Test]
        public void WhenGettingELearningSectionBySectionId()
        {
            const int sectionId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.ViewELearningSectionById(sectionId);
            var expected = Database.GetAll<ELearningSection>().Where(x => x.Id == sectionId).ToList();
            Assert.AreEqual(expected.Count(),actual.Count());
        }
        #endregion

        #region Delete ELearning Content by Content Id Test Method.

        [Test]
        public void WhenDeleteELearningContentByContentId()
        {
            const int contentId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
             _eLearningContentRepository.DeleteELearningContentById(contentId);
            var expect = Database.GetAll<Content>().First(x => x.Id == contentId);
            Assert.AreEqual(expect.IsDeleted , true);
        }

#endregion

        #region View Section detail by SectionId Test Method.

        [Test]
        public void WhenviewELearningSectionDetail()
        {
            const int sectionId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.ELearningSectionDetail(sectionId).ToList();
            Assert.IsNotNull(actual);
            }

        #endregion

        #region Get ELearningContent Details By ContentId Test Method.

        [Test]
        public void WhenGetContentDetailsByContentId()
        {
            const int contentId = 1;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.GetELearningContentById(contentId);
            Assert.IsNotNull(contentId);
        }
        #endregion

        #region Get Null ELearningContent List Test Method

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullELearningContentList()
        {
             int contentId = 0;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.ViewContentDetail(contentId);
            Assert.IsNull(actual);
        }
        #endregion

        #region View Null ContentCreator Detail Test Method.

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullContentCreatorDetail()
        {
            int userId = 0;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.ViewCreatorDetails(userId);
            Assert.IsNull(actual);
        }

        #endregion

        #region Get Null ELearningLecture List Test Method.

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullElearningLectureDetailByLectureId()
        {
            int lectureId = 0;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.GetELearningLectureById(lectureId);
            Assert.IsNull(actual);
        }
        #endregion

        #region View Null ELearningSection Detail Test Method.

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenViewNullElearningSectionDetails()
        {
            int sectionId = 0;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.ViewELearningSectionById(sectionId);
            Assert.IsNull(actual);
        }
        #endregion

        #region Null ELearningSection Detail Test Method.

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenNullELearningSectionDetail()
        {
            int id = 0;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.ELearningSectionDetail(id);
            Assert.IsNull(actual);
        }
        #endregion

        #region Getting Null Content Details

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenGettingNullContentDetails()
        {
            int contentId = 0;
            _eLearningContentRepository = _mainContainer.Resolve<IELearningContentRepository>();
            var actual = _eLearningContentRepository.GetELearningContentById(contentId);
            Assert.IsNull(actual);

        }
#endregion
    }
}

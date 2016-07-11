using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Moq;
using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Core.Lib;
using LearningCenter.Test.Config;
using LearningCenter.Test.Repository;
using Database = LearningCenter.Test.Repository.Database;
using System.Collections.Generic;
using System.Linq.Expressions;
using NUnit.Framework;
using System.Web;
using LearningCenter.Repository.ApplicationClasses;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Test.Lib
{
    [TestFixture]
   public class ELearningContentLibTest
    {
        #region private member
        private ELearningContentLib _eLearningContentLib;
        private Mock<IDataRepository<Content>> _mockContent;
        private Mock<IDataRepository<ELearningContent>> _mockELearningContent;
        private Mock<IDataRepository<ELearningLecture>> _mockELearningLecture;
        private Mock<IDataRepository<ELearningSection>> _mockELearningSection;
        private Mock<IDataRepository<ELearningSectionPage>> _mockELearningSectionPage;
        private Mock<IDataRepository<InteractiveQuestion>> _mockInteactiveQuestion;
        private Mock<IDataRepository<InteractiveOptions>> _mockInteactiveOptions;
        private Mock<LearningCenterDataContext> _mockLearningCenterDataContext;
        private Mock<IDataRepository<AppSettingsUtil>> _mockAppSettings;
        private IContainer _childContainer;
        private IContainer _mainContainer;
        #endregion

        #region Test Initialization and CleanUp
        [SetUp]
        public void InitializeTest()
        {
            Database.InitializeDatabase();

            _mainContainer = IocConfig.RegisterDependencies();
            _mockAppSettings = new Mock<IDataRepository<AppSettingsUtil>>();
            var childContainerBuilder = new ContainerBuilder();

            /*For Genric IDataRespository Registration*/
            _mockContent = new Mock<IDataRepository<Content>>();
            _mockELearningContent = new Mock<IDataRepository<ELearningContent>>();
            _mockELearningLecture = new Mock<IDataRepository<ELearningLecture>>();
            _mockLearningCenterDataContext = new Mock<LearningCenterDataContext>();
            _mockELearningSection = new Mock<IDataRepository<ELearningSection>>();
            _mockELearningSectionPage = new Mock<IDataRepository<ELearningSectionPage>>();
            _mockInteactiveQuestion = new Mock<IDataRepository<InteractiveQuestion>>();
            _mockInteactiveOptions = new Mock<IDataRepository<InteractiveOptions>>();
              

            //Setup all above

            childContainerBuilder.RegisterInstance(_mockContent.Object).As<IDataRepository<Content>>();
            childContainerBuilder.RegisterInstance(_mockELearningContent.Object).As<IDataRepository<ELearningContent>>();
            childContainerBuilder.RegisterInstance(_mockELearningLecture.Object).As<IDataRepository<ELearningLecture>>();
            childContainerBuilder.RegisterInstance(_mockELearningSection.Object).As<IDataRepository<ELearningSection>>();
            childContainerBuilder.RegisterInstance(_mockELearningSectionPage.Object).As<IDataRepository<ELearningSectionPage>>();
            childContainerBuilder.RegisterInstance(_mockInteactiveQuestion.Object).As<IDataRepository<InteractiveQuestion>>();
            childContainerBuilder.RegisterInstance(_mockInteactiveOptions.Object).As<IDataRepository<InteractiveOptions>>();
            childContainerBuilder.RegisterInstance(_mockLearningCenterDataContext.Object).As<DbContext>();
            childContainerBuilder.RegisterType(typeof(ELearningContentLib)).InstancePerDependency();
           
            /*Register other dependencies.*/
            childContainerBuilder.RegisterGeneric(typeof(DataRepositoryTest<>)).As(typeof(IDataRepository<>));

            _childContainer = childContainerBuilder.Build();
            var resolver = new AutofacDependencyResolver(_childContainer);
            DependencyResolver.SetResolver(resolver);

            //var serverMock = new Mock<HttpServerUtilityBase>(MockBehavior.Loose);
            //serverMock.Setup(i => i.MapPath(It.IsAny<String>()))
            //   .Returns((String a) => a.Replace("~/", @"C:\testserverdir\").Replace("/", @"\"));
          //  var Context = new Mock<HttpContextBase>(MockBehavior.Strict);
          //  var server = new Mock<HttpServerUtilityBase>();

          //  Context.Setup(ctx => ctx.Server).Returns(server.Object);
         //   MockObjects.MvcMockHelpers.FakeHttpContext();

            //HttpContext.Current = new HttpContext(
            // new HttpRequest(null, "http://tempuri.org", null),
            // new HttpResponse(null));
            //}
            
        }

        [TearDown]
        public void CleanUpTest()
        {
            if (_eLearningContentLib != null)
                _eLearningContentLib.Dispose();
        }
        #endregion

        #region ELearningContent test method
        [Test]
        public void WhenContentCreate_ThenAlsoSaveInELearningContent_ThenSaveChangesShouldCallAtleastOnce()
        {
            var contentId = 1;
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
          
           //var _mockELearningContent = _childContainer.Resolve<IDataRepository<ELearningContent>>();
            _mockELearningContent.Setup(x => x.SaveChanges());
            _eLearningContentLib.SaveELearningContent(contentId);
            _mockELearningContent.Verify(x => x.SaveChanges(),Times.AtLeastOnce());

        }

        [Test]
        public void ContentAndELearnigContentShouldHaveSameCount()
        {
          
            var actual = Database.GetAll<ELearningContent>().Where(x => !x.IsDeleted).OrderBy(x => x.Id).ToList().Count();
            var expect = Database.GetAll<Content>().Where(x => !x.IsDeleted).OrderBy(x => x.Id).ToList().Count();
            Assert.AreEqual(expect, actual);
        }


        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenContentCreateWitnNullContentId_ThenNullReferenceExceptionThrown()
        {
            Content content = null;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.SaveELearningContent(content.Id);

        }

        #endregion

        #region Lecture
        [Test]
       
        public void WhenAddLecture_ThenSaveChangesShouldBeCalledAtleastOnce()
        {
            var eLearningLecture = new ELearningLecture {
                ContentId = 1,
                Title = "Lecture",
                CreatedDateTime = DateTime.UtcNow
            
            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningLecture.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddOrEditLecture(eLearningLecture);
            _mockELearningLecture.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        public void WhenAddLecture_ThenReturnAddedEntity()
        {
            var eLearningLecture = new ELearningLecture
            {
                ContentId = 1,
                Title = "Lecture",
                CreatedDateTime = DateTime.UtcNow

            };
            var actual = eLearningLecture;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddOrEditLecture(eLearningLecture);
            Assert.AreEqual(expected.Title, actual.Title);
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddLectureWithNullValue_ThenNullReferenceExceptionThrown()
        {
            ELearningLecture eLearningLecture = null;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddOrEditLecture(eLearningLecture);

        }

        [Test]
        public void WhenUpdateLecture_ThenSaveChangesShouldBeCalledAtleastOnce()
        {
            var eLearningLecture = new ELearningLecture
            {
                Id = 1,
                ContentId = 1,
                Title = "Lecture",
                CreatedDateTime = DateTime.UtcNow

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningLecture.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddOrEditLecture(eLearningLecture);
            _mockELearningLecture.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        public void WhenUpdateLecture_ThenActualAndUpdatedEntittyShouldNotBeSame()
        {
            var eLearningLecture = Database.GetAll<ELearningLecture>().First();
            var actual = eLearningLecture.Title;
            var lecture = new ELearningLecture {

                Title = "sample Lecture",
                ContentId = eLearningLecture.ContentId,
                Id = eLearningLecture.Id,
                IsDeleted = eLearningLecture.IsDeleted,
                CreatedDateTime = eLearningLecture.CreatedDateTime
            
            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddOrEditLecture(lecture);
            Assert.AreNotEqual(expected.Title, actual);


        }

       

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenDeleteLecture_ThenSaveChangesShouldBeCalledAtLeastOnce()
        {

            int lectureId = 1;
            _mockELearningLecture.Setup(x => x.SaveChanges());
            _mockELearningLecture.Setup(x => x.Fetch(It.IsAny<Expression<Func<ELearningLecture, bool>>>()))
                .Returns(Database.GetAll<ELearningLecture>().Where(x => x.Id == lectureId).AsQueryable());
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.DeleteLectureById(lectureId);
            _mockELearningLecture.Verify(x => x.SaveChanges(), Times.AtLeastOnce());

        }

        //[Test]
        //public void WhenDeletingLecture_ThenReturnTrue()
        //{
        //    int lectureId = 1;
        //    _mockELearningLecture.Setup(x => x.SaveChanges());
        //    _mockELearningLecture.Setup(x => x.Fetch(It.IsAny<Expression<Func<ELearningLecture, bool>>>()))
        //        .Returns(Database.GetAll<ELearningLecture>().Where(x => x.Id == lectureId).AsQueryable());

        //    _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
        //    bool actual = _eLearningContentLib.DeleteLectureById(lectureId);
        //    Assert.IsTrue(actual);

        //}

        #endregion

        #region section
      
        [Test]

        public void WhenAddSection_ThenSaveChangesShouldBeCalledAtleastOnce()
        {
            var eLearningSection = new ELearningSection
            {
                ELearningLectureId = 1,
                Title = "Section",
                CreatedDateTime = DateTime.UtcNow

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningSection.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddOrEditSection(eLearningSection);
            _mockELearningSection.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        public void WhenAddSection_ThenReturnAddedEntity()
        {
            var eLearningSection = new ELearningSection
            {
                ELearningLectureId = 1,
                Title = "Section",
                CreatedDateTime = DateTime.UtcNow

            };
            var actual = eLearningSection;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddOrEditSection(eLearningSection);
            Assert.AreEqual(expected.Title, actual.Title);
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddSectionWithNullValue_ThenNullReferenceExceptionThrown()
        {
            ELearningSection eLearningSection = null;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddOrEditSection(eLearningSection);

        }

        [Test]
        public void WhenUpdateSection_ThenSaveChangesShouldBeCalledAtleastOnce()
        {
            var eLearningSection = new ELearningSection
            {
                Id = 1,
                ELearningLectureId = 1,
                Title = "Section",
                CreatedDateTime = DateTime.UtcNow

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningSection.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddOrEditSection(eLearningSection);
            _mockELearningSection.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        public void WhenUpdateSection_ThenActualAndUpdatedEntityShouldNotBeSame()
        {
            var eLearningSection = Database.GetAll<ELearningSection>().First();
            var actual = eLearningSection.Title;
            var section = new ELearningSection
            {

                Title = "sample Section",
                ELearningLectureId = eLearningSection.ELearningLectureId,
                Id = eLearningSection.Id,
                IsDeleted = eLearningSection.IsDeleted,
                CreatedDateTime = eLearningSection.CreatedDateTime

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddOrEditSection(section);
            Assert.AreNotEqual(expected.Title, actual);


        }
       
        //[Test]
        //public void WhenDeletingSection_ThanSaveChangesShouldBeCalledAtLeastOnce()
        //{

        //    int sectionId = 1;
        //    _mockELearningSection.Setup(x => x.SaveChanges());
        //    _mockELearningSection.Setup(x => x.Fetch(It.IsAny<Expression<Func<ELearningSection, bool>>>()))
        //        .Returns(Database.GetAll<ELearningSection>().Where(x => x.Id == sectionId).AsQueryable());

        //    _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
        //    _eLearningContentLib.DeleteSectionById(sectionId);
        //    _mockELearningSection.Verify(x => x.SaveChanges(), Times.AtLeastOnce());

           
        //}

        //[Test]
        //public void WhenDeletingSection_ThenReturnTrue()
        //{
        //    int sectionId = 1;
        //    _mockELearningSection.Setup(x => x.SaveChanges());
        //    _mockELearningSection.Setup(x => x.Fetch(It.IsAny<Expression<Func<ELearningSection, bool>>>()))
        //        .Returns(Database.GetAll<ELearningSection>().Where(x => x.Id == sectionId).AsQueryable());

        //    _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
        //   bool actual =  _eLearningContentLib.DeleteSectionById(sectionId);
        //   Assert.IsTrue(actual);
           
        //}

        #endregion

        #region  Section Page

        [Test]
        public void WhenAddSectionPage_ThenSaveChangesShouldBeCalledOnce()
        {
            var eLearningSectionPage = new ELearningSectionPage
            {
                ELearningSectionId = 1,
                SectionContentFileName = "Penguins.jpg",
                SectionContentFileGuid = "aduiib87-76cx8dsd-77xccsx.jpg",
                CreatedDateTime = DateTime.UtcNow

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningSectionPage.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddELearningSectionPage(eLearningSectionPage);
            _mockELearningSectionPage.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        public void WhenAddSectionPage_ThenReturnAddedEntity()
        {
            var eLearningSectionPage = new ELearningSectionPage
            {
                ELearningSectionId = 1,
                SectionContentFileName = "Penguins.jpg",
                SectionContentFileGuid = "aduiib87-76cx8dsd-77xccsx.jpg",
                CreatedDateTime = DateTime.UtcNow

            };
            var actual = eLearningSectionPage;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddELearningSectionPage(eLearningSectionPage);
            Assert.AreEqual(expected.SectionContentFileGuid, actual.SectionContentFileGuid);
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddSectionPageWithNullValue_ThenNullReferenceExceptionThrown()
        {
            ELearningSectionPage eLearningSectionPage = null;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddELearningSectionPage(eLearningSectionPage);

        }

        [Test]
        public void WhenAddSectionPageForInteractive_ThenSaveChangesShouldBeCalledOnce()
        {
            var interactiveQuestion = new IntrectiveAc
            {

                questiontext = "Question",
                elearningsectionid = 1

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningSectionPage.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddELearningSectionPageForInteractive(interactiveQuestion);
            _mockELearningSectionPage.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddSectionPageForInteractiveWithNullValue_ThenNullReferenceExceptionThrown()
        {
            IntrectiveAc interactiveQuestion = null;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddELearningSectionPageForInteractive(interactiveQuestion);

        }

        //[Test]
        //public void WhenDeleteSectionPageContent_ThenSaveChangesShouldBeCalledOnce()
        //{
        //   // _mockAppSettings.Setup(x => x.GetAll()).Returns(Database.GetAll<AppSetting>().AsQueryable);
        //   // AppSettingsUtil.InitializeAppSettings(_mainContainer.Resolve<IComponentContext>());
        //    //var eLearningSectionPageGuid = "/Content/ContentImages/eLearningContent2.jpg";
        //    int sectionPageId = 1;
        //    _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
        //    _mockELearningSectionPage.Setup(x => x.SaveChanges());
        //    _eLearningContentLib.DeleteSectionPageContent(sectionPageId);
        //    _mockELearningSectionPage.Verify(x => x.SaveChanges(), Times.AtLeastOnce());

        //}

        [Test]
        public void  WhenAddYoutubeLink_ThenSaveChangesShouldBeCalledOnce()
        {
            var eLearningSectionPage = new ELearningSectionPage
            {
                ELearningSectionId = 1,
                EmbeddedYouTubeLink = "http://www.youtube.com/embed/OSP7o4lzIoQ",
                YouTubeLink = "https://www.youtube.com/watch?v=OSP7o4lzIoQ",
                CreatedDateTime = DateTime.UtcNow

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockELearningSectionPage.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddYouTubeLink(eLearningSectionPage);
            _mockELearningSectionPage.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddNullYoutubeLink_ThenNullReferenceExceptionThrown()
        {
            var eLearningSectionPage = new ELearningSectionPage();
            eLearningSectionPage = null;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddYouTubeLink(eLearningSectionPage);


        }

        #endregion

        #region add interactive question/option
        [Test]
        public void WhenAddInteractiveQuestion_ThenReturnAddedEntity()
        {
            var interactiveQuestion = new IntrectiveAc
            {
             
              questiontext = "Question"

            };
            var sectionPageId = 1;
            var actual = interactiveQuestion;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddInteractiveQuestion(interactiveQuestion,sectionPageId);
            Assert.AreEqual(expected.Text, actual.questiontext);
        }

        [Test]
        public void WhenAddInteractiveQuestion_ThenSaveChangesShouldBeCalledOnce()
        {
            var interactiveQuestion = new IntrectiveAc
            {

                questiontext = "Question"

            };
            var sectionPageId = 1;
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockInteactiveQuestion.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddInteractiveQuestion(interactiveQuestion, sectionPageId);
            _mockInteactiveQuestion.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddInteractiveQuestionWithNullValue_ThenNullReferenceExceptionThrown()
        {
            IntrectiveAc interactiveQuestion = null;
            var sectionPageId = 1;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddInteractiveQuestion(interactiveQuestion,sectionPageId);

        }

        [Test]
        public void WhenAddInteractiveOption_ThenReturnAddedEntity()
        {
            var interactiveOption = new IntrectiveAc
            {

                interactiveoptiontext = "Option",
                interactivequestionid = 1

            };
            var actual = interactiveOption;
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            var expected = _eLearningContentLib.AddInteractiveOption(interactiveOption);
            Assert.AreEqual(expected.Option, actual.interactiveoptiontext);
        }

        [Test]
        public void WhenAddInteractiveOption_ThenSaveChangesShouldBeCalledOnce()
        {
            var interactiveOption = new IntrectiveAc
            {

                interactiveoptiontext = "Option",
                interactivequestionid = 1

            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();
            _mockInteactiveOptions.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddInteractiveOption(interactiveOption);
            _mockInteactiveOptions.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddInteractiveOptionWithNullValue_ThenNullReferenceExceptionThrown()
        {
            IntrectiveAc interactiveQuestion = null;
           
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddInteractiveOption(interactiveQuestion);

        }
        #endregion

        #region content test method

        [Test]
        public void WhenContentCreate_ThenSaveChangesShouldCallAtleastOnce()
        {
            var content = new Content {
                Id = 1,
                ContentTypeId = 1,
                LanguageId = 1,
                UserId = 5,
                Title = "ELearning Content Details",
                Description = "Learn E-Leraning Content",
                ContentImage = "/Content/ContentImages/eLearningContent2.jpg",
                Status = true,
                LaunchStartTime = DateTime.Now,
                LaunchEndTime = DateTime.Now,
                CreatedDateTime = DateTime.Now,
                Rate = 7


            };
            _eLearningContentLib = _childContainer.Resolve<ELearningContentLib>();

            _mockContent.Setup(x => x.SaveChanges());
            _eLearningContentLib.AddContent(content);
            _mockContent.Verify(x => x.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenContentIsNull_ThenNullReferenceExceptionThrown()
        {
            Content content = null;

            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.AddContent(content);
        }

        [Test]
        public void WhenUpdateContentSuccessfully_ThenReturnVoid()
        {
            var content = Database.GetAll<Content>().First();
            var actual = content.Title;
            var contentInfo = new  Content
            {
                Id = 1,
                Title = "sample Content"
              

            };
            _eLearningContentLib = _mainContainer.Resolve<ELearningContentLib>();
            _eLearningContentLib.EditContent(contentInfo);
            
        }

        #endregion
    }
}

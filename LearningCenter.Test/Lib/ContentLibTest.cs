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
using NUnit.Framework;

namespace LearningCenter.Test.Lib
{
    [TestFixture]
   public class ContentLibTest
   {
       #region private member
       private ContentLib _contentLib;
        private Mock<IDataRepository<Content>> _mockContent;
       
        private Mock<IDataRepository<Tags>> _mockTag;
        private Mock<IDataRepository<ContentTags>> _mockContentTags;
        private Mock<IDataRepository<Target>> _mockTarget;
        private Mock<IDataRepository<ContentTarget>> _mockContentTarget;
        private Mock<IDataRepository<Category>> _mockCategory;
        private Mock<IDataRepository<ContentCategory>> _mockContentCategory;
        private Mock<LearningCenterDataContext> _mockLearningCenterDataContext;
        private IContainer _childContainer;
        private IContainer _mainContainer;
       #endregion

        #region Test Initialization and CleanUp
       [SetUp]
        public void InitializeTest()
        {
            Database.InitializeDatabase();

            _mainContainer = IocConfig.RegisterDependencies();
            var childContainerBuilder = new ContainerBuilder();

            /*For Genric IDataRespository Registration*/
            _mockContent = new Mock<IDataRepository<Content>>();
           
            _mockTag = new Mock<IDataRepository<Tags>>();
            _mockContentTags = new Mock<IDataRepository<ContentTags>>();
            _mockTarget = new Mock<IDataRepository<Target>>();
            _mockContentTarget = new Mock<IDataRepository<ContentTarget>>();
            _mockCategory = new Mock<IDataRepository<Category>>();
            _mockContentCategory = new Mock<IDataRepository<ContentCategory>>();
            _mockLearningCenterDataContext = new Mock<LearningCenterDataContext>();

            //Setup all above
          
            childContainerBuilder.RegisterInstance(_mockContent.Object).As<IDataRepository<Content>>();
            childContainerBuilder.RegisterInstance(_mockTag.Object).As<IDataRepository<Tags>>();
            childContainerBuilder.RegisterInstance(_mockContentTags.Object).As<IDataRepository<ContentTags>>();
            childContainerBuilder.RegisterInstance(_mockCategory.Object).As<IDataRepository<Category>>();
            childContainerBuilder.RegisterInstance(_mockContentCategory.Object).As<IDataRepository<ContentCategory>>();
            childContainerBuilder.RegisterInstance(_mockTarget.Object).As<IDataRepository<Target>>();
            childContainerBuilder.RegisterInstance(_mockContentTarget.Object).As<IDataRepository<ContentTarget>>();
            childContainerBuilder.RegisterInstance(_mockLearningCenterDataContext.Object).As<DbContext>();
            childContainerBuilder.RegisterType(typeof(ContentLib)).InstancePerDependency();
            /*Register other dependencies.*/
            childContainerBuilder.RegisterGeneric(typeof(DataRepositoryTest<>)).As(typeof(IDataRepository<>));
            _childContainer = childContainerBuilder.Build();
            var resolver = new AutofacDependencyResolver(_childContainer);
            DependencyResolver.SetResolver(resolver);
        }

        [TearDown]
        public void CleanUpTest()
        
        
        {
            if (_contentLib != null)
                _contentLib.Dispose();
        }
        #endregion

        #region tag test method

        [Test]
        public void GetTagList()
        {
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = _contentLib.GetTagList().Count();
            var expect = Database.GetAll<Tags>().Where(x => !x.IsDeleted).OrderBy(x => x.Id).ToList().Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        public void WhenAddTag_ThenSaveChangesCalledOnce()
        {
            var tag = new Tags
            {
                Id = 3,
                Name = "Neturopethy",
                IsDeleted = false,
                CreatedDateTime = DateTime.UtcNow
            };

            _contentLib = _childContainer.Resolve<ContentLib>();
            _mockTag.Setup(y => y.SaveChanges());
            _contentLib.AddTag(tag);
          
            _mockTag.Verify(y => y.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddTagWithNullValue_ThenNullReferenceExceptionThrown()
        {
            Tags tag = null;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _contentLib.AddTag(tag);

        }

        [Test]
        public void WhenAddTag_ThenReturnNewlyAddedObj()
        {
            var tag = new Tags
            {

                Name = "Sample",
                IsDeleted = false,
                CreatedDateTime = DateTime.UtcNow
            };
            _contentLib = _mainContainer.Resolve<ContentLib>();

            var expected = _contentLib.AddTag(tag);
            Assert.AreSame(tag.Name, expected.Name);

        }

        [Test]
        public void WhenTagNameWouldBeSame_ThenSaveChangesShouldNotBeCalled()
        {
            _contentLib = _mainContainer.Resolve<ContentLib>();
           
            var tag = new Tags
            {
               
                Name = "Homeopethy",
               
            };
            _mockTag.Setup(x => x.SaveChanges());
            _contentLib.AddTag(tag);
            _mockTag.Verify(x => x.SaveChanges(), Times.Never());
          
        }

        [Test]
        public void GetTagListByContentId()
        {
            var contentId = 1;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = 2;
            var expect = _contentLib.GetTagListById(contentId).Count();
            Assert.AreEqual(expect, actual);

        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenTagListWithNullContentId_ThenNullReferenceExceptionThrown()
        {
            Content content = null;
            _contentLib = _mainContainer.Resolve<ContentLib>();
             _contentLib.GetTagListById(content.Id);
        }

        [Test]
       
        public void WhenTagWithOutContentId_ThenTagListCountSholdBeZero()
        {
             var contentId = 12;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = 0;
            var expect = _contentLib.GetTagListById(contentId).Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        public void WhenSaveContentTagInfo_ThenSaveChangesShouldCalledOnce()
        {
            var tag = new Tags {
                Name = "Tag",
                Id = 1
            };
            var tagList = new List<Tags>();
            tagList.Add(tag);
            var contentId = 2;
            _contentLib = _childContainer.Resolve<ContentLib>();
            _mockContentTags.Setup(y => y.SaveChanges());
            _contentLib.SaveContentTagInfo(contentId,tagList);
            _mockContentTags.Verify(y => y.SaveChanges(), Times.AtLeastOnce());

        }
        [Test]
       public void WhenAlreadySaveContentTagInfo_ThenSaveChangesShouldNotCalled()
        {
            {
                var tag = new Tags
                {
                    Name = "Tag",
                    Id = 1
                };
                var tagList = new List<Tags>();
                tagList.Add(tag);
                var contentId = 1;
                _contentLib = _mainContainer.Resolve<ContentLib>();
                _mockContentTags.Setup(y => y.SaveChanges());
                _contentLib.SaveContentTagInfo(contentId, tagList);
                _mockContentTags.Verify(y => y.SaveChanges(), Times.Never());

            }
        }

        [Test]
        [ExpectedException("System.ArgumentNullException")]
        public void WhenSaveContentTagInfoWithNullTagList_ThenNullReferenceExceptionThrown()
        {
            List<Tags> tagList = null;
            var contentId = 1;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _contentLib.SaveContentTagInfo(contentId, tagList);
             
        }
       
        
        #endregion

        #region Category test method

        [Test]
        public void GetCategoryList()
        {
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = _contentLib.GetCategoryList().Count();
            var expect = Database.GetAll<Category>().Where(x => !x.IsDeleted).OrderBy(x => x.Id).ToList().Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        public void GetCategoryListByContentId()
        {
            var contentId = 1;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = 2;
            var expect = _contentLib.GetCategoryListById(contentId).Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenCategoryListWithNullContentId_ThenNullReferenceExceptionThrown()
        {
            Content content = null;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _contentLib.GetCategoryListById(content.Id);
        }

         [Test]
        public void WhenSaveContentCategoryInfo_ThenSaveChangesShouldCalledOnce()
        {
            var category = new Category
            {
                Name = "category",
                Id = 1
            };
            var categoryList = new List<Category>();
            categoryList.Add(category);
            var contentId = 2;
            _contentLib = _childContainer.Resolve<ContentLib>();
            _mockContentCategory.Setup(y => y.SaveChanges());
            _contentLib.SaveContentCategoryInfo(contentId, categoryList);
            _mockContentCategory.Verify(y => y.SaveChanges(), Times.AtLeastOnce());
        }


         [Test]
         public void WhenAlreadySaveContentCategoryInfo_ThenSaveChangesShouldNotCalled()
         {
             var category = new Category
             {
                 Name = "category",
                 Id = 2
             };
             var categoryList = new List<Category>();
             categoryList.Add(category);
             var contentId = 2;
             _contentLib = _mainContainer.Resolve<ContentLib>();
             _mockContentCategory.Setup(y => y.SaveChanges());
             _contentLib.SaveContentCategoryInfo(contentId, categoryList);
             _mockContentCategory.Verify(y => y.SaveChanges(), Times.Never());
         }

         [Test]
         [ExpectedException("System.ArgumentNullException")]
         public void WhenSaveContentCategoryInfoWithNullCategoryList_ThenNullReferenceExceptionThrown()
         {
             List<Category> categoryList = null;
             var contentId = 1;
             _contentLib = _mainContainer.Resolve<ContentLib>();
             _contentLib.SaveContentCategoryInfo(contentId, categoryList);
         }
       


        #endregion

        #region target test method

        [Test]
        public void GetTargetListByContentId()
        {
            var contentId = 1;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = 2;
            var expect = _contentLib.GetTargetListById(contentId).Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenTargetListWithNullContentId_ThenNullReferenceExceptionThrown()
        {
            Content content = null;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _contentLib.GetTargetListById(content.Id);
        }

        [Test]
        public void WhenTargetWithOutContentId_ThenTargetListCountSholdBeZero()
        {
            var contentId = 12;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = 0;
            var expect = _contentLib.GetTargetListById(contentId).Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        public void GetTargetList()
        {
            _contentLib = _mainContainer.Resolve<ContentLib>();
            var actual = _contentLib.GetTargetList().Count();
            var expect = Database.GetAll<Target>().Where(x => !x.IsDeleted).OrderBy(x => x.Id).ToList().Count();
            Assert.AreEqual(expect, actual);
        }

        [Test]
        public void WhenAddTarget_ThenSaveChangesShouldBeCalledOnce()
        {
            var target = new Target
            {
                Id = 3,
                Name = "Sample",
                IsDeleted = false,
                CreatedDateTime = DateTime.UtcNow
            };


            _contentLib = _childContainer.Resolve<ContentLib>();
            _mockTarget.Setup(y => y.SaveChanges());
            _contentLib.AddTarget(target);
            _mockTarget.Verify(y => y.SaveChanges(), Times.AtLeastOnce());

           
        }

         [Test]
        public void WhenTargetNameWouldBeSame_ThenSaveChangesShouldNotBeCalled()
        {
            var target = new Target
            {
                Id = 3,
                Name = "Sample",
                IsDeleted = false,
                CreatedDateTime = DateTime.UtcNow
            };

            _contentLib = _mainContainer.Resolve<ContentLib>();
            _mockTarget.Setup(y => y.SaveChanges());
            _contentLib.AddTarget(target);

            _mockTarget.Verify(y => y.SaveChanges(), Times.Never());
        }

        [Test]
        public void WhenAddTarget_ThenReturnNewlyAddedObj()
         {
             var target = new Target
             {
                
                 Name = "Sample",
                 IsDeleted = false,
                 CreatedDateTime = DateTime.UtcNow
             };
             _contentLib = _mainContainer.Resolve<ContentLib>();
            
             var expected = _contentLib.AddTarget(target);
             Assert.AreSame(target.Name, expected.Name);
            
         }

        [Test]
        [ExpectedException("System.NullReferenceException")]
        public void WhenAddTargetWithNullValue_ThenNullReferenceExceptionThrown()
        {
             Target target = null;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _contentLib.AddTarget(target);

        }

        [Test]
        public void WhenSaveContentTargetInfo_ThenSaveChangesShouldCalledOnce()
        {
            var target = new Target
            {
                Name = "target",
                Id = 1
            };
            var targetList = new List<Target>();
            targetList.Add(target);
            var contentId = 2;
            _contentLib = _childContainer.Resolve<ContentLib>();
            _mockContentTarget.Setup(y => y.SaveChanges());
            _contentLib.SaveContentTargetInfo(contentId, targetList);
            _mockContentTarget.Verify(y => y.SaveChanges(), Times.AtLeastOnce());
        }

        [Test]
        public void WhenAlreadySaveContentTargetInfo_ThenSaveChangesShouldNotCalled()
        {
            var target = new Target
            {
                Name = "target",
                Id = 1
            };
            var targetList = new List<Target>();
            targetList.Add(target);
            var contentId = 1;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _mockContentTarget.Setup(y => y.SaveChanges());
            _contentLib.SaveContentTargetInfo(contentId, targetList);
            _mockContentTarget.Verify(y => y.SaveChanges(), Times.Never());
        }

        [Test]
        [ExpectedException("System.ArgumentNullException")]
        public void WhenSaveContentTargetInfoWithNullTargetList_ThenNullReferenceExceptionThrown()
        {
            List<Target> targetList = null;
            var contentId = 1;
            _contentLib = _mainContainer.Resolve<ContentLib>();
            _contentLib.SaveContentTargetInfo(contentId, targetList);
        }
       
        #endregion
    }
}

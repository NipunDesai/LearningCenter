
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.DomainModel.Models;
using LearningCenter.Repository.DataRepository;
using LearningCenter.Utility.GlobalUtilities;

namespace LearningCenter.Core.Lib
{
   public class ContentLib : IDisposable
   {
       # region "Private variables"
       private readonly IDataRepository<Category> _categoryContext;
       private readonly IDataRepository<Content> _contentContext;
       private readonly IDataRepository<Tags> _tagContext;
       private readonly IDataRepository<Target> _targetContext;
       private readonly IDataRepository<ContentCategory> _contentCategoryContext;
       private readonly IDataRepository<ContentTags> _contentTagContext;
       private readonly IDataRepository<ContentTarget> _contentTargetContext;
    
       
       #endregion

        #region "Constructor(s) & Destructor(s)"

       public ContentLib(IDataRepository<Category> categoryContext, IDataRepository<Content> contentContext, IDataRepository<Tags> tagContext, IDataRepository<Target> targetContext, IDataRepository<ContentCategory> contentCategoryContext, IDataRepository<ContentTags> contentTagContext, IDataRepository<ContentTarget> contentTargetContext)
        {
            _categoryContext = categoryContext;
            _contentContext = contentContext;
            _tagContext = tagContext;
            _contentCategoryContext = contentCategoryContext;
            _contentTagContext = contentTagContext;
            _contentTargetContext = contentTargetContext;
            _targetContext = targetContext;
          
        }

        #endregion

       #region category
       /// <summary>
       /// Get Category List
       /// </summary>
       /// <returns>category list</returns>
       public List<Category> GetCategoryList()
       {
           try 
           { 
            var categoryList = _categoryContext.Fetch(x => !x.IsDeleted).ToList();
            return categoryList;
           }
            
           catch(Exception ex)
           {
               
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }

       }

       /// <summary>
       /// Get Category List by contentid
       /// </summary>
       /// <returns>category list</returns>
       public List<Category> GetCategoryListById(int contentId)
       {
           try
           {
               var categoryCollection = _categoryContext.GetAll().ToList();
               var categoryList = (from c in _contentCategoryContext.Fetch(x=>x.ContentId == contentId).ToList() 
                                   join
                                     ca in categoryCollection on c.CategoryId equals ca.Id
                                   select ca).ToList();
               

               return categoryList;
           }
           catch (Exception ex)
           {

               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }

       }

       /// <summary>
       /// Save Category Info In ContentCategory table
       /// </summary>
       /// <param name="contentid"></param>
       /// <param name="categoryList"></param>
    
       public void SaveContentCategoryInfo(int contentid ,List<Category> categoryList)
       {
           try
           {
               //subtract categorycollection and categorylist and avoid redundant entry
               var categoryCollection = _contentCategoryContext.Fetch(x => x.ContentId == contentid).Select(x => x.CategoryId).ToList();
               if (categoryCollection.Any())
               {
                   var deleteCategory = categoryCollection.Except(categoryList.Select(x => x.Id)).ToList();
                   foreach (var deleteItem in deleteCategory)
                   {
                       var deleteCategoryId = _contentCategoryContext.FirstOrDefault(x => x.ContentId == contentid && x.CategoryId == deleteItem).Id;
                       _contentCategoryContext.Delete(deleteCategoryId);
                       _contentCategoryContext.SaveChanges();
                   }
               }

               //store category information on contentcategory table
               var contentCategory = new ContentCategory();

               foreach (var category in categoryList)
               {
                   bool isCategoryExist = _contentCategoryContext.Fetch(x => x.CategoryId == category.Id && x.ContentId == contentid).Any();
                   if (!isCategoryExist)
                   {
                       contentCategory.CategoryId = category.Id;
                       contentCategory.ContentId = contentid;
                       contentCategory.CreatedDateTime = DateTime.UtcNow;
                       contentCategory.IsDeleted = false;
                       _contentCategoryContext.Add(contentCategory);
                       _contentCategoryContext.SaveChanges();
                   }
               }

           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       #endregion

       #region tag
       /// <summary>
       /// add tag 
       /// </summary>
       /// <param name="tags"></param>
       /// <returns>tag object</returns>
       public Tags AddTag(Tags tags)
       {
           try
           {
               //redundant same name tag entry
               var tagExist = _tagContext.FirstOrDefault(x => x.Name == tags.Name);
               if (tagExist == null)
               {
                   var tag = new Tags
                   {
                       Name = tags.Name,
                   
                       IsDeleted = false,
                       CreatedDateTime = DateTime.UtcNow

                   };
                   _tagContext.Add(tag);
                   _tagContext.SaveChanges();
                   return tag;
               }
               else
               {
                   return tagExist;
               }
          }
           catch(Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
           
       }

       ///<summary>
       ///Save tag info in content tag table
       /// </summary>
       /// <param name="contentId"></param>
       /// <param name="tagList"></param>
    
      
       public void SaveContentTagInfo(int contentId,List<Tags> tagList)
       {
           try { 
           var tagCollection = _contentTagContext.Fetch(x => x.ContentId == contentId).Select(x => x.TagId).ToList();
           if (tagCollection.Any())
           {
               var deleteTag = tagCollection.Except(tagList.Select(x => x.Id)).ToList();
               foreach (var deleteItems in deleteTag)
               {
                   var deleteTagId = _contentTagContext.FirstOrDefault(x => x.ContentId == contentId && x.TagId == deleteItems).Id;
                   _contentTagContext.Delete(deleteTagId);
                   _contentTagContext.SaveChanges();
               }
           }

           //store tag information on contenttag and if tag is new than store its information in both table
           foreach (var tag in tagList)
           {
               var tagId = tag.Id == 0 ? AddTag(tag).Id : tag.Id;
               bool isTagExist = _contentTagContext.Fetch(x => x.TagId == tagId && x.ContentId == contentId).Any();
               if (!isTagExist)
               {
                   var contentTag = new ContentTags
                   {
                       ContentId = contentId,
                       TagId = tagId,
                       CreatedDateTime = DateTime.UtcNow,
                       IsDeleted = false

                   };

                   _contentTagContext.Add(contentTag);
                   _contentTagContext.SaveChanges();
               }

           }
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
           
       }

       /// <summary>
       /// Get Tag List
       /// </summary>
       /// <returns>tag list</returns>
       public List<Tags> GetTagList()
       {
           try 
           {
              var tagList = _tagContext.Fetch(x => !x.IsDeleted).ToList();

               return tagList;
           }
           catch(Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       /// <summary>
       /// Get Tag List by contentid
       /// </summary>
       /// <param name="contentId"></param>
       /// <returns>tag list</returns>
       public List<Tags> GetTagListById(int contentId)
       {
           try
           {
               var tagCollection = _tagContext.GetAll().ToList();
               var tagList = (from c in _contentTagContext.Fetch(x => x.ContentId == contentId).ToList()
                                   join
                                     t in tagCollection on c.TagId equals t.Id
                              select t).ToList();
               

               return tagList;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }
       #endregion

       #region Target
     
       /// <summary>
       /// add Target 
       /// </summary>
       /// <param name="target"></param>
       /// <returns>target object</returns>
       public Target AddTarget(Target target)
       {
           try
           {
               //redundant same name target entry
               var targetExist = _targetContext.FirstOrDefault(x => x.Name == target.Name);
               if (targetExist == null)
               {
                   var targets = new Target
                   {
                       Name = target.Name,
                       //  ContentId = contentId,
                       IsDeleted = false,
                       CreatedDateTime = DateTime.UtcNow

                   };
                   _targetContext.Add(targets);
                   _targetContext.SaveChanges();
                   return targets;
               }
               else
               {
                   return targetExist;
               }
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }

       }

       /// <summary>
       /// save target info in content target table
       /// </summary>
       /// <param name="contentId"></param>
       /// <param name="targetList"></param>
       /// <returns></returns>
       public void SaveContentTargetInfo(int contentId,List<Target> targetList)
       {
           try { 
           var targetCollection = _contentTargetContext.Fetch(x => x.ContentId == contentId).Select(x => x.TargetId).ToList();
           if (targetCollection.Any())
           {
               var deleteTarget = targetCollection.Except(targetList.Select(x => x.Id)).ToList();
               foreach (var deleteItems in deleteTarget)
               {
                   var deleteTargetId = _contentTargetContext.FirstOrDefault(x => x.ContentId == contentId && x.TargetId == deleteItems).Id;
                   _contentTargetContext.Delete(deleteTargetId);
                   _contentTargetContext.SaveChanges();
               }
           }
           //store target information on contenttarget table
           foreach (var target in targetList)
           {
               var targetId = target.Id == 0 ? AddTarget(target).Id : target.Id;
               bool isTargetExist = _contentTargetContext.Fetch(x => x.TargetId == target.Id && x.ContentId == contentId).Any();
               if (!isTargetExist)
               {
                   var contentTarget = new ContentTarget();

                   contentTarget.TargetId = targetId;
                   contentTarget.ContentId = contentId;
                   contentTarget.CreatedDateTime = DateTime.UtcNow;
                   contentTarget.IsDeleted = false;
                   _contentTargetContext.Add(contentTarget);
                   _contentTargetContext.SaveChanges();
               }
           }
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }

                   
       }

       /// <summary>
       /// Get target List
       /// </summary>
       /// <returns>target list</returns>
       public List<Target> GetTargetList()
       {
           try
           {
               var targetList = _targetContext.Fetch(x => !x.IsDeleted).ToList();

               return targetList;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }

       /// <summary>
       /// Get Target List by contentid
       /// </summary>
       /// <param name="contentId"></param>
       /// <returns>target list</returns>
       public List<Target> GetTargetListById(int contentId)
       {
           try
           {
               var targetCollection = _targetContext.GetAll().ToList();
               var targetList = (from c in _contentTargetContext.Fetch(x => x.ContentId == contentId).ToList()
                              join
                                t in targetCollection on c.TargetId equals t.Id
                              select t).ToList();

               return targetList;
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
               throw;
           }
       }
     
       #endregion

     

       #region "Dispose Method(s)"
       /// <summary>
        /// Method call when 
        /// </summary>
        public void Dispose()
        {
            try
            {
                GC.SuppressFinalize(this);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            finally
            {

            }
        }

        #endregion
   }
}

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Win32.SafeHandles;
using LearningCenter.DomainModel;
using LearningCenter.DomainModel.Models;

namespace LearningCenter.Test.Repository
{
   public class Database
    {
        #region "Private Member(s)"
       private static IEnumerable<ContentType> _contentType;
       private static IEnumerable<Category> _category;
       private static IEnumerable<Content> _contents; 
       private static IEnumerable<ELearningContent> _eLearningContent; 
       private static IEnumerable<Language> _language;
       private static IEnumerable<User> _user; 
       private static IEnumerable<Tags> _tags;
       private static IEnumerable<ContentTags> _contentTag;
       private static IEnumerable<ContentCategory> _contentCategory;
       private static IEnumerable<Target> _target;
       private static IEnumerable<ContentTarget> _contentTarget;
       private static IEnumerable<ELearningLecture> _eLearningLecture;
       private static IEnumerable<ELearningSection> _eLearningSection;
       private static IEnumerable<InteractiveQuestion> _interactiveQuestions;
       private static IEnumerable<InteractiveOptions> _interactiveOptions;
       private static IEnumerable<InteractiveResult> _interactiveResults;
       private static IEnumerable<ELearningSectionPage> _eLearningSectionPages; 
        #endregion


        #region "Public Method(s)"

        /// <summary>
        /// Method initializes the Database.
        /// </summary>
        public static void InitializeDatabase()
        {
            _contentType = new List<ContentType>
            {
                new ContentType 
                { 
                     Id = 1,
                     Name = "ELearning",
                     CreatedDateTime = DateTime.UtcNow,
                     IsDeleted = false
                   
                }
            };
            _category = new List<Category>
            {
               new Category {
                Id = 1,
                Name = "content",
                Description = "content description",
                CreatedDateTime = DateTime.UtcNow
            }, new Category
             {
                 Id = 2,
                 Name = "Physiotherapy",
                 Description = "",
                 CreatedDateTime = DateTime.UtcNow
             }, new Category
             {
                 Id = 3,
                 Name = "Nutrition",
                 Description = "content description",
                 CreatedDateTime = DateTime.UtcNow
             }, new Category
             {
                 Id = 4,
                 Name = "Dentist",
                 Description = "content description",
                 CreatedDateTime = DateTime.UtcNow
             }, new Category
             {
                 Id = 5,
                 Name = "Child Specialist",
                 Description = "content description",
                 CreatedDateTime = DateTime.UtcNow
             },
            new Category
            {
                Id = 6,
                Name = "Skin Specialist",
                Description = "content description",
                CreatedDateTime = DateTime.UtcNow
            },
            new Category
            {
                Id = 7,
                Name = "Orthopedic",
                Description = "content description",
                CreatedDateTime = DateTime.UtcNow
            }
            };
            _contentCategory = new List<ContentCategory> {
                new ContentCategory{
                    Id = 1,
                    CategoryId = 2,
                    ContentId = 1
                },
                new ContentCategory{
                    Id=2,
                    CategoryId = 3,
                    ContentId = 1
            }
            };
            _target = new List<Target> { 
                new Target{
                    Id=1,
                    Name = "Testing"

                },
                new Target{
                    Id=2,
                    Name="Basic"
                }
            };

            _contentTarget = new List<ContentTarget> { 
            
                new ContentTarget {
                    Id=1,
                    TargetId = 1,
                    ContentId = 1
                },
                new ContentTarget {
                    Id=1,
                    TargetId = 2,
                    ContentId = 1
                },
            };
            _language = new List<Language>
            {
                new Language 
                { 
                    Id = 1,
                Name = "English",
                CreatedDateTime = DateTime.UtcNow
                }
            };

            _user = new List<User> { 
            
                new User {
                    Id = 1,
                    UserName = "pooja@promactinfo.com",
                    Email = "pooja@promactinfo.com",
                    FirstName = "pooja",
                    LastName = "shah",
                   
                    Education= "B.E",
                    Experience = "1 yrs",
                    IsProfileCreated = true,
                    CreatedDateTime = DateTime.UtcNow,
                    IsDeleted = true
                    }, 
                
                new User {
                 Id = 2,
                    UserName = "kanan@promactinfo.com",
                    Email = "kanan@promactinfo.com",
                    FirstName = "kanan",
                    LastName = "shah",
                  
                    Education= "B.E",
                    Experience = "1 yrs",
                    IsProfileCreated = true,
                    CreatedDateTime = DateTime.UtcNow,
                    IsDeleted = true
                }
            };

            _tags = new List<Tags>
            {
                new Tags {
                    Id = 1,
                    Name = "physiotherapy",
                    IsDeleted = false,
                    CreatedDateTime = DateTime.UtcNow

                },
                new Tags {
                    Id = 2,
                    Name = "Homeopethy",
                    IsDeleted = false,
                    CreatedDateTime = DateTime.UtcNow

                },

            };
            _contentTag = new List<ContentTags>
            {
                new ContentTags{

                    Id = 1,
                    ContentId = 1,
                    TagId = 1
                },
                new ContentTags {
                    Id=2,
                    ContentId = 1,
                    TagId = 2
                }
            };
            _contents = new List<Content>
            {
             new Content {  
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
                Rate = 7,
                ELearningLecture = new Collection<ELearningLecture>()
            {
                                       new ELearningLecture()
                                                {
                                           Id = 1,
                                           ContentId = 1,
                                                    Title = "ELearning Content",
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false,
                                           ELearningSection = new Collection<ELearningSection>()
                                                {
                                                                 new ELearningSection
                                                 {
                                                                        Id = 1,
                                                                        ELearningLectureId = 1,
                                                                        Title = "ELearning Section",
                                                                        CreatedDateTime = DateTime.UtcNow,
                                                                        IsDeleted = false,
                                                                        ELearningSectionPage = new Collection<ELearningSectionPage>()
                                                  {
                                                                                                   new ELearningSectionPage()
                                                   {
                                                                                                       Id = 1,
                                                                                                       ELearningSectionId = 1,
                                                                                                       SectionContentFileGuid = "/Content/ContentImages/eLearningContent2.jpg",
                                                                                                      IsDeleted = false,
                                                                                                      CreatedDateTime = DateTime.UtcNow,
                                                                                                      SectionContentType = "image"
                                                                                                   }
                                                                                               }
                                                                        
                                                                     }
                                                              }
                                       }
                                   }
                                                      }
                                                   }  ;
            _eLearningLecture = new List<ELearningLecture>
            {
                new ELearningLecture 
                { 
                     Id = 1,
                     ContentId = 1,
                     Title = "ELearning Content",
                     CreatedDateTime = DateTime.UtcNow,
                     IsDeleted = false,
                     
                   
                },
                new ELearningLecture 
                { 
                     Id = 2,
                     ContentId = 2,
                     Title = "ELearning Content",
                     CreatedDateTime = DateTime.UtcNow,
                     IsDeleted = false
                   
                },
                new ELearningLecture 
                { 
                     Id = 3,
                     ContentId = 3,
                     Title = "ELearning Content",
                     CreatedDateTime = DateTime.UtcNow,
                     IsDeleted = false
                    
                   
                }
            };
            _eLearningSection = new List<ELearningSection>
                                {
                                    new ELearningSection
                                    {
                                        Id = 1,
                                        ELearningLectureId = 1,
                                        Title = "ELearning Section",
                                        CreatedDateTime = DateTime.UtcNow,
                                        IsDeleted = false
                                    },
                                    new ELearningSection
                                    {
                                        Id = 2,
                                        ELearningLectureId = 1,
                                        Title = "ELearning Section 2",
                                        CreatedDateTime = DateTime.UtcNow,
                                        IsDeleted = false
                                    }
                                };
            _eLearningSectionPages = new List<ELearningSectionPage>
                                     {
                                         new ELearningSectionPage
                                         {
                                              Id = 1,
                                              ELearningSectionId = 1,
                                              SectionContentFileGuid = "/Content/ContentImages/eLearningContent2.jpg",
                                              IsDeleted = false,
                                              CreatedDateTime = DateTime.UtcNow,
                                              SectionContentType = "image"
                                             
                                         }
                                     };
            _interactiveQuestions = new List<InteractiveQuestion>
                                   {
                                       new InteractiveQuestion
                                       {
                                           Id = 1,
                                           Text = "abc test ?",
                                           ELearningSectionPageId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false,
                                           InteractiveOptions = new Collection<InteractiveOptions>()
                                                               {
                                                                   new InteractiveOptions()
                                                                   {
                                                                       Id = 1,
                                           InteractiveQuestionId = 1,
                                           Option = "a",
                                           ParentInteractiveOptionId = 0,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                                                   },
                                                                    new InteractiveOptions
                                       {
                                           Id = 2,
                                           InteractiveQuestionId = 1,
                                           Option = "b",
                                           ParentInteractiveOptionId = 0,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 3,
                                           InteractiveQuestionId = 1,
                                           Option = "c",
                                           ParentInteractiveOptionId = 0,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 4,
                                           InteractiveQuestionId = 1,
                                           Option = "x",
                                           ParentInteractiveOptionId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 5,
                                           InteractiveQuestionId = 1,
                                           Option = "y",
                                           ParentInteractiveOptionId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },new InteractiveOptions
                                       {
                                           Id = 6,
                                           InteractiveQuestionId = 1,
                                           Option = "z",
                                           ParentInteractiveOptionId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       }

                                                               }
                                       }
                                   };
            _interactiveOptions = new List<InteractiveOptions>
                                   {
                                       new InteractiveOptions
                                       {
                                           Id = 1,
                                           InteractiveQuestionId = 1,
                                           Option = "a",
                                           ParentInteractiveOptionId = 0,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 2,
                                           InteractiveQuestionId = 1,
                                           Option = "b",
                                           ParentInteractiveOptionId = 0,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 3,
                                           InteractiveQuestionId = 1,
                                           Option = "c",
                                           ParentInteractiveOptionId = 0,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 4,
                                           InteractiveQuestionId = 1,
                                           Option = "x",
                                           ParentInteractiveOptionId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },
                                       new InteractiveOptions
                                       {
                                           Id = 5,
                                           InteractiveQuestionId = 1,
                                           Option = "y",
                                           ParentInteractiveOptionId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       },new InteractiveOptions
                                       {
                                           Id = 6,
                                           InteractiveQuestionId = 1,
                                           Option = "z",
                                           ParentInteractiveOptionId = 1,
                                           CreatedDateTime = DateTime.UtcNow,
                                           IsDeleted = false
                                       }
                                   };
            _interactiveResults = new List<InteractiveResult>
                                 {
                                     new InteractiveResult
                                     {
                                         Id = 1,
                                         InteractiveQuestionId = 1,
                                         InteractiveOptionId = 6,
                                         UserId = 1,
                                         CreatedDateTime = DateTime.UtcNow,
                                         IsDeleted = false
                                     }
                                 };
            _eLearningContent = new List<ELearningContent> 
                            {
                                new ELearningContent
                                {
                                    Id=1,
                                    ContentId = 1,
                                    
                                    
                                }
                              
                            };
        }

        /// <summary>
        /// Method fetches the particluar model data from the database.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static IEnumerable<T> GetAll<T>()
        {
            if (typeof(T) == typeof(ContentType))
            {
                return (IEnumerable<T>)(_contentType);
            }
            else if (typeof(T) == typeof(Category))
            {
                return (IEnumerable<T>)(_category);
            }
            else if(typeof(T) == typeof(Content))
            {
                return (IEnumerable<T>) (_contents);
            }
            else if (typeof(T) == typeof(User))
            {
                return (IEnumerable<T>) (_user);
            }
            else if(typeof(T) == typeof(ELearningLecture))
            {
                return (IEnumerable<T>) (_eLearningLecture);
            }
            else if (typeof(T) == typeof(ELearningSection))
            {
                return (IEnumerable<T>) (_eLearningSection);
            }
            
             else if (typeof(T) == typeof(Tags))
            {
                return (IEnumerable<T>)(_tags);
            }
            else if (typeof(T) == typeof(ContentTags))
            {
                return (IEnumerable<T>)(_contentTag);
            }
            else if (typeof(T) == typeof(ContentCategory))
            {
                return (IEnumerable<T>)(_contentCategory);
            }
            else if (typeof(T) == typeof(Target))
            {
                return (IEnumerable<T>)(_target);
            }
            else if (typeof(T) == typeof(ContentTarget))
            {
                return (IEnumerable<T>)(_contentTarget);
            }
            else if (typeof(T) == typeof(ELearningSectionPage))
            {
                return (IEnumerable<T>)(_eLearningSectionPages);
            }
            else if (typeof(T) == typeof(InteractiveQuestion))
            {
                return (IEnumerable<T>)(_interactiveQuestions);
            }
            else if (typeof(T) == typeof(InteractiveOptions))
            {
                return (IEnumerable<T>)(_interactiveOptions);
            }
            else if (typeof(T) == typeof(InteractiveResult))
            {
                return (IEnumerable<T>)(_interactiveResults);
            }
            else if (typeof(T) == typeof(ELearningContent))
            {
                return (IEnumerable<T>)(_eLearningContent);
            }
           
            return null;
        }

        #endregion
    }
}

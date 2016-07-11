using LearningCenter.DomainModel.DataContext;
using LearningCenter.DomainModel.Models;

namespace LearningCenter.DomainModel.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<LearningCenterDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(LearningCenterDataContext context)
        {
            //#region ContentType

            context.ContentType.AddOrUpdate(x => x.Id, new ContentType
            {
                Id = 1,
                Name = "ELearning",
                CreatedDateTime = DateTime.UtcNow
            });
            context.SaveChanges();
            //#endregion

            //#region Category

            context.Category.AddOrUpdate(x => x.Id, new Category
            {
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

            );
            context.SaveChanges();

            //#endregion

            //#region Language

            context.Language.AddOrUpdate(x => x.Id, new Language
            {
                Id = 1,
                Name = "English",
                CreatedDateTime = DateTime.UtcNow
            });
            context.SaveChanges();
            //#endregion

            //#region country

        }
    }
}

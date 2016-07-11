using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using LearningCenter.DomainModel.Models;

namespace LearningCenter.DomainModel.DataContext
{
    public class ELearningUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ELearningUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }
    public class LearningCenterDataContext : IdentityDbContext<ELearningUser>
    {
        public LearningCenterDataContext()
            : base("LearningCenterDataContext", throwIfV1Schema: false)
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ELearningContent>()
                    .HasRequired(n => n.Content)
                     .WithMany()
                     .HasForeignKey(i => i.ContentId)
                     .WillCascadeOnDelete(false);

            modelBuilder.Entity<ContentComment>()
                .HasRequired(n => n.User)
                .WithMany()
                .HasForeignKey(i => i.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<InteractiveResult>()
                .HasRequired(n => n.User)
                .WithMany()
                .HasForeignKey(i => i.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<InteractiveResult>()
               .HasRequired(n => n.InteractiveOptions)
               .WithMany()
               .HasForeignKey(i => i.InteractiveOptionId)
               .WillCascadeOnDelete(false);

            modelBuilder.Entity<InteractiveResult>()
              .HasRequired(n => n.IntrectiveQuestion)
              .WithMany()
              .HasForeignKey(i => i.InteractiveQuestionId)
              .WillCascadeOnDelete(false);


            modelBuilder.Entity<ContentCategory>()
                .HasRequired(n => n.Category)
                .WithMany()
                .HasForeignKey(i => i.CategoryId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ContentTags>()
               .HasRequired(n => n.Tags)
               .WithMany()
               .HasForeignKey(i => i.TagId)
               .WillCascadeOnDelete(false);

            modelBuilder.Entity<ContentTarget>()
              .HasRequired(n => n.Target)
              .WithMany()
              .HasForeignKey(i => i.TargetId)
              .WillCascadeOnDelete(false);



            base.OnModelCreating(modelBuilder);

        }

        public DbSet<Category> Category { get; set; }
        public DbSet<Content> Content { get; set; }
        public DbSet<ContentComment> ContentComment { get; set; }
        public DbSet<ContentPlanType> ContentPlanType { get; set; }
        public DbSet<ContentType> ContentType { get; set; }
        public DbSet<ELearningContent> ELearningContent { get; set; }
        public DbSet<Tags> Tags { get; set; }
        public DbSet<ContentTags> ContentTags { get; set; }
        public DbSet<Target> Target { get; set; }
        public DbSet<ContentTarget> ContentTarget { get; set; }
        public DbSet<ELearningLecture> ELearningLecture { get; set; }
        public DbSet<ELearningSection> ELearningSection { get; set; }
        public DbSet<ELearningSectionPage> ELearningSectionPage { get; set; }
        public DbSet<InviteeUsers> InviteeUsers { get; set; }
        public DbSet<Language> Language { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<InteractiveOptions> InteractiveOptions { get; set; }
        public DbSet<InteractiveQuestion> InteractiveQuestion { get; set; }
        public DbSet<InteractiveResult> InteractiveResult { get; set; }

        public DbSet<UserInvitee> UserInvitee { get; set; }

        public static LearningCenterDataContext Create()
        {
            return new LearningCenterDataContext();
        }
    }
}

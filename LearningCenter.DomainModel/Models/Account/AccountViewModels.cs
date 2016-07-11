using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearningCenter.Utility.Constants;

namespace LearningCenter.DomainModel.Models.Account
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {

        [Required(ErrorMessage = MessageResourceConstants.PasswordRequired)]
        [StringLength(100, ErrorMessage = MessageResourceConstants.PasswordLength, MinimumLength = 8)]
        [DataType(DataType.Password)]

        public string Password { get; set; }

        [Required(ErrorMessage = MessageResourceConstants.ConfirmPasswordRequired)]
        [DataType(DataType.Password)]

        [Compare("Password", ErrorMessage = MessageResourceConstants.PasswordNotMatch)]
        public string ConfirmPassword { get; set; }


        [Required(ErrorMessage = MessageResourceConstants.EmailRequired)]
        [EmailAddress(ErrorMessage = MessageResourceConstants.InvalidEmail)]
        [StringLength(256)]
        public string Email { get; set; }

        [Required(ErrorMessage = MessageResourceConstants.FirstNameRequired)]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = MessageResourceConstants.LastNameRequired)]
        [StringLength(50)]
        public string LastName { get; set; }


        public string UserRoles { get; set; }

        [NotMapped]
        public bool IsCreator { get; set; }

        [NotMapped]
        public bool IsValidToken { get; set; }

    }

    public class ResetPasswordViewModel
    {
        // [Required]
        [EmailAddress]
        //   [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = MessageResourceConstants.PasswordRequired)]
        [StringLength(100, ErrorMessage = MessageResourceConstants.PasswordLength, MinimumLength = 8)]
        [DataType(DataType.Password)]
        // [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        // [Display(Name = "Confirm password")]
        [Required(ErrorMessage = MessageResourceConstants.ConfirmPasswordRequired)]
        [Compare("Password", ErrorMessage = MessageResourceConstants.PasswordNotMatch)]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = MessageResourceConstants.EmailRequired)]
        [EmailAddress(ErrorMessage = MessageResourceConstants.InvalidEmail)]
        //    [Display(Name = "Email:")]
        public string Email { get; set; }
    }
}

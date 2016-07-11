using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningCenter.Utility.Constants
{
   public class MessageResourceConstants
    {
       public const string UserDoesnotExist = "does not exist ";

       public const string ExternalUserDoesnotForgetPassword = "External user can't do forget password.";

       public const string SendEmailFailure = "There is some server issue so can't do forget password at this time please try after some time.";

       public const string InvitationMailFailure = "There is some server issue so can't send mail at this time please try after some time.";

       public const string AlreadyTaken = "is already taken";

       public const string Email = "Email:";

       public const string PasswordRequired = "Password is required";

       public const string  ConfirmPasswordRequired = "Confirm Password is required";

       public const string PasswordNotMatch = "The password and confirmation password do not match.";

       public const string EmailRequired = "Email is required";

       public const string  InvalidEmail = "Invalid Email Address";

       public const string FirstNameRequired = "First Name is required";

       public const string LastNameRequired = "Last Name is required";

       public const string NameRequired = "Name is required.";

       public const string PasswordLength = "The {0} must be at least {2} characters long.";

       public const string EmailRegisteredAsBuyer = "This email is already registered as a buyer.";

       public const string EmailRegistred = "This email is already registered.";

       public const string InvitationSent = "Invitation sent successfully.";

       public const string  EmailAlreadyRegisteredAsCreator = "This email is already registered in LearningCenter as a course creator.";

       public const string InvalidEmailPassword = "Invalid Email Address and Password.";

       public const string  IncorrectEmailOrPassword = "The email or password you entered is incorrect.";
    }
}

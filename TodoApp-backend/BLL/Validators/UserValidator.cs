using DTOS;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BLL.Validators
{
    public class UserValidator:AbstractValidator<UserToLoginDTO>
    {
        public UserValidator()
        {
            RuleFor(e => e.Username)
                .NotEmpty().NotNull().WithMessage("Username is required");
            RuleFor(e => e.Password).NotEmpty().WithMessage("Password is required")
                                  .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
                                  .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
                                  .Matches(@"[!@#$%^&*(),.?""{}|<>]").WithMessage("Password must contain at least one speacial character.");

        }

    }
    public class UserToRegisterValidator : AbstractValidator<UserToRegisterDTO>
    {
        public UserToRegisterValidator()
        {
            RuleFor(e => e.Username)
                .NotEmpty().NotNull().WithMessage("Username is required")
                .Must(BeAValidNameOrEmail).WithMessage("Username must be a valid name or email address.");

            RuleFor(e => e.Password).NotEmpty().WithMessage("Password is required")
                                   .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
                                   .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
                                   .Matches(@"[!@#$%^&*(),.?""{}|<>]").WithMessage("Password must contain at least one special character.");
        }

        private bool BeAValidNameOrEmail(string username)
        {
            if (string.IsNullOrEmpty(username))
                return false;

            var isEmail = Regex.IsMatch(username, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            var isName = Regex.IsMatch(username, @"^[^\s]+$");

            return isEmail || isName;
        }
    }
}

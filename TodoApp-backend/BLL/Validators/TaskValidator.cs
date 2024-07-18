using DTOS;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Validators
{
    public class TaskValidator:AbstractValidator<UserToAddDTO>
    {
        public TaskValidator() {
            RuleFor(t=>t.Title).NotEmpty().NotNull().WithMessage("Title Cannot be Empty")
            .Must(title => !string.IsNullOrWhiteSpace(title)).WithMessage("Title cannot be just whitespace");

            RuleFor(t => t.Description)
            .NotEmpty().WithMessage("Description cannot be empty")
            .Must(description => !string.IsNullOrWhiteSpace(description)).WithMessage("Description cannot be just whitespace");


        }
    }
}

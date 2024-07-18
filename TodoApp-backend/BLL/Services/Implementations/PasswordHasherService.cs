using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implementations
{
    public class PasswordHasherService : IPasswordHasherService
    {
        private readonly IPasswordHasher<string> _passwordHasher;
        public PasswordHasherService(IPasswordHasher<string> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }
        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword("", password);
        }

        public bool VerifyPassword(string password, string providedPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(null, password, providedPassword);
            return result == PasswordVerificationResult.Success;
        }
    }
}

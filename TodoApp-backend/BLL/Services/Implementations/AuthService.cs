using BLL.Services.Interfaces;
using DAL.Repositories.Interfaces;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using DAL.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using DTOS;

namespace BLL.Services.Implementations
{
    public class AuthService:IAuthService
    {
        private readonly IPasswordHasherService _passwordHasherService;
        private readonly IUserRepository _userRepository;
        public AuthService(IPasswordHasherService passwordHasherService,IUserRepository userRepository)
        {

            _passwordHasherService = passwordHasherService;
            _userRepository = userRepository;

        }
        public async Task<UserToReturnDTO> LoginAsync(UserToLoginDTO userToLoginDTO)
        {  
            if (await CheckUsernameExists(userToLoginDTO.Username)==false)
            {
                throw new ValidationException("Username is not available");
            }
            var loginedUser =await  _userRepository.GetUser(userToLoginDTO);
            string storedHashedPassword = GetStoredHashedPassword(userToLoginDTO.Username);
            bool isPasswordValid = _passwordHasherService.VerifyPassword(storedHashedPassword, userToLoginDTO.Password);
            if (!isPasswordValid)
            {
                throw new ValidationException("Invalid Credentials");
            }
            string token = CreateJwt(loginedUser);
         
             var user = new UserToReturnDTO
             {
                Token = token,
                UserName = userToLoginDTO.Username,
                Message = "Login Success",
                UserId= loginedUser.UserId
             };
            return user;
        }
        public async Task<UserToRegisterDTO> RegisterAsync(UserToRegisterDTO userToRegisterDTO)
        {

            if (await CheckUsernameExists(userToRegisterDTO.Username))
            {
                throw new ValidationException("Username Already Exists");
            }

            var hashedPassword = _passwordHasherService.HashPassword(userToRegisterDTO.Password);
            userToRegisterDTO.Password = hashedPassword;
            await _userRepository.AddUserAsync(userToRegisterDTO);
            return userToRegisterDTO;
        }
        private async Task<bool> CheckUsernameExists(string username)
        {
          return  await  _userRepository.CheckUsernameExists(username);
        }
        private string GetStoredHashedPassword(string username)
        {
            return _userRepository.GetStoredHashedPassword(username);
        }
        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("a1b2c3d4e5f67890123456789abcdef0");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),

            }) ;
            
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(10),
                SigningCredentials = credentials
            };
            var jwt = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(jwt);


        }



    }
}

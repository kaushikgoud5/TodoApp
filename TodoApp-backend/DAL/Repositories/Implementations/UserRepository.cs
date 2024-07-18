using DAL.DataContext;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using DTOS;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class UserRepository:IUserRepository
    { 
       private readonly AppDbContext _appDbContext;
       public UserRepository(AppDbContext appDbContext) {_appDbContext = appDbContext;}
        public async Task<User> AddUserAsync(UserToRegisterDTO userToRegisterDTO)
        {

            var user = new User {
                Password = userToRegisterDTO.Password,
                Username = userToRegisterDTO.Username,
                CreatedOn = DateTime.UtcNow.AddHours(5.5)
                };
            await _appDbContext.Users.AddAsync(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }
        public async Task<bool> CheckUsernameExists(string username)
        {
            return await _appDbContext.Users.AnyAsync(x => x.Username == username);
        }
       public  string GetStoredHashedPassword(string username)
        {
            var user = _appDbContext.Users.FirstOrDefault(x => x.Username == username);
            return user!.Password;
        }

        public async Task<User> GetUser(UserToLoginDTO userToLoginDTO)
        {
            return await _appDbContext.Users.FirstOrDefaultAsync(x => x.Username == userToLoginDTO.Username);

        }
 


    }
}

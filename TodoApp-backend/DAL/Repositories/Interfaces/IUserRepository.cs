using DAL.Entities;
using DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(UserToRegisterDTO userToRegisterDTO);
        Task<bool> CheckUsernameExists(string username);

        string GetStoredHashedPassword(string username);
        Task<User> GetUser(UserToLoginDTO userToLoginDTO);
      /*  bool isRefreshTokenAvailable();*/
    }
}

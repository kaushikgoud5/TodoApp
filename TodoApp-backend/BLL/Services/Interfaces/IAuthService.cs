using DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserToReturnDTO> LoginAsync(UserToLoginDTO userToLoginDTO);
        Task<UserToRegisterDTO> RegisterAsync(UserToRegisterDTO userToRegisterDTO);
    }
}

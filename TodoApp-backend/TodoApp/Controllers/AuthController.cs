using BLL.Services.Interfaces;
using DTOS;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService= authService;  
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserToLoginDTO userToLoginDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = await _authService.LoginAsync(userToLoginDTO);
                return Ok(user);
            }

            catch (Exception ex)
            {
                Log.Error("Login Failed", ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserToRegisterDTO userToRegisterDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _authService.RegisterAsync(userToRegisterDTO);
                Log.Information("Register Succes=>{@user}",user);
                return Ok(new {Message="Registered Successfully"});    
            }
            catch(Exception ex)
            {
                Log.Error("Register Failed", ex.Message);

                return BadRequest(ex.Message);
            }
        }


    }
}

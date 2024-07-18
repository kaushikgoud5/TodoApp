using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TodoApp.CustomMiddlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly IConfiguration Configuration;
        public JwtMiddleware(RequestDelegate next,IConfiguration configuration) {
            _next = next;
            Configuration = configuration;
        }
        public async Task Invoke(HttpContext context) {


            if (context.Request.Path.Value.Split("/").Contains("login")|| context.Request.Path.Value.Split("/").Contains("register"))
                {
                    await _next(context);
                    return;
                }

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(' ').LastOrDefault();
            if(token != null) {
                try
                {
                    var tokenValiationParams = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Configuration["AppSettings:Token"])),
                        ValidateAudience = false,
                        ValidateIssuer = false,
                    };

                    var principal = ValidateToken(token, tokenValiationParams);

                    if (principal != null)
                    {
                        context.User = principal;
                        context.Response.StatusCode = 200;

                    }
                    else
                    {
                        context.Response.StatusCode = 401;
                        return;
                    }
                }
                catch (Exception ex)
                {
                    context.Response.StatusCode = 401;
                    return;
                }
            }
         
            await _next(context);

        }
        private ClaimsPrincipal ValidateToken(string token, TokenValidationParameters validationParameters)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}

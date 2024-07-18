using BLL.Services.Implementations;
using BLL.Services.Interfaces;
using DAL.DataContext;
using DAL.Repositories.Implementations;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Services.Implementations;
using Services.Services.Interfaces;

namespace TodoApp.Extensions
{
    public static class ServicesExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpContextAccessor();
            services.AddSingleton<IPasswordHasher<string>, PasswordHasher<string>>();
            services.AddTransient<IPasswordHasherService, PasswordHasherService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<ICachingService, CachingService>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddDbContext<AppDbContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });


            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["AppSettings:Token"])),
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ClockSkew = TimeSpan.Zero


                };
            });


            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200", "http://localhost:56059", "https://todoappangular.azurewebsites.net", "http://localhost:65427", "https://todoapp20240709173028.azurewebsites.net")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

        }
    }
}

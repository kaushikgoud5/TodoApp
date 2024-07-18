using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Serilog;
using Services.Services.Interfaces;
using System.Security.Claims;

namespace Services.Services.Implementations
{
    public class CachingService : ICachingService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IHttpContextAccessor _httpContext;

        public CachingService(IMemoryCache memoryCache, IHttpContextAccessor httpContext)
        {
            _memoryCache = memoryCache;
            _httpContext = httpContext;
        }
        public async Task<IList<Todo>> GetorSetCacheAsync(string cacheKey, Func<Task<IList<Todo>>> getTasks, MemoryCacheEntryOptions memoryCacheEntryOptions)
        {
            if (_memoryCache.TryGetValue(cacheKey, out IList<Todo> cacheEntry))
            {
                Log.Information($"Cache: {cacheKey} Found in Cache");
            }
            else
            {
                Log.Information("Not Found in Cache Fetching it from DB");
                cacheEntry = await getTasks();
                _memoryCache.Set(cacheKey, cacheEntry, memoryCacheEntryOptions);
            }
            return cacheEntry!;
        }

        public void DeleteCache()
        {
            var userIdClaim = _httpContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var cacheKey = $"TodoTasks_{userIdClaim}";
            _memoryCache.Remove(cacheKey);
        }

    }
}

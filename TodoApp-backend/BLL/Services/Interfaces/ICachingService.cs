using DAL.Entities;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services.Interfaces
{
    public interface ICachingService
    {
        Task<IList<Todo>> GetorSetCacheAsync(string cacheKey,Func<Task<IList<Todo>>> getTasks,MemoryCacheEntryOptions memoryCacheEntryOptions);
        void DeleteCache();
    }
}

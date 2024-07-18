using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using DTOS;
using Microsoft.Extensions.Caching.Memory;
using Services.Services.Interfaces;

namespace BLL.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _todoRepository;
        private readonly ICachingService _cachingService;

        public TaskService(ITaskRepository todoRepositary,ICachingService cachingService)
        {
            _todoRepository = todoRepositary;
            _cachingService = cachingService;
        }

        public async Task<Todo> AddTodoAsync(UserToAddDTO userToAddDTO)
        {
            _cachingService.DeleteCache();
            return await _todoRepository.AddTodoAsync(userToAddDTO);
        }
        public async Task<IList<Todo>> GetTodos(int userId)
        {
            var cacheKey = $"TodoTasks_{userId}";
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                                    .SetSlidingExpiration(TimeSpan.FromSeconds(45))
                                    .SetAbsoluteExpiration(TimeSpan.FromSeconds(3600))
                                    .SetPriority(CacheItemPriority.Normal);
            return await _cachingService.GetorSetCacheAsync(cacheKey, () => _todoRepository.GetTodos(userId), cacheEntryOptions);
            //return await _todoRepository.GetTodos(userId);
        }
        public async Task<Todo> UpdateStatus(int id)
        {
            _cachingService.DeleteCache();
            return await _todoRepository.UpdateStatus(id);
        }
        public async Task<Todo> DeleteTask(int id)
        {
            _cachingService.DeleteCache();
            return await _todoRepository.DeleteTaskAsync(id);
        }
        public Task UpdateTaskAsync(int id, UserToAddDTO todo)
        {
            _cachingService.DeleteCache();
            return _todoRepository.UpdateTaskAsync(id, todo);
        }
        public Task DeleteAllTasksAsync(int userId)
        {
            _cachingService.DeleteCache();
            return _todoRepository.DeleteAllTaskAsync(userId);
        }


    }
}

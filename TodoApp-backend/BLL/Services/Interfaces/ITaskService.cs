using DAL.Entities;
using DTOS;

namespace BLL.Services.Interfaces
{
    public interface ITaskService
    {
        Task<Todo> AddTodoAsync(UserToAddDTO userToAddDTO);
        Task DeleteAllTasksAsync(int id);
        Task<Todo> DeleteTask(int id);
        Task<IList<Todo>> GetTodos(int id);
        Task<Todo> UpdateStatus(int id);
        Task UpdateTaskAsync(int id, UserToAddDTO todo);
    }
}
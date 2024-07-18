using DAL.Entities;
using DTOS;

namespace DAL.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<Todo> AddTodoAsync(UserToAddDTO userToAddDTO);
        Task DeleteAllTaskAsync(int id);
        Task<Todo> DeleteTaskAsync(int id);
        Task<IList<Todo>> GetTodos(int id);
        Task<Todo> UpdateStatus(int id);
        Task UpdateTaskAsync(int id, UserToAddDTO todo);
    }
}
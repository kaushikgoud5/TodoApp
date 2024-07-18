using DAL.DataContext;
using DAL.Entities;
using DAL.Enums;
using DAL.Repositories.Interfaces;
using DTOS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _appDbContext;
        public TaskRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Todo> AddTodoAsync(UserToAddDTO userToAddDTO)
        {
            var todo = new Todo
            {
                Description = userToAddDTO.Description,
                Title = userToAddDTO.Title,
                UserId = userToAddDTO.UserId,
                Status = TodoStatus.Active,
                CreatedBy = userToAddDTO.UserId,
                CreatedOn = DateTime.UtcNow.AddHours(5.5),
                IsDeleted = false
            };
            await _appDbContext.AddAsync(todo);
            await _appDbContext.SaveChangesAsync(); 
            return todo;
        }

        public async  Task<IList<Todo>> GetTodos(int id)
        {
            var todo = await _appDbContext.Todos.Where(e => e.UserId == id && !e.IsDeleted).OrderBy(e=>e.Status==TodoStatus.Completed).ToListAsync();
            return todo;
        }
      public async  Task<Todo> UpdateStatus(int id)
        {
            var item = await _appDbContext.Todos.FindAsync(id);
            if (item == null)
            {
                throw new Exception("Not Found");
            }

            item.Status = TodoStatus.Active == item.Status ? TodoStatus.Completed : TodoStatus.Active;
            await _appDbContext.SaveChangesAsync();
            return item;

        }
        public async Task<Todo> DeleteTaskAsync(int id)
        {
            var todo = await _appDbContext.Todos.FirstOrDefaultAsync(x => x.Id == id);
            if (todo == null)
            {
                throw new Exception("Not Found");
            }
            todo.IsDeleted=true;
             _appDbContext.Todos.Update(todo);
             await _appDbContext.SaveChangesAsync();
            return todo;
            
        }
       public async Task UpdateTaskAsync(int id, UserToAddDTO todo) {
            var task = await _appDbContext.Todos.FirstOrDefaultAsync(x => x.Id == id);
            if (task == null)
            {
                throw new Exception("Not Found");
            }
            task.Title = todo.Title;
            task.Description = todo.Description;
            task.ModifiedBy = todo.UserId;
            task.ModifiedOn = DateTime.UtcNow.AddHours(5.5);
            _appDbContext.Update(task);
            _appDbContext.SaveChanges();
        }
        public async Task DeleteAllTaskAsync(int userId)
        {
           var todos=  _appDbContext.Todos.Where(e => e.UserId == userId && !e.IsDeleted);
            foreach (var todo in todos)
            {
                todo.IsDeleted = true;
            }
            await _appDbContext.SaveChangesAsync();

        }

    }
}

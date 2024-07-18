using BLL.Services.Interfaces;
using DAL.Entities;
using DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Serilog;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly ITaskService _todoService;
        public TodoController(ITaskService todoService)
        {
            _todoService = todoService;

        }

        [HttpPost("AddTask")]
        public async Task<IActionResult> AddTask(UserToAddDTO userToAddDTO)
        {
            try
            {
                var todo = await _todoService.AddTodoAsync(userToAddDTO);
                return Ok(todo);
            }
            catch (Exception e)
            {
               return BadRequest(e);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodos(int id)
        {
            try
            {
                var tasks = await _todoService.GetTodos(id);
                return Ok(tasks);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id)
        {
            try
            {
                var todo = await _todoService.UpdateStatus(id);
              return Ok(new { Message = "Status Changed" });
            }
            catch (Exception ex)
            {
              return BadRequest(ex.Message);
            }


        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var todo = await _todoService.DeleteTask(id);
                Log.Information("Task Deleted Successfully=>{@todo}", todo);
                return Ok(new { Message = "Deleted Successfully" });
            }
            catch (Exception ex)
            {
                Log.Error("Error", ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateTask/{id}")]
        public async Task<IActionResult> UpdateTaskAsync(int id,UserToAddDTO todo)
        {
            try{
                await _todoService.UpdateTaskAsync(id,todo);
                Log.Information("Task Updated Successfully=>{@todo}", todo);
                return Ok(new { Message = "Updated Successfully" });
            }
            catch (Exception ex)
            {Log.Error("Error", ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteAll/{userId}")]
        public async Task<IActionResult> DeleteAllAsync(int userId)
        {
            try
            {
                 await _todoService.DeleteAllTasksAsync(userId);
/*                Log.Information("Task Deleted Successfully");
*/
                return Ok(new { Message = "Deleted Successfully" });
            }
            catch (Exception ex)
            {
/*                Log.Error("Error", ex.Message);
*/                return BadRequest(ex.Message);
            }
        }

        

    }
}

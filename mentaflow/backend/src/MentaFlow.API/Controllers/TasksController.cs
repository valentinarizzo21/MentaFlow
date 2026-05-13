using MentaFlow.Application.DTOs.Tasks;
using MentaFlow.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MentaFlow.API.Controllers;

public class TasksController(TaskService taskService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status = null) =>
        Ok(await taskService.GetAllAsync(CurrentUserId, status));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await taskService.CreateAsync(CurrentUserId, request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await taskService.UpdateAsync(CurrentUserId, id, request);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await taskService.DeleteAsync(CurrentUserId, id);
        return result.Success ? Ok(result) : NotFound(result);
    }
}

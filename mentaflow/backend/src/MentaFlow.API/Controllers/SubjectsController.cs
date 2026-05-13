using MentaFlow.Application.DTOs.Subjects;
using MentaFlow.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MentaFlow.API.Controllers;

public class SubjectsController(SubjectService subjectService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeArchived = false) =>
        Ok(await subjectService.GetAllAsync(CurrentUserId, includeArchived));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await subjectService.GetByIdAsync(CurrentUserId, id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSubjectRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await subjectService.CreateAsync(CurrentUserId, request);
        return result.Success ? CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result) : BadRequest(result);
    }

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSubjectRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await subjectService.UpdateAsync(CurrentUserId, id, request);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await subjectService.DeleteAsync(CurrentUserId, id);
        return result.Success ? Ok(result) : NotFound(result);
    }
}

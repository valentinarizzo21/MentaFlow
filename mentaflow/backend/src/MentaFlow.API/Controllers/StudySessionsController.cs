using MentaFlow.Application.DTOs.StudySessions;
using MentaFlow.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MentaFlow.API.Controllers;

public class StudySessionsController(StudySessionService sessionService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? subjectId = null) =>
        Ok(await sessionService.GetAllAsync(CurrentUserId, subjectId));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStudySessionRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await sessionService.CreateAsync(CurrentUserId, request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await sessionService.DeleteAsync(CurrentUserId, id);
        return result.Success ? Ok(result) : NotFound(result);
    }
}

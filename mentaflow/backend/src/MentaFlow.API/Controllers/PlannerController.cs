using MentaFlow.Application.DTOs.Planner;
using MentaFlow.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MentaFlow.API.Controllers;

public class PlannerController(PlannerService plannerService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetByRange([FromQuery] DateTime from, [FromQuery] DateTime to) =>
        Ok(await plannerService.GetByRangeAsync(CurrentUserId, from, to));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePlannerEventRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await plannerService.CreateAsync(CurrentUserId, request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await plannerService.DeleteAsync(CurrentUserId, id);
        return result.Success ? Ok(result) : NotFound(result);
    }
}

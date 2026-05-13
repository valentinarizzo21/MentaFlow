using MentaFlow.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MentaFlow.API.Controllers;

public class StatsController(StatsService statsService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await statsService.GetAsync(CurrentUserId);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpPatch("weekly-target")]
    public async Task<IActionResult> UpdateWeeklyTarget([FromBody] int targetMinutes)
    {
        if (targetMinutes < 30 || targetMinutes > 10080)
            return BadRequest("L'obiettivo deve essere tra 30 minuti e 168 ore.");

        var result = await statsService.UpdateWeeklyTargetAsync(CurrentUserId, targetMinutes);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}

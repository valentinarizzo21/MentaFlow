using MentaFlow.Application.Common;
using MentaFlow.Application.DTOs.Planner;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentaFlow.Application.Services;

public class PlannerService(IAppDbContext db)
{
    public async Task<ApiResponse<IEnumerable<PlannerEventDto>>> GetByRangeAsync(int userId, DateTime from, DateTime to)
    {
        var events = await db.PlannerEvents
            .Where(e => e.UserId == userId && e.StartTime >= from && e.StartTime <= to)
            .Include(e => e.Subject)
            .OrderBy(e => e.StartTime)
            .Select(e => ToDto(e))
            .ToListAsync();

        return ApiResponse<IEnumerable<PlannerEventDto>>.Ok(events);
    }

    public async Task<ApiResponse<PlannerEventDto>> CreateAsync(int userId, CreatePlannerEventRequest request)
    {
        var ev = new PlannerEvent
        {
            UserId = userId,
            SubjectId = request.SubjectId,
            Title = request.Title,
            Description = request.Description,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            IsAllDay = request.IsAllDay,
            Color = request.Color,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.PlannerEvents.Add(ev);
        await db.SaveChangesAsync();

        if (ev.SubjectId.HasValue)
            await db.PlannerEvents.Entry(ev).Reference(e => e.Subject).LoadAsync();

        return ApiResponse<PlannerEventDto>.Ok(ToDto(ev), "Evento creato.");
    }

    public async Task<ApiResponse> DeleteAsync(int userId, int id)
    {
        var ev = await db.PlannerEvents.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
        if (ev is null)
            return ApiResponse.Fail("Evento non trovato.");

        db.PlannerEvents.Remove(ev);
        await db.SaveChangesAsync();
        return ApiResponse.Ok("Evento eliminato.");
    }

    private static PlannerEventDto ToDto(PlannerEvent e) => new()
    {
        Id = e.Id,
        SubjectId = e.SubjectId,
        SubjectName = e.Subject?.Name,
        Title = e.Title,
        Description = e.Description,
        StartTime = e.StartTime,
        EndTime = e.EndTime,
        IsAllDay = e.IsAllDay,
        Color = e.Color ?? e.Subject?.Color
    };
}

using MentaFlow.Application.Common;
using MentaFlow.Application.DTOs.StudySessions;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentaFlow.Application.Services;

public class StudySessionService(IAppDbContext db)
{
    public async Task<ApiResponse<IEnumerable<StudySessionDto>>> GetAllAsync(int userId, int? subjectId = null)
    {
        var query = db.StudySessions
            .Where(s => s.UserId == userId)
            .Include(s => s.Subject)
            .AsQueryable();

        if (subjectId.HasValue)
            query = query.Where(s => s.SubjectId == subjectId);

        var sessions = await query
            .OrderByDescending(s => s.StartedAt)
            .Select(s => ToDto(s))
            .ToListAsync();

        return ApiResponse<IEnumerable<StudySessionDto>>.Ok(sessions);
    }

    public async Task<ApiResponse<StudySessionDto>> CreateAsync(int userId, CreateStudySessionRequest request)
    {
        var subjectExists = await db.Subjects.AnyAsync(s => s.Id == request.SubjectId && s.UserId == userId);
        if (!subjectExists)
            return ApiResponse<StudySessionDto>.Fail("Materia non trovata.");

        var session = new StudySession
        {
            UserId = userId,
            SubjectId = request.SubjectId,
            DurationMinutes = request.DurationMinutes,
            StartedAt = request.StartedAt ?? DateTime.UtcNow,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.StudySessions.Add(session);

        // Update user stats
        await UpdateStatsAfterSessionAsync(userId, request.DurationMinutes);

        await db.SaveChangesAsync();

        await db.StudySessions.Entry(session).Reference(s => s.Subject).LoadAsync();
        return ApiResponse<StudySessionDto>.Ok(ToDto(session), "Sessione registrata.");
    }

    public async Task<ApiResponse> DeleteAsync(int userId, int id)
    {
        var session = await db.StudySessions.FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (session is null)
            return ApiResponse.Fail("Sessione non trovata.");

        db.StudySessions.Remove(session);
        await db.SaveChangesAsync();
        return ApiResponse.Ok("Sessione eliminata.");
    }

    private async Task UpdateStatsAfterSessionAsync(int userId, int minutes)
    {
        var stats = await db.UserStats.FirstOrDefaultAsync(s => s.UserId == userId);
        if (stats is null) return;

        stats.TotalMinutesStudied += minutes;
        stats.XP += minutes / 5; // 1 XP ogni 5 minuti

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var lastActivity = stats.LastActivityDate.HasValue
            ? DateOnly.FromDateTime(stats.LastActivityDate.Value)
            : DateOnly.MinValue;

        if (lastActivity == today.AddDays(-1))
            stats.Streak++;
        else if (lastActivity < today.AddDays(-1))
            stats.Streak = 1;

        stats.LastActivityDate = DateTime.UtcNow;
        stats.Level = CalculateLevel(stats.XP);
    }

    private static int CalculateLevel(int xp) => xp switch
    {
        < 500 => 1,
        < 1500 => 2,
        < 3000 => 3,
        < 5000 => 4,
        < 8000 => 5,
        _ => 6 + (xp - 8000) / 3000
    };

    private static StudySessionDto ToDto(StudySession s) => new()
    {
        Id = s.Id,
        SubjectId = s.SubjectId,
        SubjectName = s.Subject?.Name ?? string.Empty,
        SubjectColor = s.Subject?.Color ?? string.Empty,
        DurationMinutes = s.DurationMinutes,
        StartedAt = s.StartedAt,
        Notes = s.Notes
    };
}

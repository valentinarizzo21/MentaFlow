using MentaFlow.Application.Common;
using MentaFlow.Application.DTOs.Stats;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using TaskStatus = MentaFlow.Domain.Enums.TaskStatus;

namespace MentaFlow.Application.Services;

public class StatsService(IAppDbContext db)
{
    public async Task<ApiResponse<UserStatsDto>> GetAsync(int userId)
    {
        var stats = await db.UserStats.FirstOrDefaultAsync(s => s.UserId == userId);
        if (stats is null)
            return ApiResponse<UserStatsDto>.Fail("Statistiche non trovate.");

        var tasksTotal = await db.Tasks.CountAsync(t => t.UserId == userId);
        var tasksCompleted = await db.Tasks.CountAsync(t => t.UserId == userId && t.Status == TaskStatus.Completed);

        var weeklyProgress = await GetWeeklyProgressAsync(userId);
        var badges = await GetBadgesAsync(userId);

        var dto = new UserStatsDto
        {
            TotalHours = Math.Round(stats.TotalMinutesStudied / 60.0, 1),
            Streak = stats.Streak,
            XP = stats.XP,
            Level = stats.Level,
            WeeklyTargetMinutes = stats.WeeklyTargetMinutes,
            TasksCompleted = tasksCompleted,
            TasksTotal = tasksTotal,
            WeeklyProgress = weeklyProgress,
            Badges = badges
        };

        return ApiResponse<UserStatsDto>.Ok(dto);
    }

    public async Task<ApiResponse> UpdateWeeklyTargetAsync(int userId, int targetMinutes)
    {
        var stats = await db.UserStats.FirstOrDefaultAsync(s => s.UserId == userId);
        if (stats is null)
            return ApiResponse.Fail("Statistiche non trovate.");

        stats.WeeklyTargetMinutes = targetMinutes;
        await db.SaveChangesAsync();

        return ApiResponse.Ok("Obiettivo aggiornato.");
    }

    private async Task<IEnumerable<WeeklyProgressDto>> GetWeeklyProgressAsync(int userId)
    {
        var today = DateTime.UtcNow.Date;
        var weekStart = today.AddDays(-(int)today.DayOfWeek + 1); // Monday

        var sessions = await db.StudySessions
            .Where(s => s.UserId == userId && s.StartedAt >= weekStart && s.StartedAt < weekStart.AddDays(7))
            .ToListAsync();

        return Enumerable.Range(0, 7).Select(i =>
        {
            var day = weekStart.AddDays(i);
            var minutes = sessions
                .Where(s => s.StartedAt.Date == day)
                .Sum(s => s.DurationMinutes);

            return new WeeklyProgressDto
            {
                Day = day.ToString("ddd", new System.Globalization.CultureInfo("it-IT")),
                Date = day.ToString("yyyy-MM-dd"),
                Hours = Math.Round(minutes / 60.0, 1)
            };
        });
    }

    private async Task<IEnumerable<BadgeDto>> GetBadgesAsync(int userId)
    {
        return await db.Badges
            .GroupJoin(
                db.UserBadges.Where(ub => ub.UserId == userId),
                b => b.Id,
                ub => ub.BadgeId,
                (badge, userBadges) => new BadgeDto
                {
                    Id = badge.Id,
                    Name = badge.Name,
                    Description = badge.Description,
                    Icon = badge.Icon,
                    UnlockedAt = userBadges.Select(ub => (DateTime?)ub.UnlockedAt).FirstOrDefault()
                })
            .ToListAsync();
    }
}

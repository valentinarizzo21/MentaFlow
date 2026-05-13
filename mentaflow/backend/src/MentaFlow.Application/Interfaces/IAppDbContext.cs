using MentaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentaFlow.Application.Interfaces;

public interface IAppDbContext
{
    DbSet<User> Users { get; }
    DbSet<Subject> Subjects { get; }
    DbSet<Attachment> Attachments { get; }
    DbSet<SubjectLink> SubjectLinks { get; }
    DbSet<TaskItem> Tasks { get; }
    DbSet<StudySession> StudySessions { get; }
    DbSet<Badge> Badges { get; }
    DbSet<UserBadge> UserBadges { get; }
    DbSet<UserStats> UserStats { get; }
    DbSet<DailyGoal> DailyGoals { get; }
    DbSet<PlannerEvent> PlannerEvents { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using MentaFlow.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace MentaFlow.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Subject> Subjects => Set<Subject>();
    public DbSet<Attachment> Attachments => Set<Attachment>();
    public DbSet<SubjectLink> SubjectLinks => Set<SubjectLink>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<StudySession> StudySessions => Set<StudySession>();
    public DbSet<Badge> Badges => Set<Badge>();
    public DbSet<UserBadge> UserBadges => Set<UserBadge>();
    public DbSet<UserStats> UserStats => Set<UserStats>();
    public DbSet<DailyGoal> DailyGoals => Set<DailyGoal>();
    public DbSet<PlannerEvent> PlannerEvents => Set<PlannerEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new UserStatsConfiguration());
        modelBuilder.ApplyConfiguration(new SubjectConfiguration());
        modelBuilder.ApplyConfiguration(new AttachmentConfiguration());
        modelBuilder.ApplyConfiguration(new SubjectLinkConfiguration());
        modelBuilder.ApplyConfiguration(new TaskItemConfiguration());
        modelBuilder.ApplyConfiguration(new StudySessionConfiguration());
        modelBuilder.ApplyConfiguration(new BadgeConfiguration());
        modelBuilder.ApplyConfiguration(new UserBadgeConfiguration());
        modelBuilder.ApplyConfiguration(new DailyGoalConfiguration());
        modelBuilder.ApplyConfiguration(new PlannerEventConfiguration());

        SeedBadges(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<Domain.Common.BaseEntity>())
        {
            if (entry.State == EntityState.Modified)
                entry.Entity.UpdatedAt = DateTime.UtcNow;
        }
        return base.SaveChangesAsync(cancellationToken);
    }

    private static void SeedBadges(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Badge>().HasData(
            new Badge { Id = 1, Name = "First Step",   Description = "Prima sessione di studio completata",      Icon = "🎯", CreatedAt = new DateTime(2026,1,1), UpdatedAt = new DateTime(2026,1,1) },
            new Badge { Id = 2, Name = "On Fire",      Description = "5 giorni di streak consecutivi",           Icon = "🔥", CreatedAt = new DateTime(2026,1,1), UpdatedAt = new DateTime(2026,1,1) },
            new Badge { Id = 3, Name = "Night Owl",    Description = "Studio dopo mezzanotte",                   Icon = "🦉", CreatedAt = new DateTime(2026,1,1), UpdatedAt = new DateTime(2026,1,1) },
            new Badge { Id = 4, Name = "Century",      Description = "100 ore di studio totali",                 Icon = "💯", CreatedAt = new DateTime(2026,1,1), UpdatedAt = new DateTime(2026,1,1) },
            new Badge { Id = 5, Name = "Task Master",  Description = "50 task completati",                       Icon = "✅", CreatedAt = new DateTime(2026,1,1), UpdatedAt = new DateTime(2026,1,1) },
            new Badge { Id = 6, Name = "Scholar",      Description = "5 materie aggiunte",                       Icon = "📚", CreatedAt = new DateTime(2026,1,1), UpdatedAt = new DateTime(2026,1,1) }
        );
    }
}

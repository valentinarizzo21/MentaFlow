using MentaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentaFlow.Infrastructure.Data.Configurations;

public class StudySessionConfiguration : IEntityTypeConfiguration<StudySession>
{
    public void Configure(EntityTypeBuilder<StudySession> builder)
    {
        builder.ToTable("StudySessions");
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Notes).HasMaxLength(500);

        builder.HasIndex(s => s.UserId);
        builder.HasIndex(s => new { s.UserId, s.StartedAt });
    }
}

public class BadgeConfiguration : IEntityTypeConfiguration<Badge>
{
    public void Configure(EntityTypeBuilder<Badge> builder)
    {
        builder.ToTable("Badges");
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Name).HasMaxLength(100).IsRequired();
        builder.Property(b => b.Description).HasMaxLength(300).IsRequired();
        builder.Property(b => b.Icon).HasMaxLength(10).IsRequired();
    }
}

public class UserBadgeConfiguration : IEntityTypeConfiguration<UserBadge>
{
    public void Configure(EntityTypeBuilder<UserBadge> builder)
    {
        builder.ToTable("UserBadges");
        builder.HasKey(ub => new { ub.UserId, ub.BadgeId });

        builder.HasOne(ub => ub.User)
            .WithMany(u => u.UserBadges)
            .HasForeignKey(ub => ub.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ub => ub.Badge)
            .WithMany(b => b.UserBadges)
            .HasForeignKey(ub => ub.BadgeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class DailyGoalConfiguration : IEntityTypeConfiguration<DailyGoal>
{
    public void Configure(EntityTypeBuilder<DailyGoal> builder)
    {
        builder.ToTable("DailyGoals");
        builder.HasKey(g => g.Id);
        builder.Property(g => g.Title).HasMaxLength(200).IsRequired();
        builder.HasIndex(g => new { g.UserId, g.Date });
    }
}

public class PlannerEventConfiguration : IEntityTypeConfiguration<PlannerEvent>
{
    public void Configure(EntityTypeBuilder<PlannerEvent> builder)
    {
        builder.ToTable("PlannerEvents");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Title).HasMaxLength(200).IsRequired();
        builder.Property(e => e.Description).HasMaxLength(1000);
        builder.Property(e => e.Color).HasMaxLength(7);
        builder.HasIndex(e => new { e.UserId, e.StartTime });
    }
}

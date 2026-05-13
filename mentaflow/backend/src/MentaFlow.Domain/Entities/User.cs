using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public UserStats? Stats { get; set; }
    public ICollection<Subject> Subjects { get; set; } = [];
    public ICollection<TaskItem> Tasks { get; set; } = [];
    public ICollection<StudySession> StudySessions { get; set; } = [];
    public ICollection<UserBadge> UserBadges { get; set; } = [];
    public ICollection<DailyGoal> DailyGoals { get; set; } = [];
    public ICollection<PlannerEvent> PlannerEvents { get; set; } = [];
}

using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

public class DailyGoal : BaseEntity
{
    public int UserId { get; set; }
    public int SubjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int TargetMinutes { get; set; }
    public int CompletedMinutes { get; set; } = 0;
    public DateOnly Date { get; set; }

    public User User { get; set; } = null!;
    public Subject Subject { get; set; } = null!;
}

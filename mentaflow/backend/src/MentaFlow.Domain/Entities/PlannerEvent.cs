using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

public class PlannerEvent : BaseEntity
{
    public int UserId { get; set; }
    public int? SubjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public bool IsAllDay { get; set; } = false;
    public string? Color { get; set; }

    public User User { get; set; } = null!;
    public Subject? Subject { get; set; }
}

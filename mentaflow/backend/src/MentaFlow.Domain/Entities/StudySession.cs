using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

public class StudySession : BaseEntity
{
    public int UserId { get; set; }
    public int SubjectId { get; set; }
    public int DurationMinutes { get; set; }
    public DateTime StartedAt { get; set; }
    public string? Notes { get; set; }

    public User User { get; set; } = null!;
    public Subject Subject { get; set; } = null!;
}

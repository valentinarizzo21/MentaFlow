using MentaFlow.Domain.Common;
using MentaFlow.Domain.Enums;
using TaskStatus = MentaFlow.Domain.Enums.TaskStatus;

namespace MentaFlow.Domain.Entities;

public class TaskItem : BaseEntity
{
    public int UserId { get; set; }
    public int? SubjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public Priority Priority { get; set; } = Priority.Medium;
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedAt { get; set; }

    public User User { get; set; } = null!;
    public Subject? Subject { get; set; }
}

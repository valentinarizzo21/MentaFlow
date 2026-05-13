namespace MentaFlow.Application.DTOs.Tasks;

public class TaskDto
{
    public int Id { get; set; }
    public int? SubjectId { get; set; }
    public string? SubjectName { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}

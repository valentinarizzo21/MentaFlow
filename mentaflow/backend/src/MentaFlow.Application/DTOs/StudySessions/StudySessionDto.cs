namespace MentaFlow.Application.DTOs.StudySessions;

public class StudySessionDto
{
    public int Id { get; set; }
    public int SubjectId { get; set; }
    public string SubjectName { get; set; } = string.Empty;
    public string SubjectColor { get; set; } = string.Empty;
    public int DurationMinutes { get; set; }
    public DateTime StartedAt { get; set; }
    public string? Notes { get; set; }
}

using System.ComponentModel.DataAnnotations;

namespace MentaFlow.Application.DTOs.Planner;

public class PlannerEventDto
{
    public int Id { get; set; }
    public int? SubjectId { get; set; }
    public string? SubjectName { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public bool IsAllDay { get; set; }
    public string? Color { get; set; }
}

public class CreatePlannerEventRequest
{
    public int? SubjectId { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }
    public bool IsAllDay { get; set; } = false;

    [RegularExpression(@"^#([A-Fa-f0-9]{6})$")]
    public string? Color { get; set; }
}

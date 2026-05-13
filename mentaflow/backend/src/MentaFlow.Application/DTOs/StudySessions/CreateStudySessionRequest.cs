using System.ComponentModel.DataAnnotations;

namespace MentaFlow.Application.DTOs.StudySessions;

public class CreateStudySessionRequest
{
    [Required]
    public int SubjectId { get; set; }

    [Required, Range(1, 720)]
    public int DurationMinutes { get; set; }

    public DateTime? StartedAt { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }
}

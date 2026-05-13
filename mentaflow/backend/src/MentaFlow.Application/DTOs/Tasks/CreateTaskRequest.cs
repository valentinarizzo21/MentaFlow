using System.ComponentModel.DataAnnotations;
using MentaFlow.Domain.Enums;

namespace MentaFlow.Application.DTOs.Tasks;

public class CreateTaskRequest
{
    public int? SubjectId { get; set; }

    [Required, MinLength(1), MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    public Priority Priority { get; set; } = Priority.Medium;
    public DateTime? DueDate { get; set; }
}

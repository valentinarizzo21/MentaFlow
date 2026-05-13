using System.ComponentModel.DataAnnotations;
using MentaFlow.Domain.Enums;
using TaskStatus = MentaFlow.Domain.Enums.TaskStatus;

namespace MentaFlow.Application.DTOs.Tasks;

public class UpdateTaskRequest
{
    [MaxLength(200)]
    public string? Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    public TaskStatus? Status { get; set; }
    public Priority? Priority { get; set; }
    public DateTime? DueDate { get; set; }
    public int? SubjectId { get; set; }
}

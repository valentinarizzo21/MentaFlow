using System.ComponentModel.DataAnnotations;
using MentaFlow.Domain.Enums;

namespace MentaFlow.Application.DTOs.Subjects;

public class UpdateSubjectRequest
{
    [MinLength(1), MaxLength(100)]
    public string? Name { get; set; }

    [RegularExpression(@"^#([A-Fa-f0-9]{6})$")]
    public string? Color { get; set; }

    public Difficulty? Difficulty { get; set; }
    public Priority? Priority { get; set; }
    public DateTime? ExamDate { get; set; }
    public bool? IsArchived { get; set; }
}

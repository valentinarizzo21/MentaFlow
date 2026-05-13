using System.ComponentModel.DataAnnotations;
using MentaFlow.Domain.Enums;

namespace MentaFlow.Application.DTOs.Subjects;

public class CreateSubjectRequest
{
    [Required, MinLength(1), MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? Code { get; set; }

    [RegularExpression(@"^#([A-Fa-f0-9]{6})$", ErrorMessage = "Color must be a valid hex code")]
    public string Color { get; set; } = "#FFB7C5";

    public Difficulty Difficulty { get; set; } = Difficulty.Medium;
    public Priority Priority { get; set; } = Priority.Medium;
    public AcademicStatus AcademicStatus { get; set; } = AcademicStatus.Pianificata;

    [Range(1, 30)]
    public int Cfu { get; set; } = 6;

    [Range(1, 5)]
    public int Year { get; set; } = 1;

    public DateTime? ExamDate { get; set; }
}

namespace MentaFlow.Application.DTOs.Subjects;

public class SubjectDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Code { get; set; }
    public string Color { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string AcademicStatus { get; set; } = string.Empty;
    public int Cfu { get; set; }
    public int Year { get; set; }
    public DateTime? ExamDate { get; set; }
    public bool IsArchived { get; set; }
    public int AttachmentsCount { get; set; }
    public int LinksCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

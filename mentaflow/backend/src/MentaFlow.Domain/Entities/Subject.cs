using MentaFlow.Domain.Common;
using MentaFlow.Domain.Enums;

namespace MentaFlow.Domain.Entities;

public class Subject : BaseEntity
{
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Code { get; set; }
    public string Color { get; set; } = "#FFB7C5";
    public Difficulty Difficulty { get; set; } = Difficulty.Medium;
    public Priority Priority { get; set; } = Priority.Medium;
    public AcademicStatus AcademicStatus { get; set; } = AcademicStatus.Pianificata;
    public int Cfu { get; set; } = 6;
    public int Year { get; set; } = 1;
    public DateTime? ExamDate { get; set; }
    public bool IsArchived { get; set; } = false;

    public User User { get; set; } = null!;
    public ICollection<Attachment> Attachments { get; set; } = [];
    public ICollection<SubjectLink> Links { get; set; } = [];
    public ICollection<TaskItem> Tasks { get; set; } = [];
    public ICollection<StudySession> StudySessions { get; set; } = [];
}

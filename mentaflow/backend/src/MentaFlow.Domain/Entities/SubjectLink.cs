using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

public class SubjectLink : BaseEntity
{
    public int SubjectId { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? Label { get; set; }

    public Subject Subject { get; set; } = null!;
}

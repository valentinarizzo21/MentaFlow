using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

public class Attachment : BaseEntity
{
    public int SubjectId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;

    public Subject Subject { get; set; } = null!;
}

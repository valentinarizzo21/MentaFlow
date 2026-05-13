using MentaFlow.Domain.Common;

namespace MentaFlow.Domain.Entities;

// Catalog of all possible badges (not user-specific)
public class Badge : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;

    public ICollection<UserBadge> UserBadges { get; set; } = [];
}

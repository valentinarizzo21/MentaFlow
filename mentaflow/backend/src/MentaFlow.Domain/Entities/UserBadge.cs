namespace MentaFlow.Domain.Entities;

public class UserBadge
{
    public int UserId { get; set; }
    public int BadgeId { get; set; }
    public DateTime UnlockedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Badge Badge { get; set; } = null!;
}

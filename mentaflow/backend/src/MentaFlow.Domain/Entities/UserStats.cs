namespace MentaFlow.Domain.Entities;

public class UserStats
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TotalMinutesStudied { get; set; } = 0;
    public int Streak { get; set; } = 0;
    public DateTime? LastActivityDate { get; set; }
    public int XP { get; set; } = 0;
    public int Level { get; set; } = 1;
    public int WeeklyTargetMinutes { get; set; } = 1200;

    public User User { get; set; } = null!;
}

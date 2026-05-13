namespace MentaFlow.Application.DTOs.Stats;

public class UserStatsDto
{
    public double TotalHours { get; set; }
    public int Streak { get; set; }
    public int XP { get; set; }
    public int Level { get; set; }
    public int WeeklyTargetMinutes { get; set; }
    public int TasksCompleted { get; set; }
    public int TasksTotal { get; set; }
    public IEnumerable<WeeklyProgressDto> WeeklyProgress { get; set; } = [];
    public IEnumerable<BadgeDto> Badges { get; set; } = [];
}

public class WeeklyProgressDto
{
    public string Day { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public double Hours { get; set; }
}

public class BadgeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public DateTime? UnlockedAt { get; set; }
}

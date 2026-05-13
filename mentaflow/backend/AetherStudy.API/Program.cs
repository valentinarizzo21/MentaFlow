using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

// Database Context
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<TaskItem> Tasks { get; set; }
    public DbSet<StudySession> StudySessions { get; set; }
}

// Models
public class User
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public int TotalXP { get; set; }
    public int CurrentLevel { get; set; }
}

public class Subject
{
    public int SubjectId { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }
    public string Difficulty { get; set; }
    public string Priority { get; set; }
    public DateTime? ExamDate { get; set; }
}

public class TaskItem
{
    public int TaskId { get; set; }
    public int SubjectId { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }
}

// Controller Example
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;
    public DashboardController(AppDbContext context) => _context = context;

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetStats(int userId)
    {
        var stats = await _context.Users
            .Where(u => u.UserId == userId)
            .Select(u => new { u.TotalXP, u.CurrentLevel })
            .FirstOrDefaultAsync();
        return Ok(stats);
    }
}

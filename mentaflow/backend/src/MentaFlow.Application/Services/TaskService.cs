using MentaFlow.Application.Common;
using MentaFlow.Application.DTOs.Tasks;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using MentaFlow.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using TaskStatus = MentaFlow.Domain.Enums.TaskStatus;

namespace MentaFlow.Application.Services;

public class TaskService(IAppDbContext db)
{
    public async Task<ApiResponse<IEnumerable<TaskDto>>> GetAllAsync(int userId, string? status = null)
    {
        var query = db.Tasks
            .Where(t => t.UserId == userId)
            .Include(t => t.Subject)
            .AsQueryable();

        if (status is not null && Enum.TryParse<TaskStatus>(status, true, out var parsedStatus))
            query = query.Where(t => t.Status == parsedStatus);

        var tasks = await query
            .OrderBy(t => t.DueDate)
            .ThenBy(t => t.Priority)
            .Select(t => ToDto(t))
            .ToListAsync();

        return ApiResponse<IEnumerable<TaskDto>>.Ok(tasks);
    }

    public async Task<ApiResponse<TaskDto>> CreateAsync(int userId, CreateTaskRequest request)
    {
        if (request.SubjectId.HasValue)
        {
            var subjectExists = await db.Subjects.AnyAsync(s => s.Id == request.SubjectId && s.UserId == userId);
            if (!subjectExists)
                return ApiResponse<TaskDto>.Fail("Materia non trovata.");
        }

        var task = new TaskItem
        {
            UserId = userId,
            SubjectId = request.SubjectId,
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Status = TaskStatus.Todo,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.Tasks.Add(task);
        await db.SaveChangesAsync();

        await db.Tasks.Entry(task).Reference(t => t.Subject).LoadAsync();
        return ApiResponse<TaskDto>.Ok(ToDto(task), "Task creato.");
    }

    public async Task<ApiResponse<TaskDto>> UpdateAsync(int userId, int id, UpdateTaskRequest request)
    {
        var task = await db.Tasks
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (task is null)
            return ApiResponse<TaskDto>.Fail("Task non trovato.");

        if (request.Title is not null) task.Title = request.Title;
        if (request.Description is not null) task.Description = request.Description;
        if (request.Priority.HasValue) task.Priority = request.Priority.Value;
        if (request.DueDate.HasValue) task.DueDate = request.DueDate;
        if (request.SubjectId.HasValue) task.SubjectId = request.SubjectId;

        if (request.Status.HasValue)
        {
            task.Status = request.Status.Value;
            task.CompletedAt = request.Status == TaskStatus.Completed ? DateTime.UtcNow : null;
        }

        task.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();

        return ApiResponse<TaskDto>.Ok(ToDto(task));
    }

    public async Task<ApiResponse> DeleteAsync(int userId, int id)
    {
        var task = await db.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (task is null)
            return ApiResponse.Fail("Task non trovato.");

        db.Tasks.Remove(task);
        await db.SaveChangesAsync();
        return ApiResponse.Ok("Task eliminato.");
    }

    private static TaskDto ToDto(TaskItem t) => new()
    {
        Id = t.Id,
        SubjectId = t.SubjectId,
        SubjectName = t.Subject?.Name,
        Title = t.Title,
        Description = t.Description,
        Status = t.Status.ToString(),
        Priority = t.Priority.ToString(),
        DueDate = t.DueDate,
        CompletedAt = t.CompletedAt,
        CreatedAt = t.CreatedAt
    };
}

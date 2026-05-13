using MentaFlow.Application.Common;
using MentaFlow.Application.DTOs.Subjects;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentaFlow.Application.Services;

public class SubjectService(IAppDbContext db)
{
    public async Task<ApiResponse<IEnumerable<SubjectDto>>> GetAllAsync(int userId, bool includeArchived = false)
    {
        var subjects = await db.Subjects
            .Where(s => s.UserId == userId && (includeArchived || !s.IsArchived))
            .Include(s => s.Attachments)
            .Include(s => s.Links)
            .OrderBy(s => s.ExamDate)
            .Select(s => ToDto(s))
            .ToListAsync();

        return ApiResponse<IEnumerable<SubjectDto>>.Ok(subjects);
    }

    public async Task<ApiResponse<SubjectDto>> GetByIdAsync(int userId, int id)
    {
        var subject = await db.Subjects
            .Include(s => s.Attachments)
            .Include(s => s.Links)
            .FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);

        if (subject is null)
            return ApiResponse<SubjectDto>.Fail("Materia non trovata.");

        return ApiResponse<SubjectDto>.Ok(ToDto(subject));
    }

    public async Task<ApiResponse<SubjectDto>> CreateAsync(int userId, CreateSubjectRequest request)
    {
        var subject = new Subject
        {
            UserId = userId,
            Name = request.Name,
            Code = request.Code,
            Color = request.Color,
            Difficulty = request.Difficulty,
            Priority = request.Priority,
            AcademicStatus = request.AcademicStatus,
            Cfu = request.Cfu,
            Year = request.Year,
            ExamDate = request.ExamDate,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.Subjects.Add(subject);
        await db.SaveChangesAsync();

        return ApiResponse<SubjectDto>.Ok(ToDto(subject), "Materia creata con successo.");
    }

    public async Task<ApiResponse<SubjectDto>> UpdateAsync(int userId, int id, UpdateSubjectRequest request)
    {
        var subject = await db.Subjects.FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (subject is null)
            return ApiResponse<SubjectDto>.Fail("Materia non trovata.");

        if (request.Name is not null) subject.Name = request.Name;
        if (request.Code is not null) subject.Code = request.Code;
        if (request.Color is not null) subject.Color = request.Color;
        if (request.Difficulty.HasValue) subject.Difficulty = request.Difficulty.Value;
        if (request.Priority.HasValue) subject.Priority = request.Priority.Value;
        if (request.AcademicStatus.HasValue) subject.AcademicStatus = request.AcademicStatus.Value;
        if (request.Cfu.HasValue) subject.Cfu = request.Cfu.Value;
        if (request.Year.HasValue) subject.Year = request.Year.Value;
        if (request.ExamDate.HasValue) subject.ExamDate = request.ExamDate;
        if (request.IsArchived.HasValue) subject.IsArchived = request.IsArchived.Value;
        subject.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return ApiResponse<SubjectDto>.Ok(ToDto(subject));
    }

    public async Task<ApiResponse> DeleteAsync(int userId, int id)
    {
        var subject = await db.Subjects.FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (subject is null)
            return ApiResponse.Fail("Materia non trovata.");

        // Unlink tasks before deleting (ClientSetNull requires explicit nulling via EF)
        var linkedTasks = await db.Tasks.Where(t => t.SubjectId == id).ToListAsync();
        foreach (var t in linkedTasks) t.SubjectId = null;

        db.Subjects.Remove(subject);
        await db.SaveChangesAsync();

        return ApiResponse.Ok("Materia eliminata.");
    }

    private static SubjectDto ToDto(Subject s) => new()
    {
        Id = s.Id,
        Name = s.Name,
        Code = s.Code,
        Color = s.Color,
        Difficulty = s.Difficulty.ToString(),
        Priority = s.Priority.ToString(),
        AcademicStatus = s.AcademicStatus.ToString(),
        Cfu = s.Cfu,
        Year = s.Year,
        ExamDate = s.ExamDate,
        IsArchived = s.IsArchived,
        AttachmentsCount = s.Attachments?.Count ?? 0,
        LinksCount = s.Links?.Count ?? 0,
        CreatedAt = s.CreatedAt
    };
}

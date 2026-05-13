using MentaFlow.Application.Common;
using MentaFlow.Application.DTOs.Auth;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentaFlow.Application.Services;

public class AuthService(IAppDbContext db, IJwtService jwt, IPasswordService passwords)
{
    public async Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest request)
    {
        var emailExists = await db.Users.AnyAsync(u => u.Email == request.Email.ToLower());
        if (emailExists)
            return ApiResponse<AuthResponse>.Fail("Email già in uso.");

        var usernameExists = await db.Users.AnyAsync(u => u.Username == request.Username.ToLower());
        if (usernameExists)
            return ApiResponse<AuthResponse>.Fail("Username già in uso.");

        var user = new User
        {
            Username = request.Username.ToLower(),
            Email = request.Email.ToLower(),
            PasswordHash = passwords.Hash(request.Password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Stats = new UserStats()
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        var token = jwt.GenerateToken(user);
        return ApiResponse<AuthResponse>.Ok(BuildResponse(user, token));
    }

    public async Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var user = await db.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email.ToLower() && u.IsActive);

        if (user is null || !passwords.Verify(request.Password, user.PasswordHash))
            return ApiResponse<AuthResponse>.Fail("Credenziali non valide.");

        var token = jwt.GenerateToken(user);
        return ApiResponse<AuthResponse>.Ok(BuildResponse(user, token));
    }

    private static AuthResponse BuildResponse(User user, string token) => new()
    {
        Token = token,
        Username = user.Username,
        Email = user.Email,
        ExpiresAt = DateTime.UtcNow.AddDays(1)
    };
}

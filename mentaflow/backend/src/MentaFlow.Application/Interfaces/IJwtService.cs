using MentaFlow.Domain.Entities;

namespace MentaFlow.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    int? ValidateTokenAndGetUserId(string token);
}

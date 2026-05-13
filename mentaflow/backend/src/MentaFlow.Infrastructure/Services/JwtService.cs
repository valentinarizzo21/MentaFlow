using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MentaFlow.Application.Interfaces;
using MentaFlow.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MentaFlow.Infrastructure.Services;

public class JwtService(IConfiguration config) : IJwtService
{
    private readonly string _key = config["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not configured");
    private readonly string _issuer = config["Jwt:Issuer"] ?? "MentaFlowAPI";
    private readonly string _audience = config["Jwt:Audience"] ?? "MentaFlowClient";
    private readonly int _expiryMinutes = int.TryParse(config["Jwt:ExpiryMinutes"], out var m) ? m : 1440;

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expiryMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public int? ValidateTokenAndGetUserId(string token)
    {
        try
        {
            var handler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));

            handler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ClockSkew = TimeSpan.Zero
            }, out var validatedToken);

            var jwt = (JwtSecurityToken)validatedToken;
            return int.Parse(jwt.Subject);
        }
        catch
        {
            return null;
        }
    }
}

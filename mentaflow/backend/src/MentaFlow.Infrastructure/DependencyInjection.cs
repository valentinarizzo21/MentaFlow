using MentaFlow.Application.Interfaces;
using MentaFlow.Application.Services;
using MentaFlow.Infrastructure.Data;
using MentaFlow.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MentaFlow.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                config.GetConnectionString("DefaultConnection"),
                sql => sql.EnableRetryOnFailure(maxRetryCount: 3, maxRetryDelay: TimeSpan.FromSeconds(5), errorNumbersToAdd: null)));

        services.AddScoped<IAppDbContext>(sp => sp.GetRequiredService<AppDbContext>());
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IPasswordService, PasswordService>();

        services.AddScoped<AuthService>();
        services.AddScoped<SubjectService>();
        services.AddScoped<TaskService>();
        services.AddScoped<StudySessionService>();
        services.AddScoped<StatsService>();
        services.AddScoped<PlannerService>();

        return services;
    }
}

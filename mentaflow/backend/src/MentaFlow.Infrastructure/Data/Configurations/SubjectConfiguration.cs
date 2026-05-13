using MentaFlow.Domain.Entities;
using MentaFlow.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentaFlow.Infrastructure.Data.Configurations;

public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.ToTable("Subjects");
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Name).HasMaxLength(100).IsRequired();
        builder.Property(s => s.Color).HasMaxLength(7).HasDefaultValue("#FFB7C5");
        builder.Property(s => s.Difficulty).HasConversion<string>().HasMaxLength(10);
        builder.Property(s => s.Priority).HasConversion<string>().HasMaxLength(10);

        builder.HasIndex(s => s.UserId);
        builder.HasIndex(s => new { s.UserId, s.IsArchived });

        builder.HasMany(s => s.Attachments)
            .WithOne(a => a.Subject)
            .HasForeignKey(a => a.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(s => s.Links)
            .WithOne(l => l.Subject)
            .HasForeignKey(l => l.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(s => s.Tasks)
            .WithOne(t => t.Subject)
            .HasForeignKey(t => t.SubjectId)
            .OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasMany(s => s.StudySessions)
            .WithOne(ss => ss.Subject)
            .HasForeignKey(ss => ss.SubjectId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class AttachmentConfiguration : IEntityTypeConfiguration<Attachment>
{
    public void Configure(EntityTypeBuilder<Attachment> builder)
    {
        builder.ToTable("Attachments");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Name).HasMaxLength(200).IsRequired();
        builder.Property(a => a.Url).HasMaxLength(1000).IsRequired();
        builder.Property(a => a.FileType).HasMaxLength(50);
    }
}

public class SubjectLinkConfiguration : IEntityTypeConfiguration<SubjectLink>
{
    public void Configure(EntityTypeBuilder<SubjectLink> builder)
    {
        builder.ToTable("SubjectLinks");
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Url).HasMaxLength(1000).IsRequired();
        builder.Property(l => l.Label).HasMaxLength(200);
    }
}

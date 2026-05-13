-- SQL Server Schema for AetherStudy

CREATE DATABASE AetherStudy;
GO

USE AetherStudy;
GO

-- Users Table
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    TotalXP INT DEFAULT 0,
    CurrentLevel INT DEFAULT 1,
    StudyStreak INT DEFAULT 0,
    WeeklyTargetMinutes INT DEFAULT 600
);

-- Subjects Table
CREATE TABLE Subjects (
    SubjectId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    Name NVARCHAR(100) NOT NULL,
    Color NVARCHAR(20),
    Difficulty NVARCHAR(20), -- 'Low', 'Medium', 'High'
    Priority NVARCHAR(20),   -- 'Low', 'Medium', 'High'
    ExamDate DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Tasks Table
CREATE TABLE Tasks (
    TaskId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Status NVARCHAR(20) DEFAULT 'todo', -- 'todo', 'in-progress', 'completed'
    Priority NVARCHAR(20),
    DueDate DATETIME,
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- StudySessions Table (for tracking and analytics)
CREATE TABLE StudySessions (
    SessionId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    DurationMinutes INT NOT NULL,
    StartTime DATETIME DEFAULT GETDATE()
);

-- Badges Table
CREATE TABLE Badges (
    BadgeId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    IconUrl NVARCHAR(MAX)
);

-- UserBadges Table
CREATE TABLE UserBadges (
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    BadgeId INT FOREIGN KEY REFERENCES Badges(BadgeId),
    UnlockedAt DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (UserId, BadgeId)
);

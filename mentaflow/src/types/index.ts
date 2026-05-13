export interface Subject {
  id: string;
  name: string;
  color: string;
  difficulty: 'Low' | 'Medium' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  examDate: string;
  notes: Attachment[];
  links: string[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Task {
  id: string;
  subjectId?: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface StudySession {
  id: string;
  subjectId: string;
  duration: number; // in minutes
  timestamp: string;
}

export interface UserStats {
  totalHours: number;
  streak: number;
  xp: number;
  level: number;
  badges: Badge[];
  weeklyTarget: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

import { Subject, Task, UserStats } from '../types';

const STORAGE_KEY = 'aether_study_data';

export const mockDb = {
  getSubjects: (): Subject[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).subjects : [];
  },
  saveSubjects: (subjects: Subject[]) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"subjects":[], "tasks":[], "stats":{}}');
    data.subjects = subjects;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  getTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).tasks : [];
  },
  saveTasks: (tasks: Task[]) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"subjects":[], "tasks":[], "stats":{}}');
    data.tasks = tasks;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  getStats: (): UserStats => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).stats : {
      totalHours: 12,
      streak: 5,
      xp: 450,
      level: 4,
      badges: [],
      weeklyTarget: 1200
    };
  }
};

import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  MoreVertical,
  Search,
  Filter,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: string;
  title: string;
  subject: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Completare esercizi derivate', subject: 'Analisi Matematica I', status: 'todo', priority: 'High', dueDate: '2026-05-12' },
  { id: '2', title: 'Ripasso termodinamica', subject: 'Fisica Generale', status: 'in-progress', priority: 'Medium', dueDate: '2026-05-15' },
  { id: '3', title: 'Installare libreria SFML', subject: 'Programmazione C++', status: 'completed', priority: 'Low', dueDate: '2026-05-10' },
  { id: '4', title: 'Leggere capitolo 4', subject: 'Chimica Organica', status: 'todo', priority: 'Medium', dueDate: '2026-05-20' },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const nextStatus: Task['status'] = task.status === 'completed' ? 'todo' : 'completed';
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800">Task List</h1>
          <p className="text-slate-400 mt-1 font-medium">Gestisci i tuoi mini-obiettivi per ogni materia.</p>
        </div>
        <button className="px-6 py-3 bg-pink-300 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-pink-400 transition-all shadow-[0_10px_20px_rgba(255,183,197,0.3)]">
          <Plus size={20} /> Nuovo Task
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text" 
            placeholder="Cerca tra i task..." 
            className="w-full bg-white/60 border border-pink-50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-200 transition-all text-slate-600"
          />
        </div>
        <div className="flex bg-white/60 border border-pink-50 rounded-2xl p-1 shadow-sm">
          {(['all', 'todo', 'in-progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === f ? 'bg-pink-300 text-white shadow-sm' : 'text-slate-400 hover:text-pink-300'
              }`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`glass-card flex items-center gap-6 p-5 transition-all duration-300 ${
                task.status === 'completed' ? 'opacity-60 grayscale-[0.5]' : ''
              }`}
            >
              <button 
                onClick={() => toggleStatus(task.id)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  task.status === 'completed' 
                  ? 'bg-emerald-100 text-emerald-500 border border-emerald-200 shadow-sm' 
                  : 'bg-white border border-pink-100 text-pink-300 hover:border-pink-300'
                }`}
              >
                {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className={`font-bold text-lg leading-none ${
                    task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700'
                  }`}>
                    {task.title}
                  </h3>
                  <Badge 
                    label={task.priority} 
                    color={
                      task.priority === 'High' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                      task.priority === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      'bg-sky-50 text-sky-500 border-sky-100'
                    } 
                  />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Tag size={14} className="text-pink-200" />
                    <span>{task.subject}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock size={14} className="text-sky-200" />
                    <span>Scadenza: {new Date(task.dueDate).toLocaleDateString('it-IT')}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                  Modifica
                </button>
                <button className="p-2 text-slate-300 hover:text-pink-300 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-pink-100">
            <AlertCircle className="text-pink-300" size={32} />
          </div>
          <p className="text-slate-400 font-medium">Nessun task trovato per questo filtro.</p>
        </div>
      )}
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border shadow-sm ${color}`}>
      {label}
    </span>
  );
}

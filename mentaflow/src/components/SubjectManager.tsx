import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar,
  AlertCircle,
  Link as LinkIcon,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

const mockSubjects = [
  { id: '1', name: 'Analisi Matematica I', color: '#FFB7C5', difficulty: 'High', priority: 'High', examDate: '2026-06-15' },
  { id: '2', name: 'Fisica Generale', color: '#D2B3FF', difficulty: 'High', priority: 'Medium', examDate: '2026-06-28' },
  { id: '3', name: 'Programmazione C++', color: '#B5EAD7', difficulty: 'Medium', priority: 'High', examDate: '2026-07-05' },
  { id: '4', name: 'Chimica Organica', color: '#FFDAC1', difficulty: 'Low', priority: 'Low', examDate: '2026-07-12' },
];

export default function SubjectManager() {
  const [subjects] = useState(mockSubjects);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800">Le Tue Materie</h1>
          <p className="text-slate-400 mt-1 font-medium">Gestisci i tuoi esami e il materiale didattico.</p>
        </div>
        <button className="px-6 py-3 bg-pink-300 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-pink-400 transition-all shadow-[0_10px_20px_rgba(255,183,197,0.3)]">
          <Plus size={20} /> Nuova Materia
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text" 
            placeholder="Cerca tra le materie..." 
            className="w-full bg-white/60 border border-pink-50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-200 transition-all text-slate-600"
          />
        </div>
        <button className="px-5 py-3 bg-white/60 border border-pink-50 rounded-2xl flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-all">
          <Filter size={20} /> Filtra
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.map((subject, idx) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card group"
          >
            <div className="flex justify-between items-start mb-6">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: `${subject.color}30`, border: `1px solid ${subject.color}60` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color, boxShadow: `0 0 15px ${subject.color}` }}></div>
              </div>
              <button className="text-slate-300 hover:text-pink-300 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <h3 className="text-2xl font-display font-bold mb-2 text-slate-700 group-hover:text-pink-400 transition-colors">{subject.name}</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge label={`Difficoltà: ${subject.difficulty}`} color="bg-orange-50/50 text-orange-600 border-orange-100" />
              <Badge label={`Priorità: ${subject.priority}`} color="bg-rose-50/50 text-rose-500 border-rose-100" />
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium tracking-tight">
                <Calendar size={16} className="text-sky-300" />
                <span>Esame: <strong>{new Date(subject.examDate).toLocaleDateString('it-IT')}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium tracking-tight">
                <FileText size={16} className="text-purple-300" />
                <span>Appunti allegati: <strong>12</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium tracking-tight">
                <LinkIcon size={16} className="text-emerald-300" />
                <span>Link utili: <strong>4</strong></span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl font-bold transition-all text-sm text-slate-500">
                Materiale
              </button>
              <button className="flex-1 py-3 bg-pink-50 hover:bg-pink-100 text-pink-400 border border-pink-100 rounded-xl font-bold transition-all text-sm">
                Inizia Studio
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Badge({ label, color }: any) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${color}`}>
      {label}
    </span>
  );
}

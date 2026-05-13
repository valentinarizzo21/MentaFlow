import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Trophy, 
  Flame, 
  Target, 
  TrendingUp, 
  Clock, 
  Star,
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

const subjectData = [
  { name: 'Analisi I', value: 45, color: '#FFB7C5' },
  { name: 'Fisica', value: 30, color: '#D2B3FF' },
  { name: 'C++', value: 15, color: '#B5EAD7' },
  { name: 'Chimica', value: 10, color: '#FFDAC1' },
];

const monthlyProgress = [
  { day: 1, hours: 2 }, { day: 2, hours: 4 }, { day: 3, hours: 3 }, { day: 4, hours: 5 },
  { day: 5, hours: 2 }, { day: 6, hours: 0 }, { day: 7, hours: 1 }, { day: 8, hours: 4 },
  { day: 9, hours: 6 }, { day: 10, hours: 3 }, { day: 11, hours: 4 }, { day: 12, hours: 5 },
  { day: 13, hours: 2 }, { day: 14, hours: 1 }, { day: 15, hours: 7 }, { day: 16, hours: 4 },
  { day: 17, hours: 3 }, { day: 18, hours: 2 }, { day: 19, hours: 5 }, { day: 20, hours: 6 },
  { day: 21, hours: 3 }, { day: 22, hours: 4 }, { day: 23, hours: 5 }, { day: 24, hours: 2 },
  { day: 25, hours: 4 }, { day: 26, hours: 6 }, { day: 27, hours: 4 }, { day: 28, hours: 3 },
  { day: 29, hours: 5 }, { day: 30, hours: 4 },
];

// Generate fake heatmap data (365 days)
const heatmapData = Array.from({ length: 364 }, (_, i) => ({
  id: i,
  level: Math.floor(Math.random() * 5), // 0 to 4 intensity
}));

export default function StatsOverview() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800">Statistiche & Progressi</h1>
        <p className="text-slate-400 mt-1 font-medium">Analizza le tue performance e celebra i tuoi traguardi.</p>
      </header>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HighlightCard 
          icon={Flame} 
          label="Best Streak" 
          value="12 Giorni" 
          subtext="Record personale!" 
          color="bg-pink-100 text-pink-500 shadow-pink-50"
        />
        <HighlightCard 
          icon={Clock} 
          label="Media Giornaliera" 
          value="4.2 ore" 
          subtext="+15% rispetto al mese scorso" 
          color="bg-sky-100 text-sky-500 shadow-sky-50"
        />
        <HighlightCard 
          icon={Star} 
          label="Livello Attuale" 
          value="Livello 14" 
          subtext="250 XP al prossimo livello" 
          color="bg-purple-100 text-purple-500 shadow-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribution Pie Chart */}
        <div className="glass-card flex flex-col h-[400px]">
          <h3 className="text-xl font-bold font-display mb-6 text-slate-700">Distribuzione Tempo</h3>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-around">
            <div className="w-full h-full max-w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 w-full md:w-auto mt-4 md:mt-0">
              {subjectData.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-sm font-bold text-slate-600">{s.name}</span>
                  <span className="text-xs text-slate-400 font-medium ml-auto">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Activity Line Chart */}
        <div className="glass-card h-[400px]">
          <h3 className="text-xl font-bold font-display mb-6 text-slate-700">Ore Mensili</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,183,197,0.1)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
              <Bar dataKey="hours" fill="#FFB7C5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GitHub Style Heatmap */}
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-display text-slate-700">Costanza di Studio</h3>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span>Meno</span>
            <div className="w-2.5 h-2.5 bg-slate-100 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-pink-100 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-pink-200 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-pink-300 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-pink-400 rounded-sm" />
            <span>Più</span>
          </div>
        </div>
        <div className="heatmap-grid overflow-x-auto pb-4">
          {heatmapData.map((day) => (
            <div 
              key={day.id} 
              className={`heatmap-cell w-2.5 h-2.5 transition-colors duration-500 ${
                day.level === 0 ? 'bg-slate-50' : 
                day.level === 1 ? 'bg-pink-100' : 
                day.level === 2 ? 'bg-pink-200' : 
                day.level === 3 ? 'bg-pink-300' : 
                'bg-pink-400'
              } rounded-[2px]`}
              title={`Level ${day.level}`}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center font-medium">Hai studiato 284 giorni nell'ultimo anno. Sei fantastica! ✨</p>
      </div>

      {/* Badges & Achievements */}
      <div className="glass-card">
        <h3 className="text-xl font-bold font-display mb-8 text-slate-700">I Tuoi Badge</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <BadgeItem icon={Zap} label="Fulmine" desc="Finisci 5 task in un giorno" unlocked />
          <BadgeItem icon={Target} label="Cecchino" desc="Completa tutti i task per 1 sett" unlocked />
          <BadgeItem icon={Award} label="Primato" desc="Raggiungi il livello 10" unlocked />
          <BadgeItem icon={Trophy} label="Vincitrice" desc="Supera 5 esami" unlocked />
          <BadgeItem icon={Coffee} label="Sempre Sveglia" desc="Studia dopo le 00:00" />
          <BadgeItem icon={TrendingUp} label="Imbattibile" desc="Streak di 30 giorni" />
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ icon: Icon, label, value, subtext, color }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex items-center gap-6"
    >
      <div className={`p-4 rounded-2xl ${color}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-display font-bold text-slate-700 mt-0.5">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 mt-1">{subtext}</p>
      </div>
    </motion.div>
  );
}

function BadgeItem({ icon: Icon, label, desc, unlocked }: any) {
  return (
    <div className={`flex flex-col items-center text-center group cursor-help transition-all ${unlocked ? 'opacity-100' : 'opacity-20 grayscale'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
        unlocked ? 'bg-gradient-to-br from-pink-200 to-lavender-200 text-pink-500 shadow-lg shadow-pink-100 scale-100 group-hover:scale-110' : 'bg-slate-100 text-slate-400'
      }`}>
        <Icon size={30} />
      </div>
      <p className="font-bold text-xs text-slate-700">{label}</p>
      <div className="absolute opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-md border border-pink-100 p-2 rounded-xl text-[9px] w-32 shadow-xl pointer-events-none transition-opacity -mt-20 z-50">
        {desc}
      </div>
    </div>
  );
}

function Coffee({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

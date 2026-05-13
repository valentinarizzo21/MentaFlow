import { 
  TrendingUp, 
  Clock, 
  Target, 
  GraduationCap, 
  Calendar as CalendarIcon,
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: 'Lun', hours: 4 },
  { name: 'Mar', hours: 6 },
  { name: 'Mer', hours: 3 },
  { name: 'Gio', hours: 7 },
  { name: 'Ven', hours: 5 },
  { name: 'Sab', hours: 8 },
  { name: 'Dom', hours: 2 },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800">Bentornata, Valen.</h1>
          <p className="text-slate-400 mt-1 font-medium">Oggi è un ottimo giorno per imparare qualcosa di nuovo.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/60 border border-white px-4 py-2 rounded-2xl backdrop-blur-md shadow-sm">
          <Flame className="text-pink-400 fill-pink-400" size={20} />
          <span className="font-bold text-lg text-slate-700">5 Streak</span>
        </div>
      </header>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Ore Studiate" value="12.5h" icon={Clock} change="+2.4h" color="text-sky-400" />
        <StatCard label="Task Completati" value="84%" icon={Target} change="+5%" color="text-purple-300" />
        <StatCard label="Punti XP" value="2.450" icon={Zap} change="+120" color="text-yellow-400" />
        <StatCard label="Esami Superati" value="6/10" icon={GraduationCap} change="Next: 12/06" color="text-rose-300" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2 glass-card h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-display text-slate-700">Progresso Settimanale</h3>
            <select className="bg-transparent border-none text-slate-400 focus:ring-0 cursor-pointer outline-none font-medium">
              <option value="week">Questa settimana</option>
              <option value="month">Questo mese</option>
              <option value="year">Quest'anno</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFB7C5" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#FFB7C5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="rgba(0,0,0,0.1)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(0,0,0,0.1)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,183,197,0.2)', borderRadius: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(255,183,197,0.1)' }}
                itemStyle={{ color: '#FFB7C5' }}
               />
              <Area type="monotone" dataKey="hours" stroke="#FFB7C5" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Goals */}
        <div className="glass-card flex flex-col">
          <h3 className="text-xl font-bold font-display mb-6 text-slate-700">Obiettivi del Giorno</h3>
          <div className="space-y-4 flex-1">
            <GoalItem title="Studio Analisi I" time="2 ore" progress={75} color="bg-sky-200" />
            <GoalItem title="Esercizi Fisica" time="1 ora" progress={30} color="bg-purple-200" />
            <GoalItem title="Ripasso Inglese" time="30 min" progress={100} color="bg-emerald-200" />
          </div>
          <button className="mt-6 w-full py-3 bg-pink-50/50 hover:bg-pink-100/50 border border-pink-100/50 text-pink-400 rounded-xl flex items-center justify-center gap-2 transition-all font-bold">
            Vedi tutti i task <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, change, color }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl bg-white/[0.03] ${color}`}>
          <Icon size={24} />
        </div>
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{change}</span>
      </div>
      <div className="mt-4">
        <p className="text-white/50 text-sm">{label}</p>
        <p className="text-3xl font-display font-bold mt-1 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function GoalItem({ title, time, progress, color }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="font-medium group-hover:text-[#00f2ff] transition-colors">{title}</p>
          <p className="text-xs text-white/40">{time}</p>
        </div>
        <span className="text-xs font-bold">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
        />
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import { Shield, Users, BookOpen, CheckSquare, BarChart2 } from 'lucide-react';

const stats = [
  { label: 'Utenti totali', value: '—', icon: Users, color: 'text-blue-400', bg: 'bg-blue-50' },
  { label: 'Materie create', value: '—', icon: BookOpen, color: 'text-pink-400', bg: 'bg-pink-50' },
  { label: 'Task completati', value: '—', icon: CheckSquare, color: 'text-green-400', bg: 'bg-green-50' },
  { label: 'Sessioni di studio', value: '—', icon: BarChart2, color: 'text-purple-400', bg: 'bg-purple-50' },
];

export default function AdminPanel() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100">
            <Shield className="text-purple-500" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Pannello Admin</h1>
            <p className="text-slate-400 font-medium">Gestione e monitoraggio della piattaforma</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className={`w-11 h-11 ${s.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <s.icon className={s.color} size={22} />
              </div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-sm text-slate-400 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Placeholder */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 bg-purple-50 rounded-3xl flex items-center justify-center">
            <Users className="text-purple-300" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-700">Gestione Utenti</h2>
          <p className="text-slate-400 max-w-sm">
            La lista utenti e le funzionalità di gestione verranno implementate qui. Collegamento al backend in arrivo.
          </p>
          <span className="px-4 py-1.5 bg-purple-50 text-purple-400 text-xs font-bold rounded-full border border-purple-100">
            In sviluppo
          </span>
        </div>
      </motion.div>
    </div>
  );
}

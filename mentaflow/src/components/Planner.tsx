import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 to 19:00

export default function Planner() {
  const [timerTime, setTimerTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'study' | 'break'>('study');

  // Pomodoro Logic
  useEffect(() => {
    let interval: any = null;
    if (isActive && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setIsActive(false);
      // Handle completion (optional: toast or sound)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timerTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimerTime(sessionType === 'study' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800">Pianificazione</h1>
          <p className="text-slate-400 mt-1 font-medium">Organizza le tue sessioni di studio e mantieni il ritmo.</p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-white border border-pink-50 rounded-2xl text-slate-400 hover:text-pink-400 transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <div className="px-6 py-3 bg-white border border-pink-100 rounded-2xl flex items-center gap-2 font-bold text-slate-700 shadow-sm">
            <CalendarIcon size={20} className="text-pink-400" /> Maggio 2026
          </div>
          <button className="p-3 bg-white border border-pink-50 rounded-2xl text-slate-400 hover:text-pink-400 transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Weekly Calendar View */}
        <div className="xl:col-span-2 glass-card overflow-hidden flex flex-col h-[650px]">
          <div className="grid grid-cols-7 border-b border-pink-50 bg-pink-50/20">
            {days.map((day) => (
              <div key={day} className="py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 border-r last:border-r-0 border-pink-50">
                {day}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-7 h-full min-h-[800px]">
              {days.map((_, dayIdx) => (
                <div key={dayIdx} className="relative border-r last:border-r-0 border-pink-50 h-full group">
                  {hours.map((hour) => (
                    <div key={hour} className="h-16 border-b border-pink-50/50 flex items-start px-1 pt-1 opacity-20 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-slate-300">{hour}:00</span>
                    </div>
                  ))}
                  {/* Mock Scheduled Sessions */}
                  {dayIdx === 0 && (
                    <div className="absolute top-[128px] left-1 right-1 bg-sky-100/80 backdrop-blur-md border border-sky-200 rounded-xl p-2 shadow-sm z-10 cursor-pointer hover:scale-[1.02] transition-transform">
                      <p className="text-[10px] font-bold text-sky-600 truncate">Analisi I</p>
                      <p className="text-[9px] text-sky-500">10:00 - 12:00</p>
                    </div>
                  )}
                  {dayIdx === 2 && (
                    <div className="absolute top-[256px] left-1 right-1 bg-purple-100/80 backdrop-blur-md border border-purple-200 rounded-xl p-2 shadow-sm z-10 cursor-pointer hover:scale-[1.02] transition-transform">
                      <p className="text-[10px] font-bold text-purple-600 truncate">Fisica</p>
                      <p className="text-[9px] text-purple-500">14:00 - 16:30</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-8">
          {/* Pomodoro Timer */}
          <div className="glass-card bg-gradient-to-br from-pink-50/50 to-white flex flex-col items-center p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/30 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => { setSessionType('study'); setTimerTime(25 * 60); setIsActive(false); }}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all ${sessionType === 'study' ? 'bg-pink-300 text-white shadow-md' : 'bg-white text-slate-400'}`}
              >
                Focus
              </button>
              <button 
                onClick={() => { setSessionType('break'); setTimerTime(5 * 60); setIsActive(false); }}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all ${sessionType === 'break' ? 'bg-emerald-200 text-emerald-700 shadow-md' : 'bg-white text-slate-400'}`}
              >
                Pausa
              </button>
            </div>

            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="45%" 
                  fill="none" 
                  stroke="rgba(0,0,0,0.03)" 
                  strokeWidth="8"
                />
                <motion.circle 
                  cx="50%" cy="50%" r="45%" 
                  fill="none" 
                  stroke={sessionType === 'study' ? '#FFB7C5' : '#B5EAD7'} 
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "283 283", strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * (timerTime / (sessionType === 'study' ? 25 * 60 : 5 * 60))) }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>
              <div className="text-4xl font-display font-bold text-slate-700 tabular-nums">
                {formatTime(timerTime)}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={toggleTimer}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isActive ? 'bg-slate-700 text-white' : 'bg-pink-300 text-white shadow-pink-200'}`}
              >
                {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-14 h-14 bg-white border border-pink-100 rounded-2xl flex items-center justify-center text-pink-300 hover:text-pink-400 transition-all shadow-sm"
              >
                <RotateCcw size={24} />
              </button>
            </div>
            
            <p className="mt-6 text-sm text-slate-400 font-medium">
              {sessionType === 'study' ? 'Resta concentrata, Valen!' : 'Riposa la mente 🌸'}
            </p>
          </div>

          {/* Daily Routine */}
          <div className="glass-card">
            <h3 className="text-xl font-bold font-display mb-6 text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="text-pink-300" size={20} /> Today's Flow
            </h3>
            <div className="space-y-4">
              <RoutineItem time="08:30" activity="Sveglia & Colazione" done />
              <RoutineItem time="09:15" activity="Deep Work: Analisi I" done />
              <RoutineItem time="11:30" activity="Ripasso Fisica" active />
              <RoutineItem time="13:00" activity="Pranzo" />
              <RoutineItem time="14:30" activity="Esercizi Programmazione" />
            </div>
            <button className="mt-8 w-full py-4 border-2 border-dashed border-pink-100 rounded-2xl text-pink-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-pink-50/50 hover:border-pink-200 transition-all">
              <Plus size={18} /> Aggiungi Attività
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoutineItem({ time, activity, done, active }: any) {
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      done ? 'bg-slate-50 border-slate-100 opacity-60' : 
      active ? 'bg-pink-50/50 border-pink-200 shadow-sm scale-[1.02]' : 
      'bg-white border-pink-50 hover:border-pink-100'
    }`}>
      <div className="flex items-center gap-4">
        <span className={`text-xs font-bold ${active ? 'text-pink-400' : 'text-slate-400'}`}>{time}</span>
        <span className={`text-sm font-medium ${done ? 'line-through text-slate-400' : 'text-slate-600'}`}>{activity}</span>
        {done && <CheckCircle2 size={16} className="ml-auto text-emerald-300" />}
        {active && <div className="ml-auto w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-[0_0_8px_#fb923c]" />}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SubjectManager from './components/SubjectManager';
import Planner from './components/Planner';
import TaskManager from './components/TaskManager';
import StatsOverview from './components/StatsOverview';
import AiAssistantPage from './components/AiAssistantPage';
import Settings from './components/Settings';
import Auth from './components/Auth';
import { Toaster } from 'react-hot-toast';
import { BrainCircuit, Timer, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('aether_token'));

  if (!token) {
    return (
      <>
        <Toaster position="bottom-right" />
        <Auth onLogin={(t) => setToken(t)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbff] text-slate-800 flex">
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#fff', color: '#334155', border: '1px solid rgba(255,183,197,0.2)', borderRadius: '16px' }
      }} />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-20 lg:ml-64 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Dashboard />
            </motion.div>
          )}
          {activeTab === 'subjects' && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SubjectManager />
            </motion.div>
          )}
          {activeTab === 'planner' && (
            <motion.div
              key="planner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Planner />
            </motion.div>
          )}
          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TaskManager />
            </motion.div>
          )}
          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StatsOverview />
            </motion.div>
          )}
          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AiAssistantPage />
            </motion.div>
          )}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Settings />
            </motion.div>
          )}
          {['dashboard', 'subjects', 'planner', 'tasks', 'stats', 'ai', 'settings'].indexOf(activeTab) === -1 && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 flex flex-col items-center justify-center h-full min-h-[80vh] text-center"
            >
              <div className="w-20 h-20 bg-white shadow-sm rounded-3xl flex items-center justify-center mb-6 border border-pink-50">
                <Timer className="text-pink-300" size={40} />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-800">Modulo {activeTab.toUpperCase()} in sviluppo</h2>
              <p className="text-slate-400 max-w-md mt-4 font-medium">Stiamo ottimizzando l'architettura neurale per questa funzionalità. Torna presto per l'esperienza completa.</p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-200 to-lavender-200 text-pink-500 font-bold rounded-2xl border border-pink-100 hover:shadow-lg hover:shadow-pink-100 transition-all"
              >
                Torna alla Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating AI Shortcut */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAiOpen(true)}
          className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-pink-100 border border-pink-50 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          <BrainCircuit className="text-pink-400" size={28} />
        </motion.button>
      </div>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-96 max-h-[600px] bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[32px] flex flex-col shadow-2xl z-50 overflow-hidden shadow-pink-200/20"
          >
            <div className="p-5 border-b border-pink-50 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-pink-400" size={20} />
                <span className="font-bold font-display text-slate-700">Aether AI Assistant</span>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="text-slate-300 hover:text-pink-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto min-h-[300px]">
              <div className="bg-pink-50/30 p-5 rounded-[24px] text-sm border border-pink-50 text-slate-600 leading-relaxed">
                <p>Ciao Valen! Ho analizzato i tuoi progressi. Hai studiato molto Analisi I ieri. Ti consiglio di prenderti una pausa tra 20 minuti e ripassare Chimica per l'esame del 15. ✨</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-white p-4 rounded-[24px] text-sm border border-slate-100 text-slate-500 shadow-sm">
                  <p>Grazie! Suggerimi un piano per oggi.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/50 border-t border-pink-50">
              <input 
                type="text" 
                placeholder="Chiedi all'AI..." 
                className="w-full bg-white border border-pink-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-pink-300 transition-all shadow-inner placeholder:text-slate-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

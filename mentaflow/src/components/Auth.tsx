import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthProps {
  onLogin: (token: string) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate JWT Auth
    setTimeout(() => {
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token";
      localStorage.setItem('aether_token', mockToken);
      onLogin(mockToken);
      toast.success(isLogin ? "Bentornata, studiamoci su! ✨" : "Account creato! Benvenuta in MentaFlow 🌸");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fdfbff] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card bg-white/80 p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFB7C5] to-[#E0BBE4] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100 mb-6">
            <Zap className="text-white fill-white" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-800">MentaFlow</h1>
          <p className="text-slate-400 font-medium mt-1">Il tuo futuro inizia oggi.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-200 focus:bg-white transition-all text-slate-700"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-200 focus:bg-white transition-all text-slate-700"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-200 focus:bg-white transition-all text-slate-700"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-pink-300 hover:bg-pink-400 text-white font-bold rounded-2xl shadow-lg shadow-pink-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Accedi' : 'Inizia Ora'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-pink-400 hover:text-pink-500 transition-colors"
          >
            {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-300">
          <Sparkles size={12} />
          <span>Productivity Powered by AI</span>
          <Sparkles size={12} />
        </div>
      </motion.div>
    </div>
  );
}

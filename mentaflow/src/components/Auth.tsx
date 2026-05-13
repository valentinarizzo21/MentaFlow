import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Mail, Lock, User, ArrowRight, Sparkles, Shield, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'Student' | 'Admin'>('Student');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = isLogin
        ? await authApi.login(email, password)
        : await authApi.register(username, email, password, role);

      if (!res.success || !res.data) {
        toast.error(res.message ?? 'Credenziali non valide.');
        return;
      }

      login({
        token: res.data.token,
        username: res.data.username,
        email: res.data.email,
        role: res.data.role as 'Student' | 'Admin',
        expiresAt: res.data.expiresAt,
      });

      toast.success(isLogin ? 'Bentornata! ✨' : 'Account creato! Benvenuta in MentaFlow 🌸');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Errore di connessione al server.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbff] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 -left-10 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-pink-100/30 rounded-[32px] p-10 relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFB7C5] to-[#E0BBE4] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100 mb-6">
            <Zap className="text-white fill-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">MentaFlow</h1>
          <p className="text-slate-400 font-medium mt-1">Il tuo futuro inizia oggi.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-50 rounded-2xl p-1 mb-8">
          {(['login', 'register'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setIsLogin(tab === 'login')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                (tab === 'login') === isLogin
                  ? 'bg-white text-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'login' ? 'Accedi' : 'Registrati'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="register-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Username */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    minLength={2}
                    maxLength={50}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-200 focus:bg-white transition-all text-slate-700"
                  />
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-2 gap-3">
                  {(['Student', 'Admin'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        role === r
                          ? 'border-pink-300 bg-pink-50 text-pink-600'
                          : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {r === 'Student' ? (
                        <GraduationCap size={20} />
                      ) : (
                        <Shield size={20} />
                      )}
                      <div className="text-left">
                        <p className="font-bold text-sm">{r === 'Student' ? 'Studente' : 'Admin'}</p>
                        <p className="text-xs opacity-60">{r === 'Student' ? 'Accesso completo' : 'Pannello admin'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
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

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-200 focus:bg-white transition-all text-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white font-bold rounded-2xl shadow-lg shadow-pink-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Accedi' : 'Crea Account'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-300">
          <Sparkles size={12} />
          <span>Productivity Powered by AI</span>
          <Sparkles size={12} />
        </div>
      </motion.div>
    </div>
  );
}

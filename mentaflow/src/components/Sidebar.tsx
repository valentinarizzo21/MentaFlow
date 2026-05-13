import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Settings as SettingsIcon, 
  Zap,
  LogOut,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'Materie', icon: BookOpen },
    { id: 'planner', label: 'Pianificazione', icon: Calendar },
    { id: 'tasks', label: 'Task List', icon: CheckSquare },
    { id: 'stats', label: 'Statistiche', icon: BarChart3 },
    { id: 'ai', label: 'Menta AI', icon: BrainCircuit },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-white/40 backdrop-blur-xl border-r border-pink-100/50 p-4 flex flex-col gap-8">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-10 h-10 bg-gradient-to-br from-[#FFB7C5] to-[#E0BBE4] rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(255,183,197,0.4)]">
          <Zap className="text-white fill-white" size={24} />
        </div>
        <span className="hidden lg:block font-display text-xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-400 bg-clip-text text-transparent">
          MentaFlow
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
              activeTab === item.id 
              ? 'bg-white text-pink-400 shadow-sm border border-pink-50' 
              : 'text-slate-400 hover:text-pink-300 hover:bg-white/50'
            }`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'drop-shadow-[0_0_5px_rgba(255,183,197,0.5)]' : ''} />
            <span className="hidden lg:block font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="sidebar-active"
                className="absolute left-0 w-1.5 h-6 bg-pink-300 rounded-r-full shadow-[0_0_10px_rgba(255,183,197,0.8)]"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors ${
            activeTab === 'settings' ? 'bg-white text-pink-400 shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <SettingsIcon size={22} />
          <span className="hidden lg:block font-medium">Impostazioni</span>
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('aether_token');
            window.location.reload();
          }}
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-300 hover:text-rose-500 transition-colors"
        >
          <LogOut size={22} />
          <span className="hidden lg:block font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

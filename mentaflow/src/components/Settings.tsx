import React from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800">Impostazioni</h1>
        <p className="text-slate-400 mt-1 font-medium">Personalizza la tua esperienza su AetherStudy.</p>
      </header>

      <div className="space-y-6">
        <SettingSection title="Profilo Utente">
          <div className="flex items-center gap-6 p-4">
            <div className="w-20 h-20 rounded-3xl bg-pink-100 flex items-center justify-center text-pink-400 text-2xl font-bold border-4 border-white shadow-sm">
              VR
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-700">Valentina Rizzo</h4>
              <p className="text-sm text-slate-400">Studente Ingegneria - 3° Anno</p>
              <button className="mt-2 text-xs font-bold text-pink-400 hover:text-pink-500 transition-colors">
                Modifica Avatar
              </button>
            </div>
            <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-500">
              Aggiorna
            </button>
          </div>
        </SettingSection>

        <SettingSection title="Preferenze Visuali">
          <div className="space-y-4">
            <SettingRow 
              icon={Sun} 
              label="Modalità Chiara" 
              desc="Interfaccia pulita e luminosa per il giorno."
              active
            />
            <SettingRow 
              icon={Moon} 
              label="Modalità Scura" 
              desc="Risparmia gli occhi studiando di notte."
            />
            <div className="pt-4 space-y-4 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Colore Accento</p>
              <div className="flex gap-4">
                <ColorCircle color="bg-pink-300" selected />
                <ColorCircle color="bg-purple-300" />
                <ColorCircle color="bg-sky-300" />
                <ColorCircle color="bg-emerald-300" />
                <ColorCircle color="bg-orange-300" />
              </div>
            </div>
          </div>
        </SettingSection>

        <SettingSection title="Notifiche & Privacy">
          <div className="space-y-4">
            <ToggleOption label="Notifiche Desktop" desc="Ricevi reminder per i tuoi task" active />
            <ToggleOption label="Promemoria Pomodoro" desc="Suono alla fine di ogni sessione" active />
            <ToggleOption label="Resoconto Settimanale" desc="Invia via email le tue statistiche" />
          </div>
        </SettingSection>

        <SettingSection title="Account & Sicurezza">
          <div className="space-y-4">
            <button className="w-full p-4 flex items-center justify-between bg-rose-50/30 border border-rose-100/50 rounded-2xl hover:bg-rose-50 transition-colors group">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 bg-rose-100 text-rose-500 rounded-xl">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Cambia Password</p>
                  <p className="text-xs text-slate-400">Aggiorna le tue credenziali di accesso</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 flex items-center justify-between bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 bg-slate-100 text-slate-400 rounded-xl">
                  <Database size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Esporta Dati</p>
                  <p className="text-xs text-slate-400">Scarica un backup in formato JSON</p>
                </div>
              </div>
            </button>
          </div>
        </SettingSection>
      </div>
    </div>
  );
}

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{title}</h3>
      {children}
    </div>
  );
}

function SettingRow({ icon: Icon, label, desc, active }: any) {
  return (
    <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
      active ? 'bg-white border-pink-100 shadow-sm' : 'bg-slate-50/50 border-slate-100'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${active ? 'bg-pink-100 text-pink-400' : 'bg-slate-100 text-slate-400'}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="font-bold text-slate-700">{label}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>
      {active && <Check className="text-pink-400" size={20} />}
    </div>
  );
}

function ToggleOption({ label, desc, active }: any) {
  return (
    <div className="flex items-center justify-between p-2">
      <div>
        <p className="font-bold text-slate-700 text-sm">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <button className={`w-12 h-6 rounded-full p-1 transition-all ${active ? 'bg-pink-300' : 'bg-slate-200'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-all ${active ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

function ColorCircle({ color, selected }: { color: string; selected?: boolean }) {
  return (
    <button className={`w-8 h-8 rounded-full ${color} p-1 transition-all hover:scale-110 ${selected ? 'ring-2 ring-slate-800 ring-offset-2' : ''}`}>
      {selected && <Check size={12} className="mx-auto text-white" />}
    </button>
  );
}

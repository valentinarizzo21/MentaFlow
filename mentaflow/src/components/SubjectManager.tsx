import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Plus, Search, MoreVertical, BookOpen, CheckCircle2,
  Clock, CalendarDays, X, Trash2, Archive, Pencil,
  ChevronDown, Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import {
  subjectsApi, SubjectDto, CreateSubjectPayload, UpdateSubjectPayload,
  DIFFICULTY_OPTIONS, PRIORITY_OPTIONS, ACADEMIC_STATUS_OPTIONS, COLOR_PRESETS,
} from '../services/subjectsApi';

type AcademicStatus = 'Pianificata' | 'Frequentata' | 'Superata';

const STATUS_CONFIG: Record<AcademicStatus, { icon: typeof Clock; classes: string }> = {
  Frequentata: { icon: BookOpen,      classes: 'bg-blue-50 text-blue-500 border-blue-100' },
  Superata:    { icon: CheckCircle2,  classes: 'bg-green-50 text-green-500 border-green-100' },
  Pianificata: { icon: Clock,         classes: 'bg-slate-50 text-slate-400 border-slate-100' },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  High:   'bg-rose-50 text-rose-500 border-rose-100',
  Medium: 'bg-amber-50 text-amber-500 border-amber-100',
  Low:    'bg-emerald-50 text-emerald-500 border-emerald-100',
};

// ─── Modal form state ────────────────────────────────────────────────────────
interface FormState {
  name: string; code: string; color: string;
  difficulty: number; priority: number; academicStatus: number;
  cfu: number; year: number; examDate: string;
}
const EMPTY_FORM: FormState = {
  name: '', code: '', color: '#FFB7C5',
  difficulty: 1, priority: 1, academicStatus: 0,
  cfu: 6, year: 1, examDate: '',
};
function subjectToForm(s: SubjectDto): FormState {
  return {
    name: s.name, code: s.code ?? '',
    color: s.color,
    difficulty: DIFFICULTY_OPTIONS.findIndex(o => o.label.toLowerCase() === s.difficulty.toLowerCase()),
    priority:   PRIORITY_OPTIONS.findIndex(o => o.label.toLowerCase() === s.priority.toLowerCase()),
    academicStatus: ACADEMIC_STATUS_OPTIONS.findIndex(o => o.label === s.academicStatus),
    cfu: s.cfu, year: s.year,
    examDate: s.examDate ? s.examDate.split('T')[0] : '',
  };
}

// ─── SubjectModal ────────────────────────────────────────────────────────────
function SubjectModal({
  initial, onSave, onClose, saving,
}: {
  initial: FormState;
  onSave: (f: FormState) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const set = (k: keyof FormState, v: string | number) =>
    setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {initial.name ? 'Modifica Materia' : 'Nuova Materia'}
          </h2>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Nome materia *</label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="es. Progettazione Meccanica"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all"
            />
          </div>

          {/* Code + CFU */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Codice</label>
              <input
                value={form.code}
                onChange={e => set('code', e.target.value)}
                placeholder="es. 17625"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">CFU</label>
              <input
                type="number" min={1} max={30}
                value={form.cfu}
                onChange={e => set('cfu', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all"
              />
            </div>
          </div>

          {/* Year + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Anno</label>
              <select
                value={form.year}
                onChange={e => set('year', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all appearance-none"
              >
                <option value={1}>Anno 1</option>
                <option value={2}>Anno 2</option>
                <option value={3}>Anno 3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Stato</label>
              <select
                value={form.academicStatus}
                onChange={e => set('academicStatus', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all appearance-none"
              >
                {ACADEMIC_STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Difficulty + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Difficoltà</label>
              <select
                value={form.difficulty}
                onChange={e => set('difficulty', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all appearance-none"
              >
                {DIFFICULTY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Priorità</label>
              <select
                value={form.priority}
                onChange={e => set('priority', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all appearance-none"
              >
                {PRIORITY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exam date */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Data esame</label>
            <input
              type="date"
              value={form.examDate}
              onChange={e => set('examDate', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:outline-none focus:border-pink-300 transition-all"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Colore</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map(c => (
                <button
                  key={c} type="button"
                  onClick={() => set('color', c)}
                  className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all"
          >
            Annulla
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.name.trim() || saving}
            className="flex-1 py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold rounded-2xl hover:from-pink-400 hover:to-purple-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : null}
            {initial.name ? 'Salva Modifiche' : 'Crea Materia'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── DeleteConfirm ───────────────────────────────────────────────────────────
function DeleteConfirm({ name, onConfirm, onClose, deleting }: {
  name: string; onConfirm: () => void; onClose: () => void; deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
      >
        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Trash2 className="text-rose-400" size={26} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Elimina materia</h3>
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          Stai per eliminare <strong className="text-slate-600">"{name}"</strong>.<br />
          Questa azione non può essere annullata.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all">
            Annulla
          </button>
          <button
            onClick={onConfirm} disabled={deleting}
            className="flex-1 py-3 bg-rose-400 hover:bg-rose-500 text-white font-bold rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Elimina
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── ContextMenu ─────────────────────────────────────────────────────────────
function ContextMenu({ subject, onEdit, onDelete, onArchive, onStatusChange, onClose }: {
  subject: SubjectDto;
  onEdit: () => void; onDelete: () => void; onArchive: () => void;
  onStatusChange: (status: number) => void; onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -8 }}
        className="absolute top-10 right-0 z-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[180px]"
      >
        <button onClick={() => { onEdit(); onClose(); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Pencil size={15} className="text-slate-400" /> Modifica
        </button>
        <div className="border-t border-slate-50 my-1" />
        <p className="px-4 py-1 text-[10px] font-bold text-slate-300 uppercase tracking-wider">Cambia stato</p>
        {ACADEMIC_STATUS_OPTIONS.map(o => (
          <button
            key={o.value}
            onClick={() => { onStatusChange(o.value); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${subject.academicStatus === o.label ? 'text-pink-400 font-bold bg-pink-50' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            {o.label}
          </button>
        ))}
        <div className="border-t border-slate-50 my-1" />
        {!subject.isArchived && (
          <button onClick={() => { onArchive(); onClose(); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-amber-500 hover:bg-amber-50 transition-colors">
            <Archive size={15} /> Archivia
          </button>
        )}
        <button onClick={() => { onDelete(); onClose(); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-50 transition-colors">
          <Trash2 size={15} /> Elimina
        </button>
      </motion.div>
    </>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function SubjectManager() {
  const [subjects, setSubjects] = useState<SubjectDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showArchived, setShowArchived] = useState(false);

  const [modal, setModal] = useState<{ open: boolean; subject?: SubjectDto }>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<SubjectDto | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load
  const loadSubjects = useCallback(async () => {
    try {
      const res = await subjectsApi.getAll(showArchived);
      if (res.success) setSubjects(res.data);
    } catch {
      toast.error('Errore nel caricamento delle materie');
    } finally {
      setLoading(false);
    }
  }, [showArchived]);

  useEffect(() => { loadSubjects(); }, [loadSubjects]);

  // Create / Update
  const handleSave = async (form: FormState) => {
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        code: form.code.trim() || undefined,
        color: form.color,
        difficulty: form.difficulty,
        priority: form.priority,
        academicStatus: form.academicStatus,
        cfu: form.cfu,
        year: form.year,
        examDate: form.examDate || null,
      };

      if (modal.subject) {
        const res = await subjectsApi.update(modal.subject.id, payload as UpdateSubjectPayload);
        if (res.success) {
          setSubjects(prev => prev.map(s => s.id === modal.subject!.id ? res.data : s));
          toast.success('Materia aggiornata!');
        }
      } else {
        const res = await subjectsApi.create(payload as CreateSubjectPayload);
        if (res.success) {
          setSubjects(prev => [...prev, res.data]);
          toast.success('Materia creata!');
        }
      }
      setModal({ open: false });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Errore nel salvataggio');
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await subjectsApi.delete(deleteTarget.id);
      setSubjects(prev => prev.filter(s => s.id !== deleteTarget.id));
      toast.success('Materia eliminata');
      setDeleteTarget(null);
    } catch {
      toast.error('Errore nell\'eliminazione');
    } finally {
      setDeleting(false);
    }
  };

  // Archive
  const handleArchive = async (s: SubjectDto) => {
    try {
      const res = await subjectsApi.archive(s.id);
      if (res.success) {
        setSubjects(prev => prev.map(x => x.id === s.id ? res.data : x));
        toast.success('Materia archiviata');
      }
    } catch {
      toast.error('Errore nell\'archiviazione');
    }
  };

  // Status change
  const handleStatusChange = async (s: SubjectDto, status: number) => {
    try {
      const res = await subjectsApi.update(s.id, { academicStatus: status });
      if (res.success) {
        setSubjects(prev => prev.map(x => x.id === s.id ? res.data : x));
        toast.success('Stato aggiornato');
      }
    } catch {
      toast.error('Errore nell\'aggiornamento dello stato');
    }
  };

  // Filters
  const visible = useMemo(() => subjects.filter(s => {
    if (!showArchived && s.isArchived) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !(s.code ?? '').toLowerCase().includes(search.toLowerCase())) return false;
    if (filterYear !== 'all' && s.year !== filterYear) return false;
    if (filterStatus !== 'all' && s.academicStatus !== filterStatus) return false;
    return true;
  }), [subjects, search, filterYear, filterStatus, showArchived]);

  const byYear = useMemo(() => {
    const m: Record<number, SubjectDto[]> = {};
    visible.forEach(s => { (m[s.year] ??= []).push(s); });
    return m;
  }, [visible]);

  const totalCfu = subjects.filter(s => !s.isArchived).reduce((a, s) => a + s.cfu, 0);
  const doneCfu  = subjects.filter(s => s.academicStatus === 'Superata').reduce((a, s) => a + s.cfu, 0);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">Le Tue Materie</h1>
          <p className="text-slate-400 mt-1 font-medium">
            Ingegneria Meccanica — Unimarconi
            {!loading && ` · ${doneCfu}/${totalCfu} CFU superati`}
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true })}
          className="px-6 py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold rounded-2xl flex items-center gap-2 hover:from-pink-400 hover:to-purple-400 transition-all shadow-lg shadow-pink-100"
        >
          <Plus size={20} /> Nuova Materia
        </button>
      </header>

      {/* CFU Progress */}
      {!loading && subjects.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-3">
            <span>Avanzamento CFU</span>
            <span className="text-pink-400">{totalCfu > 0 ? Math.round((doneCfu / totalCfu) * 100) : 0}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-full transition-all duration-500"
              style={{ width: `${totalCfu > 0 ? (doneCfu / totalCfu) * 100 : 0}%` }}
            />
          </div>
          <div className="flex gap-6 mt-4 text-xs font-bold text-slate-400">
            {(['Superata', 'Frequentata', 'Pianificata'] as AcademicStatus[]).map(st => {
              const cfg = STATUS_CONFIG[st];
              const Icon = cfg.icon;
              const count = subjects.filter(s => s.academicStatus === st).length;
              return (
                <span key={st} className="flex items-center gap-1.5">
                  <Icon size={12} /> {count} {st}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input
            type="text" placeholder="Cerca materia o codice..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-pink-200 transition-all text-slate-600 shadow-sm"
          />
        </div>
        <div className="relative">
          <select
            value={filterYear}
            onChange={e => setFilterYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-3 pr-8 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-500 focus:outline-none appearance-none shadow-sm"
          >
            <option value="all">Tutti gli anni</option>
            <option value={1}>Anno 1</option>
            <option value={2}>Anno 2</option>
            <option value={3}>Anno 3</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-3 pr-8 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-500 focus:outline-none appearance-none shadow-sm"
          >
            <option value="all">Tutti gli stati</option>
            <option value="Frequentata">Frequentata</option>
            <option value="Superata">Superata</option>
            <option value="Pianificata">Pianificata</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <button
          onClick={() => setShowArchived(v => !v)}
          className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-all shadow-sm ${showArchived ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-white text-slate-400 border-slate-100'}`}
        >
          <Archive size={16} className="inline mr-1.5" />
          Archiviate
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-pink-300" size={40} />
        </div>
      )}

      {/* Empty state */}
      {!loading && visible.length === 0 && (
        <div className="text-center py-20">
          <BookOpen size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="font-bold text-slate-400">
            {subjects.length === 0 ? 'Nessuna materia ancora — aggiungine una!' : 'Nessun risultato per i filtri selezionati'}
          </p>
          {subjects.length === 0 && (
            <button
              onClick={() => setModal({ open: true })}
              className="mt-4 px-6 py-3 bg-pink-50 text-pink-400 font-bold rounded-2xl border border-pink-100 hover:bg-pink-100 transition-all"
            >
              <Plus size={16} className="inline mr-1" /> Aggiungi la prima materia
            </button>
          )}
        </div>
      )}

      {/* Cards by year */}
      {!loading && Object.entries(byYear).sort(([a], [b]) => Number(a) - Number(b)).map(([year, list]) => (
        <section key={year}>
          <div className="flex items-center gap-3 mb-5">
            <CalendarDays size={18} className="text-pink-300" />
            <h2 className="text-lg font-bold text-slate-600">Anno di Corso {year}</h2>
            <span className="text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
              {list.reduce((a, s) => a + s.cfu, 0)} CFU
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence>
              {list.map((subject, idx) => {
                const status = subject.academicStatus as AcademicStatus;
                const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pianificata;
                const StatusIcon = cfg.icon;

                return (
                  <motion.div
                    key={subject.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden ${subject.isArchived ? 'opacity-60' : ''}`}
                  >
                    {/* Color bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: subject.color }} />

                    <div className="p-6 mt-1">
                      {/* Top row */}
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${subject.color}25`, border: `1.5px solid ${subject.color}50` }}
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                        </div>
                        <div className="flex items-center gap-2 relative">
                          {subject.code && <span className="text-xs font-bold text-slate-300">#{subject.code}</span>}
                          <button
                            onClick={() => setOpenMenu(openMenu === subject.id ? null : subject.id)}
                            className="text-slate-200 hover:text-pink-300 transition-colors p-1"
                          >
                            <MoreVertical size={18} />
                          </button>
                          <AnimatePresence>
                            {openMenu === subject.id && (
                              <ContextMenu
                                subject={subject}
                                onEdit={() => setModal({ open: true, subject })}
                                onDelete={() => setDeleteTarget(subject)}
                                onArchive={() => handleArchive(subject)}
                                onStatusChange={status => handleStatusChange(subject, status)}
                                onClose={() => setOpenMenu(null)}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-slate-700 leading-snug mb-3 group-hover:text-pink-400 transition-colors line-clamp-2 min-h-[44px]">
                        {subject.name}
                      </h3>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.classes}`}>
                          <StatusIcon size={10} /> {status}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${DIFFICULTY_COLOR[subject.difficulty] ?? ''}`}>
                          {subject.difficulty}
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="text-sm text-slate-400 font-medium">
                          <strong className="text-slate-600">{subject.cfu}</strong> CFU
                          {subject.examDate && (
                            <span className="ml-3 text-xs text-slate-300">
                              📅 {new Date(subject.examDate).toLocaleDateString('it-IT')}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setModal({ open: true, subject })}
                            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 transition-all"
                          >
                            Modifica
                          </button>
                          {status !== 'Superata' && (
                            <button
                              onClick={() => handleStatusChange(subject, 1)}
                              className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-400 border border-pink-100 rounded-xl text-xs font-bold transition-all"
                            >
                              Studia
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      ))}

      {/* Modals */}
      <AnimatePresence>
        {modal.open && (
          <SubjectModal
            initial={modal.subject ? subjectToForm(modal.subject) : EMPTY_FORM}
            onSave={handleSave}
            onClose={() => setModal({ open: false })}
            saving={saving}
          />
        )}
        {deleteTarget && (
          <DeleteConfirm
            name={deleteTarget.name}
            onConfirm={handleDelete}
            onClose={() => setDeleteTarget(null)}
            deleting={deleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Send, 
  FileText, 
  Lightbulb, 
  BarChart3,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getStudyAdvice, generateQuiz, chatWithAi } from '../services/gemini';
import toast from 'react-hot-toast';

export default function AiAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ciao Valen! Sono Menta AI, il tuo compagno di studio intelligente. Come posso aiutarti oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<any[]>([]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAi(messages, input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      toast.error("Errore nella comunicazione con l'AI");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    toast.loading("Generazione quiz dagli appunti...", { id: 'quiz-loading' });
    try {
      const mockNotes = "Analisi Matematica I: Le derivate rappresentano il coefficiente angolare della retta tangente. La derivata di x^2 è 2x. Il teorema di Rolle afferma che se una funzione è continua in [a,b] e derivabile in (a,b) con f(a)=f(b), allora esiste c tale che f'(c)=0.";
      const newQuiz = await generateQuiz(mockNotes);
      setQuiz(newQuiz);
      toast.success("Quiz generato con successo!", { id: 'quiz-loading' });
    } catch (error) {
      toast.error("Non sono riuscito a generare il quiz", { id: 'quiz-loading' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight text-slate-800 flex items-center gap-3">
          Menta AI <Sparkles className="text-pink-300" />
        </h1>
        <p className="text-slate-400 mt-1 font-medium">L'intelligenza artificiale al servizio del tuo successo accademico.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
          {/* Suggested Prompts */}
          <div className="glass-card">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Prompt Suggeriti</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setInput("Pianifica la mia sessione di oggi")}
                className="px-3 py-2 bg-white border border-pink-50 rounded-xl text-[10px] font-bold text-slate-500 hover:border-pink-200 hover:text-pink-400 transition-all"
              >
                Pianifica giornata
              </button>
              <button 
                onClick={() => setInput("Spiegami le derivate in modo semplice")}
                className="px-3 py-2 bg-white border border-pink-50 rounded-xl text-[10px] font-bold text-slate-500 hover:border-pink-200 hover:text-pink-400 transition-all"
              >
                Spiega concetto
              </button>
              <button 
                onClick={() => setInput("Come posso migliorare la mia media?")}
                className="px-3 py-2 bg-white border border-pink-50 rounded-xl text-[10px] font-bold text-slate-500 hover:border-pink-200 hover:text-pink-400 transition-all"
              >
                Consigli media
              </button>
            </div>
          </div>

          {/* Left Column: AI Features */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2">
          <AiFeatureCard 
            icon={BarChart3}
            title="Analisi Progressi"
            desc="Analizza i tuoi dati di studio per trovare punti di forza e debolezze."
            color="bg-sky-50 text-sky-500 border-sky-100"
            onClick={() => toast.success("Analizzando i tuoi progressi...")}
          />
          <AiFeatureCard 
            icon={FileText}
            title="Genera Quiz"
            desc="Trasforma i tuoi appunti in domande interattive per testare la tua memoria."
            color="bg-pink-50 text-pink-500 border-pink-100"
            onClick={handleGenerateQuiz}
          />
          <AiFeatureCard 
            icon={Lightbulb}
            title="Piano Studio Smart"
            desc="Lascia che l'AI ottimizzi la tua giornata in base alle date d'esame."
            color="bg-purple-50 text-purple-500 border-purple-100"
            onClick={() => toast.success("Ottimizzando il tuo piano studio...")}
          />

          {/* Generated Quiz Section */}
          <AnimatePresence>
            {quiz.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card mt-8 border-pink-200 bg-pink-50/20"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-pink-400 flex items-center gap-2">
                    <HelpCircle size={18} /> Quick Quiz
                  </h4>
                  <button onClick={() => setQuiz([])} className="text-slate-300 hover:text-rose-400">
                    <RefreshCw size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {quiz.map((q, i) => (
                    <div key={i} className="bg-white/80 p-3 rounded-xl border border-pink-50 text-xs shadow-sm">
                      <p className="font-bold text-slate-700 mb-2">{q.question}</p>
                      <div className="space-y-1">
                        {q.options.map((opt: string, oi: number) => (
                          <div key={oi} className="p-2 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors text-slate-500 border border-transparent hover:border-pink-100">
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-8 glass-card border-none bg-white/40 flex flex-col h-[600px] lg:h-full">
          <div className="p-4 border-b border-pink-50 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-pink-50 text-pink-400">
              <BrainCircuit size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-700">Conversazione Live</p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-[28px] text-sm shadow-sm border ${
                  m.role === 'user' 
                  ? 'bg-gradient-to-br from-pink-200 to-lavender-200 text-pink-600 border-pink-100 rounded-tr-none' 
                  : 'bg-white text-slate-600 border-slate-100 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{m.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-[28px] rounded-tl-none border border-slate-100 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-200 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/50 border-t border-pink-50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Chiedi cosa studiare oggi, genera un quiz o analizza i dati..." 
                className="w-full bg-white border border-pink-100 rounded-[20px] px-6 py-4 text-sm focus:outline-none focus:border-pink-300 transition-all shadow-inner pr-16 placeholder:text-slate-300"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-pink-300 text-white rounded-2xl flex items-center justify-center hover:bg-pink-400 transition-all shadow-md shadow-pink-100 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiFeatureCard({ icon: Icon, title, desc, color, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left glass-card flex items-center gap-6 group hover:border-pink-200`}
    >
      <div className={`p-4 rounded-2xl ${color} shadow-sm transition-transform group-hover:scale-110`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-bold text-slate-700 transition-colors group-hover:text-pink-400">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 leading-snug">{desc}</p>
      </div>
      <ArrowRight className="ml-auto text-slate-200 group-hover:text-pink-200 transition-colors" size={20} />
    </motion.button>
  );
}

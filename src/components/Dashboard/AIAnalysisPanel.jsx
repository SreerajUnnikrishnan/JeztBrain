import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Loader2, Target, CheckCircle, ShieldAlert, Zap, BookOpen } from 'lucide-react';

export default function AIAnalysisPanel({ isOpen, onClose }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);

    // Simulate AI thinking
    setTimeout(() => {
      setResult({
        threat: input,
        severity: 'Critical',
        score: '9.8',
        explanation: 'The observed behavior indicates a highly sophisticated exploit attempt targeting unpatched vulnerabilities in the authentication layer.',
        advice: 'Rotate all session keys, implement multi-factor authentication for the affected endpoint, and deploy WAF rules to block the originating IP range.',
        detection: 'Monitor for spikes in 401/403 errors and unusual token rotation patterns in the IAM logs.'
      });
      setAnalyzing(false);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#030712] border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                <Cpu size={24} className={analyzing ? 'animate-pulse' : ''} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">AI Heuristic Engine</h2>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Authorized_Specialist_Link_V2.4</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 text-slate-500 hover:text-white bg-white/5 rounded-full transition-all hover:rotate-90">
              <X size={20} />
            </button>
          </div>

          <div className="p-8">
            {!result && !analyzing ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="h-16 w-16 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                    <Target size={32} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Initialize Threat Scan</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">Input threat data or incident logs for professional AI decomposition and risk assessment.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Threat Description / Log Snippet</label>
                  <textarea 
                    rows="4"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. SQL Injection detected on login API..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                  />
                </div>

                <button 
                  onClick={handleAnalyze} 
                  disabled={!input.trim()}
                  className="w-full py-4 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-2xl shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
                >
                  <Zap size={18} />
                  Run Tactical Analysis
                </button>
              </div>
            ) : analyzing ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
                  <Loader2 size={64} className="text-purple-400 animate-spin relative" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Processing Vectors...</h3>
                <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.3em] animate-pulse">Consulting Threat_Intelligence_Grid</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5">
                    <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <ShieldAlert size={14} /> Risk Level
                    </p>
                    <p className="text-2xl font-black text-white">{result.severity}</p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
                    <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Zap size={14} /> CVSS Score
                    </p>
                    <p className="text-2xl font-black text-white">{result.score}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                      <BookOpen size={14} /> Threat Explanation
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-5 italic">
                      "{result.explanation}"
                    </p>
                  </section>

                  <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
                      <CheckCircle size={14} /> Mitigation Advice
                    </h4>
                    <p className="text-sm text-emerald-100/70 leading-relaxed font-medium">
                      {result.advice}
                    </p>
                  </section>

                  <section className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                      <Zap size={14} /> Detection Logic
                    </h4>
                    <p className="text-[11px] font-mono text-fuchsia-400/80 leading-relaxed">
                      {result.detection}
                    </p>
                  </section>
                </div>

                <button 
                  onClick={() => {setResult(null); setInput('');}}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all border border-white/10"
                >
                  New Analysis
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


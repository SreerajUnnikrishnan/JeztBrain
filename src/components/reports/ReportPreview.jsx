import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Download, Copy, Printer, ShieldCheck, Clock, ShieldAlert, Cpu } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ReportPreview({ report, onBack }) {
  const { user } = useAuth();

  const handleSave = async () => {
    try {
      const { error } = await supabase.from('reports').insert([{
        expert_id: user.id,
        title: report.title,
        content: report.sections,
        severity: report.metadata.severity
      }]);

      if (error) throw error;
      toast.success('Report saved to SOC archive.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save report.');
    }
  };

  const handleCopy = () => {
    const text = Object.entries(report.sections)
      .map(([key, val]) => `${key.toUpperCase()}\n${val}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const getSeverityColor = (sev) => {
    switch(sev) {
      case 'critical': return 'text-rose-500';
      case 'high': return 'text-amber-500';
      case 'medium': return 'text-fuchsia-400';
      default: return 'text-emerald-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Actions Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-3xl backdrop-blur-xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back to Generator
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={handleCopy} className="flex-1 sm:flex-none p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2 text-xs font-bold uppercase">
            <Copy size={16} /> Copy
          </button>
          <button onClick={() => window.print()} className="flex-1 sm:flex-none p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2 text-xs font-bold uppercase">
            <Printer size={16} /> Print
          </button>
          <button onClick={handleSave} className="flex-1 sm:flex-none p-2.5 bg-fuchsia-500 hover:bg-fuchsia-400 text-black rounded-xl transition-all shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2 text-xs font-extrabold uppercase">
            <Save size={16} /> Save Archive
          </button>
        </div>
      </div>

      {/* The Report Document */}
      <div className="bg-white p-8 sm:p-16 text-slate-900 rounded-[2rem] shadow-2xl relative overflow-hidden">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-b-4 border-slate-900 pb-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">JeztBrain SOC</h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Tactical Response Unit</p>
              </div>
            </div>
            <div className="pt-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Report_ID:</p>
              <p className="text-sm font-mono font-bold text-slate-900">{report.title}</p>
            </div>
          </div>

          <div className="text-right space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-full">
              <div className={`h-3 w-3 rounded-full animate-pulse ${report.metadata.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
              <span className={`text-xs font-black uppercase tracking-widest ${getSeverityColor(report.metadata.severity)}`}>
                Severity: {report.metadata.severity}
              </span>
            </div>
            <div className="space-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center justify-end gap-2">
                <Clock size={12} /> {new Date(report.metadata.timestamp).toLocaleDateString()}
              </div>
              <div className="flex items-center justify-end gap-2">
                <ShieldAlert size={12} /> AUTH_SIG: {report.metadata.expert}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">01. Executive Summary</h3>
              <p className="text-lg leading-relaxed font-medium text-slate-800">{report.sections.executiveSummary}</p>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">02. Vulnerability Details</h3>
              <p className="leading-relaxed text-slate-700 whitespace-pre-wrap">{report.sections.vulnerabilityDetails}</p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">04. Affected Systems</h3>
              <div className="flex flex-wrap gap-2">
                {report.sections.affectedSystems.split(',').map((sys, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-bold font-mono text-slate-600">
                    {sys.trim()}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">06. Indicators of Compromise</h3>
              <div className="bg-slate-900 text-fuchsia-400 p-6 rounded-2xl font-mono text-xs leading-loose shadow-xl">
                {report.sections.indicatorsOfComprosmise}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <section className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">09. AI Threat Intelligence</h3>
              <p className="text-sm leading-relaxed italic text-slate-300">"{report.sections.aiThreatIntel}"</p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">
                <Cpu size={14} /> Heuristic Engine Verified
              </div>
            </section>

            <section className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-4">08. Mitigation Steps</h3>
              <p className="text-sm leading-relaxed text-emerald-900 whitespace-pre-wrap font-medium">
                {report.sections.recommendedMitigation}
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-slate-100 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">
            Confidential • JeztBrain Security Operations • Authorized Personnel Only
          </p>
        </div>

        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-[0.03]">
          <h1 className="text-[15rem] font-black uppercase whitespace-nowrap">CLASSIFIED</h1>
        </div>
      </div>
    </div>
  );
}

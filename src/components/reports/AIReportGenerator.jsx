import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Cpu, AlertTriangle, Loader2, Zap, Download,
  ShieldAlert, RefreshCw, ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ReportPreview from './ReportPreview';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import axios from 'axios';
import { supabase } from '../../lib/supabase';

const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'];
const INCIDENT_TYPES = ['Exploit', 'Malware', 'Phishing', 'DDoS', 'Ransomware', 'Data Breach', 'Insider Threat', 'APT'];

export default function AIReportGenerator({ className = '' }) {
  const { user, getAccessToken } = useAuth();
  const [step, setStep] = useState('input'); // input | generating | preview
  const [formData, setFormData] = useState({
    vulnerability: '',
    severity: 'high',
    incidentType: 'Exploit',
    affectedSystems: '',
    summary: '',
  });
  const [generatedReport, setGeneratedReport] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [loadingIncidents, setLoadingIncidents] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Initializing neural engine...');

  // ─── Load recent incidents so expert can attach report to one ─────────────
  useEffect(() => {
    if (!user) return;
    const fetchIncidents = async () => {
      try {
        const { data, error } = await supabase
          .from('incidents')
          .select('id, incidenttype, severitylevel, ticket_number, status, created_at')
          .eq('expert_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (!error && data) {
          setIncidents(data);
          if (data.length > 0 && !selectedIncident) {
            const first = data[0];
            setSelectedIncident(first);
            setFormData(prev => ({
              ...prev,
              incidentType: first.incidenttype || 'Exploit',
              severity: (first.severitylevel || 'high').toLowerCase(),
            }));
          }
        }
      } catch (err) {
        console.error('[AIReportGen] loadIncidents:', err.message);
      } finally {
        setLoadingIncidents(false);
      }
    };
    fetchIncidents();
  }, [user]);

  // ─── Fill form when incident is selected ──────────────────────────────────
  const onSelectIncident = (inc) => {
    setSelectedIncident(inc);
    setFormData(prev => ({
      ...prev,
      incidentType: inc.incidenttype || prev.incidentType,
      severity: (inc.severitylevel || 'high').toLowerCase(),
    }));
  };

  // ─── Generate via backend AI endpoint ─────────────────────────────────────
  const handleGenerate = async () => {
    if (!formData.vulnerability.trim() || !formData.summary.trim()) {
      toast.error('Please fill in Vulnerability Title and Incident Summary.');
      return;
    }

    setStep('generating');
    setProgress(0);

    // Animate the progress bar while the request is in-flight
    const stages = [
      { pct: 15,  label: 'Correlating threat vectors...' },
      { pct: 35,  label: 'Running CVSS v3.1 scoring...' },
      { pct: 55,  label: 'Generating executive summary...' },
      { pct: 75,  label: 'Building mitigation roadmap...' },
      { pct: 90,  label: 'Finalizing tactical assessment...' },
    ];

    let stageIdx = 0;
    const tick = setInterval(() => {
      if (stageIdx < stages.length) {
        setProgress(stages[stageIdx].pct);
        setProgressLabel(stages[stageIdx].label);
        stageIdx++;
      }
    }, 700);

    try {
      const token = await getAccessToken();

      const incidentPayload = {
        id:              selectedIncident?.id || 'MANUAL',
        ticket_number:   selectedIncident?.ticket_number || 'N/A',
        incidenttype:    formData.incidentType,
        severitylevel:   formData.severity,
        description:     formData.summary,
        affectedsystems: formData.affectedSystems,
        vulnerability:   formData.vulnerability,
        status:          selectedIncident?.status || 'investigating',
      };

      const res = await axios.post(
        `${BACKEND_URL}/api/ai/generate-report`,
        { incident: incidentPayload },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      clearInterval(tick);
      setProgress(100);
      setProgressLabel('Report compiled successfully.');

      // Small pause to show 100%
      await new Promise(r => setTimeout(r, 400));

      setGeneratedReport(res.data.report);
      setStep('preview');
      toast.success('AI Report generated successfully');
    } catch (err) {
      clearInterval(tick);
      console.error('[AIReportGen] generate error:', err.message);
      const msg = err.response?.data?.message || 'AI service temporarily unavailable.';
      toast.error(msg);
      setStep('input');
    }
  };

  // ─── Severity helpers ──────────────────────────────────────────────────────
  const severityActiveClass = (lvl) => {
    const map = {
      low:      'bg-purple-500 text-black shadow-[0_0_12px_rgba(123, 47, 247,0.4)]',
      medium:   'bg-yellow-500 text-black shadow-[0_0_12px_rgba(234,179,8,0.4)]',
      high:     'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.4)]',
      critical: 'bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]',
    };
    return map[lvl] || '';
  };
  const severityIdleClass = (lvl) => {
    const map = {
      low:      'border-purple-500/20 text-purple-400/60',
      medium:   'border-yellow-500/20 text-yellow-400/60',
      high:     'border-orange-500/20 text-orange-400/60',
      critical: 'border-red-500/20 text-red-400/60',
    };
    return map[lvl] || 'border-white/10 text-slate-600';
  };

  // ──────────────────────────────────────────────────────────────────────────
  if (step === 'generating') {
    return (
      <div className={`flex flex-col items-center justify-center h-full min-h-[400px] bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10 ${className}`}>
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-fuchsia-500/20 blur-3xl rounded-full animate-pulse" />
          <Cpu size={56} className="text-fuchsia-500 animate-spin relative" style={{ animationDuration: '3s' }} />
        </div>
        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Generating Report</h3>
        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] text-center mb-10">
          {progressLabel}
        </p>
        <div className="w-full max-w-[280px] h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-[0_0_15px_rgba(123, 47, 247,0.6)]"
          />
        </div>
        <p className="mt-3 text-[9px] font-mono text-slate-600 uppercase tracking-widest">{progress}%</p>
      </div>
    );
  }

  if (step === 'preview' && generatedReport) {
    return (
      <div className={`h-full bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col ${className}`}>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <ReportPreview report={generatedReport} onBack={() => { setStep('input'); setGeneratedReport(null); }} />
        </div>
      </div>
    );
  }

  // ─── Input form ────────────────────────────────────────────────────────────
  return (
    <div className={`bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl ${className}`}>

      {/* Header */}
      <div className="p-5 border-b border-white/5 bg-white/[0.02] shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-3">
            <div className="relative">
              <FileText className="text-fuchsia-400" size={20} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(123, 47, 247,1)]" />
            </div>
            AI_Report_Generator
          </h2>
          <span className="px-2 py-0.5 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded text-[9px] font-mono text-fuchsia-400 uppercase tracking-widest">
            v4.0_SOC
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-medium">
          Powered by backend AI — generates a full SOC report from incident data
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">

        {/* Incident selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
            Link to Incident (Optional)
          </label>
          <div className="relative">
            <select
              value={selectedIncident?.id || ''}
              onChange={(e) => {
                const inc = incidents.find(i => i.id === e.target.value);
                if (inc) onSelectIncident(inc);
                else setSelectedIncident(null);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-mono text-white focus:outline-none focus:border-fuchsia-500/50 appearance-none cursor-pointer uppercase tracking-widest"
            >
              <option value="">— Manual entry —</option>
              {incidents.map(inc => (
                <option key={inc.id} value={inc.id}>
                  {inc.ticket_number || inc.id.substring(0,8)} · {inc.incidenttype} · {inc.severitylevel}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Vulnerability title */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
            Vulnerability / Attack Vector *
          </label>
          <input
            type="text"
            placeholder="e.g. Remote Code Execution via CVE-2024-XXXX"
            value={formData.vulnerability}
            onChange={(e) => setFormData({ ...formData, vulnerability: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
          />
        </div>

        {/* Severity */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
            Severity Classification *
          </label>
          <div className="grid grid-cols-4 gap-2">
            {SEVERITY_LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFormData({ ...formData, severity: lvl })}
                className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${
                  formData.severity === lvl
                    ? severityActiveClass(lvl) + ' scale-[1.04]'
                    : 'bg-white/5 border-white/5 text-slate-600 hover:border-white/20 ' + severityIdleClass(lvl)
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Incident type + affected systems */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
              Incident Type
            </label>
            <div className="relative">
              <select
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-mono text-white focus:outline-none focus:border-fuchsia-500/50 appearance-none cursor-pointer uppercase"
              >
                {INCIDENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
              Affected Systems
            </label>
            <input
              type="text"
              placeholder="e.g. API Gateway, DB"
              value={formData.affectedSystems}
              onChange={(e) => setFormData({ ...formData, affectedSystems: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white focus:outline-none focus:border-fuchsia-500/50 transition-all"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
            Incident Summary *
          </label>
          <textarea
            rows={5}
            placeholder="Describe what happened, initial findings, and any evidence collected..."
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none custom-scrollbar"
          />
        </div>

        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-3">
          <AlertTriangle className="text-amber-500/60 shrink-0 mt-0.5" size={13} />
          <p className="text-[10px] text-amber-200/30 leading-relaxed italic">
            Report is generated by the JeztBrain AI engine (OpenAI / Gemini). Content is augmented with real threat intelligence context.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-white/5 bg-black/40 space-y-3 shrink-0">
        <button
          onClick={handleGenerate}
          className="w-full py-4 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-black uppercase text-xs rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-fuchsia-500/20 active:scale-[0.98] group"
        >
          <Zap size={16} className="group-hover:animate-pulse" />
          Generate AI Report
        </button>
        <button
          onClick={() => { setFormData({ vulnerability: '', severity: 'high', incidentType: 'Exploit', affectedSystems: '', summary: '' }); setSelectedIncident(null); }}
          className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={12} /> Clear Form
        </button>
      </div>
    </div>
  );
}

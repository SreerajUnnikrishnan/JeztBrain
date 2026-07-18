import React, { useState, useRef } from 'react';
import { useAuth, BACKEND_URL } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Send, Paperclip, AlertTriangle, CheckCircle2, Terminal, Activity, Zap, X, FileIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ReportIncident() {
  const { user, getAccessToken } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [incidentType, setIncidentType] = useState('');
  const [severityLevel, setSeverityLevel] = useState('medium');
  const [description, setDescription] = useState('');
  const [affectedSystems, setAffectedSystems] = useState('');
  const [submittedIncident, setSubmittedIncident] = useState(null);
  
  const [attachedFile, setAttachedFile] = useState(null);
  const [error, setError] = useState(null);

  const getAiSuggestion = () => {
    if (!incidentType) return "Awaiting intelligence classification...";
    if (incidentType === 'phishing') return "Immediate isolation of user credentials required. Initiate header forensics.";
    if (incidentType === 'malware') return "Deploy air-gap protocols. Shutdown targeted node interfaces. Memory dump requested.";
    if (incidentType === 'unauthorized_access') return "Audit admin logs for lateral movement. Reset global MFA tokens.";
    if (incidentType === 'data_leak') return "Check egress filters. Identify exfiltrated packet signatures.";
    return "Intelligence logged. SOC Tactical Unit is standing by for manual triage.";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !user?.id) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading('Initializing SOC Uplink...');
    
    try {
      const token = await getAccessToken();
      
      const response = await axios.post(`${BACKEND_URL}/api/incidents/create`, {
        incidenttype: incidentType,
        severitylevel: severityLevel,
        description: description,
        affectedsystems: affectedSystems
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.dismiss(loadingToast);
        
        const incident = response.data.incident;

        // Emit real-time event to Expert Dashboard
        if (socket) {
          socket.emit("new_incident", incident);
        }

        toast.success(`INCIDENT LOGGED [TICKET: ${incident.ticket_number}]`, {
          icon: '✅',
          style: { border: '1px solid #10b981' }
        });

        setSubmittedIncident(incident);
        setSubmitted(true);
        
        // Auto-clear form
        setIncidentType('');
        setDescription('');
        setAffectedSystems('');
      }
    } catch (err) {
      console.error("SOC_TRANSMISSION_FAILURE:", err);
      const msg = err.response?.data?.message || err.message || 'Check network uplink.';
      toast.error(`TRANSMISSION_ERROR: ${msg}`, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto py-12">
        <div className="bg-slate-900/60 border border-emerald-500/40 p-12 rounded-[40px] backdrop-blur-3xl text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
            <CheckCircle2 size={48} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Intelligence Transmitted</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-lg mx-auto font-medium font-mono">
            Ticket <span className="text-emerald-400">#{submittedIncident?.ticket_number}</span> is now active in the SOC pipeline.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => { setSubmitted(false); setAttachedFile(null); setIncidentType(''); setDescription(''); }} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-xs">
              New Transmission
            </button>
            <button onClick={() => navigate(`/incidents/${submittedIncident?.id}`)} className="px-10 py-5 bg-fuchsia-500 text-black rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(123, 47, 247,0.4)] transition-all uppercase tracking-[0.2em] text-xs">
              Track Incident
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-[10px] uppercase tracking-widest">
          <Activity size={12} className="animate-pulse" /> Emergency Vector Active
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4">
          <ShieldAlert size={36} className="text-fuchsia-400" /> Tactical Incident Report
        </h1>
        <p className="text-slate-400 text-lg">Detailed telemetry required for autonomous response and expert triage.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-white/5 p-10 rounded-[40px] backdrop-blur-xl space-y-10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-fuchsia-500/30 rounded-full"></div>
            
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-rose-500/10 text-rose-400 p-5 rounded-2xl text-[11px] font-bold border border-rose-500/20 flex items-center gap-4 font-mono">
                  <AlertTriangle size={20} /> {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">Intelligence Category</label>
                <div className="relative">
                  <select 
                    required
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full px-6 py-5 bg-black/60 border border-white/10 rounded-2xl text-white focus:border-fuchsia-500/50 outline-none transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="" disabled>Select category...</option>
                    <option value="phishing">Phishing / Social Engineering</option>
                    <option value="malware">Malware / Ransomware</option>
                    <option value="unauthorized_access">Unauthorized Access</option>
                    <option value="data_leak">Data Exfiltration</option>
                    <option value="other">Miscellaneous Anomaly</option>
                  </select>
                  <Terminal size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">Priority Level</label>
                <div className="grid grid-cols-4 gap-2">
                  {['low', 'medium', 'high', 'critical'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverityLevel(lvl)}
                      className={`py-4 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                        severityLevel === lvl 
                          ? 'bg-fuchsia-500 border-fuchsia-500 text-black' 
                          : 'bg-black/40 border-white/10 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 p-8 rounded-3xl flex gap-6">
              <Zap className="text-fuchsia-400 shrink-0 mt-1 animate-pulse" size={28} />
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  Tactical Advisor <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping"></span>
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed italic font-mono">"{getAiSuggestion()}"</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">Operational Intel</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-8 py-6 bg-black/60 border border-white/10 rounded-3xl text-white focus:border-fuchsia-500/50 outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                placeholder="Describe the anomalies, timeline, and observed behavior..."
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">Affected Systems</label>
              <input 
                required
                type="text"
                value={affectedSystems}
                onChange={(e) => setAffectedSystems(e.target.value)}
                className="w-full px-8 py-5 bg-black/60 border border-white/10 rounded-3xl text-white focus:border-fuchsia-500/50 outline-none transition-all font-mono text-sm"
                placeholder="e.g. SOC-Node-01, Payment-Gateway-DB, Corporate-VPN"
              />
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-5 bg-white/5 border border-white/10 rounded-2xl text-slate-500 transition-all hover:bg-white/10 ${attachedFile ? 'text-fuchsia-400 border-fuchsia-500/50 bg-fuchsia-500/10' : ''}`}
                >
                  <Paperclip size={24} />
                </button>
                <div className="text-left">
                  {attachedFile ? (
                    <div className="flex flex-col">
                       <p className="text-xs font-bold text-fuchsia-400 flex items-center gap-2">
                        <FileIcon size={14} /> {attachedFile.name.substring(0, 20)}...
                       </p>
                       <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mt-1">Ready for capture</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs font-bold text-white">Attach Intelligence</p>
                      <p className="text-[9px] text-slate-500 uppercase font-mono tracking-widest">LOGS, DUMPS, CAPTURES</p>
                    </>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto flex items-center justify-center gap-4 bg-fuchsia-500 text-black px-12 py-5 rounded-2xl font-bold text-sm transition-all shadow-[0_0_30px_rgba(123, 47, 247,0.4)] hover:shadow-[0_0_40px_rgba(123, 47, 247,0.6)] disabled:opacity-50 uppercase tracking-[0.2em]"
              >
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Transmitting...</> : <><Send size={20} /> Transmit Intel</>}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-[40px] p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-rose-500/5 animate-pulse"></div>
            <div className="relative z-10">
              <ShieldAlert className="text-rose-400 mb-6" size={40} />
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">RED_LINE Protocol</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                If the anomaly involves <span className="text-rose-400 font-bold underline">Ransomware</span> or <span className="text-rose-400 font-bold underline">Core Exfiltration</span>, use the secure voice override immediately.
              </p>
              <div className="bg-black/80 py-6 rounded-2xl border border-rose-500/30 text-center font-bold text-rose-400 font-mono text-2xl tracking-[0.2em]">
                1-800-JEZT-SOC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare, Paperclip, ShieldCheck, User, Activity, Download, Terminal, Zap, Info, FileIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { useSocket } from '../context/SocketContext';

export default function IncidentDetail() {
  const { id } = useParams();
  const { socket } = useSocket();
  const [incident, setIncident] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIncident() {
      try {
        console.log(`Fetching detail for incident ID: ${id}`);
        setLoading(true);
        const { data, error } = await supabase
          .from('incidents')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        console.log("Incident data retrieved:", data);
        setIncident({
          id: data.ticket_number || (data.id ? data.id.substring(0, 8) : 'N/A'),
          dbId: data.id,
          title: data.incidenttype || data.title || 'Untitled Incident',
          status: data.status === 'open' || data.status?.toLowerCase() === 'pending' ? 'In Progress' : (data.status ? (data.status.charAt(0).toUpperCase() + data.status.slice(1)) : 'Pending'),
          severity: data.severitylevel || 'Medium',
          date: data.created_at ? new Date(data.created_at).toLocaleString() : 'Unknown Date',
          description: data.description || 'No description provided.',
          affectedSystems: data.affectedsystems || 'GLOBAL_NODES',
          assignedHacker: {
            name: data.expert_id ? 'Security Specialist' : 'Unassigned',
            role: data.expert_id ? 'Active' : 'Awaiting Triage',
            avatar: data.expert_id ? '✓' : '?'
          },
          fileUrl: data.file_url,
          fileName: data.file_name,
          timeline: [
            { status: 'Reported', time: data.created_at ? new Date(data.created_at).toLocaleString() : 'Unknown Time', note: 'Incident submitted by user.' },
            ...(data.expert_id ? [{ status: 'Accepted', time: new Date(data.updated_at || Date.now()).toLocaleString(), note: 'A specialist has locked onto this ticket.' }] : [])
          ]
        });
      } catch (err) {
        console.error("Error fetching incident:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchIncident();
  }, [id]);

  React.useEffect(() => {
    if (!socket || !incident) return;

    const handleUpdate = (data) => {
      if (data.id === incident.dbId) {
        setIncident(prev => ({
          ...prev,
          status: data.status === 'open' || data.status?.toLowerCase() === 'pending' ? 'In Progress' : (data.status.charAt(0).toUpperCase() + data.status.slice(1)),
          assignedHacker: {
            name: data.expert_id ? 'Security Specialist' : 'Unassigned',
            role: data.expert_id ? 'Active' : 'Awaiting Triage',
            avatar: data.expert_id ? '✓' : '?'
          },
          timeline: [
            { status: 'Update', time: new Date().toLocaleString(), note: `Status updated to ${data.status}` },
            ...prev.timeline
          ]
        }));
      }
    };

    socket.on('incident_updated', handleUpdate);
    return () => {
      socket.off('incident_updated', handleUpdate);
    };
  }, [socket, incident]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-fuchsia-400 font-mono text-sm tracking-widest animate-pulse">DECRYPTING INCIDENT DATA...</div>;
  if (!incident) return <div className="min-h-screen flex items-center justify-center text-rose-500 font-mono">ERROR: INCIDENT_NOT_FOUND</div>;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-start gap-6">
          <Link to="/incidents" className="mt-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-400 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs font-bold font-mono text-fuchsia-500 bg-fuchsia-500/10 px-3 py-1 rounded-lg border border-fuchsia-500/20">#{incident.id}</span>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${
                incident.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'
              }`}>
                {incident.status}
              </span>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${
                incident.severity === 'critical' || incident.severity === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {incident.severity} SEVERITY
              </span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{incident.title}</h1>
          </div>
        </div>
        <Link to={`/chat?incidentId=${incident.dbId}`} className="px-8 py-4 bg-fuchsia-500 text-black font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(123, 47, 247,0.4)] transition-all flex items-center gap-2 uppercase tracking-widest text-xs">
          <MessageSquare size={18} /> Open Tactical Channel
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Terminal size={120} className="text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Activity size={20} className="text-fuchsia-600 dark:text-fuchsia-400" /> Case Intelligence
            </h2>
            <div className="space-y-6 relative z-10">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap">
                {incident.description}
              </p>
              <div className="pt-6 border-t border-slate-200 dark:border-white/5 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Targeted Nodes</p>
                  <p className="text-sm font-mono text-fuchsia-600 dark:text-fuchsia-400">{incident.affectedSystems}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Observation Timestamp</p>
                  <p className="text-sm font-mono text-slate-600 dark:text-slate-300">{incident.date}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Paperclip size={20} className="text-fuchsia-600 dark:text-fuchsia-400" /> Intelligence Assets
              </h2>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage: SECURE_CLOUD</span>
            </div>
            
            {incident.fileUrl ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:bg-black/60 transition-all">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center text-fuchsia-400 shrink-0 border border-fuchsia-500/20">
                      <FileIcon size={20} />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">{incident.fileName || 'Data_Evidence.bin'}</p>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Verified Attachment</p>
                    </div>
                  </div>
                  <a 
                    href={incident.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-500 hover:text-black transition-all flex items-center justify-center"
                  >
                    <Download size={20} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-black/20 rounded-2xl border border-dashed border-white/10">
                <p className="text-sm text-slate-500 font-mono">NO EVIDENCE FILES ATTACHED TO THIS LOG.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Assigned Expert */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500/30 shadow-[0_0_15px_rgba(123, 47, 247,0.2)]"></div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Assigned Unit</h3>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-purple-500 flex items-center justify-center text-black font-black text-xl shadow-lg border-2 border-white/10">
                {incident.assignedHacker.avatar}
              </div>
              <div>
                <p className="text-xl font-bold text-white mb-1">{incident.assignedHacker.name}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  <ShieldCheck size={12} /> {incident.assignedHacker.role}
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex gap-3">
              <Zap className="text-emerald-400 shrink-0" size={16} />
              <p className="text-[10px] text-emerald-400 font-bold uppercase leading-relaxed tracking-wider">Tactical specialist is currently reviewing telemetry logs.</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-sm dark:shadow-none">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Operational Timeline</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 dark:bg-white/5"></div>
              {incident.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-8 flex flex-col gap-1">
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full z-10 border-2 border-[#030712] ${
                    idx === 0 ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.8)]' : 'bg-slate-700'
                  }`}></div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">{item.status}</h4>
                  <p className="text-[9px] font-mono text-slate-500 dark:text-slate-600 mb-2">{item.time}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-black/20 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


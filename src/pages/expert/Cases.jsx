import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Search, Filter, LayoutGrid, List as ListIcon,
  AlertCircle, Clock, RefreshCw,
} from 'lucide-react';
import IncidentQueue from '../../components/Expert/Unified/IncidentQueue';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cases() {
  const { user, getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [activeIncidentId, setActiveIncidentId] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIncidentData, setActiveIncidentData] = useState(null);

  const [caseStats, setCaseStats] = useState({
    openTickets:   null,
    criticalAlerts: null,
    avgTriageTime:  null,
    mttr:           null,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // ─── Load live stats ───────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    if (!user) return;
    setStatsLoading(true);
    try {
      // 1. Open (pending) tickets across the platform
      const { count: openTickets } = await supabase
        .from('incidents')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending');

      // 2. Critical-severity incidents that are still open/active
      const { count: criticalAlerts } = await supabase
        .from('incidents')
        .select('id', { count: 'exact', head: true })
        .eq('severitylevel', 'critical')
        .in('status', ['pending', 'accepted', 'investigating']);

      // 3. Avg triage time (minutes from report → first acceptance)
      const { data: acceptedCases } = await supabase
        .from('incidents')
        .select('created_at, updated_at')
        .eq('expert_id', user.id)
        .in('status', ['accepted', 'investigating', 'resolved', 'closed'])
        .limit(50);

      let avgTriageMins = null;
      if (acceptedCases && acceptedCases.length > 0) {
        const diffs = acceptedCases
          .map(i => (new Date(i.updated_at) - new Date(i.created_at)) / 60000)
          .filter(d => d > 0 && d < 1440);
        if (diffs.length > 0) {
          avgTriageMins = (diffs.reduce((a, b) => a + b, 0) / diffs.length).toFixed(1);
        }
      }

      // 4. MTTR — avg time-to-resolve for closed cases (in hours)
      const { data: resolvedCases } = await supabase
        .from('incidents')
        .select('created_at, updated_at')
        .eq('expert_id', user.id)
        .in('status', ['resolved', 'closed'])
        .limit(50);

      let mttrHours = null;
      if (resolvedCases && resolvedCases.length > 0) {
        const diffs = resolvedCases
          .map(i => (new Date(i.updated_at) - new Date(i.created_at)) / 3600000)
          .filter(d => d > 0 && d < 168); // exclude outliers > 1 week
        if (diffs.length > 0) {
          mttrHours = (diffs.reduce((a, b) => a + b, 0) / diffs.length).toFixed(1);
        }
      }

      setCaseStats({
        openTickets:    openTickets ?? 0,
        criticalAlerts: criticalAlerts ?? 0,
        avgTriageTime:  avgTriageMins ? `${avgTriageMins}m` : 'N/A',
        mttr:           mttrHours ? `${mttrHours}h` : 'N/A',
      });
    } catch (err) {
      console.error('[Cases] fetchStats error:', err.message);
    } finally {
      setStatsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ─── Real-time stat refresh ────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('cases-stats-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => {
        fetchStats();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user, fetchStats]);

  // ─── Load incident details when one is selected ───────────────────────────
  useEffect(() => {
    if (!activeIncidentId || !user) { setActiveIncidentData(null); return; }
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('incidents')
          .select('*')
          .eq('id', activeIncidentId)
          .single();
        if (!error && data) setActiveIncidentData(data);
      } catch (err) {
        // Ignore errors fetching active incident details
      }
    };
    load();
  }, [activeIncidentId, user]);

  // ─── Accept case & navigate to chat ───────────────────────────────────────
  const handleAcceptCase = async () => {
    if (!activeIncidentId) return;
    try {
      const token = await getAccessToken();
      await axios.patch(
        `${BACKEND_URL}/api/incidents/${activeIncidentId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/expert-dashboard/chat?incidentId=${activeIncidentId}`);
    } catch (err) {
      console.error('[Cases] accept error:', err.message);
    }
  };

  const statCards = [
    { label: 'OPEN_TICKETS',    value: caseStats.openTickets,    color: 'text-fuchsia-400'   },
    { label: 'CRITICAL_ALERTS', value: caseStats.criticalAlerts, color: 'text-rose-500'   },
    { label: 'AVG_TRIAGE_TIME', value: caseStats.avgTriageTime,  color: 'text-emerald-400'},
    { label: 'MTTR',            value: caseStats.mttr,           color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8 h-full">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Global_Incident_Management
            </h2>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Active_Cases</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by ID, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-mono tracking-widest focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/[0.07] text-white transition-all w-56 uppercase"
            />
          </div>

          <button
            onClick={fetchStats}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-fuchsia-400 hover:border-fuchsia-500/30 transition-all"
            title="Refresh stats"
          >
            <RefreshCw size={16} />
          </button>

          <div className="flex p-1 bg-white/5 border border-white/5 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-fuchsia-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >
              <ListIcon size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-fuchsia-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Live Stats ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-[#0b1220]/60 backdrop-blur-md border border-white/5 hover:border-white/10 p-5 rounded-2xl transition-all group"
          >
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            {statsLoading ? (
              <div className="h-7 w-12 bg-white/5 rounded animate-pulse" />
            ) : (
              <p className={`text-2xl font-black ${stat.color} tracking-tighter`}>
                {stat.value !== null ? String(stat.value).padStart(2, '0') : '—'}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ─── Main Queue ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 min-h-[600px]">
        {/* Left: Queue */}
        <div className="xl:col-span-3">
          <IncidentQueue
            activeIncidentId={activeIncidentId}
            setActiveIncidentId={setActiveIncidentId}
            searchTerm={searchTerm}
          />
        </div>

        {/* Right: Intel panel */}
        <div>
          <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl h-full">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400 mb-6">
              Incident_Intel_Panel
            </h3>

            <AnimatePresence mode="wait">
              {activeIncidentData ? (
                <motion.div
                  key={activeIncidentData.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Snapshot */}
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                    <p className="text-[9px] font-mono text-slate-500 uppercase mb-2">Context_Snapshot</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Ticket</span>
                      <span className="text-[10px] text-fuchsia-400 font-black">
                        {activeIncidentData.ticket_number || activeIncidentData.id.substring(0,8)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Type</span>
                      <span className="text-[10px] text-white font-bold">{activeIncidentData.incidenttype}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Severity</span>
                      <span className={`text-[10px] font-black uppercase ${
                        activeIncidentData.severitylevel === 'critical' ? 'text-rose-400' :
                        activeIncidentData.severitylevel === 'high'     ? 'text-orange-400' :
                        activeIncidentData.severitylevel === 'medium'   ? 'text-amber-400' : 'text-fuchsia-400'
                      }`}>
                        {activeIncidentData.severitylevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Status</span>
                      <span className="text-[10px] text-emerald-400 font-black uppercase">{activeIncidentData.status}</span>
                    </div>
                    {activeIncidentData.description && (
                      <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                        {activeIncidentData.description.substring(0, 120)}
                        {activeIncidentData.description.length > 120 ? '...' : ''}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5">
                    {activeIncidentData.status === 'pending' && (
                      <button
                        onClick={handleAcceptCase}
                        className="w-full py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-fuchsia-500/20 active:scale-[0.98]"
                      >
                        Accept &amp; Open Chat
                      </button>
                    )}
                    {['accepted', 'investigating'].includes(activeIncidentData.status) && (
                      <button
                        onClick={() => navigate(`/expert-dashboard/chat?incidentId=${activeIncidentData.id}`)}
                        className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                      >
                        Open Chat Channel
                      </button>
                    )}
                    <button className="w-full py-3 bg-white/5 border border-white/5 hover:border-fuchsia-500/40 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-fuchsia-400 transition-all flex items-center justify-center gap-2">
                      <AlertCircle size={13} /> Escalate Case
                    </button>
                    <button className="w-full py-3 bg-white/5 border border-white/5 hover:border-purple-500/40 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-400 transition-all flex items-center justify-center gap-2">
                      <Clock size={13} /> Request Intel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-64 flex flex-col items-center justify-center text-center opacity-30"
                >
                  <Shield size={44} className="text-slate-600 mb-4" />
                  <p className="text-[10px] font-mono uppercase tracking-widest">Select_Case_For_Intel</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

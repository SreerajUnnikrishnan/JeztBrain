import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Clock, Shield, Check, PlayCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, BACKEND_URL } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useSocket } from '../../../context/SocketContext';

const SEVERITY_STYLES = {
  critical: 'bg-red-500/15 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]',
  high:     'bg-orange-500/15 text-orange-400 border-orange-500/30',
  medium:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  low:      'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

const STATUS_LABEL = {
  pending:       { label: 'Pending',      color: 'text-hacker-neon' },
  accepted:      { label: 'Accepted',     color: 'text-amber-400' },
  investigating: { label: 'Investigating',color: 'text-purple-400' },
  resolved:      { label: 'Resolved',     color: 'text-emerald-400' },
};

export default function IncidentQueue({ activeIncidentId, setActiveIncidentId, searchTerm = '' }) {
  const { user, getAccessToken } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'my_cases'
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of incident being acted on

  const filteredIncidents = incidents.filter(incident => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const ticketNo = (incident.ticket_number || '').toLowerCase();
    const id = (incident.id || '').toLowerCase();
    const type = (incident.incidenttype || '').toLowerCase();
    const title = (incident.title || '').toLowerCase();
    const desc = (incident.description || '').toLowerCase();
    const severity = (incident.severitylevel || '').toLowerCase();
    return ticketNo.includes(term) ||
           id.includes(term) ||
           type.includes(term) ||
           title.includes(term) ||
           desc.includes(term) ||
           severity.includes(term);
  });

  const fetchIncidents = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const token = await getAccessToken();
      const endpoint = activeTab === 'pending' ? '/api/incidents?status=pending' : '/api/incidents/expert';
      
      const response = await axios.get(`${BACKEND_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = activeTab === 'pending' ? (response.data.queue || response.data) : response.data.cases;
      setIncidents(data || []);
    } catch (err) {
      console.error('[Queue] Fetch error:', err.message);
      toast.error('Failed to load incident queue.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, activeTab, getAccessToken]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  // Listen to Socket.IO events for real-time queue updates
  useEffect(() => {
    if (!socket) return;
    
    const handleNewAlert = (data) => {
      // Instantly prepend new incident to queue if we are on the open tab
      if (activeTab === 'pending') {
        setIncidents(prev => {
          // avoid duplicates
          if (prev.find(i => i.id === data.id)) return prev;
          return [data, ...prev];
        });
      }
    };
    
    const handleQueueUpdated = (data) => {
      setIncidents(prev => prev.map(inc => inc.id === data.id ? { ...inc, ...data } : inc));
    };

    socket.on('incident_created', handleNewAlert);
    socket.on('incident_updated', handleQueueUpdated);

    return () => {
      socket.off('incident_created', handleNewAlert);
      socket.off('incident_updated', handleQueueUpdated);
    };
  }, [socket, activeTab, fetchIncidents]);

  const acceptIncident = async (incident) => {
    if (!user?.id) return;
    setActionLoading(incident.id);
    const loadingToast = toast.loading('Synchronizing Case Assignment...');

    try {
      const token = await getAccessToken();
      const response = await axios.patch(`${BACKEND_URL}/api/incidents/${incident.id}/accept`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('CASE_ACCEPTED: Redirecting to tactical view.', { id: loadingToast });
        navigate(`/expert-dashboard/chat?incidentId=${incident.id}`);
      }
    } catch (err) {
      console.error('[Queue] Accept error:', err.message);
      toast.error('Tactical Lock Failed: Case could not be assigned.', { id: loadingToast });
    } finally {
      setActionLoading(null);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setActionLoading(id);
    try {
      const token = await getAccessToken();
      await axios.patch(`${BACKEND_URL}/api/incidents/${id}`, {
        status: newStatus
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      toast.success(`Status → ${newStatus}`);
      fetchIncidents();
    } catch (err) {
      console.error('[Queue] Update error:', err.message);
      toast.error('Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="p-5 border-b border-white/5 bg-white/[0.02] shrink-0">
        {/* Tab Switch */}
        <div className="flex gap-1 p-1 bg-black/40 border border-white/5 rounded-xl mb-5">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${
              activeTab === 'pending'
                ? 'bg-fuchsia-500 text-black shadow-[0_0_15px_rgba(123, 47, 247,0.4)]'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            Open Queue
          </button>
          <button
            onClick={() => setActiveTab('my_cases')}
            className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${
              activeTab === 'my_cases'
                ? 'bg-fuchsia-500 text-black shadow-[0_0_15px_rgba(123, 47, 247,0.4)]'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            My Cases
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl">
              <AlertCircle size={18} className="text-fuchsia-400" />
            </div>
            <div>
              <h3 className="text-white font-black text-sm tracking-tight">
                {activeTab === 'pending' ? 'Awaiting Triage' : 'Active Cases'}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-0.5">
                {filteredIncidents.length} Records Found
              </p>
            </div>
          </div>
          <button
            onClick={fetchIncidents}
            disabled={loading}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-500 hover:text-fuchsia-400 transition-all disabled:opacity-40"
            aria-label="Refresh"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-hacker-neon" size={32} />
          </div>
        ) : filteredIncidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
            <div className="p-5 bg-white/5 rounded-full border border-white/10 relative">
               <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full animate-pulse"></div>
               <Check size={32} className="text-emerald-500/50 relative" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">
                {activeTab === 'pending' ? 'Queue is clear' : 'No active cases'}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1.5 leading-relaxed max-w-[180px] mx-auto">
                {activeTab === 'pending' ? 'No open incidents reported' : 'Accept a case from the triage queue'}
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredIncidents.map(incident => {
              const severityKey = (incident.severitylevel || 'medium').toLowerCase();
              const statusInfo = STATUS_LABEL[incident.status] || { label: incident.status, color: 'text-gray-400' };
              const timeAgo = incident.created_at
                ? formatDistanceToNow(new Date(incident.created_at), { addSuffix: true })
                : 'Unknown time';
              const isActing = actionLoading === incident.id;

              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16, scale: 0.95 }}
                  onClick={() => {
                    if (activeTab === 'my_cases') setActiveIncidentId(incident.id);
                  }}
                  className={`bg-white/[0.04] border rounded-2xl p-4 group transition-all ${
                    activeIncidentId === incident.id
                      ? 'border-hacker-neon/50 bg-hacker-neon/[0.07] shadow-[0_0_20px_rgba(123, 47, 247,0.1)]'
                      : 'border-white/5 hover:border-white/15 hover:bg-white/[0.06]'
                  } ${activeTab === 'my_cases' ? 'cursor-pointer' : ''}`}
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-hacker-neon bg-hacker-neon/10 px-2 py-0.5 rounded border border-hacker-neon/20 font-bold">
                        #{incident.ticket_number || incident.id.substring(0, 8).toUpperCase()}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${SEVERITY_STYLES[severityKey] || SEVERITY_STYLES.medium}`}>
                        {severityKey}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-mono shrink-0">
                      <Clock size={10} /> {timeAgo}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-hacker-neon transition-colors leading-tight">
                    {incident.incidenttype || incident.title || 'Untitled Incident'}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed flex items-start gap-1.5">
                    <Shield size={11} className="shrink-0 mt-0.5" />
                    {incident.description || 'No description provided.'}
                  </p>

                  {/* Actions */}
                  {activeTab === 'pending' ? (
                    incident.status === 'pending' ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); acceptIncident(incident); }}
                        disabled={isActing}
                        className="w-full flex items-center justify-center gap-2 bg-hacker-neon hover:bg-purple-600 disabled:opacity-50 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_10px_rgba(123, 47, 247,0.2)] hover:shadow-[0_0_20px_rgba(123, 47, 247,0.4)]"
                      >
                        {isActing ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        {isActing ? 'Accepting...' : 'Accept Case'}
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-2 bg-slate-800 text-slate-400 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-not-allowed">
                        <Shield size={14} /> Assigned to Expert
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${statusInfo.color}`}>
                        ● {statusInfo.label}
                      </span>
                      <div className="flex gap-2">
                        {incident.status === 'accepted' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(incident.id, 'investigating'); }}
                            disabled={isActing}
                            title="Start Investigating"
                            className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500 hover:text-black transition-all disabled:opacity-50"
                          >
                            {isActing ? <Loader2 size={14} className="animate-spin" /> : <PlayCircle size={14} />}
                          </button>
                        )}
                        {incident.status === 'investigating' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(incident.id, 'resolved'); }}
                            disabled={isActing}
                            title="Mark as Resolved"
                            className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-50"
                          >
                            {isActing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import {
  Search, MessageSquare, Shield, Hash, MoreVertical, User, Clock,
} from 'lucide-react';
import ChatWindow from '../../components/chat/ChatWindow';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

export default function LiveChat() {
  const { user, getAccessToken, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const targetIncidentId = searchParams.get('incidentId');

  const [incidents, setIncidents] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState(targetIncidentId || null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});

  const isExpert = ['security_specialist', 'network_specialist', 'expert', 'admin'].includes(role);

  // ─── Fetch incidents ───────────────────────────────────────────────────────
  const fetchIncidents = useCallback(async () => {
    if (!user) return;
    try {
      const token = await getAccessToken();
      // Experts see their assigned cases; regular users see their own
      const endpoint = isExpert
        ? `${BACKEND_URL}/api/incidents/expert`
        : `${BACKEND_URL}/api/incidents/user`;

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = isExpert ? (res.data.cases || []) : (res.data.incidents || []);
      setIncidents(data);

      // Auto-select: honour URL param first, else first incident
      if (data.length > 0) {
        if (targetIncidentId && data.find(i => i.id === targetIncidentId)) {
          setSelectedIncidentId(targetIncidentId);
        } else if (!selectedIncidentId) {
          setSelectedIncidentId(data[0].id);
        }
      }
    } catch (err) {
      console.error('[LiveChat] fetchIncidents error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user, isExpert, targetIncidentId]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  // ─── Real-time: refresh list when incident status changes ─────────────────
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('livechat-incidents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => {
        fetchIncidents();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user]);

  // ─── Real-time: unread message counts ────────────────────────────────────
  useEffect(() => {
    if (!user || incidents.length === 0) return;

    const fetchUnread = async () => {
      const counts = {};
      for (const inc of incidents) {
        const { count } = await supabase
          .from('messages')
          .select('id', { count: 'exact', head: true })
          .eq('chatid', inc.id)
          .neq('senderid', user.id);
        counts[inc.id] = count || 0;
      }
      setUnreadCounts(counts);
    };

    fetchUnread();

    const channel = supabase
      .channel('livechat-messages-unread')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const msg = payload.new;
        if (msg.senderid !== user.id) {
          setUnreadCounts(prev => ({
            ...prev,
            [msg.chatid]: (prev[msg.chatid] || 0) + 1,
          }));
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user, incidents]);

  // Clear unread count when a conversation is selected
  const selectIncident = (id) => {
    setSelectedIncidentId(id);
    setUnreadCounts(prev => ({ ...prev, [id]: 0 }));
    navigate(`?incidentId=${id}`, { replace: true });
  };

  const getSeverityColor = (sev) => {
    switch ((sev || '').toLowerCase()) {
      case 'critical': return 'text-rose-400';
      case 'high':     return 'text-orange-400';
      case 'medium':   return 'text-amber-400';
      default:         return 'text-fuchsia-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':     return 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30';
      case 'investigating':return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'resolved':     return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'closed':       return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:             return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  const filteredIncidents = incidents.filter(inc =>
    inc.incidenttype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.ticket_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-160px)] gap-0 bg-[#0b1220]/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

      {/* ─── Sidebar ─── */}
      <div className="w-[360px] flex flex-col border-r border-white/5 bg-[#070B14]/60 shrink-0">

        {/* Header */}
        <div className="p-5 space-y-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-black text-white tracking-tight uppercase italic">
                Comms_Matrix
              </h2>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">
                {isExpert ? 'Your assigned cases' : 'Your incident channels'}
              </p>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[10px] font-mono tracking-widest text-white focus:outline-none focus:border-fuchsia-500/50 uppercase"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 opacity-50">
              <div className="w-8 h-8 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
              <p className="text-[10px] font-mono uppercase tracking-[0.3em]">Syncing_Nexus...</p>
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8 space-y-3 opacity-30">
              <MessageSquare size={40} className="text-slate-600" />
              <p className="text-[10px] font-mono uppercase tracking-widest leading-relaxed">
                {searchTerm ? 'No matches found' : isExpert ? 'No assigned cases yet' : 'No active incidents'}
              </p>
            </div>
          ) : (
            <div className="px-3 py-3 space-y-1">
              {filteredIncidents.map((inc) => {
                const isSelected = selectedIncidentId === inc.id;
                const unread = unreadCounts[inc.id] || 0;
                return (
                  <button
                    key={inc.id}
                    onClick={() => selectIncident(inc.id)}
                    className={`w-full flex items-center gap-3.5 p-4 rounded-2xl transition-all relative group ${
                      isSelected
                        ? 'bg-fuchsia-500/10 border border-fuchsia-500/20'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border transition-all relative ${
                      isSelected
                        ? 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_15px_rgba(123, 47, 247,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-500'
                    }`}>
                      <Hash size={18} />
                      {/* Severity dot */}
                      {(inc.severitylevel || '').toLowerCase() === 'critical' && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-[#070B14] rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-[11px] font-black truncate uppercase tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {inc.incidenttype || 'Unknown Incident'}
                        </p>
                        {unread > 0 && (
                          <span className="shrink-0 ml-2 min-w-[18px] h-[18px] bg-fuchsia-500 text-black text-[9px] font-black rounded-full flex items-center justify-center px-1">
                            {unread > 9 ? '9+' : unread}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${getStatusBadge(inc.status)} uppercase tracking-wider`}>
                          {inc.status}
                        </span>
                        <span className={`text-[9px] font-mono ${getSeverityColor(inc.severitylevel)}`}>
                          {inc.severitylevel || 'med'}
                        </span>
                        <span className="text-[8px] text-slate-600 ml-auto flex items-center gap-1">
                          <Clock size={8} />
                          {formatDistanceToNow(new Date(inc.created_at), { addSuffix: false })}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* User Identity Footer */}
        <div className="p-5 bg-black/40 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-[1px]">
                <div className="w-full h-full rounded-xl bg-[#030712] flex items-center justify-center overflow-hidden">
                  <User size={18} className="text-fuchsia-400" />
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#070B14] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-white truncate uppercase tracking-wider">
                {user?.displayName || 'Expert_Agent'}
              </p>
              <p className="text-[8px] text-emerald-500/80 font-mono tracking-[0.2em] uppercase">
                ● Tactical_Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Chat Window ─── */}
      <div className="flex-1 flex flex-col bg-[#030712]/40 min-w-0">
        <AnimatePresence mode="wait">
          {selectedIncidentId ? (
            <motion.div
              key={selectedIncidentId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col h-full"
            >
              <ChatWindow incidentId={selectedIncidentId} isExpert={isExpert} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center space-y-8"
            >
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-fuchsia-500/5 border border-fuchsia-500/10 flex items-center justify-center relative z-10">
                  <Shield className="text-fuchsia-500/20" size={56} />
                </div>
                <div className="absolute inset-0 bg-fuchsia-500/5 blur-3xl rounded-full" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">
                  Establish_Secure_Link
                </h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                  Select a case from the left panel to open the encrypted channel.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

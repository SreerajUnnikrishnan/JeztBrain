import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Shield, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

export default function ChatSidebar({ onSelectIncident, activeIncidentId }) {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        // Fetch incidents where user is participant
        const { data, error } = await supabase
          .from('incidents')
          .select('*')
          .or(`user_id.eq.${user.id},expert_id.eq.${user.id}`)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setIncidents(data || []);
      } catch (err) {
        console.error('[ChatSidebar] Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

    // Subscribe to incident changes (for status updates/new cases)
    const channel = supabase.channel('chat_rooms_sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => {
        fetchRooms();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const filteredIncidents = incidents.filter(i => 
    i.incidenttype?.toLowerCase().includes(search.toLowerCase()) ||
    i.ticket_number?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-white/5 bg-[#0b1220]/60 backdrop-blur-xl flex flex-col h-full overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/5">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400 mb-6">Tactical_Channels</h3>
        
        <div className="relative group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
          <input 
            type="text" 
            placeholder="FILTER_CHANNELS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-mono tracking-widest focus:outline-none focus:border-fuchsia-500/50 text-white transition-all uppercase"
          />
        </div>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-6 h-6 border-2 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredIncidents.length === 0 ? (
          <div className="p-8 text-center opacity-30">
            <Shield size={32} className="mx-auto mb-4 text-slate-500" />
            <p className="text-[10px] font-mono uppercase tracking-widest">No Active Channels</p>
          </div>
        ) : (
          <div className="py-2">
            {filteredIncidents.map(incident => (
              <button
                key={incident.id}
                onClick={() => onSelectIncident(incident.id)}
                className={`w-full px-6 py-4 flex items-start gap-4 transition-all hover:bg-white/5 relative group ${
                  activeIncidentId === incident.id ? 'bg-fuchsia-500/5 border-r-2 border-fuchsia-500' : ''
                }`}
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                  activeIncidentId === incident.id 
                    ? 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-400' 
                    : 'bg-white/5 border-white/5 text-slate-500 group-hover:border-white/10'
                }`}>
                  <MessageSquare size={18} />
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-xs font-bold truncate ${activeIncidentId === incident.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                      {incident.incidenttype || 'Untitled'}
                    </p>
                    <span className="text-[8px] text-slate-600 font-mono whitespace-nowrap">
                      {incident.updated_at && formatDistanceToNow(new Date(incident.updated_at), { addSuffix: false })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-tighter ${
                      incident.status === 'open' ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {incident.status}
                    </span>
                    <span className="text-slate-700 font-black text-[8px]">•</span>
                    <p className="text-[9px] text-slate-600 font-mono truncate uppercase">
                      {incident.ticket_number || incident.id.substring(0, 8)}
                    </p>
                  </div>
                </div>

                {incident.status === 'open' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/10">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System_Online</span>
        </div>
      </div>
    </div>
  );
}

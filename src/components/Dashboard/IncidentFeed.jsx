import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Bug, Globe, Lock, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function IncidentFeed() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIconForType = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('malware')) return <Bug size={14}/>;
    if (t.includes('phishing')) return <ShieldAlert size={14}/>;
    if (t.includes('access')) return <Lock size={14}/>;
    if (t.includes('leak')) return <Globe size={14}/>;
    return <Activity size={14}/>;
  };

  const getSeverityColor = (sev) => {
    switch(sev) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20';
    }
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setIncidents(data.map(i => ({
          id: i.id,
          type: i.incidenttype || 'Unknown',
          source: i.affectedsystems || 'Unknown',
          severity: (i.severitylevel || 'medium').toLowerCase(),
          time: new Date(i.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: getIconForType(i.incidenttype)
        })));
      }
      setLoading(false);
    };

    fetchIncidents();

    const channel = supabase
      .channel('public:incidents')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'incidents' }, (payload) => {
        const i = payload.new;
        const newIncident = {
          id: i.id,
          type: i.incidenttype || 'Unknown',
          source: i.affectedsystems || 'Unknown',
          severity: (i.severitylevel || 'medium').toLowerCase(),
          time: 'Just now',
          icon: getIconForType(i.incidenttype)
        };
        setIncidents(prev => [newIncident, ...prev].slice(0, 6));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <ActivityPulse /> Live Incidents
        </h3>
        <span className="text-xs text-slate-500 font-mono">Autoscroll ON</span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
        
        <div className="space-y-3">
          <AnimatePresence>
            {incidents.map((inc) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-3 rounded-2xl border bg-[#0B0F19]/50 ${getSeverityColor(inc.severity)} backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#030712]/50 shadow-inner">
                    {inc.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{inc.type}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{inc.source}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-[#030712] border ${getSeverityColor(inc.severity)}`}>
                    {inc.severity}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">{inc.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ActivityPulse() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
    </span>
  );
}

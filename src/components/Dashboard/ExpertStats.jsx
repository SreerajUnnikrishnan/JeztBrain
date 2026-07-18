import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ExpertStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Cases Solved',  value: '—', Icon: Target,       color: 'text-fuchsia-400',   bg: 'bg-fuchsia-500/10' },
    { label: 'Active Chats',  value: '—', Icon: MessageSquare, color: 'text-amber-400',  bg: 'bg-amber-500/10' },
    { label: 'Trust Score',   value: '—', Icon: ShieldCheck,   color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Avg Resp (m)',  value: '—', Icon: Clock,         color: 'text-emerald-400',bg: 'bg-emerald-500/10' },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!user?.id) return;
    try {
      // 1. Cases solved (resolved + closed)
      const { count: solved } = await supabase
        .from('incidents')
        .select('id', { count: 'exact', head: true })
        .eq('expert_id', user.id)
        .in('status', ['resolved', 'closed']);

      // 2. Active chats (accepted + investigating)
      const { count: activeChats } = await supabase
        .from('incidents')
        .select('id', { count: 'exact', head: true })
        .eq('expert_id', user.id)
        .in('status', ['accepted', 'investigating']);

      // 3. Trust score from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('trust_score')
        .eq('id', user.id)
        .maybeSingle();

      // 4. Avg response time (minutes) — diff between created_at and updated_at on accepted cases
      const { data: timingData } = await supabase
        .from('incidents')
        .select('created_at, updated_at')
        .eq('expert_id', user.id)
        .in('status', ['accepted', 'resolved', 'closed'])
        .limit(50);

      let avgMins = null;
      if (timingData && timingData.length > 0) {
        const diffs = timingData
          .map(i => (new Date(i.updated_at) - new Date(i.created_at)) / 60000)
          .filter(d => d > 0 && d < 1440); // ignore outliers > 24 hrs
        if (diffs.length > 0) {
          avgMins = (diffs.reduce((a, b) => a + b, 0) / diffs.length).toFixed(1);
        }
      }

      setStats([
        {
          label: 'Cases Solved',
          value: solved != null ? solved.toLocaleString() : '0',
          Icon: Target,
          color: 'text-fuchsia-400',
          bg: 'bg-fuchsia-500/10',
        },
        {
          label: 'Active Chats',
          value: activeChats != null ? String(activeChats) : '0',
          Icon: MessageSquare,
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
        },
        {
          label: 'Trust Score',
          value: profile?.trust_score != null ? String(profile.trust_score) : 'N/A',
          Icon: ShieldCheck,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
        },
        {
          label: 'Avg Resp (m)',
          value: avgMins != null ? avgMins : 'N/A',
          Icon: Clock,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
        },
      ]);
    } catch (err) {
      console.error('[ExpertStats] fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);

  // Real-time: refresh when an incident is updated (assignment / resolution)
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel('expert-stats-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => {
        fetchStats();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user?.id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-between min-h-[140px]"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border border-white/5`}>
              <stat.Icon size={20} />
            </div>
            <div className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: loading ? '30%' : '60%' }}
                transition={{ duration: 0.8 }}
                className={`h-full ${stat.color.replace('text-', 'bg-')}`}
              />
            </div>
          </div>

          <div className="relative z-10 mt-4">
            {loading ? (
              <div className="h-8 w-16 bg-white/5 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-3xl font-black text-white tracking-tight mb-1">{stat.value}</p>
            )}
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

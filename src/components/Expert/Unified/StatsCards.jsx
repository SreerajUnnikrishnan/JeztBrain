import React, { useState, useEffect } from 'react';
import { AlertTriangle, MessageSquare, CheckCircle, TrendingUp, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';

export default function StatsCards() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    assigned: 0,
    resolved: 0,
    openQueue: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchStats = async () => {
      try {
        const [assignedRes, resolvedRes, openRes, msgsRes] = await Promise.all([
          supabase.from('incidents').select('id', { count: 'exact', head: true }).eq('expert_id', user.id).neq('status', 'resolved'),
          supabase.from('incidents').select('id', { count: 'exact', head: true }).eq('expert_id', user.id).eq('status', 'resolved'),
          supabase.from('incidents').select('id', { count: 'exact', head: true }).eq('status', 'open'),
          supabase.from('messages').select('id', { count: 'exact', head: true }).eq('sender_id', user.id),
        ]);

        setStats({
          assigned:      assignedRes.count ?? 0,
          resolved:      resolvedRes.count ?? 0,
          openQueue:     openRes.count ?? 0,
          totalMessages: msgsRes.count ?? 0,
        });
      } catch (err) {
        console.warn('[Stats] Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh stats when incidents or messages change
    const channel = supabase
      .channel('stats_refresh')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, fetchStats)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, fetchStats)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user?.id]);

  const cards = [
    {
      label: 'My Active Cases',
      value: loading ? '—' : stats.assigned,
      sub: 'Assigned to you',
      icon: <AlertTriangle size={20} className="text-amber-400" />,
      color: 'amber',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]',
      border: 'group-hover:border-amber-500/40',
      bg: 'group-hover:bg-amber-500/5',
    },
    {
      label: 'Open Queue',
      value: loading ? '—' : stats.openQueue,
      sub: 'Awaiting triage',
      icon: <MessageSquare size={20} className="text-hacker-neon" />,
      color: 'violet',
      glow: 'shadow-[0_0_20px_rgba(123, 47, 247,0.1)]',
      border: 'group-hover:border-hacker-neon/40',
      bg: 'group-hover:bg-hacker-neon/5',
    },
    {
      label: 'Resolved Cases',
      value: loading ? '—' : stats.resolved,
      sub: 'Total resolved',
      icon: <CheckCircle size={20} className="text-emerald-400" />,
      color: 'emerald',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]',
      border: 'group-hover:border-emerald-500/40',
      bg: 'group-hover:bg-emerald-500/5',
    },
    {
      label: 'Messages Sent',
      value: loading ? '—' : stats.totalMessages,
      sub: 'Total communications',
      icon: <TrendingUp size={20} className="text-purple-400" />,
      color: 'purple',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.1)]',
      border: 'group-hover:border-purple-500/40',
      bg: 'group-hover:bg-purple-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card, idx) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          className={`group bg-hacker-card/40 backdrop-blur-md border border-white/10 rounded-[22px] p-6 transition-all duration-500 cursor-default relative overflow-hidden ${card.border} ${card.bg} ${card.glow}`}
        >
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`absolute top-[-32px] right-[-32px] w-16 h-16 rotate-45 ${
              card.color === 'blue' ? 'bg-hacker-neon/20' :
              card.color === 'amber' ? 'bg-amber-500/20' :
              card.color === 'emerald' ? 'bg-emerald-500/20' : 'bg-purple-500/20'
            }`} />
          </div>

          <div className="flex items-start justify-between mb-5">
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            {loading && <Loader2 size={14} className="text-gray-700 animate-spin mt-1" />}
          </div>

          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-white tracking-tight">
              {loading ? (
                <span className="inline-block w-8 h-8 bg-white/5 rounded animate-pulse" />
              ) : card.value}
            </p>
            <p className="text-[10px] text-gray-700 mt-1 font-mono">{card.sub}</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: loading ? '10%' : '70%' }}
              transition={{ duration: 1.2, delay: 0.3 + idx * 0.1 }}
              className={`h-full rounded-full ${
                card.color === 'blue' ? 'bg-hacker-neon' :
                card.color === 'amber' ? 'bg-amber-500' :
                card.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'
              }`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

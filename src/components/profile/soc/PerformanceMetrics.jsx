import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, Clock, Shield, Cpu, ThumbsUp, FileText, MessageSquare } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';

export default function PerformanceMetrics() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    cases_solved: 0,
    active_investigations: 0,
    avg_response_time: '< 15m',
    threat_resolution_rate: 100,
    ai_usage_count: 0,
    satisfaction_score: 5.0,
    reports_generated: 0,
    active_chats: 0
  });



  async function fetchMetrics() {
    try {
      const { data, error } = await supabase
        .from('expert_metrics')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== '42P01' && error.code !== 'PGRST116') throw error;
      if (data) setMetrics(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (user) {
      fetchMetrics();
      // Optional: Setup realtime subscription here
      const sub = supabase
        .channel('metrics_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'expert_metrics', filter: `user_id=eq.${user.id}` }, payload => {
          if (payload.new) setMetrics(payload.new);
        })
        .subscribe();
        
      return () => { supabase.removeChannel(sub); }
    }
  }, [user]);

  const cards = [
    { label: 'Cases Solved', value: metrics.cases_solved, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Active Investigations', value: metrics.active_investigations, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Avg Response Time', value: metrics.avg_response_time, icon: Clock, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
    { label: 'Threat Resolution', value: `${metrics.threat_resolution_rate}%`, icon: Shield, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { label: 'AI Assistance', value: metrics.ai_usage_count, icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Satisfaction Score', value: metrics.satisfaction_score.toFixed(1), icon: ThumbsUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Reports Generated', value: metrics.reports_generated, icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
    { label: 'Active Comms', value: metrics.active_chats, icon: MessageSquare, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' }
  ];

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-fuchsia-500/5 rounded-full blur-[100px] -z-10 group-hover:bg-fuchsia-500/10 transition-colors duration-700"></div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400 border border-fuchsia-500/20">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Performance_Metrics</h3>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Operational Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className={`p-5 bg-black/40 border border-white/5 hover:${c.border} rounded-2xl transition-all group/card hover:-translate-y-1`}>
            <div className={`p-2 w-max rounded-xl ${c.bg} ${c.color} mb-4`}>
              <c.icon size={18} />
            </div>
            <p className="text-2xl font-mono text-white tracking-widest">{c.value}</p>
            <p className="text-[8px] sm:text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 group-hover/card:text-slate-400 transition-colors">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { ShieldAlert, FileWarning, MessageSquare, Activity, ChevronRight, CheckCircle2, Shield, Zap, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import EmergencySupportPanel from '../components/Dashboard/EmergencySupportPanel';

export default function UserDashboard() {
  const { user, role } = useAuth();
  const { socket } = useSocket();
  const [stats, setStats] = React.useState([]);
  const [recentIncidents, setRecentIncidents] = React.useState([]);

  React.useEffect(() => {
    console.log("Current role:", role);
    
    async function fetchDashboardData() {
      if (!user) return;
      
      try {
        const { data: incidents, error: incidentsError } = await supabase
          .from('incidents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (incidentsError) throw incidentsError;

        const activeCount = incidents.filter(i => i.status !== 'resolved' && i.status !== 'closed').length;
        
        setStats([
          { label: 'Security Level', value: 'Standard User', icon: <Shield className="text-emerald-400" size={24} />, trend: 'Verified', color: 'from-emerald-500/10 to-transparent', border: 'border-emerald-500/20' },
          { label: 'Platform Access', value: 'Authorized', icon: <Lock className="text-purple-400" size={24} />, trend: 'Active', color: 'from-purple-500/10 to-transparent', border: 'border-purple-500/20' },
          { label: 'Cloud Sync', value: 'Synced', icon: <Globe className="text-violet-400" size={24} />, trend: 'Optimal', color: 'from-violet-500/10 to-transparent', border: 'border-violet-500/20' },
        ]);

        setRecentIncidents((incidents || []).slice(0, 4).map(i => ({
          id: i.ticket_number || (i.id ? i.id.substring(0, 8) : 'N/A'),
          dbId: i.id,
          title: i.incidenttype || i.title || 'Untitled Incident',
          severity: i.severitylevel || i.severity || 'Medium',
          status: i.status === 'open' || i.status?.toLowerCase() === 'pending' ? 'In Progress' : (i.status ? (i.status.charAt(0).toUpperCase() + i.status.slice(1)) : 'N/A'),
          time: i.created_at ? new Date(i.created_at).toLocaleDateString() : 'Unknown'
        })));

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }

    fetchDashboardData();

    if (socket) {
      socket.on('incident_updated', fetchDashboardData);
      socket.on('incident_status_change', fetchDashboardData);
      return () => {
        socket.off('incident_updated', fetchDashboardData);
        socket.off('incident_status_change', fetchDashboardData);
      };
    }
  }, [user, role, socket]);

  const severityColors = {
    high: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    low: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  };

  return (
    <div className="space-y-8 pb-12 px-4 sm:px-0">
      {/* Welcome & Status Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe size={120} className="text-purple-500 animate-[spin_60s_linear_infinite]" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">User Operations Panel</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">Hello, {user?.displayName}. Access your active operational reports, submit incidents, and connect with JeztBrain experts securely.</p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/report" className="px-6 py-3 bg-purple-500 text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(123,47,247,0.4)] transition-all flex items-center gap-2">
                <ShieldAlert size={18} /> Report Security Incident
              </Link>
              <Link to="/chat" className="px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                <MessageSquare size={18} className="text-purple-600 dark:text-purple-400" /> Request Expert Assistance
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
          <Lock size={40} className="text-emerald-500 dark:text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <h3 className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-[0.2em] font-bold">System Status</h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 uppercase">Operational</p>
          <div className="mt-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-1 rounded-full bg-emerald-500/50"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-white dark:bg-[#0f172a] border ${stat.border} rounded-3xl p-6 backdrop-blur-xl relative group transition-all hover:bg-slate-50 dark:hover:bg-white/5 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-100 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/5 text-purple-600 dark:text-purple-400 shadow-inner">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h2>
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Simplified Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity size={20} className="text-purple-500" /> Recent Activity
              </h3>
              <Link to="/incidents" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">View All</Link>
            </div>

            <div className="space-y-4">
              {recentIncidents.length > 0 ? (
                recentIncidents.map((incident) => (
                  <div key={incident.dbId} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 group hover:border-purple-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl border ${severityColors[incident.severity.toLowerCase()] || severityColors.medium}`}>
                        <ShieldAlert size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">{incident.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono">#{incident.id} • {incident.time}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-400">{incident.status}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 size={40} className="text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">No recent incidents detected.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Support Panel - Prominent Placement */}
        <div className="space-y-6">
          <EmergencySupportPanel />
        </div>
      </div>
    </div>
  );
}


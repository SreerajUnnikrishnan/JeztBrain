import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ChevronRight, Search, Filter, Activity, Terminal, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function IncidentTracking() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIncidents() {
      if (!user) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('incidents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setIncidents(data || []);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIncidents();
  }, [user]);

  const filteredIncidents = incidents.filter(incident => {
    const title = (incident.incidenttype || incident.title || '').toLowerCase();
    const ticket = (incident.ticket_number || incident.id || '').toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || ticket.includes(searchQuery.toLowerCase());

    const status = incident.status === 'open' ? 'Pending' :
      incident.status === 'resolved' ? 'Resolved' :
        (incident.status ? (incident.status.charAt(0).toUpperCase() + incident.status.slice(1)) : 'N/A');
    const matchesStatus = statusFilter === 'All' || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dark bg-[#030209] text-white relative overflow-hidden -m-8 p-8 min-h-[calc(100vh-80px)] space-y-8 pb-12">
      {/* ─── Glowing Ambient Lights (same as hero page) ─── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(123,47,247,0.1),transparent_70%)] pointer-events-none z-0 blur-[100px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_70%)] pointer-events-none z-0 blur-[90px]" />
      <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(123,47,247,0.04),transparent_70%)] pointer-events-none z-0 blur-[80px]" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none z-0 opacity-30" />

      {/* Relative wrapper for page content to sit above absolute backgrounds */}
      <div className="relative z-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-mono text-[10px] uppercase tracking-widest mb-4">
            <RefreshCw size={12} className="animate-spin-slow" /> Operations Database Active
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
            <Activity size={36} className="text-fuchsia-600 dark:text-fuchsia-400" /> Intelligence Logs
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Detailed history of all reported anomalies and active tactical sessions.</p>
        </div>
        <Link to="/report" className="px-6 py-3 bg-fuchsia-500 text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(123, 47, 247,0.4)] transition-all flex items-center gap-2 text-sm uppercase tracking-widest">
          <ShieldAlert size={18} /> New Operational Report
        </Link>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl backdrop-blur-xl overflow-hidden relative shadow-sm dark:shadow-none">
            <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/20 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-fuchsia-600 dark:group-focus-within:text-fuchsia-400 transition-colors" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter logs by ID or vector..."
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-fuchsia-500/50 focus:bg-slate-50 dark:focus:bg-white/10 transition-all font-mono text-sm"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {['All', 'Pending', 'In Progress', 'Resolved'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${statusFilter === status
                        ? 'bg-fuchsia-500 border-fuchsia-500 text-black shadow-[0_0_15px_rgba(123, 47, 247,0.3)]'
                        : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-black/20 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <tr>
                    <th className="px-6 py-4">Identification</th>
                    <th className="px-6 py-4">Anomaly Profile</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-12 text-center text-slate-500 font-mono text-sm tracking-widest animate-pulse">SYNCHRONIZING DATABASE...</td>
                    </tr>
                  ) : filteredIncidents.length > 0 ? (
                    filteredIncidents.map((incident) => (
                      <tr key={incident.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => window.location.href = `/incidents/${incident.id}`}>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-fuchsia-600 dark:text-fuchsia-500 font-bold mb-1">#{incident.ticket_number || incident.id.substring(0, 8)}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{incident.created_at ? new Date(incident.created_at).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-6 rounded-full ${incident.severitylevel === 'critical' || incident.severitylevel === 'high' ? 'bg-rose-500' :
                                incident.severitylevel === 'medium' ? 'bg-amber-500' : 'bg-fuchsia-500'
                              }`}></div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">{incident.incidenttype || incident.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${incident.severitylevel === 'critical' || incident.severitylevel === 'high' ? 'text-rose-500' :
                              incident.severitylevel === 'medium' ? 'text-amber-500' : 'text-fuchsia-500'
                            }`}>
                            {incident.severitylevel || 'Medium'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold border ${incident.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20'
                            }`}>
                            {incident.status === 'open' ? 'Pending' : (incident.status ? (incident.status.charAt(0).toUpperCase() + incident.status.slice(1)) : 'N/A')}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-8 py-12 text-center text-slate-600 font-mono text-sm">NO OPERATIONAL LOGS MATCH CRITERIA.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-[#070B14] border border-slate-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
            <h3 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-[0.2em] flex items-center gap-2">
              <Terminal size={18} className="text-fuchsia-600 dark:text-fuchsia-400" /> Operational Context
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Security Level', value: 'Authorized', color: 'text-emerald-600 dark:text-emerald-400' },
                { label: 'Node Access', value: 'Unrestricted', color: 'text-fuchsia-600 dark:text-fuchsia-400' },
                { label: 'Cloud Sync', value: 'Synced', color: 'text-fuchsia-600 dark:text-fuchsia-400' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center bg-slate-50 dark:bg-black/20 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">{item.label}</span>
                  <span className={`text-[10px] font-bold font-mono ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-500/10 to-purple-500/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
              <Activity className="text-fuchsia-400" size={16} /> Data Metrics
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                  <span className="text-slate-500">Resolved Capacity</span>
                  <span className="text-emerald-400">88%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] w-[88%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                  <span className="text-slate-500">System Load</span>
                  <span className="text-fuchsia-400">12ms Response</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.5)] w-[40%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}


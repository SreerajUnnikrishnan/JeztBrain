import React, { useState, useEffect } from 'react';
import { Activity, Shield, Globe, Cpu, Database, AlertCircle, RefreshCw, Zap, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemStatus() {
  const [nodes, setNodes] = useState([
    { name: 'Gateway_Primary', status: 'Operational', latency: '12ms', load: 14, color: 'emerald' },
    { name: 'Edge_Cluster_EU', status: 'Operational', latency: '45ms', load: 28, color: 'emerald' },
    { name: 'Edge_Cluster_US', status: 'Operational', latency: '32ms', load: 35, color: 'emerald' },
    { name: 'Database_Core', status: 'Optimal', latency: '5ms', load: 12, color: 'purple' },
    { name: 'AI_Inference_Node', status: 'Analyzing', latency: '110ms', load: 88, color: 'amber' },
    { name: 'Backup_Sanctum', status: 'Isolated', latency: '---', load: 0, color: 'slate' },
  ]);

  const [logs, setLogs] = useState([
    { time: '15:34:21', event: 'AUTH_SUCCESS', src: '192.168.1.45', level: 'INFO' },
    { time: '15:33:10', event: 'NETWORK_SCAN_DETECTED', src: '104.21.4.12', level: 'WARNING' },
    { time: '15:32:05', event: 'DB_BACKUP_COMPLETE', src: 'SYSTEM', level: 'INFO' },
    { time: '15:30:12', event: 'UNUSUAL_API_TRAFFIC', src: '45.12.8.99', level: 'ALERT' },
    { time: '15:28:45', event: 'PROTOCOL_HARDENING_SYNC', src: 'AI_TACTICAL', level: 'SUCCESS' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor changes in load/latency
      setNodes(prev => prev.map(node => ({
        ...node,
        load: node.status === 'Operational' ? Math.max(10, Math.min(95, node.load + (Math.random() > 0.5 ? 1 : -1))) : node.load,
        latency: node.status === 'Operational' ? `${Math.floor(Math.random() * 50 + 10)}ms` : node.latency
      })));

      // Simulate new logs
      if (Math.random() > 0.7) {
        const events = ['TCP_HANDSHAKE', 'SSL_NEGOTIATION', 'PORT_QUERY', 'HEARTBEAT_STABLE'];
        const newLog = {
          time: new Date().toLocaleTimeString([], { hour12: false }),
          event: events[Math.floor(Math.random() * 50 % events.length)],
          src: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1.1`,
          level: 'INFO'
        };
        setLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4">
            <Shield size={12} className="animate-pulse" /> All Systems Nominal
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4">
            <Activity size={36} className="text-purple-400" /> Global Monitor
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Real-time visualization of network nodes and autonomous security protocols.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Global Latency</p>
            <p className="text-xl font-bold text-white font-mono">24ms</p>
          </div>
          <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Threat Level</p>
            <p className="text-xl font-bold text-purple-400 font-mono text-shadow-purple">LOW</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Node Status Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {nodes.map((node) => (
            <motion.div 
              layout
              key={node.name}
              className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl group hover:bg-white/5 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-${node.color}-500/10 border border-${node.color}-500/20 text-${node.color}-400 shadow-inner`}>
                  {node.name.includes('Database') ? <Database size={24} /> : 
                   node.name.includes('Cluster') ? <Globe size={24} /> : 
                   node.name.includes('AI') ? <Cpu size={24} /> : <Zap size={24} />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest text-${node.color}-400 animate-pulse`}>
                  {node.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{node.name}</h3>
              <p className="text-xs text-slate-500 font-mono mb-6">Latency: {node.latency}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                  <span>Resource Load</span>
                  <span className={`text-${node.color}-400`}>{node.load}%</span>
                </div>
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${node.load}%` }}
                    className={`h-full bg-${node.color}-500 shadow-[0_0_10px_rgba(123,47,247,0.5)]`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-time Event Log */}
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
              <Terminal size={18} className="text-purple-400" /> Tactical_Events.log
            </h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div>
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-[11px] space-y-4 overflow-y-auto">
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className="flex gap-4 border-l-2 border-white/5 pl-4 py-1"
              >
                <span className="text-slate-600 shrink-0">[{log.time}]</span>
                <span className={`font-bold shrink-0 ${
                  log.level === 'ALERT' ? 'text-rose-500' : 
                  log.level === 'WARNING' ? 'text-amber-500' : 
                  log.level === 'SUCCESS' ? 'text-emerald-400' : 'text-purple-400'
                }`}>
                  {log.event}
                </span>
                <span className="text-slate-400 truncate">src:{log.src}</span>
              </motion.div>
            ))}
            <div className="pt-4 animate-pulse text-purple-400/50">_ AWAITING NEXT PACKET...</div>
          </div>
          <div className="p-4 bg-black/40 border-t border-white/5 flex justify-center">
            <button className="text-[10px] font-bold text-purple-400/70 hover:text-purple-400 uppercase tracking-[0.3em] transition-colors">
              Request Full Core Dump
            </button>
          </div>
        </div>
      </div>

      {/* Global Defense Stats */}
      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Packets Inspected', value: '1.24B', sub: '+124k/s' },
          { label: 'Threats Deflected', value: '42,903', sub: 'Last 24h' },
          { label: 'Global Uptime', value: '99.998%', sub: 'SLA Active' },
          { label: 'Active Sessions', value: '1,429', sub: 'Verified Only' },
        ].map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1 font-mono tracking-tight">{stat.value}</p>
            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-tighter">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


import React from 'react';
import { Cpu, Activity, Zap, HardDrive, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Monitoring() {
  const metrics = [
    { label: 'CPU_LOAD', value: '42%', color: 'text-fuchsia-400', icon: <Cpu size={16} /> },
    { label: 'MEMORY_USAGE', value: '6.4GB / 16GB', color: 'text-purple-400', icon: <HardDrive size={16} /> },
    { label: 'NETWORK_LATENCY', value: '5ms', color: 'text-emerald-400', icon: <Zap size={16} /> },
    { label: 'THREAT_ANOMALY', value: 'LOW', color: 'text-purple-400', icon: <Activity size={16} /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live_AI_Monitoring_Console</h2>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl group hover:border-fuchsia-500/30 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${m.color}`}>
                {m.icon}
              </div>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{m.label}</span>
            </div>
            <div className="text-2xl font-black text-white tracking-tighter">{m.value}</div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '60%' }}
                 transition={{ duration: 2, delay: i * 0.2 }}
                 className={`h-full bg-gradient-to-r from-transparent via-current to-transparent ${m.color.replace('text-', 'bg-')}`}
               />
            </div>
          </div>
        ))}
      </div>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px] bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(123, 47, 247,0.2)_0%,transparent_70%)]"></div>
          <div className="text-center space-y-4">
             <BarChart3 size={64} className="mx-auto text-slate-700 animate-pulse" />
             <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em]">Awaiting_Telemetry_Stream...</p>
             <div className="flex gap-2 justify-center">
               {[1,2,3].map(i => (
                 <div key={i} className="w-1 h-1 bg-fuchsia-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
               ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400 mb-6">Threat_Anomaly_Log</h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex gap-4 p-3 bg-white/5 border border-white/5 rounded-xl">
                  <div className="h-8 w-px bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase">Packet_Anomaly_Detected</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-1">Source: 192.168.1.{i * 14}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

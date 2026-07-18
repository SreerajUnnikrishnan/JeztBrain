import React from 'react';
import { Activity, ShieldAlert, Globe, AlertOctagon, BarChart2, Zap, Target, Database, Terminal } from 'lucide-react';
import ThreatMap from '../../components/Dashboard/ThreatMap';
import { motion } from 'framer-motion';

export default function ThreatIntel() {
  const intelFeeds = [
    { title: 'Global Phishing Surge (Campaign: NEBULA)', severity: 'High', source: 'CISA', time: '10m ago', tags: ['Phishing', 'APT'] },
    { title: 'LockBit 4.0 Ransomware Variant', severity: 'Critical', source: 'JeztBrain Labs', time: '1h ago', tags: ['Ransomware', 'Critical'] },
    { title: 'Zero-Day: VPN Gateway Auth Bypass', severity: 'Critical', source: 'NVD', time: '3h ago', tags: ['Vulnerability', 'Patch'] },
    { title: 'DDoS Campaign: Financial Nodes', severity: 'Medium', source: 'ThreatHQ', time: '5h ago', tags: ['Network', 'DDoS'] },
  ];

  const mitreTechniques = [
    { id: 'T1566', name: 'Phishing', tactics: ['Initial Access'], status: 'Active' },
    { id: 'T1059', name: 'Cmd / Scripting Interpreter', tactics: ['Execution'], status: 'Elevated' },
    { id: 'T1078', name: 'Valid Accounts', tactics: ['Persistence'], status: 'Monitoring' },
    { id: 'T1486', name: 'Data Encrypted for Impact', tactics: ['Impact'], status: 'Critical' },
  ];

  return (
    <div className="space-y-10">
      {/* ─── Header ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live_Tactical_Intelligence</h2>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">Threat_Nexus_OS</h1>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Global_Threat_Level</p>
            <p className="text-xl font-black text-white">ELEVATED_BETA_9</p>
          </div>
          <div className="h-10 w-px bg-white/10 mx-2"></div>
          <ShieldAlert className="text-rose-500 animate-pulse" size={32} />
        </div>
      </div>

      {/* ─── Global Landscape ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           <div className="h-[500px] relative group bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-[#030712]/80 border border-white/10 rounded-2xl backdrop-blur-md flex items-center gap-2">
                 <Globe size={14} className="text-fuchsia-400" />
                 <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em]">Realtime_Attack_Vectors</p>
              </div>
              <ThreatMap />
           </div>

           {/* MITRE ATT&CK Matrix Preview */}
           <div className="bg-[#0b1220]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8 flex items-center gap-3">
                <Target size={14} className="text-fuchsia-400" /> MITRE_ATT&CK_Heatmap
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mitreTechniques.map((t, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-fuchsia-500/30 transition-all cursor-help group">
                    <p className="text-[8px] font-mono text-fuchsia-500/60 mb-1 group-hover:text-fuchsia-400">{t.id}</p>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-tight mb-2">{t.name}</h4>
                    <div className="flex items-center justify-between">
                       <span className="text-[8px] text-slate-500 font-mono">{t.tactics[0]}</span>
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
                         t.status === 'Critical' ? 'bg-rose-500 text-black' : 
                         t.status === 'Elevated' ? 'bg-orange-500 text-black' : 'bg-emerald-500 text-black'
                       }`}>
                         {t.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
        
        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <AlertOctagon size={18} className="text-fuchsia-400" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Active_Intel_Feed</h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
              {intelFeeds.map((feed, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/[0.08] transition-all cursor-pointer relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${
                    feed.severity === 'Critical' ? 'bg-rose-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                      feed.severity === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {feed.severity}
                    </span>
                    <span className="text-[9px] text-slate-600 font-mono italic">{feed.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-2 leading-relaxed tracking-tight">{feed.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {feed.tags.map((tag, idx) => (
                      <span key={idx} className="text-[8px] font-mono text-fuchsia-500/50 uppercase border border-fuchsia-500/10 px-1.5 py-0.5 rounded">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-fuchsia-500/10 hover:bg-fuchsia-500 hover:text-black border border-fuchsia-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              Launch_Full_Intelligence_Console
            </button>
          </div>
        </div>
      </div>

      {/* ─── Technical IOCs ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active_IOC_Count', value: '42,891', icon: <Database className="text-fuchsia-400" /> },
          { label: 'Neural_Threat_Score', value: '94.2/100', icon: <Zap className="text-purple-400" /> },
          { label: 'System_Vulnerabilities', value: '02_CRITICAL', icon: <Terminal className="text-rose-500" /> },
        ].map((item, i) => (
          <div key={i} className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl">
                {item.icon}
              </div>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">{item.label}</p>
            </div>
            <p className="text-3xl font-black text-white tracking-tighter">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

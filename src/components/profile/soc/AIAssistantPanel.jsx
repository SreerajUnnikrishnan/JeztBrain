import React, { useState } from 'react';
import { Cpu, Terminal, Zap, Shield, Target, Database, ChevronRight } from 'lucide-react';

export default function AIAssistantPanel() {
  const [activeTab, setActiveTab] = useState('recommendations');

  const tabs = [
    { id: 'recommendations', label: 'AI Directives', icon: Zap },
    { id: 'ioc', label: 'IOC Analysis', icon: Target },
    { id: 'cve', label: 'CVE Intel', icon: Database },
    { id: 'mitre', label: 'MITRE ATT&CK', icon: Shield },
  ];

  const mockData = {
    recommendations: [
      { text: "Isolate host WS-4092 from main segment immediately.", severity: "critical" },
      { text: "Deploy behavioral rule for suspicious PowerShell execution.", severity: "high" },
      { text: "Review lateral movement attempts originating from VPN subnet.", severity: "medium" }
    ],
    ioc: [
      { type: "IP", value: "192.168.100.45", rep: "Malicious", intel: "Associated with Cobalt Strike C2" },
      { type: "HASH", value: "a5b3...9f21", rep: "Suspicious", intel: "Matches variant of Emotet loader" }
    ],
    cve: [
      { id: "CVE-2024-21412", desc: "Windows SmartScreen Security Feature Bypass", risk: "9.8 CRITICAL" },
      { id: "CVE-2023-46805", desc: "Ivanti ICS Authentication Bypass", risk: "8.2 HIGH" }
    ],
    mitre: [
      { tactic: "TA0002", name: "Execution", technique: "T1059.001 - PowerShell" },
      { tactic: "TA0008", name: "Lateral Movement", technique: "T1021.002 - SMB/Windows Admin Shares" }
    ]
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400 border border-fuchsia-500/20">
          <Cpu size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">CORTEX_AI_CORE</h3>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Autonomous Tactical Assistant</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 custom-scrollbar">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === t.id 
                ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30' 
                : 'bg-white/5 text-slate-500 hover:text-white border border-transparent'
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 mt-4 bg-[#05080f] rounded-2xl border border-white/5 p-6 overflow-y-auto custom-scrollbar font-mono text-sm relative">
        <div className="absolute top-4 right-4 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        </div>
        
        <div className="flex items-center gap-2 text-fuchsia-500 mb-6 border-b border-white/5 pb-4">
          <Terminal size={16} /> 
          <span className="uppercase tracking-widest text-[10px] font-black">Cortex Terminal // V2.4.1</span>
        </div>

        <div className="space-y-4">
          {activeTab === 'recommendations' && mockData.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3 text-slate-300">
              <ChevronRight size={16} className={rec.severity === 'critical' ? 'text-rose-500' : rec.severity === 'high' ? 'text-amber-500' : 'text-fuchsia-500'} />
              <div>
                <p>{rec.text}</p>
                <p className={`text-[10px] uppercase mt-1 font-black tracking-widest ${rec.severity === 'critical' ? 'text-rose-500' : rec.severity === 'high' ? 'text-amber-500' : 'text-fuchsia-500'}`}>[{rec.severity} priority]</p>
              </div>
            </div>
          ))}

          {activeTab === 'ioc' && mockData.ioc.map((ioc, i) => (
            <div key={i} className="flex gap-3 text-slate-300 border-l-2 border-fuchsia-500/30 pl-3">
              <div>
                <p><span className="text-fuchsia-400 font-black">[{ioc.type}]</span> {ioc.value}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Rep: <span className="text-rose-400">{ioc.rep}</span> // {ioc.intel}</p>
              </div>
            </div>
          ))}

          {activeTab === 'cve' && mockData.cve.map((cve, i) => (
            <div key={i} className="flex gap-3 text-slate-300 border-l-2 border-amber-500/30 pl-3">
              <div>
                <p><span className="text-amber-400 font-black">{cve.id}</span></p>
                <p className="text-xs text-white mt-0.5">{cve.desc}</p>
                <p className="text-[10px] text-rose-500 mt-1 font-black tracking-widest">CVSS: {cve.risk}</p>
              </div>
            </div>
          ))}

          {activeTab === 'mitre' && mockData.mitre.map((m, i) => (
            <div key={i} className="flex gap-3 text-slate-300 border-l-2 border-purple-500/30 pl-3">
              <div>
                <p><span className="text-purple-400 font-black">[{m.tactic}]</span> {m.name}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{m.technique}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Blinking cursor */}
        <div className="flex items-center gap-2 mt-6 text-fuchsia-500">
           <span>&gt;</span>
           <span className="w-2 h-4 bg-fuchsia-500 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}

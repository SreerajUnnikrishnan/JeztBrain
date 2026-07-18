import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, User, Eye, Globe, Zap, Cpu } from 'lucide-react';

export default function Settings() {
  const sections = [
    { title: 'TACTICAL_PREFERENCES', items: [
      { label: 'Neural Theme', desc: 'Dark / Light / High Contrast', icon: <Eye size={18} />, value: 'DARK_MODE' },
      { label: 'Uplink Region', desc: 'Primary tactical server region', icon: <Globe size={18} />, value: 'US_EAST' },
    ]},
    { title: 'SECURITY_PROTOCOLS', items: [
      { label: 'Multi-Factor Auth', desc: 'Biometric / Hardware Key', icon: <Lock size={18} />, value: 'ENABLED' },
      { label: 'API Access Keys', desc: 'Manage system integration tokens', icon: <Zap size={18} />, value: '2_ACTIVE' },
    ]},
    { title: 'SYSTEM_HARDENING', items: [
      { label: 'Auto-Triage', desc: 'AI-assisted case classification', icon: <Cpu size={18} />, value: 'ENABLED' },
      { label: 'Alert Sensitivity', desc: 'Anomaly detection threshold', icon: <Bell size={18} />, value: 'HIGH' },
    ]},
  ];

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse"></div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Expert_System_Settings</h2>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-[10px] font-black text-fuchsia-500/50 uppercase tracking-[0.4em] ml-1">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                <div key={i} className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 group-hover:text-fuchsia-400 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-fuchsia-500 font-black">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

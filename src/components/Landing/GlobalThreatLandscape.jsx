import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Globe, Crosshair, Radio, Shield, HelpCircle, Activity } from 'lucide-react';

const mockThreats = [
  {
    id: 1,
    name: "APT-28 Cyber Espionage Campaign",
    target: "EU Government Portal",
    origin: "Eastern Europe (C2 Cluster)",
    ip: "185.220.101.44",
    severity: "Critical",
    vector: "Zero-Day Exploit (CVE-2026-9041)",
    x: 480,
    y: 110,
    pulseColor: "bg-rose-500"
  },
  {
    id: 2,
    name: "Mirai Variant Botnet DDoS",
    target: "US Power Infrastructure",
    origin: "Unknown Source IP",
    ip: "45.132.88.9",
    severity: "High",
    vector: "IoT Telnet Brute Force",
    x: 180,
    y: 130,
    pulseColor: "bg-rose-500"
  },
  {
    id: 3,
    name: "Ransomware Distribution Pipeline",
    target: "LATAM Healthcare Provider",
    origin: "São Paulo Node",
    ip: "177.85.210.15",
    severity: "High",
    vector: "Phishing Spear payload",
    x: 280,
    y: 310,
    pulseColor: "bg-rose-500"
  },
  {
    id: 4,
    name: "Financial Data Exfiltration",
    target: "East Asia Stock Exchange",
    origin: "Tokyo Proxy Cluster",
    ip: "203.184.22.102",
    severity: "Critical",
    vector: "SQL Injection & Privilege Escalation",
    x: 740,
    y: 140,
    pulseColor: "bg-rose-500"
  },
  {
    id: 5,
    name: "Supply Chain Compromise",
    target: "Silicon Valley Tech Firm",
    origin: "N. America Proxy",
    ip: "198.51.100.72",
    severity: "Medium",
    vector: "Compromised npm dependency",
    x: 120,
    y: 110,
    pulseColor: "bg-amber-500"
  },
  {
    id: 6,
    name: "Industrial Control Attack Vector",
    target: "Middle-East Water Utility",
    origin: "Red Sea Ad-hoc Relay",
    ip: "91.242.180.12",
    severity: "Critical",
    vector: "SCADA PLC command injection",
    x: 520,
    y: 180,
    pulseColor: "bg-rose-500"
  },
  {
    id: 7,
    name: "Network Session Hijacking",
    target: "South Asia Telecom Core",
    origin: "Bangalore Node",
    ip: "103.92.40.16",
    severity: "High",
    vector: "BGP Route Leak Exploitation",
    x: 630,
    y: 220,
    pulseColor: "bg-rose-500"
  },
  {
    id: 8,
    name: "Credential Harvesting Gateway",
    target: "Australian Maritime Network",
    origin: "Sydney Relay",
    ip: "119.82.110.5",
    severity: "Medium",
    vector: "OIDC Client Impersonation",
    x: 760,
    y: 340,
    pulseColor: "bg-amber-500"
  }
];

export default function GlobalThreatLandscape() {
  const [selectedThreat, setSelectedThreat] = useState(mockThreats[0]);
  const [activeTab, setActiveTab] = useState(mockThreats[0].id);
  const [tickerMsg, setTickerMsg] = useState("Monitoring 1,489 intelligence vectors globally...");

  useEffect(() => {
    const messages = [
      "APT-29 infrastructure scanning detected at 18:44 UTC...",
      "SCADA honeypots reporting elevated activity in Central Europe...",
      "Zero-day advisory: Patch release impending for JeztBrain core...",
      "C2 DNS sinkholing neutralized 42,000 bots in past hour...",
      "Real-time IP reputation feeds synced globally with SOC L4 clusters..."
    ];
    const interval = setInterval(() => {
      setTickerMsg(messages[Math.floor(Math.random() * messages.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleThreatHover = (threat) => {
    setSelectedThreat(threat);
    setActiveTab(threat.id);
  };

  return (
    <section className="relative py-12 lg:py-16 bg-white text-slate-800 z-10 overflow-hidden border-t border-slate-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[1px] bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-100/40 blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 mb-5">
            <Radio className="text-violet-500 animate-pulse" size={14} />
            <span className="text-[10px] font-bold text-violet-600 tracking-widest uppercase">
              Operational Intelligence Center
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 font-space-grotesk">
          GLOBAL CYBER THREAT INTELLIGENCE
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed font-medium">
          Real-time visibility into malicious infrastructure, threat actors, emerging attack campaigns, and global cyber activity.
        </p>
        </div>

        {/* 3-Column Centerpiece Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT SIDE PANELS (Cards 1-2) */}
          <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
            {/* Card 1: Threat Intelligence */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_8px_40px_rgba(123,47,247,0.12)] flex flex-col h-[260px] group relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-28 overflow-hidden">
                <img 
                  src="/images/threat_intelligence.png" 
                  alt="Threat Intelligence" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6] border-b border-slate-900" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[9px] font-bold uppercase tracking-wider text-purple-400">Threat Intel</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 font-space-grotesk tracking-wide group-hover:text-violet-600 transition-colors">Threat Intelligence</h3>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">
                    Track active threat actors and attack infrastructure globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Adversary Research */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_8px_40px_rgba(123,47,247,0.12)] flex flex-col h-[260px] group relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-28 overflow-hidden">
                <img 
                  src="/images/red_team.png" 
                  alt="Adversary Research" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6] border-b border-slate-900" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[9px] font-bold uppercase tracking-wider text-purple-400">Adversary Research</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 font-space-grotesk tracking-wide group-hover:text-violet-600 transition-colors">Adversary Research</h3>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">
                    Identify emerging attack techniques before they become widespread.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE CENTERPIECE (Map & Ticker & Metrics) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* World Map Container */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative overflow-hidden flex flex-col flex-1 min-h-[420px] shadow-md justify-between">
              
              {/* Map Header */}
              <div className="flex items-center justify-between mb-4 relative z-20">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-violet-400 animate-spin-slow" />
                  <span className="text-xs font-bold text-slate-600 font-mono tracking-widest uppercase">
                    Cyber Threat Radar System
                  </span>
                </div>
                
                {/* Real-time Ticker */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-violet-50 border border-violet-200 text-[9px] font-mono text-violet-600 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                  {tickerMsg}
                </div>
              </div>

              {/* Map Graphics Canvas */}
              <div className="flex-1 relative w-full h-[320px] flex items-center justify-center bg-transparent rounded-2xl overflow-hidden select-none">
                
                {/* Map Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30 mix-blend-screen" />
                
                {/* Threat Heatmap Effect */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-rose-600/10 blur-[40px] animate-pulse" />
                  <div className="absolute top-2/3 right-1/4 w-40 h-40 rounded-full bg-rose-600/5 blur-[50px]" />
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-violet-950/5 blur-[60px]" />
                </div>

                {/* Holographic World Map Outline SVG */}
                <svg viewBox="0 0 1000 500" className="w-full h-full absolute inset-0 z-0 opacity-20 pointer-events-none" preserveAspectRatio="xMidYMid meet">
                  {/* Dotted vector continents */}
                  {/* North America */}
                  <ellipse cx="190" cy="180" rx="110" ry="80" fill="none" stroke="#7B2FF7" strokeWidth="0.8" strokeDasharray="3 6" />
                  <ellipse cx="200" cy="250" rx="70" ry="50" fill="none" stroke="#7B2FF7" strokeWidth="0.8" strokeDasharray="3 6" />
                  {/* South America */}
                  <ellipse cx="250" cy="330" rx="55" ry="80" fill="none" stroke="#7B2FF7" strokeWidth="0.8" strokeDasharray="3 6" />
                  {/* Europe */}
                  <ellipse cx="480" cy="155" rx="55" ry="50" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 6" />
                  {/* Africa */}
                  <ellipse cx="490" cy="280" rx="60" ry="90" fill="none" stroke="#7B2FF7" strokeWidth="0.8" strokeDasharray="3 6" />
                  {/* Asia */}
                  <ellipse cx="700" cy="180" rx="150" ry="90" fill="none" stroke="#7B2FF7" strokeWidth="0.8" strokeDasharray="3 6" />
                  {/* Australia */}
                  <ellipse cx="780" cy="330" rx="65" ry="45" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 6" />
                  
                  {/* Static Purple Intelligence Nodes */}
                  <circle cx="210" cy="190" r="3.5" fill="#8B5CF6" />
                  <circle cx="490" cy="140" r="3.5" fill="#8B5CF6" />
                  <circle cx="680" cy="210" r="3.5" fill="#8B5CF6" />
                  <circle cx="720" cy="160" r="3.5" fill="#8B5CF6" />
                  <circle cx="320" cy="280" r="3.5" fill="#8B5CF6" />
                  <circle cx="540" cy="270" r="3.5" fill="#8B5CF6" />
                  <circle cx="150" cy="130" r="3" fill="#8B5CF6" />
                  <circle cx="850" cy="320" r="3" fill="#8B5CF6" />
                  
                  {/* Blue Intelligence Connections (Curves) */}
                  <motion.path 
                    d="M 180,130 Q 320,80 480,110" 
                    fill="none" 
                    stroke="rgba(123, 47, 247, 0.45)" 
                    strokeWidth="1.2" 
                    strokeDasharray="6 8"
                    animate={{ strokeDashoffset: [0, -100] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path 
                    d="M 480,110 Q 610,60 740,140" 
                    fill="none" 
                    stroke="rgba(123, 47, 247, 0.45)" 
                    strokeWidth="1.2" 
                    strokeDasharray="6 8"
                    animate={{ strokeDashoffset: [0, 100] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path 
                    d="M 280,310 Q 380,240 480,110" 
                    fill="none" 
                    stroke="rgba(123, 47, 247, 0.35)" 
                    strokeWidth="1" 
                    strokeDasharray="5 5"
                    animate={{ strokeDashoffset: [0, -80] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Purple AI Signal Routes (Curves) */}
                  <motion.path 
                    d="M 120,110 Q 430,220 740,140" 
                    fill="none" 
                    stroke="rgba(139, 92, 246, 0.45)" 
                    strokeWidth="1" 
                    strokeDasharray="4 12"
                    animate={{ strokeDashoffset: [0, -150] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path 
                    d="M 520,180 Q 640,290 760,340" 
                    fill="none" 
                    stroke="rgba(139, 92, 246, 0.45)" 
                    strokeWidth="1" 
                    strokeDasharray="4 12"
                    animate={{ strokeDashoffset: [0, 150] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  />
                </svg>

                {/* Animated Threat Pulses */}
                {mockThreats.map((threat) => (
                  <div
                    key={`pulse-${threat.id}`}
                    className="absolute cursor-pointer pointer-events-auto"
                    style={{ top: `${threat.y}px`, left: `${threat.x}px` }}
                    onMouseEnter={() => handleThreatHover(threat)}
                  >
                    {/* Ring waves */}
                    <motion.div
                      animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: threat.id * 0.3 }}
                      className="absolute w-6 h-6 rounded-full bg-rose-600/30 -ml-3 -mt-3 border border-rose-500"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: threat.id * 0.3 + 0.8 }}
                      className="absolute w-6 h-6 rounded-full bg-rose-600/20 -ml-3 -mt-3 border border-rose-500"
                    />
                  </div>
                ))}

                {/* Threat Node Markers */}
                {mockThreats.map((threat) => (
                  <div
                    key={`node-${threat.id}`}
                    className="absolute cursor-pointer pointer-events-auto z-10"
                    style={{ top: `${threat.y}px`, left: `${threat.x}px` }}
                    onMouseEnter={() => handleThreatHover(threat)}
                  >
                    <div className={`w-2 h-2 rounded-full -ml-1 -mt-1 shadow-[0_0_12px_rgba(244,63,94,0.8)] ${
                      activeTab === threat.id ? 'bg-rose-400 scale-125' : 'bg-rose-600 hover:bg-rose-400'
                    } transition-all duration-300`} />
                  </div>
                ))}

                {/* Active Interactive Dashboard HUD Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 z-20 pointer-events-auto shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-mono">
                        Active Threat Attack Vector
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 tracking-wider">
                      TARGET: {selectedThreat.target}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500">Incident:</span>{" "}
                      <span className="text-slate-200 font-bold tracking-wide">{selectedThreat.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Origin Node:</span>{" "}
                      <span className="text-slate-300">{selectedThreat.origin}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Reputation IP:</span>{" "}
                      <span className="text-violet-400">{selectedThreat.ip}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Vector Payload:</span>{" "}
                      <span className="text-amber-400">{selectedThreat.vector}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Centerpiece Metrics Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-r border-slate-200 pr-2 last:border-none">
                  <div className="text-2xl font-black text-slate-900 font-space-grotesk tracking-tight">
                    2.5M+
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-violet-500"></span>
                    Signals Analyzed
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:border-r border-slate-200 pr-2 last:border-none">
                  <div className="text-2xl font-black text-slate-900 font-space-grotesk tracking-tight">
                    120+
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-violet-500"></span>
                    Countries Monitored
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-r border-slate-200 pr-2 last:border-none">
                  <div className="text-2xl font-black text-slate-900 font-space-grotesk tracking-tight">
                    85K+
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-violet-500"></span>
                    Investigations
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left last:border-none">
                  <div className="text-2xl font-black text-slate-900 font-space-grotesk tracking-tight">
                    500+
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-violet-500 animate-pulse"></span>
                    Expert Network
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE PANELS (Cards 3-4) */}
          <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
            {/* Card 3: Malware Analysis */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_8px_40px_rgba(123,47,247,0.12)] flex flex-col h-[260px] group relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-28 overflow-hidden">
                <img 
                  src="/images/malware_analysis.png" 
                  alt="Malware Analysis" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6] border-b border-slate-900" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[9px] font-bold uppercase tracking-wider text-purple-400">Malware Analysis</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 font-space-grotesk tracking-wide group-hover:text-violet-600 transition-colors">Malware Analysis</h3>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">
                    Analyze malicious code and understand attacker behavior.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Attack Surface Monitoring */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_8px_40px_rgba(123,47,247,0.12)] flex flex-col h-[260px] group relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-28 overflow-hidden">
                <img 
                  src="/images/attack_surface.png" 
                  alt="Attack Surface Monitoring" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6] border-b border-slate-900" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[9px] font-bold uppercase tracking-wider text-purple-400">Attack Surface</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 font-space-grotesk tracking-wide group-hover:text-violet-600 transition-colors">Attack Surface Monitoring</h3>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">
                    Discover exposed assets and reduce attack paths.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

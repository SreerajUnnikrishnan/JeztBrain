import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Globe, Activity, Users, CheckCircle, 
  Server, Clock, Shield, Zap, AlertTriangle, ArrowRight,
  TrendingUp, Terminal, ShieldCheck, UserCheck, Play, PlayCircle
} from 'lucide-react';

export default function ThreatOperationsCenter() {
  const [activeTab, setActiveTab] = useState('ai'); // ai, experts, queue, feed
  const [riskScore, setRiskScore] = useState(78);
  const [systemUptime, setSystemUptime] = useState(99.98);
  
  // Real-time simulated threat connection arcs
  const [activeAttacks, setActiveAttacks] = useState([
    { id: 1, from: 'Frankfurt (DE)', to: 'Bangalore (IN)', x1: 180, y1: 170, x2: 290, y2: 240, type: 'DDoS', ip: '85.203.47.19', severity: 'high' },
    { id: 2, from: 'Beijing (CN)', to: 'San Francisco (US)', x1: 340, y1: 160, x2: 80, y2: 170, type: 'APT Phishing', ip: '104.244.76.12', severity: 'critical' },
    { id: 3, from: 'London (UK)', to: 'Tokyo (JP)', x1: 165, y1: 140, x2: 360, y2: 180, type: 'Zero-Day Malware', ip: '185.190.140.4', severity: 'critical' },
  ]);

  // Expert status data
  const [experts, setExperts] = useState([
    { name: 'Agent Nida', role: 'Penetration Tester', status: 'Available Now', code: 'OFFENSIVE_RED', color: 'bg-emerald-500 shadow-emerald-500/50' },
    { name: 'Agent Abin', role: 'SOC Analyst', status: 'Investigating', code: 'INCIDENT_TOC_9', color: 'bg-purple-500 shadow-purple-500/50' },
    { name: 'Agent Anand', role: 'Malware Expert', status: 'Busy', code: 'REVERSE_ENG_X', color: 'bg-amber-500 shadow-amber-500/50' },
    { name: 'Agent Sreeraj', role: 'Cryptographer', status: 'Available Now', code: 'PQC_PROTOCOL', color: 'bg-emerald-500 shadow-emerald-500/50' },
  ]);

  // Live real-time incident feed data
  const [incidents, setIncidents] = useState([
    { id: 101, type: 'SQL injection payload', source: 'POST /v1/auth', ip: '104.244.76.12', time: 'Just Now', status: 'BLOCKED', severity: 'high' },
    { id: 102, type: 'Unauthorized SSH port scan', source: 'Node-US-East-1', ip: '85.203.47.19', time: '2m ago', status: 'QUARANTINED', severity: 'critical' },
    { id: 103, type: 'Rate limit threshold breach', source: 'Checkout API', ip: '45.138.89.200', time: '4m ago', status: 'RATE-LIMITED', severity: 'medium' },
    { id: 104, type: 'SSL handshake negotiation', source: 'Internal Gateway', ip: '185.190.140.4', time: '7m ago', status: 'CLEANED', severity: 'low' },
  ]);

  // Incident queue numbers
  const [queue, setQueue] = useState({
    review: 4,
    accepted: 14,
    critical: 2,
    escalated: 1
  });

  // Recommended actions state for interactions
  const [completedActions, setCompletedActions] = useState([]);
  
  // Real-time telemetry generator
  useEffect(() => {
    const interval = setInterval(() => {
      // Tick risk score slightly for realism
      setRiskScore(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.max(65, Math.min(88, next));
      });

      // Add a simulated incident occasionally
      const newIps = ['103.44.200.12', '192.168.4.11', '74.125.19.147', '200.89.43.10', '185.20.120.35'];
      const newTypes = ['Brute-force auth probe', 'XSS payload injection', 'Kubernetes pod privilege escalation', 'Sensitive data exfiltration', 'API token misuse'];
      const newSecs = ['prod-api-v2', 'auth-service', 'k8s-worker-node-1', 'postgres-db-replica', 'payment-gateway'];
      const newStatuses = ['BLOCKED', 'QUARANTINED', 'MITIGATED', 'BLOCKED', 'RATE-LIMITED'];
      const newSevs = ['critical', 'high', 'medium', 'low'];

      const randomIp = newIps[Math.floor(Math.random() * newIps.length)];
      const randomType = newTypes[Math.floor(Math.random() * newTypes.length)];
      const randomSec = newSecs[Math.floor(Math.random() * newSecs.length)];
      const randomStatus = newStatuses[Math.floor(Math.random() * newStatuses.length)];
      const randomSev = newSevs[Math.floor(Math.random() * newSevs.length)];

      const newInc = {
        id: Date.now(),
        type: randomType,
        source: randomSec,
        ip: randomIp,
        time: 'Just Now',
        status: randomStatus,
        severity: randomSev
      };

      setIncidents(prev => {
        const list = [newInc, ...prev];
        return list.map(item => {
          if (item.time === 'Just Now' && item.id !== newInc.id) {
            return { ...item, time: '1m ago' };
          }
          return item;
        }).slice(0, 5);
      });

      // Increment queue counters realistically
      setQueue(prev => ({
        ...prev,
        review: prev.review + (Math.random() > 0.8 ? 1 : 0),
        critical: prev.critical + (Math.random() > 0.95 ? 1 : 0)
      }));

      // Randomize one attack line
      setActiveAttacks(prev => {
        const list = [...prev];
        const indexToReplace = Math.floor(Math.random() * list.length);
        const froms = ['Beijing (CN)', 'London (UK)', 'Moscow (RU)', 'Sao Paulo (BR)', 'Sydney (AU)'];
        const tos = ['San Francisco (US)', 'Tokyo (JP)', 'New York (US)', 'Frankfurt (DE)', 'Singapore (SG)'];
        const coords = [
          { x1: 340, y1: 160, x2: 80, y2: 170 }, // cn -> us
          { x1: 165, y1: 140, x2: 360, y2: 180 }, // uk -> jp
          { x1: 220, y1: 120, x2: 85, y2: 165 }, // ru -> us
          { x1: 110, y1: 280, x2: 180, y2: 170 }, // br -> de
          { x1: 350, y1: 290, x2: 310, y2: 240 }  // au -> sg
        ];

        const roll = Math.floor(Math.random() * coords.length);
        list[indexToReplace] = {
          id: Date.now() + indexToReplace,
          from: froms[roll],
          to: tos[roll],
          ...coords[roll],
          type: newTypes[Math.floor(Math.random() * newTypes.length)],
          ip: newIps[Math.floor(Math.random() * newIps.length)],
          severity: newSevs[Math.floor(Math.random() * 2)] // critical or high
        };
        return list;
      });

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const triggerAction = (actionId) => {
    if (completedActions.includes(actionId)) return;
    setCompletedActions(prev => [...prev, actionId]);
    
    // Dynamically adjust metrics down as defense is applied
    setRiskScore(prev => Math.max(50, prev - 4));
    setQueue(prev => ({
      ...prev,
      critical: Math.max(0, prev.critical - (actionId === 'action-1' ? 1 : 0))
    }));
  };

  const getSeverityBadgeColor = (sev) => {
    switch (sev) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border border-rose-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border border-orange-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border border-amber-500/20';
      default: return 'text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20';
    }
  };

  return (
    <div className="bg-[#080d1a]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col backdrop-blur-xl">
      {/* ─── HEADER COMMAND BAR ─── */}
      <div className="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse" />
          <div>
            <h3 className="text-xs font-black uppercase text-white tracking-[0.25em] flex items-center gap-2">
              <Terminal size={14} className="text-fuchsia-400" /> THREAT_OPERATIONS_CENTER_v5
            </h3>
            <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Secure Telemetry Uplink // Active</p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-[9px] text-slate-400">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-slate-600">SYS_SHIELD:</span>
            <span className="text-emerald-400 font-extrabold flex items-center gap-1">
              <ShieldCheck size={11} /> LOCKED
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#030712] border border-white/5 px-3 py-1.5 rounded-xl">
            <span className="text-rose-500 font-extrabold animate-pulse">● CRITICAL THREAT LEVEL: HIGH</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN WORKSPACE GRID ─── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden min-h-0">
        
        {/* LEFT PANEL: GLOBAL THREAT MAP (65% width equivalent) */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative min-h-[350px]">
          {/* Futuristic Map Overlay Details */}
          <div className="absolute top-4 left-6 z-10 pointer-events-none">
            <div className="flex items-center gap-2">
              <Globe className="text-fuchsia-400 animate-spin [animation-duration:30s]" size={16} />
              <span className="font-mono text-[9px] font-extrabold uppercase text-white tracking-widest">Global Telemetry Map</span>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>ACTIVE VECTOR</span>
              </div>
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                <span>CONTAINED ENDPOINT</span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-6 z-10 font-mono text-[8px] text-right text-slate-500 space-y-0.5">
            <div>SCANNING_INTERVAL: 120ms</div>
            <div>AUDIT_SIGNATURES: 14,204</div>
          </div>

          {/* SVG Map Container */}
          <div className="flex-1 flex items-center justify-center relative w-full h-full min-h-[220px] rounded-2xl bg-[#030712]/30 border border-white/5 overflow-hidden shadow-inner my-6">
            
            {/* Ambient Background Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(123, 47, 247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(123, 47, 247,0.02)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none z-0" />
            
            {/* Global blue/cyan radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123, 47, 247,0.06)_0%,transparent_75%)] pointer-events-none" />

            {/* Simulated Continent SVG Outline (Fidelity Minimalist Art) */}
            <svg viewBox="0 0 450 320" className="w-full h-full opacity-35 relative z-10 select-none">
              <defs>
                <linearGradient id="cyberGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* North America */}
              <path d="M 40 80 Q 90 70 120 120 T 60 160 Q 40 120 40 80 Z" fill="#0c1930" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.2" />
              {/* South America */}
              <path d="M 80 180 Q 110 190 120 220 T 100 290 Q 80 250 80 180 Z" fill="#0c1930" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.2" />
              {/* Eurasia / Africa */}
              <path d="M 170 80 Q 240 50 320 100 T 400 130 Q 320 200 250 180 T 170 80 Z" fill="#0c1930" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.2" />
              <path d="M 180 160 Q 230 160 250 200 T 220 280 Q 180 240 180 160 Z" fill="#0c1930" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.2" />
              {/* Australia */}
              <path d="M 330 240 Q 380 230 370 270 T 330 240 Z" fill="#0c1930" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.2" />

              {/* Threat Attack Arcs & Pulse Trails */}
              <AnimatePresence>
                {activeAttacks.map((attack) => {
                  const dx = attack.x2 - attack.x1;
                  const dy = attack.y2 - attack.y1;
                  const mx = attack.x1 + dx / 2;
                  const my = attack.y1 + dy / 2 - 40; // curve offset

                  return (
                    <g key={attack.id}>
                      {/* Connection Line Curve */}
                      <motion.path
                        d={`M ${attack.x1} ${attack.y1} Q ${mx} ${my} ${attack.x2} ${attack.y2}`}
                        fill="none"
                        stroke="url(#cyberGlowGrad)"
                        strokeWidth="1.2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      
                      {/* Pulsing Light particle along the connection path */}
                      <motion.circle
                        r="3"
                        fill="#A855F7"
                        filter="drop-shadow(0 0 6px #A855F7)"
                        initial={{ offset: 0 }}
                        animate={{
                          cx: [attack.x1, mx, attack.x2],
                          cy: [attack.y1, my, attack.y2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Origin Node Indicator */}
                      <circle cx={attack.x1} cy={attack.y1} r="3" fill="#7C3AED" />
                      <circle cx={attack.x1} cy={attack.y1} r="7" fill="none" stroke="#7C3AED" strokeWidth="0.5" className="animate-pulse" />

                      {/* Destination Threat Pulse Target */}
                      <circle cx={attack.x2} cy={attack.y2} r="4" fill={attack.severity === 'critical' ? '#FF3B5C' : '#A855F7'} />
                      <motion.circle
                        cx={attack.x2}
                        cy={attack.y2}
                        r="14"
                        fill="none"
                        stroke={attack.severity === 'critical' ? '#FF3B5C' : '#A855F7'}
                        strokeWidth="1"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                    </g>
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Floating Attack Stats Banner overlay inside map */}
            <div className="absolute bottom-4 left-6 right-6 z-20 flex justify-between items-center bg-[#070b14]/90 border border-white/5 p-3 rounded-2xl backdrop-blur-md">
              <div className="flex gap-4">
                {activeAttacks.map((a, i) => (
                  <div key={i} className="hidden md:block border-r border-white/5 pr-4 last:border-0 last:pr-0">
                    <span className="block font-mono text-[7px] text-slate-500 uppercase tracking-widest">VECTOR_{i+1}</span>
                    <span className="block font-bold text-[9px] text-white tracking-wide truncate max-w-[120px]">{a.type}</span>
                    <span className="block font-mono text-[8px] text-[#A855F7]">{a.ip}</span>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <span className="block font-mono text-[7px] text-slate-500 uppercase">SYS_TELEMETRY</span>
                <span className="text-[10px] font-black text-emerald-400 font-mono flex items-center gap-1 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% OK
                </span>
              </div>
            </div>

          </div>

          {/* Map Footer Metadata info */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-3 border-t border-white/5 font-mono text-[9px] text-slate-500">
            <span className="flex items-center gap-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              INTELLIGENCE LINK ESTABLISHED: PORT 9883
            </span>
            <span className="uppercase text-right">SECURE CONTROL GRID // ZONE A</span>
          </div>

        </div>

        {/* RIGHT PANEL: INTERACTIVE HUD MODULES (35% width equivalent) */}
        <div className="lg:col-span-4 flex flex-col min-h-[300px]">
          
          {/* TAB HEADERS BAR */}
          <div className="grid grid-cols-4 border-b border-white/5 bg-black/25">
            {[
              { id: 'ai', label: 'AI_INTEL' },
              { id: 'feed', label: 'FEED' },
              { id: 'queue', label: 'QUEUE' },
              { id: 'experts', label: 'EXPERT' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 text-[9px] font-black font-mono tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#080d1a] text-fuchsia-400 border-b-2 border-fuchsia-400 shadow-[0_-5px_15px_rgba(123, 47, 247,0.03)]'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB SCROLLABLE PANEL SPACE */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[390px] custom-scrollbar bg-black/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                
                {/* ─── TAB 1: AI THREAT ANALYSIS ─── */}
                {activeTab === 'ai' && (
                  <div className="space-y-5 h-full flex flex-col justify-between">
                    <div>
                      {/* Risk Score Widget */}
                      <div className="bg-[#030712]/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Neural Risk Assessment</p>
                          <h4 className="text-2xl font-black text-white tracking-tighter flex items-baseline gap-1">
                            {riskScore}% <span className="text-[10px] text-rose-500 font-extrabold uppercase">CRITICAL</span>
                          </h4>
                        </div>
                        <div className="w-14 h-14 relative flex items-center justify-center">
                          {/* Radial Glow Gauge */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                            <motion.circle
                              cx="28"
                              cy="28"
                              r="22"
                              fill="none"
                              stroke={riskScore > 75 ? '#f43f5e' : '#06b6d4'}
                              strokeWidth="4"
                              strokeDasharray="138"
                              strokeDashoffset={138 - (138 * riskScore) / 100}
                              transition={{ duration: 0.5 }}
                            />
                          </svg>
                          <span className="absolute text-[8px] font-black font-mono text-slate-300">SCORE</span>
                        </div>
                      </div>

                      {/* Threat Details */}
                      <div className="space-y-3 font-mono">
                        <div>
                          <p className="text-[8px] text-slate-500 uppercase tracking-widest">Attack Classification</p>
                          <p className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1.5 mt-1">
                            <AlertTriangle size={12} className="text-rose-500 animate-pulse" /> Advanced Persistent Threat (APT-39)
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-3">
                          <div>
                            <p className="text-[8px] text-slate-500 uppercase">Confidence Level</p>
                            <span className="text-[10px] font-extrabold text-fuchsia-400">98.4% CLASSIFIED</span>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-500 uppercase">Affected Nodes</p>
                            <span className="text-[10px] font-extrabold text-white">4 SEGMENTS</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2">Neural Recommendation Sequence</p>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium">
                            Anomalous high-entropy SSH key injection mapped to malicious payload deployment. Recommended automated lockdown of API routes immediately.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Recommended Actions */}
                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">OPERATIONAL INTELLIGENCE RECOMMENDATIONS</p>
                      
                      {[
                        { id: 'action-1', label: 'Quarantine Infected Host: Node-4', action: 'Quarantining Node-4' },
                        { id: 'action-2', label: 'Rotate Vulnerable Session Keys', action: 'Rotating Keys' },
                        { id: 'action-3', label: 'Block Malicious Origin IP: 85.203', action: 'Blocking IP' }
                      ].map((act) => {
                        const isDone = completedActions.includes(act.id);
                        return (
                          <button
                            key={act.id}
                            onClick={() => triggerAction(act.id)}
                            className={`w-full p-3 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-between transition-all ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-default'
                                : 'bg-white/5 border-white/5 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 text-white active:scale-95'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {isDone ? <CheckCircle size={12} /> : <Zap size={12} className="text-fuchsia-400" />}
                              {act.label}
                            </span>
                            <span className="text-[8px] font-mono opacity-60">
                              {isDone ? 'COMPLETED' : 'EXECUTE'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ─── TAB 2: ACTIVE INCIDENT FEED ─── */}
                {activeTab === 'feed' && (
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                      <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">STREAMING_INCIDENTS_TELEMETRY</p>
                      <span className="text-[8px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest">LIVE FLOW</span>
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[320px] pr-1">
                      <AnimatePresence>
                        {incidents.map((inc) => (
                          <motion.div
                            key={inc.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={`p-3 rounded-xl border bg-[#030712]/40 flex items-center justify-between relative group ${getSeverityBadgeColor(inc.severity)}`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] font-bold text-white uppercase tracking-tight truncate">{inc.type}</p>
                                <p className="text-[8px] font-mono text-slate-500 truncate">{inc.source} // {inc.ip}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <span className={`text-[7px] font-black font-mono uppercase px-1.5 py-0.5 rounded ${getSeverityBadgeColor(inc.severity)}`}>
                                {inc.severity}
                              </span>
                              <span className="block text-[8px] font-mono text-slate-500 mt-1">{inc.time}</span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* ─── TAB 3: INCIDENT QUEUE ─── */}
                {activeTab === 'queue' && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div>
                      <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-3">CYBER TASK MANAGEMENT QUEUE</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { count: queue.review, label: 'Awaiting Review', color: 'text-fuchsia-400 border-fuchsia-500/20' },
                          { count: queue.accepted, label: 'Accepted Cases', color: 'text-purple-400 border-purple-500/20' },
                          { count: queue.critical, label: 'Critical Alerts', color: 'text-rose-400 border-rose-500/20 animate-pulse' },
                          { count: queue.escalated, label: 'Escalated Cases', color: 'text-amber-400 border-amber-500/20' }
                        ].map((q, idx) => (
                          <div key={idx} className={`p-4 bg-[#030712]/50 border rounded-2xl text-center space-y-1 ${q.color}`}>
                            <span className="block text-2xl font-black font-mono">{q.count}</span>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-wider">{q.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 space-y-2">
                        <p className="text-[8px] font-mono text-slate-500 uppercase">Awaiting Action Details</p>
                        
                        <div className="bg-[#030712]/30 border border-white/5 p-3 rounded-xl flex items-center justify-between font-mono text-[8.5px]">
                          <span className="text-white">API_DDOS_PROBE</span>
                          <span className="text-rose-500 font-extrabold">ACTION REQUIRED</span>
                        </div>
                        <div className="bg-[#030712]/30 border border-white/5 p-3 rounded-xl flex items-center justify-between font-mono text-[8.5px]">
                          <span className="text-white">K8S_CONTAINER_CVE</span>
                          <span className="text-amber-500 font-bold">RE-AUDITING</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-4 py-3.5 bg-fuchsia-500 text-[#030712] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-fuchsia-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(123, 47, 247,0.2)] active:scale-95">
                      Open Operational Workspace <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* ─── TAB 4: EXPERT AVAILABILITY PANEL ─── */}
                {activeTab === 'experts' && (
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                      <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">TACTICAL NETWORK RESIDENT EXPERTS</p>
                      <span className="text-[8px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest">{experts.filter(e => e.status.includes('Now')).length + 2} ACTIVE</span>
                    </div>

                    <div className="space-y-3">
                      {experts.map((exp, idx) => (
                        <div key={idx} className="bg-[#030712]/30 border border-white/5 p-3.5 rounded-2xl flex items-center justify-between group hover:border-fuchsia-500/20 transition-all">
                          <div className="flex items-center gap-3">
                            {/* Blinking Avatar Sphere */}
                            <div className="relative">
                              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center font-mono text-[10px] font-extrabold text-fuchsia-400">
                                {exp.name.split(' ')[1][0]}
                              </div>
                              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#030712] ${exp.color} animate-pulse`} />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{exp.name}</h4>
                              <p className="text-[8px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">{exp.role}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">{exp.status}</span>
                            <span className="block text-[7px] font-mono text-fuchsia-500/40 font-black tracking-widest uppercase mt-0.5">{exp.code}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}

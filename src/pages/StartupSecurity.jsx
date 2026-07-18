import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, ShieldAlert, ShieldCheck, Activity, Terminal, Brain, Server,
  Globe, FileText, Cpu, ArrowRight, Check, Play, Pause, ChevronRight,
  ChevronDown, CheckCircle, AlertTriangle, AlertCircle, HardDrive,
  RefreshCw, Star, Info, Users, Clock, Flame, Database, Zap, Lock, Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Hook for counting animations
function useAnimatedCounter(targetValue, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseInt(targetValue, 10);
    if (isNaN(end) || start === end) {
      setCount(isNaN(end) ? 0 : end);
      return;
    }

    const totalMilliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMilliseconds / end));
    if (incrementTime < 10) incrementTime = 10;

    const step = Math.ceil(end / (totalMilliseconds / incrementTime));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetValue, duration, trigger]);

  return count;
}

// ====================================================
// ✨ DYNAMIC VISUAL COMPONENTS (STARTUP CYBERSECURITY)
// ====================================================

// 1. HERO SECTION: STARTUP CYBER SOC / HOLOGRAM TEAM VISUAL
function HeroCyberSOC() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-full min-h-[480px] lg:min-h-[580px] rounded-[24px] bg-[#0D1320]/80 border border-[#A855F7]/20 hover:border-[#A855F7]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(123, 47, 247,0.08)] overflow-hidden p-6 group transition-all duration-500 hover:scale-[1.01]"
    >
      {/* Dynamic Cyber Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(123, 47, 247, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(123, 47, 247, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Subtle AI Scanning Laser Sweep */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent animate-[scan_4s_ease-in-out_infinite] pointer-events-none z-20" />

      {/* Holographic Concentric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[440px] h-[340px] md:h-[440px] border border-[#A855F7]/10 rounded-full animate-spin [animation-duration:60s] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[320px] h-[240px] md:h-[320px] border border-dashed border-[#7C3AED]/20 rounded-full animate-spin [animation-duration:30s] [animation-direction:reverse] pointer-events-none" />

      {/* Main Visual Title / Badge overlay */}
      <div className="absolute top-4 left-6 z-10 flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
        <span className="font-mono text-[9px] text-[#A855F7] font-black tracking-widest uppercase">LIVE SOC DEFENSE NET</span>
      </div>

      {/* Active Team / Analysts Indicators (Holographic Avatars) */}
      <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2 select-none">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#7C3AED] border border-[#070B14] flex items-center justify-center font-mono text-[8px] font-bold">NV</div>
          <div className="w-6 h-6 rounded-full bg-[#A855F7] border border-[#070B14] text-black flex items-center justify-center font-mono text-[8px] font-bold">VM</div>
          <div className="w-6 h-6 rounded-full bg-slate-800 border border-[#070B14] text-slate-300 flex items-center justify-center font-mono text-[8px] font-bold">AI</div>
        </div>
        <span className="text-[9px] font-mono text-slate-400 font-bold">3 ACTIVE CYBER CONTROLLERS</span>
      </div>

      {/* Central SVG Network Topology Graph */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-80 max-w-[340px] md:max-w-[400px]">
          {/* Connection Lines */}
          <line x1="200" y1="200" x2="100" y2="120" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
          <line x1="200" y1="200" x2="300" y2="120" stroke="#A855F7" strokeWidth="1.5" />
          <line x1="200" y1="200" x2="80" y2="260" stroke="#7C3AED" strokeWidth="1.5" />
          <line x1="200" y1="200" x2="320" y2="260" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="100" y1="120" x2="300" y2="120" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="80" y1="260" x2="320" y2="260" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.4" />

          {/* Central AI core hub node */}
          <circle cx="200" cy="200" r="32" fill="#070B14" stroke="#A855F7" strokeWidth="3" className="filter drop-shadow-[0_0_12px_rgba(123, 47, 247,0.6)]" />
          <circle cx="200" cy="200" r="22" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1" />

          {/* Pulse nodes */}
          <circle cx="100" cy="120" r="8" fill="#A855F7" className="animate-ping" />
          <circle cx="100" cy="120" r="6" fill="#A855F7" />
          <circle cx="300" cy="120" r="6" fill="#A855F7" />
          <circle cx="80" cy="260" r="6" fill="#7C3AED" />
          <circle cx="320" cy="260" r="8" fill="#7C3AED" className="animate-ping" />
          <circle cx="320" cy="260" r="6" fill="#7C3AED" />

          {/* Text Labels inside SVG */}
          <text x="200" y="204" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AI CORE</text>
          <text x="100" y="100" fill="#A855F7" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">API GW</text>
          <text x="300" y="100" fill="#A855F7" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">K8S CLUSTER</text>
          <text x="65" y="280" fill="#7C3AED" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SaaS DB</text>
          <text x="335" y="280" fill="#7C3AED" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AUTH DEV</text>
        </svg>
      </div>

      {/* Floating telemetry alerts */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-6 z-20 bg-[#070B14]/90 border border-[#A855F7]/20 p-3 rounded-xl shadow-2xl backdrop-blur-md max-w-[150px] font-mono text-[9px] text-left"
      >
        <div className="text-[#A855F7] font-black pb-1 border-b border-white/5">MONITOR ACTIVE</div>
        <div className="pt-1.5 space-y-1 text-slate-400">
          <div>CPU: <span className="text-white">12.4%</span></div>
          <div>MEM: <span className="text-white">4.8 GB</span></div>
          <div>IPS: <span className="text-[#00FFB2]">SECURED</span></div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-16 right-6 z-20 bg-[#070B14]/90 border border-[#FF3B5C]/20 p-3 rounded-xl shadow-2xl backdrop-blur-md max-w-[170px] font-mono text-[9px] text-left"
      >
        <div className="text-[#FF3B5C] font-black pb-1 border-b border-white/5 flex items-center gap-1.5">
          <AlertCircle size={10} />
          <span>ALERT RESOLVED</span>
        </div>
        <p className="pt-1.5 text-slate-300 leading-normal font-semibold">
          Quarantined brute-force probe from node IP 45.19.12.8
        </p>
      </motion.div>
    </motion.div>
  );
}

// 2. WHY STARTUPS NEED SECURITY: TEAM + CLOUD BLUEPRINT VISUAL
function SaaSWorkspaceVisual() {
  const [dataPoints, setDataPoints] = useState([40, 45, 38, 55, 48, 62, 58, 70, 65, 80]);

  // Dynamic Chart Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => [...prev.slice(1), Math.floor(Math.random() * 40 + 40)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-full h-full min-h-[480px] rounded-[24px] bg-[#070B14] border border-white/5 hover:border-[#7C3AED]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden p-6 group transition-all duration-500 hover:scale-[1.02]"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(124, 58, 237, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124, 58, 237, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[scan_6s_ease-in-out_infinite] pointer-events-none z-20" />

      {/* Header and Compliance score */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 z-10 relative">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#7C3AED]" />
          <span className="font-mono text-[9px] text-slate-300 font-extrabold uppercase">SaaS INFRASTRUCTURE MAP</span>
        </div>
        <div className="px-2 py-0.5 rounded bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] font-mono text-[8px] font-black tracking-widest uppercase">
          SOC2 COMPLIANCE READY: 99.98%
        </div>
      </div>

      {/* Cloud Nodes & Connected Data Packets */}
      <div className="grid grid-cols-3 gap-4 mt-8 relative z-10 select-none">
        {[
          { icon: Database, label: "Customer DB", desc: "Encrypted AES-256", active: true },
          { icon: Server, label: "VPC Servers", desc: "3 Active Nodes", active: true },
          { icon: Globe, label: "Client Gateway", desc: "Rate-Limiting active", active: true }
        ].map((node, idx) => {
          const NodeIcon = node.icon;
          return (
            <div key={idx} className="p-3 bg-[#0D1320] border border-white/5 rounded-xl text-center hover:border-[#A855F7]/20 transition-colors">
              <div className="mx-auto w-8 h-8 rounded-full bg-[#070B14] border border-white/5 flex items-center justify-center text-[#A855F7] mb-2 group-hover:scale-105 transition-transform">
                <NodeIcon size={16} />
              </div>
              <div className="text-[10px] text-white font-bold">{node.label}</div>
              <div className="text-[8px] font-mono text-slate-500 font-semibold mt-0.5">{node.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Custom Vector Graph of safe vs anomalous traffic */}
      <div className="mt-8 relative z-10 text-left">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">SAFE TRANSIT TRAFFIC TELEMETRY</span>
          <span className="text-[8px] font-mono text-[#00FFB2] font-black uppercase">AVERAGE LATENCY: 2.1ms</span>
        </div>

        {/* Render clean, responsive SVG lines representing traffic */}
        <div className="w-full h-32 bg-[#0D1320]/60 border border-white/5 rounded-xl p-3 flex flex-col justify-end overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#A855F7]/3 to-transparent pointer-events-none" />

          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Draw Area Fill */}
            <path
              d={`M 0 100 ${dataPoints.map((val, i) => `L ${(i / (dataPoints.length - 1)) * 100} ${100 - val}`).join(' ')} L 100 100 Z`}
              fill="url(#chartGlow)"
            />
            {/* Draw Core Path Line */}
            <path
              d={dataPoints.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (dataPoints.length - 1)) * 100} ${100 - val}`).join(' ')}
              fill="none"
              stroke="#A855F7"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Lowermost details */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-slate-500 relative z-10">
        <span className="flex items-center gap-1">
          <CheckCircle size={10} className="text-[#00FFB2]" />
          Infrastructure active audit: 0 faults
        </span>
        <span className="text-[#7C3AED] font-black">SECURE LAYER ACTIVE</span>
      </div>
    </motion.div>
  );
}

// 3. AI MONITORING / THREAT INTEL COMPONENT
function AIMonitoringVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#070B14] border border-[#A855F7]/20 overflow-hidden p-5 text-left flex flex-col justify-between group shadow-xl">
      {/* Laser scans */}
      <div className="absolute left-0 right-0 h-[1.5px] bg-[#A855F7]/50 animate-[scan_3.5s_ease-in-out_infinite] z-20 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 z-10 relative">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-[#A855F7] animate-pulse" />
          <span className="font-mono text-[9px] text-[#A855F7] font-black uppercase">THREAT INTELLIGENCE UI</span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
      </div>

      {/* Core Radial Scanning Graph */}
      <div className="my-4 flex items-center justify-center relative h-36">
        {/* Holographic Radar Circular UI */}
        <div className="w-28 h-28 border border-[#A855F7]/20 rounded-full flex items-center justify-center relative animate-pulse">
          <div className="w-20 h-20 border border-dashed border-[#A855F7]/10 rounded-full" />
          <div className="w-12 h-12 border border-[#7C3AED]/20 rounded-full" />
          {/* Radar sweeping hand */}
          <div className="absolute top-0 bottom-1/2 left-1/2 right-1/2 border-l border-gradient-to-b from-[#A855F7] to-transparent origin-bottom animate-[spin_4s_linear_infinite]" />
        </div>
        {/* Overlay values */}
        <div className="absolute font-mono text-[9px] text-white bg-[#0D1320] border border-white/5 px-2 py-1 rounded top-2 left-6">
          RISK FACTOR: <span className="text-[#00FFB2] font-black">LOW</span>
        </div>
        <div className="absolute font-mono text-[9px] text-[#FF3B5C] bg-[#0D1320] border border-[#FF3B5C]/20 px-2 py-1 rounded bottom-2 right-6">
          PROBES DEFIANT: 100%
        </div>
      </div>

      {/* Dynamic console scrolling trace */}
      <div className="bg-[#0D1320] border border-white/5 rounded-lg p-3 font-mono text-[10px] text-slate-400 space-y-1">
        <div className="flex justify-between">
          <span className="text-slate-500">&gt;_ sys.audit.intel:</span>
          <span className="text-[#00FFB2]">PASSED</span>
        </div>
        <p className="text-[9px] text-slate-300 truncate">
          Dynamic rule matrix matching 14,200 IOC signatures complete.
        </p>
      </div>
    </div>
  );
}

// 4. INCIDENT RESPONSE: WAR-ROOM AUTOMATIC QUARANTINE VISUAL
function IncidentResponseVisual() {
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAlert((prev) => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#070B14] border border-white/5 overflow-hidden p-5 text-left flex flex-col justify-between group shadow-xl transition-all duration-300 hover:border-[#FF3B5C]/30">

      {/* Danger light flash effect when alert state */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isAlert ? "bg-[#FF3B5C]/3 opacity-100" : "opacity-0"
          }`}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <ShieldAlert size={14} className={isAlert ? "text-[#FF3B5C] animate-bounce" : "text-slate-400"} />
          <span className="font-mono text-[9px] text-slate-300 font-extrabold uppercase">AUTO QUARANTINE INTERACTION</span>
        </div>
        <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-black ${isAlert
            ? "bg-[#FF3B5C]/10 border border-[#FF3B5C]/20 text-[#FF3B5C]"
            : "bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2]"
          }`}>
          {isAlert ? "CONTAINMENT ACTIVE" : "GUARD SYSTEM ARMED"}
        </span>
      </div>

      {/* Block quarantine enclaves representation */}
      <div className="my-4 space-y-3 relative z-10">
        {[
          { label: "Production API Gateway", secured: true },
          { label: "Postgres Database Server", secured: true },
          { label: "Authentication Microservices", secured: false }
        ].map((item, idx) => (
          <div key={idx} className="p-3 bg-[#0D1320] border border-white/5 rounded-xl flex items-center justify-between transition-colors">
            <span className="text-xs text-white font-medium">{item.label}</span>
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold">
              {item.secured || !isAlert ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
                  <span className="text-[#00FFB2]">SECURED</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B5C] animate-ping" />
                  <span className="text-[#FF3B5C]">ISOLATING VECTOR</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Status description logs */}
      <div className="pt-3 border-t border-white/5 font-mono text-[9px] text-slate-500 flex justify-between items-center relative z-10">
        <span>SLA RESPONSE INTERVAL: 12ms</span>
        <span className="text-slate-400 uppercase">SYS STACK GUARD V2</span>
      </div>
    </div>
  );
}

// 5. PRICING SECTION CLOUD BLUEPRINT BACKDROP
function PricingBgVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none z-0">
      <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 200 H1150 M50 400 H1150 M50 600 H1150" stroke="#A855F7" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="200" cy="200" r="12" stroke="#A855F7" strokeWidth="2" />
        <circle cx="600" cy="400" r="16" stroke="#7C3AED" strokeWidth="2" />
        <circle cx="1000" cy="600" r="12" stroke="#A855F7" strokeWidth="2" />
        <line x1="200" y1="200" x2="600" y2="400" stroke="#A855F7" strokeWidth="1.5" />
        <line x1="600" y1="400" x2="1000" y2="600" stroke="#7C3AED" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// 6. FINAL CTA: EDGE DEFEAT CORE METRIC MAP
function FinalCTAVisual() {
  return (
    <div className="relative w-full max-w-[450px] min-h-[320px] rounded-2xl bg-[#070B14]/90 border border-[#A855F7]/20 shadow-2xl p-6 text-left flex flex-col justify-between overflow-hidden group">

      {/* Concentric scan pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#A855F7]/10 animate-ping [animation-duration:5s]" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <Globe size={13} className="text-[#A855F7]" />
          <span className="font-mono text-[9px] text-[#A855F7] font-black uppercase">GLOBAL EDGE SHIELD PROTECT</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
      </div>

      {/* Map visualization */}
      <div className="my-6 flex justify-center items-center relative z-10">
        <svg width="100%" height="120" viewBox="0 0 300 120" className="opacity-70">
          <path d="M10 60 C80 20, 150 90, 220 30 C250 10, 270 40, 290 60" fill="none" stroke="#7C3AED" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M10 60 C80 80, 150 30, 220 90 C250 110, 270 80, 290 60" fill="none" stroke="#A855F7" strokeWidth="2" />
          {/* Signal points */}
          <circle cx="80" cy="50" r="5" fill="#A855F7" />
          <circle cx="150" cy="60" r="5" fill="#7C3AED" />
          <circle cx="220" cy="90" r="5" fill="#A855F7" />
        </svg>
        <div className="absolute font-mono text-[9px] text-white bg-[#0D1320] border border-white/5 px-2.5 py-1 rounded">
          EDGE FIREWALL STATUS: <span className="text-[#00FFB2] font-black">ACTIVE</span>
        </div>
      </div>

      {/* Lowermost */}
      <div className="pt-3 border-t border-white/5 font-mono text-[9px] text-slate-500 flex justify-between relative z-10">
        <span>GATEWAY PORTS: 100% LOCK</span>
        <span className="text-slate-400 font-bold uppercase">JEZTBRAIN SHIELD CORE</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 1. --- STICKY / FLOATING GRID BACKGROUND ---
// ----------------------------------------------------
function CyberGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(123, 47, 247, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(123, 47, 247, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Dynamic Radar/Pulse Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#A855F7]/5 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px] pointer-events-none" />
    </div>
  );
}

export default function StartupSecurity() {
  const [activeTab, setActiveTab] = useState('all');
  const [isAnnual, setIsAnnual] = useState(false);

  // Auto Scroll Reveal Helper State
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070B14] text-white selection:bg-[#A855F7]/30 selection:text-white font-sans overflow-x-hidden relative">
      <CyberGridBackground />

      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* --- CYBERSECURITY STATS SECTION --- */}
      <div ref={statsRef}>
        <StatsSection isVisible={statsVisible} />
      </div>

      {/* --- WHY STARTUPS NEED SECURITY --- */}
      <WhyStartupsSection />

      {/* --- SECURITY FEATURES GRID --- */}
      <FeaturesSection />

      {/* --- ENTERPRISE PROTECTION VISUAL CARDS --- */}
      <EnterpriseProtectionCards />

      {/* --- AI SECURITY WORKFLOW TIMELINE --- */}
      <WorkflowSection />

      {/* --- STARTUP PLANS / PRICING --- */}
      <PricingSection isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

      {/* --- INDUSTRIES WE PROTECT --- */}
      <IndustriesSection />

      {/* --- TRUST & TESTIMONIALS SLIDER --- */}
      <TestimonialsSection />

      {/* --- FAQ SECTION --- */}
      <FAQSection />

      {/* --- FINAL CTA SECTION --- */}
      <FinalCTASection />

      {/* --- PREMIUM FOOTER --- */}
      <FooterSection />
    </div>
  );
}

// ----------------------------------------------------
// 1. HERO SECTION
// ----------------------------------------------------
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden z-10">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center text-left">

        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 z-10"
        >
          {/* Neon Badging */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#A855F7]/10 to-[#7C3AED]/10 border border-[#A855F7]/20 shadow-[0_0_15px_rgba(123, 47, 247,0.05)]">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-ping" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#A855F7] font-black uppercase">
              STARTUP CYBERSECURITY DEFENSE
            </span>
          </div>

          {/* Main Title Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Enterprise-Level <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] via-[#D8B4FE] to-[#7C3AED] drop-shadow-[0_0_30px_rgba(123, 47, 247,0.2)]">
              Cybersecurity
            </span> <br />
            For Modern Startups
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-xl">
            Protect your startup infrastructure, cloud systems, APIs, and customer data with AI-powered offensive and defensive cybersecurity solutions. Scale securely from Day One.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#pricing"
              className="relative group overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-[#A855F7] to-purple-600 text-black px-8 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(123, 47, 247,0.45)] border border-[#A855F7]/30 active:scale-95 text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-slate-900 font-extrabold">
                Start Free Security Audit
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>

            <a
              href="#features"
              className="group inline-flex items-center justify-center bg-transparent border border-white/10 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 text-white px-8 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] active:scale-95 text-center"
            >
              Explore Solutions
            </a>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
            {[
              { text: "AI Monitoring" },
              { text: "Cloud Security" },
              { text: "24/7 Threat Detection" },
              { text: "Startup Protection" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 group">
                <div className="p-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/20 group-hover:scale-110 transition-all">
                  <Check size={10} className="stroke-[3]" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold group-hover:text-[#A855F7] transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE ANIMATED HOLOGRAPHIC STARTUP SOC */}
        <div className="relative flex justify-center items-center w-full z-10">
          <HeroCyberSOC />
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// 2. CYBERSECURITY STATS SECTION
// ----------------------------------------------------
function StatCard({ stat, idx, isVisible }) {
  const countValue = useAnimatedCounter(stat.value, 2000, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="relative group p-6 rounded-2xl bg-gradient-to-b from-[#0D1320]/60 to-[#070B14]/80 border border-white/5 hover:border-[#A855F7]/20 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(123, 47, 247,0.03)] overflow-hidden text-left"
    >
      {/* Accent glow corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#A855F7]/5 rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Counter & Number */}
      <div className="flex items-baseline gap-1 select-none">
        <span className="text-4xl md:text-5xl font-black font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
          {countValue}
        </span>
        <span className="text-2xl md:text-3xl font-black font-mono text-[#A855F7] drop-shadow-[0_0_8px_rgba(123, 47, 247,0.5)]">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="mt-4 text-sm font-mono tracking-wider font-extrabold uppercase text-[#A855F7] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
        {stat.label}
      </h3>

      {/* Description */}
      <p className="mt-2 text-xs text-[#A1A1AA] leading-normal font-medium">
        {stat.desc}
      </p>

      {/* Bottom line neon light trace */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#A855F7] to-[#7C3AED] w-0 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

function StatsSection({ isVisible }) {
  const stats = [
    { value: "73", suffix: "%", label: "Startups Face Cyber Threats", desc: "Small & medium enterprises target metrics." },
    { value: "24", suffix: "/7", label: "AI Threat Monitoring", desc: "Automated analysis, telemetry auditing." },
    { value: "99", suffix: ".9%", label: "Incident Uptime SLA", desc: "Zero-latency forensic threat containment." },
    { value: "300", suffix: "+", label: "Threat Intel Intelligence Rules", desc: "Continuous heuristic rule distribution." }
  ];

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
function WhyStartupsSection() {
  const [logs, setLogs] = useState([
    { id: 1, type: "API ABUSE", desc: "SQL injection payload detected on POST /v1/auth", ip: "104.244.76.12", time: "JUST NOW", status: "BLOCKED", sev: "9.8" },
    { id: 2, type: "MITM ATTACK", desc: "SSL renegotiation attempt flagged", ip: "85.203.47.19", time: "1 SEC AGO", status: "QUARANTINED", sev: "8.2" },
    { id: 3, type: "XSS DROPPER", desc: "Script payload detected in comment field", ip: "185.190.140.4", time: "3 SEC AGO", status: "CLEANED", sev: "6.5" },
    { id: 4, type: "DDOS STORM", desc: "Rate limit threshold breached (12,000 req/m)", ip: "45.138.89.200", time: "10 SEC AGO", status: "RATE-LIMITED", sev: "7.9" }
  ]);

  // Periodic Log Simulator
  useEffect(() => {
    const attackTypes = [
      { type: "RANSOMWARE", desc: "File entropy anomaly detected in /root/etc", status: "BLOCKED", sev: "9.9" },
      { type: "API LEAK", desc: "API token signature entropy audit failure", status: "QUARANTINED", sev: "8.8" },
      { type: "CSRF ATTACK", desc: "Referer validation failed on checkout trigger", status: "MITIGATED", sev: "7.1" },
      { type: "BOTNET POLL", desc: "Unauthorized scanning on port 22 SSH", status: "BLOCKED", sev: "5.4" }
    ];

    const interval = setInterval(() => {
      const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      const randomIp = `${Math.floor(Math.random() * 200 + 1)}.${Math.floor(Math.random() * 240 + 1)}.${Math.floor(Math.random() * 200 + 1)}.${Math.floor(Math.random() * 250 + 1)}`;

      setLogs((prevLogs) => {
        const updated = [
          {
            id: Date.now(),
            type: randomAttack.type,
            desc: randomAttack.desc,
            ip: randomIp,
            time: "JUST NOW",
            status: randomAttack.status,
            sev: randomAttack.sev
          },
          ...prevLogs.slice(0, 3)
        ];
        return updated.map((l, i) => {
          if (i > 0) {
            return { ...l, time: `${i * 4} SEC AGO` };
          }
          return l;
        });
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { title: "Protect APIs and SaaS Apps", desc: "Continuous signature auditing on client-facing endpoint APIs to prevent injection and authorization exploits." },
    { title: "Prevent Ransomware Attacks", desc: "AI-driven behavioral scanning of directory file structures blocks high-velocity payload encryption instantly." },
    { title: "Secure Customer Data", desc: "Strict end-to-end data encryption posture management mapping to dynamic threat quarantine protocols." },
    { title: "AI-powered Monitoring", desc: "Neural heuristic telemetry correlation running 24/7 without developer operational overhead." },
    { title: "Cloud Infrastructure Protection", desc: "Real-time auditing of multi-cloud Kubernetes runtimes, S3 bucket settings, and IAM credentials." },
    { title: "Startup-focused Security Architecture", desc: "Scale defensibility dynamically from early-stage MVPs to robust enterprise rounds, with SOC2 audit-readiness in days." }
  ];

  return (
    <section className="relative py-24 bg-[#0D1320]/40 z-10 border-t border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT COLUMN: ACTIVE SAAS BLUEPRINT VISUAL */}
        <SaaSWorkspaceVisual />

        {/* RIGHT COLUMN: REASONS & DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-8 text-left"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20">
              <ShieldCheck size={14} className="text-[#7C3AED]" />
              <span className="text-[10px] font-mono tracking-widest text-[#7C3AED] font-black uppercase">
                WHY JESTBRAIN
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Cybersecurity Built For <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-purple-500">
                Fast-Growing Companies
              </span>
            </h2>
            <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
              Cyberattackers target startups because they assume rapid growth leaves gaps in security systems. JeztBrain secures your stack so you can build with full investor confidence.
            </p>
          </div>

          {/* Checklist Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="space-y-2 p-4 rounded-xl bg-white/3 hover:bg-white/5 border border-white/5 hover:border-slate-800 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/20 shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-normal font-medium pl-8">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 4. SECURITY FEATURES SECTION
// ----------------------------------------------------
function FeaturesSection() {
  const features = [
    {
      title: "AI Threat Monitoring",
      icon: Brain,
      color: "#A855F7",
      desc: "Real-time machine learning telemetry tracks system event hierarchies to predict and quarantine anomalies."
    },
    {
      title: "Cloud Security",
      icon: Server,
      color: "#7C3AED",
      desc: "Multi-cloud architecture protection auditing across AWS, GCP, and Azure including container clusters."
    },
    {
      title: "Penetration Testing",
      icon: Terminal,
      color: "#A855F7",
      desc: "Continuous white-box and black-box offensive operations simulated by JeztBrain's elite hacker networks."
    },
    {
      title: "Vulnerability Assessment",
      icon: ShieldAlert,
      color: "#FF3B5C",
      desc: "Instant assessment checks validating libraries, dependencies, databases, and exposed infrastructure ports."
    },
    {
      title: "Endpoint Protection",
      icon: Cpu,
      color: "#7C3AED",
      desc: "Advanced terminal telemetry guarding servers, APIs, SaaS databases, and engineer workstations."
    },
    {
      title: "Incident Response",
      icon: Activity,
      color: "#A855F7",
      desc: "15-minute guaranteed SLA containment protocol deploying automated locks on identified attack vectors."
    },
    {
      title: "Threat Intelligence",
      icon: Globe,
      color: "#7C3AED",
      desc: "Continuous database downloads mapping global emerging ransomware footprints, indicators, and signatures."
    },
    {
      title: "Red Team Operations",
      icon: ShieldCheck,
      color: "#FF3B5C",
      desc: "Full threat scenarios simulated to test engineering awareness, access routes, policies, and firewalls."
    }
  ];

  return (
    <section id="features" className="relative py-28 z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">

        {/* Title Group */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-[10px] font-mono tracking-widest text-[#A855F7] font-black uppercase">
              DEFENSIVE SERVICES
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Advanced Security Features
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
            High-tech protection designed for modern startups, combining proactive automated defensive mechanisms with robust offensive capabilities.
          </p>
        </div>

        {/* Features Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group rounded-2xl bg-gradient-to-b from-[#0D1320]/80 to-[#070B14]/90 p-8 border border-white/5 hover:border-[#A855F7]/30 transition-all duration-500 flex flex-col justify-between items-start text-left hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(123, 47, 247,0.05)] overflow-hidden min-h-[280px]"
              >
                {/* Dynamic Radial Glow inside the card on hover */}
                <div
                  className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[40px] pointer-events-none rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`
                  }}
                />

                {/* Animated Top Right Corner Pulsing Dot */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: feature.color }} />
                </div>

                <div className="space-y-4 z-10 w-full">
                  {/* Glowing Icon Enclosure */}
                  <div
                    className="p-3 rounded-xl border border-white/5 bg-[#070B14] inline-flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      boxShadow: `0 0 20px ${feature.color}05`,
                    }}
                  >
                    <Icon size={24} style={{ color: feature.color }} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom interactive action link */}
                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#A855F7] transition-all z-10 self-end">
                  <span>Learn More</span>
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Animated Border Sweep Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 5. ENTERPRISE PROTECTION CARDS (AI THREAT DEV INTERFACE)
// ----------------------------------------------------
function EnterpriseProtectionCards() {
  const [selectedProtocol, setSelectedProtocol] = useState(0);

  const protocols = [
    {
      title: "API GATEWAY HARDENING",
      code: "PROTECT_GATEWAY_V1",
      stats: { reqs: "14.2M/day", blocked: "4,189", status: "STABLE", latency: "2.4ms" },
      log: "[API SCANNERS]: Active audit complete. All endpoints mapped to zero-trust signature matrices. 0 exploits reported."
    },
    {
      title: "KUBERNETES SECURE RUNTIME",
      code: "K8S_SHIELD_DAEMON",
      stats: { reqs: "389 containers", blocked: "12 nodes", status: "HEALTHY", latency: "0.8ms" },
      log: "[CLOUD SCOUT]: Active cluster sweep detected 1 container with vulnerable image tag. Automatic security patching applied."
    },
    {
      title: "DATABASE ENTROPY GUARD",
      code: "DB_LOCK_HEURISTICS",
      stats: { reqs: "1,204 transactions/s", blocked: "0 leaks", status: "SECURE", latency: "1.1ms" },
      log: "[DATABASE MONITOR]: Query signature analyzer operating at 100% efficiency. Heuristic prevention database locked."
    }
  ];

  return (
    <section className="relative py-20 bg-[#0D1320]/20 border-t border-b border-white/5 z-10">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">

        {/* LEFT COLUMN: DESCRIPTION */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20">
            <Radio size={12} className="text-[#7C3AED] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#7C3AED] font-black uppercase">
              ACTIVE ENCLAVES
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Comprehensive Defense Across <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-purple-500">
              Your Entire Stack
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
            JeztBrain acts as a fully automated security engineer working 24/7. Deploy cryptographic protection across APIs, databases, servers, and multi-tenant containers in minutes.
          </p>

          {/* Mini Interactive Options Tabs */}
          <div className="space-y-3 pt-4">
            {protocols.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedProtocol(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${selectedProtocol === idx
                    ? "bg-[#0D1320] border-[#A855F7] shadow-[0_0_15px_rgba(123, 47, 247,0.08)]"
                    : "bg-transparent border-white/5 hover:border-slate-800"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${selectedProtocol === idx ? "bg-[#A855F7] animate-pulse" : "bg-slate-600"}`} />
                  <span className={`font-mono text-xs font-black tracking-wider ${selectedProtocol === idx ? "text-white" : "text-slate-400"}`}>
                    {p.title}
                  </span>
                </div>
                <ChevronRight size={14} className={selectedProtocol === idx ? "text-[#A855F7]" : "text-slate-600"} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CYBER WAR ROOM DYNAMIC INTERACTIVE VISUAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <AIMonitoringVisual />
          <IncidentResponseVisual />
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 6. AI SECURITY WORKFLOW
// ----------------------------------------------------
function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "Endpoint Telemetry",
      desc: "Instantly logs operating systems, application layers, networks, and environment variables."
    },
    {
      step: "02",
      title: "Data Collection",
      desc: "Transports structured raw telemetry metadata through highly secure, encrypted transport lanes."
    },
    {
      step: "03",
      title: "AI Threat Analysis",
      desc: "Neural network parsing cross-references processes against dynamic behavioral model templates."
    },
    {
      step: "04",
      title: "Correlation Engine",
      desc: "Maps system warnings, identifying linked network anomalies, ports, and threat sequences."
    },
    {
      step: "05",
      title: "Analyst Verification",
      desc: "Elite SOC security controllers review extreme risk incidents to bypass system false-positives."
    },
    {
      step: "06",
      title: "Automated Incident Response",
      desc: "Fires rapid firewalls, API token locks, and server quarantines to isolate and neutralize threats."
    }
  ];

  return (
    <section className="relative py-28 z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">

        {/* Title */}
        <div className="max-w-2xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20">
            <Brain size={14} className="text-[#7C3AED]" />
            <span className="text-[10px] font-mono tracking-widest text-[#7C3AED] font-black uppercase">
              THREAT WORKFLOW PIPELINE
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            AI Security Operations Workflow
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
            From initial metadata discovery to automatic threat quarantine. Watch our 6-stage security machine protect your infrastructure.
          </p>
        </div>

        {/* Timeline Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">

          {/* Connector Line (Desktop Only) */}
          <div className="absolute top-[35px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#A855F7]/20 via-[#7C3AED]/40 to-[#A855F7]/20 hidden lg:block pointer-events-none z-0">
            {/* Animated Laser Dot Sweeper */}
            <div className="h-full bg-gradient-to-r from-transparent via-[#A855F7] to-transparent w-40 animate-[marquee_5s_linear_infinite]" />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex flex-col items-center text-center group z-10"
            >
              {/* Number Circle Node */}
              <div
                className="w-16 h-16 rounded-full bg-[#070B14] border-2 border-[#A855F7]/30 group-hover:border-[#A855F7] flex items-center justify-center font-mono font-black text-base transition-all duration-300 relative shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10 group-hover:shadow-[0_0_25px_rgba(123, 47, 247,0.25)] group-hover:scale-105"
                style={{
                  color: idx % 2 === 0 ? "#A855F7" : "#7C3AED",
                  borderColor: idx % 2 === 0 ? "rgba(123, 47, 247, 0.3)" : "rgba(124, 58, 237, 0.3)"
                }}
              >
                {step.step}
                <div
                  className="absolute inset-0 rounded-full border border-dashed border-transparent group-hover:border-slate-500 animate-spin [animation-duration:15s]"
                  style={{ margin: '-4px' }}
                />
              </div>

              {/* Title & Content */}
              <h3 className="mt-6 text-sm font-bold text-white tracking-wide group-hover:text-[#A855F7] transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-[11px] text-[#A1A1AA] leading-normal font-semibold max-w-[180px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 7. PRICING / STARTUP PLANS
// ----------------------------------------------------
function PricingSection({ isAnnual, setIsAnnual }) {
  const plans = [
    {
      name: "Startup Shield",
      priceMonthly: 4999,
      desc: "Essential cybersecurity for pre-seed startups, small teams, and emerging SaaS MVPs.",
      badge: null,
      features: [
        { active: true, text: "AI Threat Monitoring (24/7)" },
        { active: true, text: "Cloud Security posture scan" },
        { active: true, text: "Endpoint Protection (10 users)" },
        { active: false, text: "Automated Incident Response" },
        { active: false, text: "Vulnerability Assessments" },
        { active: false, text: "API Penetration Testing" }
      ],
      glow: "border-white/5",
      btnText: "Start Free Audit",
      btnStyle: "bg-white/5 text-white hover:bg-white/10 hover:border-slate-700"
    },
    {
      name: "Growth Defense",
      priceMonthly: 12999,
      desc: "Complete, production-ready system compliance for high-velocity venture startups.",
      badge: "MOST POPULAR",
      features: [
        { active: true, text: "AI Threat Monitoring (24/7)" },
        { active: true, text: "Cloud Security posture scan" },
        { active: true, text: "Endpoint Protection (50 users)" },
        { active: true, text: "Automated Incident Response (30m)" },
        { active: true, text: "Vulnerability Assessments (Monthly)" },
        { active: false, text: "API Penetration Testing" }
      ],
      glow: "border-[#A855F7] shadow-[0_0_35px_rgba(123, 47, 247,0.15)]",
      btnText: "Secure My Growth Stack",
      btnStyle: "bg-gradient-to-r from-[#A855F7] to-purple-600 text-black hover:shadow-[0_0_30px_rgba(123, 47, 247,0.45)] hover:scale-102"
    },
    {
      name: "Enterprise AI Security",
      priceMonthly: "Custom",
      desc: "Robust customized defensive controls for corporate platforms, scale-ups, and fintech enclaves.",
      badge: "GOVERNMENT RATED",
      features: [
        { active: true, text: "AI Threat Monitoring (24/7)" },
        { active: true, text: "Cloud Security posture scan" },
        { active: true, text: "Endpoint Protection (Unlimited)" },
        { active: true, text: "Automated Incident Response (10m SLA)" },
        { active: true, text: "Vulnerability Assessments (Weekly)" },
        { active: true, text: "Dedicated API Penetration Testing & SOC2 Auditing" }
      ],
      glow: "border-[#7C3AED]/60 shadow-[0_0_30px_rgba(124,58,237,0.15)]",
      btnText: "Talk To Security Expert",
      btnStyle: "bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-102"
    }
  ];

  return (
    <section id="pricing" className="relative py-28 bg-[#0D1320]/20 border-t border-b border-white/5 z-10">
      {/* Cloud Nodes Blueprint Backdrop */}
      <PricingBgVisual />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">

        {/* Title */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-[10px] font-mono tracking-widest text-[#A855F7] font-black uppercase">
              PRICING MODULE
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            JeztBrain Startup Plans
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
            Scale-friendly packages engineered to match startup trajectories, providing complete defense posture reporting.
          </p>

          {/* Toggle Monthly vs Annual (20% Off) */}
          <div className="pt-6 flex justify-center items-center gap-4 select-none">
            <span className={`text-xs font-mono font-bold uppercase transition-colors ${!isAnnual ? "text-[#A855F7]" : "text-slate-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-[#070B14] border border-white/10 p-0.5 relative flex items-center transition-all focus:outline-none"
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-gradient-to-r from-[#A855F7] to-purple-600 transition-all ${isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
              />
            </button>
            <span className={`text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 ${isAnnual ? "text-[#A855F7]" : "text-slate-400"}`}>
              Annually
              <span className="px-2 py-0.5 rounded bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] text-[9px] font-black">
                -20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-[1200px] mx-auto">
          {plans.map((plan, idx) => {
            let displayPrice = plan.priceMonthly;
            if (typeof displayPrice === "number") {
              const finalPrice = isAnnual ? displayPrice * 0.8 : displayPrice;
              displayPrice = `₹${Math.round(finalPrice).toLocaleString()}`;
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative rounded-2xl bg-[#070B14]/80 p-8 border hover:border-slate-700 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden ${plan.glow}`}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A855F7] to-[#7C3AED]" />

                <div>
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono text-[8px] font-black tracking-widest uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#A855F7] animate-pulse" />
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-xl font-extrabold text-white tracking-wide">
                    {plan.name}
                  </h3>

                  {/* Pricing Details */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black font-mono tracking-tight text-white select-none">
                      {displayPrice}
                    </span>
                    {typeof plan.priceMonthly === "number" && (
                      <span className="text-xs font-mono text-[#A1A1AA] font-bold">
                        /month
                      </span>
                    )}
                  </div>

                  {isAnnual && typeof plan.priceMonthly === "number" && (
                    <p className="text-[10px] font-mono text-[#00FFB2] mt-1 uppercase font-bold select-none">
                      Billed annually (Save {(plan.priceMonthly * 12 * 0.2).toLocaleString()} / year)
                    </p>
                  )}

                  {/* Desc */}
                  <p className="mt-4 text-xs text-[#A1A1AA] leading-normal font-medium border-b border-white/5 pb-6">
                    {plan.desc}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className={`flex items-start gap-3 text-xs leading-normal font-medium ${feature.active ? "text-slate-300" : "text-slate-600 line-through"}`}>
                        <div className={`mt-0.5 p-0.5 rounded-full border shrink-0 ${feature.active
                            ? "bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/20"
                            : "bg-transparent text-slate-700 border-slate-800"
                          }`}>
                          <Check size={10} className="stroke-[3]" />
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className={`w-full py-4 px-4 rounded-xl border border-white/10 font-bold font-mono text-[10px] uppercase tracking-widest text-center transition-all duration-300 block select-none ${plan.btnStyle}`}
                  >
                    {plan.btnText}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 8. INDUSTRIES WE PROTECT
// ----------------------------------------------------
function IndustriesSection() {
  const industries = [
    { title: "SaaS Platforms", desc: "Multi-tenant workspace isolation auditing, session token tracking, and security headers assessment.", icon: Database, color: "#A855F7" },
    { title: "FinTech", desc: "Rigorous PCI-DSS compliant telemetry checks, cryptographic key logs, and trading network hardening.", icon: Shield, color: "#7C3AED" },
    { title: "Healthcare", desc: "HIPAA compatible patient record enclaves, private database telemetry, and authorization protocols.", icon: Activity, color: "#FF3B5C" },
    { title: "E-Commerce", desc: "Secure checkout pipeline verification, bot protection, and high-velocity transaction fraud scanning.", icon: Zap, color: "#A855F7" },
    { title: "AI Companies", desc: "Auditing model parameters extraction, neural API injection protection, and data sanitization.", icon: Brain, color: "#7C3AED" },
    { title: "Gov Contractors", desc: "Ensuring NIST 800-171 system regulations compliance, secure air-gapped endpoints, and policies.", icon: FileText, color: "#FF3B5C" },
    { title: "Cloud Providers", desc: "Continuous Kubernetes node inspection, S3 configurations auditing, and micro-segmentation.", icon: Server, color: "#A855F7" },
    { title: "Edu Platforms", desc: "Securing research databases, student credentials storage protection, and scalable network access.", icon: Globe, color: "#7C3AED" }
  ];

  return (
    <section className="relative py-28 z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">

        {/* Title */}
        <div className="max-w-2xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
            <span className="text-[10px] font-mono tracking-widest text-[#7C3AED] font-black uppercase">
              PROTECTED VERTICALS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Industries We Protect
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
            From regulated financial platforms to high-growth SaaS tools, we deliver customized security configurations.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group p-6 rounded-2xl bg-gradient-to-b from-[#0D1320]/60 to-[#070B14]/80 border border-white/5 hover:border-slate-800 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(124,58,237,0.02)] text-left flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Subtle Glow Corner */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                  style={{ background: ind.color }}
                />

                <div className="space-y-4">
                  {/* Icon */}
                  <div className="p-2.5 rounded-xl border border-white/5 bg-[#070B14] inline-flex text-slate-400 group-hover:text-white group-hover:border-[#A855F7]/20 transition-all">
                    <Icon size={20} style={{ color: ind.color }} className="drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]" />
                  </div>

                  <h3 className="text-base font-extrabold text-white tracking-wide">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-medium">
                    {ind.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-500" style={{ backgroundColor: ind.color }} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 9. TRUST & TESTIMONIALS SECTION
// ----------------------------------------------------
function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "JeztBrain locked down our API gateway and container architectures within 48 hours. Our Series A institutional investors specifically praised our security audit logs, which saved our compliance round.",
      author: "Nikita Varma",
      role: "CTO, CloudHelix SaaS",
      avatar: "NV",
      rating: 5
    },
    {
      quote: "Before JeztBrain, we were hit by continuous automated DDoS and SQL injection probes. Deploying their AI security layer eliminated 100% of these incidents without adding latency to our customer checkouts.",
      author: "Vikram Malhotra",
      role: "Founder & CEO, ApexFin Systems",
      avatar: "VM",
      rating: 5
    },
    {
      quote: "As a HIPAA-regulated healthcare platform, vulnerability audits are a weekly stressor. JeztBrain's automated threat scanner and compliance portal gave us back 20 engineer hours a week.",
      author: "Dr. Ananya Ray",
      role: "VP of Security Operations, BioHeal Labs",
      avatar: "AR",
      rating: 5
    }
  ];

  // Auto Slider Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const logos = [
    { name: "AetherSaaS" },
    { name: "ApexFin" },
    { name: "HelixBio" },
    { name: "CyberNet" },
    { name: "SentryK8s" }
  ];

  return (
    <section className="relative py-28 bg-[#0D1320]/20 border-t border-b border-white/5 z-10 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center relative">

        {/* Title */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-[10px] font-mono tracking-widest text-[#A855F7] font-black uppercase">
              TRUST ENCLAVE
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Trusted By Modern Startups
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex justify-center items-center gap-1 text-yellow-400">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <blockquote className="text-base md:text-xl text-slate-200 italic leading-relaxed max-w-3xl mx-auto font-medium">
                "{reviews[activeIndex].quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center font-mono font-black text-xs text-[#7C3AED]">
                  {reviews[activeIndex].avatar}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {reviews[activeIndex].author}
                  </h4>
                  <p className="text-[11px] font-mono text-[#A855F7] font-bold uppercase mt-0.5">
                    {reviews[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Indicator Bullets */}
        <div className="flex justify-center items-center gap-2.5 mt-8 select-none">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${activeIndex === i ? "bg-[#A855F7] w-6" : "bg-slate-700"
                }`}
            />
          ))}
        </div>

        {/* Trust logos */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <p className="text-[9px] font-mono text-slate-500 font-black tracking-[0.25em] uppercase mb-8">PROTECTED STARTUP NETWORKS</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-40">
            {logos.map((logo, idx) => (
              <div key={idx} className="font-mono text-xs font-black tracking-widest text-white hover:opacity-100 transition-opacity cursor-pointer">
                &lt; {logo.name} /&gt;
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 10. FAQ SECTION
// ----------------------------------------------------
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Why do startups need specialized cybersecurity?",
      a: "Standard generic firewalls do not cover modern API endpoints, microservices, and rapidly changing cloud infrastructure. Modern hackers target startups specifically, assuming rapid shipping cycles result in database configurations, insecure keys, or access holes. JeztBrain delivers enterprise-level posture sweeps built to keep pace with rapid deployment schedules."
    },
    {
      q: "How does AI threat monitoring work?",
      a: "Our AI model analyzes system telemetry (system calls, directory activities, server requests) programmatically in real-time. Instead of looking purely at static static signatures, the neural engine maps normal operational behavioral templates and instantly quarantines processes that diverge into anomaly ranges."
    },
    {
      q: "Do you provide penetration testing?",
      a: "Yes! In addition to continuous scanning, our enterprise packages deliver active manual API penetration testing and simulated Red Team network campaigns performed by ethical compliance specialists."
    },
    {
      q: "Is cloud security posture compliance included?",
      a: "Yes. Our cloud monitor automatically audits Kubernetes container namespaces, public S3 bucket directories, SSH entry gateways, and IAM role settings daily, mapping results to your dashboard."
    },
    {
      q: "Can JeztBrain protect proprietary SaaS platforms?",
      a: "Absolutely. JeztBrain secures multi-tenant databases, secures proprietary AI training pipelines, locks down microservice endpoints, and guarantees SOC2 / PCI-DSS compliance readiness files."
    },
    {
      q: "Do you support enterprise scaling later?",
      a: "Yes, our architecture integrates with multi-cloud enclaves. As you scale, raise seed rounds, or enter regulated corporate operations, you can upgrade your plan or configure dedicated SOC controllers instantly."
    }
  ];

  return (
    <section className="relative py-28 z-10">
      <div className="max-w-[850px] mx-auto px-6 md:px-12 text-center">

        {/* Title */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-[10px] font-mono tracking-widest text-[#A855F7] font-black uppercase">
              ANSWERS ENCLAVE
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0D1320]/60 border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-white hover:text-[#A855F7] focus:outline-none transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500 font-bold">{(idx + 1).toString().padStart(2, '0')}.</span>
                    {faq.q}
                  </span>
                  <div className={`p-1 rounded bg-white/5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#A855F7]" : ""}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#A1A1AA] leading-relaxed font-medium pl-10 border-t border-white/3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 11. FINAL CTA SECTION
// ----------------------------------------------------
function FinalCTASection() {
  return (
    <section id="contact" className="relative py-32 z-10 overflow-hidden border-t border-white/5">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(123, 47, 247, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(123, 47, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] rounded-full border border-[#A855F7]/5 animate-ping [animation-duration:6s] opacity-35" />
        <div className="w-[300px] h-[300px] rounded-full border border-[#7C3AED]/10 animate-ping [animation-duration:3s] opacity-25" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left relative z-10">

        {/* LEFT COLUMN: CALL TO ACTION TEXT */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF3B5C]/10 to-[#7C3AED]/10 border border-[#FF3B5C]/20 shadow-[0_0_15px_rgba(255,59,92,0.05)]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B5C] animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-[#FF3B5C] font-black uppercase">
              SECURE YOUR STACK TODAY
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Secure Your Startup Before <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-purple-500">
              Attackers Find You
            </span>
          </h2>

          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed max-w-xl font-medium">
            Deploy AI-powered cybersecurity protection across your databases, APIs, and cloud microservices in minutes. Start free, scale securely.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 max-w-md">
            <button
              onClick={() => alert("Initiating Free Threat Posture Assessment...")}
              className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-[#A855F7] to-purple-600 text-black px-8 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(123, 47, 247,0.45)] border border-[#A855F7]/30 active:scale-95 text-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-slate-900 font-extrabold">
                Start Free Assessment
                <ArrowRight size={14} />
              </span>
            </button>

            <button
              onClick={() => alert("Connecting with Cybersecurity Operations...")}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/10 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 text-white px-8 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] active:scale-95 text-center cursor-pointer"
            >
              Talk To Security Expert
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE EDGE CONTROLS HOLOGRAM */}
        <div className="flex justify-center items-center w-full">
          <FinalCTAVisual />
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 12. FOOTER
// ----------------------------------------------------
function FooterSection() {
  const links = [
    {
      title: "Solutions",
      items: [
        { name: "AI Threat Monitoring", href: "#features" },
        { name: "Cloud Posture Guard", href: "#features" },
        { name: "Endpoint Protection", href: "#features" },
        { name: "API Gateway Hardening", href: "#features" }
      ]
    },
    {
      title: "Technologies",
      items: [
        { name: "Neural Threat Engines", href: "#" },
        { name: "Zero-Day Signatures", href: "#" },
        { name: "Kubernetes Daemons", href: "#" },
        { name: "Encrypted Telemetry", href: "#" }
      ]
    },
    {
      title: "Industries",
      items: [
        { name: "SaaS Platforms", href: "#" },
        { name: "FinTech Compliance", href: "#" },
        { name: "Biomedical Systems", href: "#" },
        { name: "Regulated Contractors", href: "#" }
      ]
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "#" },
        { name: "Incident Response", href: "#" },
        { name: "Threat Reports", href: "#" },
        { name: "Contact Operations", href: "#" }
      ]
    }
  ];

  return (
    <footer className="relative py-16 bg-[#070B14] border-t border-white/5 z-10 text-left">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3 group relative self-start inline-flex">
            <div className="absolute -inset-2 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-fuchsia-500/10 via-[#0A0F1F] to-purple-600/10 p-2 rounded-xl border border-[#A855F7]/30 shadow-[0_0_15px_rgba(123, 47, 247,0.2)] flex items-center justify-center">
              <Shield className="text-[#A855F7] h-5 w-5 drop-shadow-[0_0_10px_rgba(123, 47, 247,0.8)] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight flex items-center">
                <span className="text-white">Jezt</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-purple-500 font-extrabold ml-0.5">Brain</span>
              </span>
            </div>
          </Link>

          <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-[240px]">
            Proactive corporate-grade AI protection protecting infrastructure and data pipelines for venture-backed digital organizations.
          </p>

          {/* Active status pulse */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0D1320] border border-white/5 font-mono text-[9px] text-[#00FFB2] font-black uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-pulse" />
            All Defensive Systems Operational
          </div>
        </div>

        {/* Links Columns */}
        {links.map((col, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="font-mono text-[10px] font-black text-white tracking-[0.2em] uppercase">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.items.map((item, iidx) => (
                <li key={iidx}>
                  <a
                    href={item.href}
                    className="text-xs text-[#A1A1AA] hover:text-[#A855F7] transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-slate-500">
        <p>&copy; 2026 JEZTBRAIN CYBERSECURITY. ALL RIGHTS RESERVED PROTECTING HOSTS.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">SECURITY POLICY</a>
          <a href="#" className="hover:text-white transition-colors">COMPLIANCE CERTIFICATION</a>
          <a href="#" className="hover:text-white transition-colors">SERVICE SLA</a>
        </div>
      </div>
    </footer>
  );
}

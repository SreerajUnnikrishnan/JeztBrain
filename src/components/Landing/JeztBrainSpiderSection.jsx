import React, { useState } from 'react';
import { Shield, GitMerge, Cpu, Radio, Activity, CheckCircle, Zap } from 'lucide-react';

export default function JeztBrainSpiderSection() {
  const capabilities = [
    {
      index: "01",
      icon: GitMerge,
      name: "Threat Correlation",
      desc: "Connects related security events across endpoints to reveal complete attack graphs.",
      badge: "CORRELATION ENGINE",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100"
    },
    {
      index: "02",
      icon: Cpu,
      name: "AI Analysis",
      desc: "Detects stealthy suspicious behavior using heuristic neural analysis.",
      badge: "NEURAL NETWORK",
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-100"
    },
    {
      index: "03",
      icon: Radio,
      name: "Real-Time Intelligence",
      desc: "Continuously monitors global threat feeds and updates telemetry data.",
      badge: "LIVE TELEMETRY",
      color: "text-cyan-600",
      bg: "bg-cyan-50 border-cyan-100"
    },
    {
      index: "04",
      icon: Shield,
      name: "Expert Support",
      desc: "Provides actionable triage insights for faster expert incident response.",
      badge: "ANALYST ACTION",
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100"
    },
    {
      index: "05",
      icon: Activity,
      name: "Security Analytics",
      desc: "Transforms raw telemetry data into meaningful executive security intelligence.",
      badge: "BIG DATA PIPELINES",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100"
    }
  ];

  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="relative w-full bg-white text-slate-900 py-24 md:py-32 font-sans border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-blue-100/40 via-purple-100/30 to-transparent blur-3xl opacity-60" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-20 w-full flex flex-col items-center text-center space-y-16">
        
        {/* Header Block (Centered) */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-mono font-bold tracking-wider uppercase border border-purple-200">
            THE CORE INTELLIGENCE ENGINE
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Meet JeztBrainSpider<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
              The Brain Behind Every Decision.
            </span>
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            A powerful AI-driven cybersecurity engine that continuously analyzes threats, correlates attack patterns, and supports security experts with real-time intelligence.
          </p>
        </div>

        {/* Capabilities Grid (5 Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all text-left space-y-4 ${
                  isHovered ? 'border-purple-300 -translate-y-1' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cap.bg}`}>
                    <Icon size={20} className={cap.color} />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{cap.index}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900">{cap.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{cap.desc}</p>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 inline-block">
                    {cap.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Data Stream Status Bar */}
        <div className="w-full max-w-4xl p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <CheckCircle size={16} className="text-emerald-500" />
            <span>JeztBrainSpider Intelligence Core Active</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Zap size={14} className="text-blue-600 animate-pulse" />
            <span>100% System Operational</span>
          </div>
        </div>

      </div>
    </section>
  );
}

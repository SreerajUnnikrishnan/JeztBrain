import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Users, Eye, Zap, Shield, Link, Database, GitMerge } from 'lucide-react';

export default function AiTechnologyShowcase() {
  const components = [
    { name: "Artificial Intelligence", desc: "Supervised sequence models capturing multi-layered anomalous signals.", icon: Brain, color: "text-blue-500", bg: "bg-blue-500/10", border: "hover:border-blue-500/30" },
    { name: "Automation Playbooks", desc: "Instantly executing quarantines, token revocation, and asset isolation.", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10", border: "hover:border-orange-500/30" },
    { name: "Expert Collaboration", desc: "Connecting verified incident commanders directly to system alerts.", icon: Users, color: "text-green-500", bg: "bg-green-500/10", border: "hover:border-green-500/30" },
    { name: "Threat Intelligence", desc: "Dynamic infrastructure scans fed continuously by JeztBrainSpider.", icon: Eye, color: "text-purple-500", bg: "bg-purple-500/10", border: "hover:border-purple-500/30" },
    { name: "Detection Engine", desc: "Low-latency packet inspection audits operating at the gateway.", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10", border: "hover:border-blue-500/30" },
    { name: "Behavior Analytics", desc: "Auditing host-based process telemetry to isolate silent execution hooks.", icon: Cpu, color: "text-orange-500", bg: "bg-orange-500/10", border: "hover:border-orange-500/30" },
    { name: "Incident Correlation", desc: "Graph database mapping that links minor signals into verified alerts.", icon: GitMerge, color: "text-purple-500", bg: "bg-purple-500/10", border: "hover:border-purple-500/30" },
    { name: "Digital Evidence", desc: "Immutable storage pipelines validating indicators for law compliance.", icon: Database, color: "text-green-500", bg: "bg-green-500/10", border: "hover:border-green-500/30" },
    { name: "Response Automation", desc: "Automated API dispatch that deploys containment scripts locally.", icon: Link, color: "text-orange-500", bg: "bg-orange-500/10", border: "hover:border-orange-500/30" }
  ];

  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section id="technology" className="relative w-full min-h-[850px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-[#F9FAFB]">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/showcase_servers.png"
          alt="JeztBrain secure AI infrastructure laboratory"
          className="w-full h-full object-cover object-center brightness-95"
        />
        {/* White and Purple theme gradient overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-purple-50/20 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-mono font-bold tracking-wider uppercase border border-purple-200">
            Defense Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            JeztBrain Technology.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-blue-600">
              Autonomous Defensive Architecture.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Our platform relies on a multi-layered security stack combining autonomous discovery, machine learning modeling, and certified handler response workflows.
          </p>
        </div>

        {/* Dynamic Architecture Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">

          {/* Left Grid: Features list (Multi-color borders and background tags) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {components.map((comp, idx) => {
              const Icon = comp.icon;
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 bg-white/70 backdrop-blur-xl ${isHovered
                    ? "bg-white border-purple-500 shadow-[0_15px_30px_rgba(108,77,255,0.08)] scale-[1.02]"
                    : `border-slate-200 ${comp.border}`
                    }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isHovered ? "bg-purple-600 text-white" : `${comp.bg} ${comp.color}`
                      }`}>
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-black text-slate-950 uppercase tracking-wide font-space-grotesk leading-tight">
                        {comp.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 leading-normal font-light">
                        {comp.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Centered floating brain asset with detail details panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">

            {/* Holographic central brain asset display */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-3xl shadow-sm flex items-center justify-center flex-1 relative overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-36 h-36 relative z-10 flex items-center justify-center"
              >
                <img
                  src="/images/shield_brain.png"
                  alt="Holographic brain defense shield asset"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(108,77,255,0.3)]"
                />
              </motion.div>
            </div>

            {/* Spec details card (Vibrantly lights up) */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  Technology Details
                </span>

                <h3 className="text-xl font-black text-slate-900 font-space-grotesk tracking-tight uppercase">
                  {components[hoveredIdx].name}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-light font-sans">
                  {components[hoveredIdx].desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between text-xs font-mono">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Scope</span>
                  <p className="font-bold text-slate-700 mt-0.5">Distributed Nodes</p>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">System Status</span>
                  <p className="font-bold text-purple-600 mt-0.5">Audited & Active</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

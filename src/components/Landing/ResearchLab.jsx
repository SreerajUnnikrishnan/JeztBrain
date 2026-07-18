import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, LineChart, FileCode2 } from 'lucide-react';

export default function ResearchLab() {
  const pillars = [
    {
      title: "Threat Research",
      desc: "Profiling advanced persistent threat groups (APTs) and hunting active indicators of compromise (IOCs) across the global dark web.",
      icon: Search,
      metrics: "50+ Active APT Trackers",
      theme: "purple",
      color: "text-purple-600",
      border: "border-purple-500/30",
      glow: "shadow-[0_15px_30px_rgba(108,77,255,0.06)]"
    },
    {
      title: "Malware Analysis",
      desc: "Decompiling polymorphic payloads and analyzing zero-day exploit patterns in quarantined sandboxed labs.",
      icon: FileCode2,
      metrics: "12k+ Binaries Daily",
      theme: "green",
      color: "text-green-600",
      border: "border-green-500/30",
      glow: "shadow-[0_15px_30px_rgba(16,185,129,0.06)]"
    },
    {
      title: "Threat Forecasting",
      desc: "Applying sequence modeling algorithms to anticipate adversary campaigns before staging domains are initialized.",
      icon: LineChart,
      metrics: "94% Predictive Precision",
      theme: "blue",
      color: "text-blue-600",
      border: "border-blue-500/30",
      glow: "shadow-[0_15px_30px_rgba(59,130,246,0.06)]"
    },
    {
      title: "Vulnerability Research",
      desc: "Auditing enterprise packages and cloud architectures to discover hidden flaws before actors exploit them.",
      icon: ShieldAlert,
      metrics: "18 Zero-Days Discovered",
      theme: "orange",
      color: "text-orange-600",
      border: "border-orange-500/30",
      glow: "shadow-[0_15px_30px_rgba(249,115,22,0.06)]"
    }
  ];

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-[#F9FAFB]">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/research_lab_workspace.jpg"
          alt="JeztBrain secure AI-powered threat research command command facility"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-[15s] hover:scale-105"
        />
        {/* White and Gray overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/94 to-slate-50/96 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-bold tracking-wider uppercase border border-slate-350">
            Intelligence Core
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Advanced Cybersecurity <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Research & Innovation Lab.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Our dedicated research division isolates malware, forecasts campaign trends, and hardens software architectures. We provide the intelligence that feeds our automated defense systems.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-8 bg-white/90 backdrop-blur-xl border-t-4 border ${pillar.border} rounded-2xl shadow-sm text-left flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md group`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 ${pillar.color} border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-black text-slate-950 font-space-grotesk tracking-tight uppercase leading-none">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 text-left">
                  <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase block mb-1">Audit Metric</span>
                  <span className={`text-sm font-extrabold font-mono ${pillar.color}`}>{pillar.metrics}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

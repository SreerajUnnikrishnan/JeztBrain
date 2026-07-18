import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Laptop, Server, Cloud, Cpu, ArrowRight } from 'lucide-react';

export default function PlatformOverview() {
  return (
    <section className="relative py-28 bg-white text-[#1F2937] overflow-hidden border-b border-slate-100 font-sans">
      
      {/* Very Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(243,244,246,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(243,244,246,0.8)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* ─── Left Column: Ecosystem Architecture Context ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#6D4AFF] tracking-[0.2em] uppercase font-mono">
                  Platform Architecture
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-[#0F1117] tracking-tight leading-[1.1] font-space-grotesk">
                The <span className="text-[#6D4AFF]">JeztBrain</span> Ecosystem.
              </h2>

              <p className="text-[#4B5563] text-base leading-relaxed font-normal">
                JeztBrain operates as a unified enterprise cybersecurity ecosystem. By dividing administrative response controls from the automated intelligence core, we construct a reliable perimeter that protects enterprise operations and neutralizes anomalies at scale.
              </p>
            </div>

            {/* Platform & Spider descriptive blocks */}
            <div className="space-y-6 max-w-[500px]">
              
              {/* Block 1: JeztBrain Platform */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2FA8FF]/5 border border-[#2FA8FF]/20 text-[#2FA8FF] flex items-center justify-center shrink-0">
                  <Shield size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0F1117]">JeztBrain Platform</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed font-light">
                    The enterprise command console. It aggregates live alerts, manages incident queue tickets, and connects security managers directly to our expert incident response network.
                  </p>
                </div>
              </div>

              {/* Block 2: JeztBrainSpider Engine */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6D4AFF]/5 border border-[#6D4AFF]/20 text-[#6D4AFF] flex items-center justify-center shrink-0">
                  <Brain size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0F1117]">JeztBrainSpider Engine</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed font-light">
                    The intelligence foundation. Running silently, it maps infrastructure, performs deep threat-actor attribution, and forwards threat indicators directly to the platform console.
                  </p>
                </div>
              </div>

            </div>

            <div className="text-xs text-[#6B7280] leading-relaxed pl-4 border-l-2 border-[#6D4AFF] font-light">
              JeztBrainSpider feeds structural analytics directly into the main response dashboard, ensuring threat attribution and forecasts are integrated into operations.
            </div>
          </motion.div>

          {/* ─── Right Column: Diagram Architecture Canvas ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 flex justify-center"
          >
            {/* Elegant SVG Architecture Diagram */}
            <div className="w-full bg-[#F9FAFB] rounded-2xl border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.02)] p-8 relative min-h-[420px] flex flex-col justify-between">
              
              <div className="text-left mb-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#6B7280] uppercase">INTELLIGENCE & ESCALATION FLOW</span>
              </div>

              {/* Interactive SVG Connector Canvas */}
              <div className="relative flex-1 flex flex-col justify-between items-center gap-8 z-10">
                
                {/* Row 1: Telemetry Inputs */}
                <div className="flex justify-around w-full">
                  {[
                    { label: "Endpoint", icon: Laptop },
                    { label: "Network", icon: Server },
                    { label: "Cloud", icon: Cloud }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-500 hover:text-[#2FA8FF] hover:border-[#2FA8FF]/30 transition-all duration-300">
                          <Icon size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* SVG Connections between Row 1 and Row 2 */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
                    {/* Path 1: Endpoint to Spider */}
                    <path d="M 16% 50 L 50% 160" className="stroke-slate-200" />
                    {/* Path 2: Network to Spider */}
                    <path d="M 50% 50 L 50% 160" className="stroke-slate-200" />
                    {/* Path 3: Cloud to Spider */}
                    <path d="M 84% 50 L 50% 160" className="stroke-slate-200" />
                    {/* Path 4: Spider to Platform */}
                    <path d="M 50% 210 L 50% 300" className="stroke-[#6D4AFF] stroke-2" strokeDasharray="5,5" />
                  </svg>
                </div>

                {/* Row 2: JeztBrainSpider core */}
                <div className="flex flex-col items-center relative z-10 py-6">
                  <div className="px-6 py-3 rounded-full bg-white border border-[#6D4AFF]/30 shadow-md flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6D4AFF] animate-ping" />
                    <span className="text-xs font-black text-[#0F1117] tracking-wider uppercase font-space-grotesk">JeztBrainSpider Core</span>
                  </div>
                </div>

                {/* Row 3: JeztBrain Command Platform */}
                <div className="flex flex-col items-center relative z-10 w-full">
                  <div className="w-[85%] bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                    <div className="text-left">
                      <span className="text-[9px] font-mono text-slate-400 block font-bold">CONTROL LEVEL</span>
                      <span className="text-xs font-extrabold text-[#0F1117] tracking-tight">JeztBrain Platform</span>
                    </div>
                    <div className="flex gap-4 text-xs font-bold text-slate-400">
                      <span>Audits</span>
                      <span>•</span>
                      <span>Alerts</span>
                      <span>•</span>
                      <span>Mitigations</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

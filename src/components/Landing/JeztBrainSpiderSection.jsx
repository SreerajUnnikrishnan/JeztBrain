import React, { useState } from 'react';
import { Shield, GitMerge, Cpu, Radio, Activity, CheckCircle, Zap } from 'lucide-react';

export default function JeztBrainSpiderSection() {
  const capabilities = [
    {
      index: "01",
      icon: GitMerge,
      name: "Threat Correlation",
      desc: "Connects related security events to reveal complete attack patterns.",
      badge: "CORRELATION ENGINE"
    },
    {
      index: "02",
      icon: Cpu,
      name: "AI Analysis",
      desc: "Detects suspicious behavior using intelligent analysis.",
      badge: "NEURAL NETWORK"
    },
    {
      index: "03",
      icon: Radio,
      name: "Real-Time Intelligence",
      desc: "Continuously monitors and updates threat information.",
      badge: "LIVE TELEMETRY"
    },
    {
      index: "04",
      icon: Shield,
      name: "Expert Support",
      desc: "Provides actionable insights for faster incident response.",
      badge: "ANALYST ACTION"
    },
    {
      index: "05",
      icon: Activity,
      name: "Security Analytics",
      desc: "Transforms raw security data into meaningful intelligence.",
      badge: "BIG DATA PIPELINES"
    }
  ];

  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Reusable Spider Web SVG component for background patterns
  const SpiderWebSVG = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      {/* Concentric octagons */}
      <polygon points="180,100 157,157 100,180 43,157 20,100 43,43 100,20 157,43" />
      <polygon points="160,100 142,142 100,160 58,142 40,100 58,58 100,40 142,58" />
      <polygon points="140,100 128,128 100,140 72,128 60,100 72,72 100,60 128,72" />
      <polygon points="120,100 114,114 100,120 86,114 80,100 86,86 100,80 114,86" />
      
      {/* Radial web lines */}
      <line x1="100" y1="100" x2="100" y2="10" />
      <line x1="100" y1="100" x2="100" y2="190" />
      <line x1="100" y1="100" x2="10" y2="100" />
      <line x1="100" y1="100" x2="190" y2="100" />
      <line x1="100" y1="100" x2="36" y2="36" />
      <line x1="100" y1="100" x2="164" y2="164" />
      <line x1="100" y1="100" x2="36" y2="164" />
      <line x1="100" y1="100" x2="164" y2="36" />
    </svg>
  );

  return (
    <section className="relative w-full min-h-[950px] flex items-center justify-center bg-gradient-to-br from-[#991B1B] via-[#DC2626] to-[#7F1D1D] text-white overflow-hidden py-24 md:py-32 font-sans border-b border-[#2A0808]">
      
      {/* Custom Styles for Holographic Effects */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes dashedFlow {
          to { stroke-dashoffset: -40; }
        }
        .anim-scan {
          animation: scanline 4s linear infinite;
        }
        .anim-flow-line {
          stroke-dasharray: 8, 4;
          animation: dashedFlow 2s linear infinite;
        }
        .web-glow {
          filter: drop-shadow(0 0 4px rgba(255,255,255,0.4));
        }
      `}</style>

      {/* ── Background Cyber Layer: Spread white spider nets as background images inside it ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        
        {/* Soft geometric gradient mask to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 z-10" />
        
        {/* Top-Left Web Pattern */}
        <SpiderWebSVG className="absolute -top-12 -left-12 w-96 h-96 text-white/8 z-0 opacity-70" />
        
        {/* Bottom-Right Web Pattern */}
        <SpiderWebSVG className="absolute -bottom-16 -right-16 w-[450px] h-[450px] text-white/6 z-0 opacity-60" />
        
        {/* Center Large Web Pattern */}
        <SpiderWebSVG className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] text-white/5 z-0" />
        
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full flex flex-col justify-between">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: Interactive HUD visual console containing the white web ── */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
            
            {/* Holographic Target Display Panel */}
            <div className="w-full max-w-[460px] bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
              
              {/* Corner Target Markers (Tech HUD accents) */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/30" />

              {/* Scanning Laser Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 anim-scan z-30 pointer-events-none" />

              {/* Interactive White Spider Net Display Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 select-none z-20 flex items-center justify-center">
                
                {/* Active White Spider Net SVG */}
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-white pointer-events-none transition-transform duration-700 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="1.2">
                  {/* Concentric octagons */}
                  <polygon className="web-glow text-white/20" points="180,100 157,157 100,180 43,157 20,100 43,43 100,20 157,43" />
                  <polygon className="web-glow text-white/40" points="160,100 142,142 100,160 58,142 40,100 58,58 100,40 142,58" />
                  <polygon className="web-glow text-white/70" points="140,100 128,128 100,140 72,128 60,100 72,72 100,60 128,72" />
                  <polygon className="web-glow text-white" points="120,100 114,114 100,120 86,114 80,100 86,86 100,80 114,86" />
                  
                  {/* Radial web lines */}
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="100" y2="10" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="100" y2="190" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="10" y2="100" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="190" y2="100" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="36" y2="36" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="164" y2="164" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="36" y2="164" />
                  <line className="web-glow text-white/30" x1="100" y1="100" x2="164" y2="36" />
                </svg>

                {/* Cyber Target Scope Overlays */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-25 opacity-25 group-hover:opacity-40 transition-opacity">
                  <div className="w-24 h-24 rounded-full border border-dashed border-white/60 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute w-12 h-12 rounded-full border border-white/50" />
                  <div className="absolute w-1 h-8 bg-white/40" />
                  <div className="absolute h-1 w-8 bg-white/40" />
                </div>

                {/* Floating Technical Parameter overlays */}
                <div className="absolute top-3 left-3 bg-black/95 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-slate-300 z-30 tracking-wider">
                  MODEL: V4.8.2_SPIDER
                </div>

                <div className="absolute bottom-3 right-3 bg-black/95 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-[#22D3EE] z-30 tracking-wider">
                  PORTS ACTIVE: 12,480/12,480
                </div>

                <div className="absolute bottom-3 left-3 bg-black/95 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-xl flex flex-col gap-0.5 z-30 shadow-lg text-left">
                  <span className="text-[7px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                    Ingress Rate
                  </span>
                  <span className="text-xs font-black text-white font-space-grotesk tracking-tighter">
                    1,840 Threat Packets/s
                  </span>
                </div>
              </div>

              {/* Spider console status bar */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-left z-20 relative">
                <div>
                  <h4 className="text-sm font-bold text-white font-space-grotesk tracking-wide uppercase">
                    JeztBrainSpider Core
                  </h4>
                  <p className="text-[10px] text-slate-300 font-mono tracking-widest uppercase mt-0.5">
                    Holographic Network Synced
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-2 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span className="text-[9px] font-mono text-white font-bold">ACTIVE</span>
                </div>
              </div>

            </div>

            {/* Neural Load Statistics */}
            <div className="w-full max-w-[460px] bg-black/35 border border-white/10 p-4 rounded-2xl flex items-center justify-between text-left backdrop-blur-sm shadow-xl">
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block font-bold">AI Core State</span>
                <p className="text-xs font-bold text-slate-200 font-space-grotesk">Neural Connection Active</p>
              </div>
              <div className="flex items-center gap-1 text-white font-mono text-xs font-black">
                <CheckCircle size={12} className="text-white" />
                <span>99.98% SYNCED</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: High-contrast content text & capabilities ── */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Headers */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-white text-xs font-mono font-bold tracking-wider uppercase border border-white/20">
                THE CORE INTELLIGENCE ENGINE
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-space-grotesk">
                Meet JeztBrainSpider<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-rose-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] font-black">
                  The Brain Behind Every Decision.
                </span>
              </h2>

              <p className="text-white font-semibold text-base md:text-lg leading-relaxed font-sora">
                A powerful AI-driven cybersecurity engine that continuously analyzes threats, correlates attack patterns, and supports security experts with real-time intelligence.
              </p>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-slate-100 text-sm md:text-base leading-relaxed font-light font-sora">
              <p>
                JeztBrainSpider is the core platform that powers the entire JeztBrain ecosystem. It processes security events, identifies suspicious activity, analyzes attack behavior, and provides actionable insights to help experts respond faster and more accurately.
              </p>
              <p>
                Designed for modern cyber defense, JeztBrainSpider transforms complex security data into clear intelligence that strengthens protection for individuals, businesses, and enterprises.
              </p>
            </div>

            {/* Key Capabilities List */}
            <div className="space-y-3 mt-6">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2 block font-space-grotesk">
                KEY CAPABILITIES
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {capabilities.map((cap, idx) => {
                  const Icon = cap.icon;
                  const isHovered = hoveredIdx === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`flex gap-3 p-4 rounded-xl border transition-all duration-300 backdrop-blur-md select-none ${
                        isHovered 
                          ? "bg-black/60 border-white/35 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.01]" 
                          : "bg-black/40 border-white/10"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isHovered ? "bg-white text-black" : "bg-white/10 text-white border border-white/20"
                      }`}>
                        <Icon size={16} />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-space-grotesk">
                          {cap.name}
                        </h4>
                        <p className="text-[11px] text-slate-200 leading-relaxed font-light">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* ── BOTTOM DATA STREAM PIPELINE ── */}
        <div className="w-full mt-16 pt-8 border-t border-white/10 relative">
          
          {/* Animated SVG white data stream pipeline */}
          <div className="w-full h-12 relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl flex items-center justify-between px-6">
            <span className="text-[9px] font-mono text-white font-extrabold uppercase tracking-widest shrink-0">
              Live Threat Streams
            </span>
            
            {/* Horizontal flow line graphic */}
            <div className="flex-1 mx-6 h-4 relative">
              <svg className="w-full h-full" preserveAspectRatio="none">
                {/* Background line */}
                <line x1="0" y1="8" x2="100%" y2="8" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                {/* Flowing dashed packets line */}
                <line x1="0" y1="8" x2="100%" y2="8" stroke="white" strokeWidth="2" className="anim-flow-line" />
              </svg>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Zap size={12} className="text-[#22D3EE] animate-pulse" />
              <span className="text-[9px] font-mono text-slate-350 uppercase">Packet ingestion: Active</span>
            </div>
          </div>

          {/* Centered Bottom Statement */}
          <p className="text-xs font-semibold text-slate-200 mt-6 text-center tracking-wide font-sora">
            One intelligent engine powering every decision across the JeztBrain ecosystem.
          </p>

        </div>

      </div>
    </section>
  );
}

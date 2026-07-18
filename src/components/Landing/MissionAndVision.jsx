import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart3, Users, Shield, Cpu, ArrowRight } from 'lucide-react';

export default function MissionAndVision() {
  const [activeIndex, setActiveIndex] = useState(0);

  const ecosystemItems = [
    {
      icon: Brain,
      emoji: "🧠",
      title: "JeztBrainSpider",
      subtitle: "Core AI Intelligence Engine",
      description: "The core automated intelligence engine that continuously parses global security telemetry, runs threat correlation models, and automates early triage tasks.",
      color: "from-purple-600 to-indigo-600",
      glow: "rgba(123, 47, 247, 0.4)",
      nodeX: 50,
      nodeY: 10,
    },
    {
      icon: BarChart3,
      emoji: "📊",
      title: "Spider Pro",
      subtitle: "Enterprise Security Dashboard",
      description: "Single-pane visibility across your entire security posture, presenting real-time telemetry, threat levels, and active containment controls.",
      color: "from-blue-600 to-cyan-600",
      glow: "rgba(59, 130, 246, 0.4)",
      nodeX: 88,
      nodeY: 38,
    },
    {
      icon: Users,
      emoji: "👨‍💻",
      title: "Expert Connect",
      subtitle: "Verified Cybersecurity Experts",
      description: "On-demand access to verified elite-tier threat analysts, incident handlers, and cybersecurity consultants to investigate and resolve anomalies.",
      color: "from-emerald-600 to-teal-600",
      glow: "rgba(16, 185, 129, 0.4)",
      nodeX: 73,
      nodeY: 80,
    },
    {
      icon: Shield,
      emoji: "🛡️",
      title: "Incident Response",
      subtitle: "Investigation & Recovery",
      description: "Active playbooks, containment procedures, and complete digital forensics services to quickly isolate breaches and restore critical infrastructure.",
      color: "from-red-600 to-orange-600",
      glow: "rgba(239, 68, 68, 0.4)",
      nodeX: 27,
      nodeY: 80,
    },
    {
      icon: Cpu,
      emoji: "🤖",
      title: "AI Intelligence",
      subtitle: "Smart Threat Detection",
      description: "Adaptive ML algorithms that construct behavioral profiles, flag zero-day activity, and provide autonomous prevention measures at speed.",
      color: "from-amber-600 to-yellow-600",
      glow: "rgba(245, 158, 11, 0.4)",
      nodeX: 12,
      nodeY: 38,
    }
  ];

  // Auto-rotate items for ambient visual interest, but pause when user interacts
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ecosystemItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative w-full min-h-[920px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-white">
      
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/ecosystem_bg.png"
          alt="JeztBrain Ecosystem clean abstract modern background"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft realistic light gradient overlay for readability & blending */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/95 via-white/85 to-blue-50/20 z-10" />
        
        {/* Soft abstract ambient glow circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── LEFT COLUMN: Text Content & Interactive List ── */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B2FF7]/10 text-[#7B2FF7] text-xs font-mono font-bold tracking-wider uppercase border border-[#7B2FF7]/20 shadow-sm animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FF7]" />
              THE JEZTBRAIN ECOSYSTEM
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1020] tracking-tight leading-none font-space-grotesk">
                Constructing the Future of <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7B2FF7] to-[#9333EA]">
                  Active Digital Defense.
                </span>
              </h2>
              
              {/* Subheading */}
              <p className="text-slate-700 font-medium text-lg md:text-xl font-sora leading-relaxed max-w-2xl">
                One intelligent ecosystem that combines AI, cybersecurity experts, and enterprise technologies to deliver faster, smarter, and more effective cyber protection.
              </p>
            </div>

            {/* Brief Content */}
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light max-w-2xl">
              JeztBrain unifies AI-powered intelligence, verified cybersecurity experts, and advanced security platforms into one connected ecosystem. Every component works together to detect threats, support investigations, strengthen defenses, and accelerate incident response for individuals, businesses, and enterprises.
            </p>

            {/* Interactive Ecosystem List */}
            <div className="space-y-3 mt-8">
              {ecosystemItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isActive = activeIndex === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsPaused(true);
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? "bg-white border-[#7B2FF7] shadow-lg shadow-indigo-100/50 translate-x-2"
                        : "bg-white/40 border-slate-200/60 hover:bg-white/70 hover:border-slate-300"
                    }`}
                  >
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${item.color} text-white shadow-md`
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      <IconComponent size={22} className={isActive ? "animate-pulse" : ""} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none" role="img" aria-label={item.title}>{item.emoji}</span>
                        <h3 className={`text-base font-bold font-space-grotesk tracking-tight ${
                          isActive ? "text-[#7B2FF7]" : "text-slate-900"
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 font-mono tracking-wide mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <ArrowRight size={16} className={`text-slate-300 transition-all duration-300 ${
                      isActive ? "text-[#7B2FF7] translate-x-1" : "opacity-0"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Bottom Statement */}
            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7B2FF7] animate-ping shrink-0" />
              <p className="text-[#7B2FF7] font-extrabold text-sm tracking-wider uppercase font-mono">
                One ecosystem. One platform. Unlimited cyber protection.
              </p>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Animated 3D Ecosystem Node Network ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[500px]">
            
            {/* Ambient Glowing Web Network Graphic in background of the core */}
            <div className="absolute w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-indigo-300/10 to-purple-300/10 blur-xl pointer-events-none" />

            {/* The Main Interaction Diagram Area */}
            <div className="relative w-[460px] h-[460px] flex items-center justify-center select-none">
              
              {/* SVG Connecting Lines Layer */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100">
                <defs>
                  {/* Glowing Filter effects */}
                  <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {ecosystemItems.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <g key={idx}>
                      {/* Connection Line */}
                      <motion.line
                        x1="50"
                        y1="50"
                        x2={item.nodeX}
                        y2={item.nodeY}
                        stroke={isActive ? "url(#line-glow-grad)" : "rgba(203, 213, 225, 0.4)"}
                        strokeWidth={isActive ? "0.8" : "0.4"}
                        strokeDasharray={isActive ? "2, 1" : "none"}
                        animate={isActive ? { strokeDashoffset: [0, -10] } : {}}
                        transition={isActive ? { repeat: Infinity, duration: 4, ease: "linear" } : {}}
                      />
                      
                      {/* Interactive Pulse Flow packet */}
                      {isActive && (
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="1"
                          fill="#7B2FF7"
                          filter="url(#glow-effect)"
                          animate={{
                            cx: [50, item.nodeX],
                            cy: [50, item.nodeY],
                            r: [0.5, 1.2, 0.5]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Line glow gradient definitions */}
                <linearGradient id="line-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7B2FF7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="1" />
                </linearGradient>
              </svg>

              {/* ── Central AI Core Module (JeztBrainSpider Core) ── */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: 360
                }}
                transition={{
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 120, ease: "linear" }
                }}
                className="absolute w-44 h-44 z-10 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setActiveIndex(0);
                  setIsPaused(true);
                }}
              >
                {/* Glowing Outer Ring */}
                <div 
                  className="absolute inset-0 rounded-full border border-dashed border-[#7B2FF7]/40 p-2" 
                  style={{ animation: 'spin 25s linear infinite' }}
                />
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#7B2FF7]/10 to-[#9333EA]/10 blur-xl animate-pulse" />
                
                {/* Core 3D image representation */}
                <img
                  src="/images/ecosystem_core.png"
                  alt="JeztBrain AI Core"
                  className="w-28 h-28 object-contain relative z-20 hover:scale-105 transition-transform duration-300"
                />
                
                {/* Glassmorphic Core Badge */}
                <div className="absolute bottom-2 bg-slate-900/90 text-white border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase scale-90 z-30 shadow-md">
                  AI CORE
                </div>
              </motion.div>

              {/* ── Surrounding Interactive Module Nodes ── */}
              {ecosystemItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={idx}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20"
                    style={{
                      left: `${item.nodeX}%`,
                      top: `${item.nodeY}%`,
                    }}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsPaused(true);
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Ring pulsing outer glow for the active node */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeGlowRing"
                          className="absolute -inset-4 rounded-full blur-md"
                          style={{ backgroundColor: item.glow }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Node Core Body */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center border relative transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${item.color} text-white border-transparent shadow-lg shadow-indigo-200`
                          : "bg-white text-slate-600 border-slate-200/80 shadow-sm hover:border-slate-300"
                      }`}
                    >
                      <IconComponent size={20} />

                      {/* Small Indicator active Dot */}
                      {isActive && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400"></span>
                        </span>
                      )}
                    </motion.div>

                    {/* Node Label Tooltip-Style */}
                    <div className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-lg border bg-white shadow-md text-[10px] font-bold font-space-grotesk whitespace-nowrap transition-all duration-300 pointer-events-none ${
                      isActive
                        ? "text-[#7B2FF7] border-[#7B2FF7]/20 scale-100 opacity-100"
                        : "text-slate-500 border-slate-100 scale-90 opacity-70 group-hover:opacity-100"
                    }`}>
                      {item.title}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* ── Active Module Description Card Floating (Shown at bottom center under diagram) ── */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[380px] z-30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-xl flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ecosystemItems[activeIndex].emoji}</span>
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">
                        Ecosystem Component
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#7B2FF7] border border-indigo-100">
                      0{activeIndex + 1} / 05
                    </span>
                  </div>
                  
                  <h3 className="text-base font-extrabold text-[#0B1020] font-space-grotesk">
                    {ecosystemItems[activeIndex].title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {ecosystemItems[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

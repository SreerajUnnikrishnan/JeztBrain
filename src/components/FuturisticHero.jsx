import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, ArrowRight, Play, Eye, Search, TrendingUp, Zap,
  Target, Globe, Clock, ShieldAlert, Users, Activity
} from 'lucide-react';

// Custom Premium SVG Icons for Diagram
const BrainIcon = () => (
  <svg className="w-4 h-4 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const SpiderIcon = () => (
  <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20" />
    <path d="M18 6 6 18M6 6l12 12" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const SnakeIcon = () => (
  <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.3 10a3.5 3.5 0 0 1 5.4 0l3.6 3.6a3.5 3.5 0 0 0 5.4 0M12 2v2a8 8 0 0 0-8 8v2a4 4 0 0 0 8 0v-2" />
  </svg>
);

const BeeIcon = () => (
  <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
    <path d="M12 6v12M6 12h12M7.5 7.5l9 9M7.5 16.5l9-9" />
  </svg>
);

// Canvas-based blue-purple neural network background
function NeuralNetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            // Blue-Purple connecting lines
            ctx.strokeStyle = i % 2 === 0 
              ? `rgba(139, 92, 246, ${alpha})` 
              : `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(123, 47, 247, 0.45)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.55 }} />;
}

export default function FuturisticHero() {
  const [activePointer, setActivePointer] = useState(null);

  // Custom Pointer Targets coordinates on Cyborg head relative to its bounding container
  const pointers = [
    { id: 'scan', label: 'SCAN', desc: 'Real-time monitoring', icon: <Eye size={12} />, x: 74, y: 31 },
    { id: 'analyze', label: 'ANALYZE', desc: 'Threat intelligence', icon: <Search size={12} />, x: 67, y: 44 },
    { id: 'predict', label: 'PREDICT', desc: 'Attack prediction', icon: <TrendingUp size={12} />, x: 72, y: 58 },
    { id: 'respond', label: 'RESPOND', desc: 'Automated defense', icon: <Shield size={12} />, x: 63, y: 72 }
  ];

  return (
    <div className="w-full lg:h-[calc(100vh-64px)] lg:max-h-[820px] text-white bg-black relative pt-20 pb-4 overflow-hidden z-10 flex flex-col justify-between selection:bg-purple-500/30 selection:text-white">

      {/* ─── CSS Keyframe Animations for SVG glow paths ─── */}
      <style>{`
        @keyframes stroke-glow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        .glowing-dash-path {
          stroke-dasharray: 6 15;
          animation: stroke-glow 3s linear infinite;
        }
      `}</style>

      {/* ─── Subtle Neural Network Background ─── */}
      <NeuralNetworkCanvas />

      {/* Glowing Ambient Lights */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none z-0 blur-[120px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)] pointer-events-none z-0 blur-[100px]" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.0015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.0015)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none z-0 opacity-25" />

      {/* ─── Main Hero Content Grid ─── */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-[1536px] mx-auto flex-1 flex flex-col justify-center py-2">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">

          {/* ── COLUMN 1: Headline, CTAs, Features, & Platform Flow ── */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 text-left">

            {/* Top Info Header */}
            <div className="space-y-4">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0D15] border border-white/10 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-[8.5px] font-mono font-bold text-slate-300 tracking-[0.2em] uppercase">
                  AI-Powered Cybersecurity Operations
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-4xl sm:text-5xl xl:text-[52px] font-black leading-[1.05] tracking-tight font-space-grotesk"
              >
                Detect. Analyze.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-black drop-shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                  Respond Instantly.
                </span>
              </motion.h1>

              {/* Subheadline Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-slate-400 text-xs leading-relaxed max-w-[420px]"
              >
                AI-powered cybersecurity operations that connect organizations with intelligent threat analysis, rapid response workflows, and expert-driven security guidance.
              </motion.p>

              {/* Mission Statement Block (No glassmorphism) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="border border-purple-500/10 bg-[#0F0D15] p-5 rounded-2xl max-w-[440px] space-y-2 mt-4"
              >
                <div className="flex items-center gap-2 text-violet-400 font-black font-mono text-[9px] uppercase tracking-widest">
                  <Shield size={12} className="text-[#8B5CF6]" />
                  <span>MISSION STATEMENT</span>
                </div>
                <p className="text-xs font-bold text-slate-200 font-space-grotesk mt-2">
                  Every second matters during a cyber incident.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  JeztBrain was created to reduce the gap between attack detection and effective response. Our mission is to help organizations respond faster, minimize damage, and recover with confidence.
                </p>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3.5 pt-0.5"
            >
              <Link
                to="/chat"
                className="group relative inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-full text-white font-black font-mono text-[9px] uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(123,47,247,0.3)] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] gap-3"
              >
                Get Started
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-purple-950 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={12} />
                </div>
              </Link>

              <Link
                to="/platform/jeztbrainspider"
                className="group inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-full border border-white/20 bg-[#0F0D15] hover:bg-white/5 text-slate-300 font-bold transition-all text-[9px] font-mono uppercase tracking-widest gap-3"
              >
                Explore Platform
                <div className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center text-white">
                  <Play size={8} fill="currentColor" className="ml-0.5" />
                </div>
              </Link>
            </motion.div>

            {/* ─── Platform Ecosystem Flow Diagram (No glassmorphism) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-3 border-t border-white/5 relative z-10 w-full"
            >
              <div className="flex items-center gap-2.5 max-w-[440px]">

                {/* JeztBrain Main Platform */}
                <div className="relative group bg-[#0A0B10] border border-[#8B5CF6]/30 p-2 rounded-xl flex items-center gap-2 w-28 shadow-lg transition-all duration-300">
                  <div className="w-6.5 h-6.5 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <BrainIcon />
                  </div>
                  <div className="text-left">
                    <h5 className="text-[8.5px] font-black text-white leading-none font-space-grotesk">JeztBrain</h5>
                    <p className="text-[6.5px] font-mono text-slate-500 mt-0.5 uppercase tracking-wider font-bold">Main Platform</p>
                  </div>
                </div>

                {/* Connection Path SVG 1 */}
                <svg className="w-5 h-3 overflow-visible shrink-0 text-[#8B5CF6]/50" viewBox="0 0 20 12" fill="none">
                  <path d="M0 6h20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  <polygon points="16,4 20,6 16,8" fill="currentColor" />
                </svg>

                {/* JeztBrainSpider Core Platform */}
                <div className="relative group bg-[#0A0B10] border border-rose-500/30 p-2 rounded-xl flex items-center gap-2 w-32 shadow-lg transition-all duration-300">
                  <div className="w-6.5 h-6.5 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <SpiderIcon />
                  </div>
                  <div className="text-left">
                    <h5 className="text-[8.5px] font-black text-white leading-none font-space-grotesk">JeztBrainSpider</h5>
                    <p className="text-[6.5px] font-mono text-slate-500 mt-0.5 uppercase tracking-wider font-bold">Core Platform</p>
                  </div>
                </div>

                {/* Split routing paths to Snake and Bee */}
                <svg className="w-6 h-12 overflow-visible shrink-0 text-fuchsia-500/40" viewBox="0 0 25 50" fill="none">
                  <path d="M0 25h8c5 0 5-18 10-18h7M8 25c5 0 5 18 10 18h7" stroke="currentColor" strokeWidth="1" />
                  <circle cx="25" cy="7" r="1.5" fill="#A855F7" />
                  <circle cx="25" cy="43" r="1.5" fill="#EAB308" />
                </svg>

                {/* Stacked Sub-Platforms */}
                <div className="flex flex-col gap-2 justify-center">
                  {/* JeztBrainSnake Feature */}
                  <div className="relative group bg-[#0A0B10] border border-[#8B5CF6]/30 p-1.5 rounded-lg flex items-center gap-2 w-[110px] shadow-lg transition-all duration-300">
                    <div className="w-5.5 h-5.5 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <SnakeIcon />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[8px] font-black text-white leading-none font-space-grotesk">JeztBrainSnake</h5>
                      <p className="text-[6.5px] font-mono text-slate-500 mt-0.5 leading-none">Threat Hunting</p>
                    </div>
                  </div>

                  {/* JeztBrainBee Feature */}
                  <div className="relative group bg-[#0A0B10] border border-amber-500/30 p-1.5 rounded-lg flex items-center gap-2 w-[110px] shadow-lg transition-all duration-300">
                    <div className="w-5.5 h-5.5 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <BeeIcon />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[8px] font-black text-white leading-none font-space-grotesk">JeztBrainBee</h5>
                      <p className="text-[6.5px] font-mono text-slate-500 mt-0.5 leading-none">Community Net</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

          {/* ── COLUMN 2: Center Cyborg Head with Interactive Pointers ── */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] lg:h-full pl-6">

            {/* Ambient glows behind the head */}
            <div className="absolute w-[90%] h-[90%] rounded-full border border-purple-500/10 bg-[radial-gradient(circle_at_center,rgba(123,47,247,0.04)_0%,transparent_70%)] blur-[4px] animate-pulse z-0 pointer-events-none" />
            
            {/* Connection lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              {pointers.map((p, idx) => {
                const isActive = activePointer === p.id;
                const startY = [26, 42, 58, 74][idx];
                return (
                  <g key={p.id}>
                    <path
                      d={`M 26 ${startY} Q 45 ${startY}, ${p.x} ${p.y}`}
                      stroke="rgba(123, 47, 247, 0.12)"
                      strokeWidth="0.8"
                    />
                    <path
                      d={`M 26 ${startY} Q 45 ${startY}, ${p.x} ${p.y}`}
                      stroke={isActive ? '#E0B0FF' : '#A855F7'}
                      strokeWidth={isActive ? 1.5 : 0.8}
                      opacity={isActive ? 1 : 0.4}
                      className="glowing-dash-path"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 1.5 : 0.8}
                      fill={isActive ? '#A855F7' : 'rgba(123, 47, 247, 0.6)'}
                      stroke={isActive ? '#ffffff' : 'none'}
                      strokeWidth={isActive ? 0.3 : 0}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Pointer List Labels (No glassmorphism) */}
            <div className="absolute left-0 top-[20%] bottom-[20%] flex flex-col justify-between z-30 w-32">
              {pointers.map((p) => (
                <div
                  key={p.id}
                  onMouseEnter={() => setActivePointer(p.id)}
                  onMouseLeave={() => setActivePointer(null)}
                  className={`relative group flex items-center gap-2 px-2.5 py-1.5 bg-[#0B0A12] border rounded-xl cursor-default transition-all duration-300 w-28 shadow-lg ${activePointer === p.id
                      ? 'border-[#8B5CF6] shadow-[0_0_15px_rgba(123,47,247,0.2)] bg-gradient-to-r from-[#8B5CF6]/10 to-transparent'
                      : 'border-white/5 hover:border-[#8B5CF6]/20'
                    }`}
                >
                  <div className={`p-1 rounded-md border transition-colors shrink-0 ${activePointer === p.id
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-white/5 border-white/5 text-slate-500'
                    }`}>
                    {p.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <span className="text-[8px] font-black text-white uppercase tracking-wider block font-space-grotesk">{p.label}</span>
                    <span className="text-[6.5px] font-mono text-slate-500 block leading-none mt-0.5 truncate">{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cyborg Face Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[540px] lg:max-w-[580px] h-[90%] lg:h-[95%] aspect-square flex items-center justify-center pl-10"
            >
              <img
                src="/cyber_sentinel_hero.png"
                alt="Cyber Sentinel AI Guardian"
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_10px_35px_rgba(123,47,247,0.25)]"
              />
            </motion.div>

          </div>

        </div>

      </div>

      {/* ─── Bottom Metrics Footer Row ─── */}
      <div className="w-full px-6 lg:px-12 max-w-[1536px] mx-auto z-10 pt-2 border-t border-white/5 mt-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-2">
          {[
            { label: 'Threats Analyzed Daily', value: '10M+', icon: <Target size={12} /> },
            { label: 'Detection Accuracy', value: '99.9%', icon: <ShieldAlert size={12} /> },
            { label: 'Average Response Time', value: '< 5s', icon: <Zap size={12} /> },
            { label: 'Real-time Protection', value: '24/7', icon: <Clock size={12} /> },
            { label: 'Countries Protected', value: '150+', icon: <Globe size={12} /> },
            { label: 'Enterprise Grade Security', value: '100%', icon: <Shield size={12} /> }
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.04 }}
              className="flex items-center gap-2.5 justify-center lg:justify-start"
            >
              <div className="w-7 h-7 rounded-md bg-purple-500/5 border border-purple-500/10 flex items-center justify-center shrink-0 text-[#A855F7]">
                {metric.icon}
              </div>
              <div className="text-left">
                <span className="text-[11px] font-black text-white font-space-grotesk tracking-tight leading-none block">
                  {metric.value}
                </span>
                <span className="text-[7.5px] text-slate-500 uppercase tracking-wider font-bold block mt-0.5 leading-none">
                  {metric.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

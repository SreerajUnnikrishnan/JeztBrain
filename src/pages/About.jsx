import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Users, Brain, Globe, Lock, ArrowRight,
  ShieldAlert, FileText, Cpu, Activity, ShieldCheck,
  ChevronRight, Sparkles, MapPin, Eye, Check, X, Star
} from 'lucide-react';

// Canvas-based neural network for the Hero Section (Blue, White, Purple)
function HeroNeuralCanvas() {
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

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(108, 77, 255, 0.4)' : 'rgba(0, 212, 255, 0.4)',
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = i % 2 === 0 
              ? `rgba(108, 77, 255, ${alpha})` 
              : `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

export default function About() {
  const [activeStep, setActiveStep] = useState(0);

  // Values block with custom colors
  const values = [
    {
      title: "Trust",
      desc: "Only verified cybersecurity professionals.",
      icon: Shield,
      color: "from-blue-500/20 to-indigo-500/5",
      iconColor: "text-blue-400",
      borderColor: "group-hover:border-blue-500/50"
    },
    {
      title: "Speed",
      desc: "Rapid threat analysis and response.",
      icon: Zap,
      color: "from-amber-500/20 to-orange-500/5",
      iconColor: "text-amber-400",
      borderColor: "group-hover:border-amber-500/50"
    },
    {
      title: "Human Expertise",
      desc: "Real experts guide every critical incident.",
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/5",
      iconColor: "text-emerald-400",
      borderColor: "group-hover:border-emerald-500/50"
    },
    {
      title: "AI Intelligence",
      desc: "Smart detection powered by JeztBrainSpider.",
      icon: Brain,
      color: "from-purple-500/20 to-fuchsia-500/5",
      iconColor: "text-purple-400",
      borderColor: "group-hover:border-purple-500/50"
    },
    {
      title: "Accessibility",
      desc: "Cybersecurity support for everyone.",
      icon: Globe,
      color: "from-cyan-500/20 to-sky-500/5",
      iconColor: "text-cyan-400",
      borderColor: "group-hover:border-cyan-500/50"
    },
    {
      title: "Privacy",
      desc: "User data is protected and confidential.",
      icon: Lock,
      color: "from-rose-500/20 to-pink-500/5",
      iconColor: "text-rose-400",
      borderColor: "group-hover:border-rose-500/50"
    }
  ];

  // Timeline for "How JeztBrain Works"
  const timelineSteps = [
    { title: "Threat Detected", icon: ShieldAlert, desc: "A vulnerability or active threat is identified in your workspace.", color: "border-red-500/30 text-red-400 bg-red-950/20" },
    { title: "Report Incident", icon: FileText, desc: "Submit telemetry logs or context details to our secure intake.", color: "border-orange-500/30 text-orange-400 bg-orange-950/20" },
    { title: "AI Analysis", icon: Cpu, desc: "JeztBrainSpider parses files, decodes indicators, and checks global telemetry.", color: "border-purple-500/30 text-purple-400 bg-purple-950/20" },
    { title: "Expert Assignment", icon: Users, desc: "A top-tier vetted response specialist is matched for your threat vector.", color: "border-blue-500/30 text-blue-400 bg-blue-950/20" },
    { title: "Live Guidance", icon: Activity, desc: "Interact via secure chat to contain and mitigate the incident in real-time.", color: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20" },
    { title: "Resolution & Report", icon: ShieldCheck, desc: "The threat is neutralized, and a cryptographic verification report is issued.", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20" }
  ];

  // Global Map Hotspots
  const hotspots = [
    { name: "Security Experts", x: "25%", y: "42%", info: "Global network of vetted analysts" },
    { name: "AI Intelligence", x: "48%", y: "30%", info: "JeztBrainSpider correlation core" },
    { name: "Threat Research", x: "72%", y: "38%", info: "Active malware analysis labs" },
    { name: "Incident Response", x: "32%", y: "68%", info: "24/7 Rapid mitigation nodes" },
    { name: "Threat Intelligence", x: "85%", y: "62%", info: "Real-time global exploit tracking" },
    { name: "Enterprise Protection", x: "60%", y: "55%", info: "Active corporate SOC firewalls" }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative font-sans">
      {/* Global abstract neon highlights */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-red-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 lg:px-12 pt-32 pb-16 overflow-hidden">
        {/* Background headquarters layout */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/hq_building_night.jpg"
            alt="Modern technology headquarters"
            className="w-full h-full object-cover object-center scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.85)_100%)] z-10" />
        </div>

        {/* Neural Network interactive canvas */}
        <HeroNeuralCanvas />

        {/* Content */}
        <div className="max-w-5xl mx-auto relative z-20 space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-purple-500/20 bg-[#0F0D15]/80 backdrop-blur-md"
          >
            <Sparkles size={13} className="text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-purple-300">
              Introducing JeztBrain
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-space-grotesk tracking-tight leading-[1.05] uppercase"
          >
            Building the Future of<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_30px_rgba(108,77,255,0.25)]">
              Intelligent Cyber Defense
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-[850px] mx-auto"
          >
            JeztBrain connects people and organizations with verified cybersecurity experts through an AI-powered security ecosystem. We help detect threats, provide expert guidance, and accelerate incident response.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-6"
          >
            <a
              href="#why-us"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-white uppercase transition-colors duration-300"
            >
              Explore Our Story <ChevronRight size={14} className="animate-bounce-x" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY JEZTBRAIN */}
      <section id="why-us" className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20">
              <span className="text-[9px] font-mono font-bold tracking-widest text-blue-400 uppercase">
                THE CHALLENGE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black font-space-grotesk tracking-tight uppercase leading-tight">
              Cybersecurity Should Be<br />
              <span className="text-blue-400">Accessible to Everyone</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>

          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/15 transition-all duration-500" />
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light font-sans">
              Many people and businesses experience phishing, malware, ransomware, account compromise, or online fraud without knowing whom to trust. JeztBrain bridges this gap by providing direct access to verified cybersecurity professionals and intelligent security technologies that help identify, analyze, and respond to cyber threats quickly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="relative group p-10 bg-gradient-to-br from-[#0B0D19] to-black border border-white/10 rounded-3xl hover:border-purple-500/30 transition-all duration-500 shadow-xl overflow-hidden">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-500/5 rounded-full blur-[60px]" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles size={22} />
              </div>
              <h3 className="text-2xl font-black font-space-grotesk uppercase tracking-tight">Our Mission</h3>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              To make professional cybersecurity assistance accessible to everyone by combining AI intelligence with verified security experts, enabling faster detection, response, and recovery from cyber threats.
            </p>
          </div>

          {/* Vision Card */}
          <div className="relative group p-10 bg-gradient-to-br from-[#0A121A] to-black border border-white/10 rounded-3xl hover:border-blue-500/30 transition-all duration-500 shadow-xl overflow-hidden">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px]" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Eye size={22} />
              </div>
              <h3 className="text-2xl font-black font-space-grotesk uppercase tracking-tight">Our Vision</h3>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              To build the world's most trusted AI-powered cybersecurity ecosystem where individuals and organizations can protect their digital lives through intelligent technology and expert collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-20">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20">
            <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 uppercase">
              FOUNDATIONAL PILLARS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-space-grotesk uppercase tracking-tight">
            Our Core Values
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-light">
            The operational code that directs every automated system, incident containment team, and custom expert guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, index) => {
            const Icon = v.icon;
            return (
              <div
                key={index}
                className={`group p-8 bg-gradient-to-b ${v.color} border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-300 relative overflow-hidden`}
              >
                <div className={`absolute -inset-px border-t border-r border-transparent ${v.borderColor} rounded-2xl transition-colors duration-300 pointer-events-none`} />
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${v.iconColor} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold font-space-grotesk uppercase tracking-tight text-white">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. HOW JEZTBRAIN WORKS */}
      <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-20 border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              TREATMENT PROCESS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-space-grotesk uppercase tracking-tight">
            How JeztBrain Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-light">
            Our step-by-step pipeline mapping cyber incident reporting directly to resolution using intelligence cores.
          </p>
        </div>

        {/* Horizontal Scrollable Timeline Wrapper */}
        <div className="overflow-x-auto pb-8 custom-scrollbar">
          <div className="flex min-w-[1000px] lg:min-w-0 justify-between items-start gap-6 relative px-4">
            
            {/* Connection Line */}
            <div className="absolute top-[28px] left-[40px] right-[40px] h-[1px] bg-gradient-to-r from-red-500/20 via-purple-500/20 to-emerald-500/20 z-0 pointer-events-none" />

            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="flex-1 flex flex-col items-center text-center space-y-4 group cursor-pointer relative z-10"
                >
                  {/* Step Bubble */}
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 relative ${step.color} ${activeStep === idx ? 'scale-110 ring-4 ring-purple-500/20 shadow-[0_0_20px_rgba(123,47,247,0.3)]' : 'hover:scale-105'}`}>
                    <Icon size={20} />
                    {/* Glowing index badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black border border-white/20 text-[9px] font-mono flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1 px-2">
                    <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider font-space-grotesk ${activeStep === idx ? 'text-white' : 'text-slate-300'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-normal font-light max-w-[160px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MEET JEZTBRAINSPIDER (BLACK & RED DISTINCT DESIGN) */}
      <section className="bg-[#050002] border-y border-red-500/10 py-24 px-6 lg:px-12 relative overflow-hidden z-20">
        {/* Deep red glows and grid */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] bg-rose-950/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-red-500 uppercase">
                CORE SYSTEM ENGINE
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black font-space-grotesk tracking-tight uppercase leading-none">
              Meet <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]">JeztBrainSpider</span>
            </h2>

            <h3 className="text-xl font-bold font-space-grotesk text-slate-300">
              The Intelligence Engine Behind JeztBrain
            </h3>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              JeztBrainSpider is the core intelligence platform powering the JeztBrain ecosystem. It continuously analyzes cyber threats, correlates attack patterns, assists security experts, and delivers actionable intelligence for faster and more accurate incident response.
            </p>

            <div className="pt-4">
              <Link
                to="/platform/jeztbrainspider"
                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-red-950/40 hover:bg-red-950/60 border border-red-500/30 text-red-400 hover:text-red-300 font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300"
              >
                Inspect System Stack
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual block */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Glowing background container */}
            <div className="w-full max-w-[460px] aspect-square rounded-3xl border border-red-500/10 bg-[#0A0506]/90 p-8 shadow-[0_0_50px_rgba(239,68,68,0.06)] relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03)_0%,transparent_100%)] pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider">Telemetry Radar</span>
                <span className="font-mono text-[9px] text-slate-600">v4.02.1</span>
              </div>

              {/* Holographic style threat target */}
              <div className="flex-1 flex items-center justify-center relative py-6">
                <div className="w-48 h-48 rounded-full border border-red-500/15 flex items-center justify-center animate-spin-slow">
                  <div className="w-36 h-36 rounded-full border border-dashed border-red-500/25 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-red-500/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Cpu className="text-red-500 animate-pulse" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Threat Target Pointer Grid */}
                <div className="absolute top-[35%] left-[25%] px-2 py-1 bg-red-950/80 border border-red-500/35 rounded text-[8px] font-mono text-red-400">
                  APT-39 Telemetry
                </div>
                <div className="absolute bottom-[28%] right-[22%] px-2 py-1 bg-red-950/80 border border-red-500/35 rounded text-[8px] font-mono text-red-400">
                  Exploit Neutralized
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1.5">
                <div className="flex justify-between text-[9px] font-mono text-slate-500">
                  <span>Engine Telemetry:</span>
                  <span className="text-red-500 font-bold">Active Shield</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="w-[88%] bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY WE'RE DIFFERENT */}
      <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-20">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20">
            <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 uppercase">
              STRATEGIC ANALYSIS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-space-grotesk uppercase tracking-tight">
            Why We're Different
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-light">
            A paradigm shift in security delivery: contrasting traditional reactive operations with JeztBrain's integrated stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Security Card */}
          <div className="p-8 md:p-10 bg-zinc-950/40 border border-white/5 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/3 rounded-full blur-[40px] pointer-events-none" />
            <h3 className="text-xl font-bold uppercase tracking-wider font-mono text-slate-500 mb-8 border-b border-white/5 pb-4 flex items-center justify-between">
              Traditional Security
              <X size={18} className="text-slate-600" />
            </h3>
            
            <ul className="space-y-6">
              {[
                "Delayed response",
                "Multiple disconnected tools",
                "Limited expert access",
                "Reactive protection"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  </div>
                  <span className="text-sm text-slate-400 leading-normal font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* JeztBrain Card */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-[#0C061F] to-[#040E1B] border border-purple-500/25 rounded-3xl relative overflow-hidden group shadow-[0_20px_50px_rgba(108,77,255,0.08)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="text-xl font-bold uppercase tracking-wider font-mono text-purple-400 mb-8 border-b border-purple-500/20 pb-4 flex items-center justify-between">
              JeztBrain
              <Check size={18} className="text-[#00FFB2]" />
            </h3>

            <ul className="space-y-6">
              {[
                "AI-assisted analysis",
                "Direct access to security experts",
                "Unified cybersecurity ecosystem",
                "Faster incident response",
                "Continuous intelligence"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#00FFB2]">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-white font-medium leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. GLOBAL ECOSYSTEM (WORLD MAP WITH PULSING LINES) */}
      <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-20 border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20">
            <span className="text-[9px] font-mono font-bold tracking-widest text-blue-400 uppercase">
              NETWORK COORDINATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-space-grotesk uppercase tracking-tight">
            Global Ecosystem
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-light font-sans">
            Interactive visual network illustrating the connection and flow of data packets between cyber experts and security modules.
          </p>
        </div>

        {/* Dynamic Vector World Map */}
        <div className="w-full max-w-5xl mx-auto aspect-[16/9] border border-white/10 bg-zinc-950/60 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end shadow-2xl">
          
          {/* Cybernetic overlay lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-10" />

          {/* SVG Map Backdrop Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1000 500" fill="none">
            {/* World grid dot matrix */}
            {Array.from({ length: 25 }).map((_, r) =>
              Array.from({ length: 50 }).map((_, c) => (
                <circle
                  key={`${r}-${c}`}
                  cx={c * 20 + 10}
                  cy={r * 20 + 10}
                  r="1.2"
                  fill="rgba(255,255,255,0.4)"
                />
              ))
            )}
            {/* Animated Laser connections */}
            <path
              d="M 250 210 Q 500 150, 480 150 T 720 190 Q 600 275, 320 340 Z"
              stroke="#8B5CF6"
              strokeWidth="0.8"
              strokeDasharray="4 8"
              className="glowing-dash-path"
            />
            <path
              d="M 480 150 Q 600 275, 850 310"
              stroke="#00D4FF"
              strokeWidth="0.8"
              strokeDasharray="2 6"
              className="glowing-dash-path"
            />
          </svg>

          {/* Hotspot Floating Pins */}
          {hotspots.map((spot, idx) => (
            <div
              key={idx}
              className="absolute group z-20 cursor-default"
              style={{ left: spot.x, top: spot.y }}
            >
              {/* Radar pulse */}
              <span className="absolute -inset-2 flex h-5 w-5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-blue-400"></span>
              </span>

              {/* Pin Tag */}
              <div className="ml-4 -mt-2.5 bg-black/90 border border-white/10 px-2.5 py-1.5 rounded-lg flex flex-col text-left shadow-lg scale-90 group-hover:scale-95 group-hover:border-blue-500/50 transition-all duration-300 max-w-[140px]">
                <span className="text-[9px] font-black text-white font-space-grotesk tracking-wide leading-none">{spot.name}</span>
                <span className="text-[7px] text-slate-500 mt-0.5 leading-tight">{spot.info}</span>
              </div>
            </div>
          ))}

          {/* Details strip */}
          <div className="relative z-20 flex justify-between items-center border-t border-white/5 pt-4 text-left">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="font-mono text-[9px] text-slate-400">Threat Data Sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
                <span className="font-mono text-[9px] text-slate-400">Active Expert Nodes</span>
              </div>
            </div>
            <span className="font-mono text-[8px] text-slate-600">JeztBrain Threat Intelligence Network — Real-Time Telemetry</span>
          </div>

        </div>
      </section>

      {/* 9. CLOSING SECTION */}
      <section className="py-32 px-6 lg:px-12 max-w-5xl mx-auto relative z-20 text-center space-y-10">
        <div className="inline-block px-3 py-1 rounded bg-[#6C4DFF]/10 border border-[#6C4DFF]/20">
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#6C4DFF] uppercase">
            JOIN JEZTBRAIN
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-space-grotesk tracking-tight uppercase leading-[1.1] max-w-4xl mx-auto">
          Protecting Digital Trust Through<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-[#6C4DFF] drop-shadow-[0_0_20px_rgba(108,77,255,0.2)]">
            Intelligence and Human Expertise
          </span>
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
          JeztBrain combines artificial intelligence, expert knowledge, and innovative cybersecurity technologies to help individuals and organizations stay ahead of evolving cyber threats. Our mission is simple: make cybersecurity faster, smarter, and accessible whenever it's needed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <Link
            to="/chat"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6C4DFF] to-blue-600 hover:opacity-95 text-white font-bold font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(108,77,255,0.3)]"
          >
            Talk to Expert
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/platform/jeztbrainspider"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-slate-200 hover:text-white font-bold font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/45"
          >
            Explore Platform
          </Link>
        </div>
      </section>

      {/* CSS glow dashes styling */}
      <style>{`
        @keyframes stroke-glow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        .glowing-dash-path {
          stroke-dasharray: 6 15;
          animation: stroke-glow 4s linear infinite;
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Database, Globe, Target, Search, GitMerge, Bug, Brain, TrendingUp,
  Shield, Cpu, AlertTriangle, Lock, FileText, BarChart2, Eye, Award
} from 'lucide-react';

/* ─── Canvas Spider Web Animation ──────────────────────────────────────────── */
function FullSpiderWebCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      drawWeb();
    };

    const drawSpider = (ctx, x, y, scale = 1.0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.95;

      // Abdomen
      ctx.beginPath();
      ctx.ellipse(0, 3, 3.2, 4.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cephalothorax
      ctx.beginPath();
      ctx.arc(0, -3, 2.1, 0, Math.PI * 2);
      ctx.fill();

      // Left Legs
      ctx.beginPath();
      ctx.moveTo(-1.5, -3);
      ctx.quadraticCurveTo(-6, -7, -11, -6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, -1);
      ctx.quadraticCurveTo(-8, -3, -12, -0.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, 1);
      ctx.quadraticCurveTo(-8, 3, -10, 7);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-1.5, 3);
      ctx.quadraticCurveTo(-6, 8, -8, 12);
      ctx.stroke();

      // Right Legs
      ctx.beginPath();
      ctx.moveTo(1.5, -3);
      ctx.quadraticCurveTo(6, -7, 11, -6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(2, -1);
      ctx.quadraticCurveTo(9, -3, 12, -0.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(2, 1);
      ctx.quadraticCurveTo(9, 4, 10, 7);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(1.5, 3);
      ctx.quadraticCurveTo(6, 8, 8, 12);
      ctx.stroke();

      ctx.restore();
    };

    const drawWeb = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Web lines (thin black)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.16)';
      ctx.lineWidth = 0.85;

      // Draw 3 offset radial spider webs to cover the page height beautifully
      const centers = [
        { cx: w * 0.8, cy: h * 0.15, numRadials: 14, numRings: 12, scale: 45 },
        { cx: w * 0.2, cy: h * 0.45, numRadials: 16, numRings: 14, scale: 50 },
        { cx: w * 0.75, cy: h * 0.78, numRadials: 14, numRings: 12, scale: 45 }
      ];

      centers.forEach(({ cx, cy, numRadials, numRings, scale }) => {
        // Draw radial web lines
        for (let i = 0; i < numRadials; i++) {
          const angle = (i * 2 * Math.PI) / numRadials;
          const endX = cx + Math.cos(angle) * 1400;
          const endY = cy + Math.sin(angle) * 1400;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }

        // Draw concentric rings
        for (let r = 1; r <= numRings; r++) {
          const radius = r * scale;
          ctx.beginPath();
          for (let i = 0; i <= numRadials; i++) {
            const angle = (i * 2 * Math.PI) / numRadials;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      });

      // Draw exactly 3 realistic black spiders
      // Spider #1: Top Web
      drawSpider(ctx, w * 0.76, h * 0.18, 1.25);
      
      // Spider #2: Mid Web
      drawSpider(ctx, w * 0.23, h * 0.48, 1.1);

      // Spider #3: Bottom Web
      drawSpider(ctx, w * 0.72, h * 0.75, 1.25);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ─── Capability Card (No Glassmorphism, Minimal Solid Borders) ───────────── */
function CapabilityCard({ icon: Icon, title, desc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="p-6 border border-black/40 bg-black/5 hover:bg-black/10 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded bg-black/10 text-black group-hover:bg-black group-hover:text-white transition-colors shrink-0">
          <Icon size={16} />
        </div>
        <h4 className="text-xs font-black text-black uppercase tracking-wider font-space-grotesk">{title}</h4>
      </div>
      <p className="text-black/85 text-[11.5px] leading-relaxed pl-11 font-medium">{desc}</p>
    </motion.div>
  );
}

/* ─── Main Platform Component ───────────────────────────────────────────────── */
export default function JeztBrainSpider() {
  const capabilities = [
    {
      icon: Database,
      title: "Threat Intelligence Collection",
      desc: "Collect intelligence from multiple trusted sources.",
      delay: 0.05
    },
    {
      icon: Globe,
      title: "Infrastructure Discovery",
      desc: "Identify malicious domains, servers, phishing kits, and attacker infrastructure.",
      delay: 0.1
    },
    {
      icon: Target,
      title: "Threat Actor Tracking",
      desc: "Understand attacker behavior, campaigns, and tactics.",
      delay: 0.15
    },
    {
      icon: Search,
      title: "Dark Web Intelligence",
      desc: "Monitor exposed assets and underground activity.",
      delay: 0.2
    },
    {
      icon: GitMerge,
      title: "Campaign Correlation",
      desc: "Connect indicators across multiple attack campaigns.",
      delay: 0.25
    },
    {
      icon: Bug,
      title: "Malware Intelligence",
      desc: "Analyze malware behavior and map relationships.",
      delay: 0.3
    },
    {
      icon: Brain,
      title: "AI Strategic Intelligence",
      desc: "Transform technical intelligence into prioritized recommendations for faster decision-making.",
      delay: 0.35
    },
    {
      icon: TrendingUp,
      title: "Predictive Threat Analysis",
      desc: "Identify emerging attack trends before they impact organizations.",
      delay: 0.4
    }
  ];

  const proFeatures = [
    { name: "Advanced AI Intelligence", icon: Cpu },
    { name: "Predictive Threat Modeling", icon: TrendingUp },
    { name: "Executive Intelligence Reports", icon: FileText },
    { name: "Threat Forecasting", icon: AlertTriangle },
    { name: "Cross-Organization Intelligence Correlation", icon: GitMerge },
    { name: "AI Copilot Assistance", icon: Brain },
    { name: "Strategic Threat Prioritization", icon: Shield },
    { name: "Enterprise Intelligence Dashboards", icon: BarChart2 },
    { name: "Global Infrastructure Visibility", icon: Globe }
  ];

  return (
    <div className="w-full min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-black selection:text-[#A30000]">
      
      {/* ─── PAGE TRANSITION TOP SECTION ─── */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black via-[#170208] to-[#850000] z-10 pointer-events-none" />

      {/* ─── JEZTBRAINSPIDER STANDARD (DEEP RED THEME) ─── */}
      <section className="relative w-full bg-gradient-to-b from-[#850000] to-[#A30000] text-black py-32 z-20">
        
        {/* Full-width canvas spider web covering the entire standard section */}
        <FullSpiderWebCanvas />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Hero Content */}
          <div className="max-w-4xl text-left space-y-6 mb-24 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-black/10 border border-black/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-black uppercase">
                CORE INTELLIGENCE ENGINE
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl xl:text-7xl font-black font-space-grotesk tracking-tight leading-[1.02] text-black"
              >
                Introducing JeztBrainSpider
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl font-bold text-black font-space-grotesk tracking-wide leading-snug"
              >
                The Intelligence Engine Behind Instant Response.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-black/85 text-sm sm:text-base leading-relaxed max-w-[760px] font-medium"
              >
                JeztBrainSpider continuously discovers attacker infrastructure, analyzes cyber threats, correlates intelligence, and delivers actionable insights that power JeztBrain.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-black/85 text-sm sm:text-base leading-relaxed max-w-[760px] font-medium"
              >
                By combining advanced intelligence collection with AI-assisted strategic analysis, JeztBrainSpider enables organizations to detect threats earlier, understand attacker behavior, and accelerate response decisions.
              </motion.p>
            </div>
          </div>

          {/* Why JeztBrainSpider Section */}
          <div className="border-t border-black/25 pt-20 mb-24 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <h3 className="text-3xl md:text-4xl font-black text-black font-space-grotesk tracking-tight leading-none">
                  Built For Intelligence.<br />Designed For Response.
                </h3>
              </div>
              <div className="lg:col-span-7">
                <p className="text-black/85 text-sm sm:text-base leading-relaxed font-medium">
                  Traditional security tools generate alerts. JeztBrainSpider generates intelligence. It transforms millions of indicators into meaningful context, allowing organizations to respond faster and with greater confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="space-y-8 text-left mb-24">
            <h3 className="text-xl font-black text-black uppercase tracking-wider font-space-grotesk">
              Core Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap, idx) => (
                <CapabilityCard key={idx} {...cap} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── JEZTBRAINSPIDER PRO (BLACK AND GOLD THEME) ─── */}
      <section className="relative w-full bg-black text-white py-28 z-20 border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none z-0 blur-[100px]" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Header */}
          <div className="max-w-4xl text-left space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                ENTERPRISE TIER
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black font-space-grotesk tracking-tight leading-none text-white">
                JeztBrainSpider <span className="text-[#D4AF37]">Pro</span>
              </h2>
              
              <h3 className="text-lg font-bold text-slate-300 font-space-grotesk tracking-wide leading-snug">
                Enterprise Intelligence Without Limits.
              </h3>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-[700px] font-light">
                Built for organizations requiring deeper visibility, predictive intelligence, and advanced cyber defense capabilities.
              </p>
            </div>
          </div>

          {/* Pro Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mb-24">
            {proFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 border border-white/5 bg-[#080808] hover:border-[#D4AF37]/20 transition-all duration-300 group rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
                      <Icon size={16} />
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider font-space-grotesk">{feat.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="border-t border-white/5 pt-20 text-center max-w-3xl mx-auto space-y-8">
            <h3 className="text-3xl md:text-4xl font-black text-white font-space-grotesk tracking-tight leading-none">
              Experience the Intelligence Behind Instant Response.
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth?signup=true"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_4px_25px_rgba(220,38,38,0.2)]"
              >
                Explore JeztBrainSpider
              </Link>

              <Link
                to="/chat"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#D4AF37]/20 bg-[#0E0104] hover:bg-[#D4AF37]/5 text-[#D4AF37] font-bold transition-all text-[11px] font-mono uppercase tracking-widest rounded-xl"
              >
                Discover JeztBrainSpider Pro
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

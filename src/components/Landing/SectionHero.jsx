import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function SectionHero() {
  const trustBadges = [
    "AI Threat Detection",
    "24/7 Verified Experts",
    "Rapid Incident Containment"
  ];

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between bg-white text-slate-900 overflow-hidden pt-36 pb-20 selection:bg-purple-100">
      
      {/* ── Background Soft Glows & Line Accents ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Soft Radial Gradient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-blue-100/40 via-purple-100/40 to-cyan-100/30 blur-3xl opacity-70" />
        
        {/* Abstract Light Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-20 w-full flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center text-center py-8">
          
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100/90 border border-slate-200 shadow-sm text-xs font-semibold font-mono text-slate-700"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-slate-900 font-bold uppercase tracking-wider">AI-POWERED THREAT INTELLIGENCE PLATFORM</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.08] text-slate-900 text-center"
          >
            Intelligent Cybersecurity.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Faster Incident Response.
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-[720px] text-center font-normal"
          >
            JeztBrain brings AI-powered threat intelligence, incident investigation, and verified cybersecurity expertise together in one connected platform. Detect threats, understand risks, and respond with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/platform/jeztbrainspider"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-white" />
              Explore JeztBrain
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-bold font-mono text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
            >
              Talk to a Cybersecurity Expert
            </Link>
          </motion.div>

          {/* Trust Indicator Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-600"
          >
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>

        </div>

      </div>

    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, Activity } from 'lucide-react';

export default function EnterpriseHero() {
  const stats = [
    { label: "Containment Guarantee", val: "< 15 minutes", icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { label: "Active Cyber Handlers", val: "200+ Vetted", icon: Users, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
    { label: "Events Monitored Daily", val: "4.8 Billion", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-black text-white overflow-hidden pt-44 pb-20 selection:bg-purple-500/30 selection:text-white">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hq_building_night.jpg"
          alt="JeztBrain corporate headquarters office at dusk"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-[15s] hover:scale-105"
        />
        {/* Soft radial overlay letting the background show clearly while keeping text perfectly legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/85 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.7)_100%)] z-10" />
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto space-y-12 flex flex-col items-center">

          {/* Title and support block */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black font-space-grotesk tracking-tight leading-[1.02] text-white uppercase"
            >
              Detect. Analyze<br />
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C4DFF] via-blue-500 to-[#2FA8FF] drop-shadow-[0_0_35px_rgba(108,77,255,0.3)]">
                Respond Instantly.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-[800px] font-light mx-auto"
            >
              JeztBrain is a AI-powered cybersecurity platform that directly connects organizations and individuals with vetted cybersecurity experts for real-world cyber incident response, threat intelligence, and proactive security services.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <Link
              to="/chat"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6C4DFF] to-blue-600 hover:opacity-95 text-white font-bold font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(108,77,255,0.35)]"
            >
              Talk to Expert
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#spider-pro"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/25 bg-white/5 backdrop-blur-md text-slate-200 hover:text-white font-bold font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              Explore Platform
            </a>
          </motion.div>

        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border border-white/10 w-full bg-white/5 backdrop-blur-xl rounded-3xl px-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4 text-left justify-start md:justify-center group">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center border ${stat.border} transition-all duration-300 group-hover:scale-105`}>
                  <Icon size={20} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <p className="text-lg font-black text-white font-space-grotesk tracking-tight">
                    {stat.val}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

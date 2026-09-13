import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SectionFinalCTA() {
  return (
    <section id="contact" className="relative w-full py-28 bg-[#0A0F1F] text-white overflow-hidden border-b border-slate-800">
      
      {/* Background Cyber Illustration */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/robotic_eagle_city_hd.png"
          alt="JeztBrain AI Robotic Eagle Guardian Defense"
          className="w-full h-full object-cover object-center opacity-30 contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F]/90 via-[#0A0F1F]/70 to-[#0A0F1F]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#1E293B]/90 to-[#0A0F1F]/95 p-10 sm:p-16 border border-emerald-500/30 text-center space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            24/7 INCIDENT RESPONSE ACTIVE
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-space-grotesk">
            Ready to Strengthen Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Cybersecurity Posture?
            </span>
          </h2>

          <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you're facing an active cyber incident or looking to improve your security posture, JeztBrain is here to help. Connect with verified cybersecurity experts and experience intelligent digital protection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-white" />
              Talk to an Expert
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/auth?signup=true"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Get Started Today
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SLA &lt; 15 Mins</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 200+ Vetted Responders</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified</span>
          </div>

        </div>

      </div>
    </section>
  );
}

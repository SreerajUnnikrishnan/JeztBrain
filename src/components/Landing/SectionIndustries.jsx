import React from 'react';
import { User, Rocket, Building, Server, Stethoscope, Landmark, GraduationCap, ShieldCheck } from 'lucide-react';

export default function SectionIndustries() {
  const industries = [
    { name: "Individuals", icon: User, desc: "Personal identity, scam defense, and home network threat protection." },
    { name: "Startups", icon: Rocket, desc: "Rapid SOC setup, compliance audits, and scalable cloud telemetry." },
    { name: "Small Businesses", icon: Building, desc: "Turnkey ransomware containment and managed expert support." },
    { name: "Enterprises", icon: Server, desc: "Autonomous Spider Pro command centre for complex multi-cloud pods." },
    { name: "Healthcare", icon: Stethoscope, desc: "HIPAA-compliant telemetry encryption and patient data shielding." },
    { name: "Finance", icon: Landmark, desc: "PCI-DSS certified trading networks with zero-day fraud prevention." },
    { name: "Education", icon: GraduationCap, desc: "Campus network access security and research data protection." },
    { name: "Government", icon: ShieldCheck, desc: "Public sector defense compliance meeting national security standards." }
  ];

  return (
    <section className="relative w-full min-h-[850px] flex flex-col justify-center bg-[#0F172A] text-white py-24 md:py-32 font-sans border-b border-blue-900/50">
      
      {/* Background Graphic Illustration */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/skyline_bg.png"
          alt="Global Threat Intelligence World Map Industries"
          className="w-full h-full object-cover object-center opacity-25 contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/95 via-[#0F172A]/85 to-[#0F172A]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full space-y-16">
        
        {/* Header Block */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase">
            WHO WE SERVE
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-space-grotesk">
            Cybersecurity Built<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
              For Every Industry.
            </span>
          </h2>

          <p className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            Every industry faces unique cybersecurity challenges. JeztBrain delivers tailored protection, expert guidance, and AI-powered intelligence for organisations of every size.
          </p>
        </div>

        {/* 8-Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-blue-500/60 transition-all text-left space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white font-space-grotesk">{ind.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{ind.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

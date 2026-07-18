import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Briefcase, MapPin } from 'lucide-react';

export default function OurExperts() {
  const experts = [
    {
      name: "Marcus Vance",
      role: "Principal Incident Handler",
      cert: "GIAC / GCIH Certified",
      clearance: "Level 3 Access",
      dept: "Crisis Response Unit",
      location: "San Francisco Office",
      theme: "border-blue-500/30",
      accent: "bg-blue-600"
    },
    {
      name: "Eleanor Sterling",
      role: "Lead Malware Commander",
      cert: "GREM / OSCP Certified",
      clearance: "Level 3 Access",
      dept: "Reverse Engineering Lab",
      location: "New York HQ",
      theme: "border-purple-500/30",
      accent: "bg-[#6C4DFF]"
    },
    {
      name: "Dr. Kenji Tanaka",
      role: "Principal Cryptographer",
      cert: "CISSP / CISM Certified",
      clearance: "Level 4 Clearance",
      dept: "Applied Cryptography",
      location: "Tokyo Operations Hub",
      theme: "border-orange-500/30",
      accent: "bg-orange-600"
    },
    {
      name: "Sarah Jenkins",
      role: "Director of SOC Operations",
      cert: "GCIA / CISA Certified",
      clearance: "Level 3 Access",
      dept: "Managed Monitoring",
      location: "London Command Center",
      theme: "border-green-500/30",
      accent: "bg-green-600"
    }
  ];

  return (
    <section className="relative w-full min-h-[750px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-white">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/capabilities_global_collaboration.png"
          alt="JeztBrain corporate incident handlers collaborating"
          className="w-full h-full object-cover object-center brightness-95"
        />
        {/* Modern white gradient overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-blue-50/20 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
            Vetted Security Staff
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Elite Vetted Handlers.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-[#6C4DFF] to-purple-600">
              Verified Operational Expertise.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Our teams do not hide behind anonymous masks or hacker clothing. We are certified professionals operating in high-security, formal corporate environments, ready to triage and contain incidents under strict SLA windows.
          </p>
        </div>

        {/* Experts Cards Grid (Styled like Corporate ID Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`bg-white/95 backdrop-blur-xl border-t-4 ${exp.theme} border border-slate-200/80 rounded-2xl p-6 text-left flex flex-col justify-between min-h-[360px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group`}
            >
              {/* Badge Header ID card accent */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1.5 ${exp.accent} rounded-b-md`} />

              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Clearance</span>
                    <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-700 text-[9px] font-bold font-mono">
                      {exp.clearance}
                    </span>
                  </div>

                  {/* Glowing Green Active Dot */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-green-600">ACTIVE</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900 font-space-grotesk tracking-tight uppercase leading-none">
                    {exp.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold">
                    <Briefcase size={12} />
                    <span>{exp.role}</span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Award size={13} className="text-blue-500 shrink-0" />
                    <span>{exp.cert}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={13} className="text-blue-500 shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Barcode */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col items-center">
                <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#1e293b_2px,#1e293b_4px)] opacity-25" />
                <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase tracking-widest font-bold">
                  {exp.dept}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Briefcase, Zap } from 'lucide-react';

export default function CompanyCulture() {
  const hubs = [
    { title: 'Global Operations Hub', desc: 'Secure war rooms where operators analyze and coordinate active remediation workflows.' },
    { title: 'AI Research Laboratory', desc: 'Engineering labs refining sequence modeling, anomaly heuristics, and ML frameworks.' },
    { title: 'Innovation & Briefing Centers', desc: 'Glass-walled conference hubs hosting technical discussions and regulatory compliance reviews.' },
    { title: 'Operator Training Center', desc: 'Interactive simulators replicating persistent adversary attacks and containment playbooks.' }
  ];

  return (
    <section className="relative py-28 bg-[#F9FAFB] text-[#1F2937] border-b border-slate-100 overflow-hidden font-sans">
      
      {/* Subtle background glow */}
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(109,74,255,0.01),transparent_70%)] pointer-events-none z-0 blur-[100px]" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-6 text-left space-y-4">
            <span className="text-xs font-bold text-[#6D4AFF] tracking-[0.25em] uppercase font-mono">
              Workspaces & People
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F1117] font-space-grotesk tracking-tight leading-tight">
              A Culture of Defensive Excellence.
            </h2>
          </div>
          <div className="lg:col-span-6 text-left lg:pt-8">
            <p className="text-[#4B5563] text-base leading-relaxed font-light font-sans">
              Inside our global headquarters and regional centers, security engineers, threat analysts, and data scientists collaborate in natural-light glass workspaces. We maintain a high-trust, formal-dress, badge-secured environment built for defense innovation.
            </p>
          </div>
        </div>

        {/* Culture Split Section (No Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: HQ Glass Office Collaborative Hub Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.03)] aspect-[16/10] group">
              <img
                src="/images/company_culture.png"
                alt="JeztBrain Modern Office Collaboration Space"
                className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
              />
            </div>
          </motion.div>

          {/* Right Column: Key Culture Areas (Minimal list, no card backgrounds) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            {hubs.map((hub, idx) => (
              <div key={idx} className="pb-6 border-b border-slate-200/60 last:border-b-0 space-y-1.5">
                <h4 className="text-sm font-bold text-[#0F1117] tracking-tight">{hub.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{hub.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

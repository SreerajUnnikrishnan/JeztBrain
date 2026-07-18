import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Globe } from 'lucide-react';

export default function MissionAndResponse() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "AI-Powered Defense",
      desc: "Autonomous threat detection and intelligent heuristic analysis."
    },
    {
      icon: Target,
      title: "Instant Response",
      desc: "Reduce threat containment latency from hours to milliseconds."
    },
    {
      icon: Users,
      title: "Expert-Driven",
      desc: "Certified cybersecurity specialists standing by 24/7."
    },
    {
      icon: Globe,
      title: "Global Intelligence",
      desc: "Real-time threat feeds aggregated from distributed sensors."
    }
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#1F2937] relative font-sans overflow-hidden">
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(109,74,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(109,74,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] opacity-100 pointer-events-none" />

      {/* ─── TOP SECTION: ENTERPRISE CYBER DEFENSE ─── */}
      <section className="relative w-full pt-32 pb-24 max-w-[1440px] mx-auto px-6 lg:px-12 z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold text-[#6D4AFF] tracking-[0.2em] uppercase font-mono"
            >
              Enterprise Cyber Defense
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#0F1117] font-space-grotesk"
            >
              Defending Enterprise Infrastructure.<br />
              <span className="text-[#6D4AFF]">Accelerating Response.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#4B5563] text-base md:text-lg leading-relaxed max-w-[640px] font-normal"
            >
              JeztBrain is dedicated to bridging the critical latency gap between threat discovery and mitigation. We combine autonomous threat analysis with a vetted team of global security professionals to safeguard large-scale corporate networks, block persistent threat actors, and maintain business operations under any condition.
            </motion.p>
          </div>

          {/* Right Column: Visual illustration of network safety status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400">NETWORK DEFENSE NODES</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold font-mono">ALL ACTIVE</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Cloud Gateways", status: "Secure", ip: "10.0.4.1" },
                  { name: "Endpoint Telemetry", status: "Auditing", ip: "192.168.10.42" },
                  { name: "Database Firewalls", status: "Protected", ip: "172.16.254.1" }
                ].map((node, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-slate-800">{node.name}</span>
                    </div>
                    <span className="font-mono text-slate-400">{node.ip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars Showcase (Horizontal row layout, clean minimalist styling) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-20 mt-12 border-t border-slate-200/60 w-full"
        >
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#6D4AFF]/5 text-[#6D4AFF] flex items-center justify-center border border-[#6D4AFF]/10">
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-bold text-[#0F1117] tracking-tight">{item.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── BOTTOM SECTION: OUR MISSION ─── */}
      <section className="relative w-full py-28 border-t border-slate-200/60 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Glass Office Building at Night */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_15px_45px_rgba(0,0,0,0.04)] aspect-[4/3] max-w-full">
                <img
                  src="/images/office_building_night.png"
                  alt="JeztBrain modern office architecture at night"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column: Mission Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#6D4AFF] tracking-[0.2em] uppercase font-mono">
                  Our Mission
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-[44px] font-black text-[#0F1117] tracking-tight leading-tight font-space-grotesk">
                  Reducing Response Time To Seconds.
                </h3>
              </div>

              <div className="space-y-6 text-[#4B5563] text-base leading-relaxed font-normal">
                <p>
                  Every second matters during a cyber incident. JeztBrain exists to eliminate the gap between cyber attack detection and effective response.
                </p>
                <p>
                  We empower organizations with AI-driven intelligence, experienced experts, and automation to stop threats before they cause real damage.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}

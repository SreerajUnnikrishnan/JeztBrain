import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Eye, Users, Globe } from 'lucide-react';

const ResilienceCard = ({ title, desc, imgSrc, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white border border-slate-200 p-8 rounded-2xl group hover:border-violet-400/50 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(123,47,247,0.12)] hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden h-[420px]"
  >
    {/* Accent Hover Bar */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div>
      {/* Realistic Image Header */}
      <div className="w-full h-40 mb-6 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative group-hover:border-violet-400/40 transition-all duration-300">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 group-hover:scale-105 group-hover:bg-violet-100 transition-all duration-300">
          <Icon size={18} />
        </div>
        <h3 className="text-base font-bold text-slate-800 tracking-wide font-space-grotesk">{title}</h3>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function PlatformCapabilities() {
  const cards = [
    {
      title: "Zero-Day Protection",
      desc: "Behavioral analysis identifies and neutralizes unknown exploit chains instantly before execution in system memory.",
      imgSrc: "/images/resilience_zero_day_protection.png",
      icon: ShieldCheck
    },
    {
      title: "Instant Response",
      desc: "Elite incident response operators working in a cyber war room to contain active threat actors in under 5 minutes.",
      imgSrc: "/images/resilience_instant_response.png",
      icon: Zap
    },
    {
      title: "Secure Infrastructure",
      desc: "Protected cloud hosting environments and enterprise grade network perimeter shielding to block exposure paths.",
      imgSrc: "/images/resilience_secure_infrastructure.png",
      icon: Lock
    },
    {
      title: "Threat Containment",
      desc: "Live automated threat containment isolating malicious vectors inside sandboxed boundaries and secure segments.",
      imgSrc: "/images/resilience_threat_containment.png",
      icon: Eye
    },
    {
      title: "Adversary Intelligence",
      desc: "Deep tracking, reverse mapping, and threat attribution of advanced persistent threat (APT) actor groups.",
      imgSrc: "/images/resilience_adversary_intelligence.png",
      icon: Users
    },
    {
      title: "Global Defense Network",
      desc: "Connected worldwide security operations center telemetry sharing for instant immunization across corporate networks.",
      imgSrc: "/images/resilience_global_defense_network.png",
      icon: Globe
    }
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden z-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-12 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 font-space-grotesk">
              Engineered for resilience.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              A unified security architecture built for the most demanding enterprise networks globally.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <ResilienceCard key={i} {...card} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

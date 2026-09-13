import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, ShieldAlert, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionWhyJeztBrain() {
  const featureCards = [
    {
      title: "AI Intelligence",
      desc: "Smart threat detection and analysis powered by autonomous machine learning models.",
      icon: Brain,
      color: "text-blue-600",
      bg: "bg-blue-50/80 border-blue-100"
    },
    {
      title: "Expert Connect",
      desc: "Direct access to verified cybersecurity professionals for rapid incident containment.",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50/80 border-purple-100"
    },
    {
      title: "Incident Response",
      desc: "Structured investigation, active containment, and guided threat recovery protocols.",
      icon: ShieldAlert,
      color: "text-indigo-600",
      bg: "bg-indigo-50/80 border-indigo-100"
    },
    {
      title: "Enterprise Security",
      desc: "Advanced digital protection, telemetry monitoring, and defense architecture for organizations.",
      icon: Building2,
      color: "text-cyan-600",
      bg: "bg-cyan-50/80 border-cyan-100"
    }
  ];

  return (
    <section className="relative w-full bg-slate-50 text-slate-900 py-24 lg:py-32 font-sans border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Subtle Wave Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg className="w-full h-full text-slate-200" fill="none" viewBox="0 0 1440 600">
          <path d="M0 100 C 300 200, 600 0, 900 150 C 1200 300, 1440 100, 1440 100 L 1440 600 L 0 600 Z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        
        {/* Asymmetric Header & Ecosystem Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Heading & Explanation */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
              ABOUT JEZTBRAIN PLATFORM
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.12]">
              One Connected Ecosystem for Digital Defense.
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
              JeztBrain connects AI-powered intelligence, cybersecurity experts, and advanced security technologies to help individuals, businesses, and enterprises detect threats, investigate incidents, and strengthen their digital defenses.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Unified AI telemetry and human specialist triage</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Real-time threat disruption & SLA containment</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Proactive enterprise risk posture management</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
              >
                Learn More About Our Ecosystem <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Cybersecurity Ecosystem Visual Diagram */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-white p-8 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">CYBER DEFENSE MATRIX ARCHITECTURE</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">ECOSYSTEM ACTIVE</span>
              </div>

              {/* Ecosystem Grid Diagram */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 hover:border-blue-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">AI Node</h4>
                  <p className="text-xs text-slate-500">Autonomous pattern recognition & anomaly triage.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 hover:border-purple-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Expert Node</h4>
                  <p className="text-xs text-slate-500">200+ Vetted Tier-3 incident response handlers.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 hover:border-indigo-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Response Node</h4>
                  <p className="text-xs text-slate-500">Rapid threat containment & forensic recovery.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 hover:border-cyan-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Enterprise Node</h4>
                  <p className="text-xs text-slate-500">Centralized SOC posture & regulatory compliance.</p>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4 Feature Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all text-left space-y-4`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

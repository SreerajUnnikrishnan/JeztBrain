import React from 'react';
import { motion } from 'framer-motion';
import { MailCheck, UserCheck, ShieldAlert, Zap, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function CustomerJourneyTimeline() {
  const steps = [
    {
      title: "Customer Contacts JeztBrain",
      desc: "Victims submit breach telemetry or emergency logs directly to our dispatch portal.",
      icon: MailCheck,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
    {
      title: "Expert Assigned",
      desc: "A verified incident response commander is assigned to the ticket in less than three minutes.",
      icon: UserCheck,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
    {
      title: "Threat Investigation",
      desc: "Security analysts audit logs and reverse-engineer active vectors using JeztBrainSpider databases.",
      icon: ShieldAlert,
      color: "text-[#6C4DFF]",
      bg: "bg-[#6C4DFF]/10",
      border: "border-[#6C4DFF]/20"
    },
    {
      title: "Containment Operations",
      desc: "Automated and manual playbooks execute immediately to isolate endpoints and quarantine vectors.",
      icon: Zap,
      color: "text-[#6C4DFF]",
      bg: "bg-[#6C4DFF]/10",
      border: "border-[#6C4DFF]/20"
    },
    {
      title: "System Recovery",
      desc: "Credential rotation, database remediation, and server restoration are executed back to secure baselines.",
      icon: HeartHandshake,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      title: "Future Protection",
      desc: "Deploying continuous monitoring models and Spider Pro agents to prevent adversary reinjection.",
      icon: ShieldCheck,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    }
  ];

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-white">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/capabilities_incident_response.png"
          alt="JeztBrain incident containment and recovery team"
          className="w-full h-full object-cover object-center brightness-95 opacity-80"
        />
        {/* White and Blue theme gradient overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-blue-50/20 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
            Defensive Pipeline
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            How We Protect You.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-[#6C4DFF] to-purple-600">
              The Containment Journey.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            We move rapidly from initial incident identification to final perimeter hardening. Here is our step-by-step engagement workflow.
          </p>
        </div>

        {/* Horizontal Timeline Layout */}
        <div className="relative pt-8 pb-12 w-full overflow-x-auto lg:overflow-x-visible">
          {/* Connector line */}
          <div className="absolute top-[40px] left-[5%] right-[5%] h-[2px] bg-slate-200 hidden lg:block z-0" />

          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "90%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-[40px] left-[5%] h-[2px] bg-gradient-to-r from-orange-500 via-[#6C4DFF] to-green-500 hidden lg:block z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 min-w-[900px] md:min-w-0 z-10 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-col items-start text-left space-y-4 group"
                >
                  {/* Glowing Node Circle */}
                  <div className={`w-12 h-12 rounded-full bg-white border-2 border-slate-200 ${step.color} flex items-center justify-center transition-all duration-300 shadow-sm relative z-10 group-hover:scale-110 group-hover:border-slate-300`}>
                    <Icon size={18} />
                  </div>

                  {/* Card description (Vibrant top border highlight corresponding to the stage) */}
                  <div className={`w-full p-5 bg-white/90 backdrop-blur-xl border-t-2 ${step.border} border border-slate-200 rounded-xl space-y-1.5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1`}>
                    <span className={`font-mono text-[9px] font-bold ${step.color} block uppercase tracking-wider`}>
                      Phase {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide font-space-grotesk leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 leading-normal font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

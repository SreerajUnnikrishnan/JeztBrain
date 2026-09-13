import React from 'react';
import { Cpu, Zap, Lock, Layers, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function SectionTrustAdvantages() {
  const advantages = [
    {
      step: "01",
      title: "AI + Human Expertise",
      desc: "Synergy of autonomous JeztBrainSpider AI triage combined with 200+ tier-3 verified human analysts.",
      icon: Cpu
    },
    {
      step: "02",
      title: "Fast Response SLA",
      desc: "Guaranteed incident containment under 15 minutes to halt ransomware and data exfiltration.",
      icon: Zap
    },
    {
      step: "03",
      title: "Privacy-First Architecture",
      desc: "Privacy-first infrastructure utilizing secure encryption and strict data protection practices for user telemetry.",
      icon: Lock
    },
    {
      step: "04",
      title: "Scalable Platform",
      desc: "Seamless protection ranging from single end-user devices to multi-cloud enterprise Kubernetes clusters.",
      icon: Layers
    },
    {
      step: "05",
      title: "Continuous Innovation",
      desc: "Dedicated advanced research lab updating threat correlation models against zero-day exploit vectors.",
      icon: Lightbulb
    }
  ];

  return (
    <section className="relative w-full min-h-[900px] flex flex-col justify-center bg-[#F8FAFC] text-slate-900 py-24 md:py-32 font-sans border-b border-slate-200">
      
      {/* Background Graphic Illustration */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/card_digital_forensics.png"
          alt="Digital Shield Cyber Trust Network"
          className="w-full h-full object-cover object-center opacity-20 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/90 via-white/80 to-[#F8FAFC]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full space-y-16">
        
        {/* Header Block */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-widest uppercase border border-emerald-200 shadow-sm">
            WHY CHOOSE US
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Trusted Technology.<br />
            <span className="text-emerald-600">
              Human Expertise.
            </span>
          </h2>

          <p className="text-slate-600 font-semibold text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-jakarta">
            JeztBrain combines intelligent automation with experienced cybersecurity professionals to deliver practical, accurate, and effective protection. Our platform is built around speed, transparency, and real-world incident response.
          </p>
        </div>

        {/* Timeline / Feature Advantages Stack */}
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition-all shadow-sm flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                  {adv.step}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 font-space-grotesk">{adv.title}</h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{adv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

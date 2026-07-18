import React from 'react';
import { Check, X } from 'lucide-react';

export default function WhyChooseJeztBrain() {
  const comparison = [
    {
      feature: "Direct Expert Access",
      traditional: "Tickets routed through standard tiered customer support queues.",
      jeztbrain: "Immediate dispatch routing directly to vetted incident response specialists.",
      supported: true
    },
    {
      feature: "Human + AI Integration",
      traditional: "Disconnected detection software alerting without analyst context.",
      jeztbrain: "AI telemetry correlation unified with active handler command.",
      supported: true
    },
    {
      feature: "Rapid Incident Response",
      traditional: "Hours or days delay before forensic specialists review breach alerts.",
      jeztbrain: "SLA containment execution within under fifteen minutes.",
      supported: true
    },
    {
      feature: "Threat Intelligence Core",
      traditional: "Third-party generic feeds mapping outdated IP lists.",
      jeztbrain: "Dynamic infrastructure scans compiled by JeztBrainSpider.",
      supported: true
    },
    {
      feature: "Client Cyber Education",
      traditional: "Simple compliance checklists with no post-incident review.",
      jeztbrain: "Detailed tabletop simulations and awareness loops.",
      supported: true
    },
    {
      feature: "Long-term Protection",
      traditional: "Reactive remediation that leaves core vulnerability unaddressed.",
      jeztbrain: "Continuous monitoring models and Spider Pro agents.",
      supported: true
    }
  ];

  return (
    <section id="why-choose-jeztbrain" className="relative w-full min-h-[800px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-[#F9FAFB]">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/attack_surface.png"
          alt="JeztBrain corporate threat vector attack surface infographic backdrop"
          className="w-full h-full object-cover object-center brightness-95 opacity-80"
        />
        {/* Modern white gradient overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-blue-50/20 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
            Market Comparison
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Why Choose JeztBrain.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-[#6C4DFF] to-purple-600">
              The Next-Gen Standard.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Compare our direct-to-expert workflow and autonomous threat tracing models with traditional cybersecurity approaches.
          </p>
        </div>

        {/* Infographic Comparison Table */}
        <div className="w-full overflow-x-auto bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-250 bg-slate-50/50">
                <th className="p-6 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest w-[25%]">Core Capability</th>
                <th className="p-6 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest w-[37.5%]">Traditional Security Vendors</th>
                <th className="p-6 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest w-[37.5%] bg-blue-50/30">JeztBrain System</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                  {/* Feature Name */}
                  <td className="p-6 font-black text-slate-900 text-sm font-space-grotesk tracking-wide uppercase">
                    {item.feature}
                  </td>

                  {/* Traditional Vendor */}
                  <td className="p-6 text-xs text-slate-500 font-light leading-relaxed flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={12} strokeWidth={3} />
                    </div>
                    <span>{item.traditional}</span>
                  </td>

                  {/* JeztBrain Approach */}
                  <td className="p-6 text-xs text-slate-700 font-normal leading-relaxed bg-blue-50/10 border-l border-r border-blue-100/30">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-slate-900">{item.jeztbrain}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

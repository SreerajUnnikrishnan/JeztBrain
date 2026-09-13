import React from 'react';
import { Shield, Users, Cpu, Search, Globe, Zap, CheckCircle } from 'lucide-react';

export default function EnterpriseServices() {
  const services = [
    {
      icon: Shield,
      title: "Incident Response",
      desc: "Immediate investigation, containment, and recovery from cyber incidents.",
      iconBg: "bg-blue-100 text-blue-600 border-blue-200"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      desc: "Connect directly with verified cybersecurity experts for guidance and technical support.",
      iconBg: "bg-purple-100 text-purple-600 border-purple-200"
    },
    {
      icon: Cpu,
      title: "AI Threat Analysis",
      desc: "Analyze suspicious files, URLs, emails, and attack indicators using intelligent AI.",
      iconBg: "bg-cyan-100 text-cyan-600 border-cyan-200"
    },
    {
      icon: Search,
      title: "Threat Hunting",
      desc: "Proactively identify hidden threats before they impact your systems.",
      iconBg: "bg-indigo-100 text-indigo-600 border-indigo-200"
    },
    {
      icon: Globe,
      title: "Security Assessment",
      desc: "Evaluate your security posture, identify vulnerabilities, and improve defenses.",
      iconBg: "bg-emerald-100 text-emerald-600 border-emerald-200"
    },
    {
      icon: Zap,
      title: "Automated Containment",
      desc: "Instant isolation of malicious network traffic and compromised endpoints.",
      iconBg: "bg-rose-100 text-rose-600 border-rose-200"
    }
  ];

  const whyBenefits = [
    "AI + Human Expertise",
    "Fast Incident Response",
    "Enterprise-Grade Security",
    "Privacy-First Architecture",
    "Real-Time Intelligence",
    "Built for Everyone"
  ];

  return (
    <section id="services" className="relative w-full bg-slate-50 text-slate-900 py-24 md:py-32 font-sans border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-20 w-full flex-1 flex flex-col justify-between">

        <div className="space-y-12 text-center w-full">

          {/* Header Info */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
              OUR CYBERSECURITY SERVICES
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Expert Protection.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                Intelligent Solutions.
              </span>
            </h2>

            <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Comprehensive cybersecurity services designed to help individuals, startups, businesses, and enterprises prevent, detect, investigate, and recover from modern cyber threats.
            </p>
          </div>

          {/* Strategic Advantages Checklist */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto py-2">
            {whyBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <CheckCircle size={14} className="text-blue-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 font-sora">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-[1280px] mx-auto">
            {services.map((svc, idx) => {
              const IconComponent = svc.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${svc.iconBg}`}>
                    <IconComponent size={22} />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold text-slate-900 font-sora">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

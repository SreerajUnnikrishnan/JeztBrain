import React from 'react';
import { Shield, Users, Cpu, Search, Globe, Activity, CheckCircle, Zap } from 'lucide-react';

export default function EnterpriseServices() {
  const services = [
    {
      icon: Shield,
      title: "Incident Response",
      desc: "Immediate investigation, containment, and recovery from cyber incidents.",
      color: "hover:border-[#2563EB] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
      iconBg: "bg-[#2563EB]/10 border border-[#2563EB]/20 group-hover:bg-[#2563EB] group-hover:text-white",
      iconText: "text-[#2563EB]"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      desc: "Connect directly with verified cybersecurity experts for guidance and technical support.",
      color: "hover:border-[#6D28D9] group-hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]",
      iconBg: "bg-[#6D28D9]/10 border border-[#6D28D9]/20 group-hover:bg-[#6D28D9] group-hover:text-white",
      iconText: "text-[#6D28D9]"
    },
    {
      icon: Cpu,
      title: "AI Threat Analysis",
      desc: "Analyze suspicious files, URLs, emails, and attack indicators using intelligent AI.",
      color: "hover:border-[#06B6D4] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      iconBg: "bg-[#06B6D4]/10 border border-[#06B6D4]/20 group-hover:bg-[#06B6D4] group-hover:text-white",
      iconText: "text-[#06B6D4]"
    },
    {
      icon: Search,
      title: "Threat Hunting",
      desc: "Proactively identify hidden threats before they impact your systems.",
      color: "hover:border-[#2563EB] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
      iconBg: "bg-[#2563EB]/10 border border-[#2563EB]/20 group-hover:bg-[#2563EB] group-hover:text-white",
      iconText: "text-[#2563EB]"
    },
    {
      icon: Globe,
      title: "Security Assessment",
      desc: "Evaluate your infrastructure and discover vulnerabilities before attackers do.",
      color: "hover:border-[#6D28D9] group-hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]",
      iconBg: "bg-[#6D28D9]/10 border border-[#6D28D9]/20 group-hover:bg-[#6D28D9] group-hover:text-white",
      iconText: "text-[#6D28D9]"
    },
    {
      icon: Activity,
      title: "Enterprise Monitoring",
      desc: "Continuous visibility and security monitoring through Spider Pro AI Dashboard.",
      color: "hover:border-[#06B6D4] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      iconBg: "bg-[#06B6D4]/10 border border-[#06B6D4]/20 group-hover:bg-[#06B6D4] group-hover:text-white",
      iconText: "text-[#06B6D4]"
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

  const statistics = [
    { value: "24/7 Support", label: "Service Mode", sub: "Always Active Ops", color: "text-[#2563EB]" },
    { value: "AI Powered", label: "Triage Engine", sub: "Autonomous Core", color: "text-[#06B6D4]" },
    { value: "Verified Experts", label: "On-Demand Access", sub: "100% Elite Vetted", color: "text-[#6D28D9]" },
    { value: "Rapid Response", label: "Incident Containment", sub: "SLA Under 15 Min", color: "text-[#2563EB]" }
  ];

  return (
    <section id="services" className="relative w-full min-h-[1000px] flex flex-col items-center justify-center bg-[#060813] text-white overflow-hidden py-24 md:py-32 font-sans border-b border-slate-900">
      
      {/* ── Background Image Layer (Suitable premium dark image) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/services_bg.png"
          alt="JeztBrain Cybersecurity Services dark modern technical background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#060813] via-[#090D22]/95 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060813]/40 via-transparent to-[#060813] z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full flex-1 flex flex-col justify-between">
        
        {/* Main Content Area */}
        <div className="space-y-12 text-center w-full">
          
          {/* Header Info */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#2563EB] text-xs font-mono font-bold tracking-wider uppercase border border-[#2563EB]/25">
              OUR CYBERSECURITY SERVICES
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-space-grotesk">
              Expert Protection.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#6D28D9] to-[#06B6D4] drop-shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                Intelligent Solutions.
              </span>
            </h2>

            <p className="text-slate-200 font-semibold text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-sora">
              Comprehensive cybersecurity services designed to help individuals, startups, businesses, and enterprises prevent, detect, investigate, and recover from modern cyber threats.
            </p>

            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
              Whether you're responding to an active cyberattack, strengthening your organization's security, or seeking expert guidance, JeztBrain provides trusted cybersecurity services powered by AI and delivered by verified security professionals.
            </p>
          </div>

          {/* Strategic Advantages Checklist - Horizontal Centered Row */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto py-2">
            {whyBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md hover:border-[#06B6D4]/30 transition-all duration-300">
                <CheckCircle size={14} className="text-[#06B6D4] shrink-0" />
                <span className="text-xs font-semibold text-slate-300 font-sora">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Services Cards Grid - 3 Columns Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-[1280px] mx-auto">
            {services.map((svc, idx) => {
              const IconComponent = svc.icon;
              return (
                <div
                  key={idx}
                  className={`group flex items-start gap-4 bg-slate-900/60 border border-white/5 p-6 rounded-2xl shadow-sm transition-all duration-300 backdrop-blur-sm ${svc.color}`}
                >
                  {/* Horizontal Icon Box */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${svc.iconBg} ${svc.iconText}`}>
                    <IconComponent size={22} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="space-y-1.5 text-left flex-1">
                    <h3 className="text-base font-bold text-white font-space-grotesk tracking-wide transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Statement */}
          <div className="max-w-2xl mx-auto bg-slate-950/60 backdrop-blur-md border border-white/5 border-l-4 border-l-[#2563EB] p-4 rounded-r-2xl flex items-center justify-between gap-4 text-left">
            <p className="text-xs font-semibold text-slate-300 leading-relaxed font-sora">
              Every cyber challenge deserves the right expertise. We're here when it matters most.
            </p>
            <Zap size={16} className="text-[#06B6D4] animate-pulse shrink-0" />
          </div>

        </div>

        {/* ── BOTTOM ROW: Enterprise Services Statistics Bar ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/5 w-full">
          {statistics.map((stat, idx) => (
            <div key={idx} className="text-left space-y-1 p-4 bg-slate-955/40 border border-white/5 rounded-2xl backdrop-blur-md">
              <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block">
                {stat.label}
              </span>
              <h3 className={`text-2xl md:text-3xl font-black font-space-grotesk tracking-tight ${stat.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]`}>
                {stat.value}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

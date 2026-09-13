import React from 'react';
import { Users, MessageSquare, ShieldAlert, FileText, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionExpertConnect() {
  const features = [
    {
      title: "Live Expert Consultation",
      desc: "Direct 24/7 channel with tier-3 cybersecurity responders to assess active threats.",
      icon: MessageSquare,
      color: "text-purple-400",
      bg: "bg-purple-950/40",
      border: "border-purple-800/40"
    },
    {
      title: "Incident Investigation",
      desc: "Root-cause digital forensic sweeps isolating breach vectors & compromised tokens.",
      icon: ShieldAlert,
      color: "text-blue-400",
      bg: "bg-blue-950/40",
      border: "border-blue-800/40"
    },
    {
      title: "Recovery Guidance",
      desc: "Step-by-step technical playbooks to safely restore system integrity and data access.",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-950/40",
      border: "border-emerald-800/40"
    },
    {
      title: "Security Recommendations",
      desc: "Tailored infrastructure hardening blueprints to prevent recurrent attack patterns.",
      icon: FileText,
      color: "text-cyan-400",
      bg: "bg-cyan-950/40",
      border: "border-cyan-800/40"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#1E1035] text-white py-24 lg:py-32 font-sans border-b border-[#4F46E5]/30">
      
      {/* Background Graphic Illustration */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/service_security_professional.png"
          alt="Holographic Interface Cybersecurity Specialist"
          className="w-full h-full object-cover object-center opacity-20 contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1035] via-[#1E1035]/95 to-[#4F46E5]/20" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        
        {/* Header Block */}
        <div className="max-w-4xl space-y-6 text-left mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
            <Users className="w-4 h-4 text-cyan-400" />
            DIRECT EXPERT ASSISTANCE
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-space-grotesk">
            Cybersecurity Experts<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-indigo-300">
              When You Need Them Most.
            </span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl font-normal">
            When phishing, scams, malware, ransomware, account compromise, or other cyber threats occur, immediate action is critical. JeztBrain connects users directly with verified cybersecurity professionals who provide trusted guidance, technical assistance, and practical solutions to minimise damage and accelerate recovery.
          </p>
        </div>

        {/* Split Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((ft, idx) => {
            const Icon = ft.icon;
            return (
              <div key={idx} className={`p-6 rounded-2xl ${ft.bg} border ${ft.border} hover:border-[#4F46E5] transition-all space-y-4 flex flex-col justify-between group`}>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-md">
                    <Icon className={`w-6 h-6 ${ft.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <h3 className="text-lg font-bold text-white font-space-grotesk">{ft.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{ft.desc}</p>
                </div>

                <div className="pt-2">
                  <Link to="/chat" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-white uppercase tracking-wider">
                    Connect Now <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#4F46E5]/30 to-[#0284C7]/20 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <PhoneCall className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white font-space-grotesk">Facing an Active Breach or Ransomware Attack?</h4>
              <p className="text-xs text-slate-300 font-sans">Our incident triage room is active 24/7/365 with average SLA &lt; 15 minutes.</p>
            </div>
          </div>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-md whitespace-nowrap"
          >
            Dispatch Incident Specialist
          </Link>
        </div>

      </div>
    </section>
  );
}

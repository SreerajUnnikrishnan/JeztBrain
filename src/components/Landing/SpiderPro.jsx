import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, AlertCircle, BarChart3, Settings, Database, FileText, Lock, MessageSquare, Activity, Globe } from 'lucide-react';

export default function SpiderPro() {
  const [activeTier, setActiveTier] = useState('enterprise');

  const deploymentTiers = {
    small: {
      name: "Small Businesses",
      desc: "Instant operational security visibility for emerging organizations requiring turnkey compliance and endpoint monitoring.",
      metrics: { deployments: "< 1 day", support: "Standard SLA", nodes: "Up to 500 endpoints" }
    },
    medium: {
      name: "Medium Enterprises",
      desc: "Advanced behavior audits and telemetry correlation for growing infrastructures with regional compliance needs.",
      metrics: { deployments: "< 3 days", support: "24/7 Response", nodes: "Up to 5,000 endpoints" }
    },
    enterprise: {
      name: "Large Corporations",
      desc: "Fully autonomous, highly customized dedicated instance with direct API hook capabilities, high availability, and isolated databases.",
      metrics: { deployments: "Custom scheduled", support: "Dedicated Handlers", nodes: "Unlimited endpoints" }
    }
  };

  const features = [
    { name: "Live Monitoring", icon: Activity, desc: "Real-time state verification across network interfaces.", theme: "blue" },
    { name: "Asset Inventory", icon: Database, desc: "Automatic cataloging and indexing of all connected endpoints.", theme: "green" },
    { name: "Threat Alerts", icon: AlertCircle, desc: "Immediate incident propagation based on behavioral indicators.", theme: "orange" },
    { name: "Network Visibility", icon: Globe, desc: "Deep packet inspection and visualization of traffic gateways.", theme: "blue" },
    { name: "Risk Scores", icon: Shield, desc: "Dynamic risk calculations updated continuously using AI modeling.", theme: "orange" },
    { name: "Incident Dashboard", icon: BarChart3, desc: "Single control center to review and resolve containment tickets.", theme: "purple" },
    { name: "Security Analytics", icon: BarChart3, desc: "Trend tracking and heuristic reports for operations planning.", theme: "purple" },
    { name: "Executive Reports", icon: FileText, desc: "Automated executive-ready security posture slide sheets.", theme: "blue" },
    { name: "Compliance Modules", icon: Lock, desc: "Pre-mapped standard checklists for SOC2, ISO27001, and HIPAA.", theme: "green" },
    { name: "AI Security Assistant", icon: MessageSquare, desc: "Conversational agent resolving logs and compiling playbooks.", theme: "purple" }
  ];

  const getColorThemeClasses = (theme) => {
    switch (theme) {
      case 'orange':
        return { text: "text-orange-500", bg: "bg-orange-500/10", border: "hover:border-orange-500/30" };
      case 'green':
        return { text: "text-green-500", bg: "bg-green-500/10", border: "hover:border-green-500/30" };
      case 'purple':
        return { text: "text-[#6C4DFF]", bg: "bg-[#6C4DFF]/10", border: "hover:border-[#6C4DFF]/30" };
      case 'blue':
      default:
        return { text: "text-blue-500", bg: "bg-blue-500/10", border: "hover:border-blue-500/30" };
    }
  };

  return (
    <section className="relative w-full min-h-[900px] flex items-center justify-center text-slate-800 overflow-hidden py-28 font-sans border-b border-slate-100 bg-white">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/soc-bg.png"
          alt="Modern Security Operations Center with dashboards"
          className="w-full h-full object-cover object-center brightness-95 opacity-80"
        />
        {/* White and Blue premium gradient overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/92 to-blue-50/20 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
            Internal Deployment
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Spider Pro.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-[#6C4DFF] to-purple-600">
              Your On-Premises Command Center.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Deploy the advanced threat detection capability of JeztBrain inside your own network perimeter. Maintain complete data sovereignty while securing operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">

          {/* Left Column: Deployment Options and Tier Selection */}
          <div className="lg:col-span-5 space-y-8 text-left flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Scale Your Defense</span>
                <h3 className="text-2xl font-bold text-slate-900 font-space-grotesk tracking-tight">Structured For Any Infrastructure</h3>
              </div>

              {/* Selector Buttons */}
              <div className="flex bg-slate-100/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 gap-1">
                {Object.keys(deploymentTiers).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 uppercase font-mono tracking-wider ${activeTier === tier
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                      }`}
                  >
                    {tier === 'small' ? 'SMB' : tier === 'medium' ? 'Medium' : 'Enterprise'}
                  </button>
                ))}
              </div>

              {/* Active Tier Description (Vibrant board highlights) */}
              <div className="bg-white/90 backdrop-blur-xl p-8 border border-blue-200/60 rounded-3xl shadow-sm min-h-[220px] flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 font-space-grotesk">
                    {deploymentTiers[activeTier].name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
                    {deploymentTiers[activeTier].desc}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 text-left">
                  {Object.entries(deploymentTiers[activeTier].metrics).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-wider block">{key}</span>
                      <p className="text-xs font-black text-slate-900 leading-none">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard Mockup Terminal with simulated Sparkline Charts */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-lg text-left space-y-4 relative overflow-hidden text-slate-200">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-mono font-bold text-slate-400 ml-2">SPIDER_PRO_AGENT_V2</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-mono font-bold">LIVE TELEMETRY</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <span className="text-[9px] text-slate-400 uppercase">Perimeter Health</span>
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-sm font-bold">99.8%</span>
                    <svg className="w-16 h-6 stroke-green-500 fill-none" viewBox="0 0 100 30" strokeWidth="2">
                      <path d="M0,25 L15,10 L30,22 L45,5 L60,18 L75,8 L90,20 L100,10" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] text-slate-400 uppercase">Alert Queue</span>
                  <div className="flex items-center gap-2 text-orange-400">
                    <span className="text-sm font-bold">3 Active</span>
                    <svg className="w-16 h-6 stroke-orange-500 fill-none" viewBox="0 0 100 30" strokeWidth="2">
                      <path d="M0,5 L20,25 L40,15 L60,5 L80,28 L100,5" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Features Grid */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            <div className="text-left space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Interactive Capability Grid</span>
              <h3 className="text-xl font-bold text-slate-950 font-space-grotesk">Enterprise Features Included</h3>
            </div>

            {/* Interactive Grid of Features (Vibrant hover glows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                const themeStyle = getColorThemeClasses(feat.theme);
                return (
                  <div
                    key={idx}
                    className={`p-5 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl flex items-start gap-4 hover:border-slate-300 ${themeStyle.border} transition-all duration-300 group text-left shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${themeStyle.bg} ${themeStyle.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide font-space-grotesk leading-tight">{feat.name}</h4>
                      <p className="text-[10px] text-slate-500 leading-normal font-light">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

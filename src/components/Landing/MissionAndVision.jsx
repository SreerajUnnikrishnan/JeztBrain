import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain, Search, ShieldCheck, UserCheck, LayoutDashboard, Shield,
  ArrowRight, CheckCircle2, Zap, Activity, Radio, Cpu
} from 'lucide-react';

export default function MissionAndVision() {
  
  // Section B: 6 Core Capabilities
  const coreCapabilities = [
    {
      title: "AI Threat Intelligence",
      desc: "Analyze security signals and identify potential cyber threats in real-time.",
      icon: Brain,
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
      link: "/platform/jeztbrainspider"
    },
    {
      title: "Incident Investigation",
      desc: "Support security investigations with structured analysis and evidence-based insights.",
      icon: Search,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100",
      link: "/platform/jeztbrainspider"
    },
    {
      title: "Rapid Incident Response",
      desc: "Help teams coordinate containment and recovery activities within guaranteed SLAs.",
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-100",
      link: "/chat"
    },
    {
      title: "Cybersecurity Expert Connect",
      desc: "Connect users with verified cybersecurity professionals for live incident triage.",
      icon: UserCheck,
      color: "text-cyan-600",
      bg: "bg-cyan-50 border-cyan-100",
      link: "/experts"
    },
    {
      title: "Enterprise Security Dashboard",
      desc: "Provide a centralized view of security activities, telemetry feeds, and threat insights.",
      icon: LayoutDashboard,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
      link: "/dashboard"
    },
    {
      title: "Proactive Digital Protection",
      desc: "Strengthen security awareness, monitoring, and proactive defensive security practices.",
      icon: Shield,
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-100",
      link: "/platform/jeztbrainspider"
    }
  ];

  // Section C: How JeztBrain Works 4 Steps
  const steps = [
    {
      num: "01",
      title: "Detect",
      desc: "Identify suspicious activity, anomalous behaviors, and potential cyber threats instantly across endpoints and network telemetry.",
      icon: Radio
    },
    {
      num: "02",
      title: "Analyze",
      desc: "Understand the nature, scope, and potential impact of security incidents using AI heuristic intelligence and correlation engines.",
      icon: Cpu
    },
    {
      num: "03",
      title: "Respond",
      desc: "Coordinate appropriate incident response actions with verified human experts to isolate threats and contain breaches rapidly.",
      icon: Zap
    },
    {
      num: "04",
      title: "Strengthen",
      desc: "Improve overall digital protection posture, apply patch remediations, and reduce future risk exposure across your enterprise.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="relative w-full bg-white text-slate-900 py-24 lg:py-32 font-sans border-b border-slate-200 overflow-hidden">
      
      {/* Container */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-20 w-full space-y-28">
        
        {/* Page Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-mono font-bold tracking-wider uppercase">
            CORE PLATFORM ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Transform the Way You Respond to Cyber Threats.
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            From intelligent threat detection to expert-led incident response, JeztBrain helps security teams understand threats, take action, and strengthen their defenses through one connected cybersecurity ecosystem.
          </p>
        </div>

        {/* ── SECTION A: PLATFORM OVERVIEW ── */}
        <div className="space-y-8">
          <div className="p-8 lg:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">SECTION A // PLATFORM OVERVIEW</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Comprehensive Cyber Threat Monitoring & Rapid Response
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  JeztBrain aggregates complex telemetry signals into actionable security intelligence. By combining automated AI detection algorithms with certified human handlers, security risks are identified and contained before business impact occurs.
                </p>
              </div>

              {/* Illustration Card Diagram */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-mono font-bold text-slate-800">JEZTBRAIN TELEMETRY STREAM</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 100% OPERATIONAL
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
                      <span className="text-[10px] font-mono text-slate-400 font-bold block">EVENTS/SEC</span>
                      <span className="text-sm font-bold font-mono text-blue-600">142,800</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
                      <span className="text-[10px] font-mono text-slate-400 font-bold block">CONTAINMENT</span>
                      <span className="text-sm font-bold font-mono text-purple-600">&lt; 15 mins</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
                      <span className="text-[10px] font-mono text-slate-400 font-bold block">VERIFIED EXPERTS</span>
                      <span className="text-sm font-bold font-mono text-indigo-600">200+ Responders</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 3 Supporting Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Real-Time Telemetry</h4>
                  <p className="text-xs text-slate-500">Continuous cloud & endpoint signal analysis.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Heuristic Detection</h4>
                  <p className="text-xs text-slate-500">Zero-day anomaly identification engine.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Automated Containment</h4>
                  <p className="text-xs text-slate-500">Instant isolation of compromised assets.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── SECTION B: OUR CORE CAPABILITIES (6 GRID CARDS) ── */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">SECTION B // CORE CAPABILITIES</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Built for Modern Security Challenges</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all text-left flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${cap.bg}`}>
                      <Icon className={`w-6 h-6 ${cap.color}`} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cap.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      to={cap.link}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                    >
                      Learn More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── SECTION C: HOW JEZTBRAIN WORKS (PROCESS WORKFLOW TIMELINE) ── */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-wider">SECTION C // WORKFLOW PROCESS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How JeztBrain Protects Your Operations</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={idx} className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono text-slate-300">{st.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{st.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SECTION D: CYBERSECURITY ECOSYSTEM RELATIONSHIP MATRIX ── */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-purple-600 uppercase tracking-wider">SECTION D // ECOSYSTEM MATRIX</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Connected Defense Ecosystem</h3>
          </div>

          <div className="p-8 lg:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-mono font-bold">NODE 01</span>
                <h4 className="text-base font-bold text-slate-900">AI Intelligence</h4>
                <p className="text-xs text-slate-500">Autonomous pattern recognition & anomaly triage.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-mono font-bold">NODE 02</span>
                <h4 className="text-base font-bold text-slate-900">Incident Response</h4>
                <p className="text-xs text-slate-500">Rapid containment, evidence analysis & recovery.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold">NODE 03</span>
                <h4 className="text-base font-bold text-slate-900">Cybersecurity Experts</h4>
                <p className="text-xs text-slate-500">200+ Verified Tier-3 incident response handlers.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-mono font-bold">NODE 04</span>
                <h4 className="text-base font-bold text-slate-900">Enterprise Security</h4>
                <p className="text-xs text-slate-500">Centralized posture monitoring & compliance.</p>
              </div>

            </div>
          </div>
        </div>

        {/* ── SECTION E: CALL TO ACTION ── */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 lg:p-16 text-white text-center space-y-8 shadow-xl shadow-blue-500/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-200">GET STARTED WITH JEZTBRAIN</span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Strengthen Your Digital Defense?
            </h3>
            <p className="text-blue-100 text-base leading-relaxed">
              Explore JeztBrain and discover a smarter way to understand, manage, and respond to cybersecurity threats.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/platform/jeztbrainspider"
                className="px-8 py-4 bg-white text-blue-700 hover:bg-slate-50 font-bold font-mono text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Explore Platform
              </Link>
              <Link
                to="/chat"
                className="px-8 py-4 bg-blue-700/60 hover:bg-blue-700 border border-white/20 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Connect With an Expert
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

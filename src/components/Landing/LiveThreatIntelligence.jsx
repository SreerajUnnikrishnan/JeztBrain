import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Brain, Zap } from 'lucide-react';

export default function LiveThreatIntelligence() {
  return (
    <section className="relative py-24 overflow-hidden z-10 bg-black text-white selection:bg-purple-500/30 selection:text-white">
      {/* Subtle Purple Lighting Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)] pointer-events-none z-0 blur-[100px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)] pointer-events-none z-0 blur-[100px]" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.0015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.0015)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none z-0 opacity-20" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Command Center Visual */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] aspect-[4/3]">
              <img
                src="/images/command_center_team.png"
                alt="Cyber Command Center Team"
                className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Side: Mission Content & Blocks */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-violet-400 tracking-[0.25em] uppercase">
                ⚡ THE INSTANT RESPONSE MISSION
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] font-space-grotesk">
              When Every<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-black drop-shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                Second Matters.
              </span>
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-200 leading-snug">
                Most organizations spend hours understanding an attack. <span className="text-violet-400">We focus on immediate action.</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Traditional security solutions generate alerts. JeztBrain focuses on what happens next. Our platform combines AI analysis, expert guidance, and operational workflows to accelerate incident response and reduce business impact.
              </p>
            </div>

            {/* Three Mission Blocks */}
            <div className="space-y-6 pt-4">
              {/* Block 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0A12] border border-white/10 flex items-center justify-center text-violet-400 shrink-0 shadow-lg">
                  <Eye size={18} className="text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider font-space-grotesk">DETECT</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">Identify malicious activity before damage spreads.</p>
                </div>
              </div>

              {/* Block 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0A12] border border-white/10 flex items-center justify-center text-violet-400 shrink-0 shadow-lg">
                  <Brain size={18} className="text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider font-space-grotesk">UNDERSTAND</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">Analyze incidents using AI-assisted intelligence.</p>
                </div>
              </div>

              {/* Block 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0A12] border border-white/10 flex items-center justify-center text-violet-400 shrink-0 shadow-lg">
                  <Zap size={18} className="text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider font-space-grotesk">RESPOND</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">Connect actions, experts, and remediation instantly.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

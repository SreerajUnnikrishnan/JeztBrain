import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Globe2 } from 'lucide-react';

export default function CyberVisualization() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden z-10 bg-slate-50">
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-100" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Global Threat Intelligence</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1] max-w-4xl"
        >
          See the attack. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">Before it strikes.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-14"
        >
          Our neural engine processes petabytes of global telemetry data daily, mapping threat actors' infrastructure before campaigns even launch.
        </motion.p>

        {/* Clean Statistics Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-t border-slate-200 pt-12"
        >
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
              <Globe2 className="text-violet-600 w-6 h-6" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2">150M+</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Endpoints Monitored</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-5">
              <BarChart3 className="text-purple-600 w-6 h-6" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2">2.4PB</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Daily Telemetry</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
              <ShieldCheck className="text-indigo-600 w-6 h-6" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2">99.9%</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">True Positive Rate</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

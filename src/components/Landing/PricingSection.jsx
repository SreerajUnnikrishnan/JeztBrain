import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-12 lg:py-16 relative overflow-hidden z-10 bg-white">
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-lg mb-10"
          >
            Flexible cybersecurity protection powered by autonomous AI agents, expert incident response, and real-time threat intelligence.
          </motion.p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold tracking-wide ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center px-1 transition-all hover:border-violet-300"
            >
              <motion.div 
                className="w-5 h-5 rounded-full bg-violet-500"
                animate={{ x: isYearly ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-bold tracking-wide flex items-center gap-3 ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>
              Yearly
              <span className="px-2.5 py-1 rounded-md bg-violet-50 text-violet-600 text-[10px] font-bold tracking-widest border border-violet-100 uppercase">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          
          {/* Starter */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col hover:border-violet-300 hover:shadow-[0_8px_30px_rgba(123,47,247,0.08)] transition-all duration-300">
            <div className="text-slate-900 text-xl font-bold mb-2">Starter</div>
            <div className="text-slate-400 text-sm mb-7 leading-relaxed h-10">Essential protection for growing startups.</div>
            <div className="text-5xl font-bold text-slate-900 mb-7">
              {isYearly ? '$99' : '$129'}<span className="text-base text-slate-400 font-medium">/mo</span>
            </div>
            <button className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors mb-8 text-sm tracking-wide">
              Start Free Trial
            </button>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Includes</div>
            <ul className="flex flex-col gap-3.5 text-sm text-slate-600 flex-grow font-medium">
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> Up to 50 endpoints</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> AI Threat Scanning</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> Community Support</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> Standard Dashboard</li>
            </ul>
          </div>

          {/* Professional (Featured) */}
          <div className="bg-gradient-to-b from-violet-600 to-indigo-800 border border-violet-500 rounded-3xl p-8 flex flex-col relative shadow-[0_12px_40px_rgba(123,47,247,0.25)] transform md:-translate-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fuchsia-400 text-slate-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
              Most Popular
            </div>
            <div className="text-white text-xl font-bold mb-2">Professional</div>
            <div className="text-violet-100 text-sm mb-7 leading-relaxed h-10">Advanced defense for mid-market teams.</div>
            <div className="text-5xl font-bold text-white mb-7">
              {isYearly ? '$499' : '$599'}<span className="text-base text-violet-200 font-medium">/mo</span>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-white text-violet-700 font-bold hover:bg-violet-50 transition-colors mb-8 text-sm tracking-wide shadow-sm">
              Get Started
            </button>
            <div className="text-xs font-bold text-violet-200 uppercase tracking-widest mb-5">Everything in Starter, plus</div>
            <ul className="flex flex-col gap-3.5 text-sm text-violet-50 flex-grow font-medium">
              <li className="flex items-start gap-3"><Check size={16} className="text-fuchsia-300 shrink-0 mt-0.5" /> Up to 500 endpoints</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-fuchsia-300 shrink-0 mt-0.5" /> Real-time Autonomous Mitigation</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-fuchsia-300 shrink-0 mt-0.5" /> Priority 24/7 Support</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-fuchsia-300 shrink-0 mt-0.5" /> Custom SIEM Integrations</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col hover:border-violet-300 hover:shadow-[0_8px_30px_rgba(123,47,247,0.08)] transition-all duration-300">
            <div className="text-slate-900 text-xl font-bold mb-2">Enterprise</div>
            <div className="text-slate-400 text-sm mb-7 leading-relaxed h-10">Dedicated SOC resources for global orgs.</div>
            <div className="text-5xl font-bold text-slate-900 mb-7">
              Custom
            </div>
            <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors mb-8 text-sm tracking-wide">
              Contact Sales
            </button>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Everything in Pro, plus</div>
            <ul className="flex flex-col gap-3.5 text-sm text-slate-600 flex-grow font-medium">
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> Unlimited endpoints</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> Dedicated Red Team</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> Guaranteed 5-min Response SLA</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-violet-500 shrink-0 mt-0.5" /> On-Premise Deployment options</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Shield, Zap, Crown, Check, ArrowRight, CreditCard, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Payment() {
  const plans = [
    {
      name: 'Essential Sentinel',
      price: '49',
      description: 'Foundational protection for individual nodes and personal data.',
      features: [
        'AI Threat Detection',
        '24/7 Monitoring',
        '10 Incident Tickets/mo',
        'Email Support',
        'Basic SOC Dashboard'
      ],
      icon: <Shield size={28} className="text-slate-400" />,
      color: 'slate'
    },
    {
      name: 'Tactical Elite',
      price: '149',
      description: 'Advanced defensive capabilities for small teams and growing infrastructure.',
      features: [
        'Real-time Intrusion Prevention',
        'Priority Expert Chat',
        'Unlimited Incident Tickets',
        'Forensic Analysis Reports',
        'Network Hardening AI',
        'Vulnerability Scanning'
      ],
      icon: <Zap size={28} className="text-fuchsia-400" />,
      popular: true,
      color: 'purple'
    },
    {
      name: 'Cyber Sovereign',
      price: '499',
      description: 'Enterprise-grade autonomous defense for complex, multi-cloud environments.',
      features: [
        'Custom AI Defense Models',
        'Dedicated SOC Specialist',
        'Sub-minute Response Time',
        'On-site Forensic Audit',
        'Compliance Automation (HIPAA/SOC2)',
        'Global Node Isolation'
      ],
      icon: <Crown size={28} className="text-purple-400" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-mono text-[10px] uppercase tracking-widest mb-2">
          <ShieldCheck size={12} /> Tiered Defense Protocols
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight">Upgrade Your Perimeter</h1>
        <p className="text-slate-400 text-lg">Select a subscription protocol to activate advanced AI defensive capabilities and secure your digital sovereignty.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={plan.name}
            className={`relative bg-slate-900/40 border ${plan.popular ? 'border-fuchsia-500/30 shadow-[0_0_40px_rgba(123, 47, 247,0.1)]' : 'border-white/5'} rounded-[40px] p-8 backdrop-blur-xl flex flex-col group hover:bg-white/5 transition-all`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-fuchsia-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(123, 47, 247,0.5)]">
                Most Deployed
              </div>
            )}
            
            <div className="mb-8">
              <div className={`w-14 h-14 rounded-2xl bg-${plan.color}-500/10 border border-${plan.color}-500/20 flex items-center justify-center mb-6 text-${plan.color}-400`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">${plan.price}</span>
              <span className="text-slate-500 text-sm uppercase tracking-widest font-bold">/ MONTH</span>
            </div>

            <ul className="flex-1 space-y-4 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <div className="mt-0.5 p-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                    <Check size={14} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              plan.popular 
                ? 'bg-fuchsia-500 text-black shadow-[0_0_20px_rgba(123, 47, 247,0.3)] hover:shadow-[0_0_30px_rgba(123, 47, 247,0.5)]' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
            }`}>
              Initialize Protocol <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust & Security Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
        <div className="flex items-center gap-4 text-slate-400">
          <CreditCard className="text-fuchsia-400 shrink-0" size={32} />
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Secure Billing</h4>
            <p className="text-xs">PCI-DSS Compliant processing.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <Clock className="text-fuchsia-400 shrink-0" size={32} />
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">30-Day Evaluation</h4>
            <p className="text-xs">Risk-free trial on all tactical tiers.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <ShieldCheck className="text-fuchsia-400 shrink-0" size={32} />
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Enterprise SLAs</h4>
            <p className="text-xs">Guaranteed sub-minute response.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


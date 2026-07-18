import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Network, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AiSecurityOperations() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden z-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Image / Business Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Background Decorative Element */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-100/60 to-purple-100/60 rounded-3xl transform rotate-2 blur-md" />
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-slate-50">
              <img 
                src="/soc-bg.png" 
                alt="Security Operations Center" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML += '<div class="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-100 to-violet-50 text-slate-400 font-medium text-sm">Cyber Operations Center</div>';
                }}
              />
              
              {/* Overlay Stat Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center border border-violet-100">
                    <ShieldCheck className="text-violet-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-800 font-bold text-sm tracking-wide">Zero-Trust Enforced</div>
                    <div className="text-slate-400 text-xs mt-0.5">All endpoints secured</div>
                  </div>
                </div>
                <div className="text-violet-600 font-bold flex items-center gap-1.5 text-xs uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Optimal
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest w-fit mb-6">
              <Network size={14} className="text-violet-500" /> Enterprise SOC
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Security operations, <br className="hidden md:block" />
              automated by AI.
            </h2>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Our AI-driven Security Operations Center processes telemetry from endpoints, cloud instances, and network layers simultaneously. It empowers your team to focus on strategic initiatives while AI handles the noise.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Cpu,
                  color: 'purple',
                  title: "Heuristic Analysis",
                  desc: "Neural nodes constantly train on live attack vectors to predict and block emerging threats before they execute."
                },
                {
                  icon: Network,
                  color: 'fuchsia',
                  title: "Mesh Telemetry",
                  desc: "Aggregates and normalizes logs from multi-cloud and on-prem assets for a unified, comprehensive defense posture."
                },
                {
                  icon: ShieldCheck,
                  color: 'violet',
                  title: "Automated Containment",
                  desc: "Instantly isolates compromised devices and revokes permissions without requiring manual human intervention."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-11 h-11 rounded-xl bg-${item.color}-50 flex items-center justify-center border border-${item.color}-100 group-hover:border-${item.color}-300 group-hover:bg-${item.color}-50 transition-all`}>
                      <item.icon className={`text-${item.color}-600 w-5 h-5`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-slate-800 font-bold mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

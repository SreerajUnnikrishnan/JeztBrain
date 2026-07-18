import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Zap, Activity, Cpu, ArrowRight, BarChart3, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlatformPreviewModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const features = [
    { icon: <Shield size={18} className="text-fuchsia-400" />, title: 'Real-time Threat Detection', desc: 'Instant identification of malicious patterns.' },
    { icon: <Zap size={18} className="text-purple-400" />, title: 'AI Auto Response', desc: 'Autonomous neutralization of active threats.' },
    { icon: <Activity size={18} className="text-purple-400" />, title: 'Secure Monitoring', desc: 'End-to-end encrypted system tracking.' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-slate-900/90 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Left Side: Preview UI */}
              <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-purple-500/10 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest">
                    Live System Preview
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    Explore <span className="text-fuchsia-400">JezBrain</span> Platform
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Experience the future of autonomous cybersecurity with our real-time AI-powered dashboard.
                  </p>

                  {/* Mini Dashboard Preview */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <BarChart3 size={16} className="text-fuchsia-400" />
                        <span className="text-[10px] text-emerald-400 font-bold">+12%</span>
                      </div>
                      <p className="text-xl font-bold text-white">84</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Security Score</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <Activity size={16} className="text-purple-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <p className="text-xl font-bold text-white">5ms</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Response Time</p>
                    </div>
                    <div className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                           <Shield size={16} />
                         </div>
                         <div>
                           <p className="text-sm font-bold text-white">24 Threats Blocked</p>
                           <p className="text-[10px] text-slate-500">In the last 60 minutes</p>
                         </div>
                       </div>
                       <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-rose-500 w-2/3"></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Features & CTA */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-8">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Core Capabilities</p>
                  
                  <div className="space-y-6">
                    {features.map((f, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-fuchsia-500/10 group-hover:border-fuchsia-500/20 transition-all">
                          {f.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1 group-hover:text-fuchsia-400 transition-colors">{f.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-white/5">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/dashboard');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(123, 47, 247,0.2)] hover:shadow-[0_0_30px_rgba(123, 47, 247,0.4)] active:scale-95"
                  >
                    Go to Dashboard <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Accent Decor */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


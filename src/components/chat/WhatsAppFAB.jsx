import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const waLink = "https://wa.me/message/EL3U6NFN2HIKE1";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* ─── Support Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            className="w-80 bg-[#0b1220]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Window Header */}
            <div className="p-6 bg-gradient-to-r from-fuchsia-500/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                   <ShieldCheck className="text-white" size={20} />
                </div>
                <div>
                   <p className="text-xs font-black text-white uppercase tracking-tight">Tactical_Support</p>
                   <p className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Active_Expert_Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-6 space-y-4 min-h-[200px] flex flex-col justify-end">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5 self-start max-w-[85%]">
                  <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                    Greetings, Specialist. Establishing secure uplink to HQ. How can we assist your current operations?
                  </p>
               </div>
               <div className="bg-fuchsia-500/10 p-3 rounded-xl border border-fuchsia-500/20 flex items-center gap-2">
                  <Zap size={12} className="text-fuchsia-400" />
                  <p className="text-[8px] font-black text-fuchsia-400 uppercase tracking-widest">AI_Assistant_Standby</p>
               </div>
            </div>

            {/* Window Footer / Action */}
            <div className="p-4 bg-black/40 border-t border-white/5">
               <a 
                 href={waLink}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:scale-[1.02] active:scale-95"
               >
                 <MessageCircle size={20} fill="currentColor" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Open_WhatsApp_Uplink</span>
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Floating Button ─── */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative overflow-hidden group ${
          isOpen ? 'bg-white text-black' : 'bg-fuchsia-500 text-black'
        }`}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? <X size={24} /> : <MessageCircle size={28} className="animate-pulse" />}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#030712] animate-bounce">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}

import React from 'react';
import { Lock, PhoneCall, AlertOctagon, MessageCircle, ShieldCheck } from 'lucide-react';

export default function SecureCommModule() {
  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
          <Lock size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Secure_Uplink</h3>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Encrypted Communications Channel</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" size={20} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Connection Status</p>
            <p className="text-xs text-white font-mono">E2E ENCRYPTED UPLINK ESTABLISHED</p>
          </div>
        </div>
        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp Support Button */}
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/50 rounded-2xl transition-all group/btn">
          <MessageCircle size={28} className="text-[#25D366] group-hover/btn:scale-110 transition-transform" />
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">Direct Support</p>
            <p className="text-[9px] text-slate-400 font-mono uppercase mt-1">Initiate WhatsApp Comms</p>
          </div>
        </button>

        {/* Voice Escalation Button */}
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/50 rounded-2xl transition-all group/btn">
          <PhoneCall size={28} className="text-purple-400 group-hover/btn:scale-110 transition-transform" />
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">Voice Uplink</p>
            <p className="text-[9px] text-slate-400 font-mono uppercase mt-1">Secure Audio Channel</p>
          </div>
        </button>
      </div>

      {/* Emergency Escalation */}
      <button className="w-full mt-4 flex items-center justify-center gap-3 p-4 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 rounded-2xl transition-all group/btn">
        <AlertOctagon size={20} className="text-rose-400 group-hover/btn:text-white" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 group-hover/btn:text-white">Declare Critical Escalation</span>
      </button>
    </div>
  );
}

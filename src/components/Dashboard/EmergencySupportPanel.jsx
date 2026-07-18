import React from 'react';
import { Lock, PhoneCall, AlertOctagon, MessageCircle, ShieldCheck, Zap, Upload, Users, Clock, Activity, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmergencySupportPanel() {
  return (
    <div className="bg-[#0b1220]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group h-full flex flex-col">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-500/5 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400 border border-fuchsia-500/20 shadow-[0_0_15px_rgba(123, 47, 247,0.2)]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">JeztBrain_Secure_Connect</h3>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Direct SOC Emergency Uplink</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Live Expert Status & ETA */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
          <Users size={18} className="text-fuchsia-400" />
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Experts Online</p>
            <p className="text-xs text-white font-bold">3 SOC Active</p>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
          <Clock size={18} className="text-amber-400" />
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Response Time</p>
            <p className="text-xs text-white font-bold">~ 2 Minutes</p>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        {/* WhatsApp Support */}
        <a 
          href="https://wa.me/message/EL3U6NFN2HIKE1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-2 p-5 bg-[#25D366]/5 hover:bg-[#25D366]/15 border border-[#25D366]/10 hover:border-[#25D366]/40 rounded-2xl transition-all group/btn"
        >
          <MessageCircle size={24} className="text-[#25D366] group-hover/btn:scale-110 transition-transform" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white">Direct Chat</p>
        </a>

        {/* Voice Uplink */}
        <button className="flex flex-col items-center justify-center gap-2 p-5 bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/10 hover:border-purple-500/40 rounded-2xl transition-all group/btn">
          <PhoneCall size={24} className="text-purple-400 group-hover/btn:scale-110 transition-transform" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white">Voice Uplink</p>
        </button>

        {/* AI Threat Scan */}
        <button className="flex flex-col items-center justify-center gap-2 p-5 bg-fuchsia-500/5 hover:bg-fuchsia-500/15 border border-fuchsia-500/10 hover:border-fuchsia-500/40 rounded-2xl transition-all group/btn">
          <Zap size={24} className="text-fuchsia-400 group-hover/btn:scale-110 transition-transform" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white">AI Scan</p>
        </button>

        {/* Evidence Upload */}
        <button className="flex flex-col items-center justify-center gap-2 p-5 bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/10 hover:border-purple-500/40 rounded-2xl transition-all group/btn">
          <Upload size={24} className="text-purple-400 group-hover/btn:scale-110 transition-transform" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white">Evidence</p>
        </button>
      </div>

      {/* Community & Updates Small Actions */}
      <div className="flex gap-3 mb-4 relative z-10">
        <a 
          href="https://chat.whatsapp.com/HzOrKjS0s5cFT7TsXFVg5F"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-[#25D366]/5 hover:bg-[#25D366]/15 border border-[#25D366]/10 hover:border-[#25D366]/40 rounded-xl transition-all group/smallbtn"
        >
          <MessageCircle size={14} className="text-[#25D366] group-hover/smallbtn:scale-110 transition-transform" />
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white">Join Community</span>
        </a>
        <a 
          href="https://whatsapp.com/channel/0029VbDLRyQLikgFVG9Y3p3b"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-fuchsia-500/5 hover:bg-fuchsia-500/15 border border-fuchsia-500/10 hover:border-fuchsia-500/40 rounded-xl transition-all group/smallbtn"
        >
          <Radio size={14} className="text-fuchsia-400 group-hover/smallbtn:scale-110 transition-transform" />
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white">Follow Updates</span>
        </a>
      </div>

      {/* Threat Activity Feed Mini */}
      <div className="mt-2 mb-6 p-4 bg-black/40 border border-white/5 rounded-2xl relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={14} className="text-rose-500" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Live_Threat_Stream</span>
        </div>
        <div className="space-y-2 opacity-80">
          <div className="flex items-center justify-between text-[8px] font-mono">
            <span className="text-rose-400">[ATTACK] Brute force detected</span>
            <span className="text-slate-600">2m ago</span>
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono">
            <span className="text-fuchsia-400">[INTEL] New CVE identified</span>
            <span className="text-slate-600">14m ago</span>
          </div>
        </div>
      </div>

      {/* Panic Mode / Emergency Escalation */}
      <button className="w-full mt-auto flex items-center justify-center gap-3 p-5 bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-2xl transition-all group/panic shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]">
        <AlertOctagon size={24} className="text-rose-500 group-hover:text-white group-hover:animate-bounce" />
        <div className="text-left">
          <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-rose-500 group-hover:text-white leading-tight">ACTIVATE PANIC MODE</span>
          <span className="block text-[8px] font-mono text-rose-500/60 group-hover:text-white/80 uppercase">Immediate SOC Escalation</span>
        </div>
      </button>

      {/* Connection Metadata */}
      <div className="mt-6 flex items-center justify-center gap-4 text-[8px] font-mono text-slate-600 uppercase tracking-widest">
        <span className="flex items-center gap-1"><Lock size={8} /> AES-256</span>
        <span className="w-1 h-1 rounded-full bg-slate-800" />
        <span>Uplink_Node: HK-09</span>
        <span className="w-1 h-1 rounded-full bg-slate-800" />
        <span>Tunnel: Active</span>
      </div>
    </div>
  );
}

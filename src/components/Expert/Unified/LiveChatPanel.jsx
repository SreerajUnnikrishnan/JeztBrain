import React from 'react';
import { MessageSquare } from 'lucide-react';
import ChatWindow from '../../chat/ChatWindow';

export default function LiveChatPanel({ activeIncidentId }) {
  if (!activeIncidentId) {
    return (
      <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full justify-center items-center shadow-2xl p-8 text-center relative">
        {/* Animated Background Element */}
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent pointer-events-none"></div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-fuchsia-500/20 blur-2xl rounded-full animate-pulse"></div>
          <div className="p-6 bg-white/5 rounded-full border border-white/10 relative">
            <MessageSquare size={48} className="text-fuchsia-500/50" />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-rose-500 rounded-full border-4 border-[#0b1220] animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-[280px]">
          <h3 className="text-xl font-black text-white tracking-tight mb-3">Terminal Offline</h3>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Select an active case from the tactical queue to start <span className="text-fuchsia-400">secure communication</span>.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/5 rounded-2xl">
             <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-fuchsia-500/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
             </div>
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Awaiting Uplink</span>
          </div>
        </div>
      </div>
    );
  }

  return <ChatWindow incidentId={activeIncidentId} />;
}

import React from 'react';
import { Shield, User, Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

export default function MessageBubble({ message, isMe, senderName }) {
  const time = message.createdat 
    ? format(new Date(message.createdat), 'HH:mm')
    : format(new Date(), 'HH:mm');

  return (
    <div className={`flex flex-col mb-6 ${isMe ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-end gap-3 max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${
          isMe 
            ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400' 
            : 'bg-white/5 border-white/10 text-slate-400'
        }`}>
          {isMe ? <Shield size={16} /> : <User size={16} />}
        </div>

        {/* Bubble */}
        <div className="flex flex-col gap-1.5">
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
            isMe 
              ? 'bg-fuchsia-500 text-black font-medium rounded-tr-none' 
              : 'bg-[#1E293B] text-slate-200 border border-white/5 rounded-tl-none'
          }`}>
            {message.text}
          </div>
          
          <div className={`flex items-center gap-2 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
            {!isMe && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{senderName}</span>}
            <span className="text-[10px] text-slate-500 font-mono">{time}</span>
            {isMe && (
              <span className="text-black/40">
                <CheckCheck size={12} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

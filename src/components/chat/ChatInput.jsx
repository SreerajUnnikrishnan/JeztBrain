import React, { useState, useRef } from 'react';
import { Send, Plus, Smile, Paperclip, X } from 'lucide-react';

export default function ChatInput({ onSendMessage, onTyping, disabled }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!text.trim() && !file) || disabled) return;
    
    // We send an object if there's a file, but for simplicity we'll assume text contains file name, 
    // or we pass it via a separate parameter. Let's pass an object.
    onSendMessage({ text, file });
    
    setText('');
    setFile(null);
    if (onTyping) onTyping(false);
    inputRef.current?.focus();
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    
    if (onTyping) {
      onTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-[#0F172A]/80 backdrop-blur-xl border-t border-white/5">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-3 max-w-[1200px] mx-auto">
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 transition-colors rounded-xl border ${file ? 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/50' : 'text-slate-500 hover:text-fuchsia-400 bg-white/5 border-white/5'}`}
        >
          <Paperclip size={20} />
        </button>

        <div className="relative flex-1 flex flex-col">
          {file && (
            <div className="absolute -top-10 left-0 bg-[#0F172A] border border-fuchsia-500/30 text-fuchsia-400 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 shadow-lg">
               <span className="truncate max-w-[200px]">{file.name}</span>
               <button type="button" onClick={() => setFile(null)} className="hover:text-rose-400"><X size={14}/></button>
            </div>
          )}
          <textarea
            ref={inputRef}
            rows="1"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Secure_Comms_Link: Type your message..."
            disabled={disabled}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500/50 transition-all resize-none custom-scrollbar"
          />
          <button 
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-fuchsia-400 transition-colors"
          >
            <Smile size={18} />
          </button>
        </div>

        <button
          type="submit"
          disabled={(!text.trim() && !file) || disabled}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95 ${
            (text.trim() || file) && !disabled
              ? 'bg-fuchsia-500 text-black shadow-fuchsia-500/20'
              : 'bg-white/5 text-slate-600 cursor-not-allowed'
          }`}
        >
          <Send size={20} className={(text.trim() || file) && !disabled ? 'animate-in fade-in zoom-in duration-300' : ''} />
        </button>
      </form>
      <p className="text-[10px] text-slate-600 font-mono text-center mt-3 uppercase tracking-widest opacity-50">
        E2E Encryption Active • SOC Level 4 Authorized
      </p>
    </div>
  );
}

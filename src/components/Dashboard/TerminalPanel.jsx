import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function TerminalPanel() {
  const [logs, setLogs] = useState([
    { type: 'INFO', msg: 'Initializing secure protocol...', time: new Date().toLocaleTimeString() },
    { type: 'OK', msg: 'Gateway link established.', time: new Date().toLocaleTimeString() },
  ]);
  const scrollRef = useRef(null);

  const logTemplates = [
    { type: 'INFO', msg: 'Scanning network for anomalies...' },
    { type: 'OK', msg: 'Threat neutralized: ID-7294' },
    { type: 'ALERT', msg: 'Suspicious login attempt blocked from IP: 192.168.1.105' },
    { type: 'INFO', msg: 'Syncing tactical nodes...' },
    { type: 'OK', msg: 'Encryption layer updated (AES-256)' },
    { type: 'ALERT', msg: 'Brute force attack detected on Primary_Gateway' },
    { type: 'INFO', msg: 'Optimizing AI response vectors...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLogs(prev => [...prev.slice(-14), { ...template, time: new Date().toLocaleTimeString() }]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/90 dark:bg-[#070B14] border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-fuchsia-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Hacker Terminal</h2>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="p-6 h-[300px] overflow-y-auto font-mono text-[11px] leading-relaxed scroll-smooth scrollbar-hide"
      >
        <div className="space-y-1.5">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span className={`font-bold shrink-0 ${
                log.type === 'OK' ? 'text-emerald-400' : 
                log.type === 'ALERT' ? 'text-rose-400' : 'text-fuchsia-400'
              }`}>[{log.type}]</span>
              <span className="text-slate-300">{log.msg}</span>
            </motion.div>
          ))}
          <div className="flex items-center gap-1">
            <span className="text-fuchsia-400 font-bold">$</span>
            <div className="w-2 h-4 bg-fuchsia-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


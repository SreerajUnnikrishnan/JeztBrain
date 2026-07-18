import React, { useState, useEffect } from 'react';
import { Activity, Terminal, Shield, Zap, Lock, Globe, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActivityLog() {
  const [logs, setLogs] = useState([
    { id: 1, action: "Authentication successful", target: "Node-44-B", time: "Just now", icon: <Lock size={14}/>, color: "text-emerald-400" },
    { id: 2, action: "Decryption protocol initiated", target: "Data-Pack-X", time: "2m ago", icon: <Zap size={14}/>, color: "text-hacker-neon" },
    { id: 3, action: "External firewall ping detected", target: "Gateway-01", time: "5m ago", icon: <Globe size={14}/>, color: "text-amber-400" },
    { id: 4, action: "Backup system synchronized", target: "Sector-7", time: "12m ago", icon: <HardDrive size={14}/>, color: "text-purple-400" },
    { id: 5, action: "Vulnerability scan completed", target: "Core-Mainframe", time: "24m ago", icon: <Shield size={14}/>, color: "text-emerald-400" },
  ]);

  // Simulate auto-updating logs
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        { text: "Encrypted handshake verified", target: "Socket-92", icon: <Lock size={14}/>, color: "text-emerald-400" },
        { text: "Cache cleared on secondary node", target: "Node-12", icon: <Zap size={14}/>, color: "text-hacker-neon" },
        { text: "Intrusion attempt blocked", target: "Firewall-A1", icon: <Shield size={14}/>, color: "text-red-400" },
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newLog = {
        id: Date.now(),
        action: randomAction.text,
        target: randomAction.target,
        time: "Just now",
        icon: randomAction.icon,
        color: randomAction.color
      };

      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-hacker-card/40 backdrop-blur-md border border-white/10 rounded-[28px] overflow-hidden flex flex-col h-full shadow-xl">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-transparent to-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Terminal size={20} className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-tight">Activity Log</h3>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-0.5">Tactical Event Stream</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-hacker-neon animate-pulse"></span>
           <span className="text-[9px] font-mono text-gray-600 uppercase">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div className={`mt-0.5 p-1.5 rounded-lg bg-black/20 ${log.color}`}>
                {log.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <p className="text-[11px] font-bold text-gray-300 leading-tight group-hover:text-white transition-colors truncate">
                    {log.action}
                  </p>
                  <span className="text-[9px] text-gray-600 shrink-0 ml-2">{log.time}</span>
                </div>
                <p className="text-[9px] text-gray-500 truncate">
                  <span className="text-hacker-neon/60 mr-1">&gt;</span> target: <span className="text-gray-400">{log.target}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-black/20 border-t border-white/5">
        <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-all">
          View Full Audit Trail
        </button>
      </div>
    </div>
  );
}


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', text: 'JeztBrain SOC Secure Terminal v4.0.2' },
    { type: 'system', text: 'Establishing secure uplink... OK' },
    { type: 'system', text: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    setHistory(prev => [...prev, { type: 'user', text: `root@soc:~# ${trimmed}` }]);
    
    setTimeout(() => {
      let response = '';
      switch(trimmed.toLowerCase()) {
        case 'help':
          response = "Available commands: scan, trace, logs, isolate, status, clear";
          break;
        case 'scan':
          response = "Initiating deep packet inspection...\nFound 0 vulnerabilities. Network is secure.";
          break;
        case 'trace':
          response = "Tracing route to origin...\nIP: 192.168.1.100 (Internal) - Latency 2ms";
          break;
        case 'logs':
          response = "Fetching latest auth logs...\n[ERR] Failed login attempt from 45.33.22.11";
          break;
        case 'isolate':
          response = "WARNING: Node isolation requires active incident ID.";
          break;
        case 'status':
          response = "System Status: NOMINAL\nActive Connections: 1,432\nThreat Level: ELEVATED";
          break;
        case 'clear':
          setHistory([]);
          return;
        default:
          response = `Command not found: ${trimmed}`;
      }
      setHistory(prev => [...prev, { type: 'response', text: response }]);
    }, 600);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`bg-[#0B0F19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${isFullscreen ? 'fixed inset-4' : 'w-full max-w-3xl h-[500px]'}`}
        >
          <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2 text-slate-400">
              <TerminalIcon size={16} />
              <span className="text-xs font-mono">SOC_Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white">
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button onClick={onClose} className="p-1 hover:bg-rose-500/20 rounded text-slate-400 hover:text-rose-400">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar bg-black/60">
            {history.map((line, i) => (
              <div key={i} className={`mb-2 whitespace-pre-wrap ${
                line.type === 'user' ? 'text-fuchsia-400' : 
                line.type === 'system' ? 'text-slate-500' : 'text-emerald-400'
              }`}>
                {line.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-2 border-t border-white/10 bg-black/40 flex items-center font-mono">
            <span className="text-fuchsia-400 mr-2 text-sm">root@soc:~#</span>
            <form onSubmit={onSubmit} className="flex-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-none outline-none text-white text-sm"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

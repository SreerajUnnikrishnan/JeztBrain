import React, { useState } from 'react';
import { Terminal, Search, Shield, AlertTriangle, Play, Loader2, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Scanner() {
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    if (!target) return;
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 5000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse"></div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Security_Vulnerability_Scanner</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scanner Control */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="ENTER_IP_OR_DOMAIN..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-mono tracking-widest focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/[0.07] text-white transition-all uppercase"
                />
              </div>
              <button 
                onClick={startScan}
                disabled={isScanning || !target}
                className="px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-black text-xs rounded-2xl uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(123, 47, 247,0.3)] hover:shadow-[0_0_30px_rgba(123, 47, 247,0.5)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isScanning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                {isScanning ? 'Scanning...' : 'Initialize Scan'}
              </button>
            </div>

            {/* Terminal Output Placeholder */}
            <div className="bg-black/60 rounded-2xl p-6 font-mono text-[10px] space-y-2 border border-white/5 min-h-[300px]">
              <p className="text-fuchsia-500/50 italic underline mb-4">TACTICAL_TERMINAL_V1.0.4</p>
              {!isScanning && !target && <p className="text-slate-600">READY_FOR_TARGET_ACQUISITION...</p>}
              {target && <p className="text-emerald-400">Target locked: {target}</p>}
              {isScanning && (
                <div className="space-y-1">
                  <p className="text-slate-400 animate-pulse">[INFO] Initializing port enumeration...</p>
                  <p className="text-slate-400 animate-pulse delay-75">[INFO] Injecting stealth probes...</p>
                  <p className="text-slate-400 animate-pulse delay-150">[INFO] Mapping network topology...</p>
                  <p className="text-slate-400 animate-pulse delay-300">[WARN] High latency detected on port 443...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel: Scan History/Results */}
        <div className="space-y-6">
          <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400 mb-6">Recent_Scans</h3>
            <div className="space-y-4">
              {[
                { target: '192.168.1.1', score: '84', status: 'Secure' },
                { target: 'dev.jeztbrain.ai', score: '22', status: 'Critical' },
              ].map((s, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase">{s.target}</p>
                    <p className={`text-[8px] font-mono mt-1 ${s.status === 'Critical' ? 'text-rose-500' : 'text-emerald-500'}`}>STATUS: {s.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">{s.score}/100</p>
                    <p className="text-[8px] text-slate-500 uppercase">Risk_Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

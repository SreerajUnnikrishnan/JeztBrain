import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Crosshair, Map as MapIcon } from 'lucide-react';

export default function ThreatMap() {
  // Mock attack data points
  const attacks = [
    { id: 1, top: '30%', left: '20%', type: 'DDoS', severity: 'high', delay: 0 },
    { id: 2, top: '60%', left: '75%', type: 'Malware', severity: 'medium', delay: 1.5 },
    { id: 3, top: '45%', left: '50%', type: 'Phishing', severity: 'low', delay: 0.8 },
    { id: 4, top: '25%', left: '80%', type: 'Intrusion', severity: 'high', delay: 2.2 },
    { id: 5, top: '70%', left: '30%', type: 'Data Exfil', severity: 'medium', delay: 3.5 },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <MapIcon size={18} className="text-fuchsia-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Global Threat Map</h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> Live
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl bg-[#030712]/50 border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Abstract World Map Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCI+PHBhdGggZmlsbD0iIzIyRDNDRSIgZD0iTTEwMCAyMDBjMzAgMTAgNDAgMjAgNTAgMTBzMjAtMzAgNDAtNDAgMjAgMzAgNDAgNTB2MTBjMTAgMjAgMTAgMzAgMzAgNDB6Ii8+PHBhdGggZmlsbD0iIzIyRDNDRSIgZD0iTTUwMCAxMDBjMjAgMTAgMzAgMzAgNTAgNDB2MjBjMTAgMjAgMjAgMzAgNDAgNDB2MzB6Ii8+PHBhdGggZmlsbD0iIzIyRDNDRSIgZD0iTTgwMCAyNTBjMjAgMTAgNDAgMjAgNTAgMzBzMjAgMzAgNDAgNDB2MzB6Ii8+PC9zdmc+')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        ></div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123, 47, 247,0.05)_0%,transparent_70%)]"></div>

        {/* Attack Pulses */}
        {attacks.map((attack) => (
          <motion.div
            key={attack.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 2.5], 
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: attack.delay,
              ease: "easeOut"
            }}
            className={`absolute w-4 h-4 rounded-full -ml-2 -mt-2 ${
              attack.severity === 'high' ? 'bg-rose-500' : 
              attack.severity === 'medium' ? 'bg-amber-500' : 'bg-fuchsia-500'
            }`}
            style={{ top: attack.top, left: attack.left }}
          >
            <div className="absolute w-full h-full rounded-full border border-current animate-ping"></div>
          </motion.div>
        ))}

        {/* Attack Nodes */}
        {attacks.map((attack) => (
          <div
            key={`node-${attack.id}`}
            className="absolute group"
            style={{ top: attack.top, left: attack.left }}
          >
            <div className={`w-2 h-2 rounded-full -ml-1 -mt-1 shadow-[0_0_10px_currentColor] ${
              attack.severity === 'high' ? 'bg-rose-400 text-rose-500' : 
              attack.severity === 'medium' ? 'bg-amber-400 text-amber-500' : 'bg-fuchsia-400 text-fuchsia-500'
            }`}></div>
            
            {/* Tooltip */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#0B0F19] border border-white/10 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap z-20 pointer-events-none">
              <span className="font-bold text-white">{attack.type}</span>
              <span className="text-slate-400 ml-2">Detected</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

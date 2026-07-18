import React from 'react';
import ThreatOperationsCenter from '../../components/Dashboard/ThreatOperationsCenter';
import IncidentFeed from '../../components/Dashboard/IncidentFeed';
import ExpertStats from '../../components/Dashboard/ExpertStats';
import ActivityFeed from '../../components/Expert/Unified/ActivityFeed';
import { Shield, Zap, Target, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* 1. TOP SECTION: TACTICAL METRICS */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0:10px_rgba(123, 47, 247,0.8)] animate-pulse"></div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">SOC_Tactical_Metrics_V4</h2>
        </div>
        <ExpertStats />
      </section>

      {/* 2. MIDDLE SECTION: LIVE THREAT INTEL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Threat Operations Center */}
        <div className="lg:col-span-2 h-[500px]">
          <ThreatOperationsCenter />
        </div>

        {/* RIGHT: High-Priority Incidents */}
        <div className="h-[500px]">
          <IncidentFeed />
        </div>
      </section>

      {/* 3. BOTTOM SECTION: OPERATIONS & QUICK ACTIONS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Activity Stream */}
        <div className="lg:col-span-2 h-[450px]">
          <ActivityFeed />
        </div>

        {/* RIGHT: Quick Tactical Actions */}
        <div className="space-y-6">
          <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400 mb-8">Quick_Tactical_Actions</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-fuchsia-500 hover:text-black transition-all group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-black/10">
                  <Shield size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-tight">Deploy Countermeasures</p>
                  <p className="text-[8px] opacity-50 font-mono">Execute automated blocking</p>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-purple-500 hover:text-white transition-all group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-black/10">
                  <Zap size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-tight">Generate Threat Patch</p>
                  <p className="text-[8px] opacity-50 font-mono">Create dynamic hotfix</p>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-rose-500 hover:text-white transition-all group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-black/10">
                  <AlertTriangle size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-tight">Initiate Lockdown</p>
                  <p className="text-[8px] opacity-50 font-mono">Isolate critical nodes</p>
                </div>
              </button>
            </div>

            <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-2xl border-dashed">
               <p className="text-[8px] font-mono text-slate-500 uppercase leading-relaxed">
                 All tactical actions are logged and encrypted. Unauthorized execution will trigger internal security protocols.
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


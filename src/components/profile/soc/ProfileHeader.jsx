import React from 'react';
import { Shield, Award, CheckCircle, Clock, UploadCloud } from 'lucide-react';
import CertificationUpload from '../CertificationUpload'; // Assuming this handles avatar uploads too, or we can build a specific one.

export default function ProfileHeader({ profile, onAvatarUpload, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE': return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
      case 'INVESTIGATING': return 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
      case 'EMERGENCY RESPONSE': return 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse';
      case 'BUSY': return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      case 'OFFLINE': default: return 'bg-slate-600 shadow-[0_0_10px_rgba(71,85,105,0.5)]';
    }
  };

  const statusOptions = ['ONLINE', 'INVESTIGATING', 'EMERGENCY RESPONSE', 'BUSY', 'OFFLINE'];

  return (
    <div className="relative overflow-hidden bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl flex flex-col lg:flex-row items-center gap-10">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>

      {/* Avatar Section */}
      <div className="relative group shrink-0">
        <div className="absolute inset-0 bg-fuchsia-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="w-40 h-40 rounded-full border-4 border-white/10 relative overflow-hidden bg-black/50 z-10">
          <img 
            src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.display_name || 'SOC'}&backgroundColor=030712`} 
            alt="SOC Avatar" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             {/* We will reuse CertificationUpload for avatar or use a generic file input */}
             <label className="cursor-pointer flex flex-col items-center">
                <UploadCloud className="text-fuchsia-400 mb-2" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Update Image</span>
                {/* Input hidden here */}
             </label>
          </div>
        </div>
        {/* Status Pulse */}
        <div className={`absolute bottom-2 right-4 w-6 h-6 rounded-full border-4 border-[#0b1220] z-20 ${getStatusColor(profile?.availability?.toUpperCase() || 'ONLINE')}`}></div>
      </div>

      {/* Info Section */}
      <div className="flex-1 text-center lg:text-left space-y-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter italic">
            {profile?.display_name || profile?.full_name || 'SOC_OPERATOR_404'}
          </h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <CheckCircle size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{profile?.verification_status || 'VERIFIED_OPERATOR'}</span>
          </div>
        </div>
        
        <p className="text-sm font-mono text-fuchsia-400 uppercase tracking-widest">
          LEVEL {profile?.soc_level || 4} // {profile?.specialization || 'INCIDENT RESPONSE SPECIALIST'}
        </p>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-xl">
             <Award size={18} className="text-amber-400" />
             <div>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Trust Score</p>
               <p className="text-sm text-white font-mono">{profile?.trust_score || '99.8'}%</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-xl">
             <Clock size={18} className="text-purple-400" />
             <div>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Last Active</p>
               <p className="text-sm text-white font-mono">{profile?.updated_at ? new Date(profile.updated_at).toLocaleTimeString() : 'JUST NOW'}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Tactical Status Selector */}
      <div className="shrink-0 bg-black/40 border border-white/5 rounded-2xl p-4 w-full lg:w-64 space-y-3">
         <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
            <Shield size={14} className="text-fuchsia-500" /> Tactical Status
         </h3>
         <select 
            value={profile?.availability?.toUpperCase() || 'ONLINE'}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-[#0b1220] border border-white/10 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-fuchsia-500 transition-colors cursor-pointer appearance-none"
         >
           {statusOptions.map(s => (
             <option key={s} value={s}>{s}</option>
           ))}
         </select>
      </div>
    </div>
  );
}

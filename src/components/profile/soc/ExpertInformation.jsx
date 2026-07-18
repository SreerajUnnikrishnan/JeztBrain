import React from 'react';
import { User, FileText, Save, Loader2, Globe, Clock, Mail, AlertTriangle, Briefcase, Hash, Shield } from 'lucide-react';

export default function ExpertInformation({ profile, setProfile, onSave, saving }) {
  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-fuchsia-500/10 transition-colors duration-700"></div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400 border border-fuchsia-500/20">
          <User size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Expert_Information</h3>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Operational Directives & Identity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <User size={12} className="text-fuchsia-400" /> Full_Name
          </label>
          <input 
            type="text"
            name="full_name"
            value={profile.full_name || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="Legal Name"
          />
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <Hash size={12} className="text-fuchsia-400" /> Display_Name
          </label>
          <input 
            type="text"
            name="display_name"
            value={profile.display_name || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="Operator Callsign"
          />
        </div>

        {/* Specialization */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <Shield size={12} className="text-fuchsia-400" /> Specialization
          </label>
          <input 
            type="text"
            name="specialization"
            value={profile.specialization || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="e.g. Incident Response"
          />
        </div>

        {/* Years of Experience */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <Briefcase size={12} className="text-fuchsia-400" /> Experience_Years
          </label>
          <input 
            type="number"
            name="years_of_experience"
            value={profile.years_of_experience || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="e.g. 5"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <Globe size={12} className="text-fuchsia-400" /> Country_Origin
          </label>
          <input 
            type="text"
            name="country"
            value={profile.country || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="Location"
          />
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <Clock size={12} className="text-fuchsia-400" /> Timezone
          </label>
          <input 
            type="text"
            name="timezone"
            value={profile.timezone || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="e.g. UTC-5"
          />
        </div>

        {/* Contact Email */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <Mail size={12} className="text-fuchsia-400" /> Contact_Email
          </label>
          <input 
            type="email"
            name="contact_email"
            value={profile.contact_email || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
            placeholder="Secure Email"
          />
        </div>

        {/* Emergency Contact */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <AlertTriangle size={12} className="text-rose-400" /> Emergency_Contact
          </label>
          <input 
            type="text"
            name="emergency_contact"
            value={profile.emergency_contact || ''}
            onChange={handleChange}
            className="w-full bg-rose-500/5 border border-rose-500/20 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:border-rose-500/50 transition-all font-medium"
            placeholder="Escalation Number"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
            <FileText size={12} className="text-fuchsia-400" /> Operational_Directives (Bio)
          </label>
          <textarea 
            rows="4"
            name="bio"
            value={profile.bio || ''}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none leading-relaxed"
            placeholder="Describe your operational focus..."
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-xl flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(123, 47, 247,0.2)] hover:shadow-[0_0_30px_rgba(123, 47, 247,0.4)] active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Sync_Identity_Records
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { User, Shield, Globe, Award, Save, Loader2, Info, X, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import CertificationUpload from './CertificationUpload';

export default function ProfileSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
    specialization: '',
    skills: [],
    certifications: [],
    availability: 'online',
    linkedin_url: '',
    github_url: ''
  });

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || data.name || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || data.avatarUrl || '',
          specialization: data.specialization || data.title || '',
          skills: data.skills || [],
          certifications: data.certifications || data.certs || [],
          availability: data.availability || 'online',
          linkedin_url: data.linkedin_url || '',
          github_url: data.github_url || ''
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load operational profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        id: user.id,
        full_name: profile.full_name,
        name: profile.full_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        avatarUrl: profile.avatar_url,
        specialization: profile.specialization,
        title: profile.specialization,
        skills: profile.skills,
        certifications: profile.certifications,
        certs: profile.certifications,
        linkedin_url: profile.linkedin_url,
        github_url: profile.github_url,
        updated_at: new Date().toISOString()
      };

      // Only include availability if it's actually supported or default to a safe update
      if (profile.availability) {
        updateData.availability = profile.availability;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(updateData);

      if (error) {
        // If it's a column missing error, retry without availability
        if (error.code === 'PGRST204' || error.message?.includes('availability')) {
          console.warn('Availability column missing, retrying without it...');
          delete updateData.availability;
          const { error: retryError } = await supabase.from('profiles').upsert(updateData);
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }
      toast.success('Operational profile updated.');
    } catch (err) {
      console.error(err);
      toast.error('Identity sync failed. Please verify database schema.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-fuchsia-500" size={32} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ─── Left Panel: Bio & Status ─── */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center shadow-2xl">
          <div className="relative inline-block mb-8 group">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName}&backgroundColor=030712`} 
              alt="Avatar" 
              className="w-36 h-36 rounded-[2.5rem] border-4 border-white/10 object-cover shadow-2xl relative z-10"
            />
            <div className={`absolute bottom-3 right-3 w-8 h-8 rounded-full border-4 border-[#070B14] z-20 ${
              profile.availability === 'online' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 
              profile.availability === 'busy' ? 'bg-amber-500' : 'bg-slate-600'
            }`}></div>
          </div>
          
          <div className="mb-8">
            <CertificationUpload 
              bucket="avatars" 
              onUploadComplete={(url) => setProfile({...profile, avatar_url: url})} 
            />
          </div>
          
          <div className="space-y-4 text-left">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Tactical_Status</label>
            <div className="grid grid-cols-1 gap-2">
              {['online', 'busy', 'offline'].map((status) => (
                <button
                  key={status}
                  onClick={() => setProfile({...profile, availability: status})}
                  className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    profile.availability === status 
                      ? 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400' 
                      : 'bg-white/5 border-transparent text-slate-500 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Connections */}
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
            <ExternalLink size={14} className="text-fuchsia-400" /> Operational_Nodes
          </h3>
          
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <input 
                type="text"
                value={profile.linkedin_url}
                onChange={(e) => setProfile({...profile, linkedin_url: e.target.value})}
                placeholder="LINKEDIN_URL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] font-mono tracking-widest text-white focus:outline-none focus:border-fuchsia-500/50 uppercase"
              />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </div>
              <input 
                type="text"
                value={profile.github_url}
                onChange={(e) => setProfile({...profile, github_url: e.target.value})}
                placeholder="GITHUB_URL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] font-mono tracking-widest text-white focus:outline-none focus:border-fuchsia-500/50 uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right Panel: Identity & Skills ─── */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400 border border-fuchsia-500/20"><User size={24} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Clearance_Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Operator_Legal_Name</label>
              <input 
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Primary_Specialization</label>
              <input 
                type="text"
                value={profile.specialization}
                onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Operational_Directives (Bio)</label>
            <textarea 
              rows="5"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
              <Award size={14} className="text-fuchsia-400" /> Professional_Certifications
            </label>
            
            <div className="p-8 border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <CertificationUpload onUploadComplete={(url) => setProfile(prev => ({...prev, certifications: [...prev.certifications, url]}))} />
              
              {profile.certifications.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {profile.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-fuchsia-500/30 transition-all">
                      <div className="flex items-center gap-4 truncate">
                        <Shield size={16} className="text-fuchsia-400 shrink-0" />
                        <span className="text-[10px] font-black text-slate-400 truncate uppercase tracking-widest">CERT_NODE_{i+1}</span>
                      </div>
                      <button 
                        onClick={() => setProfile(prev => ({...prev, certifications: prev.certifications.filter((_, idx) => idx !== i)}))}
                        className="p-2 hover:bg-rose-500/20 text-slate-600 hover:text-rose-400 rounded-xl transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-10 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-12 py-5 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl flex items-center gap-4 transition-all shadow-[0_0_30px_rgba(123, 47, 247,0.3)] hover:shadow-[0_0_40px_rgba(123, 47, 247,0.5)] active:scale-95 disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Sync_Operational_Base</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

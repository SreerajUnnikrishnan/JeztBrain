import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Shield, Upload, Plus, X, Loader2, Save, CheckCircle2, Image, FileText } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills & Certs', icon: Briefcase },
  { id: 'specialist', label: 'Specialist Info', icon: Shield },
];

const SPECIALIZATIONS = [
  'Network Security', 'Malware Analysis', 'Incident Response',
  'Cloud Security', 'Penetration Testing', 'Digital Forensics',
  'Threat Intelligence', 'Compliance & Audit', 'Application Security',
];

export default function ExpertSettings({ onClose }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [certifications, setCertifications] = useState([]);

  const [form, setForm] = useState({
    name: '',
    bio: '',
    image_url: '',
    skills: [],
    experience: '',
    specialization: '',
    availability: 'online',
  });
  const [skillInput, setSkillInput] = useState('');

  // Load existing profile
  useEffect(() => {
    if (!user?.id) return;
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('expert_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setForm({
            name: data.name || '',
            bio: data.bio || '',
            image_url: data.image_url || '',
            skills: data.skills || [],
            experience: data.experience || '',
            specialization: data.specialization || '',
            availability: data.availability || 'online',
          });
        }

        // Load certifications
        const { data: certs } = await supabase
          .from('certifications')
          .select('*')
          .eq('expert_id', user.id)
          .order('created_at', { ascending: false });

        setCertifications(certs || []);
      } catch (err) {
        console.warn('[Settings] Load error:', err.message);
      }
    };
    load();
  }, [user?.id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.id) return;

    setUploadingImage(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `avatars/${user.id}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from('expert-assets')
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;

      const { data: { publicUrl } } = supabase.storage
        .from('expert-assets')
        .getPublicUrl(path);

      setForm(f => ({ ...f, image_url: publicUrl }));
      toast.success('Profile image uploaded!');
    } catch (err) {
      console.error('[Settings] Image upload error:', err.message);
      toast.error('Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCertUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.id) return;

    setUploadingCert(true);
    try {
      const path = `certifications/${user.id}/${Date.now()}_${file.name}`;

      const { error: upErr } = await supabase.storage
        .from('expert-assets')
        .upload(path, file);
      if (upErr) throw upErr;

      const { data: { publicUrl } } = supabase.storage
        .from('expert-assets')
        .getPublicUrl(path);

      const { data: certRow, error: dbErr } = await supabase
        .from('certifications')
        .insert([{
          expert_id: user.id,
          title: file.name.replace(/\.[^/.]+$/, ''),
          file_url: publicUrl,
        }])
        .select()
        .single();

      if (dbErr) throw dbErr;
      setCertifications(prev => [certRow, ...prev]);
      toast.success('Certification uploaded!');
    } catch (err) {
      console.error('[Settings] Cert upload error:', err.message);
      toast.error('Certification upload failed.');
    } finally {
      setUploadingCert(false);
    }
  };

  const removeCert = async (id) => {
    try {
      await supabase.from('certifications').delete().eq('id', id);
      setCertifications(prev => prev.filter(c => c.id !== id));
      toast.success('Certification removed.');
    } catch (err) {
      toast.error('Failed to remove certification.');
    }
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('expert_profiles')
        .upsert([{
          id: user.id,
          name: form.name,
          bio: form.bio,
          image_url: form.image_url,
          skills: form.skills,
          experience: form.experience,
          specialization: form.specialization,
          availability: form.availability,
          updated_at: new Date().toISOString(),
        }], { onConflict: 'id' });

      if (error) throw error;
      toast.success('Settings saved successfully!');
    } catch (err) {
      console.error('[Settings] Save error:', err.message);
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-[#0D1117] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div>
            <h2 className="text-white font-bold text-xl tracking-tight">Expert Settings</h2>
            <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">Profile & Configuration</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-8 pt-6">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-hacker-neon text-white shadow-[0_0_15px_rgba(123, 47, 247,0.3)]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative shrink-0">
                    <div className="h-20 w-20 rounded-2xl border border-white/10 overflow-hidden bg-hacker-neon/10 flex items-center justify-center">
                      {form.image_url
                        ? <img src={form.image_url} alt="avatar" className="w-full h-full object-cover" />
                        : <User size={32} className="text-gray-600" />
                      }
                    </div>
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                        <Loader2 size={20} className="animate-spin text-hacker-neon" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                      <Image size={14} /> Upload Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <p className="text-[10px] text-gray-600 mt-2 font-mono">JPG, PNG, WebP — max 2MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Display Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your tactical name..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-hacker-neon/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={4}
                    placeholder="Describe your expertise and background..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-hacker-neon/50 transition-all resize-none font-mono leading-relaxed"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Skills</label>
                  <div className="flex gap-2">
                    <input
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                      placeholder="e.g. Metasploit, Wireshark..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-hacker-neon/50 transition-all"
                    />
                    <button onClick={addSkill} className="px-4 py-3 bg-hacker-neon text-white rounded-xl hover:bg-purple-600 transition-all font-bold text-sm">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.skills.map(skill => (
                      <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-hacker-neon/10 border border-hacker-neon/20 rounded-lg text-xs font-bold text-hacker-neon">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Years of Experience</label>
                  <input
                    value={form.experience}
                    onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                    placeholder="e.g. 5 years in red team operations..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-hacker-neon/50 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Certifications</label>
                    <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white transition-all ${uploadingCert ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploadingCert ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      Upload Cert
                      <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleCertUpload} disabled={uploadingCert} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    {certifications.length === 0 ? (
                      <p className="text-xs text-gray-600 font-mono py-4 text-center border border-dashed border-white/10 rounded-xl">No certifications uploaded yet</p>
                    ) : (
                      certifications.map(cert => (
                        <div key={cert.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl group">
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-hacker-neon shrink-0" />
                            <span className="text-xs text-white font-medium truncate max-w-[200px]">{cert.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={cert.file_url} target="_blank" rel="noreferrer" className="text-[10px] text-gray-500 hover:text-hacker-neon transition-colors font-mono">View</a>
                            <button onClick={() => removeCert(cert.id)} className="text-gray-700 hover:text-red-400 transition-colors"><X size={14} /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'specialist' && (
              <motion.div key="specialist" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Primary Specialization</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SPECIALIZATIONS.map(spec => (
                      <button
                        key={spec}
                        onClick={() => setForm(f => ({ ...f, specialization: spec }))}
                        className={`px-3 py-2.5 rounded-xl text-left text-xs font-bold border transition-all ${
                          form.specialization === spec
                            ? 'bg-hacker-neon/20 border-hacker-neon/50 text-hacker-neon'
                            : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Availability Status</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'online', label: 'Online', color: 'bg-emerald-500', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.4)]' },
                      { value: 'busy', label: 'Busy', color: 'bg-amber-500', glow: 'shadow-[0_0_10px_rgba(245,158,11,0.4)]' },
                      { value: 'offline', label: 'Offline', color: 'bg-slate-500', glow: '' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setForm(f => ({ ...f, availability: opt.value }))}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold border transition-all ${
                          form.availability === opt.value
                            ? `border-white/20 bg-white/10 text-white ${opt.glow}`
                            : 'border-white/10 text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-white/5 bg-black/20">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all font-bold">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-hacker-neon hover:bg-purple-600 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(123, 47, 247,0.3)] disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

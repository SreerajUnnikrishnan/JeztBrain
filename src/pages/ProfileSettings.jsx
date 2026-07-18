import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Lock, Mail, Save, ShieldCheck, Upload, 
  AlertCircle, Terminal, Trash2, Key, Bell, Shield, 
  Smartphone, Monitor, Eye, EyeOff, CheckCircle2, XCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

export default function ProfileSettings() {
  const { user, logout, role } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Security state
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Preferences
  const [prefs, setPrefs] = useState({
    theme: 'dark',
    emailAlerts: true,
    pushAlerts: true,
    highPriorityOnly: false
  });

  useEffect(() => {
    // Load from localStorage or user context
    const savedProfile = JSON.parse(localStorage.getItem(`jezt-profile-${user?.uid}`)) || {};
    
    setName(savedProfile.name || user?.displayName || '');
    setEmail(savedProfile.email || user?.email || '');
    setPhone(savedProfile.phone || '');
    setAvatarPreview(savedProfile.photoURL || user?.photoURL || null);
    
    // Notifications & Theme
    setPrefs(prev => ({
      ...prev,
      ...savedProfile.prefs
    }));
  }, [user]);

  useEffect(() => {
    // Check for changes to enable/disable save button
    const saved = JSON.parse(localStorage.getItem(`jezt-profile-${user?.uid}`)) || {};
    
    const isNameChanged = name !== (saved.name || user?.displayName || '');
    const isPhoneChanged = phone !== (saved.phone || '');
    const isAvatarChanged = avatarFile !== null;
    const isPrefsChanged = JSON.stringify(prefs) !== JSON.stringify(saved.prefs || {
      theme: 'dark',
      emailAlerts: true,
      pushAlerts: true,
      highPriorityOnly: false
    });
    
    setHasChanges(isNameChanged || isPhoneChanged || isAvatarChanged || isPrefsChanged);
  }, [name, phone, avatarFile, prefs, user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    const loadingToast = toast.loading('SYNCHRONIZING_IDENTITY_VECTORS...');

    try {
      // 1. Prepare Payload
      const payload = {
        name,
        email,
        phone,
        prefs
      };

      // 2. Transmit to Node.js Backend
      const response = await axios.put('http://localhost:5000/api/user/profile', payload);

      if (response.data.success) {
        // 3. Update local state / storage
        const profileData = { ...payload, photoURL: avatarPreview };
        localStorage.setItem(`jezt-profile-${user.id}`, JSON.stringify(profileData));
        
        toast.success('IDENTITY_SYNC_COMPLETE: Node parameters updated.', { id: loadingToast });
        setHasChanges(false);
      }
    } catch (err) {
      console.error("SOC_SYNC_FAILURE:", err);
      toast.error(`SYNC_WARNING: ${err.response?.data?.error || 'Link failure.'}`, { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("CONFIRMATION_MISMATCH: New passwords do not match.");
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.new });
      if (error) throw error;
      toast.success("PASSWORD_ROTATED: Access keys updated successfully.");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(`ENCRYPTION_ERROR: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const getPassStrength = () => {
    const p = passwords.new;
    if (!p) return 0;
    let s = 0;
    if (p.length > 8) s += 25;
    if (/[A-Z]/.test(p)) s += 25;
    if (/[0-9]/.test(p)) s += 25;
    if (/[^A-Za-z0-9]/.test(p)) s += 25;
    return s;
  };

  return (
    <div className="space-y-8 pb-12">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-mono text-[10px] uppercase tracking-widest mb-4">
          <Terminal size={12} /> Node Configuration
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4">
          <ShieldCheck className="text-fuchsia-400" size={36} /> Control Center
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Manage your agent identity, security protocols, and interface preferences.</p>
      </header>

      <div className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] transition-colors duration-300">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 bg-slate-50 dark:bg-black/20 border-r border-slate-200 dark:border-white/5 p-6 flex flex-col gap-2">
          {[
            { id: 'profile', label: 'Identity Profile', icon: <User size={18} /> },
            { id: 'security', label: 'Security Keys', icon: <Lock size={18} /> },
            { id: 'notifications', label: 'Alert Routing', icon: <Bell size={18} /> },
            { id: 'system', label: 'System Preferences', icon: <Shield size={18} /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all relative overflow-hidden group ${
                activeTab === tab.id ? 'bg-fuchsia-500 text-black shadow-[0_0_20px_rgba(123, 47, 247,0.2)]' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tabGlow" className="absolute inset-0 bg-white/20 animate-pulse" />
              )}
            </button>
          ))}
          
          <div className="mt-auto pt-6 border-t border-white/5">
            <button 
              onClick={logout}
              className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-rose-400 font-bold text-sm hover:bg-rose-500/10 transition-all"
            >
              <Trash2 size={18} /> Terminate Session
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 lg:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div 
                key="profile" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }} 
                className="space-y-10 max-w-2xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-[32px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl group-hover:border-fuchsia-500/50 transition-all relative">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 text-4xl font-bold bg-fuchsia-500/5">
                          {name ? name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                    <label className="absolute inset-0 bg-fuchsia-500/40 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                      <Upload className="text-black font-bold" size={24} />
                      <input type="file" className="hidden" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setAvatarFile(file);
                          setAvatarPreview(URL.createObjectURL(file));
                        }
                      }} />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Agent Identity Vector</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-mono mb-4">Protocol: Authorized_Personnel</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest">
                        Role: {
                          role === 'security' ? 'Security Specialist' : 
                          role === 'network' ? 'Network Specialist' : 
                          role === 'admin' ? 'Administrator' : 'General User'
                        }
                      </span>
                      {avatarPreview && (
                        <button 
                          onClick={() => { setAvatarPreview(null); setAvatarFile(null); }}
                          className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500/20 transition-all"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-6 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white focus:border-fuchsia-500/50 outline-none transition-all text-sm"
                        placeholder="Agent Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-600" size={16} />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-6 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white focus:border-fuchsia-500/50 outline-none transition-all text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <div className="relative opacity-60">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-6 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white focus:border-fuchsia-500/50 outline-none transition-all text-sm"
                      />
                    </div>
                    <p className="text-[9px] text-slate-600 font-mono">Note: Email updates require central command authorization.</p>
                  </div>

                  <div className="pt-4 md:col-span-2">
                    <button 
                      type="submit" 
                      disabled={isSaving || !hasChanges}
                      className="px-8 py-3.5 bg-fuchsia-500 text-black font-bold rounded-2xl hover:shadow-[0_0_25px_rgba(123, 47, 247,0.4)] transition-all flex items-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'SYNCING...' : 'SAVE CHANGES'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <motion.div 
                key="security" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }} 
                className="space-y-10 max-w-2xl"
              >
                {/* Password Section */}
                <section className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Key className="text-fuchsia-600 dark:text-fuchsia-400" size={20} /> Access Key Rotation
                  </h3>
                  <form onSubmit={handlePasswordChange} className="space-y-6 bg-slate-50 dark:bg-black/20 p-8 rounded-3xl border border-slate-200 dark:border-white/5">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-600" size={16} />
                          <input 
                            type={showPass ? "text" : "password"} 
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            className="w-full pl-12 pr-12 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white focus:border-fuchsia-500/50 outline-none transition-all text-sm"
                            placeholder="Enter new complex key"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-fuchsia-400"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {/* Strength Indicator */}
                        <div className="space-y-2 px-1">
                          <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter">
                            <span className="text-slate-600">Entropy Level</span>
                            <span className={getPassStrength() > 75 ? 'text-emerald-400' : 'text-amber-400'}>{getPassStrength()}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${getPassStrength()}%` }}
                              className={`h-full ${getPassStrength() > 75 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
                        <div className="relative">
                          <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                          <input 
                            type={showPass ? "text" : "password"} 
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            className="w-full pl-12 pr-6 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-fuchsia-500/50 outline-none transition-all text-sm"
                            placeholder="Confirm complex key"
                          />
                        </div>
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                    >
                      Rotate Keys
                    </button>
                  </form>
                </section>

                {/* 2FA Section */}
                <section className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <ShieldCheck className="text-emerald-500" size={20} /> Multi-Factor Authentication
                  </h3>
                  <div className="bg-slate-100 dark:bg-black/20 p-6 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Enhanced Protocol (2FA)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Require a secondary verification code for all login attempts.</p>
                    </div>
                    <button 
                      onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${is2FAEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                      <motion.div 
                        animate={{ x: is2FAEnabled ? 26 : 2 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>
                </section>

                {/* Sessions Section */}
                <section className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Monitor className="text-purple-500" size={20} /> Active Sessions
                  </h3>
                  <div className="space-y-3">
                    {[
                      { device: 'Workstation OS (Windows)', location: 'New York, US', ip: '192.168.1.105', current: true },
                      { device: 'Mobile Neural Link (iOS)', location: 'Berlin, DE', ip: '10.0.0.42', current: false },
                    ].map((session, i) => (
                      <div key={i} className="bg-slate-100 dark:bg-black/20 p-5 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400">
                            <Monitor size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{session.device}</p>
                              {session.current && <span className="text-[8px] px-1.5 py-0.5 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20 rounded font-mono uppercase">Current</span>}
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{session.location} • {session.ip}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="text-xs font-bold text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <motion.div 
                key="notifications" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }} 
                className="space-y-8 max-w-2xl"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Alert Routing Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { id: 'emailAlerts', label: 'Email Intelligence Reports', desc: 'Receive detailed threat summaries via secure email.', icon: <Mail size={18} /> },
                      { id: 'pushAlerts', label: 'Push Tactical Alerts', desc: 'Immediate browser notifications for critical anomalies.', icon: <Bell size={18} /> },
                      { id: 'highPriorityOnly', label: 'Critical Only Filter', desc: 'Only trigger alerts for severity level "CRITICAL".', icon: <AlertCircle size={18} /> },
                    ].map((pref) => (
                      <div key={pref.id} className="bg-slate-100 dark:bg-black/20 p-6 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-between group hover:border-fuchsia-500/30 transition-all">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-fuchsia-400 group-hover:scale-110 transition-transform">
                            {pref.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{pref.label}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">{pref.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setPrefs({...prefs, [pref.id]: !prefs[pref.id]})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${prefs[pref.id] ? 'bg-fuchsia-500' : 'bg-slate-700'}`}
                        >
                          <motion.div 
                            animate={{ x: prefs[pref.id] ? 26 : 2 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SYSTEM TAB */}
            {activeTab === 'system' && (
              <motion.div 
                key="system" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }} 
                className="space-y-8 max-w-2xl"
              >
                 <div className="p-10 bg-slate-100 dark:bg-gradient-to-br dark:from-fuchsia-500/10 dark:to-purple-500/10 border border-slate-200 dark:border-white/10 rounded-3xl text-center space-y-6">
                    <Shield size={64} className="text-fuchsia-600 dark:text-fuchsia-400 mx-auto" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Interface Personalization</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
                      Adjust your terminal aesthetics for optimal mission focus. Appearance changes take effect across all linked nodes.
                    </p>
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`px-6 py-3 border rounded-xl font-bold flex items-center gap-2 transition-all ${
                          theme === 'light' 
                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                         <div className={`w-3 h-3 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div> Light_Mode
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`px-6 py-3 border rounded-xl font-bold flex items-center gap-2 transition-all ${
                          theme === 'dark' 
                            ? 'bg-fuchsia-500 text-black border-fuchsia-500 shadow-[0_0_20px_rgba(123, 47, 247,0.3)]' 
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                         <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}></div> Dark_Mode
                      </button>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


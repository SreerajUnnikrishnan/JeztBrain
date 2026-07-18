import React, { useState } from 'react';
import { Settings, Shield, Key, Bell, Moon, Sun, Smartphone, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SecuritySettings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      navigate('/auth');
    } catch (err) {
      toast.error('Failed to terminate session.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) throw error;
      toast.success('Password reset email sent.');
    } catch (err) {
      toast.error('Failed to initiate password reset.');
    }
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-slate-500/10 rounded-2xl text-slate-400 border border-slate-500/20">
          <Settings size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Security_Configuration</h3>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Platform Settings & Access</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Password Reset */}
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-colors">
           <div className="flex items-center gap-3">
              <Key size={18} className="text-fuchsia-400" />
              <div>
                 <p className="text-xs font-black text-white uppercase tracking-wider">Authentication Key</p>
                 <p className="text-[10px] text-slate-400 font-mono">Last changed: 30 days ago</p>
              </div>
           </div>
           <button onClick={resetPassword} className="px-4 py-2 bg-white/5 hover:bg-fuchsia-500/20 text-white hover:text-fuchsia-400 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">
             Rotate
           </button>
        </div>

        {/* 2FA */}
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-colors">
           <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-emerald-400" />
              <div>
                 <p className="text-xs font-black text-white uppercase tracking-wider">Multi-Factor Auth</p>
                 <p className="text-[10px] text-slate-400 font-mono">Authenticator App Active</p>
              </div>
           </div>
           <button 
              onClick={() => setMfaEnabled(!mfaEnabled)} 
              className={`w-12 h-6 rounded-full relative transition-colors ${mfaEnabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
           >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${mfaEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
           </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-colors">
           <div className="flex items-center gap-3">
              <Bell size={18} className="text-amber-400" />
              <div>
                 <p className="text-xs font-black text-white uppercase tracking-wider">Tactical Alerts</p>
                 <p className="text-[10px] text-slate-400 font-mono">Push & Email</p>
              </div>
           </div>
           <button className="px-4 py-2 bg-white/5 hover:bg-amber-500/20 text-white hover:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">
             Configure
           </button>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-colors">
           <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-orange-400" />}
              <div>
                 <p className="text-xs font-black text-white uppercase tracking-wider">UI Theme</p>
                 <p className="text-[10px] text-slate-400 font-mono">Dark Glassmorphism</p>
              </div>
           </div>
           <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-4 py-2 bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
           >
             Toggle
           </button>
        </div>

        {/* Session Terminate */}
        <div className="pt-6 mt-6 border-t border-white/5">
           <button 
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 p-4 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 rounded-2xl transition-all group/btn"
           >
              {loading ? <Loader2 size={20} className="animate-spin text-rose-400" /> : <LogOut size={20} className="text-rose-400 group-hover/btn:text-white" />}
              <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-400 group-hover/btn:text-white">Terminate Session</span>
           </button>
        </div>
      </div>
    </div>
  );
}

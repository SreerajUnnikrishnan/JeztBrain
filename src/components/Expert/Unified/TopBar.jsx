import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Shield, Menu, Search, Power, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';
import ExpertSettings from './ExpertSettings';

export default function TopBar({ status, setStatus }) {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const statusColors = {
    'Online': 'bg-emerald-500',
    'Busy': 'bg-amber-500',
    'Offline': 'bg-slate-500',
  };

  const statusGlows = {
    'Online': 'shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    'Busy': 'shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    'Offline': 'shadow-[0_0_10px_rgba(100,116,139,0.5)]',
  };

  return (
    <>
      <header className="h-20 bg-hacker-card/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 relative z-40">
        {/* Left: Branding & Search */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-hacker-neon rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(123, 47, 247,0.4)]">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div className="hidden lg:block">
              <h2 className="text-white font-bold text-lg tracking-tight leading-none mb-1">JeztBrain</h2>
              <span className="text-[10px] text-hacker-neon font-mono uppercase tracking-widest font-bold opacity-80">Expert Terminal</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl group focus-within:border-hacker-neon/50 transition-all">
            <Search size={18} className="text-gray-500 group-focus-within:text-hacker-neon transition-colors" />
            <input
              type="text"
              placeholder="Search incidents, logs, assets..."
              className="bg-transparent border-none outline-none text-sm text-gray-300 w-64 placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Right: Status, Notifications, Settings, Profile */}
        <div className="flex items-center gap-4">
          {/* Status Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-[#0F172A] p-1 rounded-xl border border-white/5">
            {['Online', 'Busy', 'Offline'].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  status === s
                    ? `${statusColors[s]} text-white ${statusGlows[s]}`
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          {/* Settings Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Notifications */}
          <NotificationPanel />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 pr-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
            >
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'Expert'}&backgroundColor=0B0F19`}
                  alt="Expert"
                  className="h-8 w-8 rounded-lg bg-hacker-bg border border-white/10"
                />
                <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-hacker-card ${statusColors[status]}`} />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-none mb-1">{user?.displayName || 'Agent_Null'}</p>
                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter">Security Specialist</p>
              </div>
              <ChevronDown size={14} className={`text-gray-500 group-hover:text-white transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-3 w-56 bg-hacker-card border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-white/5 mb-2">
                    <p className="text-xs font-bold text-white">{user?.email}</p>
                    <p className="text-[10px] text-hacker-neon font-mono mt-1">role: security_specialist</p>
                  </div>
                  <button
                    onClick={() => { setSettingsOpen(true); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Settings size={16} /> Account Settings
                  </button>
                  <div className="h-px bg-white/5 my-2" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Power size={16} /> Disconnect
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <AnimatePresence>
        {settingsOpen && <ExpertSettings onClose={() => setSettingsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

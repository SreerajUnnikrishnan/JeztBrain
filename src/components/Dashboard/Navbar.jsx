import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X, Activity } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import StatusToggle from './StatusToggle';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  React.useEffect(() => {
    console.log("TACTICAL_NAVBAR_V2_LOADED");
  }, []);



  return (
    <>
      <header className="h-20 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-6 z-40 sticky top-0">
        {/* LEFT: Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(123, 47, 247,0.3)]">
            <Activity className="text-white w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-xl tracking-tight leading-none">JeztBrain</h1>
            <p className="text-[10px] text-fuchsia-400 font-mono tracking-widest uppercase mt-0.5">Tactical Command</p>
          </div>
        </div>

        {/* CENTER: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
          <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className={`${isSearchFocused ? 'text-fuchsia-400' : 'text-slate-500'} transition-colors`} />
            </div>
            <input 
              type="text" 
              placeholder="Search incidents, logs, assets..." 
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500/50 focus:bg-white/10 transition-all font-medium text-sm shadow-inner"
            />
            {isSearchFocused && (
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(123, 47, 247,0.15)] pointer-events-none -z-10"></div>
            )}
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden xl:flex items-center gap-8 mr-8">
          <NavLink id="nav-dashboard" to="/expert-dashboard" end className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>Dashboard</NavLink>
          <NavLink id="nav-cases" to="/expert-dashboard/cases" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>Cases</NavLink>
          <NavLink id="nav-chat" to="/expert-dashboard/chat" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>Live Chat</NavLink>
          <NavLink id="nav-intel" to="/expert-dashboard/intel" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>Threat Intel</NavLink>
          <NavLink id="nav-profile" to="/expert-dashboard/profile" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>Profile</NavLink>
        </nav>

        {/* RIGHT: Status Toggle, Notifications, Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:block">
            <StatusToggle />
          </div>

          <NotificationPanel />

          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

          <ProfileDropdown />

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 pt-20 bg-[#030712]/95 backdrop-blur-3xl border-b border-white/5">
          <div className="p-6 space-y-6">
             <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-500" />
              </div>
              <input 
                type="text" 
                placeholder="Search incidents..." 
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <NavLink to="/expert-dashboard" end onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `text-lg font-medium ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>Dashboard</NavLink>
              <NavLink to="/expert-dashboard/cases" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `text-lg font-medium ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>Cases</NavLink>
              <NavLink to="/expert-dashboard/chat" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `text-lg font-medium ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>Live Chat</NavLink>
              <NavLink to="/expert-dashboard/intel" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `text-lg font-medium ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>Threat Intel</NavLink>
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Set Status</p>
              <StatusToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

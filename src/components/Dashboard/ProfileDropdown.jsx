import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, Shield, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <User size={16} />, label: 'My Profile' },
    { icon: <Award size={16} />, label: 'Skills & Certifications' },
    { icon: <Shield size={16} />, label: 'Security Clearance' },
    { icon: <Settings size={16} />, label: 'Settings' },
  ];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 focus:outline-none group"
      >
        <div className="text-right hidden sm:block group-hover:text-fuchsia-400 transition-colors">
          <p className="text-sm font-bold text-white leading-none mb-1 group-hover:text-fuchsia-400 transition-colors">
            {user?.displayName || 'Agent_Null'}
          </p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold group-hover:text-fuchsia-400/70 transition-colors">
            SOC Level 4
          </p>
        </div>
        <div className="relative">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'hacker1'}&backgroundColor=030712`} 
            alt="User Profile" 
            className="h-10 w-10 rounded-xl border-2 border-white/10 bg-[#0B0F19] shadow-[0_0_15px_rgba(123, 47, 247,0.1)] group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_20px_rgba(123, 47, 247,0.3)] transition-all" 
          />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0B0F19]"></div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-[#0B0F19]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 bg-white/5">
              <p className="text-sm font-bold text-white">{user?.displayName || 'Agent_Null'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'unknown@soc.local'}</p>
            </div>
            
            <div className="p-2 space-y-1">
              {menuItems.map((item, idx) => (
                <button 
                  key={idx}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <span className="text-fuchsia-400/70">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-white/5">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
              >
                <LogOut size={16} />
                Logout Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

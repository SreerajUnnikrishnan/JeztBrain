import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Shield, ChevronDown, Activity, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // 1. Explicitly clear local storage
    localStorage.clear();
    sessionStorage.clear();
    
    // 2. Call Auth context logout (Supabase/Firebase)
    await logout();
    
    // 3. Redirect to login
    navigate('/auth');
    
    // 4. Force reload to clear any remaining memory state
    window.location.reload();
  };

  const menuItems = [
    { label: 'Agent Profile', icon: <User size={16} />, path: '/profile' },
    { label: 'Security Stats', icon: <Activity size={16} />, path: '/status' },
    { label: 'Subscription', icon: <CreditCard size={16} />, path: '/payment' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-white/5"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
            {user?.displayName || 'Authorized User'}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono">
            Security Lvl 4
          </p>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-500 p-[1.5px] shadow-[0_0_15px_rgba(123, 47, 247,0.2)] group-hover:shadow-[0_0_20px_rgba(123, 47, 247,0.4)] transition-all">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User size={20} className="text-fuchsia-600 dark:text-fuchsia-400" />
              )}
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#030712] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
          </div>
        </div>
        <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#070B14] border border-slate-200 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-2xl"
          >
            <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
                   {user?.photoURL ? (
                     <img src={user.photoURL} alt="p" className="w-full h-full object-cover rounded-full" />
                   ) : (
                     <Shield size={24} />
                   )}
                 </div>
                 <div className="min-w-0">
                   <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.displayName}</p>
                   <p className="text-[10px] text-slate-500 truncate font-mono uppercase tracking-tighter">
                     {user?.email}
                   </p>
                 </div>
              </div>
              <Link 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className="block w-full py-2.5 bg-fuchsia-500 text-black text-xs font-bold text-center rounded-xl hover:shadow-[0_0_15px_rgba(123, 47, 247,0.3)] transition-all uppercase tracking-widest"
              >
                Configure Node
              </Link>
            </div>

            <div className="p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all group"
                >
                  <span className="text-slate-400 dark:text-slate-500 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">{item.icon}</span>
                  <span className="text-xs font-bold">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="p-2 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all group"
              >
                <LogOut size={16} />
                <span className="text-xs font-bold">Terminate Session</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


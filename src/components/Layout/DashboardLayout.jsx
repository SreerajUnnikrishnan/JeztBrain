import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, MessageSquare, AlertCircle,
  List, Activity, CreditCard, Settings, LogOut,
  Menu, X, Bell, User, Search, ChevronRight, Home, ArrowLeft,
  MessageCircle, Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationBell from '../Notifications/NotificationBell';
import UserDropdown from './UserDropdown';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Find Experts', path: '/experts', icon: <Search size={20} /> },
    { name: 'Incidents', path: '/incidents', icon: <List size={20} /> },
    { name: 'Report Attack', path: '/report', icon: <AlertCircle size={20} />, highlight: true },
    { name: 'Live Chat', path: '/chat', icon: <MessageSquare size={20} /> },
    { name: 'System Status', path: '/status', icon: <Activity size={20} /> },
    { name: 'Subscription', path: '/payment', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/profile', icon: <Settings size={20} /> },
  ];

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    await logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#030712] overflow-hidden text-slate-900 dark:text-slate-300 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="relative flex flex-col bg-white dark:bg-[#070B14] border-r border-slate-200 dark:border-white/5 z-30 transition-colors duration-300"
      >
        {/* Sidebar Header */}
        <div className="flex items-center h-20 px-6 border-b border-slate-200 dark:border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-fuchsia-500/10 p-2 rounded-xl border border-fuchsia-500/20 group-hover:bg-fuchsia-500/20 transition-all">
              <Shield className="text-fuchsia-400" size={24} />
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl tracking-tight text-slate-900 dark:text-white"
              >
                JeztBrain
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group overflow-hidden ${isActive
                    ? 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20 shadow-[0_0_15px_rgba(123, 47, 247,0.1)]'
                    : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-400 shadow-[0_0_10px_rgba(123, 47, 247,0.8)]"
                  />
                )}
                <span className={`${isActive ? 'text-fuchsia-400' : 'group-hover:text-fuchsia-400 transition-colors'}`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`font-medium ${item.highlight ? 'text-rose-400' : ''}`}
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && isSidebarOpen && (
                  <ChevronRight size={14} className="ml-auto opacity-50" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5 space-y-3">
             <a href="https://chat.whatsapp.com/HzOrKjS0s5cFT7TsXFVg5F" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[#25D366]/5 border border-[#25D366]/20 hover:bg-[#25D366]/15 hover:shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:scale-[1.02] transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#25D366]/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <MessageCircle size={20} className="text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0 relative z-10" />
                {isSidebarOpen && (
                   <div className="flex flex-col whitespace-nowrap relative z-10">
                      <span className="text-[11px] font-black uppercase text-slate-800 dark:text-white tracking-wider">Community</span>
                      <span className="text-[9px] text-[#25D366] font-mono tracking-widest mt-0.5 group-hover:animate-pulse">Join Community</span>
                   </div>
                )}
             </a>
             
             <a href="https://whatsapp.com/channel/0029VbDLRyQLikgFVG9Y3p3b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20 hover:bg-fuchsia-500/10 hover:shadow-[0_0_15px_rgba(123, 47, 247,0.2)] hover:scale-[1.02] transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Radio size={20} className="text-fuchsia-500 dark:text-fuchsia-400 group-hover:scale-110 transition-transform flex-shrink-0 relative z-10" />
                {isSidebarOpen && (
                   <div className="flex flex-col whitespace-nowrap relative z-10">
                      <span className="text-[11px] font-black uppercase text-slate-800 dark:text-white tracking-wider">SOC Updates Channel</span>
                      <span className="text-[9px] text-fuchsia-500 dark:text-fuchsia-400 font-mono tracking-widest mt-0.5 group-hover:animate-pulse">Follow Channel</span>
                   </div>
                )}
             </a>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout System</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/80 dark:bg-[#030712]/40 backdrop-blur-md border-b border-slate-200 dark:border-white/5 relative z-20 transition-colors duration-300">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all text-slate-500 dark:text-slate-400 group flex items-center gap-2"
              title="Return to Home"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Home</span>
            </button>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Security Protocol: Secure
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
              <input
                type="text"
                placeholder="Search logs, tickets..."
                className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-fuchsia-500/50 focus:bg-slate-200 dark:focus:bg-white/10 text-slate-900 dark:text-white transition-all w-64"
              />
            </div>

            <NotificationBell />

            <div className="h-8 w-px bg-white/5 mx-2"></div>

            <UserDropdown />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Cyber Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}


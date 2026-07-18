import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  Shield, LayoutDashboard, Briefcase, MessageSquare, 
  Activity, FileText, Cpu, Search, Bell, User, 
  Settings, LogOut, Menu, X, ChevronRight,
  Globe, Terminal, Zap, ShieldAlert, Coins
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import UserDropdown from '../../components/Layout/UserDropdown';

export default function ExpertLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;
    
    const playTacticalPing = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch (e) {
        console.error(e);
      }
    };

    const handleNewIncident = (data) => {
      playTacticalPing();
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[#0b1220]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(123, 47, 247,0.2)] rounded-2xl pointer-events-auto border border-fuchsia-500/50 flex ring-1 ring-black/5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <ShieldAlert className="h-10 w-10 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(123, 47, 247,0.8)]" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em]">New Incident Reported</p>
                <p className="mt-1 text-sm font-bold text-white uppercase">{data.incidenttype || 'Unknown'}</p>
                <p className="mt-1 text-xs text-slate-400">Severity: <span className="text-white font-bold">{data.severitylevel || 'Medium'}</span></p>
                {data.user_id && <p className="mt-1 text-[10px] text-slate-500 font-mono">User ID: {data.user_id.substring(0, 8)}</p>}
              </div>
            </div>
          </div>
          <div className="flex border-l border-white/10">
            <button
               onClick={() => {
                 toast.dismiss(t.id);
                 navigate('/expert-dashboard/cases');
               }}
               className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-black text-fuchsia-400 hover:text-fuchsia-300 hover:bg-white/5 focus:outline-none uppercase tracking-widest"
            >
              View
            </button>
          </div>
        </div>
      ), { duration: 6000, position: 'top-right' });
    };

    socket.on('incident_created', handleNewIncident);
    return () => {
      socket.off('incident_created', handleNewIncident);
    };
  }, [socket, navigate]);

  const navItems = [
    { name: 'Dashboard', path: '/expert-dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Cases', path: '/expert-dashboard/cases', icon: <Briefcase size={20} /> },
    { name: 'Live Chat', path: '/expert-dashboard/chat', icon: <MessageSquare size={20} /> },
    { name: 'Threat Intel', path: '/expert-dashboard/intel', icon: <Globe size={20} /> },
    { name: 'AI Reports', path: '/expert-dashboard/reports', icon: <FileText size={20} /> },
    { name: 'Rewards & Revenue', path: '/expert-dashboard/rewards', icon: <Coins size={20} /> },
    { name: 'AI Monitoring', path: '/expert-dashboard/monitoring', icon: <Activity size={20} /> },
    { name: 'Scanner', path: '/expert-dashboard/scanner', icon: <Terminal size={20} /> },
    { name: 'Notifications', path: '/expert-dashboard/notifications', icon: <Bell size={20} /> },
    { name: 'Profile', path: '/expert-dashboard/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/expert-dashboard/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden text-slate-300 font-sans selection:bg-fuchsia-500/30">
      {/* ─── Cyber Background Layers ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(123, 47, 247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(123, 47, 247,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* ─── Sidebar Navigation ─── */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="relative flex flex-col bg-[#070B14]/80 backdrop-blur-xl border-r border-white/5 z-30 transition-all duration-300 ease-in-out"
      >
        {/* Sidebar Header */}
        <div className="flex items-center h-20 px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="bg-fuchsia-500/10 p-2.5 rounded-xl border border-fuchsia-500/20 group-hover:bg-fuchsia-500/30 transition-all shadow-[0_0_15px_rgba(123, 47, 247,0.2)]">
              <Shield className="text-fuchsia-400" size={24} />
            </div>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="font-black text-lg tracking-tighter text-white uppercase italic">JeztBrain</span>
                <span className="text-[8px] font-bold text-fuchsia-500 uppercase tracking-[0.4em] -mt-1">Tactical_OS</span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group overflow-hidden ${
                  isActive 
                    ? 'bg-fuchsia-500/10 text-white border border-fuchsia-500/20 shadow-[0_0_20px_rgba(123, 47, 247,0.15)]' 
                    : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-400 shadow-[0_0_15px_rgba(123, 47, 247,0.8)]"
                  />
                )}
                <span className={`${isActive ? 'text-fuchsia-400' : 'group-hover:text-fuchsia-400 transition-colors'}`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-black uppercase tracking-[0.1em]"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && isSidebarOpen && (
                  <ChevronRight size={14} className="ml-auto opacity-50 text-fuchsia-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest">Terminate</span>}
          </button>
        </div>
      </motion.aside>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Tactical Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#070B14]/40 backdrop-blur-md border-b border-white/5 relative z-20">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-fuchsia-400"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System_Status: Optimal
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Tactical Search */}
            <div className="relative group hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-400 transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH_INTEL_LOGS..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-mono tracking-widest focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/[0.07] text-white transition-all w-64 uppercase"
              />
            </div>

            <div className="h-8 w-px bg-white/5"></div>
            
            <UserDropdown />
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 custom-scrollbar relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page Footer Metadata */}
          <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] pb-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(123, 47, 247,0.5)]"></div>
                Uplink: Synchronized
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                Encryption: AES-256-GCM
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="opacity-50 tracking-tighter">JeztBrain Tactical Command</span>
              <span className="text-fuchsia-500/40 font-black">v4.0.0_STABLE</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Shield, Info, AlertTriangle, Check, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'threat': return <Shield className="text-rose-400" size={16} />;
      case 'success': return <Check className="text-emerald-400" size={16} />;
      case 'warning': return <AlertTriangle className="text-amber-400" size={16} />;
      default: return <Info className="text-fuchsia-400" size={16} />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-white/5 group"
      >
        <Bell size={20} className={isOpen ? 'text-slate-900 dark:text-white' : ''} />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(123, 47, 247,0.8)] border-2 border-white dark:border-[#030712] animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-[#070B14] border border-slate-200 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Alert Center</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Secure_Comms_Link: Active</p>
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-[10px] font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors uppercase tracking-tighter"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div 
                    key={n.id}
                    onClick={() => !n.isread && markAsRead(n.id)}
                    className={`px-6 py-4 border-b border-slate-100 dark:border-white/5 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-white/5 relative group ${!n.isread ? 'bg-fuchsia-500/[0.02]' : ''}`}
                  >
                    {!n.isread && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.5)]"></div>
                    )}
                    <div className="flex gap-4">
                      <div className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/5 ${!n.isread ? 'bg-slate-100 dark:bg-white/10' : 'bg-slate-50 dark:bg-white/5 opacity-50'}`}>
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-xs font-bold truncate ${!n.isread ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                            {n.title}
                          </h4>
                          <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600 whitespace-nowrap ml-2">
                            {n.created_at ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) : 'just now'}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-relaxed line-clamp-2 ${!n.isread ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500'}`}>
                          {n.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-slate-600 space-y-3">
                  <Shield size={32} className="opacity-20" />
                  <p className="text-[10px] uppercase font-mono tracking-[0.2em]">Zero anomalies detected</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-black/40 text-center border-t border-white/5">
              <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.15em]">
                View All Operations Logs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


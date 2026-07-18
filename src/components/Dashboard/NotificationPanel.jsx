import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, CheckCircle, Info, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('expert_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setNotifications(data);
  };

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <ShieldAlert className="text-rose-400" size={16} />;
      case 'success': return <CheckCircle className="text-emerald-400" size={16} />;
      default: return <Info className="text-fuchsia-400" size={16} />;
    }
  };

  const markAsRead = async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) return;
    
    fetchNotifications();

    const channel = supabase.channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `expert_id=eq.${user.id}` }, payload => {
        setNotifications(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/20"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500 border-2 border-[#030712]"></span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0B0F19]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[400px]"
          >
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-400 px-2 py-0.5 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">No notifications.</div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} onClick={() => !notif.is_read && markAsRead(notif.id)} className={`p-3 rounded-xl flex items-start gap-3 cursor-pointer transition-colors ${notif.is_read ? 'opacity-60 hover:bg-white/5' : 'bg-white/5 hover:bg-white/10'}`}>
                    <div className="mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notif.is_read ? 'text-slate-300' : 'text-white font-bold'}`}>{notif.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{notif.message}</p>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">{new Date(notif.created_at).toLocaleTimeString()}</p>
                    </div>
                    {!notif.is_read && <div className="w-2 h-2 rounded-full bg-fuchsia-500 mt-2"></div>}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

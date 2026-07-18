import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, CheckCircle, Info, Clock, Activity } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';

export default function ActivityFeed() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('expert_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setNotifications(data);
    setLoading(false);
  };

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <ShieldAlert className="text-rose-400" size={16} />;
      case 'success': return <CheckCircle className="text-emerald-400" size={16} />;
      default: return <Info className="text-fuchsia-400" size={16} />;
    }
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (!user) return;
    
    fetchNotifications();

    const channel = supabase.channel('public:notifications_feed')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications', 
        filter: `expert_id=eq.${user.id}` 
      }, payload => {
        setNotifications(prev => [payload.new, ...prev].slice(0, 20));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="flex flex-col h-full bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="text-fuchsia-400" size={18} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(123, 47, 247,1)]"></div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Activity Feed</h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Real-time system events</p>
          </div>
        </div>
        <div className="px-2 py-0.5 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded text-[9px] font-mono text-fuchsia-400 uppercase tracking-widest">
          Live_Sync
        </div>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-50">
            <div className="w-8 h-8 border-2 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Fetching Logs...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 opacity-40">
            <div className="p-4 bg-white/5 rounded-full border border-white/10">
              <Bell size={32} className="text-slate-500" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">No recent activity</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">System is currently stable</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-black/20 border border-white/5 group-hover:border-white/10 transition-colors">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-xs font-bold text-white truncate">{notif.title}</p>
                        <span className="text-[9px] text-slate-500 font-mono whitespace-nowrap flex items-center gap-1">
                          <Clock size={8} /> {getRelativeTime(notif.created_at)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/5 bg-black/20 text-center">
        <button 
          onClick={fetchNotifications}
          className="text-[9px] font-black text-slate-500 hover:text-fuchsia-400 uppercase tracking-[0.2em] transition-colors"
        >
          Force Refresh Logs
        </button>
      </div>
    </div>
  );
}

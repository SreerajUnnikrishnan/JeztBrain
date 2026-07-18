import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, ShieldAlert, MessageSquare, Briefcase, Zap, Clock, CheckCheck, X } from 'lucide-react';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const TYPE_CONFIG = {
  NEW_INCIDENT:  { Icon: ShieldAlert,    color: 'text-rose-500',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    label: 'New Incident'  },
  ASSIGNED:      { Icon: Briefcase,      color: 'text-fuchsia-400',    bg: 'bg-fuchsia-500/10',    border: 'border-fuchsia-500/20',    label: 'Case Assigned' },
  CHAT:          { Icon: MessageSquare,  color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  label: 'New Message'   },
  STATUS_CHANGE: { Icon: Zap,            color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   label: 'Status Update' },
  SYSTEM:        { Icon: Bell,           color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'System'        },
};

function getConfig(type) {
  return TYPE_CONFIG[type] || TYPE_CONFIG.SYSTEM;
}

export default function Notifications() {
  const { user, getAccessToken, role } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | unread
  const channelRef = useRef(null);

  // ─── Fetch from backend ────────────────────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const token = await getAccessToken();
      const res = await axios.get(`${BACKEND_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications || []);
    } catch (e) {
      console.error('[Notifications] fetch error:', e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // ─── Real-time: Supabase Realtime for new notifications ───────────────────
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const n = payload.new;
          const isForMe = n.user_id === user.id;
          const isExpert = ['security_specialist', 'network_specialist', 'expert', 'admin'].includes(role);
          const isGlobal = n.type === 'NEW_INCIDENT';

          if (isForMe || (isExpert && isGlobal)) {
            setNotifications(prev => {
              if (prev.find(x => x.id === n.id)) return prev;
              // Show a toast for the incoming notification
              const cfg = getConfig(n.type);
              toast(n.title || 'New Alert', {
                icon: '🔔',
                style: { background: '#0b1220', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
              });
              return [n, ...prev];
            });
          }
        }
      )
      .subscribe();

    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, role]);

  // ─── Mark single read ──────────────────────────────────────────────────────
  const markRead = async (id) => {
    try {
      const token = await getAccessToken();
      await axios.patch(`${BACKEND_URL}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (e) {
      console.error('[Notifications] markRead error:', e.message);
    }
  };

  // ─── Mark all read ─────────────────────────────────────────────────────────
  const markAllRead = async () => {
    try {
      const token = await getAccessToken();
      await axios.patch(`${BACKEND_URL}/api/notifications/all/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      toast.success('All notifications marked as read');
    } catch (e) {
      console.error('[Notifications] markAllRead error:', e.message);
    }
  };

  const displayed = filter === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse" />
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Global_Notification_Hub</h2>
            {unreadCount > 0 && (
              <p className="text-[9px] text-rose-400 font-mono uppercase tracking-widest mt-0.5">
                {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter tabs */}
          <div className="flex p-1 bg-white/5 border border-white/5 rounded-xl">
            {['all', 'unread'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  filter === tab ? 'bg-fuchsia-500 text-black' : 'text-slate-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-fuchsia-500/30 rounded-xl text-[9px] font-black text-slate-400 hover:text-fuchsia-400 uppercase tracking-widest transition-all"
            >
              <CheckCheck size={12} />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* ─── Notifications List ─── */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 opacity-50 space-y-3">
            <div className="w-7 h-7 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">Scanning alerts...</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center p-12 space-y-4 opacity-40">
            <Bell size={40} className="mx-auto text-slate-600" />
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
              {filter === 'unread' ? 'No unread alerts' : 'No alerts yet'}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {displayed.map((n, idx) => {
              const cfg = getConfig(n.type);
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className={`relative bg-[#0b1220]/80 backdrop-blur-xl border rounded-2xl p-5 group transition-all ${
                    n.is_read
                      ? 'border-white/5 opacity-70 hover:opacity-90'
                      : `${cfg.border} shadow-[0_0_20px_rgba(0,0,0,0.3)]`
                  }`}
                >
                  {/* Unread indicator */}
                  {!n.is_read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(123, 47, 247,0.6)] animate-pulse" />
                  )}

                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className={`shrink-0 w-11 h-11 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center ${cfg.color} shadow-inner`}>
                      <cfg.Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${cfg.color} mr-2`}>
                            {cfg.label}
                          </span>
                          <h3 className="text-sm font-bold text-white uppercase tracking-tight inline">
                            {n.title}
                          </h3>
                        </div>
                        <span className="shrink-0 flex items-center gap-1 text-[8px] font-mono text-slate-600 uppercase tracking-widest mt-0.5">
                          <Clock size={9} />
                          {n.created_at ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) : '—'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                        {n.message || n.body || '—'}
                      </p>
                    </div>
                  </div>

                  {/* Actions (visible on hover) */}
                  {!n.is_read && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <button
                        onClick={() => markRead(n.id)}
                        className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 hover:border-fuchsia-500/30 hover:text-fuchsia-400 rounded-lg text-slate-500 transition-all"
                      >
                        Mark read
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

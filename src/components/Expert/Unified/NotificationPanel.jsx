import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCheck, Shield, AlertTriangle, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { BACKEND_URL } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';

export default function NotificationPanel() {
  const { user, getAccessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read && !n.is_read).length;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchNotifications = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const token = await getAccessToken();
      const response = await axios.get(`${BACKEND_URL}/api/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.warn('[Notifications] Fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.id, getAccessToken]);

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    
    const handleNewIncident = (data) => {
      setNotifications(prev => [{
        id: 'temp-' + Date.now(),
        type: 'NEW_INCIDENT',
        title: 'New Incident Reported',
        message: `${data.incidenttype || data.title} reported. Severity: ${data.severitylevel || data.severity}`,
        is_read: false,
        created_at: new Date().toISOString()
      }, ...prev]);
    };

    socket.on('incident_created', handleNewIncident);
    return () => socket.off('incident_created', handleNewIncident);
  }, [socket]);

  const markAsRead = async (id) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('[Notifications] Mark read error:', err.message);
    }
  };

  const markAllRead = async () => {
    if (!user?.id) return;
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('expert_id', user.id)
        .eq('read', false);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('[Notifications] Mark all read error:', err.message);
    }
  };

  const getIcon = (title = '') => {
    const t = title.toLowerCase();
    if (t.includes('incident') || t.includes('case')) return <AlertTriangle size={14} className="text-amber-400" />;
    if (t.includes('message') || t.includes('chat')) return <MessageSquare size={14} className="text-hacker-neon" />;
    return <Shield size={14} className="text-emerald-400" />;
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-hacker-neon transition-all"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-hacker-neon rounded-full text-[9px] font-black text-white flex items-center justify-center shadow-[0_0_8px_rgba(123, 47, 247,0.8)] border-2 border-[#0B0F19]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-80 bg-[#0D1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-hacker-neon" />
                <span className="text-sm font-bold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[9px] font-black bg-hacker-neon/20 text-hacker-neon px-2 py-0.5 rounded-full border border-hacker-neon/30">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] text-gray-500 hover:text-hacker-neon transition-colors flex items-center gap-1"
                  >
                    <CheckCheck size={12} /> Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 size={24} className="animate-spin text-hacker-neon" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                  <Bell size={32} className="text-gray-700 mb-3" />
                  <p className="text-sm text-gray-500 font-medium">All clear</p>
                  <p className="text-[10px] text-gray-700 mt-1 uppercase tracking-widest">No notifications</p>
                </div>
              ) : (
                notifications.map(n => (
                  <button
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`w-full text-left flex items-start gap-3 px-5 py-4 border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.04] ${!n.read ? 'bg-hacker-neon/[0.03]' : ''}`}
                  >
                    <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${!n.read ? 'bg-hacker-neon/10' : 'bg-white/5'}`}>
                      {getIcon(n.title)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-xs font-bold truncate ${!n.read ? 'text-white' : 'text-gray-400'}`}>
                          {n.title || 'Notification'}
                        </p>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-hacker-neon shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-gray-700 mt-1 font-mono">
                        {n.created_at
                          ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true })
                          : 'just now'}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('expert_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          // Silently ignore missing table — feature not yet enabled
          console.warn("Notifications unavailable:", error.message);
          setNotifications([]);
          setLoading(false);
          return;
        } else {
          setNotifications(data || []);
          setUnreadCount((data || []).filter(n => !n.is_read).length);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Real-time subscription
    const channel = supabase
      .channel(`user_notifications_${user.id}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `expert_id=eq.${user.id}` }, 
        payload => {
          setNotifications(prev => [payload.new, ...prev].slice(0, 20));
          setUnreadCount(prev => prev + 1);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `expert_id=eq.${user.id}` },
        payload => {
          setNotifications(prev => prev.map(n => n.id === payload.new.id ? payload.new : n));
          setNotifications(prev => {
            setUnreadCount(prev.filter(n => !n.is_read).length);
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) throw error;
      
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking notification as read:", err.message);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('expert_id', user.id)
        .eq('is_read', false);
      
      if (error) throw error;
      
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all notifications as read:", err.message);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, loading, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);


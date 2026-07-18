import { supabaseAdmin, getSupabaseClient } from '../config/supabase.js';

const getToken = (req) => req.headers.authorization?.split(' ')[1];

export const getNotifications = async (req, res) => {
  try {
    let userRole = req.user.user_metadata?.role || req.user.role;
    if (!userRole) {
      const { data, error } = await supabaseAdmin.from('profiles').select('role').eq('id', req.user.id).maybeSingle();
      if (error && error.message?.includes('API key')) {
        const client = getSupabaseClient(getToken(req));
        const fallback = await client.from('profiles').select('role').eq('id', req.user.id).maybeSingle();
        if (fallback.data) userRole = fallback.data.role;
      } else if (data) {
        userRole = data.role;
      }
    }
    const isSpecialist = ['security_specialist', 'network_specialist', 'admin', 'expert'].includes(userRole);
    
    let query = supabaseAdmin
      .from('notifications')
      .select('*');

    if (isSpecialist) {
      query = query.or(`user_id.eq.${req.user.id},type.eq.NEW_INCIDENT`);
    } else {
      query = query.eq('user_id', req.user.id);
    }

    let { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(20);

    if (error && error.message?.includes('API key')) {
      const client = getSupabaseClient(getToken(req));
      let fallbackQuery = client.from('notifications').select('*');
      if (isSpecialist) {
        fallbackQuery = fallbackQuery.or(`user_id.eq.${req.user.id},type.eq.NEW_INCIDENT`);
      } else {
        fallbackQuery = fallbackQuery.eq('user_id', req.user.id);
      }
      const fallback = await fallbackQuery.order('created_at', { ascending: false }).limit(20);
      data = fallback.data;
      error = fallback.error;
    }

    if (error) throw error;
    res.json({ success: true, notifications: data });
  } catch (err) {
    console.error('[NotificationController] Fetch Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to fetch notifications.' });
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  
  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    
    // If id is 'all', mark all as read
    if (id === 'all') {
      const { data, error } = await client
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', req.user.id);
        
      if (error) throw error;
      return res.json({ success: true });
    }

    const { data, error } = await client
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('[NotificationController] Mark Read Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to update notification.' });
  }
};

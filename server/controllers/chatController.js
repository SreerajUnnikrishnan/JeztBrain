import { supabaseAdmin, getSupabaseClient } from '../config/supabase.js';

const getToken = (req) => req.headers.authorization?.split(' ')[1];

/**
 * Send a message via REST (optional, usually handled via Socket.IO)
 * POST /api/chat/message
 */
export const sendMessage = async (req, res) => {
  const { incidentId, message, senderRole, receiverId } = req.body;
  const senderId = req.user.id;

  if (!incidentId || !message) {
    return res.status(400).json({ error: 'FIELDS_MISSING' });
  }

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('messages')
      .insert([{
        chatid: incidentId,
        senderid: senderId,
        senderrole: senderRole || 'user',
        text: message,
        sendername: req.user.displayName || 'User'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: data });
  } catch (err) {
    console.error('[ChatController] Send Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR' });
  }
};

/**
 * Get message history for an incident
 * GET /api/chat/history/:incidentId
 */
export const getChatHistory = async (req, res) => {
  const { incidentId } = req.params;

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('messages')
      .select('*')
      .eq('chatid', incidentId)
      .order('createdat', { ascending: true });

    if (error) throw error;

    res.json({ success: true, messages: data });
  } catch (err) {
    console.error('[ChatController] History Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR' });
  }
};

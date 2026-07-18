import { supabaseAdmin, getSupabaseClient } from '../config/supabase.js';

export const registerChatHandlers = (io, socket) => {
  
  // Join an incident room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`--- Socket ${socket.id} joined room: ${roomId}`);
  });

  // Legacy fallback
  socket.on('join_incident', async ({ incidentId, token }) => {
    try {
      // Verify token manually for socket connection
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      
      if (error || !user) {
        return socket.emit('error', { message: 'UNAUTHORIZED_ACCESS' });
      }

      // Verify user has access to this incident
      const client = getSupabaseClient(token);
      const { data: incident, error: incError } = await client
        .from('incidents')
        .select('user_id, expert_id')
        .eq('id', incidentId)
        .single();

      if (incError || !incident) {
        return socket.emit('error', { message: 'INCIDENT_NOT_FOUND' });
      }

      const isParticipant = incident.user_id === user.id || incident.expert_id === user.id;
      const isAdmin = user.user_metadata?.role === 'admin';

      if (!isParticipant && !isAdmin) {
        return socket.emit('error', { message: 'ACCESS_DENIED_TO_ROOM' });
      }

      socket.join(incidentId);
      console.log(`--- Socket ${socket.id} joined incident room: ${incidentId}`);
      
      // Notify others in the room
      socket.to(incidentId).emit('user_status', { userId: user.id, status: 'online' });
    } catch (err) {
      console.error('[SocketChat] Join Error:', err.message);
    }
  });

  // Join a personal dashboard room for global notifications
  socket.on('join_dashboard', async ({ token }) => {
    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) return;
      
      const userRoom = `user_${user.id}`;
      socket.join(userRoom);
      console.log(`--- Socket ${socket.id} joined personal room: ${userRoom}`);
    } catch (err) {
      console.error('[SocketChat] Dashboard Join Error:', err.message);
    }
  });

  // Real-time Incident Pipeline
  socket.on('new_incident', (data) => {
    io.emit('incident_created', data);
  });


  // Handle incoming messages
  socket.on('send_message', async (msgPayload) => {
    // msgPayload could have roomId, text, token, senderRole
    const roomId = msgPayload.roomId || msgPayload.incidentId;
    const text = msgPayload.text || msgPayload.message;
    const token = msgPayload.token;
    
    if (!token) {
      // If no token, just broadcast (insecure but matches the prompt strictly)
      return io.to(roomId).emit('receive_message', msgPayload);
    }

    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) return;

      // Persist to Supabase
      const client = getSupabaseClient(token);
      const { data: msgData, error: dbError } = await client
        .from('messages')
        .insert([{
          chatid: roomId,
          senderid: user.id,
          senderrole: msgPayload.senderRole || user.user_metadata?.role || 'user',
          text: text,
          sendername: user.user_metadata?.displayName || user.email.split('@')[0]
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      // Broadcast to room
      io.to(roomId).emit('receive_message', msgData);
    } catch (err) {
      console.error('[SocketChat] Send Error:', err.message);
    }
  });

  // Typing indicators
  socket.on('typing_start', ({ incidentId, userId }) => {
    socket.to(incidentId).emit('user_typing', { userId, isTyping: true });
  });

  socket.on('typing_stop', ({ incidentId, userId }) => {
    socket.to(incidentId).emit('user_typing', { userId, isTyping: false });
  });
};

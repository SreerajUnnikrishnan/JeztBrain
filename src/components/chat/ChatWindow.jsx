import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Loader2, ShieldAlert, Shield, X, Users, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { io } from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';

let globalSocket = null;
const getSocket = () => {
  if (!globalSocket || globalSocket.disconnected) {
    globalSocket = io(BACKEND_URL, { transports: ['websocket', 'polling'] });
  }
  return globalSocket;
};

export default function ChatWindow({ incidentId, isExpert = false }) {
  const { user, getAccessToken, role } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [incident, setIncident] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const activeRoomRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingUsers]);

  // ─── Init chat room ────────────────────────────────────────────────────────
  const initChat = useCallback(async () => {
    if (!incidentId || !user) return;
    setLoading(true);
    setMessages([]);
    setIncident(null);

    try {
      const token = await getAccessToken();

      // 1. Fetch message history
      const historyRes = await axios.get(
        `${BACKEND_URL}/api/chat/history/${incidentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(historyRes.data.messages || []);

      // 2. Fetch incident details — try expert endpoint first, fallback to user endpoint
      let incidentData = null;
      try {
        const expertRes = await axios.get(`${BACKEND_URL}/api/incidents/expert`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        incidentData = (expertRes.data.cases || []).find(i => i.id === incidentId);
      } catch (err) {
        // Fallback: not authorized for expert endpoint or request failed
      }

      if (!incidentData) {
        try {
          const userRes = await axios.get(`${BACKEND_URL}/api/incidents/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          incidentData = (userRes.data.incidents || []).find(i => i.id === incidentId);
        } catch (err) {
          // Request to user incidents failed
        }
      }

      setIncident(incidentData || null);

      // 3. Connect Socket.IO
      const socket = getSocket();
      socketRef.current = socket;
      const roomId = incidentData?.room_id || incidentId;
      activeRoomRef.current = roomId;

      const onConnect = () => {
        socket.emit('join_room', roomId);
        console.log('[ChatWindow] Joined room:', roomId);
      };

      const onMessage = (msg) => {
        setMessages(prev => {
          if (prev.find(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      };

      const onTyping = ({ userId, isTyping }) => {
        if (userId === user.id) return;
        setTypingUsers(prev => {
          const next = new Set(prev);
          isTyping ? next.add(userId) : next.delete(userId);
          return next;
        });
      };

      const onError = (err) => {
        console.error('[Socket] Error:', err?.message);
        toast.error(err?.message || 'Connection error');
      };

      if (socket.connected) onConnect();
      socket.on('connect', onConnect);
      socket.on('receive_message', onMessage);
      socket.on('user_typing', onTyping);
      socket.on('error', onError);

      // Clean up listeners on room change (but keep socket alive)
      return () => {
        socket.off('connect', onConnect);
        socket.off('receive_message', onMessage);
        socket.off('user_typing', onTyping);
        socket.off('error', onError);
      };
    } catch (err) {
      console.error('[ChatWindow] init error:', err.message);
      toast.error('Failed to load conversation.');
    } finally {
      setLoading(false);
    }
  }, [incidentId, user]);

  useEffect(() => {
    const cleanup = initChat();
    return () => {
      // cleanup is a promise with a cleanup fn; handle both cases
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(fn => fn && fn());
      } else if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [initChat]);

  // ─── Send message ─────────────────────────────────────────────────────────
  const handleSendMessage = async ({ text, file }) => {
    if (!user || !socketRef.current) return;
    setSending(true);

    let messageContent = text;
    if (file) {
      messageContent = `[Attachment: ${file.name}] ${text || ''}`.trim();
    }

    try {
      const token = await getAccessToken();
      const roomId = activeRoomRef.current || incidentId;

      socketRef.current.emit('send_message', {
        roomId,
        text: messageContent,
        token,
        senderRole: role || (isExpert ? 'expert' : 'user'),
      });

      socketRef.current.emit('typing_stop', { incidentId: roomId, userId: user.id });
    } catch (err) {
      console.error('[ChatWindow] send error:', err.message);
      toast.error('Message failed to deliver.');
    } finally {
      setSending(false);
    }
  };

  const handleTyping = (isTyping) => {
    if (!socketRef.current || !user) return;
    const roomId = activeRoomRef.current || incidentId;
    socketRef.current.emit(isTyping ? 'typing_start' : 'typing_stop', {
      incidentId: roomId,
      userId: user.id,
    });
  };

  const copyTicket = () => {
    if (incident?.ticket_number) {
      navigator.clipboard.writeText(incident.ticket_number);
      toast.success('Ticket ID copied');
    }
  };

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#030712] min-h-[500px]">
        <Loader2 className="animate-spin text-fuchsia-500 mb-4" size={28} />
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
          Handshaking Secure Link...
        </p>
      </div>
    );
  }

  // ─── Status badge styles ───────────────────────────────────────────────────
  const statusStyle = {
    pending:      'text-amber-400 border-amber-500/30 bg-amber-500/10',
    accepted:     'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
    investigating:'text-purple-400 border-purple-500/30 bg-purple-500/10',
    resolved:     'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    closed:       'text-slate-400 border-slate-500/30 bg-slate-500/10',
  };
  const statusClass = statusStyle[incident?.status] || 'text-slate-400 border-slate-500/30 bg-slate-500/10';

  return (
    <div className="flex-1 flex flex-col bg-[#030712] h-full overflow-hidden border border-white/5 rounded-3xl shadow-2xl relative">

      {/* ─── Header ─── */}
      <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between z-10 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl flex items-center justify-center text-fuchsia-400 shadow-[0_0_15px_rgba(123, 47, 247,0.08)]">
            <Shield size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <h2 className="text-sm font-black text-white tracking-widest uppercase">
                {incident?.incidenttype || 'SECURE_CHANNEL'}
              </h2>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${statusClass} uppercase tracking-widest`}>
                {incident?.status || 'unknown'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-emerald-500/80 font-mono uppercase tracking-[0.2em]">
                Encrypted_Uplink
              </span>
              <span className="text-slate-700 text-[8px]">•</span>
              <button
                onClick={copyTicket}
                className="text-[9px] font-mono text-slate-500 hover:text-fuchsia-400 transition-colors flex items-center gap-1 uppercase"
              >
                {incident?.ticket_number || incidentId.substring(0, 8)}
                <Copy size={9} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {incident?.expert_id && (
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Expert</p>
              <p className="text-[9px] font-bold text-fuchsia-400 uppercase">Specialist Active</p>
            </div>
          )}
          <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-500">
            <Users size={16} />
          </div>
        </div>
      </div>

      {/* ─── Messages ─── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar bg-gradient-to-b from-[#030712] via-[#030712] to-[#0A0F1E]"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <ShieldAlert size={44} className="text-slate-600 mb-4" />
            <p className="text-sm text-slate-400 font-medium">No messages yet.</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">
              Initiate contact to begin triage.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMe={msg.senderid === user?.id}
              senderName={msg.senderrole === 'expert' || msg.senderrole === 'security_specialist'
                ? 'Security Specialist'
                : (msg.sendername || 'User')}
            />
          ))
        )}

        {typingUsers.size > 0 && (
          <div className="flex items-center gap-2 text-slate-500 mt-4 text-[10px] font-mono ml-2">
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="uppercase tracking-widest">Someone is typing...</span>
          </div>
        )}
      </div>

      {/* ─── Input ─── */}
      <ChatInput onSendMessage={handleSendMessage} onTyping={handleTyping} disabled={sending} />
    </div>
  );
}

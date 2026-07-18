import React, { useState, useEffect, useRef } from 'react';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { io } from 'socket.io-client';
import { supabase } from '../../lib/supabase';
import { 
  ShieldAlert, 
  AlertCircle, 
  MoreVertical, 
  Download, 
  Paperclip, 
  Loader2, 
  Send 
} from 'lucide-react';

export default function ChatView({ activeIncidentId }) {
  const { user, role, getAccessToken } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Main chat synchronization
  useEffect(() => {
    if (!activeIncidentId || !user) return;

    let socketInstance;

    const initChat = async () => {
      setError(null);
      try {
        const token = await getAccessToken();

        // 1. Fetch history via backend
        const response = await axios.get(`${BACKEND_URL}/api/chat/history/${activeIncidentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMessages(response.data.messages || []);

        // 2. Initialize Socket.IO
        socketInstance = io(BACKEND_URL);
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
          console.log('[ExpertSocket] Connected');
          socketInstance.emit('join_incident', { incidentId: activeIncidentId, token });
        });

        socketInstance.on('new_message', (msg) => {
          setMessages(prev => {
            if (prev.find(m => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        });

        socketInstance.on('error', (err) => {
          console.error('[ExpertSocket] Error:', err.message);
          setError("REALTIME_SYNC_FAILED");
        });

      } catch (err) {
        console.error("ChatView Init Error:", err);
        setError("HISTORY_FETCH_FAILED");
        toast.error("Failed to load secure channel.");
      }
    };

    initChat();

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, [activeIncidentId, user, getAccessToken]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!message.trim() || !activeIncidentId || isSending || !socket) return;

    const content = message.trim();
    setMessage(''); 
    setIsSending(true);
    setError(null);

    try {
      const token = await getAccessToken();
      socket.emit('send_message', {
        incidentId: activeIncidentId,
        message: content,
        token,
        senderRole: role || 'expert'
      });
      inputRef.current?.focus();
    } catch (err) {
      console.error("Message Transmission Error:", err);
      setError("TRANSMISSION_FAILED");
      setMessage(content);
      toast.error("Failed to send message vector.");
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeIncidentId) return;

    setIsSending(true);
    setError(null);
    const loadingToast = toast.loading('Uploading tactical media...');

    try {
      const filePath = `chat_media/${activeIncidentId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('chat_media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('chat_media').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('messages').insert([{
        chatid: activeIncidentId,
        text: `[Attachment: ${file.name}]`,
        file_url: publicUrl,
        file_name: file.name,
        senderid: user.id,
        senderrole: role || 'expert',
        createdat: new Date().toISOString()
      }]);
      
      if (dbError) throw dbError;
      toast.success('Media successfully transmitted.', { id: loadingToast });
    } catch (err) {
      console.error("File Intelligence Upload Error:", err);
      setError("FILE_UPLOAD_FAILED");
      toast.error("Media vector upload failed.", { id: loadingToast });
    } finally {
      setIsSending(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!activeIncidentId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 font-mono">
        <ShieldAlert size={48} className="mb-4 opacity-20" />
        <p className="uppercase tracking-widest text-xs">Awaiting Tactical Selection...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#070B14] border border-white/5 rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-12rem)] relative overflow-hidden">
      {/* Decryption Header */}
      <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-tight">Channel: {activeIncidentId.substring(0, 12)}...</h3>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {error && <AlertCircle size={16} className="text-rose-500 animate-pulse" />}
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500"><MoreVertical size={18} /></button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {messages.map((msg, idx) => {
          const isMe = msg.senderid === user.id;
          return (
            <div key={msg.id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                isMe ? 'bg-fuchsia-600/20 border border-fuchsia-500/30 text-white rounded-tr-none' : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-none'
              }`}>
                {!isMe && <p className="text-[10px] text-fuchsia-400 mb-2 font-bold uppercase font-mono">{msg.sendername}</p>}
                {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                {msg.file_url && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3">
                    <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                      <Download size={14} className="text-fuchsia-400" />
                    </div>
                    <a href={msg.file_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-fuchsia-400 hover:underline truncate">
                      {msg.file_name || 'LOG_CAPTURE.bin'}
                    </a>
                  </div>
                )}
                <p className="text-[8px] mt-2 text-right opacity-30 font-mono">
                  {msg.createdat ? new Date(msg.createdat).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'SYNCING'}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Console Input */}
      <div className="p-4 bg-black/60 border-t border-white/5 backdrop-blur-xl">
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()} 
            className="p-3 text-slate-500 hover:text-fuchsia-400 transition-colors"
          >
            <Paperclip size={20} />
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Transmit tactical intelligence..."
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-fuchsia-500/50 resize-none h-[52px] font-medium"
              disabled={isSending}
            />
            <button 
              type="submit" 
              disabled={!message.trim() || isSending}
              className="absolute right-2 bottom-2 p-2 bg-fuchsia-500 text-black rounded-xl hover:shadow-[0_0_15px_rgba(123, 47, 247,0.5)] disabled:opacity-30 transition-all"
            >
              {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


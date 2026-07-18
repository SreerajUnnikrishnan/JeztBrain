import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import { X, Send, Terminal, Loader2, AlertCircle, ShieldAlert, Clock, History, Trash2, ArrowLeft, Settings, Shield, Headset, FileText, Target } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence, useDragControls, useAnimation } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Audio Context for futuristic UI sounds
const RobotIcon = ({ size = 16, className = "" }) => (
  <img
    src="/images/robot_avatar_white.png"
    alt="JeztBrain Bot"
    className={`object-contain ${className}`}
    style={{ width: size, height: size }}
  />
);

const playSendSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // silently fail
  }
};

const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // noop
  }
};

const formatTime = (ts) => {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

// Markdown Renderer with pristine paragraph and list spacing
const MarkdownRenderer = memo(({ content, isTyping }) => {
  const formattedContent = content
    .replace(/\[CRITICAL\]/gi, '🔴 **[CRITICAL]**')
    .replace(/\[HIGH\]/gi, '🟠 **[HIGH]**')
    .replace(/\[MEDIUM\]/gi, '🟡 **[MEDIUM]**')
    .replace(/\[LOW\]/gi, '🔵 **[LOW]**')
    .replace(/\[ 🛡️ LIVE THREAT VERIFIED \]/gi, '🛡️ **[ LIVE THREAT VERIFIED ]**')
    .replace(/\[ ⚠️ CISA KNOWN EXPLOITED VULNERABILITY \]/gi, '🚨 **[ CISA KNOWN EXPLOITED VULNERABILITY ]**');

  const textToRender = formattedContent + (isTyping ? ' █' : '');

  return (
    <div className="font-sans text-[13px] leading-relaxed break-words text-slate-100 overflow-wrap-anywhere">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="my-4 border border-fuchsia-500/30 rounded-xl overflow-hidden shadow-2xl bg-[#05080f]/95">
                <div className="bg-white/5 px-4 py-2.5 text-[11px] text-fuchsia-400 font-mono flex items-center gap-2 border-b border-white/5 uppercase tracking-wider font-bold">
                  <Terminal size={14} className="text-fuchsia-500 animate-pulse" />
                  {match[1]}
                </div>
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, background: 'transparent', padding: '16px', fontSize: '12px', fontFamily: 'monospace' }}
                />
              </div>
            ) : (
              <code {...props} className="bg-fuchsia-500/15 border border-fuchsia-500/30 px-1.5 py-0.5 rounded text-fuchsia-300 font-mono text-[12px] font-bold">
                {children}
              </code>
            );
          },
          p: ({ children }) => <p className="mb-3.5 last:mb-0 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 space-y-2 pl-2">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 space-y-2 pl-4 list-decimal">{children}</ol>,
          li: ({ children }) => (
            <li className="flex gap-2.5 items-start">
              <span className="text-fuchsia-400 font-black mt-1 shrink-0">›</span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          h1: ({ children }) => <h1 className="text-base font-black text-white mb-3 mt-4 pb-1.5 border-b border-white/10 uppercase tracking-wide font-mono">{children}</h1>,
          h2: ({ children }) => <h2 className="text-sm font-black text-fuchsia-300 mb-2.5 mt-4 uppercase tracking-wide font-mono">{children}</h2>,
          h3: ({ children }) => <h3 className="text-[13px] font-bold text-fuchsia-200 mb-1.5 mt-3 font-mono">{children}</h3>,
          strong: ({ children }) => {
            const text = String(children);
            if (text.includes('LIVE THREAT VERIFIED')) {
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40 text-[11px] font-black uppercase tracking-wider mb-2 animate-pulse shadow-[0_0_15px_rgba(123, 47, 247,0.3)]">
                  {children}
                </span>
              );
            }
            if (text.includes('CISA KNOWN EXPLOITED VULNERABILITY')) {
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-black uppercase tracking-wide mb-3 block w-fit shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  {children}
                </span>
              );
            }
            return <strong className="font-bold text-white">{children}</strong>;
          },
          a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline hover:text-fuchsia-300 font-bold">{children}</a>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-fuchsia-500 bg-fuchsia-500/10 px-4 py-3 my-3 rounded-r-xl text-fuchsia-200 text-xs italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto border border-fuchsia-500/20 rounded-xl bg-black/40 shadow-inner custom-scrollbar">
              <table className="w-full text-left border-collapse font-mono text-xs">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-white/5 border-b border-fuchsia-500/20 text-[11px] uppercase text-fuchsia-400 tracking-wider font-bold">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-3 font-black whitespace-nowrap">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 border-t border-white/5 text-slate-300 font-medium">{children}</td>,
          tr: ({ children }) => <tr className="hover:bg-fuchsia-500/5 transition-colors">{children}</tr>
        }}
      >
        {textToRender}
      </ReactMarkdown>
    </div>
  );
});

// Simulated Streaming Component
function SimulatedStream({ content, onComplete }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeout;
    let i = 0;

    const type = () => {
      if (i < content.length) {
        const chunk = Math.floor(Math.random() * 4) + 1;
        i += chunk;
        setDisplayed(content.substring(0, i));
        timeout = setTimeout(type, 15);
      } else {
        setDisplayed(content);
        if (onComplete) onComplete();
      }
    };
    type();
    return () => clearTimeout(timeout);
  }, [content, onComplete]);

  return <MarkdownRenderer content={displayed} isTyping={true} />;
}

// Message Bubble
const MessageBubble = memo(({ msg, isHistoryView }) => {
  const isAI = msg.sender_type === 'ai';
  const isNew = isAI && !isHistoryView && (Date.now() - new Date(msg.created_at).getTime() < 30000);
  const [streamFinished, setStreamFinished] = useState(!isNew);

  return (
    <motion.div
      initial={isAI ? { opacity: 0, y: 20, scale: 0.95 } : { opacity: 0, y: 20, x: 30 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 300 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} w-full group mb-6`}
    >
      {isAI && (
        <div className="shrink-0 mr-3.5 mt-1">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 border border-fuchsia-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(123, 47, 247,0.2)] group-hover:border-fuchsia-300 group-hover:shadow-[0_0_25px_rgba(123, 47, 247,0.5)] transition-all duration-300">
            <RobotIcon size={22} className="text-fuchsia-400 animate-pulse" />
          </div>
        </div>
      )}

      <div className={`max-w-[70%] flex flex-col gap-2 ${isAI ? 'items-start' : 'items-end'}`}>
        <div className={`px-6 py-4.5 text-sm leading-relaxed overflow-wrap-anywhere break-words w-full ${isAI
            ? 'bg-[#0a0f1c]/95 backdrop-blur-2xl border border-fuchsia-500/30 text-slate-100 rounded-3xl rounded-tl-none shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(123, 47, 247,0.15)] group-hover:border-fuchsia-400 group-hover:shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_35px_rgba(123, 47, 247,0.3)] transition-all duration-300 font-sans'
            : 'bg-gradient-to-r from-fuchsia-500 via-purple-600 to-fuchsia-600 text-black font-semibold rounded-3xl rounded-tr-none shadow-[0_10px_30px_rgba(123, 47, 247,0.3)]'
          }`}>
          {isAI ? (
            streamFinished ? (
              <MarkdownRenderer content={msg.message} isTyping={false} />
            ) : (
              <SimulatedStream content={msg.message} onComplete={() => setStreamFinished(true)} />
            )
          ) : (
            <p className="break-words font-sans text-sm leading-relaxed">{msg.message}</p>
          )}
        </div>

        <div className={`flex items-center gap-2 text-[10px] font-mono px-2.5 ${isAI ? 'text-fuchsia-500/60' : 'text-fuchsia-200/80 flex-row-reverse'
          }`}>
          <Clock size={10} />
          <span>{formatTime(msg.created_at)}</span>
          {isAI && <span className="flex items-center gap-1 ml-1 text-white font-bold"><ShieldAlert size={10} className="text-[#8B5CF6]" /> Jezt<span className="text-[#8B5CF6]">Brain</span> <span className="text-[#A855F7]">Bot</span></span>}
        </div>
      </div>
    </motion.div>
  );
});

// Animated Loading Dots while AI Responds
function ThinkingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3.5 py-3 px-2 mb-6"
    >
      <div className="w-11 h-11 rounded-2xl bg-fuchsia-500/10 border border-[#8B5CF6]/30 flex items-center justify-center shadow-[0_0_15px_rgba(123, 47, 247,0.15)] relative overflow-hidden shrink-0">
        <span className="absolute inset-0 rounded-2xl border border-fuchsia-400 animate-ping opacity-10" />
        <Loader2 size={22} className="text-[#8B5CF6] animate-spin" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-[#8B5CF6] font-sans font-bold flex items-center gap-2">
          JeztBrain Bot is thinking...
        </span>
      </div>
    </motion.div>
  );
}

// Futuristic AI Robot Avatar Component
function RobotAvatar({ isTyping, isOpen, unreadCount, isBlinking }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center group select-none">
      {/* Soft Minimal Outer Glow directly around the robot itself */}
      <motion.div 
        className="absolute inset-4 rounded-full bg-[#8B5CF6]/10 blur-xl pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Standalone Robot Icon Container */}
      <motion.div 
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative w-[80px] h-[80px] flex items-center justify-center cursor-pointer z-10"
      >
        {isOpen ? (
          <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-fuchsia-500/35 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(123, 47, 247,0.25)]">
            <X size={28} className="text-slate-300 group-hover:text-[#8B5CF6] transition-colors drop-shadow-[0_0_8px_rgba(123, 47, 247,0.7)]" />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(123, 47, 247,0.45)]">
            {/* The High-Res Glossy White 3D Transparent Robot Avatar */}
            <img 
              src="/images/robot_avatar_white.png" 
              alt="JeztBrain Bot" 
              className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Eyes Blink Mask: Overlays matching exactly the eyes coordinates on the 3D head face screen */}
            {isBlinking && (
              <>
                {/* Left Eye cover */}
                <div 
                  className="absolute z-20 bg-[#091125] rounded-full" 
                  style={{ left: "32%", top: "42%", width: "12%", height: "15%" }}
                />
                {/* Right Eye cover */}
                <div 
                  className="absolute z-20 bg-[#091125] rounded-full" 
                  style={{ left: "56%", top: "42%", width: "12%", height: "15%" }}
                />
              </>
            )}

            {/* Neural circuit reflections/Scanlines overlay inside the face screen */}
            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-full">
              <div 
                className="absolute left-0 right-0 w-full"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(123, 47, 247, 0.25) 50%, transparent 100%)',
                  height: '25%',
                  top: '0%',
                  animation: 'scanline-sweep 3s linear infinite'
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
 
      {/* Online Status Blinking Indicator (Neon Green) */}
      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#050816] animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.9)] z-20 pointer-events-none group-hover:scale-110 transition-transform" />
 
      {/* Unread Message Badge */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full border-2 border-[#050816] shadow-[0_0_15px_rgba(244,63,94,0.9)] animate-bounce z-30 pointer-events-none">
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export default function AIResponderWidget() {
  const { user, getAccessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Synced Organic Blinking State for all premium 3D robot avatars
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let blinkTimeout;
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
      blinkTimeout = setTimeout(blinkLoop, 2000 + Math.random() * 2000);
    };
    blinkTimeout = setTimeout(blinkLoop, 1500);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Drag State
  const dragControls = useDragControls();
  const dragAnimControls = useAnimation();
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('soc_chat_pos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDragPos(parsed);
        dragAnimControls.set(parsed);
      } catch (e) {
        // noop
      }
    }
  }, [dragAnimControls]);

  const handleDragEnd = (e, info) => {
    let finalX = dragPos.x + info.offset.x;
    let finalY = dragPos.y + info.offset.y;

    if (finalX > -60 && finalX < 60) finalX = 0;
    if (finalY > -60 && finalY < 60) finalY = 0;

    const minX = -(window.innerWidth - 100);
    const minY = -(window.innerHeight - 100);

    if (finalX < minX) finalX = minX;
    if (finalY < minY) finalY = minY;
    if (finalX > 0) finalX = 0;
    if (finalY > 0) finalY = 0;

    const newPos = { x: finalX, y: finalY };
    setDragPos(newPos);
    localStorage.setItem('soc_chat_pos', JSON.stringify(newPos));
  };

  // Live Session State
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [tableReady, setTableReady] = useState(false);

  // History State
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Permanently disable session saving as per user requirements
  const rememberHistory = false;

  const messagesEndRef = useRef(null);
  const historyEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const sendingLockRef = useRef(false);
  const knownIdsRef = useRef(new Set());
  const isOpenRef = useRef(false);
  const idleResetTimerRef = useRef(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // When closing: since rememberHistory is false, completely clear state & scroll position
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setMessages([]);
        setIsTyping(false);
        setError(null);
        setUnreadCount(0);
        setMessage('');
        setShowHistoryPanel(false);
        knownIdsRef.current.clear();
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // When opening: guarantee a fresh empty session state
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      knownIdsRef.current.clear();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setError(null);
      setShowHistoryPanel(false);
      sendingLockRef.current = false;
    }
  }, [isOpen]);

  // Auto-return to original position after 10 seconds idle when closed/minimized
  const handleUserActivity = useCallback(() => {
    clearTimeout(idleResetTimerRef.current);
    if (!isOpen && (dragPos.x !== 0 || dragPos.y !== 0)) {
      idleResetTimerRef.current = setTimeout(() => {
        setDragPos({ x: 0, y: 0 });
        dragAnimControls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
        localStorage.setItem('soc_chat_pos', JSON.stringify({ x: 0, y: 0 }));
      }, 10000);
    }
  }, [isOpen, dragPos, dragAnimControls]);

  useEffect(() => {
    handleUserActivity();
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    return () => {
      clearTimeout(idleResetTimerRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [handleUserActivity]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [historyMessages, showHistoryPanel]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const probe = async () => {
      const { error: probeErr } = await supabase.from('ai_messages').select('id').eq('user_id', user.id).limit(1);
      if (cancelled) return;
      if (probeErr && (probeErr.code === 'PGRST204' || probeErr.code === '42P01')) {
        setTableReady(false);
        return;
      }
      setTableReady(true);
    };
    probe();
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    if (!user || !tableReady) return;
    const channel = supabase
      .channel(`soc_ai_${user.id}_${Date.now()}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ai_messages', filter: `user_id=eq.${user.id}` },
        (payload) => {
          const newMsg = payload.new;
          if (knownIdsRef.current.has(newMsg.id)) return;
          knownIdsRef.current.add(newMsg.id);

          if (isOpenRef.current) {
            setMessages((prev) => {
              if (prev.find((m) => m.id === newMsg.id)) return prev;
              const localIdx = prev.findIndex(m => m.message === newMsg.message && m.sender_type === newMsg.sender_type && String(m.id).startsWith('local_'));
              if (localIdx !== -1) {
                const updated = [...prev];
                updated[localIdx] = { ...updated[localIdx], id: newMsg.id };
                return updated;
              }
              return [...prev, newMsg];
            });
            if (newMsg.sender_type === 'ai') setIsTyping(false);
          } else {
            if (newMsg.sender_type === 'ai') {
              setUnreadCount(prev => prev + 1);
              playNotificationSound();
            }
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, tableReady]);

  const openHistory = async () => {
    if (!user) return;
    setShowHistoryPanel(true);
    setLoadingHistory(true);
    try {
      const { data } = await supabase.from('ai_messages').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50);
      setHistoryMessages(data?.reverse() || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = useCallback(async (eOrText) => {
    let textToSend = message;
    if (eOrText && typeof eOrText === 'string') textToSend = eOrText;
    else if (eOrText && eOrText.preventDefault) eOrText.preventDefault();

    if (sendingLockRef.current) return;
    const text = textToSend.trim();
    if (!text) return;

    sendingLockRef.current = true;
    setMessage('');
    setIsSending(true);
    setError(null);
    playSendSound();

    const localId = `local_user_${Date.now()}`;
    const localUserMsg = { id: localId, message: text, sender_type: 'user', created_at: new Date().toISOString() };
    knownIdsRef.current.add(localId);
    setMessages((prev) => [...prev, localUserMsg]);
    setIsTyping(true);

    try {
      if (user) {
        await supabase.from('ai_messages').insert([{ user_id: user.id, message: text, sender_type: 'user' }]);
      }

      const token = await getAccessToken();
      const response = await axios.post(
        `${BACKEND_URL}/api/ai/chat`,
        { message: text, history: messages.slice(-6) },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 45000 }
      );

      if (response.data?.success) {
        const aiText = response.data.response;
        let aiMsgId = `local_ai_${Date.now()}`;
        if (user) {
          const { data } = await supabase.from('ai_messages').insert([{ user_id: user.id, message: aiText, sender_type: 'ai' }]).select().single();
          if (data) aiMsgId = data.id;
        }
        knownIdsRef.current.add(aiMsgId);

        setMessages((prev) => {
          if (prev.find((m) => m.id === aiMsgId)) return prev;
          return [...prev, { id: aiMsgId, message: aiText, sender_type: 'ai', created_at: new Date().toISOString() }];
        });
      }
    } catch (err) {
      setError(err.response?.status === 429 ? 'RATE_LIMIT: Standby.' : 'UPLINK_FAILURE: Backend unreachable.');
    } finally {
      setIsSending(false);
      setIsTyping(false);
      sendingLockRef.current = false;
      inputRef.current?.focus();
    }
  }, [message, messages, user, getAccessToken]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <style>{`
        @keyframes scanline-sweep {
          0% { top: -30%; }
          100% { top: 110%; }
        }
        @keyframes cyber-border-pulse {
          0%, 100% {
            border-color: rgba(123, 47, 247, 0.2);
            box-shadow: 0 30px 100px rgba(0,0,0,0.95), 0 0 25px rgba(123, 47, 247, 0.05), inset 0 0 15px rgba(123, 47, 247, 0.03);
          }
          50% {
            border-color: rgba(123, 47, 247, 0.5);
            box-shadow: 0 30px 100px rgba(0,0,0,0.95), 0 0 45px rgba(123, 47, 247, 0.18), inset 0 0 25px rgba(123, 47, 247, 0.06);
          }
        }
        .cyber-glow-border {
          animation: cyber-border-pulse 6s infinite ease-in-out;
        }
        @keyframes glass-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glass-flowing-input {
          background: linear-gradient(90deg, rgba(7,11,20,0.5) 0%, rgba(123, 47, 247,0.06) 50%, rgba(7,11,20,0.5) 100%);
          background-size: 200% 200%;
          animation: glass-flow 8s infinite linear;
        }
      `}</style>
      {/* Floating Robot Launcher Container */}
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.1}
        animate={dragAnimControls}
        onDragEnd={handleDragEnd}
        className="fixed bottom-8 right-8 z-50 flex items-center pointer-events-none"
        style={{ transform: 'translateZ(0)', touchAction: 'none' }}
      >
        <motion.div
          animate={{ y: [-6, 0, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          onPointerDown={(e) => dragControls.start(e)}
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        >
          <RobotAvatar
            isTyping={isTyping}
            isOpen={isOpen}
            unreadCount={unreadCount}
            isBlinking={isBlinking}
          />
        </motion.div>
      </motion.div>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-32 right-8 w-[460px] h-[740px] max-h-[calc(100vh-150px)] max-w-[calc(100vw-40px)] bg-[#05080f]/90 backdrop-blur-3xl border border-fuchsia-500/20 rounded-[24px] z-50 flex flex-col overflow-hidden cyber-glow-border"
          >


            {/* Main Chat Area */}
            <div className="relative flex-1 overflow-hidden flex flex-col bg-[#05080f]/90 rounded-[24px] pt-7">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-[#070B14] pointer-events-none z-0" />

              {/* Very Subtle Moving Light Gradient Glow */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute w-[300px] h-[300px] rounded-full bg-fuchsia-500/5 blur-[80px]"
                  style={{ top: '10%', left: '10%' }}
                  animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-[250px] h-[250px] rounded-full bg-purple-500/3 blur-[60px]"
                  style={{ bottom: '15%', right: '10%' }}
                  animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
              </div>

              <div
                ref={scrollContainerRef}
                className={`flex-1 overflow-y-auto space-y-7 custom-scrollbar relative z-10 ${messages.length === 0 ? 'flex items-center justify-center p-6' : 'px-6 md:px-8 py-8 pr-4 md:pr-6'
                  }`}
              >
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center w-full px-6 pt-10 pb-4"
                  >
                    {/* Glowing Assistant 3D Avatar with green online dot */}
                    {/* Glowing Assistant 3D Avatar with green online dot */}
                    <div className="relative mb-8 flex items-center justify-center w-36 h-36 select-none">
                      <motion.div
                        className="relative w-full h-full flex items-center justify-center overflow-visible"
                        animate={{ 
                          y: [-4, 4, -4],
                          rotate: [-0.8, 0.8, -0.8]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        {/* Neural circuit reflections/Scanlines overlay inside the face screen */}
                        <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden rounded-full">
                          <div
                            className="absolute left-0 right-0 w-full"
                            style={{
                              background: 'linear-gradient(180deg, transparent 0%, rgba(123, 47, 247, 0.2) 50%, transparent 100%)',
                              height: '25%',
                              top: '0%',
                              animation: 'scanline-sweep 3s linear infinite'
                            }}
                          />
                        </div>

                        <img
                          src="/images/robot_avatar_white.png"
                          alt="JeztBrain Bot"
                          className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_20px_rgba(123, 47, 247,0.45)]"
                        />

                        {/* Blinking eyes overlay for welcome avatar */}
                        {isBlinking && (
                          <>
                            <div
                              className="absolute z-20 bg-[#091125] rounded-full"
                              style={{ left: "32%", top: "42%", width: "12%", height: "15%" }}
                            />
                            <div
                              className="absolute z-20 bg-[#091125] rounded-full"
                              style={{ left: "56%", top: "42%", width: "12%", height: "15%" }}
                            />
                          </>
                        )}
                      </motion.div>
                      {/* Green online indicator dot on top-right of the robot avatar */}
                      <span className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-emerald-500 rounded-full border-2 border-[#070B14] animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.9)] z-30" />
                    </div>

                    <h2 className="text-3xl font-extrabold text-white mb-3.5 tracking-tight">
                      Jezt<span className="text-[#8B5CF6]">Brain</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] drop-shadow-[0_0_15px_rgba(123, 47, 247,0.4)]">Bot</span>
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                      Hi, I’m JeztBrain Bot. How can I help secure your systems today?
                    </p>

                    {/* Glowing Neon Blue Divider Line */}
                    <div className="w-full max-w-[280px] h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/60 to-transparent shadow-[0_0_15px_rgba(123, 47, 247,0.55)] mb-4" />
                  </motion.div>
                )}
                {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} isHistoryView={false} />)}
                {isTyping && <ThinkingState />}
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* History Sliding Panel */}
              <AnimatePresence>
                {showHistoryPanel && (
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute inset-0 z-30 bg-[#070B14]/95 backdrop-blur-3xl flex flex-col border-l border-fuchsia-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                  >
                    <div className="px-7 py-4.5 border-b border-fuchsia-500/30 bg-black/60 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2.5 font-mono font-black text-xs uppercase tracking-widest text-fuchsia-300">
                        <History size={16} className="text-fuchsia-400 animate-pulse" />
                        Session Archive
                      </div>
                      <button onClick={() => setShowHistoryPanel(false)} className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-7 py-7 space-y-7 custom-scrollbar">
                      {loadingHistory ? (
                        <div className="flex justify-center mt-12"><Loader2 className="animate-spin text-fuchsia-400" size={28} /></div>
                      ) : historyMessages.length === 0 ? (
                        <div className="text-center text-slate-500 font-mono text-xs mt-12">No history archived.</div>
                      ) : (
                        historyMessages.map(msg => <MessageBubble key={msg.id} msg={msg} isHistoryView={true} />)
                      )}
                      <div ref={historyEndRef} className="h-4" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="shrink-0 px-7 py-3 bg-rose-500/15 border-t border-rose-500/30 flex items-center gap-2.5 relative z-20 shadow-md">
                  <AlertCircle size={16} className="text-rose-400 shrink-0 animate-pulse" />
                  <span className="text-xs text-rose-300 font-mono uppercase tracking-widest font-black">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="shrink-0 px-7 py-5 bg-[#05080f]/90 backdrop-blur-3xl relative z-20">
              <form onSubmit={handleSendMessage} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-purple-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative flex items-center glass-flowing-input border border-fuchsia-500/35 rounded-full p-1 focus-within:border-[#8B5CF6] focus-within:shadow-[0_0_25px_rgba(123, 47, 247,0.35)] transition-all">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setError(null); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask JeztBrain Bot..."
                    disabled={isSending || showHistoryPanel}
                    className="w-full bg-transparent text-white font-sans text-sm pl-6 pr-16 py-3.5 focus:outline-none transition-all resize-none placeholder:text-slate-500 max-h-[140px]"
                    style={{ minHeight: '52px' }}
                  />
                  <motion.button
                    type="submit"
                    disabled={!message.trim() || isSending || showHistoryPanel}
                    animate={{
                      boxShadow: ["0 0 10px rgba(0,92,255,0.4)", "0 0 20px rgba(0,92,255,0.75)", "0 0 10px rgba(0,92,255,0.4)"]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#005cff] hover:bg-[#007bff] text-white rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 shrink-0"
                  >
                    {isSending ? <Loader2 size={18} className="animate-spin text-white" /> : <Send size={18} className="text-white translate-x-[1px] -translate-y-[1px]" />}
                  </motion.button>
                </div>
              </form>
              <div className="mt-4.5 flex items-center justify-between px-2 text-slate-500 font-sans tracking-wide">
                <span className="text-[11px] font-medium flex items-center gap-2">
                  <Shield size={13} className="text-[#8B5CF6] opacity-80" /> E2E Encrypted Tunnels
                </span>
                <span className="text-[11px] font-medium">
                  Powered by JeztBrain AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

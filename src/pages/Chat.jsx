import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chat() {
  const { user } = useAuth();
  const location = useLocation();
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('incidentId');
    if (id) {
      setSelectedIncidentId(id);
    }
  }, [location]);

  if (!user) return null;

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-[#030712] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative group">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Left Sidebar: Active Channels */}
      <ChatSidebar 
        activeIncidentId={selectedIncidentId} 
        onSelectIncident={setSelectedIncidentId} 
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {selectedIncidentId ? (
          <ChatWindow incidentId={selectedIncidentId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-black/20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 max-w-md"
            >
              <div className="w-24 h-24 bg-fuchsia-500/10 rounded-full flex items-center justify-center mx-auto border border-fuchsia-500/20 relative">
                <Shield size={40} className="text-fuchsia-400 drop-shadow-[0_0_15px_rgba(123, 47, 247,0.5)]" />
                <div className="absolute inset-0 rounded-full border border-fuchsia-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight mb-2">Secure Link Standby</h2>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Select a tactical incident channel from the sidebar to establish an end-to-end encrypted link with SOC agents.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
                <span className="flex items-center gap-2"><Lock size={12} /> Encrypted</span>
                <span>•</span>
                <span>Authorized Only</span>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}


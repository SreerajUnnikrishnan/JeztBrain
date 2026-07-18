import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Shield, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function InvestigationPanel({ isOpen, onClose }) {
  const [incidentId, setIncidentId] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleStart = async (e) => {
    e.preventDefault();
    if (!incidentId.trim()) return;

    setLoading(true);
    const toastId = toast.loading('Initializing workspace...');

    try {
      const { error } = await supabase.from('investigations').insert([{
        incident_id: incidentId,
        expert_id: user.id,
        status: 'active'
      }]);

      if (error) throw error;
      toast.success(`Investigation started for ${incidentId}`, { id: toastId });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create investigation record.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0B0F19] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-white/5 rounded-full"><X size={16} /></button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400"><Zap size={24} /></div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">New Investigation</h2>
              <p className="text-xs text-slate-400">Initialize a secure analysis workspace.</p>
            </div>
          </div>

          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Incident ID</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  type="text" 
                  value={incidentId}
                  onChange={(e) => setIncidentId(e.target.value)}
                  placeholder="e.g. INC-9482" 
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Shield size={18} /> Initialize Workspace</>}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

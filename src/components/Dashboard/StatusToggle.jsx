import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function StatusToggle() {
  const { user } = useAuth();
  const [status, setStatus] = useState('offline'); // online, busy, offline
  const [loading, setLoading] = useState(true);

  // Fetch initial status
  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('status')
          .eq('id', user.id)
          .maybeSingle();

        if (data && data.status) {
          setStatus(data.status);
        } else if (error) {
          console.error("Error fetching expert status:", error.message);
        }
      } catch (err) {
        console.error("Fetch status exception:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [user]);

  const updateStatus = async (newStatus) => {
    if (status === newStatus || loading) return;
    setStatus(newStatus);

    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          status: newStatus,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error("Error updating status:", error.message);
      }
    } catch (err) {
      console.error("Update status exception:", err);
    }
  };

  const statuses = [
    { id: 'online', label: 'ONLINE', color: 'emerald', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]' },
    { id: 'busy', label: 'BUSY', color: 'amber', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]' },
    { id: 'offline', label: 'OFFLINE', color: 'slate', glow: 'shadow-[0_0_15px_rgba(100,116,139,0.5)]' }
  ];

  return (
    <div className="flex bg-[#0B0F19] border border-white/10 rounded-xl p-1 shadow-inner relative z-40">
      {statuses.map((s) => {
        const isActive = status === s.id;
        return (
          <button
            key={s.id}
            onClick={() => updateStatus(s.id)}
            disabled={loading}
            className={`
              relative px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300
              ${isActive 
                ? `bg-${s.color}-500/10 text-${s.color}-400 ${s.glow}` 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
            `}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Target, X, Plus, Terminal } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function CybersecuritySkills() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);



  async function fetchSkills() {
    try {
      const { data, error } = await supabase
        .from('expert_skills')
        .select('*')
        .eq('user_id', user.id);
      
      if (error && error.code !== '42P01') throw error; // Ignore table not found if SQL not run yet
      setSkills(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) fetchSkills();
  }, [user]);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    const skillObj = {
      user_id: user.id,
      skill_name: newSkill.trim().toUpperCase()
    };

    try {
      // Optimistic update
      setSkills(prev => [...prev, { id: 'temp', ...skillObj }]);
      setNewSkill('');

      const { data, error } = await supabase
        .from('expert_skills')
        .insert([skillObj])
        .select()
        .single();

      if (error) throw error;
      
      // Update with real ID
      setSkills(prev => prev.map(s => s.id === 'temp' ? data : s));
    } catch (err) {
      console.error(err);
      toast.error('Failed to add skill protocol. Verify DB schema.');
      fetchSkills(); // Revert
    }
  };

  const handleRemoveSkill = async (id) => {
    try {
      setSkills(prev => prev.filter(s => s.id !== id));
      const { error } = await supabase.from('expert_skills').delete().eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove skill protocol.');
      fetchSkills(); // Revert
    }
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20">
          <Terminal size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Cybersecurity_Skills</h3>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Operational Capabilities</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
        {loading ? (
          <div className="animate-pulse flex gap-2 flex-wrap">
            {[1,2,3,4].map(i => <div key={i} className="h-8 w-24 bg-white/5 rounded-lg"></div>)}
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
            <Target className="mx-auto text-slate-600 mb-2" size={24} />
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">No active skill protocols found.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <div 
                key={skill.id} 
                className="group/tag flex items-center gap-2 px-4 py-2 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:-translate-y-0.5 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]"></span>
                <span className="text-xs font-black text-purple-100 tracking-widest uppercase">{skill.skill_name}</span>
                <button 
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="ml-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover/tag:opacity-100 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleAddSkill} className="shrink-0 relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Plus size={16} className="text-fuchsia-500" />
        </div>
        <input 
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="ADD NEW SKILL PROTOCOL..."
          className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] font-mono tracking-widest text-white focus:outline-none focus:border-fuchsia-500/50 transition-all uppercase"
        />
        <button 
          type="submit" 
          disabled={!newSkill.trim()}
          className="absolute inset-y-2 right-2 px-4 bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-black font-black uppercase tracking-widest text-[10px] rounded-lg transition-all disabled:opacity-50 flex items-center"
        >
          Inject
        </button>
      </form>
    </div>
  );
}

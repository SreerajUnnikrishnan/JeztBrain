import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

// SOC Profile Components
import ProfileHeader from '../../components/profile/soc/ProfileHeader';
import ExpertInformation from '../../components/profile/soc/ExpertInformation';
import CybersecuritySkills from '../../components/profile/soc/CybersecuritySkills';
import CertificationManager from '../../components/profile/soc/CertificationManager';
import PerformanceMetrics from '../../components/profile/soc/PerformanceMetrics';
import OperationsTimeline from '../../components/profile/soc/OperationsTimeline';
import AIAssistantPanel from '../../components/profile/soc/AIAssistantPanel';
import SecuritySettings from '../../components/profile/soc/SecuritySettings';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({});



  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) setProfile(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load identity core.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updateData);
      
      if (error) {
         if (error.code === 'PGRST204' || error.message?.includes('column')) {
             console.warn('Handling schema mismatch...');
             // Filter out columns that don't exist yet if user hasn't run SQL migration
             const safeUpdate = { id: user.id, full_name: profile.full_name, bio: profile.bio, avatar_url: profile.avatar_url };
             const { error: retryError } = await supabase.from('profiles').upsert(safeUpdate);
             if (retryError) throw retryError;
         } else {
             throw error;
         }
      }
      toast.success('Identity sync complete.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to sync. Please ensure SQL migration is run.');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (status) => {
    setProfile(prev => ({ ...prev, availability: status.toLowerCase() }));
    try {
      await supabase.from('profiles').update({ availability: status.toLowerCase() }).eq('id', user.id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-40">
      <Loader2 className="animate-spin text-fuchsia-500" size={48} />
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Top Section - Header Full Width */}
      <div className="w-full">
        <ProfileHeader profile={profile} onStatusChange={handleStatusChange} />
      </div>

      {/* Row 1 - Expert Info & Metrics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <ExpertInformation profile={profile} setProfile={setProfile} onSave={handleSave} saving={saving} />
        </div>
        <div className="xl:col-span-2">
          <PerformanceMetrics />
        </div>
      </div>

      {/* Row 2 - Skills, Certs & Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="flex-1">
             <CybersecuritySkills />
          </div>
        </div>
        
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="shrink-0">
             <CertificationManager />
          </div>
          <div className="flex-1">
             <OperationsTimeline />
          </div>
        </div>

        {/* Row 3 - AI & Settings */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="flex-1">
             <AIAssistantPanel />
          </div>
          <div className="shrink-0">
             <SecuritySettings />
          </div>
        </div>
      </div>

    </div>
  );
}

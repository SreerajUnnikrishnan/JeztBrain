import React, { useState, useEffect, useRef } from 'react';
import { Award, Shield, Star, Terminal, Zap, CheckCircle, Settings, Edit3, Camera, X, Save, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ProfileView() {
  const { user } = useAuth();
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: '',
    title: 'Senior Incident Responder & Malware Analyst',
    bio: 'Experienced in handling critical enterprise security incidents.',
    skills: ['Reverse Engineering', 'Malware Analysis', 'Network Forensics', 'Incident Response', 'Cryptography'],
    certs: ['OSCP', 'CISSP', 'GIAC GREM', 'CISM'],
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'hacker1'}&backgroundColor=0B0F19`,
    coverUrl: `https://www.transparenttextures.com/patterns/cubes.png`,
    rating: 4.9,
    tasksCount: 89
  });
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // File Input Refs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          setProfileData(prev => ({ 
            ...prev, 
            name: data.name || user.displayName || 'Agent_Null',
            title: data.title || prev.title,
            bio: data.bio || prev.bio,
            skills: data.skills || prev.skills,
            certs: data.certs || prev.certs,
            avatarUrl: data.avatarUrl || prev.avatarUrl,
            coverUrl: data.coverUrl || prev.coverUrl
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB.');
      return;
    }

    setUploadError('');
    setSuccessMsg('');
    setIsUploading(true);

    try {
      if (!user?.uid) throw new Error("User not authenticated");
      const filePath = `profiles/${user.id}/${type}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Update Supabase DB
      const updatePayload = type === 'avatar' ? { avatarUrl: publicUrl } : { coverUrl: publicUrl };
      const { error: updateError } = await supabase.from('profiles').update(updatePayload).eq('id', user.id);
      if (updateError) throw updateError;

      // Update Local State
      setProfileData(prev => ({ ...prev, ...updatePayload }));
      setSuccessMsg(`${type === 'avatar' ? 'Profile picture' : 'Cover image'} updated successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCertificationUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError('');
    setSuccessMsg('');
    setIsUploading(true);

    try {
      if (!user?.id) throw new Error("User not authenticated");
      const filePath = `certs/${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Add to certs array
      const newCerts = [...profileData.certs, file.name];
      const { error: updateError } = await supabase.from('profiles').update({ certs: newCerts }).eq('id', user.id);
      if (updateError) throw updateError;

      setProfileData(prev => ({ ...prev, certs: newCerts }));
      setSuccessMsg(`Certification "${file.name}" uploaded successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Cert upload error:", err);
      setUploadError('Failed to upload certification. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="w-8 h-8 border-4 border-hacker-neon border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto relative">
      {/* Alerts */}
      {uploadError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm flex justify-between items-center">
          {uploadError}
          <button onClick={() => setUploadError('')}><X size={16}/></button>
        </div>
      )}
      {successMsg && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-4 text-sm flex justify-between items-center">
          {successMsg}
          <button onClick={() => setSuccessMsg('')}><X size={16}/></button>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-lg overflow-hidden relative">
        {isUploading && (
           <div className="absolute inset-0 bg-hacker-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-hacker-neon border-t-transparent rounded-full animate-spin"></div>
           </div>
        )}
        
        {/* Cover Image */}
        <div 
          className="h-40 bg-hacker-neon/10 border-b border-hacker-border relative group"
          style={{ backgroundImage: `url(${profileData.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button onClick={() => coverInputRef.current?.click()} className="bg-hacker-bg/80 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-hacker-neon transition-colors">
              <Camera size={16} /> Update Cover
            </button>
            <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'cover')} />
          </div>

          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button onClick={() => setIsSettingsModalOpen(true)} className="bg-hacker-bg/70 backdrop-blur border border-hacker-border p-2 rounded-lg text-white hover:bg-hacker-neon transition-colors">
              <Settings size={18} />
            </button>
            <button onClick={() => setIsEditModalOpen(true)} className="bg-hacker-neon text-white p-2 rounded-lg hover:bg-purple-600 transition-colors shadow-[0_0_10px_rgba(123, 47, 247,0.3)]">
              <Edit3 size={18} />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12 mb-6 relative z-10">
            
            {/* Avatar */}
            <div className="h-28 w-28 rounded-full bg-hacker-bg border-4 border-hacker-card flex items-center justify-center relative shadow-[0_0_20px_rgba(123, 47, 247,0.2)] group cursor-pointer overflow-hidden"
                 onClick={() => avatarInputRef.current?.click()}>
              <img src={profileData.avatarUrl} alt="Profile" className="h-full w-full rounded-full object-cover bg-hacker-bg" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col">
                <Camera size={20} className="text-white" />
                <span className="text-[10px] text-white mt-1">Upload</span>
              </div>
              <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                {profileData.name || user?.displayName || 'Agent_Null'} <Shield className="text-hacker-neon h-6 w-6" />
              </h1>
              <p className="text-gray-400">{profileData.title}</p>
            </div>
            
            <div className="sm:ml-auto flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{profileData.rating}</p>
                <div className="flex text-yellow-500 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(profileData.rating) ? "currentColor" : "none"} className={i >= Math.floor(profileData.rating) ? "text-gray-600" : ""} />
                  ))}
                </div>
              </div>
              <div className="w-px h-12 bg-hacker-border"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{profileData.tasksCount}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Tasks</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
              {profileData.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Terminal className="text-hacker-neon h-5 w-5" /> Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="bg-hacker-bg border border-hacker-border text-gray-300 text-xs px-3 py-1.5 rounded-full hover:border-hacker-neon/50 hover:text-white transition-colors cursor-default">
                  {skill}
                </span>
              ))}
              {profileData.skills.length === 0 && <span className="text-gray-500 text-sm">No skills added yet.</span>}
            </div>
          </div>

          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Award className="text-yellow-500 h-5 w-5" /> Certifications
              </h3>
              <button 
                onClick={() => document.getElementById('cert-upload').click()}
                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-400 hover:text-white transition-all"
                title="Upload Certificate"
              >
                <Camera size={14} />
                <input 
                  id="cert-upload"
                  type="file" 
                  className="hidden" 
                  accept="image/*,.pdf" 
                  onChange={(e) => handleCertificationUpload(e)} 
                />
              </button>
            </div>
            <ul className="space-y-3">
              {profileData.certs.map((cert, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300 bg-hacker-bg p-3 rounded-lg border border-hacker-border/50 group">
                  <CheckCircle className="text-green-500 h-4 w-4 flex-shrink-0" />
                  <span className="font-medium text-sm truncate flex-1">{cert}</span>
                </li>
              ))}
              {profileData.certs.length === 0 && <span className="text-gray-500 text-sm">No certifications added yet.</span>}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="text-hacker-neon h-5 w-5" /> Recent Reviews
            </h3>
            <div className="space-y-4">
              {[
                { client: 'Client-B920', rating: 5, date: '1 week ago', text: 'Agent_Null was incredibly fast in identifying the ransomware strain and isolating the network. Saved us millions in potential losses.' },
                { client: 'Client-A110', rating: 5, date: '1 month ago', text: 'Very professional. Provided a detailed post-mortem report that helped us patch our firewall vulnerabilities immediately.' }
              ].map((review, i) => (
                <div key={i} className="bg-hacker-bg border border-hacker-border/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white text-sm">{review.client}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} fill={j < review.rating ? "currentColor" : "none"} className={j >= review.rating ? "text-gray-600" : ""} />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal 
          profileData={profileData} 
          setProfileData={setProfileData} 
          onClose={() => setIsEditModalOpen(false)} 
          userId={user?.uid}
        />
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsModalOpen(false)} 
        />
      )}
    </div>
  );
}

function EditProfileModal({ profileData, setProfileData, onClose, userId }) {
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    title: profileData.title || '',
    bio: profileData.bio || '',
    skills: profileData.skills.join(', '),
    certs: profileData.certs.join(', ')
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const updatedData = {
      name: formData.name,
      title: formData.title,
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      certs: formData.certs.split(',').map(c => c.trim()).filter(c => c)
    };

    try {
      if (!userId) throw new Error("No user ID");
      const { error } = await supabase.from('profiles').update(updatedData).eq('id', userId);
      if (error) throw error;
      setProfileData(prev => ({ ...prev, ...updatedData }));
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to save profile. Make sure you are authenticated.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-hacker-border flex justify-between items-center bg-hacker-bg/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Edit3 size={18} className="text-hacker-neon"/> Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={20}/></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form id="editProfileForm" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Professional Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows="3" className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Skills (comma separated)</label>
              <input type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none" placeholder="e.g. Malware Analysis, Reverse Engineering" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Certifications (comma separated)</label>
              <input type="text" value={formData.certs} onChange={(e) => setFormData({...formData, certs: e.target.value})} className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none" placeholder="e.g. OSCP, CISSP" />
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-hacker-border bg-hacker-bg/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
          <button type="submit" form="editProfileForm" disabled={isSaving} className="bg-hacker-neon text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Save size={16}/> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ onClose }) {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const updates = {};
      if (email !== user?.email) updates.email = email;
      if (password) updates.password = password;
      
      if (Object.keys(updates).length > 0) {
        const { error } = await supabase.auth.updateUser(updates);
        if (error) throw error;
      }
      setMsg({ type: 'success', text: 'Account settings updated successfully.' });
      setPassword(''); // clear password field
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
        setMsg({ type: 'error', text: 'This operation requires recent authentication. Please log out and log back in.' });
      } else {
        setMsg({ type: 'error', text: 'Failed to update settings: ' + err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
        <div className="p-4 border-b border-hacker-border flex justify-between items-center bg-hacker-bg/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Settings size={18} className="text-hacker-neon"/> Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={20}/></button>
        </div>

        <div className="p-6">
          {msg && (
            <div className={`px-4 py-3 rounded-lg mb-4 text-sm ${msg.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/50' : 'bg-green-500/10 text-green-400 border border-green-500/50'}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleUpdateAccount} className="space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-hacker-border pb-2 mb-4">Account Security</h3>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><Mail size={14}/> Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><Lock size={14}/> New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full bg-hacker-bg border border-hacker-border text-white text-sm rounded-lg px-4 py-2.5 focus:border-hacker-neon outline-none" />
            </div>

            <h3 className="text-sm font-semibold text-white border-b border-hacker-border pb-2 mb-4 mt-6">Preferences</h3>
            <div className="flex items-center justify-between bg-hacker-bg p-3 rounded-lg border border-hacker-border">
              <div>
                <p className="text-sm font-medium text-white">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive alerts for new incidents.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hacker-neon"></div>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Close</button>
              <button type="submit" disabled={loading} className="bg-hacker-neon text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center gap-2 disabled:opacity-70">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Update Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


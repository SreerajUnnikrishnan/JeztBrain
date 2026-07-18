import React, { useState, useEffect } from 'react';
import { Award, UploadCloud, Trash2, CheckCircle, ShieldAlert, Loader2, Link } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function CertificationManager() {
  const { user } = useAuth();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    expiry_date: '',
    certificate_id: '',
    file_url: ''
  });



  async function fetchCerts() {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error && error.code !== '42P01') throw error;
      setCerts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) fetchCerts();
  }, [user]);

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('certifications')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('certifications')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, file_url: publicUrl }));
      toast.success('Document uploaded to secure vault.');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.organization) {
      toast.error('Name and Organization are required.');
      return;
    }

    try {
      setUploading(true);
      const { data, error } = await supabase
        .from('certifications')
        .insert([{ ...formData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setCerts([data, ...certs]);
      setShowForm(false);
      setFormData({ name: '', organization: '', expiry_date: '', certificate_id: '', file_url: '' });
      toast.success('Certification registered.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save certification. Verify DB schema.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setCerts(certs.filter(c => c.id !== id));
      const { error } = await supabase.from('certifications').delete().eq('id', id);
      if (error) throw error;
      toast.success('Certification revoked.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to revoke certification.');
      fetchCerts();
    }
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Clearance_Credentials</h3>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Validated Certifications</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-white/5 hover:bg-amber-500/20 text-amber-400 border border-white/10 hover:border-amber-500/50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          {showForm ? 'Cancel' : 'Add Credential'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCert} className="mb-8 p-6 bg-black/40 border border-white/10 rounded-3xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Credential Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500/50 uppercase" placeholder="e.g. OSCP" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Issuing Authority</label>
              <input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500/50 uppercase" placeholder="e.g. Offensive Security" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Credential ID</label>
              <input type="text" value={formData.certificate_id} onChange={e => setFormData({...formData, certificate_id: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500/50 uppercase" placeholder="ID Number" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Expiry Date</label>
              <input type="date" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500/50 uppercase" />
            </div>
          </div>
          
          <div className="mt-4 p-6 border-2 border-dashed border-white/10 hover:border-amber-500/30 rounded-2xl flex flex-col items-center justify-center transition-colors">
            {formData.file_url ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle size={20} /> <span className="text-xs font-black uppercase tracking-widest">Document Secured</span>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <UploadCloud size={24} className="text-amber-400 mb-2" />
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-1">Upload Certificate (PDF/JPG)</span>
                <input type="file" accept=".pdf,image/*" onChange={handleUpload} className="hidden" />
              </label>
            )}
            {uploading && <Loader2 size={16} className="text-amber-400 animate-spin mt-2" />}
          </div>

          <div className="flex justify-end pt-4">
             <button type="submit" disabled={uploading} className="px-6 py-3 bg-amber-500 text-black hover:bg-amber-400 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all">
               Register Credential
             </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-amber-500" size={32} /></div>
      ) : certs.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
           <ShieldAlert className="mx-auto text-slate-600 mb-4" size={32} />
           <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">No active credentials registered.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certs.map(cert => (
            <div key={cert.id} className="p-6 bg-black/40 border border-white/5 hover:border-amber-500/30 rounded-3xl group transition-all relative">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {cert.file_url && (
                  <a href={cert.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-fuchsia-400 bg-white/5 rounded-lg transition-colors">
                    <Link size={14} />
                  </a>
                )}
                <button onClick={() => handleDelete(cert.id)} className="p-2 text-slate-500 hover:text-rose-400 bg-white/5 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex items-start gap-4 mb-4 pr-16">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">{cert.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">{cert.organization}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[8px] text-slate-600 uppercase tracking-[0.2em] font-black">Status</p>
                  <p className="text-xs text-emerald-400 font-mono uppercase mt-0.5">{cert.status || 'Valid'}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-600 uppercase tracking-[0.2em] font-black">Expiry</p>
                  <p className="text-xs text-white font-mono uppercase mt-0.5">{cert.expiry_date ? new Date(cert.expiry_date).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

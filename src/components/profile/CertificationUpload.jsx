import React, { useState } from 'react';
import { Upload, File, X, Check, Loader2, CloudUpload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export default function CertificationUpload({ onUploadComplete, bucket = 'avatars' }) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        toast.error('File too large (max 5MB)');
        return;
      }
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      setFile(null);
      toast.success('Document uploaded to secure storage.');
    } catch (err) {
      console.error(err);
      toast.error('Storage link failure.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition-all bg-white/5 border-2 border-white/10 border-dashed rounded-2xl cursor-pointer hover:bg-white/[0.08] hover:border-fuchsia-500/50 group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload className="w-8 h-8 mb-3 text-slate-500 group-hover:text-fuchsia-400 transition-colors" />
            <p className="mb-2 text-sm text-slate-400">
              <span className="font-bold text-white">Click to upload</span> or drag and drop
            </p>
            <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">PDF, PNG, JPG (MAX. 5MB)</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" />
        </label>
      ) : (
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-400">
              <File size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white truncate max-w-[200px]">{file.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Ready for secure transfer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setFile(null)} 
              disabled={uploading}
              className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
            >
              <X size={18} />
            </button>
            <button 
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-400 text-black text-xs font-black uppercase rounded-lg transition-all flex items-center gap-2"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} /> Upload</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

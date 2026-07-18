import React from 'react';
import { FileCode, FileImage, FileArchive, Download, Eye, Clock, Search } from 'lucide-react';

export default function EvidenceView() {
  const evidenceFiles = [
    { id: 1, name: 'sysmon_events.evtx', type: 'log', size: '45 MB', uploadedAt: '2 hours ago', uploader: 'Client-V104' },
    { id: 2, name: 'firewall_logs_export.csv', type: 'csv', size: '14 MB', uploadedAt: '2 hours ago', uploader: 'Client-V104' },
    { id: 3, name: 'ransom_note.txt', type: 'text', size: '2 KB', uploadedAt: '3 hours ago', uploader: 'Client-V104' },
    { id: 4, name: 'server_screenshot.png', type: 'image', size: '1.2 MB', uploadedAt: '3 hours ago', uploader: 'Client-V104' },
    { id: 5, name: 'malware_sample_encrypted.zip', type: 'archive', size: '8.5 MB', uploadedAt: '1 hour ago', uploader: 'You' },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'image': return <FileImage className="text-purple-400 h-8 w-8" />;
      case 'archive': return <FileArchive className="text-red-400 h-8 w-8" />;
      case 'log': 
      case 'text':
      case 'csv': return <FileCode className="text-green-400 h-8 w-8" />;
      default: return <FileCode className="text-gray-400 h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Evidence & Media</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input type="text" placeholder="Search files..." className="bg-hacker-card border border-hacker-border text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-hacker-neon/50 w-full sm:w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidenceFiles.map((file) => (
          <div key={file.id} className="bg-hacker-card border border-hacker-border rounded-xl p-5 hover:border-hacker-neon/30 transition-colors shadow-lg group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-hacker-bg rounded-lg border border-hacker-border">
                {getFileIcon(file.type)}
              </div>
              <span className="text-xs font-medium text-gray-500 bg-hacker-bg px-2 py-1 rounded border border-hacker-border">
                {file.size}
              </span>
            </div>
            
            <h3 className="text-sm font-semibold text-white mb-1 truncate" title={file.name}>
              {file.name}
            </h3>
            
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
              <Clock size={12} /> {file.uploadedAt} by {file.uploader}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-hacker-bg border border-hacker-border text-gray-300 py-1.5 rounded-lg hover:text-white hover:bg-hacker-border/50 transition-colors text-sm flex justify-center items-center gap-2">
                <Eye size={14} /> View
              </button>
              <button className="flex-1 bg-hacker-neon/10 border border-hacker-neon/30 text-hacker-neon py-1.5 rounded-lg hover:bg-hacker-neon hover:text-white transition-colors text-sm flex justify-center items-center gap-2">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


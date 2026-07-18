import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Image as ImageIcon, FileText, Download, Search, Filter } from 'lucide-react';

export default function FilesMedia() {
  // Mock data for files
  const files = [
    { id: 1, name: 'email_screenshot.png', incidentId: 'INC-2042', size: '1.2 MB', type: 'image', date: 'Oct 24, 2023' },
    { id: 2, name: 'headers.txt', incidentId: 'INC-2042', size: '4 KB', type: 'text', date: 'Oct 24, 2023' },
    { id: 3, name: 'firewall_logs.pdf', incidentId: 'INC-2039', size: '3.5 MB', type: 'pdf', date: 'Oct 20, 2023' },
    { id: 4, name: 'system_scan_result.png', incidentId: 'INC-2040', size: '2.1 MB', type: 'image', date: 'Oct 23, 2023' },
    { id: 5, name: 'malware_analysis.pdf', incidentId: 'INC-2040', size: '5.8 MB', type: 'pdf', date: 'Oct 24, 2023' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <ImageIcon size={24} className="text-purple-500" />;
      case 'pdf': return <FileText size={24} className="text-red-500" />;
      case 'text': return <FileText size={24} className="text-gray-500" />;
      default: return <FileText size={24} className="text-primary" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Folder className="text-primary" />
          Files & Media
        </h1>
        <p className="text-gray-500 mt-1">Manage and download files attached to your security incidents.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Filters & Search */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Type
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Incident
            </button>
          </div>
        </div>

        {/* Files Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => (
              <div key={file.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow group relative flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    {getFileIcon(file.type)}
                  </div>
                  <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-purple-50 rounded-full" title="Download">
                    <Download size={18} />
                  </button>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate mb-1" title={file.name}>
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                  <Link to={`/incidents/${file.incidentId}`} className="text-xs font-medium text-primary hover:text-primary-hover flex items-center gap-1">
                    <Folder size={14} /> {file.incidentId}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


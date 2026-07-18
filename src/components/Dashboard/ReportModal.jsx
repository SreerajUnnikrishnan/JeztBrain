import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AIReportGenerator from '../reports/AIReportGenerator';

export default function ReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-5xl my-8 relative"
        >
          {/* Close button outside for cleaner UI */}
          <button 
            onClick={onClose} 
            className="absolute -top-4 -right-4 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-xl border border-white/10 z-50 transition-all hover:rotate-90"
          >
            <X size={24} />
          </button>
          
          <AIReportGenerator incident={null} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


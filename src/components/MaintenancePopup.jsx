import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Wrench, X, Sparkles } from 'lucide-react';

export default function MaintenancePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already dismissed in the current session
    const isDismissed = sessionStorage.getItem('jeztbrain_maintenance_dismissed');
    if (!isDismissed) {
      // Small delay to ensure smooth loading transition after page mount
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('jeztbrain_maintenance_dismissed', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Subtle Semi-Transparent Background Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* White Popup Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,23,42,0.18)] border border-slate-100 z-10 overflow-hidden text-left"
            role="dialog"
            aria-modal="true"
            aria-labelledby="maintenance-popup-title"
          >
            {/* Top Accent Gradient Line (Blue to Purple) */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

            {/* Top-Right Close X Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label="Close maintenance notice"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Card Content Layout */}
            <div className="space-y-6">
              
              {/* Header Visual: Icon Badge + Brand Tag */}
              <div className="flex items-center gap-3.5 pt-1">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/80 shadow-sm shrink-0">
                  <Wrench className="w-6 h-6 text-blue-600" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-blue-600 uppercase">
                    <Shield className="w-3.5 h-3.5" />
                    <span>JeztBrain Platform Notice</span>
                  </div>
                  <h2
                    id="maintenance-popup-title"
                    className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans"
                  >
                    JeztBrain Is Under Maintenance
                  </h2>
                </div>
              </div>

              {/* Popup Message Body */}
              <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                <p>
                  We are currently improving and updating the JeztBrain platform.
                </p>
                <p>
                  Some features and functions may not be working properly during this maintenance period. Our team is working to improve the website experience and restore full functionality.
                </p>
                <p className="text-slate-700 font-medium text-xs sm:text-sm pt-1 border-t border-slate-200/60 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>We apologize for any inconvenience and appreciate your patience.</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Close
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  Continue to Website
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Loader.jsx
 * Cyber-themed loading screen for JeztBrain.
 *
 * Features:
 *  - Smooth fade-out (CSS opacity transition)
 *  - Cycling status messages so the user knows it's alive
 *  - "Jezt" (white) + "Brain" (cyan) split-color brand
 *  - Never blocks: parent passes `visible` prop; when false it fades out then unmounts
 */

import React, { useState, useEffect } from 'react';

const STATUS_MESSAGES = [
  'Initializing secure connection...',
  'Establishing encrypted channel...',
  'Authenticating SOC node...',
  'Loading threat intelligence...',
  'Syncing neural pathways...',
];

export default function Loader({ visible = true }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [mounted, setMounted] = useState(true);

  // Cycle status text every 600ms so loader never looks stuck
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % STATUS_MESSAGES.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // When `visible` flips false, keep element mounted for the fade-out duration
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => setMounted(false), 500); // matches transition duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]"
      style={{
        transition: 'opacity 500ms ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123, 47, 247,0.08),transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinner — triple-ring */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/20" />
          {/* Spinning ring with glow */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-fuchsia-400 animate-spin"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(123, 47, 247,0.8))',
              animationDuration: '900ms',
            }}
          />
          {/* Inner ring (opposite direction, slower) */}
          <div
            className="absolute inset-3 rounded-full border border-transparent border-t-purple-500/60 animate-spin"
            style={{ animationDuration: '1400ms', animationDirection: 'reverse' }}
          />
          {/* Centre dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(123, 47, 247,1)]" />
          </div>
        </div>

        {/* Brand — "Jezt" white, "Brain" cyan */}
        <h1 className="text-3xl font-bold tracking-tight select-none">
          <span className="text-white">Jezt</span>
          <span className="text-fuchsia-400 drop-shadow-[0_0_10px_rgba(123, 47, 247,0.6)]">Brain</span>
        </h1>

        {/* Cycling status message */}
        <p
          key={msgIndex}
          className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 animate-pulse"
          style={{ minWidth: '22ch', textAlign: 'center' }}
        >
          {STATUS_MESSAGES[msgIndex]}
        </p>

        {/* Progress bar — runs for ~2 s then stops at 95% to avoid false "done" */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full"
            style={{
              animation: 'jezt-progress 2s ease-out forwards',
            }}
          />
        </div>
      </div>

      {/* Keyframe injected inline so no extra CSS file needed */}
      <style>{`
        @keyframes jezt-progress {
          from { width: 0%; }
          to   { width: 95%; }
        }
      `}</style>
    </div>
  );
}


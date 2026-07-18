import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Floating digital particles / stars
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0B1020]">
      
      {/* ─── BASE VIBRANT LAYERED GRADIENTS ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#172554] opacity-90 z-0" />
      
      {/* ─── AURORA LIGHT STREAKS & ENERGY WAVES ─── */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-r from-[#7C3AED]/10 via-[#1E3A8A]/15 to-[#00D4FF]/10 rounded-[100%] blur-[120px] mix-blend-screen z-0"
        animate={{ 
          rotate: [0, 10, -5, 0],
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.4, 0.6, 0.3, 0.4]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[80%] bg-gradient-to-r from-[#00D4FF]/10 via-[#38BDF8]/10 to-[#7C3AED]/15 rounded-[100%] blur-[150px] mix-blend-screen z-0"
        animate={{ 
          rotate: [0, -10, 5, 0],
          scale: [1, 1.2, 0.95, 1],
          opacity: [0.3, 0.5, 0.2, 0.3]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* ─── GLOWING BLUE FOG & CENTER LIGHTING ─── */}
      <div className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[100%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_60%)] blur-[100px] z-0 pointer-events-none" />

      {/* ─── MOVING CYBER GRID OVERLAY ─── */}
      <div className="absolute inset-0 perspective-[1000px] z-0 mix-blend-screen opacity-15">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{ transformOrigin: 'bottom', transform: 'rotateX(60deg)' }}
          animate={{ backgroundPosition: ['0px 0px', '0px 60px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ─── FLOATING DIGITAL PARTICLES / STARS ─── */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.8)] z-10"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            y: [-20, -60]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* ─── GLASS REFLECTION EFFECTS ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-10 mix-blend-overlay" />
    </div>
  );
}

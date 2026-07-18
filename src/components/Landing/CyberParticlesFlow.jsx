import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CyberParticlesFlow() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * -20,
    }));
  }, []);

  const signals = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      width: Math.random() * 2 + 1,
      height: Math.random() * 120 + 80,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * -10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Continuous gradient backplate mapping Hero -> Capabilities */}
      <div className="absolute top-[80vh] left-1/2 -translate-x-1/2 w-[120%] h-[150vh] bg-[radial-gradient(ellipse_at_center,rgba(123,47,247,0.06)_0%,rgba(168,85,247,0.03)_40%,transparent_70%)] blur-[120px]" />
      <div className="absolute top-[200vh] left-1/4 w-[80%] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03)_0%,transparent_60%)] blur-[140px]" />
      
      {/* Light theme: no dark overlay needed */}

      {/* Floating Cyber Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-500/20 shadow-[0_0_8px_rgba(123,47,247,0.4)]"
          style={{ 
            width: p.size, 
            height: p.size, 
            left: `${p.x}%`, 
            top: `${p.y}%` 
          }}
          animate={{ 
            y: [0, -150, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Vertical floating digital signal lines */}
      {signals.map(s => (
        <motion.div
          key={s.id}
          className="absolute bg-gradient-to-b from-transparent via-violet-500/15 to-transparent rounded-full"
          style={{
            left: `${s.left}%`,
            width: `${s.width}px`,
            height: `${s.height}px`,
            top: '40vh'
          }}
          animate={{
            y: [-200, 800],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* SVG AI neural pathway connections */}
      <svg className="absolute top-[80vh] inset-x-0 w-full h-[180vh] opacity-[0.08]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyberPathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7B2FF7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Pathway 1 */}
        <motion.path
          d="M 150,0 Q 300,400 120,800 T 400,1600"
          fill="none"
          stroke="url(#cyberPathGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 200"
          animate={{ strokeDashoffset: [0, -800] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Pathway 2 */}
        <motion.path
          d="M 1200,50 Q 950,450 1100,900 T 800,1700"
          fill="none"
          stroke="url(#cyberPathGrad)"
          strokeWidth="1.2"
          strokeDasharray="8 300"
          animate={{ strokeDashoffset: [0, 1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Pathway 3 (Cross connecting) */}
        <motion.path
          d="M 400,300 C 600,500 800,200 950,700 T 500,1400"
          fill="none"
          stroke="url(#cyberPathGrad)"
          strokeWidth="1"
          strokeDasharray="5 150"
          animate={{ strokeDashoffset: [0, -600] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

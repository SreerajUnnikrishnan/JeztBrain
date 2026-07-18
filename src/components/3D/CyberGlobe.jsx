import React from 'react';
import { motion } from 'framer-motion';

export default function CyberGlobe() {
  // Generate random nodes for the neural network effect
  const nodes = Array.from({ length: 45 }).map((_, i) => {
    // Generate points on a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    // Project to 2D
    const x = 50 + 45 * Math.sin(phi) * Math.cos(theta);
    const y = 50 + 45 * Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi); // Depth for opacity/size
    
    const size = Math.random() > 0.85 ? 'w-2 h-2' : 'w-1 h-1';
    const isRed = Math.random() > 0.95;
    const delay = Math.random() * 5;
    
    return {
      id: i,
      x,
      y,
      z,
      size,
      isRed,
      delay
    };
  });

  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Outer Tactical Ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-fuchsia-500/20 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner Tactical Ring (Reverse) */}
      <motion.div
        className="absolute inset-8 rounded-full border-2 border-purple-500/10 border-dotted"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Cyber Grid Background (Spherical) */}
      <div className="absolute inset-12 rounded-full overflow-hidden flex items-center justify-center mix-blend-screen opacity-60">
        {/* Latitude Lines */}
        <div className="absolute w-full h-[1px] bg-fuchsia-500/10 top-[20%]" style={{ transform: 'scaleX(0.8)' }} />
        <div className="absolute w-full h-[1px] bg-fuchsia-500/10 top-[40%]" style={{ transform: 'scaleX(0.95)' }} />
        <div className="absolute w-full h-[1px] bg-fuchsia-500/10 top-[60%]" style={{ transform: 'scaleX(0.95)' }} />
        <div className="absolute w-full h-[1px] bg-fuchsia-500/10 top-[80%]" style={{ transform: 'scaleX(0.8)' }} />
        
        {/* Longitude Arcs */}
        <div className="absolute w-[40%] h-full border-x border-fuchsia-500/10 rounded-[100%] opacity-50" />
        <div className="absolute w-[80%] h-full border-x border-fuchsia-500/10 rounded-[100%] opacity-30" />
        <div className="absolute w-[1px] h-full bg-fuchsia-500/10" />
        
        {/* Core Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Neural Network Nodes & Connections */}
      <div className="absolute inset-12 rounded-full z-10 pointer-events-none mix-blend-screen">
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {/* Connecting Lines */}
          {nodes.map((node, i) => {
            // Find 2 closest nodes to connect to
            const connections = [];
            for (let j = 0; j < nodes.length; j++) {
              if (i === j) continue;
              const nextNode = nodes[j];
              const distance = Math.hypot(nextNode.x - node.x, nextNode.y - node.y);
              if (distance < 25 && node.z > 0 && nextNode.z > 0) { // Only connect front-facing nodes
                connections.push(nextNode);
              }
              if (connections.length >= 2) break;
            }
            
            return connections.map((nextNode, idx) => (
              <motion.line
                key={`line-${i}-${idx}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke={node.isRed || nextNode.isRed ? "rgba(244, 63, 94, 0.2)" : "rgba(123, 47, 247, 0.15)"}
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.05, 0.4, 0.05] }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: node.delay
                }}
              />
            ));
          })}
        </svg>

        {/* The Nodes */}
        {nodes.map((node) => {
          if (node.z < -0.2) return null; // Hide nodes on the back of the sphere
          const opacityBase = node.z > 0.5 ? 1 : 0.4;
          return (
            <motion.div
              key={node.id}
              className={`absolute rounded-full ${node.size} ${
                node.isRed 
                  ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' 
                  : 'bg-fuchsia-100 shadow-[0_0_8px_rgba(123, 47, 247,0.5)]'
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) scale(${node.z > 0.5 ? 1 : 0.7})`
              }}
              animate={{
                opacity: [opacityBase * 0.2, opacityBase * 0.7, opacityBase * 0.2]
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay
              }}
            />
          );
        })}
      </div>

      {/* Scanning Radar Sweep */}
      <motion.div
        className="absolute inset-12 rounded-full overflow-hidden pointer-events-none z-20 mix-blend-screen opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-1/2 w-[50%] h-[50%] origin-top-left bg-[conic-gradient(from_0deg,rgba(0,212,255,0.15)_0deg,transparent_60deg)]" />
        <div className="absolute top-1/2 left-1/2 w-[50%] h-[1px] bg-fuchsia-400/50 origin-left" />
      </motion.div>
      
    </div>
  );
}

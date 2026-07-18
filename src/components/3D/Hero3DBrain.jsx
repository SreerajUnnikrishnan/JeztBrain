import React, { useRef, useMemo, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Traveling Synapse Particles ──────────────────────────────────────────── */
function NeuralFlow({ lines, particleCount = 60 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const data = [];
    const edgeCount = Math.floor(lines.length / 6);
    for (let i = 0; i < particleCount; i++) {
      data.push({
        edgeIndex: Math.floor(Math.random() * edgeCount) * 6,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.012,
      });
    }
    return data;
  }, [lines, particleCount]);

  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const edgeCount = Math.floor(lines.length / 6);
    particles.forEach((p, i) => {
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;
        p.edgeIndex = Math.floor(Math.random() * edgeCount) * 6;
      }
      const s = p.edgeIndex;
      const e = p.edgeIndex + 3;
      const t = p.progress;
      positions[i * 3]     = lines[s]     + (lines[e]     - lines[s])     * t;
      positions[i * 3 + 1] = lines[s + 1] + (lines[e + 1] - lines[s + 1]) * t;
      positions[i * 3 + 2] = lines[s + 2] + (lines[e + 2] - lines[s + 2]) * t;
    });
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.07}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ─── Outer Orbit Ring ──────────────────────────────────────────────────────── */
function OrbitRing({ radius = 3.5, speed = 0.3, color = '#D8B4FE', tilt = 0.4 }) {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 6, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Orbiting Dot on Ring ──────────────────────────────────────────────────── */
function OrbitDot({ radius = 3.5, speed = 0.4, offset = 0, color = '#a855f7', tilt = 0.4 }) {
  const dotRef = useRef();
  useFrame(({ clock }) => {
    if (!dotRef.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    dotRef.current.position.x = Math.cos(t) * radius;
    dotRef.current.position.z = Math.sin(t) * radius * Math.cos(tilt);
    dotRef.current.position.y = Math.sin(t) * radius * Math.sin(tilt);
  });
  return (
    <mesh ref={dotRef}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* ─── Brain Network ─────────────────────────────────────────────────────────── */
function BrainNetwork({ nodeCount = 700, hovered }) {
  const groupRef  = useRef();
  const linesRef  = useRef();
  const coreRef   = useRef();
  const coreRef2  = useRef();
  const { pointer } = useThree();

  const [positions, lines] = useMemo(() => {
    const pos = [];
    for (let i = 0; i < nodeCount; i++) {
      const hemi = Math.random() > 0.5 ? 1 : -1;
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi   = Math.acos(2 * v - 1);
      const r     = 2.0 + Math.random() * 0.45;
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);
      x *= 0.65; y *= 0.82; z *= 1.2;
      x += hemi * 0.32;
      const fold = Math.sin(x * 4) * Math.cos(y * 4) * Math.sin(z * 4) * 0.18;
      x += fold * (x / r); y += fold * (y / r); z += fold * (z / r);
      pos.push(x, y, z);
    }

    const linePts = [];
    const threshold = 0.85;
    for (let i = 0; i < nodeCount; i++) {
      let conn = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        if (conn > 5) break;
        const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < threshold) {
          linePts.push(pos[i*3], pos[i*3+1], pos[i*3+2], pos[j*3], pos[j*3+1], pos[j*3+2]);
          conn++;
        }
      }
    }
    return [new Float32Array(pos), new Float32Array(linePts)];
  }, [nodeCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow auto-rotation + mouse parallax
      groupRef.current.rotation.y = t * 0.1 + pointer.x * 0.25;
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.12 - pointer.y * 0.2;
      const pulse = 1 + Math.sin(t * 2.5) * 0.012;
      groupRef.current.scale.setScalar(pulse);
    }
    if (linesRef.current) {
      const targetOpacity = hovered ? 0.22 : 0.1;
      linesRef.current.material.opacity += (targetOpacity - linesRef.current.material.opacity) * 0.05;
    }
    if (coreRef.current) {
      const targetGlow = hovered ? 0.5 : 0.18;
      coreRef.current.material.opacity += (targetGlow - coreRef.current.material.opacity) * 0.05;
      coreRef.current.scale.setScalar(0.85 + Math.sin(t * 3.5) * 0.1);
    }
    if (coreRef2.current) {
      const targetGlow2 = hovered ? 0.35 : 0.1;
      coreRef2.current.material.opacity += (targetGlow2 - coreRef2.current.material.opacity) * 0.04;
      coreRef2.current.scale.setScalar(1.1 + Math.sin(t * 2.8 + 1) * 0.12);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Purple inner core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Cyan mid core */}
      <mesh ref={coreRef2}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#D8B4FE" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Neural nodes */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={hovered ? '#60efff' : '#D8B4FE'}
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Network edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#D8B4FE" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      {/* Traveling synapse particles */}
      <NeuralFlow lines={lines} particleCount={70} />

      {/* Orbit rings */}
      <OrbitRing radius={3.4} speed={0.25} color="#D8B4FE" tilt={0.5} />
      <OrbitRing radius={3.0} speed={-0.18} color="#a855f7" tilt={-0.3} />
      <OrbitDot  radius={3.4} speed={0.5}  offset={0}    color="#D8B4FE" tilt={0.5} />
      <OrbitDot  radius={3.4} speed={0.5}  offset={Math.PI} color="#a855f7" tilt={0.5} />
      <OrbitDot  radius={3.0} speed={-0.4} offset={1}    color="#60a5fa" tilt={-0.3} />
    </group>
  );
}

/* ─── Scene Lights ──────────────────────────────────────────────────────────── */
function SceneLights({ hovered }) {
  const ptRef1 = useRef();
  const ptRef2 = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ptRef1.current) ptRef1.current.intensity = (hovered ? 3.5 : 2) + Math.sin(t * 3) * 0.4;
    if (ptRef2.current) ptRef2.current.intensity = (hovered ? 2.5 : 1.5) + Math.cos(t * 2.5) * 0.3;
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight ref={ptRef1} position={[0, 0, 4]} color="#D8B4FE" intensity={2} distance={20} />
      <pointLight ref={ptRef2} position={[-3, 2, -2]} color="#a855f7" intensity={1.5} distance={15} />
      <pointLight position={[3, -2, 2]} color="#7B2FF7" intensity={0.8} distance={12} />
    </>
  );
}

/* ─── Terminal Log Overlay ──────────────────────────────────────────────────── */
const MESSAGES = [
  { type: 'NET', text: 'MONITORING GLOBAL INFRASTRUCTURE...', color: 'text-purple-400' },
  { type: 'AI',  text: 'DEEP PACKET INSPECTION IN PROGRESS',  color: 'text-purple-400' },
  { type: 'SEC', text: 'ENCRYPTED CHANNEL ESTABLISHED',       color: 'text-emerald-400' },
  { type: 'SYS', text: 'HEURISTIC ANALYSIS: 0 ANOMALIES',     color: 'text-fuchsia-400' },
  { type: 'LOG', text: 'ACCESS ATTEMPT BLOCKED — NODE_07',    color: 'text-rose-400' },
  { type: 'AI',  text: 'NEURAL THREAT MODEL UPDATED',         color: 'text-purple-400' },
  { type: 'SEC', text: 'ZERO-DAY SIGNATURE IDENTIFIED',       color: 'text-yellow-400' },
];

function TerminalOverlay() {
  const [logs, setLogs] = useState([
    { type: 'SYS', text: 'NEURAL NETWORK ONLINE',     color: 'text-fuchsia-400' },
    { type: 'AI',  text: 'THREAT PATTERNS ANALYZED',  color: 'text-purple-400' },
    { type: 'SEC', text: 'DEFENSE PROTOCOL ACTIVE',   color: 'text-emerald-400' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [MESSAGES[Math.floor(Math.random() * MESSAGES.length)], ...prev.slice(0, 2)]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center sm:justify-end sm:right-0 sm:bottom-6 pointer-events-none z-20 px-4">
      <div className="bg-[#030712]/85 border border-fuchsia-500/20 backdrop-blur-xl p-4 rounded-2xl font-mono text-xs shadow-[0_0_30px_rgba(216, 180, 254,0.08)] border-l-2 border-l-fuchsia-500 w-full max-w-[280px]">
        <div className="flex items-center gap-2 mb-2.5 border-b border-white/10 pb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          <span className="uppercase tracking-[0.15em] font-bold text-fuchsia-400 text-[9px]">NEURAL_FEED.LOG</span>
        </div>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 text-[10px] animate-fade-in">
              <span className={`font-bold min-w-[30px] ${log.color}`}>[{log.type}]</span>
              <span className="text-slate-300 truncate">{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Exported Component ───────────────────────────────────────────────── */
export default function Hero3DBrain() {
  const [hovered, setHovered] = useState(false);

  const handleEnter = useCallback(() => setHovered(true),  []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <div
      className="w-full h-full relative"
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {/* Ambient glow behind canvas */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: hovered
            ? 'radial-gradient(circle at 50% 50%, rgba(216, 180, 254,0.18) 0%, rgba(168,85,247,0.12) 40%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(216, 180, 254,0.10) 0%, rgba(168,85,247,0.07) 40%, transparent 70%)',
        }}
      />

      {/* 3D Canvas — transparent background, blends into dark hero */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <SceneLights hovered={hovered} />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
            <BrainNetwork nodeCount={700} hovered={hovered} />
          </Float>
        </Suspense>
      </Canvas>

      {/* Terminal log overlay */}
      <TerminalOverlay />
    </div>
  );
}


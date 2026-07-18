import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Neural Synapse Flow (Traveling Particles) ────────────────────────── */
function NeuralFlow({ lines, particleCount = 80 }) {
  const meshRef = useRef();
  
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      const edgeIndex = Math.floor(Math.random() * (lines.length / 6)) * 6;
      data.push({
        edgeIndex,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.006
      });
    }
    return data;
  }, [lines, particleCount]);

  const [positions] = useState(() => new Float32Array(particleCount * 3));

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    
    particles.forEach((p, i) => {
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;
        p.edgeIndex = Math.floor(Math.random() * (lines.length / 6)) * 6;
      }

      const i1 = p.edgeIndex;
      const i2 = p.edgeIndex + 3;

      positions[i * 3] = lines[i1] + (lines[i2] - lines[i1]) * p.progress;
      positions[i * 3 + 1] = lines[i1 + 1] + (lines[i2 + 1] - lines[i1 + 1]) * p.progress;
      positions[i * 3 + 2] = lines[i1 + 2] + (lines[i2 + 2] - lines[i1 + 2]) * p.progress;
    });

    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
}

/* ─── 3D Digital Brain Network ─────────────────────────────────────────────── */
function BrainNetwork({ nodeCount = 1000 }) {
  const groupRef = useRef();
  const linesRef = useRef();
  const dataPointsRef = useRef();
  const coreRef = useRef();
  
  const [positions, lines, dataPositions] = useMemo(() => {
    const pos = [];
    const linePts = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const isLeft = Math.random() > 0.5;
      const hemisphere = isLeft ? -1 : 1;
      
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const r = 2.4 + Math.random() * 0.4;
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);
      
      x *= 0.55; 
      y *= 0.75; 
      z *= 1.15; 
      
      const splitWidth = 0.25;
      x += hemisphere * splitWidth;
      
      const folds = Math.sin(x * 3.5) * Math.cos(y * 3.5) * Math.sin(z * 3.5) * 0.15;
      x += folds * (x / r);
      y += folds * (y / r);
      z += folds * (z / r);

      pos.push(x, y, z);
    }
    
    const threshold = 0.75;
    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        if (connections > 4) break; 
        
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < threshold) {
          linePts.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          linePts.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          connections++;
        }
      }
    }

    const dataPos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      dataPos[i * 3] = (Math.random() - 0.5) * 8;
      dataPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dataPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    
    return [new Float32Array(pos), new Float32Array(linePts), dataPos];
  }, [nodeCount]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12 + (pointer.x * 0.25);
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08 + (-pointer.y * 0.2);
      const pulse = 1 + Math.sin(t * 1.5) * 0.015;
      groupRef.current.scale.setScalar(pulse);
    }
    
    if (linesRef.current) {
       linesRef.current.material.opacity = 0.04 + Math.sin(t * 1.2) * 0.02;
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(1.3 + Math.sin(t * 2.5) * 0.1);
      coreRef.current.material.opacity = 0.08 + Math.sin(t * 2.5) * 0.04;
    }

    if (dataPointsRef.current) {
      const positions = dataPointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(t * 0.4 + i) * 0.002;
      }
      dataPointsRef.current.geometry.attributes.position.needsUpdate = true;
      dataPointsRef.current.material.opacity = 0.1 + Math.sin(t * 1.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core Volumetric Glow */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color="#D8B4FE" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Network Nodes */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Network Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.06} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </lineSegments>

      {/* Flowing Synapse Particles */}
      <NeuralFlow lines={lines} />

      {/* Atmospheric Particles (Purple & Cyan) */}
      <Points ref={dataPointsRef} positions={dataPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a855f7" 
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function AIBrainHero() {
  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-auto">
      {/* Interactive Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123, 47, 247,0.1)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
            <BrainNetwork nodeCount={1200} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}


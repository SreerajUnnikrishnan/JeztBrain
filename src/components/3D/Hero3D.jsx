/**
 * Hero3D.jsx
 * High-performance 3D AI Brain + Neural Network visualization
 * for the JeztBrain hero section.
 *
 * Architecture:
 *  - <Canvas> : react-three-fiber renderer
 *  - <AIBrain> : morphing sphere with MeshDistortMaterial (the "brain")
 *  - <NeuralNetwork> : particle cloud + connecting lines
 *  - <StarField> : deep-space particle background
 *
 * Performance targets: 60fps on mid-range GPUs, graceful CSS fallback on low-end.
 */

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── AI Brain ─────────────────────────────────────────────────────────────── */
function AIBrain() {
  const matRef = useRef();

  // Slowly breathe the distortion to simulate "thinking"
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.distort = 0.35 + Math.sin(t * 0.8) * 0.1;
    }
  });

  return (
    <Sphere args={[1.6, 96, 96]}>
      <MeshDistortMaterial
        ref={matRef}
        color="#0a0b1e"        // deep navy
        distort={0.4}
        speed={2.5}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.55}
        emissive="#7c3aed"     // vibrant purple
        emissiveIntensity={0.8}
      />
    </Sphere>
  );
}

/* ─── Neural Network Nodes + Edges ─────────────────────────────────────────── */
function NeuralNetwork({ nodeCount = 400 }) {
  // Generate stable random node positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    return arr;
  }, [nodeCount]);

  // Build edge geometry: connect nodes closer than threshold
  const edgePositions = useMemo(() => {
    const pts = [];
    const threshold = 1.6; // Reduced threshold due to higher density
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3]     - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
          pts.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          pts.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    return new Float32Array(pts);
  }, [positions, nodeCount]);

  const groupRef = useRef();

  // Slow rotation of the entire network
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f2ff"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Edges */}
      {edgePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={edgePositions}
              count={edgePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </group>
  );
}

/* ─── Deep-Space Star Field ─────────────────────────────────────────────────── */
function StarField({ count = 800 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e2e8f0"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Root Export ────────────────────────────────────────────────────────────── */
export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}   // cap pixel ratio for performance
    >
      {/* Lighting rig */}
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]}   intensity={1.5} color="#00f2ff" />
      <pointLight position={[-8, -6, -8]} intensity={1.2} color="#7c3aed" />

      {/* Star background */}
      <StarField count={800} />

      {/* Central brain + neural cloud (floats gently) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
        <AIBrain />
      </Float>

      <NeuralNetwork nodeCount={400} />
    </Canvas>
  );
}


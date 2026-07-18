import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

function Orb() {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.distort = 0.4 + Math.sin(time * 0.5) * 0.1;
    mesh.current.speed = 2 + Math.sin(time) * 0.5;
  });

  return (
    <Sphere args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        ref={mesh}
        color="#06b6d4"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
        metalness={1}
        emissive="#06b6d4"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export default function AIOrb3D() {
  return (
    <div className="w-16 h-16 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} alpha={true}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
          <Orb />
        </Float>
      </Canvas>
    </div>
  );
}


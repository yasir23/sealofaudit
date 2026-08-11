"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ShieldCore() {
  const mesh = useRef(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.4;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} scale={[1.4, 1.4, 1.4]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRings() {
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  useFrame((state) => {
    if (ring1.current) ring1.current.rotation.z = state.clock.elapsedTime * 0.25;
    if (ring2.current) ring2.current.rotation.z = -state.clock.elapsedTime * 0.35;
  });
  return (
    <group>
      <mesh ref={ring1} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[1.5, 0.8, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#1a56db" emissive="#1e40af" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#10b981" />
      <Stars radius={50} depth={30} count={1500} factor={3} saturation={0} fade speed={0.6} />
      <ShieldCore />
      <OrbitingRings />
    </Canvas>
  );
}

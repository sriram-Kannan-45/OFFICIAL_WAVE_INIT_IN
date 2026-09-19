import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WaveCore({ scrollRef, mouseRef, tier = 'high', color = '#16a34a' }) {
  const meshRef = useRef();
  const wireRef = useRef();
  const innerRef = useRef();

  // Crisp faceted crystal geometry
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.22, tier === 'low' ? 0 : 1), [tier]);
  const innerGeo = useMemo(() => new THREE.OctahedronGeometry(0.65, 0), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const scroll = scrollRef?.current?.progress ?? 0;

    // Smooth crystal rotation
    meshRef.current.rotation.y += dt * (0.2 + scroll * 0.4);
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15 + scroll * 0.2;

    const scale = 1 + Math.sin(t * 1.5) * 0.03 + scroll * 0.1;
    meshRef.current.scale.set(scale, scale, scale);

    if (wireRef.current) {
      wireRef.current.rotation.y = meshRef.current.rotation.y;
      wireRef.current.rotation.x = meshRef.current.rotation.x;
      wireRef.current.rotation.z += dt * 0.1;
      wireRef.current.scale.setScalar(scale * 1.02);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= dt * 0.4;
      innerRef.current.rotation.z += dt * 0.25;
      const s = 1 + Math.sin(t * 2.5) * 0.08;
      innerRef.current.scale.set(s, s, s);
    }

    const mouse = mouseRef?.current;
    if (mouse) {
      meshRef.current.rotation.y += (mouse.x || 0) * 0.015;
      meshRef.current.rotation.x += (mouse.y || 0) * 0.015;
    }
  });

  return (
    <group>
      {/* Refractive Emerald Crystal Core */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          emissive="#15803d"
          emissiveIntensity={0.2}
          roughness={0.06}
          metalness={0.12}
          transmission={0.86}
          thickness={1.5}
          ior={1.55}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Outer Facet Wireframe */}
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial
          color="#4ade80"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner Glowing Quantum Seed */}
      <mesh ref={innerRef} geometry={innerGeo}>
        <meshBasicMaterial
          color="#22c55e"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

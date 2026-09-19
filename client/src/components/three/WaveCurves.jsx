import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WaveCurves({ scrollRef, tier = 'high', color = '#16a34a' }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  // 3 Sleek High-Precision Orbital Rings (Apple / Stripe studio aesthetic)
  const ringGeo1 = useMemo(() => new THREE.TorusGeometry(1.85, 0.012, 16, tier === 'low' ? 32 : 80), [tier]);
  const ringGeo2 = useMemo(() => new THREE.TorusGeometry(2.25, 0.01, 16, tier === 'low' ? 32 : 80), [tier]);
  const ringGeo3 = useMemo(() => new THREE.TorusGeometry(2.65, 0.008, 16, tier === 'low' ? 32 : 80), [tier]);

  // Satellite node geometry
  const beadGeo = useMemo(() => new THREE.SphereGeometry(0.04, 12, 12), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const scroll = scrollRef?.current?.progress ?? 0;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += dt * (0.2 + scroll * 0.3);
      ring1Ref.current.rotation.x = 1.0 + Math.sin(t * 0.3) * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= dt * (0.16 + scroll * 0.25);
      ring2Ref.current.rotation.y = 0.6 + Math.cos(t * 0.25) * 0.12;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += dt * (0.12 + scroll * 0.2);
      ring3Ref.current.rotation.y += dt * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbital Ring 1 with satellite bead */}
      <group ref={ring1Ref} rotation={[1.0, 0.2, 0]}>
        <mesh geometry={ringGeo1}>
          <meshBasicMaterial color={color} transparent opacity={0.35} />
        </mesh>
        <mesh geometry={beadGeo} position={[1.85, 0, 0]}>
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* Orbital Ring 2 with satellite bead */}
      <group ref={ring2Ref} rotation={[-0.8, 0.6, 0.3]}>
        <mesh geometry={ringGeo2}>
          <meshBasicMaterial color="#15803d" transparent opacity={0.28} />
        </mesh>
        <mesh geometry={beadGeo} position={[0, 2.25, 0]}>
          <meshBasicMaterial color="#4ade80" />
        </mesh>
      </group>

      {/* Orbital Ring 3 */}
      {tier !== 'low' && (
        <group ref={ring3Ref} rotation={[0.4, -0.9, 0.8]}>
          <mesh geometry={ringGeo3}>
            <meshBasicMaterial color="#16a34a" transparent opacity={0.2} />
          </mesh>
          <mesh geometry={beadGeo} position={[-2.65, 0, 0]}>
            <meshBasicMaterial color="#16a34a" />
          </mesh>
        </group>
      )}
    </group>
  );
}

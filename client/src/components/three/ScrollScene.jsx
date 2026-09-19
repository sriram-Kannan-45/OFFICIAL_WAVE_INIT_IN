import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import WaveCore from './WaveCore';
import ParticleField from './ParticleField';
import WaveCurves from './WaveCurves';
import NetworkNodes from './NetworkNodes';
import SceneCamera from './SceneCamera';
import { usePerformanceDetect, detectWebGL } from './PerformanceDetect';

export default function ScrollScene({ scrollRef, mouseRef }) {
  const { tier, prefersReducedMotion } = usePerformanceDetect();
  const [webglReady] = useState(detectWebGL);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 960;

  if (!webglReady || prefersReducedMotion) {
    return null;
  }

  // Offset 3D objects to the right on desktop so they sit opposite the story card
  const stageX = isMobile ? 0 : 1.5;
  const stageY = isMobile ? -1.2 : 0;

  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 46 }}
      dpr={[1, tier === 'high' ? 1.5 : 1]}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 4]} intensity={0.9} />
      <pointLight position={[-3, 2, 4]} intensity={2.0} color="#16a34a" />
      <pointLight position={[3, -2, 3]} intensity={1.5} color="#22c55e" />

      <SceneCamera scrollRef={scrollRef} mouseRef={mouseRef} />

      <group position={[stageX, stageY, 0]}>
        {/* Soft floor contact shadow */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.4}
          scale={6.5}
          blur={2.2}
          far={3.8}
          color="#15803d"
        />

        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.35}>
          <WaveCore scrollRef={scrollRef} mouseRef={mouseRef} tier={tier} />
          <WaveCurves scrollRef={scrollRef} tier={tier} />
          <NetworkNodes scrollRef={scrollRef} mouseRef={mouseRef} tier={tier} />
        </Float>
      </group>

      <ParticleField scrollRef={scrollRef} mouseRef={mouseRef} tier={tier} />
    </Canvas>
  );
}

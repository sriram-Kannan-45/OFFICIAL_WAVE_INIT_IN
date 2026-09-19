import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function ParticleField({
  scrollRef,
  tier = 'high',
  count: propCount,
  color1 = 0x16a34a,
  color2 = 0x15803d,
}) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const count = propCount || (tier === 'low' ? 80 : tier === 'medium' ? 180 : 340);
  const maxLines = tier === 'low' ? 40 : tier === 'medium' ? 90 : 160;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i * 1.341 + 0.1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 2.718 + 0.2) - 1);
      const r = 3 + seededRandom(i * 3.141 + 0.3) * 5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = seededRandom(i * 4.414 + 0.4) * Math.PI * 2;
      sizes[i] = 0.03 + seededRandom(i * 5.828 + 0.5) * 0.05;

      const t = seededRandom(i * 6.18 + 0.6);
      const c = c1.clone().lerp(c2, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geo;
  }, [count, color1, color2]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(maxLines * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [maxLines]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const scroll = scrollRef?.current?.progress ?? 0;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const positions = posAttr.array;
    const phases = pointsRef.current.geometry.attributes.phase.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const phase = phases[i];

      positions[idx] *= 1 + dt * 0.01 * Math.sin(phase + t * 0.2);
      positions[idx + 1] *= 1 + dt * 0.01 * Math.cos(phase * 1.3 + t * 0.2);
      positions[idx + 2] *= 1 + dt * 0.01 * Math.sin(phase * 0.7 + scroll);
    }
    posAttr.needsUpdate = true;

    if (linesRef.current && tier !== 'low') {
      const linePos = linesRef.current.geometry.attributes.position.array;
      const drawCount = Math.min(
        tier === 'medium' ? 60 : 120,
        Math.floor(count * 0.4)
      );
      let lineIdx = 0;
      const maxDist = 2.4;
      for (let i = 0; i < drawCount && lineIdx < maxLines * 6; i++) {
        const j = Math.floor(seededRandom(i * 2 + t * 0.1) * count);
        const k = Math.floor(seededRandom(i * 3 + t * 0.1) * count);
        if (j === k) continue;
        const dx = positions[j * 3] - positions[k * 3];
        const dy = positions[j * 3 + 1] - positions[k * 3 + 1];
        const dz = positions[j * 3 + 2] - positions[k * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          linePos[lineIdx] = positions[j * 3];
          linePos[lineIdx + 1] = positions[j * 3 + 1];
          linePos[lineIdx + 2] = positions[j * 3 + 2];
          linePos[lineIdx + 3] = positions[k * 3];
          linePos[lineIdx + 4] = positions[k * 3 + 1];
          linePos[lineIdx + 5] = positions[k * 3 + 2];
          lineIdx += 6;
        }
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry attach="geometry" {...geometry} />
        <pointsMaterial
          size={0.045}
          transparent
          opacity={0.85}
          sizeAttenuation
          vertexColors
          depthWrite={false}
        />
      </points>
      {tier !== 'low' && (
        <lineSegments ref={linesRef}>
          <bufferGeometry attach="geometry" {...lineGeo} />
          <lineBasicMaterial color={0x16a34a} transparent opacity={0.16} />
        </lineSegments>
      )}
    </group>
  );
}

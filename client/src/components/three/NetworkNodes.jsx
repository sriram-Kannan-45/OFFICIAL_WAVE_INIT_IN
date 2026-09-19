import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function NetworkNodes({ scrollRef, mouseRef, tier = 'high' }) {
  const groupRef = useRef();
  const lineRef = useRef();

  const nodeCount = tier === 'low' ? 6 : tier === 'medium' ? 12 : 20;
  const lineMaxCount = tier === 'low' ? 15 : tier === 'medium' ? 40 : 80;

  const nodesData = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = seededRandom(i * 1.5 + 0.1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 2.3 + 0.2) - 1);
      const r = 1.8 + seededRandom(i * 3.7 + 0.3) * 1.5;
      nodes.push({
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi) * 0.5
        ),
        phase: seededRandom(i * 4.9 + 0.4) * Math.PI * 2,
        speed: 0.5 + seededRandom(i * 5.2 + 0.5) * 1,
      });
    }
    return nodes;
  }, [nodeCount]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(lineMaxCount * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [lineMaxCount]);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.045, 8, 8), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef?.current?.progress ?? 0;

    const mouse = mouseRef?.current;

    nodesData.forEach((node, idx) => {
      const mesh = groupRef.current.children.find((c) => c.userData.idx === idx);
      if (!mesh) return;

      const pulse = Math.sin(t * node.speed + node.phase) * 0.1;
      const scale = 1 + pulse + scroll * 0.3;

      const basePos = node.position;
      const floatX = Math.sin(t * 0.3 + node.phase) * 0.2;
      const floatY = Math.cos(t * 0.4 + node.phase * 1.3) * 0.15;
      const floatZ = Math.sin(t * 0.35 + node.phase * 0.8) * 0.1;

      mesh.position.x = basePos.x + floatX;
      mesh.position.y = basePos.y + floatY;
      mesh.position.z = basePos.z + floatZ;
      mesh.scale.setScalar(scale);

      if (mouse) {
        mesh.position.x += (mouse.x || 0) * 0.1;
        mesh.position.y += (mouse.y || 0) * 0.1;
      }
    });

    if (lineRef.current) {
      const linePositions = lineRef.current.geometry.attributes.position.array;
      let lineIndex = 0;
      const maxDistance = 1.8;

      for (let i = 0; i < nodesData.length && lineIndex < lineMaxCount * 6; i++) {
        for (let j = i + 1; j < nodesData.length && lineIndex < lineMaxCount * 6; j++) {
          const meshA = groupRef.current.children.find((c) => c.userData.idx === i);
          const meshB = groupRef.current.children.find((c) => c.userData.idx === j);
          if (!meshA || !meshB) continue;

          const dist = meshA.position.distanceTo(meshB.position);
          if (dist < maxDistance) {
            linePositions[lineIndex] = meshA.position.x;
            linePositions[lineIndex + 1] = meshA.position.y;
            linePositions[lineIndex + 2] = meshA.position.z;
            linePositions[lineIndex + 3] = meshB.position.x;
            linePositions[lineIndex + 4] = meshB.position.y;
            linePositions[lineIndex + 5] = meshB.position.z;
            lineIndex += 6;
          }
        }
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
      lineRef.current.geometry.setDrawRange(0, lineIndex / 3);
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {nodesData.map((_, idx) => (
          <mesh key={idx} geometry={sphereGeo} userData={{ idx }}>
            <meshBasicMaterial color={0x16a34a} />
          </mesh>
        ))}
      </group>
      <lineSegments ref={lineRef}>
        <bufferGeometry attach="geometry" {...lineGeo} />
        <lineBasicMaterial color={0x16a34a} transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneCamera({ scrollRef, mouseRef, config = {} }) {
  const {
    initialDistance = 8,
    minDistance = 4,
    maxDistance = 12,
    mouseInfluence = 0.3,
    damping = 0.05,
  } = config;

  const cameraRef = useRef();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentDistance = useRef(initialDistance);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    if (mouseRef) {
      mouseRef.current = { x: mouseX, y: mouseY };
    }
  }, [mouseRef]);

  useEffect(() => {
    if (!cameraRef.current) return;
    let raf;
    const onMouse = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    raf = requestAnimationFrame(() => {});
    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    const dt = Math.min(delta, 0.05);

    const scroll = scrollRef?.current?.progress ?? 0;

    const targetX = mouseX.current * mouseInfluence;
    const targetY = mouseY.current * mouseInfluence;

    const distance = initialDistance - scroll * (initialDistance - minDistance);
    currentDistance.current += (distance - currentDistance.current) * damping;

    const camX = targetX * 2;
    const camY = -targetY * 1.5 + Math.sin(scroll * Math.PI * 2) * 0.5;
    const camZ = currentDistance.current;

    const targetPos = new THREE.Vector3(camX, camY, camZ);
    cameraRef.current.position.lerp(targetPos, damping * 3);

    const lookTarget = new THREE.Vector3(
      targetX * 0.3,
      targetY * 0.2 + Math.sin(scroll * Math.PI) * 0.1,
      0
    );
    targetRef.current.lerp(lookTarget, damping);
    cameraRef.current.lookAt(targetRef.current);
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={[0, 0, initialDistance]}
      fov={45}
      near={0.1}
      far={100}
    />
  );
}

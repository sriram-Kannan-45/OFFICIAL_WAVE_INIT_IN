import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Float, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const CAPS = [
  'AI Automation',
  'Intelligent Agents',
  'Data Pipelines',
  'Recommendation Engines',
  'Generative AI',
  'Smart Workflows',
  'Predictive Analytics',
  'Neural Embeddings',
]

function CoreOrb({ isMobile, reducedMotion }) {
  const meshRef = useRef()
  const wireRef = useRef()

  const sphereGeo = useMemo(() => new THREE.IcosahedronGeometry(isMobile ? 0.95 : 1.15, 2), [isMobile])

  useFrame((_, delta) => {
    if (reducedMotion) return
    const dt = Math.min(delta, 0.05)
    if (meshRef.current) {
      meshRef.current.rotation.y += dt * 0.22
      meshRef.current.rotation.x += dt * 0.1
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= dt * 0.15
      wireRef.current.rotation.z += dt * 0.08
    }
  })

  return (
    <group>
      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.42}
        scale={6.5}
        blur={2.4}
        far={3.8}
        color="#15803d"
      />

      {/* Central Refractive Emerald Core */}
      <mesh ref={meshRef} geometry={sphereGeo}>
        <meshPhysicalMaterial
          color="#16a34a"
          emissive="#15803d"
          emissiveIntensity={0.25}
          roughness={0.06}
          metalness={0.12}
          transmission={0.86}
          thickness={1.5}
          ior={1.54}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Outer subtle emerald wireframe lattice */}
      <mesh ref={wireRef} geometry={sphereGeo} scale={1.08}>
        <meshBasicMaterial
          color="#4ade80"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Central AI CORE Badge */}
      <Html center distanceFactor={isMobile ? 5.6 : 5.0} zIndexRange={[100, 10]}>
        <div className="wi-ai-core--3d" aria-hidden="true">
          AI CORE
        </div>
      </Html>
    </group>
  )
}

function OrbitingCapabilities({ isMobile, reducedMotion }) {
  const groupRef = useRef()
  const orbitRadius = isMobile ? 2.3 : 2.9

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return
    const dt = Math.min(delta, 0.05)
    groupRef.current.rotation.y += dt * 0.15
  })

  const ringGeo = useMemo(() => {
    return new THREE.TorusGeometry(orbitRadius, 0.01, 16, 80)
  }, [orbitRadius])

  const ringGeoSecondary = useMemo(() => {
    return new THREE.TorusGeometry(orbitRadius * 1.12, 0.007, 16, 80)
  }, [orbitRadius])

  return (
    <group ref={groupRef} rotation={[0.28, 0, 0.12]}>
      {/* 3D orbital emerald guide rings */}
      <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          color="#16a34a"
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh geometry={ringGeoSecondary} rotation={[Math.PI / 2 + 0.18, 0, 0]}>
        <meshBasicMaterial
          color="#15803d"
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* CAPS capability labels rendered in 3D orbit with tuned scaling */}
      {CAPS.map((cap, i) => {
        const total = CAPS.length
        const angle = (i / total) * Math.PI * 2
        const x = Math.cos(angle) * orbitRadius
        const z = Math.sin(angle) * orbitRadius
        const y = Math.sin(angle * 2) * (isMobile ? 0.28 : 0.45)

        return (
          <group key={cap} position={[x, y, z]}>
            <Float speed={reducedMotion ? 0 : 1.6} rotationIntensity={0.1} floatIntensity={0.2}>
              <Html center distanceFactor={isMobile ? 5.8 : 5.2} zIndexRange={[100, 0]}>
                <span className="wi-ai-cap--3d">
                  <span
                    style={{
                      display: 'inline-block',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#16a34a',
                      boxShadow: '0 0 6px #22c55e',
                    }}
                  />
                  {cap}
                </span>
              </Html>
            </Float>
          </group>
        )
      })}
    </group>
  )
}

export default function AICore3DScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 720
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="wi-ai-3d-container" style={{ width: '100%', height: '34rem', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.5 : 5.6], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[0, 2, 4]} intensity={2.5} color="#16a34a" distance={12} />
        <pointLight position={[0, -2, -2]} intensity={1.2} color="#22c55e" distance={8} />

        <CoreOrb isMobile={isMobile} reducedMotion={reducedMotion} />
        <OrbitingCapabilities isMobile={isMobile} reducedMotion={reducedMotion} />

        {!reducedMotion && (
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.45}
              luminanceSmoothing={0.9}
              intensity={0.6}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}

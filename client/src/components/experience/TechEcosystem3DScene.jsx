import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* Real stack from the Wave Init README / Home ticker */
const TECH = [
  { name: 'React', hot: true, category: 'frontend' },
  { name: 'Node.js', hot: true, category: 'backend' },
  { name: 'Python', hot: true, category: 'ai' },
  { name: 'FastAPI', hot: true, category: 'backend' },
  { name: 'MongoDB', hot: true, category: 'database' },
  { name: 'PostgreSQL', hot: false, category: 'database' },
  { name: 'TypeScript', hot: true, category: 'language' },
  { name: 'Next.js', hot: false, category: 'frontend' },
  { name: 'OpenAI', hot: true, category: 'ai' },
  { name: 'TensorFlow', hot: false, category: 'ai' },
  { name: 'Tailwind CSS', hot: false, category: 'frontend' },
  { name: 'Socket.IO', hot: false, category: 'backend' },
  { name: 'Docker', hot: false, category: 'devops' },
  { name: 'Git', hot: false, category: 'devops' },
  { name: 'Cloud Architecture', hot: true, category: 'cloud' },
]

function TechLattice({ isMobile, reducedMotion }) {
  const groupRef = useRef()

  const { nodePositions, lineGeometry } = useMemo(() => {
    const positions = []
    const radius = isMobile ? 2.3 : 3.0

    TECH.forEach((_, i) => {
      const ring = Math.floor(i / 5) // 0, 1, 2
      const idxInRing = i % 5
      const angle = (idxInRing / 5) * Math.PI * 2 + ring * 0.45

      const y = (ring - 1) * (isMobile ? 0.85 : 1.05)
      const r = ring === 1 ? radius : radius * 0.85
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r

      positions.push(new THREE.Vector3(x, y, z))
    })

    const linePoints = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j])
        if (dist < (isMobile ? 2.1 : 2.5)) {
          linePoints.push(positions[i].x, positions[i].y, positions[i].z)
          linePoints.push(positions[j].x, positions[j].y, positions[j].z)
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(linePoints), 3)
    )

    return { nodePositions: positions, lineGeometry: lineGeo }
  }, [isMobile])

  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(isMobile ? 0.75 : 0.95, 1), [isMobile])

  return (
    <group ref={groupRef}>
      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.42}
        scale={6.8}
        blur={2.4}
        far={3.8}
        color="#15803d"
      />

      {/* Central faceted crystal anchor */}
      <mesh geometry={coreGeo}>
        <meshPhysicalMaterial
          color="#16a34a"
          emissive="#15803d"
          emissiveIntensity={0.2}
          roughness={0.08}
          metalness={0.1}
          transmission={0.85}
          thickness={1.4}
          ior={1.52}
          clearcoat={1.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Core wireframe */}
      <mesh geometry={coreGeo} scale={1.01}>
        <meshBasicMaterial
          color="#4ade80"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Constellation lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#16a34a"
          transparent
          opacity={0.2}
        />
      </lineSegments>

      {/* Tech Nodes in 3D */}
      {TECH.map((t, i) => {
        const pos = nodePositions[i]
        return (
          <group key={t.name} position={[pos.x, pos.y, pos.z]}>
            <Float
              speed={reducedMotion ? 0 : 1.4}
              rotationIntensity={0.1}
              floatIntensity={0.25}
            >
              <Html center distanceFactor={isMobile ? 6.2 : 5.8} zIndexRange={[100, 0]}>
                <span
                  className={`wi-tech-node--3d ${t.hot ? 'wi-hot' : ''}`}
                  style={{ userSelect: 'none', cursor: 'grab' }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: t.hot ? '#16a34a' : '#94a3b8',
                      boxShadow: t.hot ? '0 0 8px #22c55e' : 'none',
                    }}
                  />
                  {t.name}
                </span>
              </Html>
            </Float>
          </group>
        )
      })}
    </group>
  )
}

export default function TechEcosystem3DScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 720
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      className="wi-tech-3d-wrapper"
      style={{
        width: '100%',
        height: '34rem',
        position: 'relative',
        cursor: 'grab',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, isMobile ? 6.8 : 5.8], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[0, 3, 4]} intensity={2.2} color="#16a34a" distance={12} />
        <pointLight position={[0, -2, 2]} intensity={1.0} color="#22c55e" distance={8} />

        <TechLattice isMobile={isMobile} reducedMotion={reducedMotion} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.8}
          rotateSpeed={0.7}
          dampingFactor={0.06}
          enableDamping
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  )
}

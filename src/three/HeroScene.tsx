import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingHearts } from './FloatingHearts';
import { PetalRain } from './PetalRain';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

interface HeroSceneProps {
  mousePos: { x: number; y: number };
  gyro: { gamma: number; beta: number };
}

const SceneController: React.FC<HeroSceneProps & { reducedMotion: boolean }> = ({
  mousePos,
  gyro,
  reducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (reducedMotion || !groupRef.current) return;

    // Blend mouse parallax and gyro tilt
    const targetX = (mousePos.x * 0.4) + (gyro.gamma * 0.01);
    const targetY = (-mousePos.y * 0.3) + (-gyro.beta * 0.01);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.3, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY * 0.3, 0.05);
  });

  return (
    <group ref={groupRef}>
      <FloatingHearts count={24} reducedMotion={reducedMotion} />
      <PetalRain count={30} reducedMotion={reducedMotion} />
    </group>
  );
};

export const HeroScene: React.FC<HeroSceneProps> = ({ mousePos, gyro }) => {
  const reducedMotion = useReducedMotion();
  const { particleCountMultiplier } = useDevicePerformance();

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFF0F3" />
        <directionalLight position={[-5, -4, -3]} intensity={1.5} color="#FFA3B5" />
        <pointLight position={[0, 0, 2]} intensity={2.0} color="#FFCCD5" distance={10} />

        <Suspense fallback={null}>
          <SceneController
            mousePos={mousePos}
            gyro={gyro}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};


import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartInstance {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  rotationSpeed: [number, number, number];
  offset: number;
}

export const FloatingHearts: React.FC<{
  count?: number;
  reducedMotion?: boolean;
}> = ({ count = 28, reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 2D heart shape for 3D extrusion
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
    shape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 1.0);
    shape.bezierCurveTo(x + 0.65, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
    shape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  const heartMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E63B60'),
      emissive: new THREE.Color('#550A18'),
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });
  }, []);

  // Gold accent material for a few special hearts
  const goldMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E8B35A'),
      emissive: new THREE.Color('#3A2500'),
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 0.8,
    });
  }, []);

  const instances: HeartInstance[] = useMemo(() => {
    const list: HeartInstance[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.35 + Math.random() * 0.45,
        speed: 0.4 + Math.random() * 0.6,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.4,
        ],
        offset: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const data = instances[i];
      if (!data) return;

      // Gentle vertical bobbing & rotation
      child.position.y = data.position[1] + Math.sin(time * data.speed + data.offset) * 0.45;
      child.position.x = data.position[0] + Math.cos(time * 0.3 + data.offset) * 0.2;
      child.rotation.x += data.rotationSpeed[0] * delta;
      child.rotation.y += data.rotationSpeed[1] * delta;
      child.rotation.z += data.rotationSpeed[2] * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {instances.map((data, index) => (
        <mesh
          key={index}
          geometry={heartGeometry}
          material={index % 5 === 0 ? goldMaterial : heartMaterial}
          position={data.position}
          rotation={data.rotation}
          scale={data.scale}
        />
      ))}
    </group>
  );
};


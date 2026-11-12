import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalInstance {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  vel: THREE.Vector3;
  rotVel: THREE.Vector3;
  scale: number;
}

export const PetalRain: React.FC<{
  count?: number;
  reducedMotion?: boolean;
}> = ({ count = 35, reducedMotion = false }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Curved organic petal geometry
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.35, 0.45, 4, 4);
    const pos = geom.attributes.position;
    // Curve the plane into a cupped petal shape
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + 0.175) / 0.35;
      const v = (pos.getY(i) + 0.225) / 0.45;
      const z = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * 0.12;
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const petalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E63B60'),
      roughness: 0.5,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const petals: PetalInstance[] = useMemo(() => {
    const arr: PetalInstance[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          Math.random() * 12 - 2,
          (Math.random() - 0.5) * 8
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          -(0.02 + Math.random() * 0.035),
          (Math.random() - 0.5) * 0.015
        ),
        rotVel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.03
        ),
        scale: 0.4 + Math.random() * 0.5,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const time = state.clock.getElapsedTime();

    petals.forEach((p, i) => {
      // Fall down and flutter with sine wave wind
      p.pos.y += p.vel.y;
      p.pos.x += Math.sin(time * 1.5 + i) * 0.015 + p.vel.x;
      p.pos.z += Math.cos(time * 1.2 + i) * 0.01 + p.vel.z;

      p.rot.x += p.rotVel.x;
      p.rot.y += p.rotVel.y;
      p.rot.z += p.rotVel.z;

      // Wrap around when falling past bottom
      if (p.pos.y < -6) {
        p.pos.y = 8;
        p.pos.x = (Math.random() - 0.5) * 16;
      }

      dummy.position.copy(p.pos);
      dummy.rotation.copy(p.rot);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, petalMaterial, count]}
    />
  );
};


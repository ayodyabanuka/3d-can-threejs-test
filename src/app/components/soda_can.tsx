'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface BeerCanProps {
  scrollY: number;
}

export default function BeerCanScene({ scrollY }: BeerCanProps) {
  return (
    <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <spotLight
        position={[-5, 5, 5]}
        intensity={2}
        angle={0.3}
        penumbra={1}
        castShadow
      />
      <Environment preset='city' />
      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />

      {/* Beer Can Component */}
      <BeerCan scrollY={scrollY} />
    </Canvas>
  );
}

function BeerCan({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF('/models/soda_can.glb');
  const texture = useTexture('/models/textures/soda_label.jpeg');
  const canRef = useRef<THREE.Object3D>(null);

  texture.flipY = false;

  // Apply texture
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.8,
        roughness: 0.3,
      });
      mesh.material.needsUpdate = true;
    }
  });

  // GSAP Animation for Movement and Rotation
  useEffect(() => {
    if (canRef.current) {
      gsap.to(canRef.current.position, {
        y: -scrollY * 0.005,
        x: -scrollY * 0.003, // Moves up/down
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(canRef.current.rotation, {
        y: scrollY * 0.005, // Rotates smoothly
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [scrollY]);

  return (
    <primitive ref={canRef} object={scene} scale={1.2} position={[0, 0, 0]} />
  );
}

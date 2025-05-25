import React, { useRef, useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/components/ThreeScene.scss';

interface AvatarProps {
  position: [number, number, number];
}

const Avatar: React.FC<AvatarProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#1E3A8A" 
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

const FloatingText: React.FC<{ text: string, position: [number, number, number] }> = ({ text, position }) => {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });
  
  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.5}
      color="#FFC107"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

const FloatingIcons: React.FC = () => {
  const iconsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group ref={iconsRef}>
      {[-3, -2, -1, 0, 1, 2, 3].map((x, i) => (
        <mesh key={i} position={[Math.sin(x * 0.5) * 4, Math.cos(x * 0.5) * 1.5, Math.sin(x * 0.5) * 4]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#FFC107" : "#10B981"} />
        </mesh>
      ))}
    </group>
  );
};

interface ThreeSceneProps {
  authorName: string;
  authorRole: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ authorName, authorRole }) => {
  return (
    <div className="three-scene">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[5, 10, 7.5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        
        <Avatar position={[0, 0, 0]} />
        <FloatingText text={authorName} position={[0, 2.5, 0]} />
        <FloatingText text={authorRole} position={[0, 1.8, 0]} />
        <FloatingIcons />
        
        {/* Reflective floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#94A3B8" 
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
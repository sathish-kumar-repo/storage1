import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  theme: 'light' | 'dark';
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameIdRef = useRef<number | null>(null);

  // Setup Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create shapes with glassmorphic materials
    const createShapes = () => {
      const shapes = [];
      const totalShapes = 12;
      
      const geometries = [
        new THREE.TorusGeometry(1, 0.3, 16, 50),
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0)
      ];

      const bgColor = theme === 'dark' ? 0x050816 : 0xf8fafc;
      scene.background = new THREE.Color(bgColor);
      
      for (let i = 0; i < totalShapes; i++) {
        const geometry = geometries[i % geometries.length];
        
        // Create glassmorphic material
        const material = new THREE.MeshPhysicalMaterial({
          color: i % 3 === 0 ? 0x0d9488 : i % 3 === 1 ? 0x8b5cf6 : 0xf59e0b,
          metalness: 0.2,
          roughness: 0.1,
          transmission: 0.9, // Transparency
          thickness: 0.5, // Glass thickness
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.0,
          opacity: 0.7,
          transparent: true,
        });

        const shape = new THREE.Mesh(geometry, material);
        
        // Random positions in 3D space
        shape.position.x = (Math.random() - 0.5) * 15;
        shape.position.y = (Math.random() - 0.5) * 15;
        shape.position.z = (Math.random() - 0.5) * 5;
        
        // Random rotation
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        
        // Random scale
        const scale = Math.random() * 0.6 + 0.1;
        shape.scale.set(scale, scale, scale);
        
        scene.add(shape);
        shapes.push(shape);
      }
      
      return shapes;
    };

    // Set up lighting
    const setupLights = () => {
      const ambientLight = new THREE.AmbientLight(
        theme === 'dark' ? 0x333333 : 0xffffff,
        0.7
      );
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0x0d9488, 2, 10);
      pointLight1.position.set(2, 2, 2);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 10);
      pointLight2.position.set(-2, -2, 2);
      scene.add(pointLight2);
    };

    setupLights();
    objectsRef.current = createShapes();

    // Update on mouse move
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      objectsRef.current.forEach((shape, i) => {
        // Rotate shapes
        shape.rotation.x += 0.003;
        shape.rotation.y += 0.002;
        
        // Move shapes slightly based on mouse position
        shape.position.x += (mouseRef.current.x * 0.02 - shape.position.x * 0.002);
        shape.position.y += (mouseRef.current.y * 0.02 - shape.position.y * 0.002);
      });
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation and add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    frameIdRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      objectsRef.current.forEach((shape) => {
        shape.geometry.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach(material => material.dispose());
        } else {
          shape.material.dispose();
        }
      });
    };
  }, [theme]);

  // Update scene on theme change
  useEffect(() => {
    if (!sceneRef.current) return;
    
    const bgColor = theme === 'dark' ? 0x050816 : 0xf8fafc;
    sceneRef.current.background = new THREE.Color(bgColor);
    
    // Update lights if needed
    sceneRef.current.children.forEach(child => {
      if (child instanceof THREE.AmbientLight) {
        child.color.set(theme === 'dark' ? 0x333333 : 0xffffff);
      }
    });
  }, [theme]);

  return <div ref={containerRef} className="canvas-container" />;
};

export default ThreeBackground;
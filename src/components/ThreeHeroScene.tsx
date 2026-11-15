import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroSceneProps {
  isDark: boolean;
}

export default function ThreeHeroScene({ isDark }: ThreeHeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects for mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core Sphere (Icosahedron with Wireframe & Subtle Glass Shading)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x142B59 : 0x386BFF,
      emissive: isDark ? 0x0E162B : 0x142B59,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Wireframe Cage around core
    const wireGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x28D6E8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // 2. Futuristic Torus Rings (Orbiting Rings)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x386BFF,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x386BFF,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x7855E8,
      roughness: 0.3,
      metalness: 0.85,
      emissive: 0x7855E8,
      emissiveIntensity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Floating Geometric Satellites (Octahedrons)
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.2, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x28D6E8,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x28D6E8,
      emissiveIntensity: 0.5,
    });

    const satCount = 4;
    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push(sat);
      mainGroup.add(sat);
    }

    // 4. Subtle Ambient Glowing Star Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x28D6E8 : 0x386BFF,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x386BFF, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7855E8, 2.0);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x28D6E8, 2, 8);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Mouse Tracking with smooth interpolation (lerp)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle idle rotation
      coreMesh.rotation.y = elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;
      wireMesh.rotation.y = -elapsedTime * 0.2;
      wireMesh.rotation.z = elapsedTime * 0.12;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.3;

      // Orbiting satellites
      satellites.forEach((sat, idx) => {
        const offset = (idx * Math.PI * 2) / satCount;
        const radius = 2.15;
        sat.position.x = Math.cos(elapsedTime * 0.8 + offset) * radius;
        sat.position.y = Math.sin(elapsedTime * 0.8 + offset) * 0.6;
        sat.position.z = Math.sin(elapsedTime * 0.8 + offset) * radius * 0.8;
        sat.rotation.x = elapsedTime * 2;
        sat.rotation.y = elapsedTime * 1.5;
      });

      // Subtle floating breath on group
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Mouse Parallax Lerp
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      mainGroup.rotation.x = currentRotX;
      mainGroup.rotation.y = currentRotY;

      // Particles slow drift
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Dispose resources
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center">
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#2c67ed]/40 flex items-center justify-center animate-spin" style={{ animationDuration: '24s' }}>
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#2c67ed] via-[#818cf8] to-[#38bdf8] opacity-75 blur-md" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-[#f5f7ff] tracking-widest">MIR.</span>
          <span className="text-[11px] font-semibold text-[#38bdf8] uppercase tracking-wider mt-1">3D Core Active</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive Digital Orb"
    />
  );
}


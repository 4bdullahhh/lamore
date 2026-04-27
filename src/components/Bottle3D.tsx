import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Bottle3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Bottle - Simple Procedural Glass Bottle
    const bottleGroup = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(1, 1, 3, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 1,
      thickness: 0.5,
      transparent: true,
      opacity: 0.5,
      envMapIntensity: 1,
    });
    const body = new THREE.Mesh(bodyGeo, glassMat);
    bottleGroup.add(body);

    // Liquid inside
    const liquidGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.8, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xc9a96e, // Gold liquid
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    bottleGroup.add(liquid);

    // Cap
    const capGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 1, roughness: 0.1 });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.9;
    bottleGroup.add(cap);

    scene.add(bottleGroup);

    // Particles (Gold Dust)
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc9a96e, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Animation Line
    const animate = () => {
      requestAnimationFrame(animate);

      bottleGroup.rotation.y += 0.005;
      bottleGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;

      particlesMesh.rotation.y += 0.001;
      particlesMesh.position.y += 0.005;
      if (particlesMesh.position.y > 5) particlesMesh.position.y = -5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

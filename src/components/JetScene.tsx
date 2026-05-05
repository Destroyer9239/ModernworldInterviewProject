"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Stars, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

interface JetAnimState {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  cameraFov: number;
  cameraZ: number;
}

interface JetModelProps {
  animState: JetAnimState;
  accentColor: string;
}

const JET_DARK_COLOR = new THREE.Color("#0a0a1a");
const JET_COCKPIT_COLOR = new THREE.Color("#a8d4f5");
const JET_ENGINE_GLOW = new THREE.Color("#ff3300");
const JET_ENGINE_LIGHT = new THREE.Color("#ff4400");

// Procedural jet geometry — used as placeholder until a .glb is provided
function ProceduralJet({ animState, accentColor }: JetModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentState = useRef<JetAnimState>({ ...animState });
  
  const mainColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.to(currentState.current, {
      duration: 1.8,
      rotationX: animState.rotationX,
      rotationY: animState.rotationY,
      rotationZ: animState.rotationZ,
      positionX: animState.positionX,
      positionY: animState.positionY,
      positionZ: animState.positionZ,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!groupRef.current) return;
        groupRef.current.rotation.set(
          currentState.current.rotationX,
          currentState.current.rotationY,
          currentState.current.rotationZ
        );
        groupRef.current.position.set(
          currentState.current.positionX,
          currentState.current.positionY,
          currentState.current.positionZ
        );
      },
    });
  }, [animState]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.getElapsedTime();
    group.position.y =
      currentState.current.positionY + Math.sin(t * 0.6) * 0.08;
    group.rotation.z =
      currentState.current.rotationZ + Math.sin(t * 0.4) * 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.08, 3.2, 16]} />
        <meshStandardMaterial color={JET_DARK_COLOR} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0, 1.8]}>
        <coneGeometry args={[0.18, 0.7, 16]} />
        <meshStandardMaterial color={mainColor} metalness={0.85} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.18, 0.6]}>
        <sphereGeometry args={[0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color={JET_COCKPIT_COLOR}
          metalness={0.1}
          roughness={0}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.06, 0.9]} />
        <meshStandardMaterial color={JET_DARK_COLOR} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.0, -0.05, -0.3]} rotation={[0, 0.25, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.5]} />
        <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.0, -0.05, -0.3]} rotation={[0, -0.25, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.5]} />
        <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, -1.3]}>
        <boxGeometry args={[0.07, 0.7, 0.5]} />
        <meshStandardMaterial color={mainColor} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0, -1.4]}>
        <boxGeometry args={[1.4, 0.05, 0.45]} />
        <meshStandardMaterial color={JET_DARK_COLOR} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -1.65]}>
        <cylinderGeometry args={[0.14, 0.18, 0.4, 12]} />
        <meshStandardMaterial color="#ff6b2b" metalness={0.5} roughness={0.3} emissive={JET_ENGINE_GLOW} emissiveIntensity={0.3} />
      </mesh>
      <pointLight position={[0, 0, -1.9]} color={JET_ENGINE_LIGHT} intensity={1.5} distance={3} />
      <mesh position={[-0.8, -0.02, 0.1]}>
        <boxGeometry args={[0.6, 0.07, 0.08]} />
        <meshStandardMaterial color={mainColor} metalness={0.7} roughness={0.1} emissive={mainColor} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.8, -0.02, 0.1]}>
        <boxGeometry args={[0.6, 0.07, 0.08]} />
        <meshStandardMaterial color={mainColor} metalness={0.7} roughness={0.1} emissive={mainColor} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function GLTFJet({ animState }: JetModelProps) {
  const { scene } = useGLTF("/models/jet.glb");
  const groupRef = useRef<THREE.Group>(null);
  const currentState = useRef<JetAnimState>({ ...animState });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.to(currentState.current, {
      duration: 1.8,
      rotationX: animState.rotationX,
      rotationY: animState.rotationY,
      rotationZ: animState.rotationZ,
      positionX: animState.positionX,
      positionY: animState.positionY,
      positionZ: animState.positionZ,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!groupRef.current) return;
        groupRef.current.rotation.set(
          currentState.current.rotationX,
          currentState.current.rotationY,
          currentState.current.rotationZ
        );
        groupRef.current.position.set(
          currentState.current.positionX,
          currentState.current.positionY,
          currentState.current.positionZ
        );
      },
    });
  }, [animState]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.getElapsedTime();
    group.position.y =
      currentState.current.positionY + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

function CameraRig({ cameraZ, fov }: { cameraZ: number; fov: number }) {
  const { camera } = useThree();
  const currentZ = useRef(cameraZ);
  const currentFov = useRef(fov);

  useEffect(() => {
    gsap.to(currentZ, {
      current: cameraZ,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.position.z = currentZ.current;
      },
    });
    gsap.to(currentFov, {
      current: fov,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if ((camera as THREE.PerspectiveCamera).fov !== undefined) {
          (camera as THREE.PerspectiveCamera).fov = currentFov.current;
          camera.updateProjectionMatrix();
        }
      },
    });
  }, [camera, cameraZ, fov]);

  return null;
}

function MouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, mouse.current.x * 0.5, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, mouse.current.y * 0.5, 0.05);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

interface JetSceneProps {
  animState: JetAnimState;
  accentColor: string;
  hasModel: boolean;
}

export default function JetScene({ animState, accentColor, hasModel }: JetSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, animState.cameraZ], fov: animState.cameraFov }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: "transparent" }}
    >
      <CameraRig cameraZ={animState.cameraZ} fov={animState.cameraFov} />
      <MouseParallax />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color={accentColor} />
      <pointLight position={[0, 4, 2]} intensity={0.8} color={accentColor} />

      <Stars radius={120} depth={60} count={1500} factor={5} saturation={0} fade speed={0.5} />

      <Suspense fallback={null}>
        {hasModel ? (
          <GLTFJet animState={animState} accentColor={accentColor} />
        ) : (
          <ProceduralJet animState={animState} accentColor={accentColor} />
        )}
        <Environment preset="night" />
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.3} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.05} darkness={1.2} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, useTexture } from '@react-three/drei';
import { Activity, CheckCircle, X, Satellite, Clock } from 'lucide-react';
import * as THREE from 'three';
import TelemetryHUD from './components/TelemetryHUD';
import MissionControls from './components/MissionControls';
import JudgesAudit from './components/JudgesAudit';
import InteractiveSimulator from './components/InteractiveSimulator';
import GuidedTour from './components/GuidedTour';
import ExportReportModal from './components/ExportReportModal';
import { sfx } from './utils/sfx';

// 🛰️ Ultra-Exclusive Aerospace Cyber-Insignia
function AstraLogo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 204, 0.45))' }}
    >
      <defs>
        <linearGradient id="astraCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#00ffcc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="shieldPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0b1e36" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <path
        d="M20 2.5L34 8.5V20.5C34 28.5 28 34.5 20 37.5C12 34.5 6 28.5 6 20.5V8.5L20 2.5Z"
        fill="url(#shieldPlateGrad)"
        stroke="url(#astraCyanGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <ellipse
        cx="20"
        cy="20"
        rx="13.5"
        ry="5"
        transform="rotate(-32 20 20)"
        stroke="#00ffcc"
        strokeWidth="1.3"
        strokeDasharray="32 5 8 5"
        opacity="0.9"
      />

      <ellipse
        cx="20"
        cy="20"
        rx="12.5"
        ry="3.8"
        transform="rotate(45 20 20)"
        stroke="#38bdf8"
        strokeWidth="0.9"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      <path
        d="M20 11.5L22.2 17.8L28.5 20L22.2 22.2L20 28.5L17.8 22.2L11.5 20L17.8 17.8Z"
        fill="#ffffff"
        opacity="0.95"
      />

      <circle cx="20" cy="20" r="1.8" fill="#00ffcc" />
      <circle cx="29.5" cy="14" r="1.5" fill="#00ffcc" />
    </svg>
  );
}

// 📐 Tactical HUD Corner Accents Component
function TacticalCorners({ color = '#00ffcc' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
      <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
    </div>
  );
}

// 🌐 Holographic Targeting & Space Radar Grid Overlay
function SpaceRadarGrid({ activeScenario, isManeuvered }) {
  const strokeColor = activeScenario === 'C' && !isManeuvered
    ? 'rgba(255, 0, 85, 0.12)'
    : 'rgba(0, 255, 204, 0.08)';

  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
      {/* Concentric Coordinate Rings */}
      <circle cx="50%" cy="50%" r="180" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 6" />
      <circle cx="50%" cy="50%" r="300" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="50%" cy="50%" r="420" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 12" />

      {/* Axis Crosshairs */}
      <line x1="50%" y1="6%" x2="50%" y2="94%" stroke={strokeColor} strokeWidth="1" strokeDasharray="5 10" />
      <line x1="6%" y1="50%" x2="94%" y2="50%" stroke={strokeColor} strokeWidth="1" strokeDasharray="5 10" />

      {/* Center Reticle Corner Marks */}
      <path d="M 180 180 L 190 180" stroke={strokeColor} strokeWidth="1" fill="none" />
      <path d="M 220 180 L 210 180" stroke={strokeColor} strokeWidth="1" fill="none" />
      <path d="M 180 220 L 190 220" stroke={strokeColor} strokeWidth="1" fill="none" />
      <path d="M 220 220 L 210 220" stroke={strokeColor} strokeWidth="1" fill="none" />
    </svg>
  );
}

// Satellite Database Config
const SATELLITES = {
  ISS: { name: 'ISS (SAT-25544)', radius: 2.8, boostRadius: 3.15, speed: 0.35, color: '#00ffcc', junk: '12,840' },
  HST: { name: 'Hubble Space Telescope', radius: 3.1, boostRadius: 3.4, speed: 0.3, color: '#00aaff', junk: '15,210' },
  SENTINEL6: { name: 'Sentinel-6 Michael Freilich', radius: 3.4, boostRadius: 3.7, speed: 0.25, color: '#ffaa00', junk: '8,430' }
};

// 🌍 Earth Mesh dengan useTexture NASA
function EarthMesh() {
  const earthRef = useRef();
  const texture = useTexture('/earth.jpg');

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <mesh ref={earthRef} rotation={[0.15, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
}

// 🌐 Earth Container
function Earth() {
  return (
    <group>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#0055ff" wireframe />
        </mesh>
      }>
        <EarthMesh />
      </Suspense>

      <mesh>
        <sphereGeometry args={[2.06, 64, 64]} />
        <meshBasicMaterial
          color="#00aaff"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// 🛰️ Interactive Satellite with Plasma Thruster Exhaust
function ActiveSatellite({ selectedSat, isManeuvered, timeOffset }) {
  const satRef = useRef();
  const exhaustRef = useRef();
  const satConfig = SATELLITES[selectedSat] || SATELLITES.ISS;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * satConfig.speed + (timeOffset * 0.2);
    const currentRadius = isManeuvered ? satConfig.boostRadius : satConfig.radius;

    if (satRef.current) {
      const x = currentRadius * Math.cos(t);
      const z = currentRadius * Math.sin(t);
      const y = Math.sin(t * 2) * 0.45;

      satRef.current.position.set(x, y, z);
      satRef.current.rotation.y = t + Math.PI / 2;
    }

    if (exhaustRef.current && isManeuvered) {
      const flicker = 1 + Math.sin(clock.getElapsedTime() * 32) * 0.18;
      exhaustRef.current.scale.set(flicker, flicker * 1.4, flicker);
    }
  });

  return (
    <group ref={satRef}>
      <mesh>
        <boxGeometry args={[0.08, 0.08, 0.2]} />
        <meshStandardMaterial color="#ffffff" emissive={satConfig.color} emissiveIntensity={0.6} />
      </mesh>

      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.01, 0.08]} />
        <meshStandardMaterial color={isManeuvered ? '#00ffcc' : satConfig.color} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.01, 0.08]} />
        <meshStandardMaterial color={isManeuvered ? '#00ffcc' : satConfig.color} />
      </mesh>

      {isManeuvered && (
        <group position={[0, 0, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh ref={exhaustRef}>
            <coneGeometry args={[0.04, 0.18, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.82} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <coneGeometry args={[0.02, 0.11, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
          </mesh>
          <pointLight distance={0.7} intensity={2.8} color="#00ffcc" />
        </group>
      )}
    </group>
  );
}

// 🎯 3D Dynamic Threat Interception Vector Line
function ThreatVector({ selectedSat, activeScenario, isManeuvered, timeOffset }) {
  const lineRef = useRef();
  const targetMeshRef = useRef();
  const satConfig = SATELLITES[selectedSat] || SATELLITES.ISS;

  useFrame(({ clock }) => {
    if (activeScenario !== 'C' || isManeuvered) return;
    const t = clock.getElapsedTime() * satConfig.speed + (timeOffset * 0.2);
    const r = satConfig.radius;

    const satPos = new THREE.Vector3(r * Math.cos(t), Math.sin(t * 2) * 0.45, r * Math.sin(t));
    const debrisPos = new THREE.Vector3(
      (r + 0.16) * Math.cos(t + 0.12),
      Math.sin((t + 0.12) * 2) * 0.45 + 0.08,
      (r + 0.16) * Math.sin(t + 0.12)
    );

    if (targetMeshRef.current) {
      targetMeshRef.current.position.copy(debrisPos);
      targetMeshRef.current.rotation.y += 0.04;
      targetMeshRef.current.rotation.x += 0.03;
    }

    if (lineRef.current) {
      lineRef.current.geometry.setFromPoints([satPos, debrisPos]);
    }
  });

  if (activeScenario !== 'C' || isManeuvered) return null;

  return (
    <group>
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#ff0055" linewidth={2} transparent opacity={0.88} />
      </line>

      <mesh ref={targetMeshRef}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#ff0055" wireframe />
      </mesh>
    </group>
  );
}

// ⭕ Dynamic Glowing Orbit Trajectory
function SatelliteOrbit({ selectedSat, isManeuvered }) {
  const satConfig = SATELLITES[selectedSat] || SATELLITES.ISS;
  const radius = isManeuvered ? satConfig.boostRadius : satConfig.radius;

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pts.push([
        radius * Math.cos(theta),
        Math.sin(theta * 2) * 0.45,
        radius * Math.sin(theta)
      ]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={isManeuvered ? '#00ffcc' : satConfig.color}
      lineWidth={1.5}
      transparent
      opacity={isManeuvered ? 0.7 : 0.45}
    />
  );
}

// 🛰️ Smooth Debris Cloud
function DebrisField({ activeScenario }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      const speed = activeScenario === 'C' ? 0.08 : 0.03;
      groupRef.current.rotation.y += delta * speed;
    }
  });

  const count = activeScenario === 'C' ? 80 : activeScenario === 'B' ? 60 : 45;

  const debrisData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const radius = 2.4 + (i % 4) * 0.35;
      const theta = (i / count) * Math.PI * 2 + (i % 3) * 0.2;
      const phi = ((i % 7) / 7) * Math.PI - Math.PI / 2;
      return {
        pos: [
          radius * Math.cos(theta) * Math.cos(phi),
          radius * Math.sin(phi) * 0.6,
          radius * Math.sin(theta) * Math.cos(phi)
        ],
        isDanger: activeScenario === 'C' || i % 4 === 0
      };
    });
  }, [count, activeScenario]);

  return (
    <group ref={groupRef}>
      {debrisData.map((d, idx) => (
        <mesh key={idx} position={d.pos}>
          <boxGeometry args={[0.038, 0.038, 0.038]} />
          <meshBasicMaterial
            color={d.isDanger ? '#ff0055' : '#00ffcc'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function App() {
  const [activeScenario, setActiveScenario] = useState('A');
  const [selectedSat, setSelectedSat] = useState('ISS');
  const [timeOffset, setTimeOffset] = useState(0);
  const [isManeuvered, setIsManeuvered] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Live UTC & MET Clock
  const [utcTime, setUtcTime] = useState('');
  const [metSec, setMetSec] = useState(15128);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s} UTC`);
      setMetSec(prev => prev + 1);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatMET = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `+${h}:${m}:${s}`;
  };

  const handleScenarioChange = (scen) => {
    setActiveScenario(scen);
    setIsManeuvered(false);
    setShowSuccessBanner(false);
    try {
      if (scen === 'C') sfx.playAlert();
      else sfx.playClick();
    } catch (e) { }
  };

  const handleExecuteAvoidance = () => {
    setIsManeuvered(true);
    setShowSuccessBanner(true);
    try {
      sfx.playSuccess();
    } catch (e) { }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.key === '1') {
        handleScenarioChange('A');
      } else if (e.key === '2') {
        handleScenarioChange('B');
      } else if (e.key === '3') {
        handleScenarioChange('C');
      } else if (e.key === ' ') {
        e.preventDefault();
        handleExecuteAvoidance();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleVoiceCommand = (cmd) => {
    try { sfx.playClick(); } catch (e) { }
    if (cmd.type === 'MANEUVER') {
      handleExecuteAvoidance();
    } else if (cmd.type === 'SCENARIO') {
      handleScenarioChange(cmd.value);
    } else if (cmd.type === 'SATELLITE') {
      setSelectedSat(cmd.value);
      setIsManeuvered(false);
    }
  };

  const auraGlow = activeScenario === 'C'
    ? 'inset 0 0 45px rgba(255, 0, 85, 0.22)'
    : activeScenario === 'B'
      ? 'inset 0 0 35px rgba(245, 158, 11, 0.15)'
      : 'inset 0 0 30px rgba(0, 255, 204, 0.08)';

  return (
    <div style={{
      width: '100vw',
      minWidth: '1280px',
      minHeight: '100vh',
      backgroundColor: '#040714',
      color: '#fff',
      fontFamily: 'sans-serif',
      position: 'relative',
      overflowY: 'auto',        // Mengizinkan scroll vertikal kalau tombol bawah terpotong
      overflowX: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: auraGlow,
      transition: 'box-shadow 0.6s ease'
    }}>

      {/* 🌌 3D Space Canvas */}
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        camera={{ position: [0, 1.2, 6.2], fov: 45 }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -5, -10]} intensity={1.2} color="#00aaff" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        <Earth />
        <ActiveSatellite selectedSat={selectedSat} isManeuvered={isManeuvered} timeOffset={timeOffset} />
        <ThreatVector selectedSat={selectedSat} activeScenario={activeScenario} isManeuvered={isManeuvered} timeOffset={timeOffset} />
        <SatelliteOrbit selectedSat={selectedSat} isManeuvered={isManeuvered} />
        <DebrisField activeScenario={activeScenario} />

        <OrbitControls enableZoom={true} minDistance={3.5} maxDistance={10} />
      </Canvas>

      {/* 🌐 Space Radar Targeting Grid (Layer 3) */}
      <SpaceRadarGrid activeScenario={activeScenario} isManeuvered={isManeuvered} />

      {/* 🛡️ 1. Header Top Left with Custom AstraLogo, Integrated Clock, AI Engine Badge & Tactical Corners */}
      <div style={{
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 20,
        backgroundColor: 'rgba(10, 18, 30, 0.92)',
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 240, 255, 0.35)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        maxWidth: 'calc(100vw - 30px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <TacticalCorners color="#00ffcc" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <AstraLogo size={28} />
            <div>
              <h1 style={{ margin: 0, fontSize: '13px', letterSpacing: '1px', color: '#00f0ff', fontWeight: 'bold' }}>ASTRA SENTINEL</h1>
              <p style={{ margin: 0, fontSize: '8px', color: '#8a99ad', letterSpacing: '0.5px' }}>Autonomous Orbit Defense System</p>
            </div>
          </div>
          <GuidedTour />
        </div>

        {/* 🤖 Live IBM Granite Engine Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
          backgroundColor: 'rgba(0, 255, 204, 0.08)',
          padding: '3px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 255, 204, 0.25)',
          fontSize: '8.5px',
          color: '#00ffcc',
          fontWeight: 'bold'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ffcc', boxShadow: '0 0 6px #00ffcc' }}></span>
          IBM GRANITE 3.1 + GUARDIAN SAFETY GATE ACTIVE
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          paddingTop: '4px',
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          fontSize: '9px',
          color: '#94a3b8'
        }}>
          <Clock size={10} color="#00ffcc" />
          <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{utcTime || '12:00:00 UTC'}</span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>MET {formatMET(metSec)}</span>
        </div>
      </div>

      {/* 🎮 2. Top Center Command Ribbon */}
      <InteractiveSimulator
        onSelectScenario={handleScenarioChange}
        activeScenario={activeScenario}
        isManeuvered={isManeuvered}
        onVoiceCommand={handleVoiceCommand}
      />

      {/* 🟢 3. Maneuver Success Banner */}
      {showSuccessBanner && (
        <div style={{
          position: 'absolute',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          backgroundColor: 'rgba(0, 255, 204, 0.15)',
          border: '1px solid #00ffcc',
          borderRadius: '24px',
          padding: '6px 18px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 25px rgba(0, 255, 204, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={15} color="#00ffcc" />
          <span style={{ fontSize: '10.5px', color: '#00ffcc', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            MANEUVER EXECUTED: ORBIT BOOSTED (+1.45 m/s) • COLLISION RISK DROPPED TO 0.001% (SAFE)
          </span>
          <button
            onClick={() => setShowSuccessBanner(false)}
            style={{ background: 'none', border: 'none', color: '#00ffcc', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* 📊 4. System Monitor with Dropdown Selector, Enterprise ROI & UN Compliance */}
      <div style={{
        position: 'absolute',
        bottom: 15,
        left: 15,
        zIndex: 20,
        backgroundColor: 'rgba(10, 18, 30, 0.92)',
        padding: '12px 14px',
        borderRadius: '8px',
        border: activeScenario === 'C' && !isManeuvered ? '1px solid rgba(255, 0, 85, 0.5)' : '1px solid rgba(0, 240, 255, 0.3)',
        backdropFilter: 'blur(12px)',
        minWidth: '240px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <TacticalCorners color={activeScenario === 'C' && !isManeuvered ? '#ff0055' : '#00ffcc'} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f0ff' }}>
            <Activity size={15} />
            <span style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '0.5px' }}>SYSTEM MONITOR</span>
          </div>
          <span style={{ fontSize: '8px', padding: '1px 5px', borderRadius: '3px', backgroundColor: 'rgba(0, 255, 204, 0.15)', color: '#00ffcc', border: '1px solid rgba(0, 255, 204, 0.3)' }}>
            UN COPUOS GUIDELINE 4
          </span>
        </div>

        <div style={{ fontSize: '10.5px', lineHeight: '1.75' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Satellite size={11} /> Target Asset:
            </span>
            <select
              value={selectedSat}
              onChange={(e) => {
                try { sfx.playClick(); } catch (err) { }
                setSelectedSat(e.target.value);
                setIsManeuvered(false);
              }}
              style={{
                backgroundColor: '#040d1a',
                color: '#00ffcc',
                border: '1px solid rgba(0, 255, 204, 0.4)',
                borderRadius: '5px',
                fontSize: '10px',
                padding: '2px 5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="ISS">ISS (SAT-25544)</option>
              <option value="HST">Hubble Space Telescope</option>
              <option value="SENTINEL6">Sentinel-6 Satellite</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#aaa' }}>Protected Asset Value:</span>
            <strong style={{ color: '#00ffcc' }}>$150,000,000 USD</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#aaa' }}>Active Threat Level:</span>
            <strong style={{ color: activeScenario === 'C' ? '#ff0055' : activeScenario === 'B' ? '#ffaa00' : '#00ffcc' }}>
              {activeScenario === 'C' ? 'CRITICAL (CRASH RISK)' : activeScenario === 'B' ? 'ELEVATED' : 'NOMINAL'}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#aaa' }}>Orbit Status:</span>
            <strong style={{ color: isManeuvered ? '#00ffcc' : '#00f0ff' }}>
              {isManeuvered ? 'EVADED (SAFE)' : 'NOMINAL'}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#aaa' }}>Safety Gate Boundary:</span>
            <strong style={{ color: '#00ffcc' }}>Δv ≤ 5.0 m/s (VERIFIED)</strong>
          </div>
        </div>
      </div>

      {/* 📡 5. Telemetry HUD (Right) */}
      <TelemetryHUD scenario={activeScenario} isManeuvered={isManeuvered} />

      {/* ⏳ 6. Mission Controls with 3D Sync Slider (Bottom Center) */}
      <MissionControls
        onExecuteManeuver={handleExecuteAvoidance}
        timeOffset={timeOffset}
        setTimeOffset={setTimeOffset}
      />

      {/* ⚖️ 7. Bottom Right Actions */}
      <div style={{
        position: 'absolute',
        bottom: 15,
        right: 15,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <ExportReportModal scenario={activeScenario} isManeuvered={isManeuvered} />
        <JudgesAudit />
      </div>

    </div>
  );
}
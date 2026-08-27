import React, { useState, useEffect } from 'react';
import { PlayCircle, AlertOctagon, Sun, ShieldAlert } from 'lucide-react';
import AudioBriefing from './AudioBriefing';
import SustainabilityScorecard from './SustainabilityScorecard';
import VoiceController from './VoiceController';

export default function InteractiveSimulator({ onSelectScenario, activeScenario = 'A', isManeuvered = false, onVoiceCommand }) {
  const [selected, setSelected] = useState('A');

  useEffect(() => {
    setSelected(activeScenario);
  }, [activeScenario]);

  const handleScenario = (key) => {
    setSelected(key);
    if (onSelectScenario) onSelectScenario(key);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 15,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 30,
      backgroundColor: 'rgba(10, 18, 30, 0.9)',
      border: '1px solid rgba(0, 240, 255, 0.3)',
      borderRadius: '20px',
      padding: '4px 10px',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100vw - 520px)'
    }}>
      {/* Label */}
      <span style={{ fontSize: '9.5px', color: '#00f0ff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px', marginRight: '2px' }}>
        <PlayCircle size={12} /> SIM:
      </span>

      {/* Scenario A */}
      <button
        onClick={() => handleScenario('A')}
        style={{
          backgroundColor: selected === 'A' ? 'rgba(0, 255, 204, 0.25)' : 'transparent',
          border: `1px solid ${selected === 'A' ? '#00ffcc' : 'rgba(0, 255, 204, 0.25)'}`,
          color: selected === 'A' ? '#00ffcc' : '#8a99ad',
          padding: '3px 7px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          transition: 'all 0.2s ease'
        }}
      >
        <AlertOctagon size={10} />
        <span>A: Minor</span>
      </button>

      {/* Scenario B */}
      <button
        onClick={() => handleScenario('B')}
        style={{
          backgroundColor: selected === 'B' ? 'rgba(255, 153, 0, 0.25)' : 'transparent',
          border: `1px solid ${selected === 'B' ? '#ff9900' : 'rgba(255, 153, 0, 0.25)'}`,
          color: selected === 'B' ? '#ff9900' : '#8a99ad',
          padding: '3px 7px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          transition: 'all 0.2s ease'
        }}
      >
        <Sun size={10} />
        <span>B: Flare</span>
      </button>

      {/* Scenario C */}
      <button
        onClick={() => handleScenario('C')}
        style={{
          backgroundColor: selected === 'C' ? 'rgba(255, 0, 85, 0.25)' : 'transparent',
          border: `1px solid ${selected === 'C' ? '#ff0055' : 'rgba(255, 0, 85, 0.25)'}`,
          color: selected === 'C' ? '#ff0055' : '#8a99ad',
          padding: '3px 7px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          transition: 'all 0.2s ease'
        }}
      >
        <ShieldAlert size={10} />
        <span>C: Emergency</span>
      </button>

      {/* Separator */}
      <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(0, 240, 255, 0.2)', margin: '0 2px' }} />

      {/* Voice Copilot */}
      <VoiceController onCommand={onVoiceCommand} />

      {/* Audio Briefing */}
      <AudioBriefing scenario={selected} isManeuvered={isManeuvered} />

      {/* ESG Widget */}
      <SustainabilityScorecard />
    </div>
  );
}
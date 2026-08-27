import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioBriefing({ scenario = 'A', isManeuvered = false }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVoiceBriefing = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    // Stop previous audio if running
    window.speechSynthesis.cancel();

    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    let speechText = "AstraSentinel Copilot active. Space debris conjunction threat detected for International Space Station. Collision probability is 0.482 percent. IBM Granite 3.1 recommends a prograde orbital boost of 1.45 meters per second. Granite Guardian safety gate verified.";

    if (scenario === 'B') {
      speechText = "Space weather alert from NASA DONKI. Extreme geomagnetic storm detected with K p index 8.9. Atmospheric drag is increasing. IBM Granite 3.1 recommends solar feather drag reduction.";
    } else if (scenario === 'C') {
      speechText = "Critical emergency alert! Urgent collision hazard in less than two hours. Collision probability is 87.4 percent. Granite Guardian safety gate verified. Recommend immediate retrograde emergency burn.";
    }

    if (isManeuvered) {
      speechText = "Avoidance burn successfully authorized and executed. Satellite altitude raised. Collision risk has dropped to safe threshold at 0.001 percent. All orbital parameters nominal.";
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'en-US';
    utterance.rate = 1.02;
    utterance.pitch = 0.95;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={playVoiceBriefing}
      style={{
        backgroundColor: isPlaying ? 'rgba(255, 0, 85, 0.2)' : 'rgba(0, 240, 255, 0.12)',
        border: `1px solid ${isPlaying ? '#ff0055' : 'rgba(0, 240, 255, 0.4)'}`,
        color: isPlaying ? '#ff0055' : '#00f0ff',
        padding: '5px 10px',
        borderRadius: '8px',
        fontSize: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'all 0.2s ease',
        boxShadow: isPlaying ? '0 0 12px rgba(255, 0, 85, 0.4)' : 'none'
      }}
      title="Executive Audio Briefing"
    >
      {isPlaying ? <VolumeX size={13} /> : <Volume2 size={13} />}
      <span>{isPlaying ? 'STOP BRIEFING' : 'AUDIO BRIEFING'}</span>
    </button>
  );
}
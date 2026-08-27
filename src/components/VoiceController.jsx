import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceController({ onCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Fallback jika browser membatasi Web Speech API
    if (!SpeechRecognition) {
      triggerFallbackCommand();
      return;
    }

    if (isListening) {
      setIsListening(false);
      setFeedback('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setFeedback('Listening...');
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setFeedback(`"${text}"`);
        handleVoiceAction(text);
        setIsListening(false);
        setTimeout(() => setFeedback(''), 2500);
      };

      recognition.onerror = (e) => {
        setIsListening(false);
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          triggerFallbackCommand();
        } else {
          setFeedback('Mic Ready');
          setTimeout(() => setFeedback(''), 1500);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      triggerFallbackCommand();
    }
  };

  const triggerFallbackCommand = () => {
    setIsListening(false);
    setFeedback('AI Command: Avoid');
    if (onCommand) onCommand({ type: 'MANEUVER' });
    setTimeout(() => setFeedback(''), 2500);
  };

  const handleVoiceAction = (text) => {
    if (text.includes('avoid') || text.includes('hindar') || text.includes('execute') || text.includes('burn')) {
      if (onCommand) onCommand({ type: 'MANEUVER' });
    } else if (text.includes('scenario a') || text.includes('skenario a') || text.includes('minor')) {
      if (onCommand) onCommand({ type: 'SCENARIO', value: 'A' });
    } else if (text.includes('scenario b') || text.includes('skenario b') || text.includes('solar') || text.includes('flare')) {
      if (onCommand) onCommand({ type: 'SCENARIO', value: 'B' });
    } else if (text.includes('scenario c') || text.includes('skenario c') || text.includes('emergency') || text.includes('darurat')) {
      if (onCommand) onCommand({ type: 'SCENARIO', value: 'C' });
    } else if (text.includes('hubble') || text.includes('hst')) {
      if (onCommand) onCommand({ type: 'SATELLITE', value: 'HST' });
    } else if (text.includes('iss') || text.includes('station')) {
      if (onCommand) onCommand({ type: 'SATELLITE', value: 'ISS' });
    } else if (text.includes('sentinel')) {
      if (onCommand) onCommand({ type: 'SATELLITE', value: 'SENTINEL6' });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <button
        onClick={toggleListening}
        style={{
          backgroundColor: isListening ? 'rgba(255, 0, 85, 0.25)' : 'rgba(0, 240, 255, 0.12)',
          border: `1px solid ${isListening ? '#ff0055' : 'rgba(0, 240, 255, 0.35)'}`,
          color: isListening ? '#ff0055' : '#00f0ff',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.2s ease',
          boxShadow: isListening ? '0 0 12px rgba(255, 0, 85, 0.5)' : 'none'
        }}
        title="Voice Copilot (Click to speak or simulate command)"
      >
        {isListening ? <MicOff size={11} /> : <Mic size={11} />}
        <span>{isListening ? 'LISTENING' : 'VOICE'}</span>
      </button>

      {feedback && (
        <span style={{ fontSize: '8.5px', color: '#00ffcc', fontFamily: 'monospace', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {feedback}
        </span>
      )}
    </div>
  );
}
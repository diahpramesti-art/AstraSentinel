import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Navigation, Target } from 'lucide-react';

export default function GuidedTour() {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      step: "1 / 4",
      title: "1. 3D EARTH & ISS TRACKER 🌐",
      target: "CENTER SCREEN (3D CANVAS)",
      description: "Real-time 3D interactive model visualizing the International Space Station (ISS) in Low Earth Orbit (LEO), surrounded by orbital space debris particles.",
      action: "🖱️ Try clicking and dragging the 3D Globe to rotate the view!"
    },
    {
      step: "2 / 4",
      title: "2. TELEMETRY & IBM GRANITE 3.1 COPILOT 📡",
      target: "TOP-RIGHT HUD PANELS",
      description: "Monitors real-time collision probability (Pc), solar radiation alerts from NASA DONKI, and AI maneuver recommendations verified by Granite Guardian Safety Gate.",
      action: "⚡ Notice the 'VERIFIED' badge ensuring zero-hallucination safety."
    },
    {
      step: "3 / 4",
      title: "3. INTERACTIVE SIMULATOR & TIME SLIDER ⏳",
      target: "TOP BAR & BOTTOM SLIDER",
      description: "Simulate emergency space scenarios (Minor Debris, Solar Flare, Emergency Avoidance) and adjust the orbital timeline from -12h to +12h.",
      action: "🎮 Try clicking 'Scen B' or dragging the Orbit Time Slider below!"
    },
    {
      step: "4 / 4",
      title: "4. HUMAN-IN-THE-LOOP & SYSTEM AUDIT 🛡️",
      target: "BOTTOM BUTTONS & AUDIT MODAL",
      description: "Human-in-the-Loop authorization protocol for satellite maneuvers, plus the Judges Audit Page displaying SGP4 math formulas and sub-50ms latency.",
      action: "🛡️ Click 'EXECUTE AVOIDANCE' or 'JUDGES AUDIT PAGE' to inspect."
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* 🧭 Ultra-Compact Guided Tour Button */}
      <button
        onClick={() => setCurrentStep(1)}
        style={{
          backgroundColor: 'rgba(0, 240, 255, 0.15)',
          border: '1px solid #00f0ff',
          color: '#00f0ff',
          padding: '3px 8px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '9.5px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap'
        }}
      >
        <Sparkles size={11} />
        <span>TOUR</span>
      </button>

      {/* 💡 Safe Responsive Walkthrough Modal */}
      {currentStep > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(4, 7, 20, 0.85)',
          zIndex: 99999,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#0a121e',
            border: '1px solid #00f0ff',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '420px',
            width: '90%',
            color: '#fff',
            boxShadow: '0 0 50px rgba(0, 240, 255, 0.35)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', color: '#00ffcc', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Navigation size={12} /> MISSION CONTROL TOUR • STEP {tourSteps[currentStep - 1].step}
              </span>
              <button
                onClick={() => setCurrentStep(0)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <h3 style={{ margin: '0 0 10px 0', color: '#00f0ff', fontSize: '15px', fontWeight: 'bold' }}>
              {tourSteps[currentStep - 1].title}
            </h3>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00f0ff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 'bold',
              marginBottom: '12px'
            }}>
              <Target size={12} /> FOCUS AREA: {tourSteps[currentStep - 1].target}
            </div>

            <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 14px 0' }}>
              {tourSteps[currentStep - 1].description}
            </p>

            <div style={{
              backgroundColor: 'rgba(0, 255, 204, 0.08)',
              borderLeft: '3px solid #00ffcc',
              padding: '8px 12px',
              fontSize: '11px',
              color: '#00ffcc',
              marginBottom: '20px',
              borderRadius: '0 6px 6px 0'
            }}>
              {tourSteps[currentStep - 1].action}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #64748b',
                  color: currentStep === 1 ? '#475569' : '#fff',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  cursor: currentStep === 1 ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ChevronLeft size={14} /> Back
              </button>

              <button
                onClick={handleNext}
                style={{
                  backgroundColor: '#00f0ff',
                  border: 'none',
                  color: '#040714',
                  padding: '6px 18px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {currentStep === tourSteps.length ? 'Finish Tour' : 'Next Step'} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
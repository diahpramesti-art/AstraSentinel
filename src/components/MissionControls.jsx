import React, { useState } from 'react';
import { Clock, ShieldAlert, CheckCircle, Flame, X } from 'lucide-react';

export default function MissionControls({ onExecuteManeuver, timeOffset = 0, setTimeOffset }) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const handleOpenModal = () => {
    setShowApprovalModal(true);
  };

  const handleConfirmManeuver = () => {
    setShowApprovalModal(false);
    if (onExecuteManeuver) onExecuteManeuver();
  };

  return (
    <>
      {/* ⏳ Bar Slider Bawah Tengah */}
      <div style={{
        position: 'absolute',
        bottom: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        backgroundColor: 'rgba(10, 18, 30, 0.85)',
        padding: '10px 18px',
        borderRadius: '16px',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)'
      }}>
        
        {/* Time-Machine Slider Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '220px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: '#8a99ad', fontWeight: 'bold' }}>
            <span style={{ color: '#00f0ff', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> ORBIT TIME SIMULATION
            </span>
            <span style={{ color: timeOffset === 0 ? '#ff0055' : '#00ffcc', fontFamily: 'monospace' }}>
              {timeOffset === 0 ? 'LIVE (TCA)' : `${timeOffset > 0 ? '+' : ''}${timeOffset}h`}
            </span>
          </div>

          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={timeOffset}
            onChange={(e) => setTimeOffset(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: '#00f0ff' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#64748b' }}>
            <span>TCA -12h</span>
            <span style={{ color: '#00f0ff' }}>TCA NOW</span>
            <span>TCA +12h</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenModal}
          style={{
            backgroundColor: 'rgba(255, 0, 85, 0.15)',
            border: '1px solid #ff0055',
            color: '#ff0055',
            padding: '7px 14px',
            borderRadius: '10px',
            fontSize: '10.5px',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          <ShieldAlert size={14} />
          <span>EXECUTE AVOIDANCE</span>
        </button>
      </div>

      {/* 🛡️ Human-in-the-Loop Approval Modal */}
      {showApprovalModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(4, 7, 20, 0.85)',
          zIndex: 9999,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#0a121e',
            border: '1px solid #ff0055',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '460px',
            width: '90%',
            color: '#fff',
            boxShadow: '0 0 35px rgba(255, 0, 85, 0.3)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowApprovalModal(false)}
              style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff0055', marginBottom: '12px' }}>
              <ShieldAlert size={22} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>
                HUMAN-IN-THE-LOOP AUTHORIZATION
              </h3>
            </div>

            <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              AstraSentinel Copilot requires manual cryptographic approval to fire thrusters and modify orbital ephemeris.
            </p>

            <div style={{ backgroundColor: 'rgba(255, 0, 85, 0.08)', border: '1px solid rgba(255, 0, 85, 0.3)', padding: '12px', borderRadius: '10px', fontSize: '11px', lineHeight: '1.8', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a99ad' }}>Maneuver Action:</span>
                <strong style={{ color: '#00ffcc' }}>PROGRADE_ORBITAL_BOOST</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a99ad' }}>Delta-v Target:</span>
                <strong style={{ color: '#00ffcc' }}>+1.45 m/s</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a99ad' }}>Burn Duration:</span>
                <strong style={{ color: '#fff' }}>12.4 Seconds</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a99ad' }}>Safety Gate:</span>
                <strong style={{ color: '#00ffcc' }}>PASSED &amp; VERIFIED</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowApprovalModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#94a3b8',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                Cancel / Standby
              </button>

              <button
                onClick={handleConfirmManeuver}
                style={{
                  backgroundColor: '#ff0055',
                  border: 'none',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 15px rgba(255, 0, 85, 0.5)'
                }}
              >
                <Flame size={14} />
                <span>Authorize &amp; Burn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
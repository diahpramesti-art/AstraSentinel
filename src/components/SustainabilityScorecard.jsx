import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Leaf, Award, CheckCircle, ShieldCheck, X, Globe, AlertCircle } from 'lucide-react';

export default function SustainabilityScorecard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mini Toggle Button di Bilah Navigasi */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: 'rgba(0, 255, 204, 0.12)',
          border: '1px solid rgba(0, 255, 204, 0.35)',
          color: '#00ffcc',
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}
        title="Space Sustainability Scorecard (UN/ESA ESG)"
      >
        <Leaf size={11} color="#00ffcc" />
        <span>ESG: 94/100</span>
      </button>

      {/* Modal Detail Kepatuhan ESG Antariksa */}
      {isOpen && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(4, 7, 20, 0.88)',
          zIndex: 9999,
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#0a121e',
            border: '1px solid rgba(0, 255, 204, 0.5)',
            borderRadius: '14px',
            padding: '22px 24px',
            maxWidth: '460px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            color: '#f8fafc',
            boxShadow: '0 0 40px rgba(0, 255, 204, 0.2)',
            position: 'relative',
            boxSizing: 'border-box',
            whiteSpace: 'normal',
            lineHeight: '1.4'
          }}>
            {/* Tombol Tutup */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            {/* Header Modal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00ffcc', marginBottom: '8px' }}>
              <Award size={20} />
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.6px' }}>
                SPACE SUSTAINABILITY SCORECARD
              </h3>
            </div>

            {/* Deskripsi Regulasi */}
            <p style={{
              fontSize: '11px',
              color: '#94a3b8',
              lineHeight: '1.5',
              margin: '0 0 14px 0',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}>
              Orbital governance compliance strictly aligned with <strong>UN COPUOS Space Debris Mitigation</strong> and <strong>ESA Zero Debris Charter</strong> guidelines.
            </p>

            {/* Kartu Metrik Utama */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ backgroundColor: 'rgba(0, 255, 204, 0.08)', border: '1px solid rgba(0, 255, 204, 0.25)', padding: '8px 10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: '#8a99ad' }}>SUSTAINABILITY INDEX</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#00ffcc', marginTop: '2px' }}>94 / 100</div>
                <div style={{ fontSize: '8.5px', color: '#00ffcc' }}>Tier: Gold Standard (A+)</div>
              </div>

              <div style={{ backgroundColor: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', padding: '8px 10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: '#8a99ad' }}>LEO CONGESTION DENSITY</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#00f0ff', marginTop: '2px' }}>12.4%</div>
                <div style={{ fontSize: '8.5px', color: '#00f0ff' }}>Status: Low Collision Density</div>
              </div>
            </div>

            {/* Daftar Verifikasi Kepatuhan */}
            <div style={{
              fontSize: '10.5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              backgroundColor: '#050b14',
              border: '1px solid rgba(0, 255, 204, 0.2)',
              borderRadius: '8px',
              padding: '10px 12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={13} color="#00ffcc" /> Post-Mission Disposal Plan
                </span>
                <strong style={{ color: '#00ffcc', fontSize: '9.5px' }}>&lt;5 YRS (COMPLIANT)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={13} color="#00ffcc" /> Re-entry Casualty Threshold
                </span>
                <strong style={{ color: '#00ffcc', fontSize: '9.5px' }}>&lt; 1 : 10,000 (PASSED)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Globe size={13} color="#00ffcc" /> Active Debris Avoidance Readiness
                </span>
                <strong style={{ color: '#00ffcc', fontSize: '9.5px' }}>VERIFIED (100%)</strong>
              </div>
            </div>

          </div>
        </div>
        , document.body)}
    </>
  );
}
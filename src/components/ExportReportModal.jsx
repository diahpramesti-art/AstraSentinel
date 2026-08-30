import React, { useState } from 'react';
import { FileText, Printer, CheckCircle2, X } from 'lucide-react';

// 🚀 AstraLogo Cyber Insignia Vector (Identik dengan Header Utama)
function AstraLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="astra-logo-svg">
      {/* Outer Tactical Shield */}
      <path d="M20 3L34 8V18C34 27.5 28 34.5 20 37C12 34.5 6 27.5 6 18V8L20 3Z" stroke="#00f0ff" strokeWidth="2" fill="rgba(0, 240, 255, 0.12)" className="logo-shield" />
      {/* Orbital Trajectory Ring */}
      <ellipse cx="20" cy="20" rx="14" ry="5" transform="rotate(-30 20 20)" stroke="#00ffcc" strokeWidth="1.5" strokeDasharray="3 1.5" className="logo-orbit" />
      {/* Core Satellite Node & Crosshair */}
      <circle cx="20" cy="20" r="3.5" fill="#00f0ff" className="logo-core" />
      <path d="M20 11V15M20 25V29M11 20H15M25 20H29" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" className="logo-cross" />
    </svg>
  );
}

export default function ExportReportModal({ scenario = 'A', isManeuvered = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* 🖨️ CSS Khusus Cetak Dokumen A4 Standar Dirgantara (Kontras Tinggi) */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          body * {
            visibility: hidden;
          }
          #official-incident-report, #official-incident-report * {
            visibility: visible;
          }
          #official-incident-report {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            border: none !important;
            box-shadow: none !important;
            display: block !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
          }
          .no-print {
            display: none !important;
          }
          .astra-logo-svg .logo-shield { stroke: #0f2b5c !important; fill: rgba(15, 43, 92, 0.08) !important; }
          .astra-logo-svg .logo-orbit { stroke: #0284c7 !important; }
          .astra-logo-svg .logo-core { fill: #0f2b5c !important; }
          .astra-logo-svg .logo-cross { stroke: #0f2b5c !important; }

          .report-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-bottom: 8px !important;
          }
          .report-table td {
            border: 1px solid #cbd5e1 !important;
            padding: 5px 8px !important;
            font-size: 8.5pt !important;
            color: #1e293b !important;
          }
          .report-label {
            color: #475569 !important;
            font-weight: 500 !important;
            background-color: #f8fafc !important;
            width: 28% !important;
          }
          .report-value {
            color: #0f172a !important;
            font-weight: 600 !important;
          }
          .report-section-title {
            background-color: #0f2b5c !important;
            color: #ffffff !important;
            padding: 4px 8px !important;
            font-size: 8.5pt !important;
            font-weight: bold !important;
            letter-spacing: 0.5px !important;
            margin-top: 10px !important;
            margin-bottom: 4px !important;
            border-radius: 2px !important;
          }
          .print-primary {
            color: #0f2b5c !important;
            font-weight: bold !important;
          }
          .print-hazard {
            color: #b91c1c !important;
            font-weight: bold !important;
          }
          .print-safe {
            color: #047857 !important;
            font-weight: bold !important;
          }
          .print-accent {
            color: #0369a1 !important;
            font-weight: bold !important;
          }
          .sign-box {
            border: 1px solid #94a3b8 !important;
            background-color: #f8fafc !important;
            padding: 6px 8px !important;
            border-radius: 4px !important;
          }
        }
      `}</style>

      {/* Button Trigger di Pojok Kanan Bawah */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: 'rgba(10, 18, 30, 0.85)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          color: '#00f0ff',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '10px',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}
      >
        <FileText size={13} />
        <span>EXPORT REPORT</span>
      </button>

      {/* Modal Dokumen Lengkap */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(4, 7, 20, 0.88)',
          zIndex: 9999,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div
            id="official-incident-report"
            style={{
              backgroundColor: '#0c1524',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '12px',
              padding: '24px 28px',
              maxWidth: '720px',
              width: '100%',
              color: '#f8fafc',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.2)',
              position: 'relative',
              maxHeight: '92vh',
              overflowY: 'auto',
              fontSize: '11px',
              lineHeight: '1.4'
            }}
          >
            {/* Tombol Tutup */}
            <button
              onClick={() => setIsOpen(false)}
              className="no-print"
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={18} />
            </button>

            {/* 1. HEADER DOKUMEN DIRGANTARA WITH CUSTOM ASTRA LOGO */}
            <div style={{ borderBottom: '2px solid #00f0ff', paddingBottom: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AstraLogo size={32} />
                <div>
                  <h1 className="print-primary" style={{ margin: 0, fontSize: '15px', color: '#00f0ff', letterSpacing: '0.8px', fontWeight: 'bold' }}>
                    ASTRA SENTINEL SPACE OPERATIONS
                  </h1>
                  <p style={{ margin: '2px 0 0 0', fontSize: '9.5px', color: '#94a3b8', letterSpacing: '0.5px' }}>
                    CONJUNCTION ASSESSMENT &amp; COLLISION AVOIDANCE DISPOSITION (CAR-DISPO)
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '8.5px', color: '#94a3b8' }}>
                <div>DOC ID: <strong style={{ color: '#00f0ff' }}>AST-2026-CAR-089</strong></div>
                <div>EPOCH: <strong>2026-08-14 14:32:00 UTC</strong></div>
                <div>SECURITY: <strong>FLIGHT OPS / UNRESTRICTED AUDIT</strong></div>
              </div>
            </div>

            {/* SECTION 1 */}
            <div className="report-section-title" style={{ backgroundColor: 'rgba(0, 240, 255, 0.12)', color: '#00f0ff', padding: '3px 8px', fontWeight: 'bold', fontSize: '9.5px', borderRadius: '3px', marginBottom: '4px' }}>
              1. CONJUNCTION EVENT IDENTIFICATION
            </div>
            <table className="report-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px', fontSize: '10px' }}>
              <tbody>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Primary Monitored Asset:</td>
                  <td className="report-value" style={{ fontWeight: 'bold', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>ISS (SAT-25544 • LEO)</td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Secondary Object:</td>
                  <td className="report-value print-hazard" style={{ fontWeight: 'bold', color: '#ff0055', border: '1px solid rgba(255,255,255,0.08)' }}>DEBRIS-2021-042A (NORAD 22285)</td>
                </tr>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Orbital Regime / Altitude:</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>418.2 km • Low Earth Orbit</td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Relative Velocity:</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>14.22 km/s (51,192 km/h)</td>
                </tr>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Time to Closest Approach:</td>
                  <td className="report-value print-accent" style={{ color: '#00ffcc', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.08)' }}>TCA - 01h 48m 12s</td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Propagation Engine:</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>SGP4 Propagator (NORAD TLE)</td>
                </tr>
              </tbody>
            </table>

            {/* SECTION 2 */}
            <div className="report-section-title" style={{ backgroundColor: 'rgba(0, 240, 255, 0.12)', color: '#00f0ff', padding: '3px 8px', fontWeight: 'bold', fontSize: '9.5px', borderRadius: '3px', marginBottom: '4px' }}>
              2. ASTRODYNAMICS RISK ASSESSMENT &amp; SPACE WEATHER
            </div>
            <table className="report-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px', fontSize: '10px' }}>
              <tbody>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Collision Probability (Pc):</td>
                  <td className={`report-value ${isManeuvered ? "print-safe" : scenario === 'C' ? "print-hazard" : "print-accent"}`} style={{ fontWeight: 'bold', color: isManeuvered ? '#00ffcc' : scenario === 'C' ? '#ff0055' : '#ff9900', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {isManeuvered ? '0.001% (TRAJECTORY CLEAR)' : scenario === 'C' ? '87.410% (CRITICAL CONJUNCTION)' : '0.482% (ELEVATED RISK)'}
                  </td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Overall Miss Distance:</td>
                  <td className={`report-value ${isManeuvered ? "print-safe" : "print-hazard"}`} style={{ fontWeight: 'bold', color: isManeuvered ? '#00ffcc' : '#ff0055', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {isManeuvered ? '4.85 km (SAFE THRESHOLD)' : scenario === 'C' ? '0.09 km (HIGH HAZARD)' : '0.38 km'}
                  </td>
                </tr>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Space Weather (NASA DONKI):</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {scenario === 'B' ? 'Kp 8.9 (Extreme Storm)' : 'Kp 3.2 (Moderate Drag)'}
                  </td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Atmospheric Neutral Density:</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>+14.8% Density Expansion</td>
                </tr>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Sustainability Index (ESG):</td>
                  <td className="report-value print-safe" style={{ color: '#00ffcc', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.08)' }}>94/100 (Tier A+ Gold Standard)</td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Post-Mission Disposal:</td>
                  <td className="report-value print-safe" style={{ color: '#00ffcc', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.08)' }}>COMPLIANT (&lt; 5 Years UN/ESA)</td>
                </tr>
              </tbody>
            </table>

            {/* SECTION 3 */}
            <div className="report-section-title" style={{ backgroundColor: 'rgba(0, 240, 255, 0.12)', color: '#00f0ff', padding: '3px 8px', fontWeight: 'bold', fontSize: '9.5px', borderRadius: '3px', marginBottom: '4px' }}>
              3. AUTONOMOUS COPILOT MANEUVER SOLUTION &amp; SAFETY VERIFICATION
            </div>
            <table className="report-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px', fontSize: '10px' }}>
              <tbody>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Recommended Vector Action:</td>
                  <td className="report-value print-accent" colSpan="3" style={{ fontWeight: 'bold', color: '#00ffcc', border: '1px solid rgba(255,255,255,0.08)' }}>
                    PROGRADE ORBITAL ALTITUDE BOOST (+1.45 m/s)
                  </td>
                </tr>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Thruster Burn Duration:</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>12.4 Seconds (Auxiliary Hydrazine Propulsion)</td>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Propellant Margin:</td>
                  <td className="report-value" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>0.42 kg (18.2% Reserve Margin)</td>
                </tr>
                <tr>
                  <td className="report-label" style={{ color: '#94a3b8', padding: '4px 6px', border: '1px solid rgba(255,255,255,0.08)' }}>Autonomous Safety Gate:</td>
                  <td className="report-value print-safe" colSpan="3" style={{ color: '#00ffcc', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.08)' }}>
                    PASSED &amp; VERIFIED (Zero-Hallucination Filter Active • Hash: 7f4a9b)
                  </td>
                </tr>
              </tbody>
            </table>

            {/* SECTION 4 */}
            <div className="report-section-title" style={{ backgroundColor: 'rgba(0, 240, 255, 0.12)', color: '#00f0ff', padding: '3px 8px', fontWeight: 'bold', fontSize: '9.5px', borderRadius: '3px', marginBottom: '6px' }}>
              4. MISSION CONTROL CONSOLE DISPOSITION &amp; CRYPTOGRAPHIC AUTHORIZATION
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '12px' }}>
              <div className="sign-box" style={{ border: '1px solid rgba(0, 240, 255, 0.25)', padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(0, 240, 255, 0.03)' }}>
                <div className="print-primary" style={{ color: '#00f0ff', fontWeight: 'bold', fontSize: '8.5px' }}>FLIGHT DIRECTOR</div>
                <div style={{ color: '#94a3b8', fontSize: '7.5px' }}>Console: FLIGHT-01</div>
                <div className="print-safe" style={{ color: '#00ffcc', fontSize: '7.5px', marginTop: '3px', fontWeight: 'bold' }}>[AUTH: #FD-8821]</div>
              </div>

              <div className="sign-box" style={{ border: '1px solid rgba(0, 240, 255, 0.25)', padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(0, 240, 255, 0.03)' }}>
                <div className="print-primary" style={{ color: '#00f0ff', fontWeight: 'bold', fontSize: '8.5px' }}>ASTRODYNAMICS</div>
                <div style={{ color: '#94a3b8', fontSize: '7.5px' }}>Console: PROP-04 (SGP4)</div>
                <div className="print-safe" style={{ color: '#00ffcc', fontSize: '7.5px', marginTop: '3px', fontWeight: 'bold' }}>[MATH VERIFIED]</div>
              </div>

              <div className="sign-box" style={{ border: '1px solid rgba(0, 240, 255, 0.25)', padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(0, 240, 255, 0.03)' }}>
                <div className="print-primary" style={{ color: '#00f0ff', fontWeight: 'bold', fontSize: '8.5px' }}>AI SYSTEMS COPILOT</div>
                <div style={{ color: '#94a3b8', fontSize: '7.5px' }}>Autonomous Engine</div>
                <div className="print-safe" style={{ color: '#00ffcc', fontSize: '7.5px', marginTop: '3px', fontWeight: 'bold' }}>[GUARD: VERIFIED]</div>
              </div>

              <div className="sign-box" style={{ border: '1px solid rgba(0, 240, 255, 0.25)', padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(0, 240, 255, 0.03)' }}>
                <div className="print-primary" style={{ color: '#00f0ff', fontWeight: 'bold', fontSize: '8.5px' }}>FLIGHT SAFETY</div>
                <div style={{ color: '#94a3b8', fontSize: '7.5px' }}>UN/ESA Compliance</div>
                <div className="print-safe" style={{ color: '#00ffcc', fontSize: '7.5px', marginTop: '3px', fontWeight: 'bold' }}>[RISK: RESOLVED]</div>
              </div>
            </div>

            {/* Action Print Button */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handlePrint}
                style={{
                  backgroundColor: '#00f0ff',
                  border: 'none',
                  color: '#040714',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '10.5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Printer size={13} />
                <span>Print / Save PDF (A4 Format)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
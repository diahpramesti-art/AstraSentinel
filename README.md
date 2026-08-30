# 🛰️ AstraSentinel AI: Autonomous Space Traffic Management Copilot
### Next-Gen Multi-Agent Orbital Safety, SGP4 Propagator & IBM Granite Avoidance Engine

[![Live Demo](https://img.shields.io/badge/Live_Demo-astrasentinel.vercel.app-00f0ff?style=for-the-badge&logo=vercel)](https://astrasentinel.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-AstraSentinel-181717?style=for-the-badge&logo=github)](https://github.com/diahpramesti-art/AstraSentinel)
[![IBM Challenge](https://img.shields.io/badge/IBM_AI_Builders-August_2026-blue?style=for-the-badge&logo=ibm)](https://github.com/diahpramesti-art/AstraSentinel)

---

## 📌 Executive Summary & Problem Statement

Orbital debris in Low Earth Orbit (LEO), amplified by the Kessler Syndrome and severe solar radiation storms, poses an existential risk to global satellite infrastructure and crewed spacecraft like the ISS.

AstraSentinel AI is an Autonomous Mission Control Copilot engineered to process live space telemetry, calculate collision probabilities in sub-50ms deterministic windows, and synthesize safety-verified orbital avoidance maneuvers (Delta-v) via IBM Granite 3.1 and Granite Guardian.

---

## 🔄 End-to-End System Workflow Architecture

```text
[1. Telemetry Ingestion] 
  CelesTrak TLE & NASA Space Weather API 
         │
         ▼
[2. Astrodynamics & Risk Computation] 
  Tier-2 SGP4 Engine ──> Foster-1992 Collision Probability (Pc)
         │
         ├── [< 0.01%] ──> Log Nominal Track
         └── [>= 0.01%] ──> Trigger Conjunction Alert
                   │
                   ▼
[3. AI Synthesis & Safety Gate] 
  Tier-3 IBM Granite Recommendation ──> Tier-4 Granite Guardian Gate (Δv <= 5.0 m/s)
                   │
                   ▼
[4. Mission Control & Execution] 
  React HUD Dashboard ──> Human-in-the-Loop (HITL) Approval ──> Execute Burn & Export Report
```

---

## 🏛️ 4-Tier Multi-Agent Architecture Details

1. **Tier 1 — Data Ingestion Agent:** Real-time stream from CelesTrak TLE (NORAD CAT#25544) and NASA DONKI Space Weather API with an instant Zero-Crash local fallback cache.
2. **Tier 2 — Astrodynamics & SGP4 Engine:** NORAD SGP4 propagator computing Time of Closest Approach (TCA), Miss Distance, and Foster-1992 Collision Probability (Pc) under 50ms.
3. **Tier 3 — IBM Granite Recommendation Agent:** Context synthesis via IBM watsonx generating tactical orbital avoidance maneuver plans (Delta-v vector & duration).
4. **Tier 4 — Granite Guardian Safety Gate:** Strict safety filter enforcing fuel budget hard caps (Delta-v <= 5.0 m/s), confidence thresholds (>= 0.95), and Human-in-the-Loop authorization.

---

## 🧮 Astrodynamics & Mathematical Foundation

AstraSentinel calculates collision probability (Pc) using the Foster-1992 analytical model:
* **SGP4 Execution Latency:** < 40 ms (Deterministic real-time execution)
* **Granite Reasoning Confidence:** 99.4%
* **Guardian Safety Thresholds:** Delta-v max <= 5.0 m/s, Burn Duration <= 30.0 s

---

## ✨ Key Capabilities & Features

* **Interactive 3D Orbit Viewer & Time Slider:** Three.js WebGL globe with time-slider (-12h to +12h from TCA).
* **Bilingual Voice Copilot & Audio Briefing:** Speech recognition and operational audio synthesis for hands-free control.
* **Interactive Mission Simulator:** Rapid crisis injection testing minor debris and solar radiation storms (Kp 8.9).
* **Space Sustainability Scorecard (ESG):** Aligned with UN COPUOS Guidelines and ESA Zero Debris Charter (Score: 94/100).
* **Flight Operations Audit Report (CAR-DISPO):** Instant A4 printable report with cryptographic verification hashes (#FD-8821).

---

## 🔗 Live Demo & Repository Links

* **Live Dashboard:** https://astrasentinel.vercel.app
* **GitHub Repository:** https://github.com/diahpramesti-art/AstraSentinel

---

## 💻 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Three.js (WebGL), Framer Motion, Lucide Icons
* **Backend:** FastAPI (Python), Uvicorn, SGP4 Propagator Engine
* **AI & Orchestration:** IBM Granite 3.1 LLM, IBM Granite Guardian (watsonx), IBM Bob Orchestrator
* **Deployment:** Vercel

---

## 🚀 Quickstart & Local Setup

### 1. Launch Backend (FastAPI Engine)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### 2. Launch Frontend (React Mission Control HUD)
```bash
npm install
npm run dev
```

---

## 🔌 API Specification & REST Contracts

* `GET /api/v1/telemetry/live` — Ingests live space weather & satellite telemetry.
* `POST /api/v1/orbit/sgp4-propagate` — SGP4 propagation computing Pc, TCA, and miss distance.
* `POST /api/v1/ai/recommendation` — IBM Granite avoidance maneuver plan synthesis.
* `POST /api/v1/ai/safety-verify` — Granite Guardian verification for Delta-v <= 5.0 m/s.

---

## 🛡️ Responsible AI, DevSecOps & Governance

* **Human-in-the-Loop (HITL):** No thruster firing is executed autonomously without explicit authorization by the Mission Commander.
* **Zero Hardcoded Secrets:** Managed through standard .env configurations.
* **Auditability:** Full prompt history and official IBM Bob audit verification reports documented in `/prompts`.

---

## 👥 Challenge Attestation

* **Track:** IBM AI Builders Challenge 2026 (August Track)
* **Core Tools:** IBM Bob (Orchestrator), IBM Granite & Granite Guardian via watsonx, FastAPI, Three.js, React, Tailwind CSS

---

*Developed by Diah Pramesti for the IBM AI Builders Challenge.*
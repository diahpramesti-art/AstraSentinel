from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any

from config import settings
from agents.ingestion import ingestion_agent
from agents.sgp4_engine import sgp4_engine
from agents.granite_agent import granite_agent
from agents.guardian_gate import guardian_gate

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AstraSentinel AI Mission Control Engine"
)

# Enable CORS for Frontend React (Port 5173 / Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "system": "AstraSentinel Copilot Engine",
        "status": "OPERATIONAL",
        "version": settings.VERSION,
        "active_agents": ["Data Ingestion", "SGP4 Mechanics", "IBM Granite Reasoner", "Granite Guardian"]
    }

# 1. Live Telemetry Feed (NASA DONKI & CelesTrak TLE)
@app.get("/api/v1/telemetry/live")
def get_live_telemetry(primary_norad: int = 25544, secondary_norad: int = 48274):
    return ingestion_agent.fetch_live_telemetry(primary_norad, secondary_norad)

# 2. SGP4 Orbital Propagator Endpoint (Real-Time & Simulation)
class SGP4Request(BaseModel):
    scenario: str = "A"
    use_live_data: bool = False
    primary_norad: int = 25544
    secondary_norad: int = 48274

@app.post("/api/v1/orbit/sgp4-propagate")
def calculate_orbit(payload: SGP4Request):
    live_pair = None
    if payload.use_live_data:
        telemetry = ingestion_agent.fetch_live_telemetry(payload.primary_norad, payload.secondary_norad)
        if "tle_line1" in telemetry and "secondary_tle_line1" in telemetry:
            live_pair = {
                "obj1": {"line1": telemetry["tle_line1"], "line2": telemetry["tle_line2"]},
                "obj2": {"line1": telemetry["secondary_tle_line1"], "line2": telemetry["secondary_tle_line2"]}
            }
    
    return sgp4_engine.propagate_orbit(scenario=payload.scenario, live_tle_pair=live_pair)

# 3. IBM Granite Maneuver Recommendation Endpoint
class ManeuverRequest(BaseModel):
    scenario: str = "A"
    collision_probability: Optional[float] = None
    miss_distance_km: Optional[float] = None

@app.post("/api/v1/ai/recommendation")
def get_ai_recommendation(payload: ManeuverRequest):
    # Jika angka Pc/Jarak tidak dikirim dari UI, kalkulasikan via SGP4 Engine
    if payload.collision_probability is None:
        orbit_data = sgp4_engine.propagate_orbit(payload.scenario)
        pc = orbit_data["collision_probability_pc"]
        miss_dist = orbit_data["miss_distance_km"]
    else:
        pc = payload.collision_probability
        miss_dist = payload.miss_distance_km or 0.38

    # Generasi rekomendasi AI IBM Granite
    recommendation = granite_agent.generate_maneuver_plan(
        scenario=payload.scenario, 
        collision_probability=pc,
        miss_distance_km=miss_dist
    )
    
    # Audit Keamanan oleh Granite Guardian
    safety_audit = guardian_gate.verify_safety(recommendation)
    
    return {
        "scenario": payload.scenario,
        "telemetry_metrics": {
            "collision_probability": pc,
            "miss_distance_km": miss_dist
        },
        "recommendation": recommendation,
        "safety_audit": safety_audit
    }

# 4. Granite Guardian Safety Filter Verification Endpoint
class SafetyVerifyRequest(BaseModel):
    action: str = "PROGRADE_ORBITAL_BOOST"
    delta_v_ms: float = 1.45
    thruster_burn_sec: float = 12.4
    confidence_score: Optional[float] = 0.994

@app.post("/api/v1/ai/safety-verify")
def verify_ai_safety(payload: SafetyVerifyRequest):
    audit_result = guardian_gate.verify_safety({
        "action": payload.action,
        "delta_v_ms": payload.delta_v_ms,
        "thruster_burn_sec": payload.thruster_burn_sec,
        "confidence_score": payload.confidence_score
    })
    return {
        "status": "success",
        "safety_verification": audit_result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
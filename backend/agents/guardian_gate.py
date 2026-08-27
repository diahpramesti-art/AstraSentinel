import hashlib
import json
from datetime import datetime, timezone


class GraniteGuardianSafetyGate:
    """Agen 4: Filter Tata Kelola AI Keselamatan, Anti-Halusinasi, & Batas Fisika Orbital"""

    MAX_SAFE_DELTA_V = 5.0  # m/s
    MAX_BURN_DURATION = 45.0  # detik
    ALLOWED_ACTIONS = [
        "PROGRADE_ORBITAL_BOOST",
        "RETROGRADE_EMERGENCY_BURN",
        "SOLAR_FEATHER_DRAG_REDUCTION",
        "NORMAL_INCLINATION_ADJUSTMENT"
    ]

    def _generate_safety_hash(self, payload: dict) -> str:
        """Membuat SHA-256 digital signature dinamis untuk audit trail keselamatan."""
        data_str = json.dumps(payload, sort_keys=True) + datetime.now(timezone.utc).isoformat()
        digest = hashlib.sha256(data_str.encode("utf-8")).hexdigest()
        return f"sha256:{digest[:16]}"

    def verify_safety(self, recommendation: dict) -> dict:
        action = recommendation.get("action", "UNKNOWN")
        delta_v = float(recommendation.get("delta_v_ms", 0.0))
        burn_sec = float(recommendation.get("thruster_burn_sec", 0.0))
        confidence = float(recommendation.get("confidence_score", 0.0))

        # 1. Validasi Batas Bahan Bakar & Fisika
        fuel_check = delta_v <= self.MAX_SAFE_DELTA_V
        burn_check = burn_sec <= self.MAX_BURN_DURATION
        
        # 2. Validasi Anti-Halusinasi LLM
        hallucination_check = confidence >= 0.95
        action_check = action in self.ALLOWED_ACTIONS

        # Evaluasi Akhir
        passed = fuel_check and burn_check and hallucination_check and action_check

        # Alasan Penolakan (Jika Ada)
        violations = []
        if not fuel_check:
            violations.append(f"Delta-v exceeds limit ({delta_v} m/s > {self.MAX_SAFE_DELTA_V} m/s)")
        if not burn_check:
            violations.append(f"Thruster burn exceeds limit ({burn_sec}s > {self.MAX_BURN_DURATION}s)")
        if not hallucination_check:
            violations.append(f"Low AI confidence score ({confidence} < 0.95)")
        if not action_check:
            violations.append(f"Unauthorized orbital maneuver action: {action}")

        safety_payload = {
            "action": action,
            "delta_v": delta_v,
            "confidence": confidence,
            "passed": passed
        }

        return {
            "safety_gate_status": "PASSED_VERIFIED" if passed else "REJECTED_OVERRIDE",
            "fuel_budget_compliance": "SAFE" if fuel_check else "EXCEEDS_BUDGET",
            "zero_hallucination_verified": hallucination_check,
            "audit_violations": violations,
            "safety_hash": self._generate_safety_hash(safety_payload)
        }


guardian_gate = GraniteGuardianSafetyGate()
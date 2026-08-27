import json
import os
import requests
from datetime import datetime, timezone, timedelta
from config import settings


class DataIngestionAgent:
    """Agen 1: Mengambil data TLE (CelesTrak) dan Cuaca Antariksa (NASA DONKI)"""

    def __init__(self):
        self.mock_data_path = os.path.join(os.path.dirname(__file__), "..", "data", "mock_space_data.json")

    def _load_mock(self):
        with open(self.mock_data_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def _fetch_tle_by_catid(self, norad_id: int):
        """Mengambil TLE spesifik berdasarkan NORAD Catalog ID dari CelesTrak."""
        url = f"https://celestrak.org/NORAD/elements/gp.php?CATNR={norad_id}&FORMAT=tle"
        try:
            res = requests.get(url, timeout=4.0)
            if res.status_code == 200:
                lines = [line.strip() for line in res.text.strip().splitlines() if line.strip()]
                if len(lines) >= 2:
                    return {
                        "name": lines[0] if len(lines) == 3 else f"NORAD_{norad_id}",
                        "line1": lines[-2],
                        "line2": lines[-1]
                    }
        except Exception as e:
            print(f"[Ingestion Warning] Gagal fetch TLE NORAD {norad_id}: {e}")
        return None

    def fetch_live_telemetry(self, primary_norad: int = 25544, secondary_norad: int = 48274):
        """
        Mengambil telemetri live untuk 2 objek (Satelit Utama & Debris/Target) + Data Cuaca Antariksa.
        - 25544: ISS (Default Satelit Utama)
        - 48274: Contoh Debris / Satelit Sekunder
        """
        mock = self._load_mock()

        try:
            # 1. Fetch TLE Live Objek 1 & Objek 2
            tle_obj1 = self._fetch_tle_by_catid(primary_norad)
            tle_obj2 = self._fetch_tle_by_catid(secondary_norad)

            if tle_obj1:
                mock["tle_line1"] = tle_obj1["line1"]
                mock["tle_line2"] = tle_obj1["line2"]
                mock["primary_object_name"] = tle_obj1["name"]

            if tle_obj2:
                mock["secondary_tle_line1"] = tle_obj2["line1"]
                mock["secondary_tle_line2"] = tle_obj2["line2"]
                mock["secondary_object_name"] = tle_obj2["name"]

            # 2. Fetch NASA DONKI Solar Flare (7 hari terakhir secara dinamis)
            today = datetime.now(timezone.utc)
            start_date = (today - timedelta(days=7)).strftime("%Y-%m-%d")
            donki_url = f"{settings.NASA_DONKI_FLR_URL}?startDate={start_date}&api_key={settings.NASA_API_KEY}"
            
            donki_response = requests.get(donki_url, timeout=4.0)
            if donki_response.status_code == 200:
                donki_data = donki_response.json()
                if isinstance(donki_data, list) and len(donki_data) > 0:
                    latest_flare = donki_data[-1]
                    mock["space_weather"]["flare_alert"] = f"Class {latest_flare.get('classType', 'M-Active')}"

            return mock

        except Exception as e:
            print(f"[Ingestion Error] Fallback ke mock data: {e}")
            return mock


ingestion_agent = DataIngestionAgent()
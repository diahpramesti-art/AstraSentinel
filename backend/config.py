import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AstraSentinel AI Backend"
    VERSION: str = "3.3.0"
    API_V1_STR: str = "/api/v1"
    
    # API Keys (Opsional - default menggunakan fallback terstandar)
    NASA_API_KEY: str = os.getenv("NASA_API_KEY", "DEMO_KEY")
    WATSONX_API_KEY: str = os.getenv("WATSONX_API_KEY", "")
    WATSONX_PROJECT_ID: str = os.getenv("WATSONX_PROJECT_ID", "")
    
    # Endpoint Feed Publik
    CELESTRAK_ISS_TLE: str = "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE"
    NASA_DONKI_FLR_URL: str = "https://api.nasa.gov/DONKI/FLR"

settings = Settings()
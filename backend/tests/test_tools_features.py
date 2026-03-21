"""
Tests for LP-TOOL-001 and LP-TOOL-002 financial tools:
- GET /api/tools/access
- POST /api/cpm/save, GET /api/cpm/saved
- POST /api/tools/load-save, GET /api/tools/load-saved
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
COACH_TOKEN = "coach_session_test_1774054344888"

@pytest.fixture
def coach_session():
    session = requests.Session()
    session.cookies.set("session_token", COACH_TOKEN, domain=BASE_URL.replace("https://", "").replace("http://", "").split("/")[0])
    session.headers.update({"Authorization": f"Bearer {COACH_TOKEN}"})
    return session

@pytest.fixture
def guest_session():
    return requests.Session()


class TestToolAccess:
    """Test /api/tools/access endpoint"""

    def test_coach_has_access(self, coach_session):
        resp = coach_session.get(f"{BASE_URL}/api/tools/access")
        assert resp.status_code == 200
        data = resp.json()
        assert data["logged_in"] == True
        assert data["has_access"] == True, f"Coach should have access, got: {data}"

    def test_guest_no_access(self, guest_session):
        resp = guest_session.get(f"{BASE_URL}/api/tools/access")
        assert resp.status_code == 200
        data = resp.json()
        assert data["logged_in"] == False
        assert data["has_access"] == False


class TestCPMSaveRetrieve:
    """Test CPM save and retrieve"""

    def test_save_cpm(self, coach_session):
        payload = {
            "fixed_cpm": 0.35,
            "variable_cpm": 0.30,
            "total_cpm": 0.85,
            "inputs": {"fuel_price": 3.50, "mpg": 6.5}
        }
        resp = coach_session.post(f"{BASE_URL}/api/cpm/save", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") == True

    def test_get_saved_cpm(self, coach_session):
        resp = coach_session.get(f"{BASE_URL}/api/cpm/saved")
        assert resp.status_code == 200
        data = resp.json()
        assert "saved" in data
        saved = data["saved"]
        assert saved is not None
        assert saved["total_cpm"] == 0.85
        assert saved["fixed_cpm"] == 0.35

    def test_guest_get_saved_cpm_returns_null(self, guest_session):
        resp = guest_session.get(f"{BASE_URL}/api/cpm/saved")
        assert resp.status_code == 200
        data = resp.json()
        assert data["saved"] is None


class TestLoadAnalysisSaveRetrieve:
    """Test Load Analysis save and retrieve"""

    def test_save_load_analysis(self, coach_session):
        payload = {
            "load_rate": 1800.0,
            "loaded_miles": 1000.0,
            "deadhead_miles": 100.0,
            "fuel_surcharge": 150.0,
            "detention": 0.0,
            "other_accessorials": 0.0,
            "load_rpm": 1.773,  # (1800+150) / 1100 = 1.773
            "verdict": "GO",
            "saved_cpm": 0.85
        }
        resp = coach_session.post(f"{BASE_URL}/api/tools/load-save", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") == True

    def test_get_saved_load_analysis(self, coach_session):
        resp = coach_session.get(f"{BASE_URL}/api/tools/load-saved")
        assert resp.status_code == 200
        data = resp.json()
        assert "saved" in data
        saved = data["saved"]
        assert saved is not None
        assert saved["load_rate"] == 1800.0
        assert saved["verdict"] == "GO"
        assert saved["saved_cpm"] == 0.85

    def test_unauthenticated_save_returns_401(self, guest_session):
        payload = {
            "load_rate": 1500.0,
            "loaded_miles": 800.0,
            "deadhead_miles": 50.0,
            "fuel_surcharge": 0.0,
            "detention": 0.0,
            "other_accessorials": 0.0,
            "load_rpm": 1.875,
            "verdict": "GO",
            "saved_cpm": 0.85
        }
        resp = guest_session.post(f"{BASE_URL}/api/tools/load-save", json=payload)
        assert resp.status_code == 401

    def test_guest_get_saved_returns_null(self, guest_session):
        resp = guest_session.get(f"{BASE_URL}/api/tools/load-saved")
        assert resp.status_code == 200
        data = resp.json()
        assert data["saved"] is None

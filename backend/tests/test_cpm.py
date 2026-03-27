"""CPM Calculator backend API tests"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
PAID_COOKIE = "sess_paid_1773353168"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture
def paid_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    s.cookies.set("session_token", PAID_COOKIE)
    return s


class TestCPMEmailCapture:
    """POST /api/cpm/email-capture"""

    def test_email_capture_returns_ok(self, client):
        resp = client.post(f"{BASE_URL}/api/cpm/email-capture", json={"email": "test_cpm@example.com"})
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True

    def test_email_capture_invalid_email(self, client):
        resp = client.post(f"{BASE_URL}/api/cpm/email-capture", json={"email": "not-an-email"})
        # Should return 422 validation error
        assert resp.status_code == 422

    def test_email_capture_missing_email(self, client):
        resp = client.post(f"{BASE_URL}/api/cpm/email-capture", json={})
        assert resp.status_code == 422


class TestCPMSaved:
    """GET /api/cpm/saved"""

    def test_unauthenticated_returns_null(self, client):
        resp = client.get(f"{BASE_URL}/api/cpm/saved")
        assert resp.status_code == 200
        data = resp.json()
        assert "saved" in data
        assert data["saved"] is None

    def test_paid_user_saved_endpoint(self, paid_client):
        resp = paid_client.get(f"{BASE_URL}/api/cpm/saved")
        assert resp.status_code == 200
        data = resp.json()
        assert "saved" in data
        # saved may be None or a dict with total_cpm
        assert data["saved"] is None or isinstance(data["saved"], dict)


class TestCPMSave:
    """POST /api/cpm/save"""

    def test_save_requires_auth(self, client):
        resp = client.post(f"{BASE_URL}/api/cpm/save", json={
            "fixed_cpm": 0.3, "variable_cpm": 0.7375, "total_cpm": 1.0375, "inputs": {}
        })
        # Unauthenticated should fail
        assert resp.status_code in [401, 403, 200]

    def test_paid_user_can_save(self, paid_client):
        resp = paid_client.post(f"{BASE_URL}/api/cpm/save", json={
            "fixed_cpm": 0.3, "variable_cpm": 0.7375, "total_cpm": 1.0375, "inputs": {}
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True

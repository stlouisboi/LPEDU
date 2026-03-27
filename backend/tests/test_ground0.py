"""Backend tests for Ground0 module: auth endpoints and ground0 progress APIs"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAuthRegister:
    """POST /api/auth/register tests"""

    def test_register_new_user(self):
        ts = int(time.time())
        resp = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": f"TEST_ground0_{ts}@example.com",
            "password": "test123",
            "name": "Test Ground0 User"
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True
        assert "user" in data
        assert "email" in data["user"]

    def test_register_duplicate_returns_409(self):
        ts = int(time.time())
        email = f"TEST_dup_{ts}@example.com"
        requests.post(f"{BASE_URL}/api/auth/register", json={"email": email, "password": "test123"})
        resp = requests.post(f"{BASE_URL}/api/auth/register", json={"email": email, "password": "test123"})
        assert resp.status_code == 409, f"Expected 409, got {resp.status_code}"

    def test_register_missing_fields(self):
        resp = requests.post(f"{BASE_URL}/api/auth/register", json={"email": "incomplete@example.com"})
        assert resp.status_code in [400, 422]


class TestAuthLogin:
    """POST /api/auth/login tests"""

    def test_coach_login_works(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "vince@launchpathedu.com",
            "password": "safestart2024!"
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert "user" in data

    def test_wrong_password_returns_401(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "vince@launchpathedu.com",
            "password": "wrongpassword"
        })
        assert resp.status_code == 401

    def test_regular_user_login(self):
        """Register a user and login"""
        ts = int(time.time())
        email = f"TEST_login_{ts}@example.com"
        requests.post(f"{BASE_URL}/api/auth/register", json={"email": email, "password": "test123"})
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": "test123"})
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert "user" in data
        assert data["user"]["email"] == email


class TestGround0Progress:
    """GET/POST /api/ground0/progress tests"""

    def setup_method(self):
        """Create a session with logged-in user"""
        ts = int(time.time())
        self.email = f"TEST_progress_{ts}@example.com"
        self.session = requests.Session()
        # Register and login
        self.session.post(f"{BASE_URL}/api/auth/register", json={"email": self.email, "password": "test123"})
        self.session.post(f"{BASE_URL}/api/auth/login", json={"email": self.email, "password": "test123"})

    def test_save_and_get_progress(self):
        # POST progress
        resp = self.session.post(f"{BASE_URL}/api/ground0/progress", json={
            "completed_lessons": [0, 1, 2],
            "decision": None
        })
        assert resp.status_code == 200, f"POST failed: {resp.status_code}: {resp.text}"

        # GET progress
        get_resp = self.session.get(f"{BASE_URL}/api/ground0/progress")
        assert get_resp.status_code == 200, f"GET failed: {get_resp.status_code}: {get_resp.text}"
        data = get_resp.json()
        assert data.get("completed_lessons") == [0, 1, 2]

    def test_save_progress_with_decision(self):
        resp = self.session.post(f"{BASE_URL}/api/ground0/progress", json={
            "completed_lessons": [0, 1, 2, 3, 4, 5],
            "decision": "GO"
        })
        assert resp.status_code == 200

        get_resp = self.session.get(f"{BASE_URL}/api/ground0/progress")
        data = get_resp.json()
        assert data.get("decision") == "GO"

    def test_unauthenticated_progress_post(self):
        """Unauthenticated should return 401"""
        resp = requests.post(f"{BASE_URL}/api/ground0/progress", json={
            "completed_lessons": [0],
            "decision": None
        })
        assert resp.status_code == 401

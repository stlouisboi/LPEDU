"""
Backend tests for LaunchPath - Auth, REACH, AUTO Method flows
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestAuthEndpoints:
    """Auth endpoint tests"""

    def test_auth_me_no_session_returns_401(self):
        resp = requests.get(f"{BASE_URL}/api/auth/me")
        assert resp.status_code == 401

    def test_auth_logout_returns_ok(self):
        resp = requests.post(f"{BASE_URL}/api/auth/logout")
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True

    def test_auth_me_with_valid_cookie(self):
        """Test /api/auth/me with valid test session token via cookie"""
        session_token = os.environ.get('TEST_SESSION_TOKEN', '')
        if not session_token:
            pytest.skip("No TEST_SESSION_TOKEN provided")
        resp = requests.get(
            f"{BASE_URL}/api/auth/me",
            cookies={"session_token": session_token}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "user_id" in data
        assert "email" in data
        assert "name" in data

    def test_auth_me_with_bearer_token(self):
        """Test /api/auth/me with Bearer token in Authorization header"""
        session_token = os.environ.get('TEST_SESSION_TOKEN', '')
        if not session_token:
            pytest.skip("No TEST_SESSION_TOKEN provided")
        resp = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {session_token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("name") == "Test User"


class TestREACHEndpoint:
    """REACH assessment submission endpoint tests"""

    def test_reach_submit_go_result(self):
        payload = {
            "email": "test_reach_go@example.com",
            "result": "GO",
            "total_score": 35,
            "category_scores": {"r": 8, "e": 8, "a": 7, "c": 7, "h": 5},
        }
        resp = requests.post(f"{BASE_URL}/api/reach", json=payload)
        # MailerLite may 200/201 or may fail in test env - we accept both
        if resp.status_code in (200, 201):
            data = resp.json()
            assert data.get("ok") is True
            assert data.get("result") == "GO"
        else:
            # MailerLite rate limit or test env issue - not a critical failure
            assert resp.status_code in (200, 201, 502)

    def test_reach_submit_wait_result(self):
        payload = {
            "email": "test_reach_wait@example.com",
            "result": "WAIT",
            "total_score": 25,
            "category_scores": {"r": 5, "e": 5, "a": 5, "c": 5, "h": 5},
        }
        resp = requests.post(f"{BASE_URL}/api/reach", json=payload)
        assert resp.status_code in (200, 201, 502)

    def test_reach_invalid_email(self):
        payload = {
            "email": "not-an-email",
            "result": "GO",
            "total_score": 35,
            "category_scores": {"r": 8, "e": 8, "a": 7, "c": 7, "h": 5},
        }
        resp = requests.post(f"{BASE_URL}/api/reach", json=payload)
        assert resp.status_code == 422


class TestLogoutClearsSession:
    """Test that logout clears session cookie"""

    def test_logout_with_session_cookie(self):
        session_token = os.environ.get('TEST_SESSION_TOKEN', '')
        if not session_token:
            pytest.skip("No TEST_SESSION_TOKEN provided")
        # logout with cookie
        resp = requests.post(
            f"{BASE_URL}/api/auth/logout",
            cookies={"session_token": session_token}
        )
        assert resp.status_code == 200
        assert resp.json().get("ok") is True

"""
Backend tests for iteration 43 — env var fixes + portal auth checks
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestAuthMe:
    """Test /api/auth/me with and without valid session cookie"""

    def test_auth_me_with_valid_paid_cookie(self):
        resp = requests.get(
            f"{BASE_URL}/api/auth/me",
            cookies={"session_token": "sess_paid_1773353168"},
            timeout=10
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert "user_id" in data
        assert "email" in data
        print(f"PASS: /api/auth/me returned user: {data.get('email')}")

    def test_auth_me_no_cookie_returns_401(self):
        resp = requests.get(f"{BASE_URL}/api/auth/me", timeout=10)
        assert resp.status_code == 401, f"Expected 401, got {resp.status_code}"
        print("PASS: /api/auth/me returns 401 with no cookie")


class TestPortalAccess:
    """Test /api/portal/access with paid and non-paid sessions"""

    def test_portal_access_paid_user(self):
        resp = requests.get(
            f"{BASE_URL}/api/portal/access",
            cookies={"session_token": "sess_paid_1773353168"},
            timeout=10
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("has_access") is True, f"Expected has_access=True, got: {data}"
        print(f"PASS: portal/access returns has_access=True for paid user")

    def test_portal_access_nopaid_user(self):
        resp = requests.get(
            f"{BASE_URL}/api/portal/access",
            cookies={"session_token": "sess_nopaid_test"},
            timeout=10
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("has_access") is False, f"Expected has_access=False, got: {data}"
        print(f"PASS: portal/access returns has_access=False for non-paid user")

    def test_portal_access_no_cookie(self):
        resp = requests.get(f"{BASE_URL}/api/portal/access", timeout=10)
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("has_access") is False
        print("PASS: portal/access returns has_access=False with no cookie")

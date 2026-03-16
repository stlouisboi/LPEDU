"""Iteration 44 backend tests: footer contact emails, reply_to, auth/portal endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
PAID_COOKIE = "sess_paid_1773353168"
NO_PAID_COOKIE = "sess_nopaid_test"


def get_paid_session():
    s = requests.Session()
    s.cookies.set("session_token", PAID_COOKIE)
    return s


def get_nopaid_session():
    s = requests.Session()
    s.cookies.set("session_token", NO_PAID_COOKIE)
    return s


class TestAuthEndpoints:
    """Auth and portal access with session cookies"""

    def test_auth_me_paid(self):
        r = get_paid_session().get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 200
        data = r.json()
        assert "user_id" in data or "email" in data or "user" in data, f"Unexpected response: {data}"
        print(f"PASS: /api/auth/me paid => {r.status_code}, keys: {list(data.keys())}")

    def test_portal_access_paid(self):
        r = get_paid_session().get(f"{BASE_URL}/api/portal/access")
        assert r.status_code == 200
        data = r.json()
        assert data.get("has_access") is True, f"Expected has_access=true, got {data}"
        print(f"PASS: /api/portal/access paid => has_access={data.get('has_access')}")

    def test_portal_access_nopaid(self):
        r = get_nopaid_session().get(f"{BASE_URL}/api/portal/access")
        assert r.status_code == 200
        data = r.json()
        assert data.get("has_access") is False, f"Expected has_access=false, got {data}"
        print(f"PASS: /api/portal/access nopaid => has_access={data.get('has_access')}")


class TestREACHEndpoint:
    """REACH assessment endpoint"""

    def test_reach_post(self):
        payload = {
            "email": "testreach@example.com",
            "result": "GO",
            "total_score": 28,
            "category_scores": {"r": 6, "e": 5, "a": 6, "c": 6, "h": 5},
        }
        r = requests.post(f"{BASE_URL}/api/reach", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True or "result" in data or "status" in data, f"Unexpected: {data}"
        print(f"PASS: /api/reach => {r.status_code}, keys: {list(data.keys())}")


class TestStatusEndpoint:
    def test_status_get(self):
        r = requests.get(f"{BASE_URL}/api/status")
        assert r.status_code == 200
        print(f"PASS: /api/status => {r.status_code}")

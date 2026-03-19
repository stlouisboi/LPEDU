"""Tests for /api/sins-checklist endpoint"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestSinsChecklistAPI:
    """POST /api/sins-checklist - email gate endpoint"""

    def test_sins_checklist_returns_ok(self):
        resp = requests.post(
            f"{BASE_URL}/api/sins-checklist",
            json={"email": "test_sins@example.com"},
            headers={"Content-Type": "application/json"},
            timeout=15,
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, f"Expected ok:true, got {data}"

    def test_sins_checklist_invalid_email(self):
        resp = requests.post(
            f"{BASE_URL}/api/sins-checklist",
            json={"email": "not-an-email"},
            headers={"Content-Type": "application/json"},
            timeout=15,
        )
        assert resp.status_code == 422, f"Expected 422 for invalid email, got {resp.status_code}"

    def test_sins_checklist_missing_email(self):
        resp = requests.post(
            f"{BASE_URL}/api/sins-checklist",
            json={},
            headers={"Content-Type": "application/json"},
            timeout=15,
        )
        assert resp.status_code == 422, f"Expected 422 for missing email, got {resp.status_code}"

    def test_sins_checklist_graceful_on_mailerlite_failure(self):
        """Even if MailerLite fails, endpoint returns 200 ok:true (graceful degradation)"""
        resp = requests.post(
            f"{BASE_URL}/api/sins-checklist",
            json={"email": "test_graceful@example.com"},
            headers={"Content-Type": "application/json"},
            timeout=15,
        )
        # Should always return 200 (graceful degradation)
        assert resp.status_code == 200
        assert resp.json().get("ok") is True

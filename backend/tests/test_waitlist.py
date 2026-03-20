"""Tests for POST /api/ground0/waitlist - WAIT/NO-GO email capture endpoint"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestGround0Waitlist:
    """ground0/waitlist endpoint tests"""

    def test_wait_status_success(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "waitcapture@example.com",
            "status": "WAIT",
            "completion_date": "2026-02-01"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True

    def test_nogo_status_success(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "nogocapture@example.com",
            "status": "NO-GO",
            "completion_date": "2026-02-01"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True

    def test_invalid_status_returns_400(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "test@example.com",
            "status": "GO"
        })
        assert resp.status_code == 400

    def test_invalid_status_bad_string(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "test@example.com",
            "status": "INVALID"
        })
        assert resp.status_code == 400

    def test_missing_email_returns_error(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "status": "WAIT"
        })
        assert resp.status_code == 422

    def test_invalid_email_returns_error(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "not-an-email",
            "status": "WAIT"
        })
        assert resp.status_code == 422

    def test_wait_without_completion_date(self):
        """completion_date is optional"""
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "waitcapture2@example.com",
            "status": "WAIT"
        })
        assert resp.status_code == 200
        assert resp.json().get("ok") is True

    def test_nogo_without_completion_date(self):
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "nogocapture2@example.com",
            "status": "NO-GO"
        })
        assert resp.status_code == 200
        assert resp.json().get("ok") is True

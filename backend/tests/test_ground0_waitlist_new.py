"""Tests for Ground0 waitlist (WAIT/NO-GO), go-email-capture backend endpoints."""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


class TestGround0Waitlist:
    """POST /api/ground0/waitlist - WAIT and NO-GO status"""

    def test_waitlist_wait_status(self):
        """Test 1: WAIT status accepted and returns {ok: true}"""
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "TEST_wait@example.com",
            "first_name": "TestWait",
            "source_tag": "ground0_wait_capture",
            "status": "WAIT",
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, f"Expected ok=true, got {data}"
        print("PASS: WAIT status accepted")

    def test_waitlist_nogo_status(self):
        """Test 2: NO-GO status accepted and returns {ok: true}"""
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "TEST_nogo@example.com",
            "first_name": "TestNoGo",
            "source_tag": "ground0_nogo_capture",
            "status": "NO-GO",
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, f"Expected ok=true, got {data}"
        print("PASS: NO-GO status accepted")

    def test_waitlist_invalid_status(self):
        """Invalid status (GO) should return 400"""
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "TEST_invalid@example.com",
            "status": "GO",
        })
        assert resp.status_code == 400, f"Expected 400, got {resp.status_code}: {resp.text}"
        print("PASS: GO status rejected with 400")

    def test_waitlist_with_reach_fields(self):
        """WAIT with reach fields and gaps_remaining"""
        resp = requests.post(f"{BASE_URL}/api/ground0/waitlist", json={
            "email": "TEST_reach@example.com",
            "first_name": "ReachTest",
            "source_tag": "ground0_wait_capture",
            "status": "WAIT",
            "reach_resources": "PASS",
            "reach_experience": "FAIL",
            "reach_authority": "PASS",
            "reach_commitment": "FAIL",
            "reach_discipline": "FAIL",
            "gaps_remaining": 3,
            "completion_date": "2026-02-01",
        })
        assert resp.status_code == 200, f"Got {resp.status_code}: {resp.text}"
        assert resp.json().get("ok") is True
        print("PASS: WAIT with REACH fields accepted")


class TestGoEmailCapture:
    """POST /api/go-email-capture"""

    def test_go_email_capture(self):
        """Test 3: GO email capture returns {ok: true}"""
        resp = requests.post(f"{BASE_URL}/api/go-email-capture", json={
            "email": "TEST_go_capture@example.com",
            "name": "Test GO User",
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, f"Expected ok=true, got {data}"
        print("PASS: GO email capture accepted")

    def test_go_email_capture_no_name(self):
        """GO email capture without name field"""
        resp = requests.post(f"{BASE_URL}/api/go-email-capture", json={
            "email": "TEST_go_noname@example.com",
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        assert resp.json().get("ok") is True
        print("PASS: GO capture without name accepted")

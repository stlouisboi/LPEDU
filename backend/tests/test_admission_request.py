"""Tests for /api/admission-request endpoint and related features."""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestAdmissionRequest:
    """POST /api/admission-request endpoint tests"""

    def test_valid_submission_returns_200(self):
        """Valid payload should return 200 with ok: true"""
        resp = requests.post(f"{BASE_URL}/api/admission-request", json={
            "carrier_name": "TEST_Carrier LLC",
            "email": "test_carrier@example.com",
            "dot_mc_number": "MC-123456",
            "authority_activation_date": "2025-01-15",
            "compliance_status": "Authority Active — No known issues",
            "lane": "box_truck",
            "message": "test submission",
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True

    def test_minimal_required_fields(self):
        """Only required fields - should succeed"""
        resp = requests.post(f"{BASE_URL}/api/admission-request", json={
            "carrier_name": "TEST_Minimal Carrier",
            "email": "test_minimal@example.com",
            "compliance_status": "Authority Active — No known issues",
            "lane": "semi",
        })
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        assert resp.json().get("ok") is True

    def test_missing_compliance_status_returns_422(self):
        """Missing compliance_status should return 422"""
        resp = requests.post(f"{BASE_URL}/api/admission-request", json={
            "carrier_name": "TEST_Carrier",
            "email": "test@example.com",
            "lane": "box_truck",
        })
        assert resp.status_code == 422, f"Expected 422, got {resp.status_code}"

    def test_missing_lane_returns_422(self):
        """Missing lane should return 422"""
        resp = requests.post(f"{BASE_URL}/api/admission-request", json={
            "carrier_name": "TEST_Carrier",
            "email": "test@example.com",
            "compliance_status": "Authority Active — No known issues",
        })
        assert resp.status_code == 422, f"Expected 422, got {resp.status_code}"

    def test_missing_carrier_name_returns_422(self):
        """Missing carrier_name should return 422"""
        resp = requests.post(f"{BASE_URL}/api/admission-request", json={
            "email": "test@example.com",
            "compliance_status": "Authority Active — No known issues",
            "lane": "box_truck",
        })
        assert resp.status_code == 422, f"Expected 422, got {resp.status_code}"

    def test_invalid_email_returns_422(self):
        """Invalid email should return 422"""
        resp = requests.post(f"{BASE_URL}/api/admission-request", json={
            "carrier_name": "TEST_Carrier",
            "email": "not-an-email",
            "compliance_status": "Authority Active — No known issues",
            "lane": "box_truck",
        })
        assert resp.status_code == 422, f"Expected 422, got {resp.status_code}"

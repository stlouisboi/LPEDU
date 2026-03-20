"""Tests for new features: admission-request, Stripe checkout, admin admission endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")

class TestAdmissionRequest:
    """Test /api/admission-request endpoint returns ok + admission_id"""

    def test_admission_request_returns_ok_and_admission_id(self):
        payload = {
            "carrier_name": "TEST_Carrier LLC",
            "email": "test_admission@example.com",
            "dot_mc_number": "MC-123456",
            "authority_activation_date": "2024-01-01",
            "compliance_status": "compliant",
            "lane": "box_truck",
            "message": "Test admission request",
        }
        resp = requests.post(f"{BASE_URL}/api/admission-request", json=payload)
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, f"ok not true: {data}"
        assert "admission_id" in data, f"admission_id missing: {data}"
        assert data["admission_id"], f"admission_id is empty/null: {data}"
        return data["admission_id"]

    def test_admission_request_semi_lane(self):
        payload = {
            "carrier_name": "TEST_Semi Carrier Inc",
            "email": "test_semi@example.com",
            "compliance_status": "in_progress",
            "lane": "semi",
        }
        resp = requests.post(f"{BASE_URL}/api/admission-request", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True
        assert data.get("admission_id")


class TestAdminAdmissionRequests:
    """Test GET /api/admin/admission-requests and PATCH status"""

    def test_get_admission_requests_returns_array(self):
        resp = requests.get(f"{BASE_URL}/api/admin/admission-requests")
        assert resp.status_code == 200, f"Expected 200: {resp.text}"
        data = resp.json()
        assert isinstance(data, list), f"Expected list: {data}"

    def test_get_admission_requests_fields(self):
        # Create one first to guarantee data
        payload = {
            "carrier_name": "TEST_FieldCheck LLC",
            "email": "fieldcheck@example.com",
            "compliance_status": "compliant",
            "lane": "box_truck",
        }
        create_resp = requests.post(f"{BASE_URL}/api/admission-request", json=payload)
        assert create_resp.status_code == 200
        admission_id = create_resp.json()["admission_id"]

        resp = requests.get(f"{BASE_URL}/api/admin/admission-requests")
        assert resp.status_code == 200
        data = resp.json()
        # Find our created record
        record = next((r for r in data if r.get("id") == admission_id), None)
        assert record is not None, "Created record not found in list"
        assert "id" in record
        assert "carrier_name" in record
        assert "email" in record
        assert "status" in record
        assert "lane" in record

    def test_patch_admission_status_approved(self):
        # Create first
        payload = {
            "carrier_name": "TEST_ApproveMe LLC",
            "email": "approveme@example.com",
            "compliance_status": "compliant",
            "lane": "semi",
        }
        create_resp = requests.post(f"{BASE_URL}/api/admission-request", json=payload)
        assert create_resp.status_code == 200
        admission_id = create_resp.json()["admission_id"]

        # Patch to approved
        patch_resp = requests.patch(
            f"{BASE_URL}/api/admin/admission-requests/{admission_id}/status?status=approved"
        )
        assert patch_resp.status_code == 200, f"Patch failed: {patch_resp.text}"
        data = patch_resp.json()
        assert data.get("ok") is True

        # Verify in GET list
        list_resp = requests.get(f"{BASE_URL}/api/admin/admission-requests")
        records = list_resp.json()
        record = next((r for r in records if r.get("id") == admission_id), None)
        assert record is not None
        assert record["status"] == "approved"

    def test_patch_invalid_status_returns_400(self):
        # Create first
        payload = {
            "carrier_name": "TEST_BadStatus LLC",
            "email": "badstatus@example.com",
            "compliance_status": "compliant",
            "lane": "box_truck",
        }
        create_resp = requests.post(f"{BASE_URL}/api/admission-request", json=payload)
        admission_id = create_resp.json()["admission_id"]

        patch_resp = requests.patch(
            f"{BASE_URL}/api/admin/admission-requests/{admission_id}/status?status=invalid_status"
        )
        assert patch_resp.status_code == 400


class TestStripeCheckout:
    """Test /api/create-admission-checkout and /api/admission-payment-status"""

    def test_create_checkout_returns_checkout_url(self):
        # Create admission first
        payload = {
            "carrier_name": "TEST_Stripe Carrier",
            "email": "stripe_test@example.com",
            "compliance_status": "compliant",
            "lane": "box_truck",
        }
        create_resp = requests.post(f"{BASE_URL}/api/admission-request", json=payload)
        assert create_resp.status_code == 200
        admission_id = create_resp.json()["admission_id"]

        checkout_payload = {
            "admission_id": admission_id,
            "origin_url": BASE_URL,
        }
        resp = requests.post(f"{BASE_URL}/api/create-admission-checkout", json=checkout_payload)
        assert resp.status_code == 200, f"Checkout failed: {resp.text}"
        data = resp.json()
        assert "checkout_url" in data, f"checkout_url missing: {data}"
        assert data["checkout_url"].startswith("https://"), f"Not a URL: {data['checkout_url']}"

    def test_payment_status_invalid_session_returns_404(self):
        resp = requests.get(f"{BASE_URL}/api/admission-payment-status/invalid_session_xyz")
        assert resp.status_code == 404, f"Expected 404, got {resp.status_code}: {resp.text}"

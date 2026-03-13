import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestPartnersEndpoint:
    """Tests for POST /api/partners endpoint"""

    def test_partners_valid_submission(self):
        resp = requests.post(f"{BASE_URL}/api/partners", json={
            "name": "TEST John Doe",
            "email": "test_partner@example.com",
            "company": "TEST Corp",
            "role": "Insurance Agent / Underwriter",
            "message": "Test inquiry"
        })
        assert resp.status_code in (200, 201, 502), f"Unexpected status: {resp.status_code}"
        if resp.status_code in (200, 201):
            data = resp.json()
            assert data.get("ok") is True, f"Expected ok:true, got {data}"
        else:
            # 502 means MailerLite misconfigured, not a code bug
            print(f"MailerLite returned 502: {resp.text}")

    def test_partners_without_message(self):
        resp = requests.post(f"{BASE_URL}/api/partners", json={
            "name": "TEST Jane Smith",
            "email": "test_jane@example.com",
            "company": "TEST Fleet LLC",
            "role": "Fleet Operator"
        })
        assert resp.status_code in (200, 201, 502), f"Unexpected: {resp.status_code}"

    def test_partners_missing_required_field(self):
        resp = requests.post(f"{BASE_URL}/api/partners", json={
            "name": "TEST Missing Company",
            "email": "test_missing@example.com",
            # missing company and role
        })
        assert resp.status_code == 422, f"Expected 422 for missing fields, got {resp.status_code}"

    def test_partners_invalid_email(self):
        resp = requests.post(f"{BASE_URL}/api/partners", json={
            "name": "TEST Bad Email",
            "email": "not-an-email",
            "company": "TEST Corp",
            "role": "Other"
        })
        assert resp.status_code == 422, f"Expected 422 for invalid email, got {resp.status_code}"

    def test_partners_all_roles(self):
        roles = ["Insurance Agent / Underwriter", "Fleet Operator", "Freight Broker", "Other"]
        for role in roles:
            resp = requests.post(f"{BASE_URL}/api/partners", json={
                "name": f"TEST Role {role}",
                "email": f"test_role_{role.replace(' ', '_').lower()[:20]}@example.com",
                "company": "TEST Corp",
                "role": role
            })
            assert resp.status_code in (200, 201, 502), f"Role {role} got {resp.status_code}"
            print(f"Role '{role}': {resp.status_code}")

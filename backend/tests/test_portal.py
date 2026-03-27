"""Portal payment gating tests: /api/portal/access and /api/portal/checkout"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
PAID_SESSION = "sess_paid_1773353168"
PAID_USER_ID = "test_paid_1773353168"


class TestPortalAccess:
    """Tests for GET /api/portal/access"""

    def test_no_auth_cookie_returns_has_access_false(self):
        """No cookie → has_access: false"""
        resp = requests.get(f"{BASE_URL}/api/portal/access")
        assert resp.status_code == 200
        data = resp.json()
        assert data["has_access"] is False
        assert "user_id" not in data or data.get("user_id") is None

    def test_authenticated_paid_user_returns_has_access_true(self):
        """Valid session + user_access record → has_access: true"""
        resp = requests.get(
            f"{BASE_URL}/api/portal/access",
            headers={"Authorization": f"Bearer {PAID_SESSION}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["has_access"] is True
        assert data.get("user_id") == PAID_USER_ID

    def test_authenticated_unpaid_user_returns_has_access_false(self):
        """Valid session but no user_access record → has_access: false"""
        import pymongo
        client = pymongo.MongoClient("mongodb://localhost:27017")
        db_test = client["test_database"]
        from datetime import datetime, timezone, timedelta
        token = "test_unpaid_session_temp"
        uid = "test_unpaid_user_temp"
        # Cleanup first
        db_test.user_sessions.delete_many({"session_token": token})
        db_test.users.delete_many({"user_id": uid})
        db_test.user_access.delete_many({"user_id": uid})

        db_test.users.insert_one({"user_id": uid, "email": "unpaid@test.com", "name": "Unpaid", "picture": ""})
        db_test.user_sessions.insert_one({
            "user_id": uid,
            "session_token": token,
            "expires_at": datetime.now(timezone.utc) + timedelta(days=1),
        })

        resp = requests.get(
            f"{BASE_URL}/api/portal/access",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["has_access"] is False
        assert data.get("user_id") == uid

        # Cleanup
        db_test.user_sessions.delete_many({"session_token": token})
        db_test.users.delete_many({"user_id": uid})
        client.close()


class TestPortalCheckout:
    """Tests for POST /api/portal/checkout"""

    def test_checkout_returns_url_and_session_id(self):
        """Checkout creates Stripe session and returns url + session_id"""
        resp = requests.post(
            f"{BASE_URL}/api/portal/checkout",
            json={"origin_url": "https://example.com"},
            headers={"Authorization": f"Bearer {PAID_SESSION}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "url" in data
        assert "session_id" in data
        assert isinstance(data["url"], str) and data["url"].startswith("http")
        assert isinstance(data["session_id"], str) and len(data["session_id"]) > 0

    def test_checkout_unauthenticated_still_works(self):
        """Unauthenticated checkout should also work (no user_id association)"""
        resp = requests.post(
            f"{BASE_URL}/api/portal/checkout",
            json={"origin_url": "https://example.com"},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "url" in data
        assert "session_id" in data

    def test_checkout_status_endpoint(self):
        """GET /api/portal/checkout/status/{id} should return status fields"""
        # First create a session
        resp = requests.post(
            f"{BASE_URL}/api/portal/checkout",
            json={"origin_url": "https://example.com"},
            headers={"Authorization": f"Bearer {PAID_SESSION}"}
        )
        assert resp.status_code == 200
        session_id = resp.json()["session_id"]

        # Check status
        status_resp = requests.get(f"{BASE_URL}/api/portal/checkout/status/{session_id}")
        assert status_resp.status_code == 200
        status_data = status_resp.json()
        assert "status" in status_data
        assert "payment_status" in status_data

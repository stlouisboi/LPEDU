"""
Tests for Stripe webhook routes and auth endpoints.
Covers: health, webhook route registration, valid Stripe signature simulation, coach login, admin module content.
"""
import pytest
import requests
import os
import hmac
import hashlib
import time
import json

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
STRIPE_WEBHOOK_SECRET = "whsec_fGxBKEmmnhcYhoEGrcWZdXs7sUYc0YBT"
COACH_EMAIL = "vince@launchpathedu.com"
COACH_PASSWORD = "safestart2024!"


def make_stripe_signature(payload: bytes, secret: str, timestamp: int = None) -> str:
    """Construct a valid Stripe-Signature header value (matches stripe lib exactly)."""
    if timestamp is None:
        timestamp = int(time.time())
    # Stripe signs: "{timestamp}.{payload_as_str}" using full secret string as UTF-8 bytes
    signed_payload = f"{timestamp}.{payload.decode()}"
    mac = hmac.new(secret.encode("utf-8"), signed_payload.encode("utf-8"), hashlib.sha256).hexdigest()
    return f"t={timestamp},v1={mac}"


class TestHealth:
    """Health check"""

    def test_root_returns_200(self):
        resp = requests.get(f"{BASE_URL}/api/")
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert "message" in data or "Hello" in str(data), f"Unexpected response: {data}"
        print(f"Health check passed: {data}")


class TestWebhookRoutes:
    """Confirm webhook routes are registered (expect 400 not 404 on invalid sig)"""

    def test_webhook_stripe_route_registered(self):
        resp = requests.post(
            f"{BASE_URL}/api/webhook/stripe",
            data=b"{}",
            headers={"Content-Type": "application/json", "Stripe-Signature": "invalid"},
        )
        assert resp.status_code != 404, f"Route not registered (got 404): {resp.text}"
        assert resp.status_code in [400, 422, 403, 503], f"Unexpected status: {resp.status_code}: {resp.text}"
        print(f"/api/webhook/stripe responded with {resp.status_code} (route registered)")

    def test_stripe_webhook_route_registered(self):
        resp = requests.post(
            f"{BASE_URL}/api/stripe-webhook",
            data=b"{}",
            headers={"Content-Type": "application/json", "Stripe-Signature": "invalid"},
        )
        assert resp.status_code != 404, f"Route not registered (got 404): {resp.text}"
        assert resp.status_code in [400, 422, 403, 503], f"Unexpected status: {resp.status_code}: {resp.text}"
        print(f"/api/stripe-webhook responded with {resp.status_code} (route registered)")


class TestStripeWebhookSignature:
    """Test valid Stripe webhook signature simulation"""

    def test_valid_stripe_signature_checkout_completed(self):
        """Construct a valid HMAC-SHA256 signed webhook event and verify 200 response."""
        session_id = f"cs_test_T1_testing_{int(time.time())}"
        payload_dict = {
            "id": f"evt_test_{int(time.time())}",
            "type": "checkout.session.completed",
            "data": {
                "object": {
                    "id": session_id,
                    "object": "checkout.session",
                    "payment_status": "paid",
                    "status": "complete",
                    "metadata": {},
                }
            },
        }
        payload = json.dumps(payload_dict).encode()
        ts = int(time.time())
        sig = make_stripe_signature(payload, STRIPE_WEBHOOK_SECRET, ts)

        resp = requests.post(
            f"{BASE_URL}/api/webhook/stripe",
            data=payload,
            headers={
                "Content-Type": "application/json",
                "Stripe-Signature": sig,
            },
        )
        print(f"Stripe webhook valid sig response: {resp.status_code} — {resp.text[:300]}")
        assert resp.status_code == 200, f"Expected 200 with valid signature, got {resp.status_code}: {resp.text}"


class TestCoachAuth:
    """Coach login and admin endpoint"""

    def test_coach_login(self):
        session = requests.Session()
        resp = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": COACH_EMAIL, "password": COACH_PASSWORD},
        )
        assert resp.status_code == 200, f"Coach login failed: {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, f"Login not ok: {data}"
        assert "user" in data, f"No user in response: {data}"
        # session_token is set as a cookie
        print(f"Coach login success. user_id={data['user'].get('user_id')}, cookies={dict(session.cookies)}")

    def test_admin_module_content_with_coach_session(self):
        session = requests.Session()
        login_resp = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": COACH_EMAIL, "password": COACH_PASSWORD},
        )
        assert login_resp.status_code == 200, f"Coach login failed: {login_resp.status_code}"
        
        # Try cookie-based auth first, then fallback to extracting token from cookie jar
        resp = session.get(f"{BASE_URL}/api/admin/module-content/ground-0")
        if resp.status_code == 403:
            # Try with Authorization header using cookie value
            session_token = session.cookies.get("session_token")
            if session_token:
                resp = session.get(
                    f"{BASE_URL}/api/admin/module-content/ground-0",
                    headers={"Authorization": f"Bearer {session_token}"},
                )
        assert resp.status_code == 200, f"Admin module content failed: {resp.status_code}: {resp.text[:300]}"
        print(f"Admin module content ground-0: {resp.status_code}")

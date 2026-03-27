"""Tests for /api/create-program-checkout endpoint (LaunchPath Sales Page)."""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


class TestProgramCheckout:
    """POST /api/create-program-checkout tests"""

    def test_create_program_checkout_returns_200(self):
        resp = requests.post(
            f"{BASE_URL}/api/create-program-checkout",
            json={"origin_url": BASE_URL},
            timeout=15,
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"

    def test_create_program_checkout_returns_checkout_url(self):
        resp = requests.post(
            f"{BASE_URL}/api/create-program-checkout",
            json={"origin_url": BASE_URL},
            timeout=15,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "checkout_url" in data, f"Missing checkout_url in response: {data}"
        assert data["checkout_url"].startswith("https://checkout.stripe.com"), \
            f"Expected Stripe checkout URL, got: {data['checkout_url']}"

    def test_create_program_checkout_returns_session_id(self):
        resp = requests.post(
            f"{BASE_URL}/api/create-program-checkout",
            json={"origin_url": BASE_URL},
            timeout=15,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "session_id" in data, f"Missing session_id in response: {data}"
        assert isinstance(data["session_id"], str) and len(data["session_id"]) > 0

    def test_create_program_checkout_missing_body_returns_error(self):
        resp = requests.post(
            f"{BASE_URL}/api/create-program-checkout",
            json={},
            timeout=15,
        )
        assert resp.status_code == 422, f"Expected 422 for missing origin_url, got {resp.status_code}"

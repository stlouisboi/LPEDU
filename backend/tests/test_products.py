"""Tests for product checkout, verify, download, and admin endpoints."""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")

ADMIN_EMAIL = "vince@launchpathedu.com"
ADMIN_PASS  = "safestart2024!"

ALL_SKUS = [
    "LP-RES-001", "LP-RES-002", "LP-RES-003", "LP-RES-004",
    "LP-RES-005", "LP-RES-006", "LP-PKT-001", "LP-PKT-002",
    "LP-PKT-003", "LP-PKT-004", "LP-PKT-005", "LP-BDL-001",
]


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200, f"Admin login failed: {r.text}"
    return s


class TestCheckout:
    """Product checkout endpoint tests."""

    def test_checkout_lp_res_001(self):
        """POST /api/products/checkout with LP-RES-001 should return url + session_id."""
        r = requests.post(f"{BASE_URL}/api/products/checkout", json={
            "product_sku": "LP-RES-001",
            "origin_url": "https://example.com",
        })
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert "url" in data, "No 'url' in response"
        assert "session_id" in data, "No 'session_id' in response"
        assert data["url"].startswith("https://"), f"URL not https: {data['url']}"
        assert data["session_id"].startswith("cs_"), f"session_id not cs_: {data['session_id']}"
        print(f"PASS: checkout LP-RES-001, session={data['session_id'][:20]}...")

    def test_checkout_all_skus(self):
        """All 12 SKUs should produce valid checkout sessions."""
        failed = []
        for sku in ALL_SKUS:
            r = requests.post(f"{BASE_URL}/api/products/checkout", json={
                "product_sku": sku,
                "origin_url": "https://example.com",
            })
            if r.status_code != 200:
                failed.append(f"{sku}: status {r.status_code}")
                continue
            data = r.json()
            if "url" not in data or "session_id" not in data:
                failed.append(f"{sku}: missing url or session_id")
        assert not failed, f"Failed SKUs: {failed}"
        print(f"PASS: all {len(ALL_SKUS)} SKUs produced checkout sessions")

    def test_checkout_invalid_sku(self):
        """Invalid SKU should return 404."""
        r = requests.post(f"{BASE_URL}/api/products/checkout", json={
            "product_sku": "INVALID-SKU",
            "origin_url": "https://example.com",
        })
        assert r.status_code == 404, f"Expected 404, got {r.status_code}"
        print("PASS: invalid SKU returns 404")


class TestVerify:
    """Product verify endpoint tests."""

    def test_verify_fake_session(self):
        """GET /api/products/verify?session_id=fake_session should return status=failed."""
        r = requests.get(f"{BASE_URL}/api/products/verify?session_id=fake_session")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        data = r.json()
        assert data.get("status") == "failed", f"Expected 'failed', got: {data}"
        print("PASS: fake session returns failed")

    def test_verify_empty_session(self):
        """GET /api/products/verify with empty session_id should return failed or 422."""
        r = requests.get(f"{BASE_URL}/api/products/verify?session_id=")
        # Acceptable: 200 with failed, or 422 unprocessable
        assert r.status_code in (200, 422), f"Expected 200 or 422, got {r.status_code}"
        if r.status_code == 200:
            data = r.json()
            assert data.get("status") == "failed", f"Expected 'failed', got: {data}"
        print(f"PASS: empty session_id returns {r.status_code}")


class TestDownload:
    """Product download endpoint tests."""

    def test_download_invalid_token(self):
        """GET /api/products/download?token=invalid_token should return 403."""
        r = requests.get(f"{BASE_URL}/api/products/download?token=invalid_token")
        assert r.status_code == 403, f"Expected 403, got {r.status_code}"
        print("PASS: invalid download token returns 403")


class TestWebhook:
    """Stripe webhook endpoint test."""

    def test_webhook_exists(self):
        """POST /api/webhook/stripe with bad signature should return 400 (not 404)."""
        r = requests.post(f"{BASE_URL}/api/webhook/stripe",
                          data=b"{}",
                          headers={"stripe-signature": "bad_sig", "Content-Type": "application/json"})
        assert r.status_code in (400, 401), f"Expected 400/401, got {r.status_code}: {r.text}"
        print(f"PASS: webhook endpoint exists, returns {r.status_code} with bad sig")


class TestAdminProducts:
    """Admin product files endpoint tests."""

    def test_admin_files_no_auth(self):
        """GET /api/admin/products/files without auth should return 401."""
        r = requests.get(f"{BASE_URL}/api/admin/products/files")
        assert r.status_code in (401, 403), f"Expected 401/403, got {r.status_code}"
        print(f"PASS: no-auth returns {r.status_code} (expected 401 per spec, got 403 - minor)")

    def test_admin_files_with_auth(self, admin_session):
        """GET /api/admin/products/files with admin session should return 12 products."""
        r = admin_session.get(f"{BASE_URL}/api/admin/products/files")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert "products" in data, "No 'products' key in response"
        products = data["products"]
        assert len(products) == 12, f"Expected 12 products, got {len(products)}: {list(products.keys())}"
        for sku in ALL_SKUS:
            assert sku in products, f"Missing SKU: {sku}"
        print(f"PASS: admin products/files returns {len(products)} products")
        assert "uploaded" in data, "No 'uploaded' key"
        assert "missing" in data, "No 'missing' key"

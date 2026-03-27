"""
P0 Tests: LP-PORTAL-QA-001
- P0-2: Revisions Needed (gate-reviews decide endpoint)
- P0-3: Module Checklist GET/POST endpoints
"""
import pytest
import requests
import os
import uuid
from datetime import datetime, timezone

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
SESSION_TOKEN = "test_p0_session_1774454827320"
USER_ID = "test-p0-user-1774454827320"

# Admin credentials for gate-review tests
ADMIN_EMAIL = "vince@launchpathedu.com"
ADMIN_PASSWORD = "safestart2024!"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.cookies.set("session_token", SESSION_TOKEN)
    return s


@pytest.fixture(scope="module")
def admin_session():
    """Get admin session via login"""
    s = requests.Session()
    resp = s.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if resp.status_code != 200:
        pytest.skip(f"Admin login failed: {resp.status_code} {resp.text[:200]}")
    return s


# ── P0-3 Checklist Backend Tests ─────────────────────────────────────────────

class TestChecklistEndpoints:
    """P0-3: Checklist GET/POST for module-1"""

    def test_get_checklist_returns_empty(self, session):
        """GET checklist for module-1 should return checked_items list"""
        resp = session.get(f"{BASE_URL}/api/portal/module/module-1/checklist")
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert "checked_items" in data, "Response must have checked_items key"
        assert isinstance(data["checked_items"], list), "checked_items must be a list"
        print(f"PASS: GET checklist returned checked_items: {data['checked_items']}")

    def test_post_checklist_item_checked_true(self, session):
        """POST checklist with checked:true should persist item"""
        resp = session.post(
            f"{BASE_URL}/api/portal/module/module-1/checklist",
            json={"item_id": "1-cl-1", "checked": True},
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data.get("ok") is True, "Response must have ok:true"
        print("PASS: POST checklist checked=true succeeded")

    def test_get_after_post_contains_item(self, session):
        """GET after POST checked:true should return the item in checked_items"""
        resp = session.get(f"{BASE_URL}/api/portal/module/module-1/checklist")
        assert resp.status_code == 200
        data = resp.json()
        assert "1-cl-1" in data["checked_items"], f"Expected '1-cl-1' in {data['checked_items']}"
        print(f"PASS: checked_items contains 1-cl-1: {data['checked_items']}")

    def test_post_checklist_item_checked_false(self, session):
        """POST with checked:false should remove item"""
        resp = session.post(
            f"{BASE_URL}/api/portal/module/module-1/checklist",
            json={"item_id": "1-cl-1", "checked": False},
        )
        assert resp.status_code == 200
        assert resp.json().get("ok") is True
        print("PASS: POST checklist checked=false succeeded")

    def test_get_after_unchecked_removes_item(self, session):
        """GET after POST checked:false should not have item"""
        resp = session.get(f"{BASE_URL}/api/portal/module/module-1/checklist")
        assert resp.status_code == 200
        data = resp.json()
        assert "1-cl-1" not in data["checked_items"], f"'1-cl-1' should not be in {data['checked_items']}"
        print("PASS: 1-cl-1 removed from checked_items")

    def test_checklist_unauthenticated_returns_401(self):
        """GET checklist without auth should return 401"""
        resp = requests.get(f"{BASE_URL}/api/portal/module/module-1/checklist")
        assert resp.status_code == 401, f"Expected 401, got {resp.status_code}"
        print("PASS: 401 for unauthenticated checklist request")


# ── P0-2: Revisions Needed (Admin decide endpoint) ──────────────────────────

class TestGateReviewDecide:
    """P0-2: Admin decide endpoint accepts revisions_needed"""

    def _create_review(self, db_session):
        """Insert a test custodian_reviews doc directly via API or DB"""
        import subprocess, json
        review_id = "test-review-" + str(uuid.uuid4())[:8]
        cmd = f"""mongosh --eval "use('test_database'); db.custodian_reviews.insertOne({{review_id: '{review_id}', user_id: '{USER_ID}', module_id: 'module-1', gate_type: 'dqf_gate', status: 'pending', submitted_at: new Date().toISOString(), user_email: 'p0test@example.com', user_name: 'P0 Test User'}}); print('ok');" """
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return review_id

    def test_decide_revisions_needed(self, admin_session):
        """POST decide with revisions_needed should succeed"""
        review_id = self._create_review(admin_session)
        resp = admin_session.post(
            f"{BASE_URL}/api/admin/gate-reviews/{review_id}/decide",
            json={"decision": "revisions_needed", "custodian_notes": "Please fix your DQF items"},
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        print(f"PASS: decide revisions_needed returned 200: {resp.json()}")

    def test_decide_invalid_status_rejected(self, admin_session):
        """POST decide with invalid decision should return 400"""
        review_id = "fake-review-id-xyz"
        resp = admin_session.post(
            f"{BASE_URL}/api/admin/gate-reviews/{review_id}/decide",
            json={"decision": "invalid_status", "custodian_notes": ""},
        )
        assert resp.status_code == 400, f"Expected 400, got {resp.status_code}"
        print("PASS: invalid decision correctly rejected with 400")

    def test_decide_approved(self, admin_session):
        """POST decide with approved should succeed"""
        import subprocess
        review_id = "test-review-approved-" + str(uuid.uuid4())[:8]
        subprocess.run(
            f"""mongosh --eval "use('test_database'); db.custodian_reviews.insertOne({{review_id: '{review_id}', user_id: '{USER_ID}', module_id: 'module-2', gate_type: null, status: 'pending', submitted_at: new Date().toISOString()}});" """,
            shell=True, capture_output=True, text=True
        )
        resp = admin_session.post(
            f"{BASE_URL}/api/admin/gate-reviews/{review_id}/decide",
            json={"decision": "approved", "custodian_notes": "Great work"},
        )
        assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.text}"
        print("PASS: decide approved succeeded")

"""Phase 2 gate logic tests: gate-status, gate submission, admin gate-reviews, decide endpoint"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")

USER_TOKEN = "test_session_1774411617090"
USER_ID = "test-user-1774411617090"
ADMIN_TOKEN = "admin_session_1774411617090"

def user_headers():
    return {"Cookie": f"session_token={USER_TOKEN}"}

def admin_headers():
    return {"Cookie": f"session_token={ADMIN_TOKEN}"}


# ── Gate Status ────────────────────────────────────────────────────────────────

def test_gate_status_unauthenticated():
    """GET /portal/gate-status returns {statuses: {}} for unauthenticated user"""
    res = requests.get(f"{BASE_URL}/api/portal/gate-status")
    assert res.status_code == 200
    data = res.json()
    assert "statuses" in data
    assert data["statuses"] == {}


def test_gate_status_authenticated():
    """GET /portal/gate-status returns statuses dict for authenticated user"""
    res = requests.get(f"{BASE_URL}/api/portal/gate-status", headers=user_headers())
    assert res.status_code == 200
    data = res.json()
    assert "statuses" in data
    assert isinstance(data["statuses"], dict)


# ── DQF Gate Submission ────────────────────────────────────────────────────────

def test_gate_submit_unauthenticated():
    """POST /portal/gate/dqf_gate/submit returns 401 for unauthenticated"""
    res = requests.post(
        f"{BASE_URL}/api/portal/gate/dqf_gate/submit",
        json={"module_id": "module-1", "attestation": "Test attestation"},
    )
    assert res.status_code == 401


def test_gate_submit_invalid_gate_type():
    """POST /portal/gate/invalid_gate/submit returns 400"""
    res = requests.post(
        f"{BASE_URL}/api/portal/gate/invalid_gate/submit",
        json={"module_id": "module-1", "attestation": "Test"},
        headers=user_headers(),
    )
    assert res.status_code == 400


def test_gate_submit_module_mismatch():
    """POST /portal/gate/dqf_gate/submit with wrong module_id returns 400"""
    res = requests.post(
        f"{BASE_URL}/api/portal/gate/dqf_gate/submit",
        json={"module_id": "module-2", "attestation": "Test"},
        headers=user_headers(),
    )
    assert res.status_code == 400


def test_gate_submit_dqf_success():
    """POST /portal/gate/dqf_gate/submit succeeds and returns review_id"""
    res = requests.post(
        f"{BASE_URL}/api/portal/gate/dqf_gate/submit",
        json={"module_id": "module-1", "attestation": "I confirm the DQF is complete and audit-ready."},
        headers=user_headers(),
    )
    assert res.status_code == 200
    data = res.json()
    assert data.get("ok") is True
    assert "review_id" in data
    return data["review_id"]


def test_gate_status_shows_pending_after_submit():
    """After submission, gate-status should show pending_review for module-1"""
    # Submit
    res = requests.post(
        f"{BASE_URL}/api/portal/gate/dqf_gate/submit",
        json={"module_id": "module-1", "attestation": "DQF complete and ready."},
        headers=user_headers(),
    )
    assert res.status_code == 200

    # Check status
    status_res = requests.get(f"{BASE_URL}/api/portal/gate-status", headers=user_headers())
    assert status_res.status_code == 200
    data = status_res.json()
    mod1_status = data["statuses"].get("module-1", {}).get("status")
    assert mod1_status == "pending_review", f"Expected pending_review, got {mod1_status}"


# ── Module Complete (non-gate) ─────────────────────────────────────────────────

def test_module_complete_unauthenticated():
    """POST /portal/module/module-2/complete returns 401 for unauthenticated"""
    res = requests.post(f"{BASE_URL}/api/portal/module/module-2/complete")
    assert res.status_code == 401


def test_module_complete_gate_module_rejected():
    """POST /portal/module/module-1/complete returns 400 (gate modules need review)"""
    res = requests.post(
        f"{BASE_URL}/api/portal/module/module-1/complete",
        headers=user_headers(),
    )
    assert res.status_code == 400


def test_module_complete_success():
    """POST /portal/module/module-2/complete succeeds"""
    res = requests.post(
        f"{BASE_URL}/api/portal/module/module-2/complete",
        headers=user_headers(),
    )
    assert res.status_code == 200
    assert res.json().get("ok") is True


# ── Admin Gate Reviews ────────────────────────────────────────────────────────

def test_admin_gate_reviews_unauthenticated():
    """GET /admin/gate-reviews returns 401 for unauthenticated"""
    res = requests.get(f"{BASE_URL}/api/admin/gate-reviews")
    assert res.status_code == 401


def test_admin_gate_reviews_list():
    """GET /admin/gate-reviews returns list as admin"""
    res = requests.get(f"{BASE_URL}/api/admin/gate-reviews?status_filter=all", headers=admin_headers())
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)


def test_admin_gate_reviews_pending_filter():
    """GET /admin/gate-reviews?status_filter=pending returns only pending reviews"""
    res = requests.get(f"{BASE_URL}/api/admin/gate-reviews?status_filter=pending", headers=admin_headers())
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    for item in data:
        assert item["status"] == "pending", f"Expected pending, got {item['status']}"


def test_admin_decide_unauthenticated():
    """POST /admin/gate-reviews/{id}/decide returns 401 for unauthenticated"""
    res = requests.post(
        f"{BASE_URL}/api/admin/gate-reviews/fake-review-id/decide",
        json={"decision": "approved", "custodian_notes": ""},
    )
    assert res.status_code == 401


def test_admin_decide_not_found():
    """POST /admin/gate-reviews/{id}/decide returns 404 for nonexistent review"""
    res = requests.post(
        f"{BASE_URL}/api/admin/gate-reviews/nonexistent-review-id/decide",
        json={"decision": "approved", "custodian_notes": ""},
        headers=admin_headers(),
    )
    assert res.status_code == 404


def test_admin_decide_invalid_decision():
    """POST /admin/gate-reviews/{id}/decide returns 400 for invalid decision"""
    # First submit a gate to get a real review_id
    submit_res = requests.post(
        f"{BASE_URL}/api/portal/gate/dqf_gate/submit",
        json={"module_id": "module-1", "attestation": "DQF ready for decide test."},
        headers=user_headers(),
    )
    assert submit_res.status_code == 200
    review_id = submit_res.json()["review_id"]

    res = requests.post(
        f"{BASE_URL}/api/admin/gate-reviews/{review_id}/decide",
        json={"decision": "invalid_decision", "custodian_notes": ""},
        headers=admin_headers(),
    )
    assert res.status_code == 400


def test_admin_decide_approve():
    """POST /admin/gate-reviews/{id}/decide with approved updates module_progress"""
    # Submit gate
    submit_res = requests.post(
        f"{BASE_URL}/api/portal/gate/dqf_gate/submit",
        json={"module_id": "module-1", "attestation": "DQF complete — approval test."},
        headers=user_headers(),
    )
    assert submit_res.status_code == 200
    review_id = submit_res.json()["review_id"]

    # Approve
    decide_res = requests.post(
        f"{BASE_URL}/api/admin/gate-reviews/{review_id}/decide",
        json={"decision": "approved", "custodian_notes": "All documents verified."},
        headers=admin_headers(),
    )
    assert decide_res.status_code == 200
    data = decide_res.json()
    assert data.get("ok") is True
    assert data.get("decision") == "approved"

    # Verify gate-status now shows approved for module-1
    status_res = requests.get(f"{BASE_URL}/api/portal/gate-status", headers=user_headers())
    assert status_res.status_code == 200
    mod1 = status_res.json()["statuses"].get("module-1", {})
    assert mod1.get("status") == "approved", f"Expected approved, got {mod1.get('status')}"

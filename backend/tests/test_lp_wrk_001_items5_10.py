"""
LP-WRK-001 Items 5-10: Checkpoints, Sequences (Track A/B/Alumni), CRM state machine
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "vince@launchpathedu.com"
ADMIN_PASS  = "safestart2024!"

TEST_EMAIL_NEAR = "test-nurture-near-999@launchpathtest.com"
TEST_EMAIL_FAR  = "test-nurture-far-999@launchpathtest.com"


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    resp = s.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    if resp.status_code != 200:
        pytest.skip(f"Admin auth failed: {resp.status_code} {resp.text[:200]}")
    return s


# ── 1. GET /api/admin/checkpoints ─────────────────────────────────────────
class TestCheckpoints:
    def test_list_checkpoints_returns_carriers(self, admin_session):
        resp = admin_session.get(f"{BASE_URL}/api/admin/checkpoints")
        assert resp.status_code == 200, f"Got {resp.status_code}: {resp.text[:300]}"
        data = resp.json()
        assert "total_carriers" in data
        assert "carriers" in data
        print(f"total_carriers={data['total_carriers']}, carriers_in_list={len(data['carriers'])}")

    def test_each_carrier_has_5_checkpoints(self, admin_session):
        resp = admin_session.get(f"{BASE_URL}/api/admin/checkpoints")
        assert resp.status_code == 200
        data = resp.json()
        carriers = data.get("carriers", [])
        if not carriers:
            pytest.skip("No enrolled carriers to verify checkpoint count")
        for c in carriers:
            cps = c.get("checkpoints", [])
            assert len(cps) == 5, f"Carrier {c.get('carrier_id')} has {len(cps)} checkpoints, expected 5"
        print(f"PASS: All {len(carriers)} carriers have exactly 5 checkpoints")

    def test_checkpoint_fields_present(self, admin_session):
        resp = admin_session.get(f"{BASE_URL}/api/admin/checkpoints")
        assert resp.status_code == 200
        data = resp.json()
        carriers = data.get("carriers", [])
        if not carriers:
            pytest.skip("No enrolled carriers")
        cp = carriers[0]["checkpoints"][0]
        for field in ["checkpoint_id", "checkpoint_code", "checkpoint_label", "target_day", "status"]:
            assert field in cp, f"Missing field: {field}"
        print(f"Checkpoint fields OK: {list(cp.keys())}")

    def test_patch_checkpoint_passed(self, admin_session):
        """PATCH /api/admin/checkpoints/{checkpoint_id} → PASSED"""
        resp = admin_session.get(f"{BASE_URL}/api/admin/checkpoints")
        assert resp.status_code == 200
        data = resp.json()
        carriers = data.get("carriers", [])
        if not carriers:
            pytest.skip("No enrolled carriers for patch test")
        # Pick the first PENDING checkpoint
        cp_to_patch = None
        for c in carriers:
            for cp in c["checkpoints"]:
                if cp["status"] in ("PENDING", "SUBMITTED", "UNDER_REVIEW"):
                    cp_to_patch = cp
                    break
            if cp_to_patch:
                break
        if not cp_to_patch:
            pytest.skip("No patchable checkpoint found")
        cp_id = cp_to_patch["checkpoint_id"]
        patch_resp = admin_session.patch(
            f"{BASE_URL}/api/admin/checkpoints/{cp_id}",
            json={"status": "PASSED", "admin_notes": "Automated test: authority docs verified"}
        )
        assert patch_resp.status_code == 200, f"PATCH failed: {patch_resp.status_code} {patch_resp.text[:300]}"
        result = patch_resp.json()
        assert result.get("ok") is True
        assert result.get("new_status") == "PASSED"
        print(f"PASS: Checkpoint {cp_id} marked PASSED")


# ── 2. GET /api/admin/sequences ───────────────────────────────────────────
class TestSequencesStats:
    def test_list_sequences_returns_stats(self, admin_session):
        resp = admin_session.get(f"{BASE_URL}/api/admin/sequences")
        assert resp.status_code == 200, f"Got {resp.status_code}"
        data = resp.json()
        assert "stats" in data
        stats = data["stats"]
        for field in ["total", "active", "completed", "nurture_near", "nurture_far", "alumni"]:
            assert field in stats, f"Missing stats field: {field}"
        print(f"Stats: {stats}")

    def test_sequences_list_present(self, admin_session):
        resp = admin_session.get(f"{BASE_URL}/api/admin/sequences")
        assert resp.status_code == 200
        data = resp.json()
        assert "sequences" in data
        print(f"Total sequences in list: {len(data['sequences'])}")


# ── 3. POST /api/reach — NURTURE_FAR (ICP score 20-39) ───────────────────
class TestNurtureFarEnrollment:
    def test_nurture_far_reach_creates_sequence(self, admin_session):
        """ICP score in 20-39 range → nurture_far sequence
        Score calc: d1=10(a=3), d2=0(no date), d3=3(11+), d4=2(consultant), d5=5(fleet_manager) = 20
        """
        payload = {
            "email": TEST_EMAIL_FAR,
            "result": "NO-GO",
            "total_score": 6,
            "category_scores": {"r": 1, "e": 1, "a": 3, "c": 0, "h": 1},
            # ICP fields → score=20, NURTURE_FAR
            "authority_grant_date": None,
            "fleet_size": "11+",
            "file_state": "consultant",
            "decision_authority": "fleet_manager",
        }
        resp = requests.post(f"{BASE_URL}/api/reach", json=payload)
        assert resp.status_code == 200, f"Got {resp.status_code}: {resp.text[:300]}"
        data = resp.json()
        icp_score = data.get("icp_score", 0)
        icp_class  = data.get("icp_classification", "")
        print(f"REACH response: icp_score={icp_score}, icp_classification={icp_class}")
        assert icp_class == "NURTURE_FAR", f"Expected NURTURE_FAR, got {icp_class} (score={icp_score})"
        # Check if nurture_far sequence enrolled
        seq_resp = admin_session.get(f"{BASE_URL}/api/admin/sequences")
        sequences = seq_resp.json().get("sequences", [])
        far_seqs = [s for s in sequences if s.get("email") == TEST_EMAIL_FAR and s.get("sequence_type") == "nurture_far"]
        assert len(far_seqs) > 0, f"No nurture_far sequence found for {TEST_EMAIL_FAR}"
        print(f"PASS: nurture_far sequence enrolled for {TEST_EMAIL_FAR}")


# ── 4. POST /api/reach — NURTURE_NEAR (ICP score 40-59) ──────────────────
class TestNurtureNearEnrollment:
    def test_nurture_near_reach_creates_sequence(self, admin_session):
        """ICP score in 40-59 range → nurture_near sequence
        Score calc: d1=10(a=3), d2=5(old grant date), d3=15(1-3), d4=15(have_disorganized), d5=5(fleet_manager) = 50
        """
        payload = {
            "email": TEST_EMAIL_NEAR,
            "result": "WAIT",
            "total_score": 14,
            "category_scores": {"r": 2, "e": 3, "a": 3, "c": 3, "h": 3},
            # ICP fields → score=50, NURTURE_NEAR
            "authority_grant_date": "2020-01-01",   # old date → d2=5
            "fleet_size": "1-3",                    # d3=15
            "file_state": "have_disorganized",      # d4=15
            "decision_authority": "fleet_manager",  # d5=5
        }
        resp = requests.post(f"{BASE_URL}/api/reach", json=payload)
        assert resp.status_code == 200, f"Got {resp.status_code}: {resp.text[:300]}"
        data = resp.json()
        icp_score = data.get("icp_score", 0)
        icp_class  = data.get("icp_classification", "")
        print(f"REACH response: icp_score={icp_score}, icp_classification={icp_class}")
        assert icp_class == "NURTURE_NEAR", f"Expected NURTURE_NEAR, got {icp_class} (score={icp_score})"
        # Check sequence enrollment
        seq_resp = admin_session.get(f"{BASE_URL}/api/admin/sequences")
        sequences = seq_resp.json().get("sequences", [])
        near_seqs = [s for s in sequences if s.get("email") == TEST_EMAIL_NEAR and s.get("sequence_type") == "nurture_near"]
        assert len(near_seqs) > 0, f"No nurture_near sequence found for {TEST_EMAIL_NEAR}"
        print(f"PASS: nurture_near sequence enrolled for {TEST_EMAIL_NEAR}, icp_score={icp_score}")

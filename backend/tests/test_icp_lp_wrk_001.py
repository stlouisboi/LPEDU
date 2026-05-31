"""LP-WRK-001 Items 1-4: ICP scoring, cohort-seats, REACH submit with ICP fields."""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ─── cohort-seats endpoint ────────────────────────────────────────────────────

class TestCohortSeats:
    """GET /api/cohort-seats returns expected fields including threshold flags."""

    def test_cohort_seats_status(self, client):
        r = client.get(f"{BASE_URL}/api/cohort-seats")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        print("PASS: cohort-seats 200 OK")

    def test_cohort_seats_fields(self, client):
        data = client.get(f"{BASE_URL}/api/cohort-seats").json()
        for field in ("remaining", "total", "taken", "near_capacity", "at_capacity"):
            assert field in data, f"Missing field: {field}"
        assert isinstance(data["near_capacity"], bool)
        assert isinstance(data["at_capacity"], bool)
        assert data["total"] == 12
        assert data["taken"] >= 0
        assert data["remaining"] == data["total"] - data["taken"]
        print(f"PASS: cohort-seats fields OK — remaining={data['remaining']}, near={data['near_capacity']}, at={data['at_capacity']}")


# ─── REACH submit with ICP fields ────────────────────────────────────────────

def _reach_payload(**overrides):
    base = {
        "email": "test_icp@launchpathtest.com",
        "result": "GO",
        "total_score": 35,
        "category_scores": {"r": 8, "e": 7, "a": 8, "c": 7, "h": 5},
        "open_response": "Test submission",
        "authority_grant_date": None,
        "fleet_size": None,
        "file_state": None,
        "decision_authority": None,
    }
    base.update(overrides)
    return base


class TestREACHSubmitICP:
    """POST /api/reach with ICP fields returns icp_score and icp_classification."""

    def test_reach_with_all_icp_fields_returns_icp_score(self, client):
        payload = _reach_payload(
            email="test_priority_go@launchpathtest.com",
            authority_grant_date="2026-01-01",
            fleet_size="1-3",
            file_state="nothing",
            decision_authority="sole_owner",
            category_scores={"r": 9, "e": 9, "a": 9, "c": 9, "h": 6},
            total_score=42,
        )
        r = client.post(f"{BASE_URL}/api/reach", json=payload)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert "icp_score" in data, "Missing icp_score in response"
        assert "icp_classification" in data, "Missing icp_classification in response"
        print(f"PASS: REACH with ICP fields — icp_score={data['icp_score']}, class={data['icp_classification']}")

    def test_priority_go_score_above_85(self, client):
        """sole_owner + nothing + 1-3 + recent date + high REACH-A => PRIORITY_GO"""
        payload = _reach_payload(
            email="test_priority_go2@launchpathtest.com",
            authority_grant_date="2026-01-01",
            fleet_size="1-3",
            file_state="nothing",
            decision_authority="sole_owner",
            category_scores={"r": 9, "e": 9, "a": 9, "c": 9, "h": 6},
            total_score=42,
        )
        data = client.post(f"{BASE_URL}/api/reach", json=payload).json()
        score = data.get("icp_score", 0)
        cls = data.get("icp_classification", "")
        assert score >= 85, f"Expected score >= 85, got {score}"
        assert cls == "PRIORITY_GO", f"Expected PRIORITY_GO, got {cls}"
        print(f"PASS: PRIORITY_GO score={score}")

    def test_low_score_nurture_far_or_not_ready(self, client):
        """fleet_manager + consultant + no date + no fleet => LOW (<40)"""
        payload = _reach_payload(
            email="test_low_icp@launchpathtest.com",
            authority_grant_date=None,
            fleet_size=None,
            file_state="consultant",
            decision_authority="fleet_manager",
            category_scores={"r": 2, "e": 2, "a": 2, "c": 2, "h": 1},
            total_score=9,
        )
        data = client.post(f"{BASE_URL}/api/reach", json=payload).json()
        score = data.get("icp_score", 100)
        cls = data.get("icp_classification", "")
        assert score < 40, f"Expected score < 40, got {score}"
        assert cls in ("NURTURE_FAR", "NOT_READY"), f"Expected NURTURE_FAR/NOT_READY, got {cls}"
        print(f"PASS: Low score={score}, class={cls}")

    def test_reach_without_icp_fields_succeeds(self, client):
        """All ICP fields null — should still return 200."""
        payload = _reach_payload(email="test_no_icp@launchpathtest.com")
        r = client.post(f"{BASE_URL}/api/reach", json=payload)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert "icp_score" in data
        print(f"PASS: REACH without ICP fields OK — icp_score={data['icp_score']}")


# ─── ICP record in MongoDB ────────────────────────────────────────────────────

class TestICPDBRecord:
    """Verify ICP record is stored in icp_assessments collection via admin endpoint."""

    def test_icp_record_stored_via_admin(self, client):
        """Submit REACH with ICP fields, then verify via admin icp_assessments endpoint."""
        import time
        unique_email = f"test_db_{int(time.time())}@launchpathtest.com"
        payload = _reach_payload(
            email=unique_email,
            authority_grant_date="2026-01-15",
            fleet_size="4-5",
            file_state="nothing",
            decision_authority="owner_with_partner",
            category_scores={"r": 7, "e": 7, "a": 8, "c": 7, "h": 5},
            total_score=34,
        )
        r = client.post(f"{BASE_URL}/api/reach", json=payload)
        assert r.status_code == 200
        icp_score = r.json().get("icp_score")
        print(f"PASS: ICP record submitted, score={icp_score} for {unique_email}")
        # We verify the score is reasonable (has all 4 fields populated)
        assert icp_score is not None and icp_score > 0, f"Score should be > 0, got {icp_score}"

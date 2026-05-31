"""
Backend tests for LP-WRK-001 P1 items:
- GET /api/cohort-seats
- GET /api/portal/audit-window
"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{BASE_URL}/api/auth/login", json={"email": "vince@launchpathedu.com", "password": "safestart2024!"})
    assert r.status_code == 200
    return s


class TestCohortSeats:
    """GET /api/cohort-seats — LP-WRK-001 §7.4"""

    def test_cohort_seats_status(self):
        r = requests.get(f"{BASE_URL}/api/cohort-seats")
        assert r.status_code == 200

    def test_cohort_seats_fields(self):
        r = requests.get(f"{BASE_URL}/api/cohort-seats")
        data = r.json()
        assert "remaining" in data
        assert "near_capacity" in data
        assert "at_capacity" in data
        assert "total" in data
        assert "taken" in data

    def test_cohort_seats_values_sane(self):
        r = requests.get(f"{BASE_URL}/api/cohort-seats")
        data = r.json()
        assert isinstance(data["remaining"], int)
        assert isinstance(data["near_capacity"], bool)
        assert isinstance(data["at_capacity"], bool)
        assert data["total"] == 12
        assert data["remaining"] >= 0
        assert data["taken"] + data["remaining"] == data["total"]

    def test_near_capacity_threshold(self):
        """near_capacity should be True when remaining <= 2"""
        r = requests.get(f"{BASE_URL}/api/cohort-seats")
        data = r.json()
        # Validate threshold logic
        if data["remaining"] <= 2:
            assert data["near_capacity"] is True
        else:
            assert data["near_capacity"] is False


class TestAuditWindow:
    """GET /api/portal/audit-window — LP-WRK-001 §3.1"""

    def test_unauthenticated_returns_no_data(self):
        r = requests.get(f"{BASE_URL}/api/portal/audit-window")
        data = r.json()
        assert data["has_data"] is False

    def test_authenticated_with_grant_date(self, session):
        r = session.get(f"{BASE_URL}/api/portal/audit-window")
        assert r.status_code == 200
        data = r.json()
        assert data["has_data"] is True

    def test_audit_window_fields(self, session):
        r = session.get(f"{BASE_URL}/api/portal/audit-window")
        data = r.json()
        for field in ["days_remaining", "urgency", "pct_elapsed", "window_open", "authority_grant_date", "audit_window_end"]:
            assert field in data, f"Missing field: {field}"

    def test_audit_window_urgency_valid(self, session):
        r = session.get(f"{BASE_URL}/api/portal/audit-window")
        data = r.json()
        assert data["urgency"] in ["low", "moderate", "high", "critical", "closed"]

    def test_audit_window_urgency_tiers(self, session):
        r = session.get(f"{BASE_URL}/api/portal/audit-window")
        data = r.json()
        dr = data["days_remaining"]
        expected = "closed" if not data["window_open"] else \
                   "critical" if dr <= 60 else \
                   "high" if dr <= 120 else \
                   "moderate" if dr <= 240 else "low"
        assert data["urgency"] == expected

    def test_pct_elapsed_range(self, session):
        r = session.get(f"{BASE_URL}/api/portal/audit-window")
        data = r.json()
        assert 0 <= data["pct_elapsed"] <= 100

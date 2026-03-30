"""Backend tests for Audit Readiness feature."""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "vince@launchpathedu.com"
ADMIN_PASS = "safestart2024!"

ALL_YES_ANSWERS = {f"q{i}": "YES" for i in range(1, 12)}
MIXED_ANSWERS = {f"q{i}": "YES" for i in range(1, 12)}
MIXED_ANSWERS.update({"q1": "NO"})  # Make dq RED

def get_session_with_login(email, password):
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": password})
    return s, r

class TestAuditReadinessBackend:
    """Tests for audit readiness backend endpoints."""

    @pytest.fixture(autouse=True)
    def setup(self):
        self.session, r = get_session_with_login(ADMIN_EMAIL, ADMIN_PASS)
        if r.status_code != 200:
            pytest.skip(f"Login failed: {r.status_code} {r.text[:200]}")

    def test_get_audit_readiness_returns_enrolled_false_for_admin(self):
        """Admin user should get enrolled:false (no cohort purchase)."""
        r = self.session.get(f"{BASE_URL}/api/audit-readiness")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text[:200]}"
        data = r.json()
        assert "enrolled" in data
        assert data["enrolled"] == False, f"Expected enrolled=False, got {data['enrolled']}"
        print(f"PASS: GET /api/audit-readiness enrolled={data['enrolled']}")

    def test_get_audit_readiness_has_expected_fields(self):
        """GET should return all expected fields."""
        r = self.session.get(f"{BASE_URL}/api/audit-readiness")
        assert r.status_code == 200
        data = r.json()
        for field in ["userId", "domainColors", "domainAnswers", "overallStatus", "scVerified", "staleDomains"]:
            assert field in data, f"Missing field: {field}"
        print("PASS: GET /api/audit-readiness has all expected fields")

    def test_post_answers_all_yes_returns_green(self):
        """All YES answers should yield all GREEN domains and overall GREEN."""
        r = self.session.post(f"{BASE_URL}/api/audit-readiness/answers",
                              json={"answers": ALL_YES_ANSWERS})
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text[:200]}"
        data = r.json()
        assert data.get("ok") == True
        assert "domainColors" in data
        assert "overallStatus" in data
        colors = data["domainColors"]
        for domain in ["dq", "da", "hos", "vm", "ia", "ar"]:
            assert colors.get(domain) == "GREEN", f"{domain} expected GREEN, got {colors.get(domain)}"
        assert data["overallStatus"] == "GREEN"
        print(f"PASS: POST /api/audit-readiness/answers all YES => GREEN, overall={data['overallStatus']}")

    def test_post_answers_with_no_gives_red(self):
        """Any NO should yield RED for that domain."""
        answers = {f"q{i}": "YES" for i in range(1, 12)}
        answers["q1"] = "NO"  # dq should be RED
        r = self.session.post(f"{BASE_URL}/api/audit-readiness/answers", json={"answers": answers})
        assert r.status_code == 200
        data = r.json()
        assert data["domainColors"]["dq"] == "RED"
        assert data["overallStatus"] == "RED"
        print(f"PASS: POST with NO gives RED for dq, overall={data['overallStatus']}")

    def test_post_answers_with_not_sure_gives_yellow(self):
        """NOT SURE on q2 (with q1=YES) should give YELLOW for dq."""
        answers = {f"q{i}": "YES" for i in range(1, 12)}
        answers["q2"] = "NOT SURE"
        r = self.session.post(f"{BASE_URL}/api/audit-readiness/answers", json={"answers": answers})
        assert r.status_code == 200
        data = r.json()
        assert data["domainColors"]["dq"] == "YELLOW"
        print(f"PASS: NOT SURE gives YELLOW for dq")

    def test_get_admin_audit_readiness_returns_array(self):
        """Admin endpoint returns array (may be empty or have records)."""
        r = self.session.get(f"{BASE_URL}/api/admin/audit-readiness")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text[:200]}"
        data = r.json()
        assert isinstance(data, list), f"Expected list, got {type(data)}"
        print(f"PASS: GET /api/admin/audit-readiness returns list with {len(data)} records")

    def test_admin_verify_domain(self):
        """PUT /api/admin/audit-readiness/{userId}/domain/{domain} returns ok:true."""
        # First get current user id from readiness
        r_me = self.session.get(f"{BASE_URL}/api/audit-readiness")
        assert r_me.status_code == 200
        user_id = r_me.json()["userId"]

        r = self.session.put(
            f"{BASE_URL}/api/admin/audit-readiness/{user_id}/domain/dq",
            json={"verified": True, "note": "Test note", "override": None}
        )
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text[:200]}"
        data = r.json()
        assert data.get("ok") == True
        print(f"PASS: PUT domain verify returns ok=True")

    def test_admin_verify_invalid_domain_returns_400(self):
        """Invalid domain should return 400."""
        r_me = self.session.get(f"{BASE_URL}/api/audit-readiness")
        user_id = r_me.json()["userId"]
        r = self.session.put(
            f"{BASE_URL}/api/admin/audit-readiness/{user_id}/domain/invalid_domain",
            json={"verified": True}
        )
        assert r.status_code == 400
        print("PASS: Invalid domain returns 400")

    def test_send_email_returns_meaningful_response(self):
        """Send email endpoint should not 500 crash."""
        r_me = self.session.get(f"{BASE_URL}/api/audit-readiness")
        user_id = r_me.json()["userId"]
        
        # First ensure user has a status
        self.session.post(f"{BASE_URL}/api/audit-readiness/answers",
                          json={"answers": ALL_YES_ANSWERS})
        
        r = self.session.post(f"{BASE_URL}/api/admin/audit-readiness/{user_id}/send-email")
        assert r.status_code in [200, 400, 422, 503], f"Should not be 500, got {r.status_code}: {r.text[:200]}"
        print(f"PASS: Send email returns {r.status_code} (not 500)")

    def test_unauthenticated_access_denied(self):
        """Unauthenticated requests should be denied."""
        s = requests.Session()
        r = s.get(f"{BASE_URL}/api/audit-readiness")
        assert r.status_code in [401, 403], f"Expected 401/403, got {r.status_code}"
        print(f"PASS: Unauthenticated access returns {r.status_code}")

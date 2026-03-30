"""Backend tests for new Audit Readiness v2 (QUESTION_BANK config-driven, monthly_checks collection)"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
SESSION_TOKEN = "9e4df2be51194ca29da8d30e292b5b63"

HEADERS = {
    "Content-Type": "application/json",
    "Cookie": f"session_token={SESSION_TOKEN}",
}

ALL_YES_ANSWERS = [
    {"questionId": "dq_01", "domain": "driver_qualification", "answer": "YES"},
    {"questionId": "dq_02", "domain": "driver_qualification", "answer": "YES"},
    {"questionId": "da_01", "domain": "drug_alcohol", "answer": "YES"},
    {"questionId": "da_02", "domain": "drug_alcohol", "answer": "YES"},
    {"questionId": "hos_01", "domain": "hos_eld", "answer": "YES"},
    {"questionId": "hos_02", "domain": "hos_eld", "answer": "YES"},
    {"questionId": "vm_01", "domain": "vehicle_maintenance", "answer": "YES"},
    {"questionId": "vm_02", "domain": "vehicle_maintenance", "answer": "YES"},
    {"questionId": "ia_01", "domain": "insurance_authority", "answer": "YES"},
    {"questionId": "ia_02", "domain": "insurance_authority", "answer": "YES"},
    {"questionId": "ar_01", "domain": "audit_response", "answer": "YES"},
]

IA_NOT_SURE_ANSWERS = [a.copy() for a in ALL_YES_ANSWERS]
for a in IA_NOT_SURE_ANSWERS:
    if a["questionId"] == "ia_01":
        a["answer"] = "NOT_SURE"

AR_NO_ANSWERS = [a.copy() for a in ALL_YES_ANSWERS]
for a in AR_NO_ANSWERS:
    if a["questionId"] == "ar_01":
        a["answer"] = "NO"

MIXED_NOT_SURE_ANSWERS = [a.copy() for a in ALL_YES_ANSWERS]
for a in MIXED_NOT_SURE_ANSWERS:
    if a["questionId"] in ("dq_01", "da_02"):
        a["answer"] = "NOT_SURE"

# -- Tests --

class TestGetAuditReadiness:
    """GET /api/audit-readiness"""

    def test_returns_expected_shape(self):
        r = requests.get(f"{BASE_URL}/api/audit-readiness", headers=HEADERS)
        assert r.status_code == 200
        data = r.json()
        assert "enrolled" in data
        assert "latestCheck" in data
        assert "totalChecks" in data
        print("GET /api/audit-readiness shape OK")

    def test_total_checks_is_int(self):
        r = requests.get(f"{BASE_URL}/api/audit-readiness", headers=HEADERS)
        data = r.json()
        assert isinstance(data["totalChecks"], int)
        print(f"totalChecks={data['totalChecks']}")


class TestPostAuditReadiness:
    """POST /api/audit-readiness"""

    def test_all_yes_returns_green(self):
        r = requests.post(
            f"{BASE_URL}/api/audit-readiness",
            json={"answers": ALL_YES_ANSWERS, "notes": "Test all YES"},
            headers=HEADERS,
        )
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        overall = data.get("overallResult", {})
        assert overall.get("color") == "GREEN", f"Expected GREEN, got {overall.get('color')}"
        # All domain colors GREEN
        for dr in data.get("domainResults", []):
            assert dr["color"] == "GREEN", f"Domain {dr['domain']} not GREEN: {dr['color']}"
        print("All YES => GREEN overall and all domains GREEN: PASS")

    def test_ia_01_not_sure_critical_override(self):
        r = requests.post(
            f"{BASE_URL}/api/audit-readiness",
            json={"answers": IA_NOT_SURE_ANSWERS, "notes": "Test ia_01 NOT_SURE"},
            headers=HEADERS,
        )
        assert r.status_code == 200
        data = r.json()
        overall = data.get("overallResult", {})
        assert overall.get("criticalOverride") is True, f"Expected criticalOverride=true, got {overall}"
        assert overall.get("color") == "RED", f"Expected RED, got {overall.get('color')}"
        # ia domain should be RED
        ia_dr = next((dr for dr in data.get("domainResults", []) if dr["domain"] == "insurance_authority"), None)
        assert ia_dr is not None
        assert ia_dr["color"] == "RED", f"ia domain color: {ia_dr['color']}"
        print("ia_01 NOT_SURE => criticalOverride=true, overall RED, ia RED: PASS")

    def test_ar_01_no_critical_override(self):
        r = requests.post(
            f"{BASE_URL}/api/audit-readiness",
            json={"answers": AR_NO_ANSWERS, "notes": "Test ar_01 NO"},
            headers=HEADERS,
        )
        assert r.status_code == 200
        data = r.json()
        overall = data.get("overallResult", {})
        assert overall.get("criticalOverride") is True, f"Expected criticalOverride=true, got {overall}"
        assert overall.get("color") == "RED", f"Expected RED, got {overall.get('color')}"
        print("ar_01 NO => criticalOverride=true, overall RED: PASS")

    def test_mixed_not_sure_populates_not_sure_verify_lines(self):
        r = requests.post(
            f"{BASE_URL}/api/audit-readiness",
            json={"answers": MIXED_NOT_SURE_ANSWERS, "notes": "Test NOT_SURE lines"},
            headers=HEADERS,
        )
        assert r.status_code == 200
        data = r.json()
        dq_dr = next((dr for dr in data.get("domainResults", []) if dr["domain"] == "driver_qualification"), None)
        assert dq_dr is not None
        assert len(dq_dr.get("notSureVerifyLines", [])) > 0, "Expected notSureVerifyLines for dq domain"
        da_dr = next((dr for dr in data.get("domainResults", []) if dr["domain"] == "drug_alcohol"), None)
        assert da_dr is not None
        assert len(da_dr.get("notSureVerifyLines", [])) > 0, "Expected notSureVerifyLines for da domain"
        print("Mixed NOT_SURE => notSureVerifyLines populated: PASS")

    def test_returns_check_id(self):
        r = requests.post(
            f"{BASE_URL}/api/audit-readiness",
            json={"answers": ALL_YES_ANSWERS},
            headers=HEADERS,
        )
        assert r.status_code == 200
        data = r.json()
        assert "checkId" in data and len(data["checkId"]) > 0
        print(f"checkId returned: {data['checkId']}")


class TestHistoryAndGetCheck:
    """GET history and specific check"""

    def test_history_returns_array(self):
        r = requests.get(f"{BASE_URL}/api/audit-readiness/history", headers=HEADERS)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        print(f"history length: {len(data)}")

    def test_history_sorted_desc(self):
        r = requests.get(f"{BASE_URL}/api/audit-readiness/history", headers=HEADERS)
        data = r.json()
        if len(data) >= 2:
            ts_list = [d["submittedAt"] for d in data]
            assert ts_list == sorted(ts_list, reverse=True), "History not sorted desc"
        print("History sorted desc: PASS")

    def test_get_specific_check(self):
        # First get history to find a check id
        r = requests.get(f"{BASE_URL}/api/audit-readiness/history", headers=HEADERS)
        checks = r.json()
        assert len(checks) > 0, "No checks in history to fetch"
        check_id = checks[0]["checkId"]
        r2 = requests.get(f"{BASE_URL}/api/audit-readiness/{check_id}", headers=HEADERS)
        assert r2.status_code == 200
        data = r2.json()
        assert data["checkId"] == check_id
        print(f"GET /api/audit-readiness/{check_id}: PASS")


class TestAdminEndpoints:
    """Admin audit readiness endpoints"""

    def test_admin_list_returns_array(self):
        r = requests.get(f"{BASE_URL}/api/admin/audit-readiness", headers=HEADERS)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        if len(data) > 0:
            item = data[0]
            assert "latestCheckId" in item
            assert "overallResult" in item
            assert "domainResults" in item
        print(f"admin list: {len(data)} items, shape OK")

    def test_admin_verify_domain(self):
        # Get the latest check id
        r = requests.get(f"{BASE_URL}/api/admin/audit-readiness", headers=HEADERS)
        assert r.status_code == 200
        items = r.json()
        assert len(items) > 0
        check_id = items[0]["latestCheckId"]

        r2 = requests.put(
            f"{BASE_URL}/api/admin/audit-readiness/check/{check_id}/domain/driver_qualification",
            json={"verified": True, "note": "Test verification"},
            headers=HEADERS,
        )
        assert r2.status_code == 200
        data = r2.json()
        assert data.get("ok") is True
        print(f"Admin verify domain driver_qualification: PASS")

    def test_admin_verify_domain_invalid_domain(self):
        r = requests.get(f"{BASE_URL}/api/admin/audit-readiness", headers=HEADERS)
        items = r.json()
        if not items:
            pytest.skip("No checks available")
        check_id = items[0]["latestCheckId"]
        r2 = requests.put(
            f"{BASE_URL}/api/admin/audit-readiness/check/{check_id}/domain/invalid_domain",
            json={"verified": True},
            headers=HEADERS,
        )
        assert r2.status_code == 400
        print("Invalid domain returns 400: PASS")

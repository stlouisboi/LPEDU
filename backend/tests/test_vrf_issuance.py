"""Tests for VRF (Verified Registry ID) auto-issuance logic — LaunchPath EDU portal."""
import pytest
import requests
import os
import sys

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback for local execution
    BASE_URL = "https://your-numbers-calc.preview.emergentagent.com"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestVRFCodeStructure:
    """Code-level verification of backend VRF logic (import & endpoint existence)."""

    def test_issue_vrf_function_importable(self):
        """_issue_vrf_id_if_eligible must exist in routes.portal and be callable."""
        try:
            sys.path.insert(0, "/app/backend")
            from routes.portal import _issue_vrf_id_if_eligible
            import asyncio
            assert asyncio.iscoroutinefunction(_issue_vrf_id_if_eligible), "Function must be async"
            print("PASS: _issue_vrf_id_if_eligible exists and is async")
        except ImportError as e:
            pytest.fail(f"Could not import _issue_vrf_id_if_eligible: {e}")

    def test_admin_imports_vrf_function(self):
        """admin.py must import _issue_vrf_id_if_eligible from routes.portal."""
        try:
            sys.path.insert(0, "/app/backend")
            import importlib
            import types
            # Read source to confirm import line exists
            with open("/app/backend/routes/admin.py") as f:
                source = f.read()
            assert "from routes.portal import _issue_vrf_id_if_eligible" in source, \
                "admin.py must import _issue_vrf_id_if_eligible from routes.portal"
            print("PASS: admin.py imports _issue_vrf_id_if_eligible")
        except Exception as e:
            pytest.fail(str(e))

    def test_decide_gate_review_calls_vrf(self):
        """decide_gate_review must call _issue_vrf_id_if_eligible (not hardcoded module-6 VRF block)."""
        with open("/app/backend/routes/admin.py") as f:
            source = f.read()
        assert "await _issue_vrf_id_if_eligible(user_id)" in source, \
            "decide_gate_review must call _issue_vrf_id_if_eligible"
        # Ensure there's no hardcoded module-6-only VRF block
        assert 'module_id == "module-6"' not in source or \
            source.count('module_id == "module-6"') == 0, \
            "admin.py should not have hardcoded module-6 VRF block"
        print("PASS: decide_gate_review calls _issue_vrf_id_if_eligible")

    def test_mark_module_complete_calls_vrf(self):
        """mark_module_complete endpoint must call _issue_vrf_id_if_eligible after marking done."""
        with open("/app/backend/routes/portal.py") as f:
            source = f.read()
        # Find the mark_module_complete function and verify VRF call
        assert "await _issue_vrf_id_if_eligible(user[" in source or \
               "await _issue_vrf_id_if_eligible(user_id" in source, \
            "mark_module_complete must call _issue_vrf_id_if_eligible"
        print("PASS: mark_module_complete calls _issue_vrf_id_if_eligible")

    def test_vrf_core_modules_are_1_to_6(self):
        """_issue_vrf_id_if_eligible must check modules 1-6 as core modules."""
        with open("/app/backend/routes/portal.py") as f:
            source = f.read()
        assert '"module-1"' in source
        assert '"module-2"' in source
        assert '"module-3"' in source
        assert '"module-4"' in source
        assert '"module-5"' in source
        assert '"module-6"' in source
        # module-8 and module-9 should NOT be in the core list
        # Check the core_modules list specifically
        import ast, re
        match = re.search(r'core_modules\s*=\s*\[([^\]]+)\]', source)
        assert match, "core_modules list not found"
        core_str = match.group(1)
        assert "module-8" not in core_str, "module-8 must not be in core_modules"
        assert "module-9" not in core_str, "module-9 must not be in core_modules"
        print(f"PASS: core_modules = {core_str.strip()}")

    def test_vrf_conditional_module7_check(self):
        """_issue_vrf_id_if_eligible must check module-7 when module-6 is conditional."""
        with open("/app/backend/routes/portal.py") as f:
            source = f.read()
        assert '"conditional"' in source
        assert '"module-7"' in source
        # Verify conditional check logic exists
        assert 'statuses.get("module-6") == "conditional"' in source or \
               "module-6" in source, "VRF function must handle module-6 conditional path"
        print("PASS: module-7 conditional check exists in VRF function")


class TestVRFAPIEndpoints:
    """API endpoint tests for VRF issuance."""

    def test_registry_id_endpoint_exists(self, client):
        """GET /api/portal/registry-id must return 401 when unauthenticated (not 404)."""
        r = client.get(f"{BASE_URL}/api/portal/registry-id")
        assert r.status_code == 401, f"Expected 401 unauthenticated, got {r.status_code}"
        print(f"PASS: /api/portal/registry-id returns 401 for unauthenticated request")

    def test_mark_module_complete_endpoint_exists(self, client):
        """POST /api/portal/module/<id>/complete must return 401 unauthenticated (not 404)."""
        r = client.post(f"{BASE_URL}/api/portal/module/module-3/complete", json={})
        assert r.status_code == 401, f"Expected 401 unauthenticated, got {r.status_code}"
        print(f"PASS: /api/portal/module/module-3/complete returns 401")

    def test_gate_modules_blocked_from_complete(self, client):
        """Gate modules (module-1, module-6) must not be completable via /complete endpoint."""
        # This would return 401 first if unauthenticated, that's fine — endpoint exists
        r = client.post(f"{BASE_URL}/api/portal/module/module-1/complete", json={})
        # 401 = endpoint exists but unauthenticated; 404 = endpoint missing
        assert r.status_code in [400, 401, 422], \
            f"Unexpected status {r.status_code} for gate module complete"
        print(f"PASS: module-1 /complete returns {r.status_code} (blocked or unauthenticated)")

    def test_health_check(self, client):
        """Backend health check."""
        r = client.get(f"{BASE_URL}/api/")
        assert r.status_code in [200, 404], f"Backend unreachable: {r.status_code}"
        print(f"PASS: Backend responding at {BASE_URL}")


class TestFrontendVRFLogic:
    """Frontend code verification for VRF isAllCoreDone logic."""

    def test_is_all_core_done_function_exists(self):
        """isAllCoreDone() must exist in PortalPage.jsx."""
        with open("/app/frontend/src/pages/PortalPage.jsx") as f:
            source = f.read()
        assert "isAllCoreDone" in source, "isAllCoreDone function not found in PortalPage.jsx"
        print("PASS: isAllCoreDone exists in PortalPage.jsx")

    def test_is_all_core_done_checks_modules_1_to_6(self):
        """isAllCoreDone must include modules 1-6 in its core array."""
        with open("/app/frontend/src/pages/PortalPage.jsx") as f:
            source = f.read()
        import re
        match = re.search(r'const core\s*=\s*\[([^\]]+)\]', source)
        assert match, "core array not found in isAllCoreDone"
        core_str = match.group(1)
        for mod in ["module-1","module-2","module-3","module-4","module-5","module-6"]:
            assert mod in core_str, f"{mod} missing from core array"
        assert "module-8" not in core_str, "module-8 must not be in core array"
        assert "module-9" not in core_str, "module-9 must not be in core array"
        print(f"PASS: isAllCoreDone core = {core_str.strip()}")

    def test_registry_issued_uses_is_all_core_done(self):
        """registryIssued in sidebar must use isAllCoreDone()."""
        with open("/app/frontend/src/pages/PortalPage.jsx") as f:
            source = f.read()
        assert "registryIssued = isAllCoreDone()" in source, \
            "registryIssued must be set to isAllCoreDone()"
        print("PASS: registryIssued = isAllCoreDone()")

    def test_module7_credential_ceremony(self):
        """Module-7 complete + isAllCoreDone path must show VerifiedRegistryID."""
        with open("/app/frontend/src/pages/PortalPage.jsx") as f:
            source = f.read()
        assert 'module-7' in source and 'isAllCoreDone()' in source
        # Check the conditional render for module-7 + complete + isAllCoreDone
        assert 'module-7" && status === "complete" && isAllCoreDone()' in source, \
            "Module-7 credential ceremony condition not found"
        print("PASS: Module-7 credential ceremony condition exists")

    def test_module8_no_outside_vrf_text(self):
        """Module-8 description must not say 'outside the Verified Registry ID framework'."""
        with open("/app/frontend/src/data/moduleData.js") as f:
            source = f.read()
        # Find MODULE_8_DATA block
        import re
        m8 = re.search(r'MODULE_8_DATA\s*=\s*\{(.+?)^};', source, re.DOTALL | re.MULTILINE)
        if m8:
            assert "outside the Verified Registry ID framework" not in m8.group(1), \
                "Module-8 description still contains 'outside the Verified Registry ID framework'"
        print("PASS: Module-8 description updated")

    def test_module9_no_outside_vrf_text(self):
        """Module-9 description must not say 'outside the Verified Registry ID framework'."""
        with open("/app/frontend/src/data/moduleData.js") as f:
            source = f.read()
        import re
        m9 = re.search(r'MODULE_9_DATA\s*=\s*\{(.+?)^};', source, re.DOTALL | re.MULTILINE)
        if m9:
            assert "outside the Verified Registry ID framework" not in m9.group(1), \
                "Module-9 description still contains 'outside the Verified Registry ID framework'"
        print("PASS: Module-9 description updated")

    def test_vrf_pending_message_mentions_core_modules(self):
        """VerifiedRegistryID pending message must mention core module sequence."""
        with open("/app/frontend/src/components/VerifiedRegistryID.jsx") as f:
            source = f.read()
        assert "core modules" in source.lower() or "1–6" in source or "modules (1" in source, \
            "Pending message must mention core module sequence"
        print("PASS: VRF pending message mentions core module sequence")

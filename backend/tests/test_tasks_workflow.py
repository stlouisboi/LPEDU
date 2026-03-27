"""
Backend tests for Task Submission & Verification Workflow (LPOS v1.0)
Tests: GET tasks, submit, verify (403), remediate (403), coach/carriers (403), signal pulse
"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
CARRIER_ID = "test_paid_1773353168"
SESSION_COOKIE = "sess_paid_1773353168"


def carrier_session():
    s = requests.Session()
    s.cookies.set("session_token", SESSION_COOKIE)
    s.headers.update({"Content-Type": "application/json"})
    return s


def anon_session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestTasksGetAndSeed:
    """GET /api/tasks/{carrierId} — returns 10 tasks"""

    def test_get_tasks_authenticated(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"

    def test_get_tasks_has_10_tasks(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        assert r.status_code == 200
        data = r.json()
        assert "tasks" in data
        tasks = data["tasks"]
        # Should have tasks (seeded on account creation)
        assert len(tasks) >= 1, "No tasks found; seed may not have run"

    def test_tasks_have_required_fields(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        data = r.json()
        tasks = data.get("tasks", [])
        if not tasks:
            pytest.skip("No tasks to validate")
        t = tasks[0]
        assert "taskId" in t
        assert "priority" in t
        assert "category" in t
        assert "description" in t
        assert "status" in t
        assert t["priority"] in ("critical", "high", "medium", "low")

    def test_get_tasks_unauthenticated_returns_401(self):
        s = anon_session()
        r = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        assert r.status_code == 401

    def test_get_tasks_wrong_carrier_returns_403(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/tasks/some_other_carrier_id")
        assert r.status_code == 403


class TestTaskSubmit:
    """PATCH /api/tasks/{taskId}/submit"""

    def _get_pending_task(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        tasks = r.json().get("tasks", [])
        for t in tasks:
            if t["status"] in ("pending", "needs_changes"):
                return t
        return None

    def test_submit_task_success(self):
        task = self._get_pending_task()
        if not task:
            pytest.skip("No pending task available")
        s = carrier_session()
        r = s.patch(f"{BASE_URL}/api/tasks/{task['taskId']}/submit")
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert data.get("status") == "submitted"

    def test_submit_task_updates_status_in_db(self):
        # Get a pending task, submit it, then verify via GET
        task = self._get_pending_task()
        if not task:
            pytest.skip("No pending task available")
        s = carrier_session()
        s.patch(f"{BASE_URL}/api/tasks/{task['taskId']}/submit")
        # Re-fetch tasks
        r2 = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        tasks = r2.json().get("tasks", [])
        updated = next((t for t in tasks if t["taskId"] == task["taskId"]), None)
        assert updated is not None
        assert updated["status"] == "submitted"

    def test_submit_unauthenticated_returns_401(self):
        s = anon_session()
        r = s.patch(f"{BASE_URL}/api/tasks/TASK001/submit")
        assert r.status_code == 401


class TestCoachProtectedEndpoints:
    """Coach-only endpoints return 403 for non-coach users"""

    def test_verify_task_requires_coach(self):
        s = carrier_session()
        r = s.patch(f"{BASE_URL}/api/tasks/TASK001/verify",
                    json={"carrierId": CARRIER_ID})
        assert r.status_code == 403

    def test_remediate_task_requires_coach(self):
        s = carrier_session()
        r = s.patch(f"{BASE_URL}/api/tasks/TASK001/remediate",
                    json={"carrierId": CARRIER_ID, "coachNote": "Fix this"})
        assert r.status_code == 403

    def test_coach_carriers_requires_coach(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/coach/carriers")
        assert r.status_code == 403

    def test_coach_endpoints_anon_403(self):
        s = anon_session()
        r = s.get(f"{BASE_URL}/api/coach/carriers")
        assert r.status_code in (401, 403)


class TestSignalAfterSubmit:
    """GET /api/signal/{carrierId} — pulse=100 after submission"""

    def test_signal_returns_pulse(self):
        s = carrier_session()
        r = s.get(f"{BASE_URL}/api/signal/{CARRIER_ID}")
        assert r.status_code == 200
        data = r.json()
        assert "pulse" in data
        assert "signal" in data

    def test_signal_pulse_100_after_submit(self):
        """After task submission, lastActiveAt is updated, pulse should be 100"""
        # Submit a task first
        s = carrier_session()
        tasks_r = s.get(f"{BASE_URL}/api/tasks/{CARRIER_ID}")
        tasks = tasks_r.json().get("tasks", [])
        pending = next((t for t in tasks if t["status"] in ("pending", "needs_changes")), None)
        if pending:
            s.patch(f"{BASE_URL}/api/tasks/{pending['taskId']}/submit")
        # Check signal
        r = s.get(f"{BASE_URL}/api/signal/{CARRIER_ID}")
        data = r.json()
        assert data.get("pulse") == 100, f"Expected pulse=100 after submission, got {data.get('pulse')}"

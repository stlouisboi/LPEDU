"""
Phase 4 Community & Credential Backend Tests
Tests: lesson-viewed, lesson-progress, registry-id, lesson QA, announcements, admin QA, admin announcements, registry ID generation
"""
import pytest
import requests
import os
import subprocess

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Create test user session via mongosh
def create_test_session():
    script = """
use('test_database');
var userId = 'p4test-' + Date.now();
var sessionToken = 'p4session_' + Date.now();
db.users.insertOne({user_id: userId, email: 'p4test.' + Date.now() + '@example.com', name: 'P4 Test User', picture: '', created_at: new Date()});
db.user_sessions.insertOne({user_id: userId, session_token: sessionToken, expires_at: new Date(Date.now() + 7*24*60*60*1000), created_at: new Date()});
db.cohort_access.insertOne({user_id: userId, status: 'active', granted_at: new Date()});
print('TOKEN:' + sessionToken);
print('UID:' + userId);
"""
    result = subprocess.run(['mongosh', '--eval', script], capture_output=True, text=True)
    token = None
    uid = None
    for line in result.stdout.splitlines():
        if line.startswith('TOKEN:'):
            token = line[6:]
        if line.startswith('UID:'):
            uid = line[4:]
    return token, uid

def get_admin_session():
    script = """
use('test_database');
var u = db.users.findOne({email: 'vince@launchpathedu.com'});
if (!u) { print('NO_ADMIN'); } else {
  var s = db.user_sessions.findOne({user_id: u.user_id});
  if (s) { print('ASESSION:' + s.session_token); } else { print('NO_SESSION'); }
}
"""
    result = subprocess.run(['mongosh', '--eval', script], capture_output=True, text=True)
    for line in result.stdout.splitlines():
        if line.startswith('ASESSION:'):
            return line[9:]
    return None

USER_TOKEN, USER_ID = create_test_session()
ADMIN_TOKEN = get_admin_session()

LESSON_ID = "lesson-1-1"
MODULE_ID = "module-1"


def user_session():
    s = requests.Session()
    if USER_TOKEN:
        s.cookies.set("session_token", USER_TOKEN, domain=BASE_URL.split("//")[-1].split("/")[0])
    return s

def admin_session():
    s = requests.Session()
    if ADMIN_TOKEN:
        s.cookies.set("session_token", ADMIN_TOKEN, domain=BASE_URL.split("//")[-1].split("/")[0])
    return s


class TestLessonViewed:
    """POST /portal/module/{module_id}/lesson/{lesson_id}/viewed"""

    def test_mark_lesson_viewed_authenticated(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        s = user_session()
        r = s.post(f"{BASE_URL}/api/portal/module/{MODULE_ID}/lesson/{LESSON_ID}/viewed")
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_mark_lesson_viewed_unauthenticated(self):
        r = requests.post(f"{BASE_URL}/api/portal/module/{MODULE_ID}/lesson/{LESSON_ID}/viewed")
        assert r.status_code == 401


class TestLessonProgress:
    """GET /portal/lesson-progress"""

    def test_lesson_progress_authenticated(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        # First mark a lesson viewed
        s = user_session()
        s.post(f"{BASE_URL}/api/portal/module/{MODULE_ID}/lesson/{LESSON_ID}/viewed")
        r = s.get(f"{BASE_URL}/api/portal/lesson-progress")
        assert r.status_code == 200
        data = r.json()
        assert "progress" in data
        assert isinstance(data["progress"], dict)

    def test_lesson_progress_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/portal/lesson-progress")
        assert r.status_code == 200
        data = r.json()
        assert data.get("progress") == {}


class TestRegistryId:
    """GET /portal/registry-id"""

    def test_registry_id_no_mod6_approval(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        s = user_session()
        r = s.get(f"{BASE_URL}/api/portal/registry-id")
        assert r.status_code == 200
        data = r.json()
        assert "issued" in data
        # New user has no MOD-6 approval, should be False
        assert data["issued"] is False

    def test_registry_id_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/portal/registry-id")
        assert r.status_code == 401


class TestPortalAnnouncements:
    """GET /portal/announcements"""

    def test_portal_announcements_authenticated(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        s = user_session()
        r = s.get(f"{BASE_URL}/api/portal/announcements")
        assert r.status_code == 200
        data = r.json()
        assert "announcements" in data
        assert isinstance(data["announcements"], list)

    def test_portal_announcements_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/portal/announcements")
        assert r.status_code == 200
        data = r.json()
        assert data.get("announcements") == []


class TestLessonQA:
    """GET/POST /portal/lesson/{lesson_id}/qa"""

    def test_get_lesson_qa_authenticated(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        s = user_session()
        r = s.get(f"{BASE_URL}/api/portal/lesson/{LESSON_ID}/qa")
        assert r.status_code == 200
        data = r.json()
        assert "qa" in data
        assert isinstance(data["qa"], list)

    def test_get_lesson_qa_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/portal/lesson/{LESSON_ID}/qa")
        assert r.status_code == 401

    def test_post_lesson_question(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        s = user_session()
        r = s.post(f"{BASE_URL}/api/portal/lesson/{LESSON_ID}/qa",
                   json={"question": "TEST_ What is this lesson about?"},
                   headers={"Content-Type": "application/json"})
        assert r.status_code == 200
        data = r.json()
        assert "qa_id" in data
        assert data["question"] == "TEST_ What is this lesson about?"
        assert data["lesson_id"] == LESSON_ID
        # Store qa_id for later tests
        pytest.phase4_qa_id = data["qa_id"]

    def test_post_empty_question_rejected(self):
        if not USER_TOKEN:
            pytest.skip("No user session")
        s = user_session()
        r = s.post(f"{BASE_URL}/api/portal/lesson/{LESSON_ID}/qa",
                   json={"question": "   "},
                   headers={"Content-Type": "application/json"})
        assert r.status_code == 400


class TestAdminAnnouncements:
    """Admin announcements CRUD"""
    ann_id = None

    def test_list_admin_announcements(self):
        if not ADMIN_TOKEN:
            pytest.skip("No admin session")
        s = admin_session()
        r = s.get(f"{BASE_URL}/api/admin/announcements")
        assert r.status_code == 200
        data = r.json()
        assert "announcements" in data
        assert isinstance(data["announcements"], list)

    def test_create_announcement(self):
        if not ADMIN_TOKEN:
            pytest.skip("No admin session")
        s = admin_session()
        r = s.post(f"{BASE_URL}/api/admin/announcements",
                   json={"title": "TEST_ Phase4 Announcement", "body": "Test body for phase4", "priority": "normal"},
                   headers={"Content-Type": "application/json"})
        assert r.status_code == 200
        data = r.json()
        assert data["title"] == "TEST_ Phase4 Announcement"
        assert data["is_active"] is True
        assert "announcement_id" in data
        TestAdminAnnouncements.ann_id = data["announcement_id"]

    def test_toggle_announcement(self):
        if not ADMIN_TOKEN or not TestAdminAnnouncements.ann_id:
            pytest.skip("No admin session or no announcement created")
        s = admin_session()
        r = s.patch(f"{BASE_URL}/api/admin/announcements/{TestAdminAnnouncements.ann_id}/toggle")
        assert r.status_code == 200
        data = r.json()
        assert data["ok"] is True
        assert "is_active" in data
        # Should be toggled to False
        assert data["is_active"] is False

    def test_delete_announcement(self):
        if not ADMIN_TOKEN or not TestAdminAnnouncements.ann_id:
            pytest.skip("No admin session or no announcement created")
        s = admin_session()
        r = s.delete(f"{BASE_URL}/api/admin/announcements/{TestAdminAnnouncements.ann_id}")
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_delete_nonexistent_announcement(self):
        if not ADMIN_TOKEN:
            pytest.skip("No admin session")
        s = admin_session()
        r = s.delete(f"{BASE_URL}/api/admin/announcements/nonexistent-id-12345")
        assert r.status_code == 404


class TestAdminLessonQA:
    """Admin Q&A endpoints"""

    def test_list_all_qa(self):
        if not ADMIN_TOKEN:
            pytest.skip("No admin session")
        s = admin_session()
        r = s.get(f"{BASE_URL}/api/admin/lesson-qa")
        assert r.status_code == 200
        data = r.json()
        assert "qa" in data
        assert isinstance(data["qa"], list)

    def test_reply_to_qa(self):
        if not ADMIN_TOKEN:
            pytest.skip("No admin session")
        qa_id = getattr(pytest, 'phase4_qa_id', None)
        if not qa_id:
            pytest.skip("No Q&A item created - run TestLessonQA first")
        s = admin_session()
        r = s.post(f"{BASE_URL}/api/admin/lesson-qa/{qa_id}/reply",
                   json={"reply": "TEST_ Admin reply to test question"},
                   headers={"Content-Type": "application/json"})
        assert r.status_code == 200
        data = r.json()
        assert data["ok"] is True

    def test_reply_to_nonexistent_qa(self):
        if not ADMIN_TOKEN:
            pytest.skip("No admin session")
        s = admin_session()
        r = s.post(f"{BASE_URL}/api/admin/lesson-qa/nonexistent-qa-id/reply",
                   json={"reply": "Some reply"},
                   headers={"Content-Type": "application/json"})
        assert r.status_code == 404


class TestRegistryIDGeneration:
    """Registry ID generated when MOD-6 gate review is approved"""

    def test_registry_id_generated_on_mod6_approval(self):
        """Create a MOD-6 custodian review and approve it; verify registry_id is generated"""
        if not ADMIN_TOKEN or not USER_ID:
            pytest.skip("No admin session or user ID")

        # Create a MOD-6 review in DB
        review_script = f"""
use('test_database');
var reviewId = 'test-review-mod6-' + Date.now();
db.custodian_reviews.insertOne({{
  review_id: reviewId,
  user_id: '{USER_ID}',
  module_id: 'module-6',
  gate_type: 'integrity_audit',
  status: 'pending',
  submitted_at: new Date().toISOString()
}});
db.module_progress.update_one = db.module_progress.updateOne;
db.module_progress.insertOne({{
  user_id: '{USER_ID}',
  module_id: 'module-6',
  status: 'pending'
}});
print('REVIEWID:' + reviewId);
"""
        result = subprocess.run(['mongosh', '--eval', review_script], capture_output=True, text=True)
        review_id = None
        for line in result.stdout.splitlines():
            if line.startswith('REVIEWID:'):
                review_id = line[9:]

        if not review_id:
            pytest.skip("Could not create test review in DB")

        # Admin approves it
        s = admin_session()
        r = s.post(f"{BASE_URL}/api/admin/gate-reviews/{review_id}/decide",
                   json={"decision": "approved", "custodian_notes": "Test approval for registry ID"},
                   headers={"Content-Type": "application/json"})
        assert r.status_code == 200
        data = r.json()
        assert data["decision"] == "approved"

        # Verify registry_id was created in DB
        check_script = f"""
use('test_database');
var doc = db.registry_ids.findOne({{user_id: '{USER_ID}'}});
if (doc) {{
  print('REGISTRY_ID:' + doc.registry_id);
}} else {{
  print('NO_REGISTRY_ID');
}}
"""
        check_result = subprocess.run(['mongosh', '--eval', check_script], capture_output=True, text=True)
        found_registry = any('REGISTRY_ID:' in line for line in check_result.stdout.splitlines())
        assert found_registry, f"Registry ID not found in DB after MOD-6 approval. DB output: {check_result.stdout}"

        # Also verify via API
        user_s = user_session()
        r2 = user_s.get(f"{BASE_URL}/api/portal/registry-id")
        assert r2.status_code == 200
        reg_data = r2.json()
        assert reg_data.get("issued") is True
        assert "registry_id" in reg_data

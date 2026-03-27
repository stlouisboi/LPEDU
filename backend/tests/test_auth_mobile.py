"""Backend auth tests: login, register, session, logout."""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "vince@launchpathedu.com"
ADMIN_PASSWORD = "safestart2024!"
TEST_EMAIL = "test_mobile_audit_123@test.com"
TEST_PASSWORD = "TestPass123!"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestAuthLogin:
    """Login endpoint tests"""

    def test_admin_login_success(self, session):
        resp = session.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL

    def test_login_wrong_password(self, session):
        resp = session.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert resp.status_code == 401

    def test_login_unknown_email(self, session):
        resp = session.post(f"{BASE_URL}/api/auth/login", json={"email": "nobody@unknown.com", "password": "abc"})
        assert resp.status_code == 401


class TestAuthMe:
    """Session /me endpoint tests"""

    def test_me_without_session(self):
        s = requests.Session()
        resp = s.get(f"{BASE_URL}/api/auth/me")
        assert resp.status_code == 401

    def test_me_with_valid_session(self, session):
        # Login first to get session cookie
        login_resp = session.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert login_resp.status_code == 200
        # Now call /me with session cookie
        me_resp = session.get(f"{BASE_URL}/api/auth/me")
        assert me_resp.status_code == 200
        data = me_resp.json()
        assert "user_id" in data
        assert data["email"] == ADMIN_EMAIL


class TestAuthRegister:
    """Register endpoint tests"""

    def test_register_new_user(self):
        import uuid
        unique_email = f"test_reg_{uuid.uuid4().hex[:8]}@test.com"
        s = requests.Session()
        s.headers.update({"Content-Type": "application/json"})
        resp = s.post(f"{BASE_URL}/api/auth/register", json={"email": unique_email, "password": TEST_PASSWORD, "name": "Test User"})
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True
        assert "user" in data
        assert data["user"]["email"] == unique_email

    def test_register_duplicate_email(self):
        # Use admin email which already exists
        s = requests.Session()
        s.headers.update({"Content-Type": "application/json"})
        resp = s.post(f"{BASE_URL}/api/auth/register", json={"email": ADMIN_EMAIL, "password": TEST_PASSWORD})
        assert resp.status_code == 409

    def test_register_test_email(self):
        # May or may not exist; just verify proper response
        s = requests.Session()
        s.headers.update({"Content-Type": "application/json"})
        resp = s.post(f"{BASE_URL}/api/auth/register", json={"email": TEST_EMAIL, "password": TEST_PASSWORD, "name": "Mobile Tester"})
        assert resp.status_code in [200, 409]


class TestAuthLogout:
    """Logout endpoint test"""

    def test_logout(self, session):
        session.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        resp = session.post(f"{BASE_URL}/api/auth/logout")
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("ok") is True

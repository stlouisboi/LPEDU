import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
;

const API = process.env.REACT_APP_BACKEND_URL;

/**
 * Handles the OAuth callback by exchanging the session_id from the URL fragment
 * for a server-side session cookie. Uses useRef to prevent double-execution
 * under React StrictMode.
 */
export default function AuthCallback() {
  const router = useRouter();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // CRITICAL: Prevent double-execution under React StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash;
    const match = hash.match(/session_id=([^&]+)/);
    if (!match) {
      router.push("/portal", { replace: true });
      return;
    }

    const sessionId = match[1];

    const exchange = async () => {
      try {
        const resp = await fetch(`${API}/api/auth/session?session_id=${sessionId}`, {
          credentials: "include",
        });
        if (!resp.ok) throw new Error("Session exchange failed");
        const data = await resp.json();
        // Navigate to portal, passing user so PortalPage skips the /me check
        router.push("/portal", { replace: true, state: { user: data.user } });
      } catch {
        router.push("/portal", { replace: true });
      }
    };

    exchange();
  }, [navigate]);

  return null;
}

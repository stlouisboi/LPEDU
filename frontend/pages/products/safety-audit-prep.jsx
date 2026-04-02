import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Page() {
  const router = useRouter();
  useEffect(() => { router.replace('/standards/safety-audit-prep'); }, [router]);
  return null;
}

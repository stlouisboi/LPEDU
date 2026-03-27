import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  useEffect(() => { router.replace('/standards/maintenance-packet'); }, [router]);
  return null;
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  useEffect(() => { router.replace('/standards/insurance-packet'); }, [router]);
  return null;
}

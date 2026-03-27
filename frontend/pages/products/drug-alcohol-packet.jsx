import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  useEffect(() => { router.replace('/standards/drug-alcohol-packet'); }, [router]);
  return null;
}

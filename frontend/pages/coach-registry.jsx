import dynamic from 'next/dynamic';
const CoachRegistryPage = dynamic(() => import('../src/pages/CoachRegistryPage'), { ssr: false });
export default function Page() { return <CoachRegistryPage />; }

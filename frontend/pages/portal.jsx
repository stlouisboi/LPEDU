import dynamic from 'next/dynamic';
const PortalPage = dynamic(() => import('../src/pages/PortalPage'), { ssr: false });
export default function Page() { return <PortalPage />; }

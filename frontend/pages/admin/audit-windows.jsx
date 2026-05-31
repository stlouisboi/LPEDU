import dynamic from 'next/dynamic';
const AdminAuditWindowsPage = dynamic(() => import('../../src/pages/AdminAuditWindowsPage'), { ssr: false });
export default function Page() { return <AdminAuditWindowsPage />; }

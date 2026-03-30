import dynamic from 'next/dynamic';
const AdminAuditReadinessPage = dynamic(() => import('../../src/pages/AdminAuditReadinessPage'), { ssr: false });
export default function Page() { return <AdminAuditReadinessPage />; }

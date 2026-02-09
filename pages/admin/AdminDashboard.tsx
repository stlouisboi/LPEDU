import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import VerifyPaymentModal from '../../components/admin/VerifyPaymentModal';

interface Operator {
  id: string;
  fullName: string;
  email: string;
  entityName: string;
  usdotNumber?: string;
  createdAt: any;
  enrolled: boolean;
}

const AdminDashboard: React.FC = () => {
  const [pendingOperators, setPendingOperators] = useState<Operator[]>([]);
  const [enrolledOperators, setEnrolledOperators] = useState<Operator[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'enrolled'>('pending');

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    setLoading(true);
    
    // Fetch pending
    const pendingQuery = query(
      collection(db, 'operators'),
      where('enrolled', '==', false),
      orderBy('createdAt', 'desc')
    );
    const pendingSnapshot = await getDocs(pendingQuery);
    const pending = pendingSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Operator));
    setPendingOperators(pending);

    // Fetch enrolled
    const enrolledQuery = query(
      collection(db, 'operators'),
      where('enrolled', '==', true),
      orderBy('createdAt', 'desc')
    );
    const enrolledSnapshot = await getDocs(enrolledQuery);
    const enrolled = enrolledSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Operator));
    setEnrolledOperators(enrolled);
    
    setLoading(false);
  };

  const handleVerifyClick = (operator: Operator) => {
    setSelectedOperator(operator);
    setShowVerifyModal(true);
  };

  const handleVerificationComplete = () => {
    setShowVerifyModal(false);
    setSelectedOperator(null);
    fetchOperators();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #001122 0%, #002244 100%)',
      color: '#FFFFFF',
      padding: '2rem'
    }}>
      <header style={{ 
        background: '#001a33',
        borderBottom: '2px solid #C5A059',
        padding: '1.5rem 2rem',
        marginBottom: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#C5A059',
          margin: 0
        }}>
          LAUNCHPATH ADMIN COMMAND CENTER
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
          Operator: Vince Lawrence | System Status: UPLINK_STABLE
        </p>
      </header>

      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '0.75rem', color: '#C5A059', margin: '0 0 0.5rem 0' }}>
            PENDING ADMISSIONS
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {pendingOperators.length}
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '0.75rem', color: '#C5A059', margin: '0 0 0.5rem 0' }}>
            ENROLLED OPERATORS
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {enrolledOperators.length}
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '0.75rem', color: '#C5A059', margin: '0 0 0.5rem 0' }}>
            TOTAL REVENUE
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            ${(enrolledOperators.length * 2500).toLocaleString()}
          </div>
        </div>
      </div>

      <nav style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => setActiveTab('pending')}
          style={{
            background: activeTab === 'pending' ? '#C5A059' : 'transparent',
            color: activeTab === 'pending' ? '#002244' : '#C5A059',
            border: '1px solid #C5A059',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          PENDING ({pendingOperators.length})
        </button>
        <button
          onClick={() => setActiveTab('enrolled')}
          style={{
            background: activeTab === 'enrolled' ? '#C5A059' : 'transparent',
            color: activeTab === 'enrolled' ? '#002244' : '#C5A059',
            border: '1px solid #C5A059',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          ENROLLED ({enrolledOperators.length})
        </button>
      </nav>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
      ) : (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(197, 160, 89, 0.2)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'rgba(197, 160, 89, 0.1)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#C5A059', fontSize: '0.75rem' }}>
                  NAME
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#C5A059', fontSize: '0.75rem' }}>
                  EMAIL
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#C5A059', fontSize: '0.75rem' }}>
                  ENTITY
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#C5A059', fontSize: '0.75rem' }}>
                  USDOT
                </th>
                {activeTab === 'pending' && (
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#C5A059', fontSize: '0.75rem' }}>
                    ACTION
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'pending' ? pendingOperators : enrolledOperators).map(operator => (
                <tr key={operator.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '1rem' }}>{operator.fullName}</td>
                  <td style={{ padding: '1rem' }}>{operator.email}</td>
                  <td style={{ padding: '1rem' }}>{operator.entityName}</td>
                  <td style={{ padding: '1rem' }}>{operator.usdotNumber || '—'}</td>
                  {activeTab === 'pending' && (
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => handleVerifyClick(operator)}
                        style={{
                          background: '#C5A059',
                          color: '#002244',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.75rem'
                        }}
                      >
                        VERIFY PAYMENT
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {(activeTab === 'pending' ? pendingOperators : enrolledOperators).length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              No {activeTab} operators found
            </div>
          )}
        </div>
      )}

      {showVerifyModal && selectedOperator && (
        <VerifyPaymentModal
          operator={selectedOperator}
          onClose={() => setShowVerifyModal(false)}
          onComplete={handleVerificationComplete}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

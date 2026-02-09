import React, { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface Operator {
  id: string;
  fullName: string;
  email: string;
  entityName: string;
  usdotNumber?: string;
}

interface VerifyPaymentModalProps {
  operator: Operator;
  onClose: () => void;
  onComplete: () => void;
}

const VerifyPaymentModal: React.FC<VerifyPaymentModalProps> = ({ 
  operator, 
  onClose, 
  onComplete 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [transactionId, setTransactionId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const handleAuthorizeEnrollment = async () => {
    if (!paymentVerified) {
      alert('Please confirm payment has been verified');
      return;
    }

    setProcessing(true);

    try {
      const operatorRef = doc(db, 'operators', operator.id);
      await updateDoc(operatorRef, {
        enrolled: true,
        enrolledAt: serverTimestamp(),
        paymentVerifiedBy: 'Vince Lawrence',
        paymentMethod: paymentMethod,
        transactionId: transactionId || null,
      });

      alert('Enrollment authorized successfully!');
      onComplete();
    } catch (error) {
      console.error('Enrollment authorization failed:', error);
      alert('Failed to authorize enrollment. Check console for details.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 18, 34, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(180deg, #001a33 0%, #002244 100%)',
          border: '2px solid #C5A059',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: '#C5A059',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <h2 style={{ color: '#C5A059', marginBottom: '1.5rem' }}>
          VERIFY ENROLLMENT PAYMENT
        </h2>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(197, 160, 89, 0.2)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>Operator:</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600, marginLeft: '1rem' }}>{operator.fullName}</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>Email:</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600, marginLeft: '1rem' }}>{operator.email}</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>Entity:</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600, marginLeft: '1rem' }}>{operator.entityName}</span>
          </div>
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>USDOT:</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600, marginLeft: '1rem' }}>
              {operator.usdotNumber || 'Not yet assigned'}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginBottom: '1.5rem',
            cursor: 'pointer',
            color: '#FFFFFF'
          }}>
            <input 
              type="checkbox" 
              checked={paymentVerified}
              onChange={(e) => setPaymentVerified(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            Payment of $2,500 verified
          </label>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block',
              color: '#C5A059',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Payment Method
            </label>
            <select 
              value={paymentMethod} 
              onChange={e => setPaymentMethod(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '4px',
                padding: '0.75rem',
                color: '#FFFFFF',
                fontSize: '0.875rem'
              }}
            >
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="zelle">Zelle</option>
              <option value="wire">Wire Transfer</option>
              <option value="check">Check</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block',
              color: '#C5A059',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Transaction ID (Optional)
            </label>
            <input
              type="text"
              placeholder="pi_3QR7xT2eZvKYlo2C0X9M1hKl"
              value={transactionId}
              onChange={e => setTransactionId(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '4px',
                padding: '0.75rem',
                color: '#FFFFFF',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleAuthorizeEnrollment}
            disabled={processing || !paymentVerified}
            style={{
              flex: 1,
              background: paymentVerified ? '#C5A059' : '#666',
              color: '#002244',
              border: 'none',
              padding: '1rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              borderRadius: '4px',
              cursor: paymentVerified ? 'pointer' : 'not-allowed',
              opacity: paymentVerified ? 1 : 0.5
            }}
          >
            {processing ? 'PROCESSING...' : 'AUTHORIZE ENROLLMENT'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPaymentModal;

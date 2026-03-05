import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Carrier, AuthorityStatus } from '../types/cohort';

/**
 * Carrier Service
 * Manages motor carrier profiles, authority status, and compliance tracking
 */

export const carrierService = {
  /**
   * Create a new carrier profile
   */
  async createCarrier(data: {
    userId: string;
    cohortId: string;
    legalName: string;
    mcNumber?: string;
    dotNumber?: string;
    email: string;
    phone?: string;
  }): Promise<string> {
    const carrierRef = doc(collection(db, 'carriers'));
    const carrierId = carrierRef.id;

    const carrierData: Carrier = {
      id: carrierId,
      userId: data.userId,
      cohortId: data.cohortId,
      legalName: data.legalName,
      mcNumber: data.mcNumber || null,
      dotNumber: data.dotNumber || null,
      email: data.email,
      phone: data.phone || null,
      authorityStatus: 'pending',
      insuranceStatus: 'pending',
      lastAuthorityCheck: null,
      lastInsuranceCheck: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(carrierRef, carrierData);
    return carrierId;
  },

  /**
   * Get carrier by user ID
   */
  async getCarrierByUserId(userId: string): Promise<Carrier | null> {
    const q = query(collection(db, 'carriers'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as Carrier;
  },

  /**
   * Get carrier by ID
   */
  async getCarrier(carrierId: string): Promise<Carrier | null> {
    const carrierDoc = await getDoc(doc(db, 'carriers', carrierId));
    
    if (!carrierDoc.exists()) {
      return null;
    }

    return carrierDoc.data() as Carrier;
  },

  /**
   * Update carrier authority status
   */
  async updateAuthorityStatus(
    carrierId: string, 
    status: AuthorityStatus
  ): Promise<void> {
    await updateDoc(doc(db, 'carriers', carrierId), {
      authorityStatus: status,
      lastAuthorityCheck: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Update carrier insurance status
   */
  async updateInsuranceStatus(
    carrierId: string, 
    status: 'active' | 'pending' | 'lapsed' | 'cancelled'
  ): Promise<void> {
    await updateDoc(doc(db, 'carriers', carrierId), {
      insuranceStatus: status,
      lastInsuranceCheck: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Update carrier profile
   */
  async updateCarrier(
    carrierId: string, 
    updates: Partial<Carrier>
  ): Promise<void> {
    await updateDoc(doc(db, 'carriers', carrierId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Get all carriers in a cohort
   */
  async getCarriersByCohort(cohortId: string): Promise<Carrier[]> {
    const q = query(collection(db, 'carriers'), where('cohortId', '==', cohortId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as Carrier);
  },

  /**
   * Check if carrier has active authority
   */
  async hasActiveAuthority(carrierId: string): Promise<boolean> {
    const carrier = await this.getCarrier(carrierId);
    return carrier?.authorityStatus === 'active';
  },

  /**
   * Check if carrier has active insurance
   */
  async hasActiveInsurance(carrierId: string): Promise<boolean> {
    const carrier = await this.getCarrier(carrierId);
    return carrier?.insuranceStatus === 'active';
  },

  /**
   * Get carrier risk level based on authority and insurance status
   */
  async getCarrierRiskLevel(carrierId: string): Promise<'green' | 'yellow' | 'red'> {
    const carrier = await this.getCarrier(carrierId);
    
    if (!carrier) {
      return 'red';
    }

    // Red: Authority or insurance issues
    if (
      carrier.authorityStatus === 'suspended' || 
      carrier.authorityStatus === 'revoked' ||
      carrier.insuranceStatus === 'cancelled' ||
      carrier.insuranceStatus === 'lapsed'
    ) {
      return 'red';
    }

    // Yellow: Pending or not verified
    if (
      carrier.authorityStatus === 'pending' ||
      carrier.insuranceStatus === 'pending'
    ) {
      return 'yellow';
    }

    // Green: All active
    if (
      carrier.authorityStatus === 'active' &&
      carrier.insuranceStatus === 'active'
    ) {
      return 'green';
    }

    return 'yellow';
  },

  /**
   * Update carrier risk level manually
   */
  async updateRiskLevel(carrierId: string, riskLevel: 'green' | 'yellow' | 'red', reason: string): Promise<void> {
    await updateDoc(doc(db, 'carriers', carrierId), {
      riskLevel,
      updatedAt: new Date().toISOString()
    });
    
    // Add to carrier timeline
    const timelineRef = collection(db, 'carrierTimelineEvents');
    await setDoc(doc(timelineRef), {
      carrierId,
      eventType: 'risk_level_change',
      eventData: { riskLevel, reason },
      createdAt: new Date().toISOString()
    });
  },

  /**
   * Calculate automatic risk level based on signals
   */
  async calculateAutomaticRisk(carrierId: string): Promise<'green' | 'yellow' | 'red'> {
    const carrier = await this.getCarrier(carrierId);
    if (!carrier) return 'red';

    // Base risk from authority/insurance
    let risk: 'green' | 'yellow' | 'red' = await this.getCarrierRiskLevel(carrierId);

    // If already red from authority/insurance, return red
    if (risk === 'red') return 'red';

    // Check for inactivity (14 days for RED, 7 days for YELLOW)
    const lastActivity = carrier.lastActivityDate ? new Date(carrier.lastActivityDate) : new Date(carrier.createdAt);
    const daysInactive = Math.floor((new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    if (daysInactive >= 14) return 'red';
    if (daysInactive >= 7) return 'yellow';

    // Check for unaddressed NEEDS CHANGES (> 5 days)
    // This would require querying carrierTaskStatus, placeholder for logic
    
    return risk;
  }
};

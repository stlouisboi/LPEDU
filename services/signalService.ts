import { db } from '../firebase/config';
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';

export interface SignalStatus {
  overall: number; // 0-100
  grade: 'C' | 'B' | 'A';
  label: 'SUB-STANDARD' | 'OPERATIONAL' | 'INSTITUTIONAL GRADE';
  indicators: {
    integrity: number; // 0-100 (Documentary Integrity)
    pulse: number;     // 0-100 (System Pulse)
    alignment: number; // 0-100 (Regulatory Alignment)
  };
  lastUpdate: Date;
}

/**
 * SignalService: The core logic for LPOS v1.0 "Administrative Signal".
 * Calculates carrier status based on verified artifacts, activity, and cohort pace.
 */
export const calculateCarrierSignal = async (carrierId: string): Promise<SignalStatus> => {
  // 1. Fetch Carrier Data
  const carrierRef = doc(db, 'carriers', carrierId);
  const carrierSnap = await getDoc(carrierRef);
  
  if (!carrierSnap.exists()) {
    throw new Error('Carrier not found');
  }
  
  const carrierData = carrierSnap.data();
  const cohortId = carrierData.cohortId;
  
  // 2. Fetch Tasks (Documentary Integrity - 40%)
  const tasksQuery = query(collection(db, 'tasks'), where('carrierId', '==', carrierId));
  const tasksSnap = await getDocs(tasksQuery);
  const totalTasks = tasksSnap.size || 1;
  const verifiedTasks = tasksSnap.docs.filter(d => d.data().status === 'verified').length;
  const integrity = Math.round((verifiedTasks / totalTasks) * 100);
  
  // 3. Fetch Activity (System Pulse - 30%)
  // Logic: Active in last 72h = 100%, last 7 days = 70%, > 7 days = 30%, > 14 days = 0%
  const lastActive = carrierData.lastActiveAt?.toDate() || new Date(0);
  const diffDays = (new Date().getTime() - lastActive.getTime()) / (1000 * 3600 * 24);
  
  let pulse = 0;
  if (diffDays <= 3) pulse = 100;
  else if (diffDays <= 7) pulse = 70;
  else if (diffDays <= 14) pulse = 30;
  else pulse = 0;
  
  // 4. Fetch Cohort Pace (Regulatory Alignment - 30%)
  // Logic: Current week vs. completed tasks/milestones
  const cohortRef = doc(db, 'cohorts', cohortId);
  const cohortSnap = await getDoc(cohortRef);
  const currentWeek = cohortSnap.exists() ? cohortSnap.data().currentWeek : 1;
  
  // Simple alignment logic: (Current Progress / Target Progress for current week)
  // For v1.0, we'll use (verifiedTasks / (currentWeek * 2)) capped at 100
  const targetTasks = currentWeek * 2; // Assuming 2 verified tasks per week
  const alignment = Math.min(100, Math.round((verifiedTasks / targetTasks) * 100));
  
  // 5. Calculate Overall Signal
  const overall = Math.round((integrity * 0.4) + (pulse * 0.3) + (alignment * 0.3));
  
  // 6. Determine Grade & Label
  let grade: 'C' | 'B' | 'A' = 'C';
  let label: 'SUB-STANDARD' | 'OPERATIONAL' | 'INSTITUTIONAL GRADE' = 'SUB-STANDARD';
  
  if (overall >= 90) {
    grade = 'A';
    label = 'INSTITUTIONAL GRADE';
  } else if (overall >= 60) {
    grade = 'B';
    label = 'OPERATIONAL';
  }
  
  return {
    overall,
    grade,
    label,
    indicators: {
      integrity,
      pulse,
      alignment
    },
    lastUpdate: new Date()
  };
};

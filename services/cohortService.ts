/**
 * LaunchPath Cohort Service
 * Round 1 Build 1A: Firestore Operations for Cohort System
 * 
 * Handles all database operations for cohorts, carriers, tasks, and related entities
 */

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  Cohort,
  CarrierProfile,
  CohortWeek,
  ImplementationTask,
  CarrierTaskStatus,
  MilestoneVerification,
  CoachAssignment,
  CoachNote,
  CarrierTimelineEvent,
  COLLECTIONS
} from '../types/cohort';

// ============================================================================
// COHORT OPERATIONS
// ============================================================================

/**
 * Get active cohort with available capacity
 */
export async function getAvailableCohort(): Promise<Cohort | null> {
  const cohortsRef = collection(db, COLLECTIONS.COHORTS);
  const q = query(
    cohortsRef,
    where('status', '==', 'upcoming'),
    orderBy('startDate', 'asc'),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  
  const cohortData = snapshot.docs[0].data() as Cohort;
  
  // Check if cohort has capacity
  if (cohortData.enrolled >= cohortData.capacity) {
    return null;
  }
  
  return cohortData;
}

/**
 * Get cohort by ID
 */
export async function getCohortById(cohortId: string): Promise<Cohort | null> {
  const cohortRef = doc(db, COLLECTIONS.COHORTS, cohortId);
  const cohortSnap = await getDoc(cohortRef);
  
  if (!cohortSnap.exists()) return null;
  
  return cohortSnap.data() as Cohort;
}

/**
 * Create a new cohort
 */
export async function createCohort(cohortData: Omit<Cohort, 'cohortId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const cohortRef = doc(collection(db, COLLECTIONS.COHORTS));
  const cohortId = cohortRef.id;
  
  const newCohort: Cohort = {
    ...cohortData,
    cohortId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await setDoc(cohortRef, newCohort);
  return cohortId;
}

/**
 * Increment cohort enrollment count
 */
export async function incrementCohortEnrollment(cohortId: string): Promise<void> {
  const cohortRef = doc(db, COLLECTIONS.COHORTS, cohortId);
  const cohortSnap = await getDoc(cohortRef);
  
  if (!cohortSnap.exists()) {
    throw new Error('Cohort not found');
  }
  
  const cohort = cohortSnap.data() as Cohort;
  
  // Check capacity before incrementing
  if (cohort.enrolled >= cohort.capacity) {
    throw new Error('Cohort is at full capacity');
  }
  
  await updateDoc(cohortRef, {
    enrolled: cohort.enrolled + 1,
    updatedAt: new Date(),
  });
}

// ============================================================================
// CARRIER PROFILE OPERATIONS
// ============================================================================

/**
 * Create carrier profile
 */
export async function createCarrierProfile(
  userId: string,
  cohortId: string,
  profileData: Omit<CarrierProfile, 'carrierId' | 'userId' | 'cohortId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const carrierRef = doc(collection(db, COLLECTIONS.CARRIER_PROFILES));
  const carrierId = carrierRef.id;
  
  const newCarrier: CarrierProfile = {
    ...profileData,
    carrierId,
    userId,
    cohortId,
    currentWeek: 0, // Starts at 0, unlocks to 1 on cohort start
    riskLevel: 'green',
    lastActivityDate: new Date(),
    admissionDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await setDoc(carrierRef, newCarrier);
  
  // Create timeline event for admission
  await createTimelineEvent(carrierId, 'admission', {
    cohortId,
    cohortName: (await getCohortById(cohortId))?.cohortName,
  });
  
  return carrierId;
}

/**
 * Get carrier profile by user ID
 */
export async function getCarrierProfileByUserId(userId: string): Promise<CarrierProfile | null> {
  const carriersRef = collection(db, COLLECTIONS.CARRIER_PROFILES);
  const q = query(carriersRef, where('userId', '==', userId), limit(1));
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  
  return snapshot.docs[0].data() as CarrierProfile;
}

/**
 * Update carrier risk level
 */
export async function updateCarrierRiskLevel(
  carrierId: string,
  riskLevel: 'green' | 'yellow' | 'red',
  reason?: string
): Promise<void> {
  const carrierRef = doc(db, COLLECTIONS.CARRIER_PROFILES, carrierId);
  
  await updateDoc(carrierRef, {
    riskLevel,
    updatedAt: new Date(),
  });
  
  // Create timeline event
  await createTimelineEvent(carrierId, 'risk_level_change', {
    newRiskLevel: riskLevel,
    reason,
  });
}

/**
 * Update carrier last activity date
 */
export async function updateCarrierActivity(carrierId: string): Promise<void> {
  const carrierRef = doc(db, COLLECTIONS.CARRIER_PROFILES, carrierId);
  
  await updateDoc(carrierRef, {
    lastActivityDate: new Date(),
    updatedAt: new Date(),
  });
}

// ============================================================================
// COHORT WEEK OPERATIONS
// ============================================================================

/**
 * Get weeks for a cohort
 */
export async function getCohortWeeks(cohortId: string): Promise<CohortWeek[]> {
  const weeksRef = collection(db, COLLECTIONS.COHORT_WEEKS);
  const q = query(
    weeksRef,
    where('cohortId', '==', cohortId),
    orderBy('weekNumber', 'asc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as CohortWeek);
}

// ============================================================================
// TASK OPERATIONS
// ============================================================================

/**
 * Get tasks for a cohort week
 */
export async function getWeekTasks(cohortWeekId: string): Promise<ImplementationTask[]> {
  const tasksRef = collection(db, COLLECTIONS.IMPLEMENTATION_TASKS);
  const q = query(
    tasksRef,
    where('cohortWeekId', '==', cohortWeekId),
    orderBy('sortOrder', 'asc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as ImplementationTask);
}

/**
 * Get carrier's task status
 */
export async function getCarrierTaskStatus(
  carrierId: string,
  taskId: string
): Promise<CarrierTaskStatus | null> {
  const statusRef = collection(db, COLLECTIONS.CARRIER_TASK_STATUS);
  const q = query(
    statusRef,
    where('carrierId', '==', carrierId),
    where('taskId', '==', taskId),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  
  return snapshot.docs[0].data() as CarrierTaskStatus;
}

/**
 * Submit task for review
 */
export async function submitTask(
  carrierId: string,
  taskId: string,
  submissionData: any
): Promise<void> {
  const statusRef = collection(db, COLLECTIONS.CARRIER_TASK_STATUS);
  const q = query(
    statusRef,
    where('carrierId', '==', carrierId),
    where('taskId', '==', taskId),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    // Create new status
    const newStatusRef = doc(statusRef);
    const newStatus: CarrierTaskStatus = {
      statusId: newStatusRef.id,
      carrierId,
      taskId,
      status: 'submitted',
      submittedAt: new Date(),
      submissionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(newStatusRef, newStatus);
  } else {
    // Update existing status
    const statusDoc = snapshot.docs[0];
    await updateDoc(statusDoc.ref, {
      status: 'submitted',
      submittedAt: new Date(),
      submissionData,
      updatedAt: new Date(),
    });
  }
  
  // Update carrier activity
  await updateCarrierActivity(carrierId);
  
  // Create timeline event
  await createTimelineEvent(carrierId, 'task_submitted', {
    taskId,
  });
}

// ============================================================================
// TIMELINE OPERATIONS
// ============================================================================

/**
 * Create timeline event
 */
export async function createTimelineEvent(
  carrierId: string,
  eventType: CarrierTimelineEvent['eventType'],
  eventData: any
): Promise<void> {
  const eventRef = doc(collection(db, COLLECTIONS.CARRIER_TIMELINE_EVENTS));
  
  const event: CarrierTimelineEvent = {
    eventId: eventRef.id,
    carrierId,
    eventType,
    eventData,
    createdAt: new Date(),
  };
  
  await setDoc(eventRef, event);
}

/**
 * Get carrier timeline
 */
export async function getCarrierTimeline(carrierId: string): Promise<CarrierTimelineEvent[]> {
  const eventsRef = collection(db, COLLECTIONS.CARRIER_TIMELINE_EVENTS);
  const q = query(
    eventsRef,
    where('carrierId', '==', carrierId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as CarrierTimelineEvent);
}

// ============================================================================
// CAPACITY CHECK
// ============================================================================

/**
 * Check if cohort enrollment is available
 * Returns { available: boolean, cohort: Cohort | null, message: string }
 */
export async function checkCohortCapacity(): Promise<{
  available: boolean;
  cohort: Cohort | null;
  message: string;
}> {
  const cohort = await getAvailableCohort();
  
  if (!cohort) {
    return {
      available: false,
      cohort: null,
      message: 'No cohorts are currently accepting enrollment. Cohort capacity is limited to 10 carriers per session.',
    };
  }
  
  const spotsRemaining = cohort.capacity - cohort.enrolled;
  
  return {
    available: true,
    cohort,
    message: `${spotsRemaining} ${spotsRemaining === 1 ? 'spot' : 'spots'} remaining in ${cohort.cohortName}.`,
  };
}

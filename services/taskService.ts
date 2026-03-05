/**
 * LaunchPath Task Service
 * Round 2 Build 2A: Implementation Task Submission System
 * 
 * Handles task submission, status management, and file uploads for compliance documents
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
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import type { 
  ImplementationTask, 
  CarrierTaskStatus,
  MilestoneVerification 
} from '../types/cohort';

/**
 * Task status types following Portal Brief voice standard
 */
export type TaskStatus = 
  | 'not_started'    // Muted gray - task not yet begun
  | 'in_progress'    // Standard text - carrier working on it
  | 'submitted'      // Gold - pending coach review
  | 'needs_changes'  // Amber - coach requires corrections
  | 'verified';      // Institutional green - coach approved

/**
 * Task type determines submission format
 */
export type TaskType = 
  | 'upload'         // File upload required
  | 'checklist'      // Checklist completion
  | 'form';          // Form submission

export const taskService = {
  /**
   * Get all tasks for a specific cohort week
   */
  async getWeekTasks(cohortWeekId: string): Promise<ImplementationTask[]> {
    const tasksRef = collection(db, 'implementationTasks');
    const q = query(
      tasksRef,
      where('cohortWeekId', '==', cohortWeekId),
      orderBy('sortOrder', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ImplementationTask);
  },

  /**
   * Get carrier's status for a specific task
   */
  async getCarrierTaskStatus(
    carrierId: string, 
    taskId: string
  ): Promise<CarrierTaskStatus | null> {
    const statusRef = collection(db, 'carrierTaskStatus');
    const q = query(
      statusRef,
      where('carrierId', '==', carrierId),
      where('taskId', '==', taskId)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    return snapshot.docs[0].data() as CarrierTaskStatus;
  },

  /**
   * Get all task statuses for a carrier
   */
  async getCarrierAllTaskStatuses(carrierId: string): Promise<CarrierTaskStatus[]> {
    const statusRef = collection(db, 'carrierTaskStatus');
    const q = query(
      statusRef,
      where('carrierId', '==', carrierId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as CarrierTaskStatus);
  },

  /**
   * Start a task (mark as in_progress)
   */
  async startTask(carrierId: string, taskId: string): Promise<void> {
    const existingStatus = await this.getCarrierTaskStatus(carrierId, taskId);
    
    if (existingStatus) {
      // Update existing status
      const statusDoc = doc(db, 'carrierTaskStatus', existingStatus.statusId);
      await updateDoc(statusDoc, {
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new status
      const statusRef = doc(collection(db, 'carrierTaskStatus'));
      const newStatus: CarrierTaskStatus = {
        statusId: statusRef.id,
        carrierId,
        taskId,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(statusRef, newStatus);
    }
  },

  /**
   * Upload file to Firebase Storage
   * Returns download URL
   */
  async uploadTaskFile(
    carrierId: string,
    taskId: string,
    file: File
  ): Promise<string> {
    // Create storage path: submissions/{carrierId}/{taskId}/{timestamp}_{filename}
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storagePath = `submissions/${carrierId}/${taskId}/${fileName}`;
    
    const storageRef = ref(storage, storagePath);
    
    // Upload file
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  },

  /**
   * Submit task for coach review
   */
  async submitTask(
    carrierId: string,
    taskId: string,
    submissionData: {
      type: 'file' | 'checklist' | 'form';
      fileUrl?: string;
      fileName?: string;
      checklistData?: Record<string, boolean>;
      formData?: Record<string, any>;
    }
  ): Promise<void> {
    const existingStatus = await this.getCarrierTaskStatus(carrierId, taskId);
    
    const submissionPayload = {
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      submissionData,
      updatedAt: new Date().toISOString()
    };

    if (existingStatus) {
      // Update existing status
      const statusDoc = doc(db, 'carrierTaskStatus', existingStatus.statusId);
      await updateDoc(statusDoc, submissionPayload);
    } else {
      // Create new status
      const statusRef = doc(collection(db, 'carrierTaskStatus'));
      const newStatus: CarrierTaskStatus = {
        statusId: statusRef.id,
        carrierId,
        taskId,
        createdAt: new Date().toISOString(),
        ...submissionPayload
      };
      await setDoc(statusRef, newStatus);
    }

    // TODO: Trigger notification to coach (Round 5)
  },

  /**
   * Coach: Mark task as verified
   * This is a coach-only action
   */
  async verifyTask(
    carrierId: string,
    taskId: string,
    coachUserId: string,
    coachNote?: string
  ): Promise<void> {
    const existingStatus = await this.getCarrierTaskStatus(carrierId, taskId);
    
    if (!existingStatus) {
      throw new Error('Task status not found');
    }

    const statusDoc = doc(db, 'carrierTaskStatus', existingStatus.statusId);
    await updateDoc(statusDoc, {
      status: 'verified',
      reviewedBy: coachUserId,
      reviewedAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      coachNote: coachNote || null,
      updatedAt: new Date().toISOString()
    });

    // Check if this task triggers a milestone verification
    await this.checkMilestoneVerification(carrierId, taskId);

    // TODO: Trigger notification to carrier (Round 5)
  },

  /**
   * Coach: Request changes on task
   * This is a coach-only action
   */
  async requestChanges(
    carrierId: string,
    taskId: string,
    coachUserId: string,
    coachNote: string
  ): Promise<void> {
    const existingStatus = await this.getCarrierTaskStatus(carrierId, taskId);
    
    if (!existingStatus) {
      throw new Error('Task status not found');
    }

    const statusDoc = doc(db, 'carrierTaskStatus', existingStatus.statusId);
    await updateDoc(statusDoc, {
      status: 'needs_changes',
      reviewedBy: coachUserId,
      reviewedAt: new Date().toISOString(),
      coachNote,
      updatedAt: new Date().toISOString()
    });

    // TODO: Trigger notification to carrier (Round 5)
  },

  /**
   * Coach: Flag task as requiring immediate attention
   * This is a coach-only action and updates carrier risk level to RED
   */
  async flagTask(
    carrierId: string,
    taskId: string,
    coachUserId: string,
    flagReason: string
  ): Promise<void> {
    const existingStatus = await this.getCarrierTaskStatus(carrierId, taskId);
    
    if (!existingStatus) {
      throw new Error('Task status not found');
    }

    const statusDoc = doc(db, 'carrierTaskStatus', existingStatus.statusId);
    await updateDoc(statusDoc, {
      status: 'needs_changes',
      reviewedBy: coachUserId,
      reviewedAt: new Date().toISOString(),
      coachNote: `⚠️ FLAGGED: ${flagReason}`,
      updatedAt: new Date().toISOString()
    });

    // Update carrier risk level to RED
    const carrierDoc = doc(db, 'carriers', carrierId);
    await updateDoc(carrierDoc, {
      riskLevel: 'red',
      updatedAt: new Date().toISOString()
    });

    // TODO: Trigger urgent notification to carrier and admin (Round 5)
  },

  /**
   * Check if task completion triggers a milestone verification
   * Called automatically after task verification
   */
  async checkMilestoneVerification(
    carrierId: string,
    taskId: string
  ): Promise<void> {
    // Get task details to determine milestone
    const taskDoc = await getDoc(doc(db, 'implementationTasks', taskId));
    if (!taskDoc.exists()) return;
    
    const task = taskDoc.data() as ImplementationTask;
    
    // Only create milestone if task is marked as requiredForMilestone
    if (!task.requiredForMilestone) return;

    // Create milestone verification record
    const milestoneRef = doc(collection(db, 'milestoneVerifications'));
    const milestone: MilestoneVerification = {
      milestoneId: milestoneRef.id,
      carrierId,
      cohortWeekId: task.cohortWeekId,
      milestoneName: task.title, // Use task title as milestone name
      verifiedAt: new Date(),
      verifiedBy: 'system', // Will be updated to actual coach in Round 3
      createdAt: new Date()
    };

    await setDoc(milestoneRef, milestone);
  },

  /**
   * Get all milestone verifications for a carrier
   */
  async getCarrierMilestones(carrierId: string): Promise<MilestoneVerification[]> {
    const milestonesRef = collection(db, 'milestoneVerifications');
    const q = query(
      milestonesRef,
      where('carrierId', '==', carrierId),
      orderBy('verifiedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as MilestoneVerification);
  },

  /**
   * Get all pending submissions (for coach review)
   */
  async getAllSubmissions(status: 'submitted' | 'verified' | 'needs_changes' = 'submitted'): Promise<CarrierTaskStatus[]> {
    const statusRef = collection(db, 'carrierTaskStatus');
    const q = query(
      statusRef,
      where('status', '==', status),
      orderBy('submittedAt', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as CarrierTaskStatus);
  }
};

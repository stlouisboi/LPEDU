/**
 * LaunchPath Notification Service
 * Round 5 Build 5A: Core Notification Events
 * 
 * Following Portal Brief: "The Portal Communicates Like an Institution. Plain, direct, consequential."
 */

import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';

export type NotificationType = 
  | 'admission_confirmed' 
  | 'cohort_week_unlock' 
  | 'task_submitted' 
  | 'task_needs_changes' 
  | 'task_verified' 
  | 'task_flagged' 
  | 'no_activity_7d' 
  | 'no_activity_14d'
  | 'copilot_escalation';

export interface Notification {
  id?: string;
  type: NotificationType;
  recipientId: string; // userId for carrier, or 'coach' / 'admin'
  carrierId?: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: any;
  metadata?: any;
}

export const notificationService = {
  /**
   * Send a notification following institutional voice standards
   */
  async sendNotification(
    type: NotificationType, 
    recipientId: string, 
    data: { 
      carrierName?: string; 
      cohortName?: string; 
      date?: string; 
      weekNum?: number; 
      taskName?: string; 
      note?: string;
      carrierId?: string;
    }
  ): Promise<void> {
    let title = '';
    let message = '';

    switch (type) {
      case 'admission_confirmed':
        title = 'Admission Confirmed';
        message = `Admission confirmed. Cohort ${data.cohortName} begins ${data.date}. Review your carrier profile before Week 1 unlocks.`;
        break;
      case 'cohort_week_unlock':
        title = `Week ${data.weekNum} Active`;
        message = `Week ${data.weekNum} of the LaunchPath Standard is now active. Implementation tasks are available.`;
        break;
      case 'task_submitted':
        title = 'Submission Pending';
        message = `Your ${data.taskName} submission is pending coach review.`;
        break;
      case 'task_needs_changes':
        title = 'Changes Required';
        message = `Your ${data.taskName} submission requires changes. Coach note: ${data.note}. Resubmit when corrections are complete.`;
        break;
      case 'task_verified':
        title = 'Submission Verified';
        message = `Your ${data.taskName} submission has been verified.`;
        break;
      case 'task_flagged':
        title = 'Submission Flagged';
        message = `Your coach has flagged your ${data.taskName} submission and will contact you directly.`;
        break;
      case 'no_activity_7d':
        title = 'Inactivity Warning';
        message = `No activity recorded for 7 days. Your authority risk level has been updated to YELLOW.`;
        break;
      case 'no_activity_14d':
        title = 'Critical Inactivity';
        message = `No activity recorded for 14 days. Your authority risk level has been updated to RED. Coach intervention required.`;
        break;
      case 'copilot_escalation':
        title = 'Copilot Escalation';
        message = `Doctrine Advisor escalated a question. Response required.`;
        break;
    }

    await addDoc(collection(db, 'notifications'), {
      type,
      recipientId,
      carrierId: data.carrierId || null,
      title,
      message,
      read: false,
      createdAt: serverTimestamp(),
      metadata: data
    });
  },

  /**
   * Get notifications for a user
   */
  async getNotifications(userId: string, limitCount = 20): Promise<Notification[]> {
    const q = query(
      collection(db, 'notifications'),
      where('recipientId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
  }
};

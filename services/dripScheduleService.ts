import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Cohort, TimelineEvent } from '../types/cohort';

/**
 * Drip Schedule Service
 * Manages cohort-based module unlocking and timeline progression
 * 
 * CRITICAL: This is cohort-paced, NOT individual-paced.
 * All carriers in a cohort progress together based on cohort start date.
 */

// 90-Day Timeline Structure (13 weeks)
export const COHORT_TIMELINE = [
  // Week 1: Ground 0 + Module 1 Start
  {
    week: 1,
    title: "Discipline Standard & Authority Protection",
    unlockedModules: ['ground-0', 'module-1'],
    milestones: ['Ground 0 completion required', 'Authority Protection begins'],
    coachReview: false
  },
  // Week 2-3: Module 1 Completion
  {
    week: 2,
    title: "Authority Protection (Continued)",
    unlockedModules: ['ground-0', 'module-1'],
    milestones: [],
    coachReview: false
  },
  {
    week: 3,
    title: "Authority Protection Completion",
    unlockedModules: ['ground-0', 'module-1'],
    milestones: ['Module 1 verification deadline'],
    coachReview: true
  },
  // Week 4-5: Module 2 - Insurance Continuity
  {
    week: 4,
    title: "Insurance Continuity",
    unlockedModules: ['ground-0', 'module-1', 'module-2'],
    milestones: ['Module 2 begins'],
    coachReview: false
  },
  {
    week: 5,
    title: "Insurance Continuity Completion",
    unlockedModules: ['ground-0', 'module-1', 'module-2'],
    milestones: ['Module 2 verification deadline'],
    coachReview: true
  },
  // Week 6-8: Module 3 - Compliance Backbone
  {
    week: 6,
    title: "Compliance Backbone (Part 1)",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3'],
    milestones: ['Module 3 begins - Longest module'],
    coachReview: false
  },
  {
    week: 7,
    title: "Compliance Backbone (Part 2)",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3'],
    milestones: [],
    coachReview: false
  },
  {
    week: 8,
    title: "Compliance Backbone Completion",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3'],
    milestones: ['Module 3 verification deadline'],
    coachReview: true
  },
  // Week 9-10: Module 4 - Cash Flow Oxygen
  {
    week: 9,
    title: "Cash-Flow Oxygen",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3', 'module-4'],
    milestones: ['Module 4 begins'],
    coachReview: false
  },
  {
    week: 10,
    title: "Cash-Flow Oxygen Completion",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3', 'module-4'],
    milestones: ['Module 4 verification deadline'],
    coachReview: true
  },
  // Week 11-12: Module 5 - Audit Readiness
  {
    week: 11,
    title: "Audit Readiness",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
    milestones: ['Module 5 begins'],
    coachReview: false
  },
  {
    week: 12,
    title: "Audit Readiness Completion",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
    milestones: ['Module 5 verification deadline'],
    coachReview: true
  },
  // Week 13: Module 6 - Stabilization & Scale
  {
    week: 13,
    title: "Stabilization & Scale",
    unlockedModules: ['ground-0', 'module-1', 'module-2', 'module-3', 'module-4', 'module-5', 'module-6'],
    milestones: ['Final module', 'System completion'],
    coachReview: true
  }
];

export const dripScheduleService = {
  /**
   * Get current week number for a cohort based on start date
   */
  getCurrentWeek(cohortStartDate: string): number {
    const start = new Date(cohortStartDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.ceil(diffDays / 7);
    
    // Cap at week 13
    return Math.min(weekNumber, 13);
  },

  /**
   * Get unlocked modules for a cohort based on current week
   */
  getUnlockedModules(cohortStartDate: string): string[] {
    const currentWeek = this.getCurrentWeek(cohortStartDate);
    const weekData = COHORT_TIMELINE.find(w => w.week === currentWeek);
    
    if (!weekData) {
      return ['ground-0']; // Default: only Ground 0
    }

    return weekData.unlockedModules;
  },

  /**
   * Check if a module is unlocked for a cohort
   */
  isModuleUnlocked(cohortStartDate: string, moduleId: string): boolean {
    const unlockedModules = this.getUnlockedModules(cohortStartDate);
    return unlockedModules.includes(moduleId);
  },

  /**
   * Get timeline data for current week
   */
  getCurrentWeekData(cohortStartDate: string) {
    const currentWeek = this.getCurrentWeek(cohortStartDate);
    return COHORT_TIMELINE.find(w => w.week === currentWeek) || COHORT_TIMELINE[0];
  },

  /**
   * Get all timeline events for a cohort
   */
  async getTimelineEvents(cohortId: string): Promise<TimelineEvent[]> {
    const q = query(
      collection(db, 'timelineEvents'), 
      where('cohortId', '==', cohortId)
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as TimelineEvent);
  },

  /**
   * Create timeline events for a new cohort
   */
  async createTimelineForCohort(cohortId: string, cohortStartDate: string): Promise<void> {
    const eventsRef = collection(db, 'timelineEvents');
    
    for (const weekData of COHORT_TIMELINE) {
      // Calculate week start date
      const weekStartDate = new Date(cohortStartDate);
      weekStartDate.setDate(weekStartDate.getDate() + ((weekData.week - 1) * 7));

      // Create event for each milestone
      for (const milestone of weekData.milestones) {
        const eventRef = doc(eventsRef);
        const event: TimelineEvent = {
          id: eventRef.id,
          cohortId: cohortId,
          week: weekData.week,
          title: milestone,
          description: weekData.title,
          dueDate: weekStartDate.toISOString(),
          type: weekData.coachReview ? 'coach_review' : 'milestone',
          completed: false,
          createdAt: new Date().toISOString()
        };

        await setDoc(eventRef, event);
      }
    }
  },

  /**
   * Get next milestone for a cohort
   */
  getNextMilestone(cohortStartDate: string) {
    const currentWeek = this.getCurrentWeek(cohortStartDate);
    
    // Find next week with milestones
    for (let week = currentWeek; week <= 13; week++) {
      const weekData = COHORT_TIMELINE.find(w => w.week === week);
      if (weekData && weekData.milestones.length > 0) {
        return {
          week: weekData.week,
          title: weekData.milestones[0],
          description: weekData.title,
          coachReview: weekData.coachReview
        };
      }
    }

    return null;
  },

  /**
   * Get progress percentage for a cohort
   */
  getProgressPercentage(cohortStartDate: string): number {
    const currentWeek = this.getCurrentWeek(cohortStartDate);
    return Math.round((currentWeek / 13) * 100);
  },

  /**
   * Check if cohort has completed the program
   */
  isCohortComplete(cohortStartDate: string): boolean {
    return this.getCurrentWeek(cohortStartDate) >= 13;
  },

  /**
   * Get days remaining in current week
   */
  getDaysRemainingInWeek(cohortStartDate: string): number {
    const start = new Date(cohortStartDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const daysIntoCurrentWeek = diffDays % 7;
    
    return 7 - daysIntoCurrentWeek;
  }
};

/**
 * LaunchPath Cohort System - Type Definitions
 * Round 1 Build 1A: Cohort Object and Data Model
 * 
 * Based on Portal Brief v2 specification
 */

// ============================================================================
// COHORT TYPES
// ============================================================================

export interface Cohort {
  cohortId: string;                    // Unique identifier (e.g., "cohort_2025_q1_001")
  cohortName: string;                  // Display name (e.g., "Q1 2025 Cohort Alpha")
  startDate: Date;                     // Cohort start date
  endDate: Date;                       // Cohort end date (startDate + 90 days)
  status: 'upcoming' | 'active' | 'complete';
  capacity: number;                    // Maximum carriers (default: 10)
  enrolled: number;                    // Current enrollment count
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// CARRIER PROFILE TYPES
// ============================================================================

export interface CarrierProfile {
  carrierId: string;                   // Unique carrier identifier
  userId: string;                      // Firebase Auth UID
  cohortId: string;                    // Associated cohort
  
  // Authority Information
  legalName: string;                   // Full legal name
  mcNumber: string;                    // MC number
  dotNumber: string;                   // DOT number
  authorityStatus: 'active' | 'inactive' | 'revoked' | 'unknown';
  
  // Operational Details
  fleetSize: number;                   // Number of power units
  operatingLanes: string[];            // Geographic operating areas
  
  // Cohort Progress
  currentWeek: number;                 // Current cohort week (1-13)
  riskLevel: 'green' | 'yellow' | 'red';
  lastActivityDate: Date;
  
  // Metadata
  admissionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// COHORT WEEK TYPES
// ============================================================================

export interface CohortWeek {
  weekId: string;                      // Unique identifier (e.g., "cohort_2025_q1_001_week_01")
  cohortId: string;                    // Parent cohort
  weekNumber: number;                  // 1-13
  unlockDate: Date;                    // When this week becomes available
  title: string;                       // Week title (e.g., "Authority Protection Foundation")
  description: string;                 // Week overview
  taskIds: string[];                   // Array of task IDs for this week
  createdAt: Date;
}

// ============================================================================
// IMPLEMENTATION TASK TYPES
// ============================================================================

export interface ImplementationTask {
  taskId: string;                      // Unique identifier
  cohortWeekId: string;                // Parent cohort week
  title: string;                       // Task title
  description: string;                 // Task description
  taskType: 'document' | 'checklist' | 'file_upload' | 'assessment';
  pillar: 'authority' | 'insurance' | 'compliance' | 'cash_flow';
  estimatedMinutes: number;            // Time estimate
  requiredForMilestone: boolean;       // Is this task required for milestone verification?
  sortOrder: number;                   // Display order within week
  createdAt: Date;
}

// ============================================================================
// CARRIER TASK STATUS TYPES
// ============================================================================

export interface CarrierTaskStatus {
  statusId: string;                    // Unique identifier
  carrierId: string;                   // Carrier this status belongs to
  taskId: string;                      // Task this status is for
  status: 'locked' | 'available' | 'in_progress' | 'submitted' | 'needs_changes' | 'verified';
  
  // Submission Data
  submittedAt?: Date;
  submissionData?: any;                // Task-specific submission (document URL, checklist answers, etc.)
  
  // Coach Review
  reviewedBy?: string;                 // Coach user ID
  reviewedAt?: Date;
  coachNote?: string;                  // Coach feedback
  
  // Timestamps
  startedAt?: Date;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// MILESTONE VERIFICATION TYPES
// ============================================================================

export interface MilestoneVerification {
  milestoneId: string;                 // Unique identifier
  carrierId: string;                   // Carrier who earned this
  cohortWeekId: string;                // Week this milestone belongs to
  milestoneName: string;               // Display name (e.g., "Authority Protection Complete")
  verifiedAt: Date;
  verifiedBy: string;                  // Coach user ID
  createdAt: Date;
}

// ============================================================================
// COACH ASSIGNMENT TYPES
// ============================================================================

export interface CoachAssignment {
  assignmentId: string;                // Unique identifier
  cohortId: string;                    // Cohort being coached
  coachUserId: string;                 // Coach's Firebase Auth UID
  coachName: string;                   // Coach display name
  assignedAt: Date;
  createdAt: Date;
}

// ============================================================================
// COACH NOTE TYPES
// ============================================================================

export interface CoachNote {
  noteId: string;                      // Unique identifier
  carrierId: string;                   // Carrier this note is about
  coachUserId: string;                 // Coach who wrote the note
  noteText: string;                    // Note content
  noteType: 'general' | 'risk_flag' | 'submission_feedback';
  isPrivate: boolean;                  // Visible only to coaches and admin
  createdAt: Date;
}

// ============================================================================
// CARRIER TIMELINE EVENT TYPES
// ============================================================================

export interface CarrierTimelineEvent {
  eventId: string;                     // Unique identifier
  carrierId: string;                   // Carrier this event belongs to
  eventType: 'admission' | 'week_unlock' | 'task_submitted' | 'task_verified' | 'task_needs_changes' | 'risk_level_change' | 'coach_note' | 'milestone_earned';
  eventData: any;                      // Event-specific data
  createdAt: Date;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type RiskLevel = 'green' | 'yellow' | 'red';
export type TaskStatus = 'locked' | 'available' | 'in_progress' | 'submitted' | 'needs_changes' | 'verified';
export type CohortStatus = 'upcoming' | 'active' | 'complete';
export type Pillar = 'authority' | 'insurance' | 'compliance' | 'cash_flow';

// ============================================================================
// FIRESTORE COLLECTION NAMES
// ============================================================================

export const COLLECTIONS = {
  COHORTS: 'cohorts',
  CARRIER_PROFILES: 'carrierProfiles',
  COHORT_WEEKS: 'cohortWeeks',
  IMPLEMENTATION_TASKS: 'implementationTasks',
  CARRIER_TASK_STATUS: 'carrierTaskStatus',
  MILESTONE_VERIFICATIONS: 'milestoneVerifications',
  COACH_ASSIGNMENTS: 'coachAssignments',
  COACH_NOTES: 'coachNotes',
  CARRIER_TIMELINE_EVENTS: 'carrierTimelineEvents',
} as const;

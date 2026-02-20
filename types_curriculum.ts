// LaunchPath Curriculum Content Types

export interface Lesson {
  id: string;
  moduleId: number;
  lessonNumber: number;
  title: string;
  objective: string;
  content: string; // HTML or Markdown
  videoUrl?: string;
  videoStoragePath?: string;
  duration: string;
  order: number;
  resourceIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  moduleId: number;
  lessonId?: string;
  title: string;
  description: string;
  type: 'checklist' | 'template' | 'sop' | 'calculator' | 'other';
  fileUrl: string;
  fileStoragePath: string;
  fileType: 'pdf' | 'xlsx' | 'docx' | 'other';
  order: number;
  createdAt: string;
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface Assessment {
  id: string;
  moduleId: number;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  createdAt: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  moduleId: number;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent: number; // in seconds
  assessmentScore?: number;
  assessmentAttempts: number;
  lastAccessedAt: string;
}

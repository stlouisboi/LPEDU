import { collection, addDoc, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Lesson, Resource, Assessment } from '../types_curriculum';

/**
 * Upload a lesson to Firestore
 */
export const uploadLesson = async (lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!db) throw new Error('Firestore not initialized');
  
  const now = new Date().toISOString();
  const lessonData = {
    ...lesson,
    createdAt: now,
    updatedAt: now
  };
  
  const docRef = await addDoc(collection(db, 'lessons'), lessonData);
  return docRef.id;
};

/**
 * Upload a video file to Firebase Storage
 */
export const uploadVideo = async (
  file: File,
  moduleId: number,
  lessonNumber: number
): Promise<{ url: string; path: string }> => {
  if (!storage) throw new Error('Storage not initialized');
  
  const timestamp = Date.now();
  const storagePath = `curriculum_videos/module_${moduleId}_lesson_${lessonNumber}_${timestamp}.mp4`;
  const storageRef = ref(storage, storagePath);
  
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  
  return { url, path: storagePath };
};

/**
 * Upload a resource file to Firebase Storage
 */
export const uploadResource = async (
  file: File,
  moduleId: number,
  resourceType: string
): Promise<{ url: string; path: string }> => {
  if (!storage) throw new Error('Storage not initialized');
  
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const storagePath = `resources/module_${moduleId}_${resourceType}_${timestamp}.${extension}`;
  const storageRef = ref(storage, storagePath);
  
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  
  return { url, path: storagePath };
};

/**
 * Upload a resource to Firestore
 */
export const uploadResourceMetadata = async (
  resource: Omit<Resource, 'id' | 'createdAt'>
): Promise<string> => {
  if (!db) throw new Error('Firestore not initialized');
  
  const now = new Date().toISOString();
  const resourceData = {
    ...resource,
    createdAt: now
  };
  
  const docRef = await addDoc(collection(db, 'resources'), resourceData);
  return docRef.id;
};

/**
 * Upload an assessment to Firestore
 */
export const uploadAssessment = async (
  assessment: Omit<Assessment, 'id' | 'createdAt'>
): Promise<string> => {
  if (!db) throw new Error('Firestore not initialized');
  
  const now = new Date().toISOString();
  const assessmentData = {
    ...assessment,
    createdAt: now
  };
  
  const docRef = await addDoc(collection(db, 'assessments'), assessmentData);
  return docRef.id;
};

/**
 * Get all lessons for a module
 */
export const getLessonsByModule = async (moduleId: number): Promise<Lesson[]> => {
  if (!db) throw new Error('Firestore not initialized');
  
  const q = query(collection(db, 'lessons'), where('moduleId', '==', moduleId));
  const snapshot = await getDocs(q);
  
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as Lesson))
    .sort((a, b) => a.order - b.order);
};

/**
 * Get all resources for a module
 */
export const getResourcesByModule = async (moduleId: number): Promise<Resource[]> => {
  if (!db) throw new Error('Firestore not initialized');
  
  const q = query(collection(db, 'resources'), where('moduleId', '==', moduleId));
  const snapshot = await getDocs(q);
  
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as Resource))
    .sort((a, b) => a.order - b.order);
};

/**
 * Bulk upload lessons from JSON
 */
export const bulkUploadLessons = async (lessons: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<string[]> => {
  const ids: string[] = [];
  
  for (const lesson of lessons) {
    const id = await uploadLesson(lesson);
    ids.push(id);
  }
  
  return ids;
};

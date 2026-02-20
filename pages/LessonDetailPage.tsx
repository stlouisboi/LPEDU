import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEnhancedAuth } from '../EnhancedAuthContext';
import { Lesson, Resource } from '../types_curriculum';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Download, 
  FileText,
  Clock,
  Target,
  Play,
  Loader2
} from 'lucide-react';

const LessonDetailPage = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useEnhancedAuth();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonId || !db) return;
      
      try {
        // Fetch current lesson
        const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
        if (lessonDoc.exists()) {
          const lessonData = { id: lessonDoc.id, ...lessonDoc.data() } as Lesson;
          setLesson(lessonData);
          
          // Fetch resources for this lesson
          if (lessonData.resourceIds && lessonData.resourceIds.length > 0) {
            const resourcePromises = lessonData.resourceIds.map(id => 
              getDoc(doc(db, 'resources', id))
            );
            const resourceDocs = await Promise.all(resourcePromises);
            const resourcesData = resourceDocs
              .filter(doc => doc.exists())
              .map(doc => ({ id: doc.id, ...doc.data() } as Resource));
            setResources(resourcesData);
          }
          
          // Fetch all lessons in this module for navigation
          const lessonsQuery = query(
            collection(db, 'lessons'),
            where('moduleId', '==', lessonData.moduleId)
          );
          const lessonsSnapshot = await getDocs(lessonsQuery);
          const lessonsData = lessonsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Lesson))
            .sort((a, b) => a.order - b.order);
          setAllLessons(lessonsData);
          
          // Check if user has completed this lesson
          if (currentUser) {
            const progressDoc = await getDoc(
              doc(db, 'userProgress', `${currentUser.uid}_${lessonId}`)
            );
            if (progressDoc.exists()) {
              setCompleted(progressDoc.data().completed);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId, currentUser]);

  const handleMarkComplete = async () => {
    if (!currentUser || !lesson || !db) return;
    
    setMarking(true);
    try {
      const progressId = `${currentUser.uid}_${lessonId}`;
      await setDoc(doc(db, 'userProgress', progressId), {
        userId: currentUser.uid,
        moduleId: lesson.moduleId,
        lessonId: lesson.id,
        completed: true,
        completedAt: new Date().toISOString(),
        timeSpent: 0, // TODO: Track actual time spent
        assessmentAttempts: 0,
        lastAccessedAt: new Date().toISOString()
      });
      setCompleted(true);
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    } finally {
      setMarking(false);
    }
  };

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-primary-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-primary-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-text-primary dark:text-white mb-4">Lesson not found</p>
          <Link to={`/modules/${moduleId}`} className="text-authority-blue hover:underline">
            Back to Module
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-primary-dark">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-dark border-b border-slate-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link 
            to={`/modules/${moduleId}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-authority-blue hover:text-authority-blue/80 mb-4"
          >
            <ChevronLeft size={16} />
            BACK TO MODULE
          </Link>
          
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-signal-gold mb-2">
                Lesson {lesson.lessonNumber}
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary dark:text-white mb-4">
                {lesson.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {lesson.duration}
                </div>
                {completed && (
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle size={16} />
                    Completed
                  </div>
                )}
              </div>
            </div>
            
            {!completed && (
              <button
                onClick={handleMarkComplete}
                disabled={marking}
                className="px-6 py-3 bg-authority-blue text-white rounded-full font-bold hover:bg-authority-blue/90 disabled:opacity-50 flex items-center gap-2"
              >
                {marking ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Marking...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Mark Complete
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Objective */}
        <div className="bg-authority-blue/5 dark:bg-authority-blue/10 border-l-4 border-authority-blue rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Target className="text-authority-blue flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-authority-blue mb-2">
                Learning Objective
              </p>
              <p className="text-text-primary dark:text-white font-medium">
                {lesson.objective}
              </p>
            </div>
          </div>
        </div>

        {/* Video */}
        {lesson.videoUrl && (
          <div className="bg-black rounded-2xl overflow-hidden mb-8 aspect-video">
            <video 
              src={lesson.videoUrl} 
              controls 
              className="w-full h-full"
              poster="/img/video-placeholder.jpg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Lesson Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {/* Resources */}
        {resources.length > 0 && (
          <div className="bg-white dark:bg-secondary-dark rounded-2xl border border-slate-200 dark:border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-black text-text-primary dark:text-white mb-6 flex items-center gap-3">
              <FileText className="text-signal-gold" size={24} />
              Downloadable Resources
            </h2>
            
            <div className="space-y-4">
              {resources.map(resource => (
                <a
                  key={resource.id}
                  href={resource.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-primary-dark rounded-xl border border-slate-200 dark:border-white/10 hover:border-signal-gold dark:hover:border-signal-gold transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-signal-gold/10 rounded-lg flex items-center justify-center">
                      <FileText className="text-signal-gold" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary dark:text-white group-hover:text-signal-gold transition-colors">
                        {resource.title}
                      </p>
                      <p className="text-sm text-text-muted">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <Download className="text-text-muted group-hover:text-signal-gold transition-colors" size={20} />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10">
          {previousLesson ? (
            <Link
              to={`/modules/${moduleId}/lessons/${previousLesson.id}`}
              className="flex items-center gap-2 text-authority-blue hover:text-authority-blue/80 font-bold"
            >
              <ChevronLeft size={20} />
              <div className="text-left">
                <p className="text-xs text-text-muted">Previous</p>
                <p>{previousLesson.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              to={`/modules/${moduleId}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-authority-blue hover:text-authority-blue/80 font-bold"
            >
              <div className="text-right">
                <p className="text-xs text-text-muted">Next</p>
                <p>{nextLesson.title}</p>
              </div>
              <ChevronRight size={20} />
            </Link>
          ) : (
            <Link
              to={`/modules/${moduleId}`}
              className="flex items-center gap-2 text-signal-gold hover:text-signal-gold/80 font-bold"
            >
              <div className="text-right">
                <p className="text-xs text-text-muted">Finish</p>
                <p>Back to Module</p>
              </div>
              <ChevronRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;

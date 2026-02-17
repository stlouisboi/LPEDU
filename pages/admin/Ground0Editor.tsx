import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2, Eye } from 'lucide-react';

interface Ground0Lesson {
  id: string;
  number: string;
  title: string;
  description: string;
  estimatedTime: string;
  content: string;
  isPublished: boolean;
}

const Ground0Editor = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Ground0Lesson>({
    id: lessonId || 'new',
    number: '',
    title: '',
    description: '',
    estimatedTime: '',
    content: '',
    isPublished: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Load lesson if editing
    if (lessonId && lessonId !== 'new') {
      // TODO: Fetch lesson from Firebase
      // const docRef = doc(db, 'ground0Lessons', lessonId);
      // onSnapshot(docRef, (doc) => {
      //   if (doc.exists()) {
      //     setLesson(doc.data() as Ground0Lesson);
      //   }
      // });
    }
  }, [lessonId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Firebase
      // if (lesson.id === 'new') {
      //   await addDoc(collection(db, 'ground0Lessons'), lesson);
      // } else {
      //   await updateDoc(doc(db, 'ground0Lessons', lesson.id), lesson);
      // }
      navigate('/admin/ground0');
    } catch (error) {
      console.error('Error saving lesson:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/ground0');
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase">Ground 0 Lesson Editor</h1>
          <p className="text-slate-400 mt-2">
            {lesson.id === 'new' ? 'Create a new lesson' : `Editing Lesson ${lesson.number}`}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all"
          >
            <Eye size={18} />
            <span className="font-bold">Preview</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 transition-all"
          >
            <X size={18} />
            <span className="font-bold">Cancel</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-signal-gold text-[#002244] rounded-lg hover:bg-white transition-all disabled:opacity-50"
          >
            <Save size={18} />
            <span className="font-bold">{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* EDITOR */}
        <div className="lg:col-span-2 space-y-6">
          {/* BASIC INFO */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h2 className="font-black uppercase">Lesson Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Lesson Number</label>
                <input
                  type="text"
                  value={lesson.number}
                  onChange={(e) => setLesson({ ...lesson, number: e.target.value })}
                  placeholder="e.g., 0.1"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Estimated Time</label>
                <input
                  type="text"
                  value={lesson.estimatedTime}
                  onChange={(e) => setLesson({ ...lesson, estimatedTime: e.target.value })}
                  placeholder="e.g., 15 min"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Lesson Title</label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                placeholder="Enter lesson title"
                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea
                value={lesson.description}
                onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                placeholder="Brief description of the lesson"
                rows={3}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* CONTENT EDITOR */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h2 className="font-black uppercase">Lesson Content</h2>
            <p className="text-xs text-slate-400">
              Use HTML or plain text. You can include headings, paragraphs, lists, and forms.
            </p>
            
            <textarea
              value={lesson.content}
              onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
              placeholder="Enter lesson content (HTML or plain text)"
              rows={20}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white placeholder-slate-500 font-mono text-sm"
            />
          </div>

          {/* PUBLISHING */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h2 className="font-black uppercase">Publishing</h2>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lesson.isPublished}
                onChange={(e) => setLesson({ ...lesson, isPublished: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="font-bold">Publish this lesson</span>
            </label>
            
            <p className="text-xs text-slate-400">
              {lesson.isPublished 
                ? 'This lesson is visible to users in the Ground 0 module.' 
                : 'This lesson is hidden. Publish it to make it visible.'}
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="font-black uppercase">Quick Actions</h3>
            
            <button className="w-full flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all">
              <Plus size={18} />
              <span className="font-bold">Add Image</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all">
              <Plus size={18} />
              <span className="font-bold">Add Video</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all">
              <Plus size={18} />
              <span className="font-bold">Add Quiz</span>
            </button>
          </div>

          {/* LESSON TEMPLATES */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="font-black uppercase">Templates</h3>
            
            <button className="w-full text-left px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all text-sm">
              <p className="font-bold">Pillar Overview</p>
              <p className="text-xs text-slate-400">Standard pillar explanation template</p>
            </button>
            
            <button className="w-full text-left px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all text-sm">
              <p className="font-bold">Checklist</p>
              <p className="text-xs text-slate-400">Interactive readiness checklist</p>
            </button>
            
            <button className="w-full text-left px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all text-sm">
              <p className="font-bold">Comparison Table</p>
              <p className="text-xs text-slate-400">Side-by-side comparison layout</p>
            </button>
          </div>

          {/* HELP */}
          <div className="bg-signal-gold/10 border border-signal-gold/30 p-6 rounded-2xl space-y-4">
            <h3 className="font-black uppercase text-signal-gold">Need Help?</h3>
            
            <p className="text-sm text-slate-300">
              Lessons are displayed in a structured format. Use clear headings and short paragraphs.
            </p>
            
            <a href="#" className="text-signal-gold font-bold text-sm hover:underline">
              View Documentation →
            </a>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#020617] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#020617] border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="font-black uppercase">Lesson Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Lesson {lesson.number}</p>
                <h1 className="text-3xl font-black uppercase mb-2">{lesson.title}</h1>
                <p className="text-slate-300">{lesson.description}</p>
              </div>
              
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ground0Editor;

import React, { useState } from 'react';
import { Upload, FileText, Video, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { uploadLesson, uploadVideo, bulkUploadLessons } from '../../utils/contentLoader';
import { Lesson } from '../../types_curriculum';

const LessonUploader = () => {
  const [moduleId, setModuleId] = useState<number>(1);
  const [lessonNumber, setLessonNumber] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState('');
  const [order, setOrder] = useState<number>(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSingleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage(null);

    try {
      let videoUrl = '';
      let videoStoragePath = '';

      // Upload video if provided
      if (videoFile) {
        const videoData = await uploadVideo(videoFile, moduleId, lessonNumber);
        videoUrl = videoData.url;
        videoStoragePath = videoData.path;
      }

      // Upload lesson
      const lessonData: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'> = {
        moduleId,
        lessonNumber,
        title,
        objective,
        content,
        videoUrl,
        videoStoragePath,
        duration,
        order,
        resourceIds: []
      };

      await uploadLesson(lessonData);

      setMessage({ type: 'success', text: 'Lesson uploaded successfully!' });
      
      // Reset form
      setTitle('');
      setObjective('');
      setContent('');
      setDuration('');
      setVideoFile(null);
      setLessonNumber(lessonNumber + 1);
      setOrder(order + 1);
    } catch (error) {
      console.error('Error uploading lesson:', error);
      setMessage({ type: 'error', text: 'Failed to upload lesson. Check console for details.' });
    } finally {
      setUploading(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!jsonFile) return;

    setUploading(true);
    setMessage(null);

    try {
      const text = await jsonFile.text();
      const lessons = JSON.parse(text) as Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>[];
      
      const ids = await bulkUploadLessons(lessons);
      
      setMessage({ type: 'success', text: `Successfully uploaded ${ids.length} lessons!` });
      setJsonFile(null);
    } catch (error) {
      console.error('Error bulk uploading lessons:', error);
      setMessage({ type: 'error', text: 'Failed to bulk upload lessons. Check console for details.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary dark:text-white mb-2">
          Lesson Uploader
        </h1>
        <p className="text-text-muted">
          Upload individual lessons or bulk upload from JSON
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
            : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Upload */}
        <div className="bg-white dark:bg-secondary-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6">
          <h2 className="text-xl font-black text-text-primary dark:text-white mb-6 flex items-center gap-2">
            <FileText size={24} className="text-authority-blue" />
            Single Lesson Upload
          </h2>

          <form onSubmit={handleSingleUpload} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                  Module ID
                </label>
                <input
                  type="number"
                  value={moduleId}
                  onChange={(e) => setModuleId(parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                  Lesson Number
                </label>
                <input
                  type="number"
                  value={lessonNumber}
                  onChange={(e) => setLessonNumber(parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                Objective
              </label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                Content (HTML)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white font-mono text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 12 minutes"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary dark:text-white mb-2 flex items-center gap-2">
                <Video size={16} className="text-authority-blue" />
                Video File (Optional)
              </label>
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full px-6 py-3 bg-authority-blue text-white rounded-lg font-bold hover:bg-authority-blue/90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Lesson
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bulk Upload */}
        <div className="bg-white dark:bg-secondary-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6">
          <h2 className="text-xl font-black text-text-primary dark:text-white mb-6 flex items-center gap-2">
            <Upload size={24} className="text-signal-gold" />
            Bulk Upload from JSON
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text-primary dark:text-white mb-2">
                JSON File
              </label>
              <input
                type="file"
                accept="application/json"
                onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-primary-dark text-text-primary dark:text-white"
              />
            </div>

            <button
              onClick={handleBulkUpload}
              disabled={!jsonFile || uploading}
              className="w-full px-6 py-3 bg-signal-gold text-authority-blue rounded-lg font-bold hover:bg-signal-gold/90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Bulk Upload
                </>
              )}
            </button>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-primary-dark rounded-lg">
              <p className="text-xs font-bold text-text-primary dark:text-white mb-2">
                JSON Format Example:
              </p>
              <pre className="text-xs text-text-muted font-mono overflow-x-auto">
{`[
  {
    "moduleId": 1,
    "lessonNumber": 1,
    "title": "Lesson Title",
    "objective": "Learning objective",
    "content": "<p>HTML content</p>",
    "duration": "12 minutes",
    "order": 1,
    "resourceIds": []
  }
]`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonUploader;

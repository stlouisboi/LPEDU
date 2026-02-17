import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface Ground0Lesson {
  id: string;
  number: string;
  title: string;
  description: string;
  estimatedTime: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Ground0List = () => {
  const [lessons, setLessons] = useState<Ground0Lesson[]>([
    {
      id: '1',
      number: '0.1',
      title: 'Welcome to Ground 0',
      description: 'What LaunchPath is, what it is not, and who it is for.',
      estimatedTime: '12 min',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      number: '0.2',
      title: 'The Four Pillars of Survival',
      description: 'Understanding the interlocking system that keeps a carrier alive.',
      estimatedTime: '15 min',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      number: '0.3',
      title: 'Lane Selection: Box vs. Semi',
      description: 'Evaluating your operational model and capital requirements.',
      estimatedTime: '18 min',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      number: '0.4',
      title: 'Personal Readiness Check',
      description: 'Evaluating your institutional readiness across all four pillars.',
      estimatedTime: '20 min',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      number: '0.5',
      title: 'Risk Tolerance & Stop-Loss',
      description: 'Establishing the hard lines where operations must cease.',
      estimatedTime: '15 min',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      number: '0.6',
      title: 'The GO / WAIT / NO-GO Decision',
      description: 'Your institutional readiness outcome.',
      estimatedTime: '10 min',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');

  const handleTogglePublish = (id: string) => {
    setLessons(lessons.map(lesson =>
      lesson.id === id ? { ...lesson, isPublished: !lesson.isPublished } : lesson
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lesson? This cannot be undone.')) {
      setLessons(lessons.filter(lesson => lesson.id !== id));
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    if (filterPublished === 'published') return lesson.isPublished;
    if (filterPublished === 'draft') return !lesson.isPublished;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase text-white dark:text-white">Ground 0 Lessons</h1>
          <p className="text-slate-300 dark:text-slate-300 mt-2">Manage the Ground 0 institutional decision engine</p>
        </div>
        <Link
          to="/admin/ground0/new"
          className="flex items-center space-x-2 px-6 py-3 bg-signal-gold text-[#002244] rounded-lg hover:bg-white transition-all font-bold uppercase tracking-wider"
        >
          <Plus size={20} />
          <span>New Lesson</span>
        </Link>
      </div>

      {/* INFO BOX */}
      <div className="bg-signal-gold/10 border border-signal-gold/30 p-6 rounded-2xl flex items-start space-x-4">
        <AlertCircle size={24} className="text-signal-gold flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-black text-signal-gold uppercase mb-2">Ground 0 Overview</h3>
          <p className="text-slate-100 dark:text-slate-100 text-sm">
            Ground 0 is a 90-minute institutional decision engine that determines whether launching a motor carrier authority is sound. All 6 lessons (0.1–0.6) are required for the complete module experience.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-bold text-slate-300 dark:text-slate-300 uppercase tracking-wider">Filter:</span>
        {(['all', 'published', 'draft'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterPublished(status)}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all ${
              filterPublished === status
                ? 'bg-signal-gold text-[#002244]'
                : 'bg-white/5 border border-white/10 hover:border-signal-gold/50'
            }`}
          >
            {status === 'all' ? 'All Lessons' : status === 'published' ? 'Published' : 'Drafts'}
          </button>
        ))}
      </div>

      {/* LESSONS TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-200 dark:text-slate-200">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-200 dark:text-slate-200">Lesson</th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-200 dark:text-slate-200">Description</th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-200 dark:text-slate-200">Time</th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-200 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-200 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLessons.map(lesson => (
              <tr key={lesson.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedLessons.includes(lesson.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLessons([...selectedLessons, lesson.id]);
                      } else {
                        setSelectedLessons(selectedLessons.filter(id => id !== lesson.id));
                      }
                    }}
                    className="w-4 h-4"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-xs font-black text-signal-gold uppercase mb-1">Lesson {lesson.number}</p>
                    <p className="font-bold">{lesson.title}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-300 dark:text-slate-300">{lesson.description}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">{lesson.estimatedTime}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    lesson.isPublished
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {lesson.isPublished ? (
                      <>
                        <Eye size={12} />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} />
                        <span>Draft</span>
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/admin/ground0/edit/${lesson.id}`}
                      className="p-2 hover:bg-white/5 rounded-lg transition-all"
                      title="Edit lesson"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(lesson.id)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-all"
                      title={lesson.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {lesson.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-red-500"
                      title="Delete lesson"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-slate-300 dark:text-slate-300 mb-4">No lessons found</p>
          <Link
            to="/admin/ground0/new"
            className="inline-flex items-center space-x-2 px-6 py-2 bg-signal-gold text-[#002244] rounded-lg hover:bg-white transition-all font-bold"
          >
            <Plus size={18} />
            <span>Create First Lesson</span>
          </Link>
        </div>
      )}

      {/* BULK ACTIONS */}
      {selectedLessons.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 bg-white/10 border border-white/20 backdrop-blur p-4 rounded-xl flex items-center justify-between">
          <p className="font-bold">{selectedLessons.length} lesson(s) selected</p>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all font-bold">
              Publish All
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 transition-all font-bold text-red-500">
              Delete All
            </button>
            <button
              onClick={() => setSelectedLessons([])}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/50 transition-all font-bold"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ground0List;

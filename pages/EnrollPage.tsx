
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle,
  CheckCircle2, 
  Lock, 
  ChevronDown,
  Video,
  AlertCircle,
  User,
  Mail
} from 'lucide-react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { useApp } from '../App';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';

const EnrollPage = () => {
  const { settings, addFormSubmission } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "generatedVideos"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data);
    }, (error) => {
      console.warn("EnrollPage: Video preview sync limited.", error);
    });
    return unsub;
  }, []);

  const validation = useMemo(() => {
    const errors = {
      name: formData.name.length < 2 ? 'Please enter your full name.' : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid email.' : null,
      password: formData.password.length < 8 ? 'Min 8 characters.' : null
    };
    return { errors, isValid: !errors.name && !errors.email && !errors.password };
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) return;
    addFormSubmission({ type: 'Course Enrollment', ...formData, date: new Date().toISOString() });
    alert("Enrollment successful!");
    navigate('/'); 
  };

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-center mb-12">Enroll in Mastery</h1>
        <form onSubmit={handleEnroll} className="space-y-6 bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-2xl">
          <input required name="name" placeholder="Full Name" className="w-full p-4 border rounded-xl" value={formData.name} onChange={handleInputChange} />
          <input required name="email" type="email" placeholder="Email" className="w-full p-4 border rounded-xl" value={formData.email} onChange={handleInputChange} />
          <input required name="password" type="password" placeholder="Password" className="w-full p-4 border rounded-xl" value={formData.password} onChange={handleInputChange} />
          <button type="submit" disabled={!validation.isValid} className="w-full bg-authority-blue text-white py-5 rounded-2xl font-bold shadow-xl">Start Program</button>
        </form>
      </div>
    </div>
  );
};

export default EnrollPage;

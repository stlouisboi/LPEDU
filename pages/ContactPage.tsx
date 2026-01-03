
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useApp } from '../App';

const ContactPage = () => {
  const { settings, addFormSubmission } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFormSubmission({
      type: 'Contact Inquiry',
      date: new Date().toISOString(),
      ...formData
    });
    setIsSubmitted(true);
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div className="animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl font-bold font-serif mb-8">Let's Talk Compliance</h1>
            <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed">
              Have a question about your new entrant audit? Need help with your DQ files? Our expert educators are here to provide clarity.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm">
                  <Mail className="w-6 h-6 text-authority-blue" />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-text-muted">{settings.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm">
                  <Phone className="w-6 h-6 text-authority-blue" />
                </div>
                <div>
                  <h4 className="font-bold">Call Support</h4>
                  <p className="text-text-muted">{settings.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm">
                  <MapPin className="w-6 h-6 text-authority-blue" />
                </div>
                <div>
                  <h4 className="font-bold">Main Office</h4>
                  <p className="text-text-muted">Logistics District, Dallas, TX 75201</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-xl border border-border-light dark:border-border-dark animate-in slide-in-from-right duration-700">
            {isSubmitted ? (
              <div className="text-center py-16">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                   <CheckCircle className="w-10 h-10" />
                 </div>
                 <h2 className="text-3xl font-bold font-serif mb-4">Message Sent</h2>
                 <p className="text-text-muted max-w-sm mx-auto">We've received your inquiry. One of our compliance specialists will reach out within 24 business hours.</p>
                 <button onClick={() => setIsSubmitted(false)} className="mt-12 font-bold text-authority-blue hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all" 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all" 
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">How can we help?</label>
                  <textarea 
                    required
                    rows={5} 
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all" 
                    placeholder="I have a question about my safety audit..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-authority-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center space-x-2 hover:bg-steel-blue transition-all shadow-lg hover:shadow-none">
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

import React from 'react';

const LegalPage = () => {
  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl lg:text-7xl font-black font-serif mb-12 uppercase tracking-tight text-authority-blue dark:text-white">Legal Information</h1>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-authority-blue dark:text-signal-gold uppercase tracking-tight">Compliance Disclaimer</h2>
            <div className="prose dark:prose-invert max-w-none text-text-muted">
              <p className="mb-4">
                LaunchPath is an educational platform. The information provided on this website, in our courses, and via our AI advisor does not constitute legal advice. 
              </p>
              <p className="mb-4">
                While we strive for 100% accuracy based on the most recent FMCSA (Federal Motor Carrier Safety Administration) guidelines, regulations are subject to change and interpretation by DOT officials. We strongly recommend consulting with a transportation attorney or qualified safety professional for complex legal issues.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-authority-blue dark:text-signal-gold uppercase tracking-tight">Privacy Policy</h2>
            <div className="prose dark:prose-invert max-w-none text-text-muted">
              <p className="mb-4">
                Your data is protected. We collect minimal information necessary to provide our educational services. We never sell your personal or carrier information to insurance agencies, load boards, or third-party marketers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-authority-blue dark:text-signal-gold uppercase tracking-tight">Terms of Service</h2>
            <div className="prose dark:prose-invert max-w-none text-text-muted">
              <p className="mb-4">
                By using LaunchPath, you agree to use our resources for educational purposes only. Unauthorized reproduction or resale of our proprietary checklists and templates is strictly prohibited.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
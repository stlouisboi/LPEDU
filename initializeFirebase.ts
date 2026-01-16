import { doc, getDoc, setDoc, collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { INITIAL_SETTINGS, INITIAL_BLOGS, INITIAL_TESTIMONIALS, COURSE_MODULES } from "./constants";

export interface InitLog {
  message: string;
  type: 'info' | 'success' | 'error';
}

export const initializeFirebaseData = async (onLog: (log: InitLog) => void) => {
  if (!db) {
    onLog({ message: "Firestore is not initialized. Check your configuration.", type: 'error' });
    return;
  }

  const log = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    onLog({ message, type });
    console.log(`[Init] ${message}`);
  };

  try {
    // 1. Site Settings
    log("Initializing Global Settings...");
    await setDoc(doc(db, "settings", "general"), INITIAL_SETTINGS, { merge: true });
    log("Site settings initialized/updated.", "success");

    // 2. Course Modules
    log(`Syncing ${COURSE_MODULES.length} Course Modules...`);
    for (const mod of COURSE_MODULES) {
      await setDoc(doc(db, "courseModules", mod.id.toString()), mod, { merge: true });
    }
    log(`Course modules synced.`, "success");

    // 3. Testimonials
    log(`Syncing ${INITIAL_TESTIMONIALS.length} Testimonials...`);
    for (const t of INITIAL_TESTIMONIALS) {
      await setDoc(doc(db, "testimonials", t.id), t, { merge: true });
    }
    log(`Testimonials synced.`, "success");

    // 4. Blog Posts - With detailed progress logging
    log(`Syncing Knowledge Base (${INITIAL_BLOGS.length} articles)...`);
    let blogCount = 0;
    for (const blog of INITIAL_BLOGS) {
      blogCount++;
      const blogId = blog.id || blog.slug;
      await setDoc(doc(db, "blogPosts", blogId), blog, { merge: true });
      log(`Progress: ${blogCount} of ${INITIAL_BLOGS.length} - "${blog.title}"`, "info");
    }
    log("Knowledge base synchronization complete.", "success");

    // 5. Initialize Page Drafts
    log("Checking Homepage Content Draft...");
    const homeDraftRef = doc(db, "pages", "home_draft");
    const homeDraftSnap = await getDoc(homeDraftRef);
    
    if (!homeDraftSnap.exists()) {
      const defaultHomeContent = {
        hero: {
          headline: INITIAL_SETTINGS.heroTitle,
          subheadline: INITIAL_SETTINGS.heroSubtitle,
          imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
          primaryCTA: { text: 'Start Learning', link: '/enroll' },
          secondaryCTA: { text: 'View Roadmap', link: '/learning-path' }
        },
        mission: {
          headline: 'Accuracy Over Hype.',
          content: 'We provide the technical education required to survive the critical 18-month new entrant phase.',
          imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
        },
        stats: [
          { value: '500+', label: 'Active Carriers' },
          { value: '100%', label: 'Audit Success' },
          { value: '24/7', label: 'AI Support' }
        ],
        faqs: [
          { q: 'Is this for CDL only?', a: 'No, our systems apply to all motor carriers.' }
        ]
      };
      await setDoc(homeDraftRef, defaultHomeContent);
      await setDoc(doc(db, "pages", "home_live"), defaultHomeContent);
      log("Homepage content initialized.", "success");
    } else {
      log("Homepage content already exists, skipping initialization.", "info");
    }

    log("Firebase data initialization completed successfully!", "success");
  } catch (error: any) {
    log(`Initialization failed: ${error.message}`, "error");
    throw error;
  }
};
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fix: Property 'cwd' does not exist on type 'Process' - casting to any to access the Node.js cwd() method
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    appType: 'spa',
    define: {
      // The Gemini SDK requires the key to be available on process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.API_KEY || ""),
      
      // Explicitly define Firebase variables for use via process.env fallback
      'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(env.VITE_FIREBASE_API_KEY || ""),
      'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN || ""),
      'process.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(env.VITE_FIREBASE_PROJECT_ID || ""),
      'process.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET || ""),
      'process.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID || ""),
      'process.env.VITE_FIREBASE_APP_ID': JSON.stringify(env.VITE_FIREBASE_APP_ID || ""),
      
      'process.env.VITE_MAILERLITE_FORM_ID': JSON.stringify(env.VITE_MAILERLITE_FORM_ID || ""),
      'process.env.VITE_MAILERLITE_API_KEY': JSON.stringify(env.VITE_MAILERLITE_API_KEY || ""),
    },
    server: {
      port: 3000,
      strictPort: true,
      historyApiFallback: true
    },
    preview: {
      port: 3000,
      strictPort: true
    }
  };
});
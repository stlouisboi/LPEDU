
# LaunchPath Admin Setup Instructions

## 1. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named `LaunchPath-EDU`.
3. Enable **Authentication** and add the "Email/Password" provider.
4. Enable **Cloud Firestore** and set rules to allow read/write for authenticated users.
5. Enable **Storage** for resource uploads.
6. Register a Web App and copy the `firebaseConfig` details.

## 2. Environment Variables
In your deployment environment (Vercel) or local `.env` file, map the following variables used in `firebase.ts`:
- `YOUR_VITE_FIREBASE_API_KEY`
- `YOUR_VITE_FIREBASE_AUTH_DOMAIN`
- `YOUR_VITE_FIREBASE_PROJECT_ID`
- `YOUR_VITE_FIREBASE_STORAGE_BUCKET`
- `YOUR_VITE_FIREBASE_MESSAGING_SENDER_ID`
- `YOUR_VITE_FIREBASE_APP_ID`

## 3. Creating the First Admin
Since there is no "Sign Up" page for security:
1. Go to Firebase Console > Authentication > Users.
2. Click "Add User".
3. Enter an email (e.g., `admin@launchpath.com`) and a strong password.
4. Use these credentials to log in at `/admin/login`.

## 4. Database Structure
The following collections should be initialized in Firestore:
- `pages`: Document per page (home, about, etc.)
- `blogPosts`: List of articles.
- `resources`: List of files/links.
- `formSubmissions`: Entries from contact/lead forms.
- `siteSettings`: Global config.


# LaunchPath Admin Setup Instructions

## 1. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named `LaunchPath-EDU`.
3. Enable **Authentication** and add the "Email/Password" provider.
4. Enable **Cloud Firestore** and set rules (see below).
5. Enable **Storage** for resource uploads.
6. Register a Web App and copy the `firebaseConfig` details.

## 2. Firestore Security Rules
Copy and paste these rules into the **Rules** tab of your Firestore Database to resolve "Missing or insufficient permissions" errors:

```
service cloud.firestore {
  match /databases/{database}/documents {
    // Publicly readable content for the marketing site
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /pages/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blogPosts/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /resources/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /generatedVideos/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /leads/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Contact forms and lead captures (Public can create, only admin can manage)
    match /formSubmissions/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /contacts/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 3. Required Composite Indexes
For production-scale data, Firestore works best with composite indexes. If you see errors related to `Public Blog Fetch Error`, you should create the following index in **Firestore > Indexes**:

**Collection ID:** `blogPosts`
- **Field 1:** `status` (Ascending)
- **Field 2:** `publishedAt` (Descending)
- **Query Scope:** Collection

*Note: The app currently uses client-side sorting as a workaround to prevent initial configuration errors.*

## 4. Environment Variables
In your deployment environment (Vercel) or local `.env` file, map the following variables used in `firebase.ts`:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 5. Creating the First Admin
Since there is no "Sign Up" page for security:
1. Go to Firebase Console > Authentication > Users.
2. Click "Add User".
3. Enter an email (e.g., `admin@launchpath.com`) and a strong password.
4. Use these credentials to log in at `/admin/login`.

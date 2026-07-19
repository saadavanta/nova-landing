## Plan: Add Firebase Google Auth to Replace Base44 Google OAuth

### Problem
`base44.auth.loginWithProvider("google", "/")` only works on Base44's own domain (requires Pro plan). On your Vercel domain it shows "Domain is not valid."

### Solution
Add **Firebase Authentication** (free tier) to handle Google OAuth independently. The flow will be:
1. User clicks "Continue with Google" → Firebase popup handles Google sign-in
2. Firebase returns a Google ID token → send it to Base44 to register/login the user
3. Base44 returns a session token → app works as normal

### Files to create/modify

#### New files:
1. **`src/lib/firebase.js`** — Firebase app initialization + Google Auth provider setup
2. **`src/lib/firebaseAuth.js`** — Helper functions: `signInWithGoogle()`, `signOutFirebase()`

#### Modified files:
3. **`src/pages/Login.jsx`** — Replace `base44.auth.loginWithProvider("google", "/")` with `signInWithGoogle()` that:
   - Opens Firebase Google popup
   - Gets Google ID token
   - Calls `base44.auth.loginWithProvider` or a direct API call with the token
   - Handles errors gracefully

4. **`src/lib/AuthContext.jsx`** — Import Firebase signOut in the `logout()` function so Firebase session is also cleared on logout

5. **`package.json`** — Add `firebase` dependency

6. **`.env.local`** (local) / **Vercel env vars** (production) — Add 4 Firebase config values

### Steps:
1. Install Firebase (`npm install firebase`)
2. User creates a Firebase project at console.firebase.google.com (free)
3. Enable Google Auth provider in Firebase
4. Add Firebase Web App config (4 env vars: API key, Auth domain, Project ID, App ID)
5. Add the Vercel domain as authorized domain in Firebase (no plan restriction!)
6. Create `src/lib/firebase.js` with Firebase init
7. Create `src/lib/firebaseAuth.js` with `signInWithGoogle()` helper
8. Modify `Login.jsx` — replace the Google button handler
9. Modify `AuthContext.jsx` — add Firebase signOut to logout
10. Test locally, then push & deploy to Vercel

### Why this works on free plans:
- Firebase **lets you add unlimited authorized domains** (unlike Base44 free)
- The Google OAuth popup runs entirely in the browser via Firebase JS SDK
- Base44 just receives the ID token — no domain restrictions on that endpoint

### User action needed first:
You'll need to create a Firebase project (takes ~2 min, completely free). I'll guide you through it step-by-step when we start implementing.
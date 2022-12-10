// https://stackoverflow.com/questions/62225339/how-to-use-process-env-in-a-react-service-worker

// https://stackoverflow.com/questions/52100690/should-i-hide-firebase-api-keys-into-backend-not-due-to-data-security-but-proje
/*There is no need to try to hide your API key. 
It is essentially public information, and a determined hacker will be able to get a hold of 
it no matter how hard you try to obfuscate it.
A hacker doesn’t really stand to gain very much by getting your API key. 
It’s just a unique identifier for your project. 
If you want to secure your data in Realtime Database and Cloud Storage, 
you should use security rules along with Firebase Authentication 
to protect access to only the users who should have that access. */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  apiKey: "AIzaSyBvbRFPm9ye2MtXCEvIyq5GHtAZzk6Rezc",
  authDomain: "pimpuszek-test.firebaseapp.co",
  projectId: "pimpuszek-test",
  storageBucket: "pimpuszek-test.appspot.com",
  messagingSenderId: "280113063225",
  appId: "1:280113063225:web:535d2960a7e246b07974e8",
};

const app = initializeApp(firebaseConfig);

// authenticateion helper
// https://youtu.be/ZmpO65DhRN0?t=
export const auth = getAuth(); // potrzebne do AuthContext

// BUG react_devtools_backend.js:4012 FirebaseError: Firebase: Error (auth/configuration-not-found).
// https://stackoverflow.com/questions/66619945/error-auth-configuration-not-an-internal-error-has-occurred
// You got this error because you haven't enabled Authentication mode in FireStore console e.g. Email-Password etc.

// w firebasie wybrać
// https://console.firebase.google.com/project/pimpuszek-test/authentication/providers
// WARNING Email link (passwordless sign-in) zostaić w spokoju

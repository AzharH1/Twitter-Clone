// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBzZ0_BroBPRJNLwbP5Z77NG_DTy54LWY",
  authDomain: "twitter-clone-2cf08.firebaseapp.com",
  projectId: "twitter-clone-2cf08",
  storageBucket: "twitter-clone-2cf08.appspot.com",
  messagingSenderId: "678721975244",
  appId: "1:678721975244:web:95a65fb27a25b5f282a369",
};

// Check if there are no initialized apps
let app;
if (!getApps().length) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the existing app instance
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
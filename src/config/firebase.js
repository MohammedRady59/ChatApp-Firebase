import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/* import { getAnalytics } from "firebase/analytics";
 */
const firebaseConfig = {
  apiKey: "AIzaSyBeL5SWV3gN-e84n34LPhZEZIjK9lYfrRs",
  authDomain: "chatapp-48311.firebaseapp.com",
  projectId: "chatapp-48311",
  storageBucket: "chatapp-48311.appspot.com",
  messagingSenderId: "833296198948",
  appId: "1:833296198948:web:a1437f790d297c2b04d7b1",
  measurementId: "G-YWBT9DYLD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* Auth Google */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

/* DataBase */
export const db = getFirestore(app);
/* const analytics = getAnalytics(app);
 */

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-069Qj9rxlVxHlcT7WTSIr0JPh_TtfOc",
  authDomain: "crmapp-4e511.firebaseapp.com",
  projectId: "crmapp-4e511",
  storageBucket: "crmapp-4e511.appspot.com",
  messagingSenderId: "1031206959323",
  appId: "1:1031206959323:web:6ef4a86fb19a33c63df4fe",
  measurementId: "G-10LM3V40TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

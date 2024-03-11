

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB14WZ2Is5xbv25t7z78PoxH0gjZyBEiqc",
  authDomain: "shopapp-1141a.firebaseapp.com",
  projectId: "shopapp-1141a",
  storageBucket: "shopapp-1141a.appspot.com",
  messagingSenderId: "394013853658",
  appId: "1:394013853658:web:d27b0c615705d9d75c22e3",
  measurementId: "G-RZ79Y2RKY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



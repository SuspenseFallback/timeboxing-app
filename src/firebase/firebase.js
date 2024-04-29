// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export const messaging = getMessaging();

// AUTHENTICATION

export const signUpWithEmail = (username, email, password, callback) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
      const user = doc(db, "users", data.user.uid);

      console.log(data);

      setDoc(user, {
        username: username,
        email: email,
        boxes: [],
        id: data.user.uid,
      }).then((db_data) => {
        callback(data, false);
      });
    })
    .catch((err) => {
      callback({}, err);
    });
};

export const signInWithEmail = (email, password, callback) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
      callback(data, "");
    })
    .catch((err) => {
      callback({}, err);
    });
};

export const logOut = (callback) => {
  signOut(auth).then(() => {
    callback();
  });
};

export const getUser = async (callback) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// timeboxes

export const newTimebox = async (data) => {
  getUser((user) => {
    if (user) {
      const copy = [...user.boxes];
      console.log(user);
      const userDoc = doc(db, "users", user.id);

      copy.push(data);
      updateDoc(userDoc, {
        boxes: copy,
      }).then((data) => {
        return data;
      });
    } else {
      return [{}, { code: 401, message: "Not authenticated" }];
    }
  });
};

export const updateTimebox = async (data) => {
  getUser((user) => {
    if (user) {
      let copy = [...user.boxes];
      let box = copy.filter((b) => d.date == data.date);
      copy = copy.filter((b) => d.date != data.date);

      if (box) {
        box = data;
      } else {
        return { code: 407, message: "Already exists", err: true };
      }

      copy.push(box);

      const userDoc = doc(db, "users", user.id);

      copy.push(data);
      updateDoc(userDoc, {
        boxes: copy,
      }).then((data) => {
        return { ...data, err: false };
      });
    } else {
      return { code: 401, message: "Not authenticated", err: true };
    }
  });
};

// messaging

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(new URL("../service-worker.js", import.meta.url))
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration);

      getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey:
          "BLvkBwI6BosymWMscxHeIeE1Je8Qg42IGluxYeTigWDvI0WjAxgTL6La09gvjTqDgqfLTm8G-nXPJnDDoScs4Fc",
      }).then((currentToken) => {
        console.log("currentToken", currentToken);
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

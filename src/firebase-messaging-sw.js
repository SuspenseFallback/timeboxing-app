import { onBackgroundMessage, onMessage } from "firebase/messaging/sw";

if (typeof importScripts === "function") {
  // importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
  // importScripts(
  //   "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
  // );

  const firebaseApp = firebase.initializeApp({
    apiKey: import.meta.env.VITE_FCM_API_KEY,
    authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FCM_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FCM_APP_ID,
    measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
  });

  const messaging = firebase.messaging(firebaseApp);

  self.addEventListener("install", () => {
    console.log("installed SW!");
  });

  self.addEventListener("push", () => {
    console.log("message received!");
  });

  const messaging = getMessaging();

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
}

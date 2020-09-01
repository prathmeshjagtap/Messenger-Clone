import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDX9hEtSz7V70amuBvi7brvgDyhHEXJNKo",
  authDomain: "my-messenger-clone-app.firebaseapp.com",
  databaseURL: "https://my-messenger-clone-app.firebaseio.com",
  projectId: "my-messenger-clone-app",
  storageBucket: "my-messenger-clone-app.appspot.com",
  messagingSenderId: "787633198177",
  appId: "1:787633198177:web:ce2ee2e83a435462a90620",
  measurementId: "G-9B5QJDSRGD"
})

const db = firebaseApp.firestore();

export default db;
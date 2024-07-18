import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_DvyWkZ9iffBN1qwzRgdcvO2NBYJTXlg",
  authDomain: "agendacool-349bc.firebaseapp.com",
  projectId: "agendacool-349bc",
  storageBucket: "agendacool-349bc.appspot.com",
  messagingSenderId: "497241139744",
  appId: "1:497241139744:web:e02259f062469dcf6b2a45"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const { Timestamp } = firebase.firestore;  // Asegúrate de que Timestamp esté importado correctamente

export { db, Timestamp };


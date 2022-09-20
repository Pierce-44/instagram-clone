import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'place your FIREBASE config here',
  authDomain: 'place your FIREBASE config here',
  projectId: 'place your FIREBASE config here',
  storageBucket: 'place your FIREBASE config here',
  messagingSenderId: 'place your FIREBASE config here',
  appId: 'place your FIREBASE config here',
};

const app = initializeApp(firebaseConfig);

export default app;

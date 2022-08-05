import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA97-R5P4bEwjV0efHt3hLs3bc32ns4shs',
  authDomain: 'instagram-clone-ph.firebaseapp.com',
  projectId: 'instagram-clone-ph',
  storageBucket: 'instagram-clone-ph.appspot.com',
  messagingSenderId: '554003582327',
  appId: '1:554003582327:web:97667da84152c9ff7aa572'
};

const app = initializeApp(firebaseConfig);

export default app
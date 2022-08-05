/* eslint-disable import/prefer-default-export */
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';

const db = getFirestore(app);

export const getChatRoomIDs = async () => {
  const docRef = doc(db, 'profile1', 'chatRoomIDs');
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  return data;
};

import React from 'react';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';

interface Props {
  url: string;
  username: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

async function updateUserStory({
  url,
  username,
  setLoading,
  setAddPhoto,
}: Props) {
  const db = getFirestore(app);

  const countRef = doc(db, 'users', username);
  await updateDoc(countRef, {
    story: url,
  });

  setLoading(false);
  setAddPhoto(false);
}

export default updateUserStory;

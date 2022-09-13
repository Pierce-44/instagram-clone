import React from 'react';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import app from './firbaseConfig';

interface Props {
  username: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function handleRemoveStory({
  username,
  setLoading,
  setAddPhoto,
}: Props) {
  setLoading(true);

  const db = getFirestore(app);
  const storage = getStorage();
  const userRef = doc(db, 'users', username);
  const storyStorageRef = ref(storage, `stories/${username}`);

  // remove story from user db
  updateDoc(userRef, {
    story: '',
    storyViews: [],
  });

  // Delete story image from cloud storage
  deleteObject(storyStorageRef)
    .then(() => {
      // File deleted successfully
      setLoading(false);
      setAddPhoto(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setAddPhoto(false);
    });
}

import React from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';

interface Props {
  url: string;
  username: string;
  chatRoomIDs: string[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

async function handleUpdateProfilePhoto({
  url,
  username,
  chatRoomIDs,
  setLoading,
  setAddPhoto,
}: Props) {
  const auth = getAuth();
  const db = getFirestore(app);
  const countRef = doc(db, 'users', username);

  // update the auth user details
  updateProfile(auth.currentUser!, {
    photoURL: url,
  })
    .then(() => {
      // Profile updated!
      setLoading(false);
      setAddPhoto(false);
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
      setLoading(false);
    });

  // update all subscribed chatrooms with new image

  chatRoomIDs.forEach((chatRoomID: string) => {
    updateDoc(doc(db, chatRoomID, 'users'), {
      [`${username}Avatar`]: url,
    });
  });

  // update database user with new photo url
  updateDoc(countRef, {
    avatarURL: url,
  });
}

export default handleUpdateProfilePhoto;

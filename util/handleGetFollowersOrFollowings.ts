import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { followingFollowerInfo } from './atoms';
import app from './firbaseConfig';

interface Props {
  setArray: React.Dispatch<React.SetStateAction<followingFollowerInfo[]>>;
  userListArray: string[];
}

export default function handleGetFollowersOrFollowings({
  setArray,
  userListArray,
}: Props) {
  setArray([]);

  const db = getFirestore(app);

  userListArray.forEach(async (username) => {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    const userAvatarURL = docSnap.data()?.avatarURL;
    const userObject = {
      username,
      avatarURL: userAvatarURL,
    };
    setArray((prev) => [...prev, userObject]);
  });
}

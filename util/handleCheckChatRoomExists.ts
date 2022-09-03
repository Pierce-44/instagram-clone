import React from 'react';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';
import { notificationTypes } from './atoms';

interface Props {
  e: any;
  search: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSearchedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedUserData: any;
  userNotifications: notificationTypes;
}

async function handleCheckChatRoomExists({
  e,
  search,
  setError,
  setSearchedUser,
  setSearchedUserData,
  userNotifications,
}: Props) {
  e.preventDefault();
  const db = getFirestore(app);

  if (search === '') {
    setError('Please input a username');
    setSearchedUser(false);
  } else if (search === userNotifications.username) {
    setError('Can not create a chatroom with yourself ');
    setSearchedUser(false);
  } else {
    const docRef = doc(db, 'users', search);
    const docSnap = await getDoc(docRef);

    if (docSnap.data()) {
      setSearchedUserData(docSnap.data());
      setSearchedUser(true);
    } else {
      setError('User not found');
      setSearchedUser(false);
    }
  }
}

export default handleCheckChatRoomExists;

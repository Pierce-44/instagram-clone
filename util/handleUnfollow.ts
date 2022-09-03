import React from 'react';
import { doc, arrayRemove, updateDoc, getFirestore } from 'firebase/firestore';
import { notificationTypes } from './atoms';
import app from './firbaseConfig';

interface Props {
  userNotifications: notificationTypes;
  profileNotifications: notificationTypes;
  setUnfollow: React.Dispatch<React.SetStateAction<boolean>>;
}

function handleUnfollow({
  setUnfollow,
  userNotifications,
  profileNotifications,
}: Props) {
  setUnfollow(false);
  document.body.style.overflow = 'initial';

  const db = getFirestore(app);
  const userRef = doc(db, 'users', userNotifications.username!);
  const otherUserRef = doc(db, 'users', profileNotifications.username!);

  updateDoc(userRef, {
    following: arrayRemove(profileNotifications.username),
  });

  updateDoc(otherUserRef, {
    followers: arrayRemove(userNotifications.username),
  });
}

export default handleUnfollow;

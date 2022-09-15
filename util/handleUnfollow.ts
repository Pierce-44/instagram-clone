import React from 'react';
import { doc, arrayRemove, updateDoc, getFirestore } from 'firebase/firestore';
import { SetStateAction } from 'jotai';
import { notificationTypes } from './atoms';
import app from './firbaseConfig';

interface Props {
  userNotifications: notificationTypes;
  profileNotifications: notificationTypes;
  setUnfollow: React.Dispatch<React.SetStateAction<boolean>>;
  followingArray: string[];
  // eslint-disable-next-line no-unused-vars
  setFollowingArray: (update: SetStateAction<string[]>) => void;
}

function handleUnfollow({
  setUnfollow,
  userNotifications,
  profileNotifications,
  followingArray,
  setFollowingArray,
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

  // if the user is now following no one reset the atom following array to trigger the NoPostsFiller component
  if (followingArray.length === 1) {
    setFollowingArray([]);
  }
}

export default handleUnfollow;

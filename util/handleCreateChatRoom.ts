import React from 'react';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import app from './firbaseConfig';
import { notificationTypes } from './atoms';

interface Props {
  userNotifications: notificationTypes;
  searchedUserData: notificationTypes;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSearchedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

async function handleCreateChatRoom({
  userNotifications,
  searchedUserData,
  setError,
  setSearchedUser,
  setCreateChatRoom,
}: Props) {
  const db = getFirestore(app);

  const firstCheck = userNotifications.chatRoomIds!.includes(
    searchedUserData.userId! + userNotifications.userId
  );
  const secondCheck = userNotifications.chatRoomIds!.includes(
    userNotifications.userId! + searchedUserData.userId
  );

  if (firstCheck || secondCheck) {
    setError('Chatroom already exists');
    setSearchedUser(false);
  } else {
    // create chatroom collection

    await setDoc(
      doc(db, userNotifications.userId! + searchedUserData.userId, 'users'),
      {
        createdAt: serverTimestamp(),
        [`${searchedUserData.username}ChatName`]: userNotifications.username,
        [`${searchedUserData.username}Avatar`]: searchedUserData.avatarURL,
        [`${searchedUserData.username}NewMessage`]: false,
        [`${userNotifications.username}ChatName`]: searchedUserData?.username,
        [`${userNotifications.username}Avatar`]: userNotifications.avatarURL,
        [`${userNotifications.username}NewMessage`]: false,
      }
    );

    setCreateChatRoom(false);

    const userOne = doc(db, 'users', userNotifications.username!);
    const userTwo = doc(db, 'users', searchedUserData.username!);

    // subscribe the users to the chatroom (add chatroom ID to the users details)
    await updateDoc(userOne, {
      chatRoomIds: arrayUnion(
        userNotifications.userId! + searchedUserData.userId
      ),
    });
    await updateDoc(userTwo, {
      chatRoomIds: arrayUnion(
        userNotifications.userId! + searchedUserData.userId
      ),
    });
  }
}

export default handleCreateChatRoom;

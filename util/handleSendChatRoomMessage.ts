import React from 'react';
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import app from './firbaseConfig';

interface Props {
  e: any;
  chatRoomID: string;
  inputText: string;
  userID: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  username: string;
}

function sendChatRoomMessage({
  e,
  chatRoomID,
  inputText,
  userID,
  setInputText,
  username,
}: Props) {
  const db = getFirestore(app);

  // submit on key enter
  if (
    e.code === 'Enter' ||
    e.code === 'NumpadEnter' ||
    e.target.id === 'sendMessage'
  ) {
    setInputText('');
    addDoc(collection(db, chatRoomID), {
      createdAt: serverTimestamp(),
      name: userID,
      text: inputText,
    });

    const ref = doc(db, chatRoomID, 'users');
    updateDoc(ref, {
      [`${username}NewMessage`]: true,
    });
  }
}

export default sendChatRoomMessage;

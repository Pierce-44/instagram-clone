import React from 'react';
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import app from './firbaseConfig';

interface Props {
  e: any;
  chatRoomID: string;
  inputText: string;
  userID: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

function sendChatRoomMessage({
  e,
  chatRoomID,
  inputText,
  userID,
  setInputText,
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
  }
}

export default sendChatRoomMessage;

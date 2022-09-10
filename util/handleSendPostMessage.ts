import React from 'react';
import { getFirestore, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { postCommentTypes, postType, userDetailTypes } from './atoms';
import app from './firbaseConfig';
import handleUpdateHeartNotifcation from './handleUpdateHeartNotification';

interface Props {
  e: any;
  postInformation: postType;
  postUserDetails: postCommentTypes;
  userDetails: userDetailTypes | User;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
}

function handleSendPostMessage({
  e,
  postInformation,
  postUserDetails,
  userDetails,
  commentText,
  setCommentText,
}: Props) {
  // quick random ID, incase the user sends the same message twice in a row
  const randomID = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  );

  const date = new Date().toLocaleDateString();

  // submit on key enter
  if (
    e.code === 'Enter' ||
    e.code === 'NumpadEnter' ||
    e.target.id === 'sendMessage'
  ) {
    const db = getFirestore(app);
    const docRef = doc(
      db,
      `${postUserDetails.username}Posts`,
      postInformation.postID
    );

    const newComment = {
      text: commentText,
      avatarURL: userDetails.photoURL,
      username: userDetails.displayName,
      createdAt: date,
      randomID,
    };

    handleUpdateHeartNotifcation({
      postUserDetails,
      userDetails,
      postInformation,
      heartType: 'comment',
    });

    updateDoc(docRef, {
      comments: arrayUnion(newComment),
    });
    setCommentText('');
  }
}

export default handleSendPostMessage;

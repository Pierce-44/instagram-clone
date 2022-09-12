/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useAtom } from 'jotai';
import React from 'react';
import atoms from '../util/atoms';
import app from '../util/firbaseConfig';

interface heartDetails {
  username: string;
  postId: string;
  text: string;
}

export default function useGetHeartInfo() {
  const db = getFirestore(app);

  const [userNotifications] = useAtom(atoms.userNotifications);

  const [avatarUrlArray, setAvatarUrlArray] = React.useState<any[]>([]);
  const [postUrlArray, setPostUrlArray] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function getHeartAvataryURL(detail: heartDetails) {
    const userRef = doc(db, 'users', detail.username);
    const userDocSnap = await getDoc(userRef);
    setAvatarUrlArray((prev) => [...prev, userDocSnap.data()!.avatarURL]);
  }

  async function getHeartPostURL(detail: heartDetails) {
    const postRef = doc(
      db,
      `${userNotifications.username}Posts`,
      detail.postId
    );
    const postDocSnap = await getDoc(postRef);
    setPostUrlArray((prev) => [...prev, postDocSnap.data()!.imgURL]);
  }

  const handleAsyncMapFetches = async () => {
    const promiseHeartAvataryURL = userNotifications.heartNotifications!.map(
      (detail) => getHeartAvataryURL(detail)
    );
    const promiseHeartPostURL = userNotifications.heartNotifications!.map(
      (detail) => getHeartPostURL(detail)
    );
    await Promise.all(promiseHeartAvataryURL);
    await Promise.all(promiseHeartPostURL);
    setLoading(false);
  };

  React.useEffect(() => {
    handleAsyncMapFetches();
  }, []);

  return { avatarUrlArray, postUrlArray, loading };
}

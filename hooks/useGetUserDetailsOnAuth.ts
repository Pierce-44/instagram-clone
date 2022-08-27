/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  doc,
  onSnapshot,
  query,
  orderBy,
  collection,
  limit,
  getDoc,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import React from 'react';
import app from '../util/firbaseConfig';
import atoms from '../util/atoms';

function useGetUserDetailsOnAuth() {
  const db = getFirestore(app);
  const auth = getAuth();
  const [loggingIn] = useAtom(atoms.loggingIn);
  const [, setListeners] = useAtom(atoms.listeners);
  const [, setUserStatus] = useAtom(atoms.userStatus);
  const [, setUserDetails] = useAtom(atoms.userDetails);
  const [, setAllChatRoomMessages] = useAtom(atoms.allChatRoomMessages);
  const [, setUserNotifications] = useAtom(atoms.userNotifications);
  const [, setUserPosts] = useAtom(atoms.userPosts);
  const [, setHomePagePosts] = useAtom(atoms.homePagePosts);
  const [, setStories] = useAtom(atoms.stories);
  const [, setHomePogePostsFetched] = useAtom(atoms.homePogePostsFetched);

  const [homePageListners, setHomePageListners] = React.useState<any[]>([]);

  function getChatRoomMessages(notifications: any) {
    notifications?.chatRoomIds?.forEach((chatRoomID: any) => {
      const q = query(
        collection(db, chatRoomID),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
        const messages: any = [];
        querySnapshot.forEach((document: any) => {
          messages.push(document.data());
        });
        setAllChatRoomMessages((prevState) => ({
          ...prevState,
          [chatRoomID]: messages,
        }));
      });
      setListeners((current) => [...current, unsubscribe]);
    });
  }

  async function getHomePagePosts(notifications: any) {
    homePageListners.forEach((unsubscribe: any) => unsubscribe());

    await notifications?.following?.forEach((username: string) => {
      const q = query(
        collection(db, `${username}Posts`),
        orderBy('createdAt', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
        querySnapshot.forEach((document: any) => {
          setHomePagePosts((prevState) => ({
            ...prevState,
            [username]: document.data(),
          }));
        });
      });
      setHomePageListners((current) => [...current, unsubscribe]);
    });
    setHomePogePostsFetched(true);
  }

  async function getFollowingStories(notifications: any) {
    notifications?.following?.forEach((username: string) => {
      const docRef = doc(db, 'users', username);

      async function handle() {
        const docSnap = await getDoc(docRef);

        if (docSnap.data()!.story !== '') {
          setStories((prevState) => ({
            ...prevState,
            [username]: docSnap.data()!.story,
            [`${username}Views`]: docSnap.data()!.storyViews,
            [`${username}Photo`]: docSnap.data()!.avatarURL,
          }));
        }
      }

      handle();
    });
  }

  function userLiveUpdates(user: any) {
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.displayName),
      (document: any) => {
        setUserNotifications(document.data());
        getChatRoomMessages(document.data());
        getHomePagePosts(document.data());
        getFollowingStories(document.data());
        // when you get to it add getFollowingPosts(), i want it to update with notifications
      }
    );
    setListeners((current) => [...current, unsubscribe]);
  }

  function getUserPosts(user: any) {
    const q = query(
      collection(db, `${user.displayName}Posts`),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const postsArray: any = [];
      querySnapshot.forEach((document: any) => {
        postsArray.push(document.data());
      });
      setUserPosts(postsArray);
    });
    setListeners((current) => [...current, unsubscribe]);
  }

  // checks if user is authorised, runs once on app load, and again on login/sign up to subscribe the listener once they have entered their credentials (this is done in the case that the user does not refresh the page after logging out. Additionally the user is unsubscribed from all listeners on logout)
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStatus(true);
        setUserDetails(user);
        userLiveUpdates(user);
        getUserPosts(user);
      } else {
        Router.push('/Login');
      }
    });
    setListeners((current) => [...current, unsubscribe]);

    return unsubscribe;
  }, [loggingIn]);
}

export default useGetUserDetailsOnAuth;

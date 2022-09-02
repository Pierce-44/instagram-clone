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
  const [, setUsersListArray] = useAtom(atoms.usersListArray);

  const [homePageListners, setHomePageListners] = React.useState<any[]>([]);
  const [storiesListners, setStoriesListners] = React.useState<any[]>([]);

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
    storiesListners.forEach((unsubscribe: any) => unsubscribe());

    notifications?.following?.forEach((username: string) => {
      const unsub = onSnapshot(doc(db, 'users', username), (docs) => {
        if (docs.data()!.story !== '') {
          setStories((prevState) => ({
            ...prevState,
            [username]: docs.data()!.story,
            [`${username}Views`]: docs.data()!.storyViews,
            [`${username}Photo`]: docs.data()!.avatarURL,
          }));
        }
      });
      setStoriesListners((current) => [...current, unsub]);
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

  function getAllUsersList() {
    const q = query(collection(db, 'userList'), limit(1000));
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const usersArray: any = [];
      querySnapshot.forEach((document: any) => {
        usersArray.push(document.id);
      });
      setUsersListArray(usersArray);
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
        getAllUsersList();
      } else {
        Router.push('/Login');
      }
    });
    setListeners((current) => [...current, unsubscribe]);

    return unsubscribe;
  }, [loggingIn]);
}

export default useGetUserDetailsOnAuth;

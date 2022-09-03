/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import atoms, { notificationTypes } from '../util/atoms';
import app from '../util/firbaseConfig';

function useCheckUserName({
  nameSearch,
  queryCharacter,
}: {
  nameSearch: string | string[] | undefined;
  queryCharacter: boolean;
}) {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userDetails] = useAtom(atoms.userDetails);

  const [otherUserNotifications, setProfileNotifications] =
    React.useState<notificationTypes>({});
  const [queryNotificationsArray, setQueryNotificationsArray] = React.useState<
    notificationTypes[]
  >([]);
  const [userExists, setUserExists] = React.useState(false);
  const [checkingUser, setCheckingUser] = React.useState(true);
  const [otherUser, setOtherUser] = React.useState(false);

  const db = getFirestore(app);
  const usersRef = collection(db, 'users');

  async function checkNameInDB() {
    // Create a query against the all registered users collection.
    const q = query(usersRef, where('username', '==', nameSearch));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // if user/document exists
      setProfileNotifications(doc.data());
      setUserExists(true);
      if (doc.data().username !== userDetails.displayName) {
        setOtherUser(true);
      } else {
        setOtherUser(false);
      }
    });
    setCheckingUser(false);
  }

  async function queryNameCharacter() {
    const Ref = collection(db, 'users');
    const queryArray: notificationTypes[] = [];

    // Create a query against the collection.
    const q = query(Ref, where('usernameQuery', 'array-contains', nameSearch));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // if user/document exists
      queryArray.push(doc.data());
    });
    if (querySnapshot.size === 0) {
      setQueryNotificationsArray([]);
    } else {
      setQueryNotificationsArray(queryArray);
    }
    setCheckingUser(false);
  }

  React.useEffect(() => {
    if (
      nameSearch !== userDetails.displayName &&
      userStatus &&
      !queryCharacter
    ) {
      checkNameInDB();
      setCheckingUser(true);
    }

    // For when the user wants to check their profile
    // This will bypass the checkSearchName DB query to render the users profile.
    // This will be triggered once the user has been authorised and their userDetails recorded
    // Required since the dynamic route nameSearch is returned before the user is authorised
    if (
      nameSearch === userDetails.displayName &&
      userStatus &&
      !queryCharacter
    ) {
      setCheckingUser(false);
      setOtherUser(false);
      setUserExists(true);
      checkNameInDB();
    }

    if (queryCharacter && nameSearch !== '') {
      queryNameCharacter();
      setCheckingUser(true);
    }
  }, [nameSearch, userDetails, userStatus]);

  return {
    otherUserNotifications,
    userExists,
    otherUser,
    checkingUser,
    queryNotificationsArray,
  };
}

export default useCheckUserName;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import app from '../util/firbaseConfig';
import atoms, { notificationTypes } from '../util/atoms';

function useExploreUsers(requestMoreUsers: boolean) {
  const db = getFirestore(app);

  const [userDetails] = useAtom(atoms.userDetails);

  const [firstFetch, setFirstFetch] = React.useState(true);
  const [lastVisibleSnapshot, setLastVisibleSnapshot] = React.useState({});
  const [usersArray, setUsersArray] = React.useState<notificationTypes[]>([]);
  const [moreUsers, setMoreUsers] = React.useState(true);

  const first = query(collection(db, 'users'), limit(5));

  async function handleFirstQuery() {
    const documentSnapshot = await getDocs(first);

    const array: notificationTypes[] = [];

    documentSnapshot.forEach((doc) => {
      if (doc.data().username === userDetails.displayName) {
        // do nothing if this is the users document
      } else {
        array.push(doc.data());
      }
    });

    setUsersArray(array);
    setLastVisibleSnapshot(
      documentSnapshot.docs[documentSnapshot.docs.length - 1]
    );
    setFirstFetch(false);
  }

  async function handleNextQueries() {
    const nextQuery = query(
      collection(db, 'users'),
      startAfter(lastVisibleSnapshot),
      limit(5)
    );

    const nextDocumentSnapshot = await getDocs(nextQuery);

    nextDocumentSnapshot.forEach((doc) => {
      if (doc.data().username === userDetails.displayName) {
        // do nothing if this is the users document
      } else {
        setUsersArray((prev) => [...prev, doc.data()]);
      }
    });

    // if there are no more users block the firebase requests
    if (nextDocumentSnapshot.empty) {
      setMoreUsers(false);
    } else {
      setLastVisibleSnapshot(
        nextDocumentSnapshot.docs[nextDocumentSnapshot.docs.length - 1]
      );
    }
  }

  React.useEffect(() => {
    if (firstFetch) {
      handleFirstQuery();
    } else if (moreUsers) {
      handleNextQueries();
    }
  }, [requestMoreUsers]);

  return { usersArray, firstFetch, moreUsers };
}

export default useExploreUsers;

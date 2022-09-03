/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAtom } from 'jotai';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import atoms from '../util/atoms';
import app from '../util/firbaseConfig';

function useGetSpotlightedUsers() {
  const db = getFirestore(app);

  const [usersListArray] = useAtom(atoms.usersListArray);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userDetails] = useAtom(atoms.userDetails);
  const [, setSpotlightUsers] = useAtom(atoms.spotlightUsers);

  // this will stop the hook from being run more than once
  const [stop, setStop] = React.useState(false);

  async function getDetails(username: string) {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    setSpotlightUsers((prev) => [...prev, docSnap.data()!]);
  }

  React.useEffect(() => {
    if (!stop && userNotifications.username) {
      // removes the current user from the users array
      const usersListFiltered = usersListArray.filter(
        (e) => e !== userDetails.displayName
      );

      // select five random users to spotlight
      const randomFiveUsers = usersListFiltered
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      randomFiveUsers.forEach((username: string) => {
        getDetails(username);
      });
      setStop(true);
    }
  }, [userNotifications]);
}

export default useGetSpotlightedUsers;

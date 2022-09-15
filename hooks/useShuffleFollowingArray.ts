/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../util/atoms';

function useShuffleFollowingArray() {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [followingArray, setFollowingArray] = useAtom(atoms.followingArray);
  const [, setFollowingArrayStatus] = useAtom(atoms.followingArrayStatus);

  React.useEffect(() => {
    if (
      (userNotifications.following &&
        // stops the following array from updating every time something within userNotifications changes, updates when a user follows a new user.
        followingArray.length !== userNotifications.following.length) ||
      // handles from when a user goes from following no one to following someone
      (userNotifications.following && followingArray[0] === 'null')
    ) {
      setFollowingArray(
        [...userNotifications.following].sort(() => Math.random() - 0.5)
      );
      setFollowingArrayStatus(true);
    }
    // for when the user is not following anyone
    else if (
      userNotifications.following &&
      userNotifications.following.length === 0
    ) {
      setFollowingArray(['null']);
      setFollowingArrayStatus(true);
    }
  }, [userNotifications]);
}

export default useShuffleFollowingArray;

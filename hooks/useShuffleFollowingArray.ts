/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../util/atoms';

function useShuffleFollowingArray() {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [followingArray, setFollowingArray] = useAtom(atoms.followingArray);

  React.useEffect(() => {
    if (
      userNotifications.following &&
      followingArray.length !== userNotifications.following.length
    ) {
      setFollowingArray(
        [...userNotifications.following].sort(() => Math.random() - 0.5)
      );
    }
  }, [userNotifications.following]);
}

export default useShuffleFollowingArray;

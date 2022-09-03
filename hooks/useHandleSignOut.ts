/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAtom } from 'jotai';
import atoms from '../util/atoms';

interface Props {
  signUserOut: boolean;
}

function useHandleSignOut({ signUserOut }: Props) {
  const auth = getAuth();

  const [listeners] = useAtom(atoms.listeners);
  const [, setUserNotifications] = useAtom(atoms.userNotifications);
  const [, setUserDetails] = useAtom(atoms.userDetails);
  const [, setLoggingIn] = useAtom(atoms.loggingIn);
  const [, setHomePogePostsFetched] = useAtom(atoms.homePogePostsFetched);
  const [, setHomePagePosts] = useAtom(atoms.homePagePosts);
  const [, setStoriesArray] = useAtom(atoms.storiesArray);
  const [, setFollowingArray] = useAtom(atoms.followingArray);
  const [, setStories] = useAtom(atoms.stories);
  const [, setUserPosts] = useAtom(atoms.userPosts);

  React.useEffect(() => {
    if (signUserOut) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setUserNotifications({});
          setUserDetails({});
          setLoggingIn(false);
          setHomePogePostsFetched(false);
          setHomePagePosts({});
          setStoriesArray([]);
          setFollowingArray([]);
          setStories({});
          setUserPosts([]);

          // removes all firebase listener
          listeners.forEach((unsubscribe: any) => unsubscribe());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [signUserOut]);
}

export default useHandleSignOut;

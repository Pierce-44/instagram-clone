/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import atoms from '../util/atoms';
import app from '../util/firbaseConfig';

function useGetOtherUserPosts({
  user,
  nameSearch,
  limitSearch,
}: {
  user: any;
  nameSearch: any;
  limitSearch: boolean;
}) {
  const db = getFirestore(app);

  const [userDetails] = useAtom(atoms.userDetails);

  const [postListners, setPostListners] = React.useState([]);
  const [profilePosts, setProfilePosts] = React.useState<any>([]);

  function getUserPosts() {
    const q = query(
      collection(db, `${nameSearch}Posts`),
      orderBy('createdAt', 'desc'),
      limitSearch ? limit(1) : limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const postsArray: any = [];
      querySnapshot.forEach((document: any) => {
        postsArray.push(document.data());
      });
      setProfilePosts(postsArray);
    });
    setPostListners((current) => [...current, unsubscribe]);
  }

  React.useEffect(() => {
    if (
      user.userExists &&
      user.otherUser &&
      nameSearch !== userDetails.displayName
    ) {
      getUserPosts();
    } else if (limitSearch) {
      getUserPosts();
    }
  }, [user.userExists, user.otherUser, nameSearch]);

  return { profilePosts };
}

export default useGetOtherUserPosts;

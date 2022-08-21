/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  orderBy,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import Link from 'next/link';
import Header from '../components/Header';
import UnfollowUser from '../components/UnfollowUser';
import AddProfilePhoto from '../components/AddProfilePhoto';
import PostSVG from '../components/svg/PostSVG';
import app from '../util/firbaseConfig';
import useCheckUserName from '../hooks/useCheckUserName';
import FollowingSVG from '../components/svg/FollowingSVG';
import CameraSVG from '../components/svg/CameraSVG';
import ProfilePicSVG from '../components/svg/ProfilePicSVG';
import UserPost from '../components/UserPost';
import atoms from '../util/atoms';

type notificationTypes = {
  [key: string]: any;
  username?: string;
  userId?: string;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
};

function Profile() {
  const db = getFirestore(app);
  const router = useRouter();
  const nameSearch = router.query.Profile;

  const [userStatus] = useAtom(atoms.userStatus);
  const [userPosts] = useAtom(atoms.userPosts);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [addPhoto, setAddPhoto] = React.useState(false);
  const [unfollow, setUnfollow] = React.useState(false);
  const [otherUserPosts, setProfilePosts] = React.useState([]);
  const [postListners, setPostListners] = React.useState([]);

  const user = useCheckUserName({
    username: nameSearch,
    queryCharacter: false,
  });

  // Switch - if the user is requesting another users profile page then use those fetched details, otherwise use the users own profile details.
  const profilePosts = user.otherUser ? otherUserPosts : userPosts;
  const profileDetails = user.otherUser ? {} : userDetails;
  const profileNotifications: notificationTypes = user.otherUser
    ? user.otherUserNotifications
    : userNotifications;

  function getUserPosts() {
    const q = query(
      collection(db, `${nameSearch}Posts`),
      orderBy('createdAt', 'desc')
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

  function handleFollowUser() {
    const userRef = doc(db, 'users', userNotifications.username);
    const otherUserRef = doc(db, 'users', profileNotifications.username);

    updateDoc(userRef, {
      following: arrayUnion(profileNotifications.username),
    });

    updateDoc(otherUserRef, {
      followers: arrayUnion(userNotifications.username),
    });
  }

  React.useEffect(() => {
    if (user.userExists) {
      getUserPosts();
    }
  }, [user.userExists, nameSearch]);

  // loading page while checking auth and checking route profile name
  if (!userStatus || user.checkingUser) {
    return (
      <div
        className={
          userStatus
            ? ''
            : 'flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]'
        }
      >
        <Head>
          <title>Profile • Instagram photos and videos</title>
          <meta name="description" content="Instagram Clone" />
          <link rel="icon" href="/instagram.png" />
        </Head>
        {userStatus ? <Header page="Profile" /> : ''}
        <div
          className={
            userStatus
              ? 'flex h-[calc(100vh-60px)] w-full items-center justify-center dark:bg-[#131313]'
              : ''
          }
        >
          <picture>
            <img src="/instagramLoading.png" alt="loading" />
          </picture>
        </div>
      </div>
    );
  }

  // If a user does not exist render the following
  if (!user.userExists && !user.checkingUser) {
    return (
      <div className="h-[100vh] w-full dark:bg-[#131313] dark:text-slate-100">
        <Head>
          <title>Profile • Instagram photos and videos</title>
          <meta name="description" content="Instagram Clone" />
          <link rel="icon" href="/instagram.png" />
        </Head>
        <Header page="Profile" />
        <div className="items-top flex h-full w-full justify-center">
          <p className="mt-10 text-xl font-semibold">{`Sorry this user ${nameSearch} was not found.`}</p>
        </div>
      </div>
    );
  }

  // A user needs to exist to render a profile page
  if (nameSearch === userDetails.displayName || user.userExists) {
    return (
      <div className="min-h-[100vh] bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100">
        <Head>
          <title>Profile • Instagram photos and videos</title>
          <meta name="description" content="Instagram Clone" />
          <link rel="icon" href="/instagram.png" />
        </Head>
        <Header page="Profile" />
        {addPhoto ? <AddProfilePhoto setAddPhoto={setAddPhoto} /> : <div />}
        <div className="mx-auto  max-w-[935px] pt-8">
          <div className="flex items-stretch border-b border-stone-300 pb-11 dark:border-stone-700">
            <button
              onClick={() =>
                nameSearch === profileDetails.displayName
                  ? setAddPhoto(true)
                  : ''
              }
              type="button"
              className="relative mr-4 grow-[1]"
            >
              {profileDetails.photoURL || profileNotifications.avatarURL ? (
                <div>
                  <picture>
                    <img
                      className="h-[150px] w-[150px] rounded-full object-cover"
                      src={
                        profileDetails.photoURL ||
                        profileNotifications.avatarURL
                      }
                      alt="avatar"
                    />
                  </picture>
                </div>
              ) : (
                <ProfilePicSVG height="150" width="150" strokeWidth="1" />
              )}
              {nameSearch === profileDetails.displayName ? (
                <div className="absolute left-[130px] bottom-0">
                  <CameraSVG />
                </div>
              ) : (
                ''
              )}
            </button>
            <div className="grow-[3]">
              <div className="flex items-center">
                <h1 className="my-5 text-3xl">
                  {profileDetails.displayName || profileNotifications.username}
                </h1>
                {nameSearch === profileDetails.displayName ? (
                  ''
                ) : (
                  <div className="flex flex-row items-center pl-7">
                    <Link href="/Inbox">
                      <button
                        className="mr-2  rounded-[4px] border border-stone-300 py-1 px-2 text-sm font-semibold dark:border-stone-700"
                        type="button"
                      >
                        Message
                      </button>
                    </Link>
                    <div
                      className=" overflow-hidden rounded-[4px] text-sm font-semibold"
                      // type="button"
                      // onClick={() => setFollowing(!following)}
                    >
                      {userNotifications.following?.includes(
                        profileNotifications.username
                      ) ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setUnfollow(true);
                              document.body.style.overflow = 'hidden';
                            }}
                          >
                            <FollowingSVG />
                          </button>
                          {unfollow ? (
                            <UnfollowUser
                              setUnfollow={setUnfollow}
                              imgURL={profileNotifications.avatarURL}
                              username={profileNotifications.username}
                              userNotifications={userNotifications}
                              profileNotifications={profileNotifications}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleFollowUser()}
                        >
                          <p className="bg-[#0095F6] py-1 px-6 text-white">
                            Follow
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {profileNotifications.userId ? (
                <div className="flex justify-start gap-7">
                  <p>
                    <b>{profileNotifications.postCount}</b> posts
                  </p>
                  <p>
                    <b>{profileNotifications.followers?.length}</b> followers
                  </p>
                  <p>
                    <b>{profileNotifications.following?.length}</b> following
                  </p>
                </div>
              ) : (
                <div className="h-6 w-[250px] rounded-md bg-[#efefef] dark:bg-[#070707]" />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 py-6">
              <PostSVG />
              <p className="text-sm font-semibold">POSTS</p>
            </div>
            <div className="grid max-w-[935px] grid-cols-3 pb-10 sm:gap-2 md:gap-4">
              {profilePosts.slice(0, -1).map((postInformation, index) => (
                <UserPost
                  // eslint-disable-next-line react/no-array-index-key
                  key={`post${index}`}
                  postInformation={postInformation}
                  postUserDetails={profileNotifications}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

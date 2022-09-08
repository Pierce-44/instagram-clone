import Head from 'next/head';
import React from 'react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import Link from 'next/link';
import type { NextPage } from 'next';
import Header from '../components/header/Header';
import UnfollowUser from '../components/profilePages/UnfollowUser';
import AddProfilePhoto from '../components/profilePages/AddProfilePhoto';
import handleFollowUser from '../util/handleFollowUser';
import PostSVG from '../components/svgComps/PostSVG';
import useCheckUserName from '../hooks/useCheckUserName';
import FollowingSVG from '../components/svgComps/FollowingSVG';
import CameraSVG from '../components/svgComps/CameraSVG';
import ProfilePicSVG from '../components/svgComps/ProfilePicSVG';
import LoadingPage from '../components/loadingComps/LoadingPage';
import UserPost from '../components/profilePages/UserPost';
import useGetOtherUserPosts from '../hooks/useGetOtherUserPosts';
import atoms from '../util/atoms';
import LoadingUserPosts from '../components/loadingComps/LoadingUserPosts';

const Profile: NextPage = () => {
  const router = useRouter();
  const nameSearch = router.query.Profile;

  const [userStatus] = useAtom(atoms.userStatus);
  const [userPosts] = useAtom(atoms.userPosts);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userPorfileLoading, setUserPorfileLoading] = useAtom(
    atoms.userPorfileLoading
  );

  const [addPhoto, setAddPhoto] = React.useState(false);
  const [unfollow, setUnfollow] = React.useState(false);

  const queryCharacter = false;
  const limitSearch = false;

  // Checks the username against the dynamic page route
  const user = useCheckUserName({ nameSearch, queryCharacter });
  // This custom hook will get post details if the dynamic page route is for another user (not their own profile), and if the user exists. It uses useCheckUserName results to check this.
  const otherUser = useGetOtherUserPosts({ user, nameSearch, limitSearch });

  // Switch - if the user is requesting another users profile page then use those fetched details, otherwise use the users own profile details.
  const profilePosts = user.otherUser ? otherUser.profilePosts : userPosts;
  const profileDetails = user.otherUser ? {} : userDetails;
  const profileNotifications = user.otherUser
    ? user.otherUserNotifications
    : userNotifications;

  // loading page while checking auth and checking route profile name
  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }
  // loading page while checking dynamic route query name
  if (user.checkingUser && nameSearch !== userDetails.displayName) {
    return <LoadingPage checkingUserRoute />;
  }

  // If a user does not exist render the following
  if (!user.userExists && !user.checkingUser) {
    return (
      <div className="h-[100vh] w-full overflow-y-scroll dark:bg-[#131313] dark:text-slate-100">
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

  // If a user exists render profile page
  return (
    <div className="h-[100vh] overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
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
            className="relative mr-7 min-w-[80px] sm:mr-10 sm:grow-[1]"
            onClick={() =>
              nameSearch === profileDetails.displayName ? setAddPhoto(true) : ''
            }
            type="button"
          >
            {profileDetails.photoURL || profileNotifications.avatarURL ? (
              <Image
                className=" h-20 w-20 select-none rounded-full object-cover sm:h-[150px] sm:w-[150px]"
                src={
                  profileDetails.photoURL! || profileNotifications.avatarURL!
                }
                alt="avatar"
                width="150"
                height="150"
              />
            ) : (
              <div className="h-20 w-20 sm:h-[150px] sm:w-[150px]">
                <ProfilePicSVG strokeWidth="1" />
              </div>
            )}
            {nameSearch === profileDetails.displayName ? (
              <div className="absolute bottom-0 left-16 sm:left-[130px]">
                <CameraSVG />
              </div>
            ) : (
              ''
            )}
          </button>
          <div className="grow-[3]">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h1 className="my-5 text-3xl">
                {profileDetails.displayName || profileNotifications.username}
              </h1>
              {nameSearch === profileDetails.displayName ? (
                ''
              ) : (
                <div className="flex flex-row items-center pb-2 sm:pl-7 sm:pb-0">
                  <Link href="/Inbox">
                    <button
                      className="mr-2  rounded-[4px] border border-stone-300 py-1 px-2 text-sm font-semibold dark:border-stone-700"
                      type="button"
                    >
                      Message
                    </button>
                  </Link>
                  <div className=" overflow-hidden rounded-[4px] text-sm font-semibold">
                    {userNotifications.following?.includes(
                      profileNotifications.username!
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
                            imgURL={profileNotifications.avatarURL!}
                            username={profileNotifications.username!}
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
                        onClick={() =>
                          handleFollowUser({
                            userName: userNotifications.username!,
                            otherUserName: profileNotifications.username!,
                          })
                        } //
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
              <div className="flex justify-start gap-2 text-xs sm:gap-7 sm:text-base">
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
              <div className="h-4 w-[250px] animate-pulse rounded-sm bg-[#efefef] dark:bg-[#313131] sm:h-6" />
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 py-6">
            <PostSVG />
            <p className="text-sm font-semibold">POSTS</p>
          </div>
          <div
            className={`${
              userPorfileLoading ? 'fixed opacity-0' : ''
            } grid max-w-[935px] grid-cols-3 gap-1 pb-10 sm:gap-4`}
            onLoad={() => setUserPorfileLoading(false)}
          >
            {profilePosts.slice(0, -1).map((postInformation, index) => (
              <UserPost
                // eslint-disable-next-line react/no-array-index-key
                key={`post${index}`}
                postInformation={postInformation}
                postUserDetails={profileNotifications}
              />
            ))}
          </div>
          {userPorfileLoading ? <LoadingUserPosts /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* eslint-disable react/no-array-index-key */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAtom } from 'jotai';
import Header from '../components/header/Header';
import HomePagePost from '../components/homePage/HomePagePost';
import StoryBoard from '../components/homePage/StoryBoard';
import LoadingPage from '../components/loadingComps/LoadingPage';
import UserSuggestions from '../components/homePage/UserSuggestions';
import atoms from '../util/atoms';
import LoadingPosts from '../components/loadingComps/LoadingPosts';

const Home: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [followingArray] = useAtom(atoms.followingArray);
  const [followingArrayStatus] = useAtom(atoms.followingArrayStatus);
  const [postsLoading, setPostsLoading] = useAtom(atoms.postsLoading);

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="h-screen overflow-y-scroll bg-[#fafafa] text-[#262626] dark:bg-[#131313] dark:text-[#f1f5f9] dark:[color-scheme:dark]">
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header page="Home" />
      <div className="mx-auto flex max-w-[822px] justify-center pb-16 lg:justify-start">
        <div className="w-full max-w-[470px] flex-grow lg:mr-8 ">
          <StoryBoard />
          <div
            className={`${postsLoading ? 'fixed opacity-0' : ''}`}
            onLoad={() => setPostsLoading(false)}
          >
            {followingArrayStatus ? (
              <div>
                {followingArray.map((username, index) => (
                  <HomePagePost
                    username={username}
                    index={index}
                    key={username + index}
                  />
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
          {postsLoading ? <LoadingPosts /> : ''}
        </div>
        <UserSuggestions />
      </div>
    </div>
  );
};

export default Home;

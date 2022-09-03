/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAtom } from 'jotai';
import Header from '../components/header/Header';
import HomePagePost from '../components/homePage/HomePagePost';
import StoryBoard from '../components/homePage/StoryBoard';
import LoadingPage from '../components/loadingComps/LoadingPage';
import HomeLoadingContent from '../components/loadingComps/HomeLoadingContent';
import UserSuggestions from '../components/homePage/UserSuggestions';
import atoms from '../util/atoms';

const Home: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [followingArray] = useAtom(atoms.followingArray);
  const [homePogePostsFetched] = useAtom(atoms.homePogePostsFetched);

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
      {homePogePostsFetched ? (
        <div className="mx-auto flex max-w-[822px] pb-16">
          <div className="mr-8  max-w-[470px] flex-grow">
            <StoryBoard />
            {followingArray.map((username, index) => (
              // No removing or rearranging posts from the home page, therefore key index is allowed
              // eslint-disable-next-line react/no-array-index-key
              <HomePagePost username={username} key={username + index} />
            ))}
          </div>
          <UserSuggestions />
        </div>
      ) : (
        <HomeLoadingContent />
      )}
    </div>
  );
};

export default Home;

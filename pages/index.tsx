/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAtom } from 'jotai';
import Header from '../components/Header';
import HomePagePost from '../components/HomePagePost';
import StoryBoard from '../components/StoryBoard';
import LoadingPage from '../components/loadingPages/LoadingPage';
import HomeLoadingContent from '../components/loadingPages/HomeLoadingContent';
import UserSuggestions from '../components/UserSuggestions';
import atoms from '../util/atoms';

const Home: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userNotifications] = useAtom(atoms.userNotifications);

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#262626] dark:bg-[#131313] dark:text-[#f1f5f9]">
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header page="Home" />
      {userNotifications.following ? (
        <div className="mx-auto flex max-w-[822px] pb-16">
          <div className="mr-8  max-w-[470px] flex-grow">
            <StoryBoard />
            {userNotifications.following.map(
              (postUsername: any, index: number) => (
                // No removing or rearranging posts from the home page, therefore key index is allowed
                // eslint-disable-next-line react/no-array-index-key
                <HomePagePost postUsername={postUsername} key={index} />
              )
            )}
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

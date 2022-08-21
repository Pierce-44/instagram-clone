/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAtom } from 'jotai';
import Header from '../components/Header';
import atoms from '../util/atoms';

const Home: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);

  if (!userStatus) {
    return (
      <div className="dark-bg-[#131313] flex h-[100vh] w-full items-center justify-center">
        <img src="/instagramLoading.png" alt="loading" />
      </div>
    );
  }

  return (
    <div className=" h-screen bg-[#fafafa] dark:bg-[#131313]">
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header page="Home" />
    </div>
  );
};

export default Home;

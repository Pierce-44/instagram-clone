import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import getMessageCount from '../components/util/getHomePageInfo';
import Header from '../components/Header';

// eslint-disable-next-line no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context) => {
  const count = await getMessageCount();
  return {
    props: {
      count,
    },
  };
};

interface Props {
  count: number;
}

const Home: NextPage<Props> = ({ count }) => (
  <div className=" h-screen bg-[#fafafa] dark:bg-[#131313]">
    <Head>
      <title>Instagram</title>
      <meta name="description" content="Instagram Clone" />
      <link rel="icon" href="/instagram.png" />
    </Head>
    <Header count={count} />
  </div>
);

export default Home;

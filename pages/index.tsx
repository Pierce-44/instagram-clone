import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className=" h-screen bg-[#fafafa] dark:bg-[#131313]">
        <Head>
          <title>Instagram</title>
          <meta name="description" content="Instagram Clone" />
          <link rel="icon" href="/instagram.png" />
        </Head>
        <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Home;

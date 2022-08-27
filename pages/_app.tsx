import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useAtom } from 'jotai';
import React from 'react';
import useGetUserDetailsOnAuth from '../hooks/useGetUserDetailsOnAuth';
import useShuffleFollowingArray from '../hooks/useShuffleFollowingArray';
import atoms from '../util/atoms';
import useExtractStoriesArray from '../hooks/useExtractStoriesArray';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode] = useAtom(atoms.darkMode);

  useGetUserDetailsOnAuth();
  useShuffleFollowingArray();
  useExtractStoriesArray();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

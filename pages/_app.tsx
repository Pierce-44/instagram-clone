import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useAtom } from 'jotai';
import React from 'react';
import useGetUserDetailsOnAuth from '../hooks/useGetUserDetailsOnAuth';
import useShuffleFollowingArray from '../hooks/useShuffleFollowingArray';
import useExtractStoriesArray from '../hooks/useExtractStoriesArray';
import useGetSpotlightUsers from '../hooks/useGetSpotlightUsers';
import atoms from '../util/atoms';
import useSetUserDarkModePreference from '../hooks/useSetUserDarkModePreference';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode] = useAtom(atoms.darkMode);

  useGetUserDetailsOnAuth();
  useShuffleFollowingArray();
  useExtractStoriesArray();
  useGetSpotlightUsers();
  useSetUserDarkModePreference();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

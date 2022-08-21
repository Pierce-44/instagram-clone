import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useAtom } from 'jotai';
import React from 'react';
import useGetUserDetailsOnAuth from '../hooks/useGetUserDetailsOnAuth';
import atoms from '../util/atoms';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode] = useAtom(atoms.darkMode);

  useGetUserDetailsOnAuth();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

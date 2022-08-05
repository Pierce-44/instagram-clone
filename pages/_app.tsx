/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import dataProps from '../components/Context';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = React.useState(false);

  const dataPropsContainer = React.useMemo(
    () => ({
      darkMode,
      setDarkMode,
    }),
    [darkMode, setDarkMode]
  );

  return (
    <dataProps.Provider value={dataPropsContainer}>
      <div className={darkMode ? 'dark' : ''}>
        <Component {...pageProps} />
      </div>
    </dataProps.Provider>
  );
}

export default MyApp;

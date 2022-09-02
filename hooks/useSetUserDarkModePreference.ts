/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../util/atoms';

function useSetUserDarkModePreference() {
  const [, setDarkMode] = useAtom(atoms.darkMode);

  React.useEffect(() => {
    const darkModeStatus = localStorage.getItem('darkModeInstagram');

    if (darkModeStatus === 'true') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);
}

export default useSetUserDarkModePreference;

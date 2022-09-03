/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai';
import React from 'react';
import Router from 'next/router';
import atoms from '../util/atoms';

interface Props {
  isSubmit: boolean;
}

function useHandleSignIn({ isSubmit }: Props) {
  const [loggingIn, setLoggingIn] = useAtom(atoms.loggingIn);

  React.useEffect(() => {
    if (isSubmit) {
      // triggers the firebase Auth listner to activate so that it can start pulling from the database, plus redirects to the home page
      setLoggingIn(!loggingIn);
      Router.push('/');
    }
  }, [isSubmit]);
}

export default useHandleSignIn;

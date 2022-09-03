import React from 'react';
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from '../util/validate';

interface Props {
  email: string;
  password: string;
  username?: string;
  setEmailFormErrors: React.Dispatch<React.SetStateAction<string>>;
  setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
  setUsernameFormErrors: React.Dispatch<React.SetStateAction<string>>;
}

function useSetFormErrors({
  email,
  password,
  username,
  setEmailFormErrors,
  setPasswordFormErrors,
  setUsernameFormErrors,
}: Props) {
  React.useEffect(() => {
    setEmailFormErrors(emailValidate(email));
    setPasswordFormErrors(passwordValidate(password));
    if (username) {
      setUsernameFormErrors(usernameValidate(username));
    }
  }, [
    email,
    password,
    username,
    setEmailFormErrors,
    setPasswordFormErrors,
    setUsernameFormErrors,
  ]);
}

export default useSetFormErrors;

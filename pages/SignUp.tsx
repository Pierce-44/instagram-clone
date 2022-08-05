/* eslint-disable no-unused-expressions */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Router from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import app from '../components/util/firbaseConfig';
import { emailValidate, passwordValidate } from '../components/util/validate';

function SignUp() {
  app;
  const auth = getAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();

    // submitToFireBase();
    if (passwordFormErrors === '' && emailFormErrors === '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential, error) => {
          // Signed in
          if (error === undefined) {
            setIsSubmit(true);
          }
        })
        .catch((error) => {
          setPasswordFormErrors(error.message);
        });
    }
  }

  React.useEffect(() => {
    if (isSubmit) {
      Router.push('/');
    }
    setEmailFormErrors(emailValidate(email));
    setPasswordFormErrors(passwordValidate(password));
  }, [isSubmit, email, password]);

  return (
    <div>
      <Head>
        <title>Instagram • Sign up</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className="flex w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
            <img
              className="pt-10 pb-5"
              src="/instagramLogin.png"
              alt="instagram"
            />
            <div className="px-10 pb-5 text-center font-semibold text-[#8e8e8e]">
              <p>Sign up to see photos and videos from your friends.</p>
            </div>
            <div className="w-full px-10">
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e) => handleSubmit(e)}
              >
                <label htmlFor="signInPageEmail">
                  {' '}
                  <input
                    className=" w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </label>
                <p className="h-[20px] pb-2 text-[10px] text-red-600">
                  {emailFormErrors}
                </p>
                <label htmlFor="signInPagePassword">
                  {' '}
                  <input
                    className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <p className="h-[20px] text-[10px] text-red-600">
                  {passwordFormErrors}
                </p>
                <button
                  className={`${
                    emailFormErrors === '' && passwordFormErrors === ''
                      ? 'bg-[#0095f6]'
                      : 'pointer-events-none cursor-default bg-[#abddff]'
                  } my-5 w-full rounded-[4px]  px-2 py-1 text-sm font-semibold text-white`}
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="mt-2 flex w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Have an account?</p>
            <button
              className="ml-1 font-semibold text-[#0095f6]"
              type="button"
              onClick={() => Router.push('/Login')}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

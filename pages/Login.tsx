import React from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import useSetFormErrors from '../hooks/useSetFormErrors';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import handleSignIn from '../util/handleSignIn';
import InstagramSVG from '../components/svgComps/InstagramSVG';

const Login: NextPage = () => {
  const [listeners] = useAtom(atoms.listeners);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [, setUsernameFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);

  useSetFormErrors({
    email,
    password,
    setEmailFormErrors,
    setPasswordFormErrors,
    setUsernameFormErrors,
  });

  useHandleSignIn({ isSubmit });

  return (
    <div>
      <Head>
        <title>Instagram • Login</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className="relative hidden h-[590px] overflow-hidden lg:block">
            <Image
              priority
              src="/loginFrame.png"
              alt="instagram"
              height={635}
              width={465}
            />
            <picture>
              <img src="/loginFrame.png" alt="instagram" />
            </picture>
            <div className="absolute top-[26px] right-14 h-full w-full">
              <div className="relative ">
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage1 opacity-0">
                  <Image
                    priority
                    src="/loginImg1.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage2 opacity-0">
                  <Image
                    src="/loginImg2.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage3 opacity-0">
                  <Image
                    src="/loginImg3.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage4 opacity-0">
                  <Image
                    src="/loginImg4.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] py-10">
              <InstagramSVG disableDarkMode white={false} />
            </div>
            <div className="w-full px-5 sm:px-10">
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e: any) =>
                  handleSignIn({
                    e,
                    listeners,
                    passwordFormErrors,
                    emailFormErrors,
                    email,
                    password,
                    guest: false,
                    setIsSubmit,
                    setPasswordFormErrors,
                  })
                }
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
                <p className="h-[20px] max-w-[220px] pb-2 text-[10px] text-red-600">
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
                <p className="h-[20px] max-w-[220px] text-[10px] text-red-600">
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
                  Log In
                </button>
                <div className="mb-5 flex h-0 items-center justify-center">
                  <div className="w-full border-b border-stone-300" />
                  <p className="mx-2 text-sm font-semibold text-[#6d6d6d]">
                    OR
                  </p>
                  <div className="w-full border-b border-stone-300" />
                </div>
                <button
                  className="mb-10 w-full rounded-[4px] bg-[#0095f6] px-2 py-1 text-sm font-semibold text-white"
                  type="button"
                  onClick={(e: any) =>
                    handleSignIn({
                      e,
                      listeners,
                      passwordFormErrors,
                      emailFormErrors,
                      email,
                      password,
                      guest: true,
                      setIsSubmit,
                      setPasswordFormErrors,
                    })
                  }
                >
                  Guest Account
                </button>
              </form>
            </div>
          </div>
          <div className="mt-2 flex max-w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Do not have an account?</p>
            <button
              className="ml-1 font-semibold text-[#0095f6]"
              type="button"
              onClick={() => Router.push('/SignUp')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

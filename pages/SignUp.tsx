/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Router from 'next/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import Head from 'next/head';
import { useAtom } from 'jotai';
import app from '../util/firbaseConfig';
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from '../util/validate';
import atoms from '../util/atoms';

function SignUp() {
  app;
  const auth = getAuth();
  const db = getFirestore(app);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [usernameFormErrors, setUsernameFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [, setLoggingIn] = useAtom(atoms.loggingIn);
  const [listeners] = useAtom(atoms.listeners);

  async function submitUser() {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    let userId: any;

    if (docSnap.exists()) {
      setPasswordFormErrors('Username already exists');
    } else {
      // removes initial firebase auth listener from app load
      listeners.forEach((unsubscribe: any) => unsubscribe());
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential, error) => {
          // Signed in
          userId = userCredential.user.uid;
          updateProfile(userCredential.user, {
            displayName: username,
          });
        })
        .catch((error) => {
          setPasswordFormErrors(error.message.slice(22, -2));
        });

      await setDoc(doc(db, 'users', username), {
        // eslint-disable-next-line object-shorthand
        userId: userId,
        avatarURL: '',
        chatRoomIds: [],
        messageCount: 0,
        likes: false,
        likedPosts: [],
        username,
        postCount: 0,
        // dont think i need
        // followerCount: 0,
        // followingCount: 0,
        followers: [],
        following: [],
        story: '',
        storyViews: [],
      })
        .then(() => {
          // Profile updated!
          setIsSubmit(true);
        })
        .catch((errorProfile) => {
          console.log(errorProfile);
        });

      // create user post collection
      await setDoc(doc(db, `${username}Posts`, 'userPosts'), {
        createdAt: serverTimestamp(),
        postsListArray: [],
      });
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (
      passwordFormErrors === '' &&
      emailFormErrors === '' &&
      usernameFormErrors === ''
    ) {
      submitUser();
    }
  }

  React.useEffect(() => {
    if (isSubmit) {
      // triggers the firebase Auth listner to activate so that it can start pulling from the database, plus redirects to the home page
      setLoggingIn(true);
      Router.push('/');
    }
    setEmailFormErrors(emailValidate(email));
    setPasswordFormErrors(passwordValidate(password));
    setUsernameFormErrors(usernameValidate(username));
  }, [isSubmit, email, password, username]);

  if (loading) {
    return (
      <div className="flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]">
        <picture>
          <img src="/instagramLoading.png" alt="loading" />
        </picture>
      </div>
    );
  }

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
                <label htmlFor="signInPageUserName">
                  {' '}
                  <input
                    className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="text"
                    id="signInPageUserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </label>
                <p className="h-[30px] text-[10px] text-red-600">
                  {usernameFormErrors}
                </p>
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

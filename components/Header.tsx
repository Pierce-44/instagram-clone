/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useAtom } from 'jotai';
import app from '../util/firbaseConfig';
import ProfilePicSVG from './svg/ProfilePicSVG';
import DarkModeButton from './DarkModeButton';
import atoms from '../util/atoms';
import AddNewPost from './AddNewPost';
import HeaderSearchWindow from './HeaderSearchWindow';
import useCheckUserName from '../hooks/useCheckUserName';

function Header({ page }: { page: string }) {
  // eslint-disable-next-line no-unused-expressions
  app;
  const auth = getAuth();
  const [darkMode] = useAtom(atoms.darkMode);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [listeners] = useAtom(atoms.listeners);
  const [, setUserNotifications] = useAtom(atoms.userNotifications);
  const [, setUserDetails] = useAtom(atoms.userDetails);
  const [, setLoggingIn] = useAtom(atoms.loggingIn);

  const [avatarDropDown, setAvatarDropDown] = React.useState(false);
  const [addPost, setAddPost] = React.useState(false);
  const [nameSearch, setNameSearch] = React.useState('');
  const [searchWindow, setSearchWindow] = React.useState(false);

  const queryCharacter = true;

  const user = useCheckUserName({ nameSearch, queryCharacter });

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserNotifications({});
        setUserDetails({});
        setLoggingIn(false);

        // removes all firebase listener
        listeners.forEach((unsubscribe: any) => unsubscribe());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleTimeout() {
    setSearchWindow(false);
  }

  React.useEffect(() => {
    window.addEventListener('click', (e: any) => {
      // if outside of dropdown close dropdown
      if (e.target.id !== 'avatarDropDown') {
        setAvatarDropDown(false);
      }
    });
  }, []);

  return (
    <div className="sticky top-0 z-10 border-b border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c] dark:text-slate-100">
      <div className=" flex h-[60px] items-center justify-between px-[5px] sm:px-[20px] lg:justify-center ">
        <div className="flex h-[60px] w-[330px] min-w-[103px] items-center ">
          <Link href="/">
            <img
              src={darkMode ? '/instagramWhite.png' : '/instagramBlack.png'}
              alt="Instagram"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="relative hidden sm:flex">
          <input
            className=" w-[200px] rounded-lg bg-[#efefef] py-[6px] pl-[45px] focus:outline-0 dark:bg-[#131313]  lg:w-[275px]"
            type="text"
            placeholder="Search"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            onFocus={() => setSearchWindow(true)}
            onBlur={() => {
              setTimeout(handleTimeout, 200);
            }}
          />
          {searchWindow ? (
            <HeaderSearchWindow
              loading={user.checkingUser}
              userDetails={user.queryNotificationsArray}
              searchName={nameSearch}
            />
          ) : (
            ''
          )}
          <svg
            className="absolute left-[15px] top-[25%] cursor-pointer"
            aria-label="Search"
            color="#8e8e8e"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <path
              d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="16.511"
              x2="22"
              y1="16.511"
              y2="22"
            />
          </svg>
        </div>
        <div className="relative flex items-center pl-[15px] lg:pl-[100px]">
          <Link href="/">
            <svg
              aria-label="Home"
              className="cursor-pointer"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              fill={
                page === 'Home'
                  ? darkMode
                    ? '#f1f5f9'
                    : '#262626'
                  : darkMode
                  ? '#262626'
                  : 'white'
              }
            >
              <path
                strokeWidth={page === 'Home' ? '0' : '2'}
                stroke={
                  page === 'Home'
                    ? darkMode
                      ? '#f1f5f9'
                      : '#262626'
                    : darkMode
                    ? '#f1f5f9'
                    : '#262626'
                }
                d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"
              />
            </svg>
          </Link>
          <Link href="/Inbox">
            <svg
              aria-label="Messenger"
              className="ml-[10px] cursor-pointer sm:ml-[22px]"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              color={darkMode ? '#1c1c1c' : 'white'}
            >
              <path
                d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
                stroke={darkMode ? '#f1f5f9' : '#262626'}
                strokeMiterlimit="10"
                strokeWidth="1.739"
                fill={
                  page === 'Inbox'
                    ? darkMode
                      ? '#f1f5f9'
                      : '#262626'
                    : darkMode
                    ? '#262626'
                    : 'white'
                }
              />
              <path
                d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
                fillRule="evenodd"
                fill={
                  page === 'Inbox'
                    ? darkMode
                      ? '#262626'
                      : 'white'
                    : darkMode
                    ? 'white'
                    : '#262626'
                }
              />
            </svg>
          </Link>
          <button onClick={() => setAddPost(true)} type="button">
            <svg
              aria-label="New post"
              className="ml-[10px] cursor-pointer sm:ml-[22px]"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                fill="none"
                stroke={darkMode ? '#f1f5f9' : '#262626'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                fill="none"
                stroke={darkMode ? '#f1f5f9' : '#262626'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="6.545"
                x2="17.455"
                y1="12.001"
                y2="12.001"
              />
              <line
                fill="none"
                stroke={darkMode ? '#f1f5f9' : '#262626'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="12.003"
                x2="12.003"
                y1="6.545"
                y2="17.455"
              />
            </svg>
          </button>

          <svg
            aria-label="Activity Feed cursor-pointer"
            className="ml-[10px] cursor-pointer fill-[#262626] dark:fill-slate-100 sm:ml-[22px]"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z" />
          </svg>
          {userNotifications?.messageCount === 0 ? (
            <div />
          ) : (
            <div className="absolute top-[-6px] left-[123px] flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-[#ff3041] text-[12px] sm:left-[147px] lg:left-[230px]">
              <p className="text-white">{userNotifications?.messageCount}</p>
            </div>
          )}
          <div className="ml-[10px] sm:ml-[22px]">
            <DarkModeButton />
          </div>

          <button
            className="relative ml-[10px] h-6 w-6 sm:ml-[22px]"
            type="button"
            onClick={() => setAvatarDropDown(!avatarDropDown)}
          >
            {userDetails.photoURL ? (
              <img
                id="avatarDropDown"
                src={userDetails.photoURL}
                alt="avatar"
                className="h-6 w-6 cursor-pointer rounded-full object-cover"
              />
            ) : (
              <ProfilePicSVG height="24" width="24" strokeWidth="1.5" />
            )}
            <div
              className={`${
                avatarDropDown ? 'flex items-center justify-center' : 'hidden'
              } absolute top-6 right-1 z-[51] h-4 w-4 overflow-hidden`}
            >
              <div className="mt-5 h-4 w-4 rotate-45 bg-white dark:bg-[#131313]" />
            </div>
            <div
              className={`${
                avatarDropDown ? 'show' : 'hidden'
              } absolute right-[-20px] top-10 z-50 w-[230px] items-center justify-start bg-white text-sm shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)] dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_2px_rgba(0,0,0,0.7)]`}
            >
              <Link href={`/${userDetails.displayName}`}>
                <div className="flex items-center py-2 px-4 hover:bg-[#f8f8f8] dark:hover:bg-[#080808]">
                  <ProfilePicSVG height="16" width="16" strokeWidth="2" />
                  <p className="pl-2">Profile</p>
                </div>
              </Link>
              <div
                className="border-t border-stone-300 py-2 px-4 text-start hover:bg-[#f8f8f8] dark:border-stone-700 dark:hover:bg-[#080808]"
                role="button"
                tabIndex={0}
                onClick={() => handleSignOut()}
              >
                Log out
              </div>
            </div>
          </button>
        </div>
      </div>
      {addPost ? <AddNewPost setAddPost={setAddPost} /> : <div />}
    </div>
  );
}

export default Header;

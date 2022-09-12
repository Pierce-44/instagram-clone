/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import DarkModeButton from './DarkModeButton';
import atoms from '../../util/atoms';
import AddNewPost from './AddNewPost';
import HeaderSearchWindow from './HeaderSearchWindow';
import useCheckUserName from '../../hooks/useCheckUserName';
import ExploreSVG from '../svgComps/ExploreSVG';
import NewPostSVG from '../svgComps/NewPostSVG';
import HeartHollow from '../svgComps/HeartHollow';
import HeartSVG from '../svgComps/HeartSVG';
import IndexSVG from '../svgComps/IndexSVG';
import HomeSVG from '../svgComps/HomeSVG';
import SearchBtnSVG from '../svgComps/SearchBtnSVG';
import useHandleSignOut from '../../hooks/useHandleSignOut';
import useHandleAvatarDropDown from '../../hooks/useHandleAvatarDropDown';
import InstagramSVG from '../svgComps/InstagramSVG';
import HeartNotificationsWindow from './HeartNotificationsWindow';
import useHandleHeartDropDown from '../../hooks/useHandleHeartDropDown';
import handleResetNewHearts from '../../util/handleResetNewHears';

function Header({ page }: { page: string }) {
  // eslint-disable-next-line no-unused-expressions
  const [userDetails] = useAtom(atoms.userDetails);
  const [newMessage] = useAtom(atoms.newMessage);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [avatarDropDown, setAvatarDropDown] = React.useState(false);
  const [addPost, setAddPost] = React.useState(false);
  const [nameSearch, setNameSearch] = React.useState('');
  const [searchWindow, setSearchWindow] = React.useState(false);
  const [signUserOut, setSignUserOut] = React.useState(false);
  const [showHeartNotifications, setShowHeartNotifications] =
    React.useState(false);
  const queryCharacter = true;

  const user = useCheckUserName({ nameSearch, queryCharacter });
  useHandleSignOut({ signUserOut });
  useHandleAvatarDropDown(setAvatarDropDown);
  useHandleHeartDropDown(setShowHeartNotifications);

  return (
    <div className="sticky top-0 z-50 border-b border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c] dark:text-slate-100">
      <div className=" flex h-[60px] items-center justify-between px-[5px] sm:px-[20px] lg:justify-center ">
        <div className="flex h-[60px] w-[330px] items-center ">
          <Link href="/">
            <a className="w-full max-w-[103px] ">
              <div className="w-full max-w-[103px] cursor-pointer select-none">
                <InstagramSVG disableDarkMode={false} white={false} />
              </div>
            </a>
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
              setTimeout(() => setSearchWindow(false), 200);
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
          <div className="absolute left-[15px] top-[25%]">
            <SearchBtnSVG heightWidth="16" />
          </div>
        </div>
        <div className="relative flex items-center pl-[15px] lg:pl-[100px]">
          <Link href="/">
            <a>
              <HomeSVG page={page} />
            </a>
          </Link>
          <Link href="/Inbox">
            <a>
              <div className="relative">
                <IndexSVG page={page} />
                {newMessage ? (
                  <div className="absolute top-[-6px] right-[-8px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ff3041]">
                    <p className="text-center text-white">!</p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </a>
          </Link>
          <button onClick={() => setAddPost(true)} type="button">
            <NewPostSVG />
          </button>
          <div className="relative ml-[10px] cursor-pointer sm:ml-[22px]">
            <div className="flex items-center justify-center">
              <button
                id="unlike"
                type="button"
                onClick={() => {
                  setShowHeartNotifications(true);
                  handleResetNewHearts(userDetails.displayName!);
                }}
              >
                {userNotifications.newHeart ? (
                  <HeartSVG fillColor="#ff3041" height="24" width="24" />
                ) : (
                  <HeartHollow />
                )}
              </button>
              {showHeartNotifications ? <HeartNotificationsWindow /> : ''}
            </div>
          </div>
          <div className="ml-[10px] sm:ml-[22px]">
            <DarkModeButton />
          </div>

          <button
            className="relative ml-[10px] h-6 w-6 sm:ml-[22px]"
            type="button"
            onClick={() => setAvatarDropDown(!avatarDropDown)}
          >
            {userDetails.photoURL ? (
              <Image
                className="h-6 w-6 cursor-pointer select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#313131]"
                id="avatarDropDown"
                src={userDetails.photoURL}
                alt="avatar"
                width="24"
                height="24"
              />
            ) : (
              <div className="h-6 w-6">
                <ProfilePicSVG strokeWidth="1.5" />
              </div>
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
                <a>
                  <div className="flex items-center py-2 px-4 hover:bg-[#f8f8f8] dark:hover:bg-[#080808]">
                    <div className="h-4 w-4">
                      <ProfilePicSVG strokeWidth="2" />
                    </div>
                    <p className="pl-2">Profile</p>
                  </div>
                </a>
              </Link>
              <Link href="/Explore">
                <a>
                  <div className="flex items-center py-2 px-4 hover:bg-[#f8f8f8] dark:hover:bg-[#080808]">
                    <ExploreSVG />
                    <p className="pl-2">Explore</p>
                  </div>
                </a>
              </Link>
              <div
                className="border-t border-stone-300 py-2 px-4 text-start hover:bg-[#f8f8f8] dark:border-stone-700 dark:hover:bg-[#080808]"
                role="button"
                tabIndex={0}
                onClick={() => setSignUserOut(true)}
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

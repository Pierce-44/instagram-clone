/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Image from 'next/future/image';
import { useAtom } from 'jotai';
import atoms, { notificationTypes } from '../../util/atoms';
import handleUnfollow from '../../util/handleUnfollow';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';

interface Props {
  setUnfollow: React.Dispatch<React.SetStateAction<boolean>>;
  imgURL: string;
  username: string;
  userNotifications: notificationTypes;
  profileNotifications: notificationTypes;
}

function UnfollowUser({
  setUnfollow,
  imgURL,
  username,
  userNotifications,
  profileNotifications,
}: Props) {
  const [followingArray, setFollowingArray] = useAtom(atoms.followingArray);

  return (
    <div
      id="close"
      className="fixed top-0 left-0 z-50 flex h-full w-full cursor-default  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]"
      role="button"
      tabIndex={0}
      onClick={(e: any) => {
        if (e.target.id === 'close') {
          setUnfollow(false);
          document.body.style.overflow = 'initial';
        }
      }}
    >
      <div
        className="fixed top-10 right-10"
        role="button"
        tabIndex={0}
        onClick={() => {
          setUnfollow(false);
          document.body.style.overflow = 'initial';
        }}
      >
        <CloseBtnSVG lightColor="white" darkColor="white" heightWidth="18" />
      </div>
      <div className="flex w-[400px] flex-col items-center justify-center rounded-xl bg-white text-center text-sm font-normal dark:border dark:border-stone-300 dark:bg-[#000000]">
        {imgURL === '' ? (
          <div className="my-9 h-[90px] w-[90px]">
            <ProfilePicSVG strokeWidth="1" />
          </div>
        ) : (
          <Image
            className="my-9 h-[90px] w-[90px] rounded-full object-cover"
            src={imgURL}
            alt="avatar"
            width="90"
            height="90"
          />
        )}

        <p className="px-6 pb-7">
          If you change your mind, you can always follow @{username} again.
        </p>
        <div
          className="w-full border-y border-stone-300 py-3  font-semibold  text-[#ED4956] dark:border-stone-700"
          role="button"
          tabIndex={0}
          onClick={() => {
            handleUnfollow({
              setUnfollow,
              userNotifications,
              profileNotifications,
              followingArray,
              setFollowingArray,
            });
          }}
        >
          Unfollow
        </div>
        <div
          className="w-full py-3"
          role="button"
          tabIndex={0}
          onClick={() => {
            setUnfollow(false);
            document.body.style.overflow = 'initial';
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default UnfollowUser;

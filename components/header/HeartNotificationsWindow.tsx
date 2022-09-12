/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAtom } from 'jotai';
import Image from 'next/future/image';
import useGetHeartInfo from '../../hooks/useGetHeartInfo';
import atoms, { postType } from '../../util/atoms';
import PostPopUp from '../PostPopUp';
import handleOpenHeartPost from '../../util/handleOpenHeartPost';
import SpinnerSVG from '../svgComps/SpinnerSVG';

export default function HeartNotificationsWindow() {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userPosts] = useAtom(atoms.userPosts);

  const [postPopUp, setPostPopUp] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [postInfo, setPostInfo] = React.useState<postType>({
    comments: [],
    createdAt: '',
    imgURL: '',
    likeCount: 0,
    likes: [],
    postID: '',
  });

  const heartInfo = useGetHeartInfo();

  if (heartInfo.loading) {
    return (
      <div className="absolute top-6 right-[-80px] h-[280px] w-[270px] cursor-default text-[#262626] dark:text-[#f1f5f9]   sm:right-[-12px] sm:w-[440px]">
        <div className="ml-auto mr-[84px] flex h-4 w-4 items-center justify-center overflow-hidden sm:mr-4">
          <div className="mt-5 h-4 w-4 rotate-45 bg-white dark:bg-[#131313]" />
        </div>
        <div
          className="flex h-full items-center justify-center rounded-md
        bg-white py-4 shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)]
        dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_2px_rgba(0,0,0,0.7)]"
        >
          <div className=" h-6 w-6 ">
            <SpinnerSVG />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-6 right-[-80px] h-[280px] w-[270px]  cursor-default text-[#262626] dark:text-[#f1f5f9] sm:right-[-12px] sm:w-[440px]">
      {postPopUp ? (
        <PostPopUp
          postInformation={postInfo}
          postUserDetails={postInfo.comments[0]}
          setPostPopUp={setPostPopUp}
        />
      ) : (
        ''
      )}
      <div className="ml-auto mr-[84px] flex h-4 w-4 items-center justify-center overflow-hidden sm:mr-4">
        <div className="mt-5 h-4 w-4 rotate-45 bg-white dark:bg-[#131313]" />
      </div>
      <div
        className="rounded-md bg-white py-4 shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)] dark:bg-[#131313]
        dark:shadow-[-2px_-2px_5px_2px_rgba(0,0,0,0.7)]"
      >
        <div className={loading ? 'opacity-0' : ''}>
          <p className="pl-6 text-sm font-semibold">New notifications</p>
          <div onLoad={() => setLoading(false)}>
            {userNotifications.heartNotifications!.map((details, index) => (
              <div
                className="flex items-center gap-2 py-4 px-2 text-sm sm:px-6"
                key={`hearts${index}`}
              >
                {heartInfo.avatarUrlArray[index] &&
                heartInfo.avatarUrlArray[index] !== '' ? (
                  <Image
                    className="mr-2 h-11 w-11 cursor-pointer select-none rounded-full  object-cover "
                    src={heartInfo.avatarUrlArray[index]}
                    alt="avatar"
                    width="44"
                    height="44"
                  />
                ) : (
                  <div className="mr-2 h-11 w-11 rounded-full bg-[#ebebeb] dark:bg-[#313131]" />
                )}
                <div className="flex flex-col sm:flex-row">
                  <p className="font-semibold">{details.username}</p>
                  <p className="text-xs sm:pl-1 sm:text-sm">{details.text}</p>
                </div>

                <Image
                  className="ml-auto h-10 w-10 cursor-pointer select-none object-cover"
                  src={heartInfo.postUrlArray[index]}
                  id="unlike"
                  alt="post"
                  width="40"
                  height="40"
                  priority
                  onClick={() =>
                    handleOpenHeartPost({
                      details,
                      setPostPopUp,
                      setPostInfo,
                      userPosts,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

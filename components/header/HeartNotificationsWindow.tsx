/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAtom } from 'jotai';
import Image from 'next/future/image';
import Link from 'next/link';
import atoms, { heartDetails } from '../../util/atoms';
import PostPopUp from '../PostPopUp';
import useHandleOpenHeartPost from '../../hooks/useHandleOpenHeartPost';
import LoadingHeartPosts from '../loadingComps/LoadingHeartPosts';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import useScrollToLatestMessage from '../../hooks/useScrollToLatestMessage';

export default function HeartNotificationsWindow() {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [darkMode] = useAtom(atoms.darkMode);

  const [postPopUp, setPostPopUp] = React.useState(false);
  const [heartDetail, setHeartDetail] = React.useState<heartDetails>();
  const [loading, setLoading] = React.useState(true);

  const upperRef = React.useRef<HTMLDivElement>(null);

  const postInfo = useHandleOpenHeartPost({ heartDetail, setPostPopUp });

  useScrollToLatestMessage({ messages: null, latestMessageRef: upperRef });

  if (!userNotifications.heartNotifications) {
    return <LoadingHeartPosts />;
  }

  return (
    <div className="relative">
      <div
        id="close"
        className="fixed top-0 left-0 h-screen w-screen cursor-default"
      />
      <div className="absolute top-2 right-[-80px] h-[280px] w-[270px]  cursor-default text-[#262626] dark:text-[#f1f5f9] sm:right-[-12px] sm:w-[440px]">
        {postPopUp ? (
          <PostPopUp
            postInformation={postInfo!}
            postUserDetails={postInfo!.comments[0]}
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
            <div
              className={`${
                darkMode ? 'scrollbarDark' : 'scrollbarLight'
              }  scrollbar flex max-h-[300px] flex-col-reverse overflow-y-auto`}
              onLoad={() => setLoading(false)}
            >
              {userNotifications.heartNotifications!.map((details, index) => (
                <div
                  className="flex items-center gap-2 py-4 px-2 text-sm sm:px-6"
                  key={`hearts${index}`}
                >
                  <Link href={details.username!}>
                    <a>
                      {userNotifications.heartNotifications![index]
                        .userPhoto ? (
                        <Image
                          className="mr-2 h-11 w-11 cursor-pointer select-none rounded-full  object-cover "
                          src={
                            userNotifications.heartNotifications![index]
                              .userPhoto!
                          }
                          alt="avatar"
                          width="44"
                          height="44"
                        />
                      ) : (
                        <div className="mr-2 h-11 w-11">
                          <ProfilePicSVG strokeWidth="1.5" />
                        </div>
                      )}
                    </a>
                  </Link>
                  <div className="flex flex-col sm:flex-row">
                    <Link href={details.username!}>
                      <a>
                        <p className="font-semibold">{details.username}</p>
                      </a>
                    </Link>
                    <p className="text-xs sm:pl-1 sm:text-sm">{details.text}</p>
                  </div>
                  <Image
                    className="ml-auto h-10 w-10 cursor-pointer select-none object-cover"
                    src={userNotifications.heartNotifications![index].postURL!}
                    id="unlike"
                    alt="post"
                    width="80"
                    height="80"
                    priority
                    onClick={() => setHeartDetail(details)}
                  />
                </div>
              ))}
              <div ref={upperRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

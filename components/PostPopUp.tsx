/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import CloseBtnSVG from './svgComps/CloseBtnSVG';
import HeartHollow from './svgComps/HeartHollow';
import HeartSVG from './svgComps/HeartSVG';
import PostTextArea from './PostTextArea';
import CommentSVG from './svgComps/CommentSVG';
import handleLikePost from '../util/handleLikePost';
import atoms, { postCommentTypes, postType } from '../util/atoms';
import ProfilePicSVG from './svgComps/ProfilePicSVG';
import useScrollToLatestMessage from '../hooks/useScrollToLatestMessage';

interface Props {
  postInformation: postType;
  postUserDetails: postCommentTypes;
  setPostPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostPopUp({ postInformation, postUserDetails, setPostPopUp }: Props) {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userDetails] = useAtom(atoms.userDetails);
  const [darkMode] = useAtom(atoms.darkMode);

  const chatBox = React.useRef<HTMLDivElement>(null);
  const latestMessageRef = React.useRef<HTMLDivElement>(null);

  useScrollToLatestMessage({
    messages: postInformation.comments,
    latestMessageRef,
  });

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#000000a4]">
      <div
        className="fixed top-10 right-10"
        role="button"
        tabIndex={0}
        onClick={() => {
          setPostPopUp(false);
          document.body.style.overflow = 'initial';
        }}
      >
        <div
          id="close"
          className="rounded-full bg-[#2525257e] p-1 sm:bg-transparent"
        >
          <CloseBtnSVG lightColor="white" darkColor="white" heightWidth="18" />
        </div>
      </div>
      <div className="mx-2 flex h-full max-h-[calc(100vh-80px)] w-full max-w-[1000px] flex-col items-center justify-center overflow-hidden rounded-md dark:border dark:border-stone-700 sm:max-h-[520px] sm:flex-row md:mx-6 lg:mx-20">
        <div className="flex h-[50%] w-full items-center justify-center bg-black sm:h-full lg:w-[50%]">
          <Image
            className="h-full w-full select-none object-contain sm:h-[520px] lg:w-[520px]"
            src={postInformation.imgURL}
            alt="post"
            width="0"
            height="0"
            sizes="(min-width: 40em) 40vw,
            100vw"
          />
        </div>
        <div className="flex h-[50%] w-full flex-col bg-white dark:bg-[#1c1c1c] sm:h-full lg:w-[50%]">
          <div className="flex items-center justify-start gap-3 border-b border-stone-200 py-1 px-4 dark:border-stone-700 sm:p-4 ">
            <Link href={postUserDetails.username}>
              <a>
                {!postUserDetails.avatarURL ? (
                  <div className="h-8 w-8">
                    <ProfilePicSVG strokeWidth="1" />
                  </div>
                ) : (
                  <Image
                    className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                    src={postUserDetails.avatarURL}
                    alt="avatar"
                    width="32"
                    height="32"
                  />
                )}
              </a>
            </Link>
            <Link href={postUserDetails.username}>
              <a>
                <p className="cursor-pointer text-sm font-semibold">
                  {postUserDetails.username}
                </p>
              </a>
            </Link>
          </div>
          <div className="flex-grow overflow-y-auto bg-[#fafafa] text-sm dark:bg-[#131313] dark:[color-scheme:dark] ">
            <div ref={chatBox}>
              {postInformation.comments.map((commentInfo, index) =>
                commentInfo.text === '' ? (
                  ''
                ) : (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`post${index}`}
                    className="flex px-4 py-1 sm:p-4"
                  >
                    <div className="flex-shrink-0">
                      <Link href={`/${commentInfo.username}`}>
                        <a>
                          {!commentInfo.avatarURL ? (
                            <div className="mr-4 h-8 w-8">
                              <ProfilePicSVG strokeWidth="1" />
                            </div>
                          ) : (
                            <Image
                              className="mr-4 h-8 w-8 flex-shrink-0 select-none rounded-full object-cover"
                              src={commentInfo.avatarURL}
                              alt="avatar"
                              width="32"
                              height="32"
                            />
                          )}
                        </a>
                      </Link>
                    </div>
                    <div>
                      <p className="">
                        <Link href={`/${commentInfo.username}`}>
                          <a>
                            <b>{commentInfo.username}</b>
                          </a>
                        </Link>

                        {` - ${commentInfo.text}`}
                      </p>
                      <p className="pt-1 text-xs text-[#a5a5a5]">
                        {commentInfo.createdAt}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div ref={latestMessageRef} />
          </div>
          <div className="dark:bg-[#1c1c1c]">
            <div className="border-t border-stone-200 px-5 pt-1 pb-1 dark:border-stone-700 sm:pt-4">
              <div className="mb-1 flex gap-4 sm:mb-3">
                {userNotifications.likedPosts!.includes(
                  postInformation.postID
                ) ? (
                  <button
                    id="unlike"
                    type="button"
                    onClick={(e) =>
                      handleLikePost({
                        e,
                        userDetails,
                        postUserDetails,
                        postInformation,
                      })
                    }
                  >
                    <div className="group">
                      <div className="sm:group-hover:animate-bounce">
                        <HeartSVG fillColor="#ed4956" height="24" width="24" />
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    id="like"
                    type="button"
                    onClick={(e) =>
                      handleLikePost({
                        e,
                        userDetails,
                        postUserDetails,
                        postInformation,
                      })
                    }
                  >
                    <div className="group">
                      <div className="sm:group-hover:animate-bounce">
                        <HeartHollow />
                      </div>
                    </div>
                  </button>
                )}
                <CommentSVG
                  outline={darkMode ? '#f1f5f9' : '#262626'}
                  height="24"
                  width="24"
                  fill="none"
                />
              </div>
              <div className="flex text-sm">
                <p>
                  Liked by{' '}
                  <b>
                    {postInformation.likes.length > 0 ? (
                      <Link href={postInformation.likes[0]}>
                        <a>{postInformation.likes[0]}</a>
                      </Link>
                    ) : (
                      ''
                    )}
                  </b>{' '}
                </p>
                {postInformation.likes?.length === 1 ? (
                  ''
                ) : (
                  <div className="pl-1">
                    {postInformation.likes.length > 0 ? 'and' : ''}{' '}
                    <b>
                      {postInformation.likes.length} other
                      {postInformation.likes.length === 1 ? '' : 's'}
                    </b>
                  </div>
                )}
              </div>
              <p className=" text-xs text-[#a5a5a5] sm:pt-2">
                {new Date(
                  postInformation.createdAt.seconds * 1000
                ).toDateString()}
              </p>
            </div>
            <PostTextArea
              postUserDetails={postUserDetails}
              postInformation={postInformation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPopUp;

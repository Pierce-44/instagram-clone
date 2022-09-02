/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import CloseBtnSVG from './svgComps/CloseBtnSVG';
import HeartHollow from './svgComps/HeartHollow';
import HeartSVG from './svgComps/HeartSVG';
import PostTextArea from './PostTextArea';
import CommentSVG from './svgComps/CommentSVG';
import handleLikePost from '../util/handleLikePost';
import atoms from '../util/atoms';

type commentObject = {
  text: string;
  avatarURL: string;
  username: string;
  createdAt: string;
};

function PostPopUp({ postInformation, postUserDetails, setPostPopUp }) {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userDetails] = useAtom(atoms.userDetails);
  const [darkMode] = useAtom(atoms.darkMode);

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
        <CloseBtnSVG lightColor="white" darkColor="white" heightWidth="18" />
      </div>
      <div className="mx-20 flex h-[520px] overflow-hidden rounded-md dark:border dark:border-stone-700">
        <div className="flex items-center bg-black">
          <picture>
            <img
              className="h-[520px] w-[520px] select-none object-contain"
              src={postInformation.imgURL}
              alt="post"
            />
          </picture>
        </div>
        <div className="flex flex-col bg-white dark:bg-[#1c1c1c]">
          <div className="flex w-[500px] items-center justify-start gap-3 border-b border-stone-200 p-4 dark:border-stone-700">
            <Link href={postUserDetails.username}>
              <picture>
                <img
                  className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                  src={postUserDetails.avatarURL}
                  alt="avatar"
                />
              </picture>
            </Link>
            <Link href={postUserDetails.username}>
              <p className="cursor-pointer text-sm font-semibold">
                {postUserDetails.username}
              </p>
            </Link>
          </div>
          <div className="w-[500px] flex-grow overflow-y-auto bg-[#fafafa] text-sm dark:bg-[#131313] dark:[color-scheme:dark]">
            {postInformation.comments?.map(
              (commentInfo: commentObject, index: number) =>
                commentInfo.text === '' ? (
                  ''
                ) : (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`post${index}`}
                    className="flex p-4"
                  >
                    <div className="flex-shrink-0">
                      <Link href={`/${commentInfo.username}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setPostPopUp(false);
                            document.body.style.overflow = 'initial';
                          }}
                        >
                          <picture>
                            <img
                              className="mr-4 h-8 w-8 flex-shrink-0 select-none rounded-full object-cover"
                              src={commentInfo.avatarURL}
                              alt="avatar"
                            />
                          </picture>
                        </button>
                      </Link>
                    </div>
                    <div>
                      <p className="">
                        <Link href={`/${commentInfo.username}`}>
                          <button
                            type="button"
                            onClick={() => {
                              setPostPopUp(false);
                              document.body.style.overflow = 'initial';
                            }}
                          >
                            <b>{commentInfo.username}</b>
                          </button>
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
          <div className="dark:bg-[#1c1c1c]">
            <div className="border-t border-stone-200 px-5 pt-4 pb-1 dark:border-stone-700">
              <div className="mb-3 flex gap-4">
                {userNotifications.likedPosts.includes(
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
                      <div className="group-hover:animate-bounce">
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
                      <div className="group-hover:animate-bounce">
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
                    {postInformation.likes?.length > 0
                      ? postInformation.likes[0]
                      : ''}
                  </b>{' '}
                </p>
                {postInformation.likes?.length === 1 ? (
                  ''
                ) : (
                  <div className="pl-1">
                    {postInformation.likes?.length > 0 ? 'and' : ''}{' '}
                    <b>
                      {postInformation.likes?.length} other
                      {postInformation.likes?.length === 1 ? '' : 's'}
                    </b>
                  </div>
                )}
              </div>
              <p className="pt-2 text-xs text-[#a5a5a5]">
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

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import useGetOtherUserPosts from '../hooks/useGetOtherUserPosts';
import PostPopUp from './PostPopUp';
import HeartHollow from './svg/HeartHollow';
import SpinnerSVG from './svg/SpinnerSVG';
import HeartSVG from './svg/HeartSVG';
import handleLikePost from '../util/handleLikePost';
import CommentSVG from './svg/CommentSVG';
import PostTextArea from './PostTextArea';
import atoms from '../util/atoms';

function HomePagePost({ postUsername }: { postUsername: any }) {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userDetails] = useAtom(atoms.userDetails);
  const [darkMode] = useAtom(atoms.darkMode);

  const [postPopUp, setPostPopUp] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [commentSVGHover, setCommentSVGHover] = React.useState(false);

  const nameSearch = postUsername;
  const limitSearch = true;

  // Already know user exists therefore can bypass the checks
  const user = false;
  // This custom hook will get the followers kates post details
  const otherUser = useGetOtherUserPosts({ user, nameSearch, limitSearch });

  const postDetails = otherUser.profilePosts[0];
  // console.log(postDetails);

  return (
    <div>
      {postDetails ? (
        <div className="my-4 overflow-hidden rounded-lg border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
          {postPopUp ? (
            <PostPopUp
              postInformation={postDetails}
              postUserDetails={postDetails.comments[0]}
              setPostPopUp={setPostPopUp}
            />
          ) : (
            ''
          )}
          <div className="ml-3 flex items-center py-3">
            <Link href={postDetails.comments[0].username}>
              <picture>
                <img
                  className="h-8 w-8 cursor-pointer rounded-full object-cover"
                  src={postDetails?.comments[0].avatarURL}
                  alt=""
                />
              </picture>
            </Link>
            <Link href={postDetails.comments[0].username}>
              <p className="ml-4 cursor-pointer">
                {postDetails?.comments[0].username}
              </p>
            </Link>
          </div>
          <div
            className={
              loading
                ? 'relative flex h-[300px] w-full bg-[#ebebeb] dark:bg-[#313131]'
                : 'flex max-h-[600px] items-center justify-center overflow-hidden'
            }
            role="button"
            tabIndex={0}
            onClick={() => {
              setPostPopUp(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <picture className="w-full">
              <img
                className={loading ? 'hidden' : 'h-auto  w-full'}
                src={postDetails?.imgURL}
                alt="post"
                onLoad={() => setLoading(false)}
              />
            </picture>
            <div
              className={
                loading
                  ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'
                  : 'hidden'
              }
            >
              <SpinnerSVG />
            </div>
          </div>
          <div>
            <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
              <div className="mb-3 flex gap-4">
                {userNotifications.likedPosts.includes(postDetails?.postID) ? (
                  <button
                    id="unlike"
                    type="button"
                    onClick={(e) =>
                      handleLikePost({
                        e,
                        userDetails,
                        postUserDetails: postDetails.comments[0],
                        postInformation: postDetails,
                      })
                    }
                  >
                    <HeartSVG fillColor="#ed4956" height="24" width="24" />
                  </button>
                ) : (
                  <button
                    id="like"
                    type="button"
                    onClick={(e) =>
                      handleLikePost({
                        e,
                        userDetails,
                        postUserDetails: postDetails.comments[0],
                        postInformation: postDetails,
                      })
                    }
                  >
                    <HeartHollow />
                  </button>
                )}
                <button
                  type="button"
                  className="h-6 w-6 cursor-pointer"
                  onMouseEnter={() => setCommentSVGHover(true)}
                  onMouseLeave={() => setCommentSVGHover(false)}
                  onClick={() => {
                    setPostPopUp(true);
                    document.body.style.overflow = 'hidden';
                  }}
                >
                  {commentSVGHover ? (
                    <CommentSVG
                      outline="#999999"
                      height="24"
                      width="24"
                      fill="none"
                    />
                  ) : (
                    <CommentSVG
                      outline={darkMode ? '#f1f5f9' : '#262626'}
                      height="24"
                      width="24"
                      fill="none"
                    />
                  )}
                </button>
              </div>
              <div className="flex text-sm">
                <p>
                  Liked by{' '}
                  <b>
                    {postDetails.likes.length > 0 ? postDetails.likes[0] : ''}
                  </b>{' '}
                </p>
                {postDetails.likes.length === 1 ? (
                  ''
                ) : (
                  <div className="pl-1">
                    {postDetails.likes.length > 0 ? 'and' : ''}{' '}
                    <b>
                      {postDetails.likes.length} other
                      {postDetails.likes.length === 1 ? '' : 's'}
                    </b>
                  </div>
                )}
              </div>
              <div className="max-h-[260px] overflow-hidden">
                {postDetails.comments.length === 1 &&
                postDetails.comments[0].text === '' ? (
                  ''
                ) : (
                  <p>{postDetails.comments[0].text}</p>
                )}
                {postDetails.comments.length > 1 &&
                postDetails.comments[0].text === '' ? (
                  <div className="pt-2 text-sm">
                    <p>
                      <b>{postDetails.comments[1].username}</b>{' '}
                      {postDetails.comments[1].text}
                    </p>
                    <p className="pt-2">
                      <b>{postDetails.comments[2]?.username}</b>{' '}
                      {postDetails.comments[2]?.text}
                    </p>
                    {/* <p>{postDetails.comments[1].text}</p> */}
                  </div>
                ) : (
                  <p>{postDetails.comments[0].text}</p>
                )}
              </div>
              <button
                className="mt-3 text-xs text-[#a5a5a5]"
                type="button"
                onClick={() => {
                  setPostPopUp(true);
                  document.body.style.overflow = 'hidden';
                }}
              >
                {postDetails.comments.length === 1 &&
                postDetails.comments[0].text === '' ? (
                  <div>No comments</div>
                ) : (
                  <div>
                    {postDetails.comments.length === 2 ? (
                      <p>View the 1st comment</p>
                    ) : (
                      <p>View all {postDetails.comments.length - 1} comments</p>
                    )}
                  </div>
                )}
              </button>
              <p className="pt-2 text-xs text-[#a5a5a5]">
                {new Date(postDetails.createdAt.seconds * 1000).toDateString()}
              </p>
            </div>
            <PostTextArea
              postInformation={postDetails}
              postUserDetails={postDetails.comments[0]}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 w-[470px]  rounded-lg border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
          <div className="flex h-14 items-center">
            <div className="ml-5 h-8 w-8 rounded-full bg-[#ebebeb] dark:bg-[#313131]" />
            <div className="ml-5 h-5 w-[200px] rounded-lg bg-[#ebebeb] dark:bg-[#313131]" />
          </div>
          <div className="h-[300px] bg-[#ebebeb] dark:bg-[#313131]" />
          <div className="flex h-14 items-center">
            <div className="ml-5 h-5 w-[200px] rounded-lg bg-[#ebebeb] dark:bg-[#313131]" />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePagePost;

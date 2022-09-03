/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import PostPopUp from '../PostPopUp';
import HeartHollow from '../svgComps/HeartHollow';
import SpinnerSVG from '../svgComps/SpinnerSVG';
import HeartSVG from '../svgComps/HeartSVG';
import handleLikePost from '../../util/handleLikePost';
import CommentSVG from '../svgComps/CommentSVG';
import HomePagePostHeaderComments from './HomePagePostHeaderComments';
import PostTextArea from '../PostTextArea';
import atoms from '../../util/atoms';

interface Props {
  username: string;
}

const HomePagePost = ({ username }: Props) => {
  const [darkMode] = useAtom(atoms.darkMode);
  const [userDetails] = useAtom(atoms.userDetails);
  const [homePagePosts] = useAtom(atoms.homePagePosts);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [postImgHeight, setPostImgHeight] = useAtom(atoms.postImgHeight);

  const [loading, setLoading] = React.useState(true);
  const [postPopUp, setPostPopUp] = React.useState(false);

  const postDetails = homePagePosts[username];

  // if the user deos not have any posts published show nothing.
  if (!postDetails?.comments) {
    return <div />;
  }

  return (
    <div>
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
          <Link href={username}>
            <picture>
              <img
                className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                src={postDetails.comments[0].avatarURL}
                alt=""
              />
            </picture>
          </Link>
          <Link href={username}>
            <p className="ml-4 cursor-pointer">
              {postDetails.comments[0].username}
            </p>
          </Link>
        </div>
        <div
          // if the image dimensions are unkown set the div height to 300px
          className={`${
            postImgHeight[username]
              ? `h-[${postImgHeight[username]}px]  items-center justify-center overflow-hidden`
              : 'relative h-[300px]'
          } flex min-h-[150px] w-full bg-[#ebebeb] dark:bg-[#313131]`}
          role="button"
          tabIndex={0}
          onClick={() => {
            setPostPopUp(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <picture className="w-full">
            <img
              className={
                loading && !postImgHeight[username]
                  ? 'h-auto  w-full opacity-0'
                  : 'h-auto  w-full select-none'
              }
              src={postDetails.imgURL}
              alt="post"
              // on image load store the images height so that it can be used in the future. I want to reduce different div height flickers when the page re renders (before the first render the image height is unknown).
              onLoad={(e: any) => {
                setPostImgHeight((prevState: any) => ({
                  ...prevState,
                  [username]: e.target.offsetHeight,
                }));
                setLoading(false);
              }}
            />
          </picture>
          {loading && !postImgHeight[username] ? (
            // show the spinner only before the image dimensions are known
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <SpinnerSVG />
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
            <div className="mb-3 flex gap-4">
              {userNotifications.likedPosts!.includes(postDetails.postID) ? (
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
                      postUserDetails: postDetails.comments[0],
                      postInformation: postDetails,
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
              <button
                type="button"
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  setPostPopUp(true);
                  document.body.style.overflow = 'hidden';
                }}
              >
                <div className="group">
                  <div className="group-hover:animate-bounce">
                    <CommentSVG
                      outline={darkMode ? '#f1f5f9' : '#262626'}
                      height="24"
                      width="24"
                      fill="none"
                    />
                  </div>
                </div>
              </button>
            </div>
            <div className="flex text-sm">
              <p>
                Liked by{' '}
                <b>
                  {postDetails.likes.length > 0 ? (
                    <Link href={postDetails.likes[0]}>
                      {postDetails.likes[0]}
                    </Link>
                  ) : (
                    ''
                  )}
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
              <HomePagePostHeaderComments postDetails={postDetails} />
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
    </div>
  );
};

export default HomePagePost;

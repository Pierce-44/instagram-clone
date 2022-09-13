/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Image from 'next/future/image';
import CommentSVG from '../svgComps/CommentSVG';
import HeartSVG from '../svgComps/HeartSVG';
import PostPopUp from '../PostPopUp';
import { postType } from '../../util/atoms';

function UserPost({
  postInformation,
  postUserDetails,
}: {
  postInformation: postType;
  postUserDetails: any;
}) {
  const [postInfo, setPostInfo] = React.useState(false);
  const [postPopUp, setPostPopUp] = React.useState(false);

  return (
    <div className="relative overflow-hidden">
      <Image
        className="h-[175px] w-[300px] select-none bg-[#ebebeb] object-cover dark:bg-[#313131] sm:h-[300px]"
        src={postInformation.imgURL}
        alt="user post"
        width="0"
        height="0"
        sizes="100vw"
        priority
      />
      <div
        className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center hover:bg-[#00000049]"
        role="button"
        tabIndex={0}
        onMouseEnter={() => setPostInfo(true)}
        onMouseLeave={() => setPostInfo(false)}
        onClick={() => {
          setPostPopUp(true);
          document.body.style.overflow = 'hidden';
        }}
      >
        {postInfo ? (
          <div className="flex items-center gap-2 text-white sm:gap-5">
            <div className="flex items-center">
              <HeartSVG fillColor="white" height="20" width="20" />
              <p className="pl-1 text-lg font-semibold">
                {postInformation.likes.length}
              </p>
            </div>
            <div className="flex items-center">
              <CommentSVG outline="white" height="20" width="20" fill="white" />
              <p className="pl-1 text-lg font-semibold">
                {postInformation.comments.length}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {postPopUp ? (
        <PostPopUp
          postInformation={postInformation}
          postUserDetails={postUserDetails}
          setPostPopUp={setPostPopUp}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default UserPost;

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import CommentSVG from '../svgComps/CommentSVG';
import HeartSVG from '../svgComps/HeartSVG';
import PostPopUp from '../PostPopUp';

type postObject = {
  comments: [];
  imgURL: string;
  likes: any;
  createdAt: any;
  postID: string;
};

function UserPost({
  postInformation,
  postUserDetails,
}: {
  postInformation: postObject;
  postUserDetails: any;
}) {
  const [postInfo, setPostInfo] = React.useState(false);
  const [postPopUp, setPostPopUp] = React.useState(false);

  return (
    <div className="relative overflow-hidden">
      <picture>
        <img
          className="h-[300px] w-[300px] bg-[#ebebeb] object-cover dark:bg-[#313131]"
          src={postInformation.imgURL}
          alt="user post"
        />
      </picture>
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
          <div className="flex items-center gap-5 text-white">
            <div className="flex items-center">
              <HeartSVG fillColor="white" height="20" width="20" />
              <p className="pl-1 text-lg font-semibold">
                {postInformation.likes?.length}
              </p>
            </div>
            <div className="flex items-center">
              <CommentSVG outline="white" height="20" width="20" fill="white" />
              <p className="pl-1 text-lg font-semibold">
                {postInformation.comments?.length}
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

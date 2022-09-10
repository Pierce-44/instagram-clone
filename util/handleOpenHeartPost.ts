import React from 'react';
import { heartDetails, postType } from './atoms';

interface Props {
  details: heartDetails;
  setPostPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setPostInfo: React.Dispatch<React.SetStateAction<postType>>;
  userPosts: postType[];
}

export default function handleOpenHeartPost({
  details,
  setPostPopUp,
  setPostInfo,
  userPosts,
}: Props) {
  userPosts.forEach((info) => {
    if (info.postID === details.postId) {
      setPostPopUp(true);
      setPostInfo(info);
    }
  });
}

import { useAtom } from 'jotai';
import React from 'react';
import atoms, { heartDetails, postType } from '../util/atoms';

interface Props {
  heartDetail: heartDetails | undefined;
  setPostPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useHandleOpenHeartPost({
  heartDetail,
  setPostPopUp,
}: Props) {
  const [userPosts] = useAtom(atoms.userPosts);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [postInfo, setPostInfo] = React.useState<postType>();

  React.useEffect(() => {
    userPosts.forEach((info) => {
      if (heartDetail && info.postID === heartDetail.postId) {
        setPostInfo(info);
        setPostPopUp(true);
      }
    });
  }, [heartDetail, setPostPopUp, userNotifications, userPosts]);

  return postInfo;
}

import { User } from 'firebase/auth';
import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { postCommentTypes, postType, userDetailTypes } from './atoms';
import app from './firbaseConfig';
import handleUpdateHeartNotifcation from './handleUpdateHeartNotification';

interface Props {
  e: any;
  userDetails: userDetailTypes | User;
  postUserDetails: postCommentTypes;
  postInformation: postType;
}

function handleLikePost({
  e,
  userDetails,
  postUserDetails,
  postInformation,
}: Props) {
  const db = getFirestore(app);
  const postDocRef = doc(
    db,
    `${postUserDetails.username}Posts`,
    postInformation.postID
  );
  const userRef = doc(db, 'users', userDetails.displayName!);

  if (e.target.id === 'like') {
    updateDoc(postDocRef, {
      likes: arrayUnion(userDetails.displayName),
    });
    updateDoc(userRef, {
      likedPosts: arrayUnion(postInformation.postID),
    });
    handleUpdateHeartNotifcation({
      postUserDetails,
      userDetails,
      postInformation,
      heartType: 'like',
    });
  } else if (e.target.id === 'unlike') {
    updateDoc(postDocRef, {
      likes: arrayRemove(userDetails.displayName),
    });
    updateDoc(userRef, {
      likedPosts: arrayRemove(postInformation.postID),
    });
  }
}

export default handleLikePost;

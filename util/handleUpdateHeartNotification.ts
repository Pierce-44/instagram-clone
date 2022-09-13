import { User } from 'firebase/auth';
import { getFirestore, updateDoc, doc, getDoc } from 'firebase/firestore';
import { postCommentTypes, postType, userDetailTypes } from './atoms';
import app from './firbaseConfig';

export default function handleUpdateHeartNotifcation({
  postUserDetails,
  userDetails,
  postInformation,
  heartType,
}: {
  postUserDetails: postCommentTypes;
  userDetails: userDetailTypes | User;
  postInformation: postType;
  heartType: string;
}) {
  const db = getFirestore(app);

  let textInfo: string;
  let heartArray;

  if (heartType === 'like') {
    textInfo = 'liked your post';
  } else {
    textInfo = 'commented on your post';
  }

  async function getOtherUsersHeartArray() {
    const otherUserRef = doc(db, 'users', postUserDetails.username);
    const docSnap = await getDoc(otherUserRef);
    heartArray = docSnap.data()!.heartNotifications;

    if (
      heartArray!.length === 6 &&
      postUserDetails.username !== userDetails.displayName
    ) {
      heartArray.splice(0, 1);
      heartArray.push({
        username: userDetails.displayName,
        userPhoto: userDetails.photoURL,
        text: textInfo,
        postURL: postInformation.imgURL,
        postId: postInformation.postID,
      });
    } else if (postUserDetails.username !== userDetails.displayName) {
      heartArray!.push({
        username: userDetails.displayName,
        userPhoto: userDetails.photoURL,
        text: textInfo,
        postURL: postInformation.imgURL,
        postId: postInformation.postID,
      });
    }
    const userRef = doc(db, 'users', postUserDetails.username);
    updateDoc(userRef, {
      newHeart: true,
      heartNotifications: heartArray,
    });
  }
  getOtherUsersHeartArray();
}

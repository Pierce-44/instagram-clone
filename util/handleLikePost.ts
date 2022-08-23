import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import app from './firbaseConfig';

function handleLikePost({ e, userDetails, postUserDetails, postInformation }) {
  const db = getFirestore(app);
  const postDocRef = doc(
    db,
    `${postUserDetails.username}Posts`,
    postInformation.postID
  );
  const userRef = doc(db, 'users', userDetails.displayName);

  if (e.target.id === 'like') {
    updateDoc(postDocRef, {
      likes: arrayUnion(userDetails.displayName),
    });
    updateDoc(userRef, {
      likedPosts: arrayUnion(postInformation.postID),
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

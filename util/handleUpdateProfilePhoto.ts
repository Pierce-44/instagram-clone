import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';

async function handleUpdateProfilePhoto(url, username, chatRoomIDs) {
  const auth = getAuth();
  const db = getFirestore(app);
  const countRef = doc(db, 'users', username);

  // update all subscribed chatrooms with new image

  // userNotifications.chatRoomIds
  await chatRoomIDs.forEach((element: string) => {
    // const countRef = doc(db, 'users', element);
    updateDoc(doc(db, element, 'users'), {
      [`${username}Avatar`]: url,
    });
  });

  // update database user with new photo url
  updateDoc(countRef, {
    avatarURL: url,
  });

  // update the auth user details
  updateProfile(auth.currentUser, {
    photoURL: url,
  })
    .then(() => {
      // Profile updated!
      // setLoading(false);
      // setAddPhoto(false);
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
    });
}

export default handleUpdateProfilePhoto;

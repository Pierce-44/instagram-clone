import { getStorage, ref, deleteObject } from 'firebase/storage';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import app from './firbaseConfig';

async function handleRemoveProfilePhoto({ username, chatRoomIds }) {
  const auth = getAuth();
  const db = getFirestore(app);
  const storage = getStorage();
  const countRef = doc(db, 'users', username);

  const desertRef = ref(storage, `profilePhotos/${username}`);
  // setLoading(true);

  // delete image from all subscribed chatrooms
  await chatRoomIds.forEach((element: string) => {
    // const countRef = doc(db, 'users', element);
    updateDoc(doc(db, element, 'users'), {
      [`${username}Avatar`]: '',
    });
  });

  // remove user photo url from database
  await updateDoc(countRef, {
    avatarURL: '',
  });

  // Delete the file from cloud storage
  await deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      console.log(error);
    });

  // update auth user details to reflect changes
  await updateProfile(auth.currentUser, {
    // eslint-disable-next-line object-shorthand
    photoURL: '',
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

export default handleRemoveProfilePhoto;

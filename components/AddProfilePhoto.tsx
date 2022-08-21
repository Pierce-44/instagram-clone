import React from 'react';
import imageCompression from 'browser-image-compression';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAtom } from 'jotai';
import app from '../util/firbaseConfig';
import atoms from '../util/atoms';

function AddProfilePhoto({ setAddPhoto }: { setAddPhoto: any }) {
  // eslint-disable-next-line no-unused-expressions
  app;
  const db = getFirestore(app);
  const auth = getAuth();
  const storage = getStorage();
  const [photoURL, setPhotoURL] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const countRef = doc(db, 'users', userDetails.displayName);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 200,
    useWebWorker: true,
  };

  async function handleUploadToCloud(e: any) {
    const fileType = e.target.files[0].type;
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `profilePhotos/${userDetails.displayName}`);

    if (
      fileType === 'image/png' ||
      fileType === 'image/jpg' ||
      fileType === 'image/jpeg'
    ) {
      setLoading(true);

      // compress the image
      const compressedFile = await imageCompression(imageFile, options);

      // upload to storage, and then retrieve the usable URL
      await uploadBytes(storageRef, compressedFile).then(() => {
        // image uplaoded
      });
      getDownloadURL(ref(storage, `profilePhotos/${userDetails.displayName}`))
        .then((url) => {
          setPhotoURL(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('please only use .png, .jpg, .jpeg file types');
    }
  }

  async function updateUserProfilePhoto() {
    // update all subscribed chatrooms with new image
    await userNotifications.chatRoomIds.forEach((element: string) => {
      // const countRef = doc(db, 'users', element);
      updateDoc(doc(db, element, 'users'), {
        [`${userDetails.displayName}Avatar`]: photoURL,
      });
    });

    // update database user with new photo url
    updateDoc(countRef, {
      avatarURL: photoURL,
    });

    // update the auth user details
    updateProfile(auth.currentUser, {
      photoURL,
    })
      .then(() => {
        // Profile updated!
        setLoading(false);
        setAddPhoto(false);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  }

  async function removePhoto() {
    const desertRef = ref(storage, `profilePhotos/${userDetails.displayName}`);
    setLoading(true);

    // delete image from all subscribed chatrooms
    await userNotifications.chatRoomIds.forEach((element: string) => {
      // const countRef = doc(db, 'users', element);
      updateDoc(doc(db, element, 'users'), {
        [`${userDetails.displayName}Avatar`]: '',
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
        setLoading(false);
        setAddPhoto(false);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  }

  React.useEffect(() => {
    if (photoURL !== '') {
      updateUserProfilePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoURL]);

  return (
    <div className="fixed top-0 z-10 flex h-full w-full  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
      <div
        className={
          loading ? 'animate-spin rounded-full bg-[#000000de] p-2 ' : 'hidden'
        }
      >
        <picture>
          <img
            className="h-10 w-10"
            src="/instagramLoading.png"
            alt="instagram loading"
          />
        </picture>
      </div>
      <div
        className={`${
          loading ? 'hidden' : ''
        } w-[400px] flex-col rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]`}
      >
        <h1 className="py-7 text-center text-lg font-semibold">
          Change profile photo
        </h1>
        <div className="flex justify-center border-y border-stone-300  text-sm font-semibold text-[#0095f6] dark:border-stone-700">
          <label
            className="flex-grow cursor-pointer py-3 text-center"
            htmlFor="photoFile"
          >
            Upload Photo
            <input
              type="file"
              id="photoFile"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => handleUploadToCloud(e)}
            />
          </label>
        </div>
        <button
          className="w-full border-b border-stone-300 py-3 text-sm font-semibold text-[#ED4956] dark:border-stone-700"
          type="button"
          onClick={() => removePhoto()}
        >
          Remove current photo
        </button>
        <button
          className="w-full py-3 text-sm"
          onClick={() => setAddPhoto(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddProfilePhoto;

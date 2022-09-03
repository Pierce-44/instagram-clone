/* eslint-disable no-unused-vars */
import React from 'react';
import imageCompression from 'browser-image-compression';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { userDetailTypes } from './atoms';

interface Props {
  e: any;
  location: string;
  username: string;
  maxWidthOrHeight: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

async function handleUploadToCloud({
  e,
  location,
  username,
  maxWidthOrHeight,
  setLoading,
}: Props) {
  const fileType = e.target.files[0].type;
  const imageFile = e.target.files[0];
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight,
    useWebWorker: true,
  };
  const storage = getStorage();
  const storageRef = ref(storage, `${location}/${username}`);

  let photoURL;

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
    await getDownloadURL(ref(storage, `${location}/${username}`))
      .then((url) => {
        // setPhotoURL(url);
        photoURL = url;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  } else {
    console.log('please only use .png, .jpg, .jpeg file types');
  }

  return { photoURL };
}

interface handleUploadImageProps {
  e: any;
  location: string;
  username: string;
  maxWidthOrHeight: number;
  chatRoomIDs: string[] | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  handleImgURLFunction: any;
}

function handleUploadImage({
  e,
  location,
  username,
  maxWidthOrHeight,
  chatRoomIDs,
  setLoading,
  setAddPhoto,
  handleImgURLFunction,
}: handleUploadImageProps) {
  async function handler() {
    const userDetails: userDetailTypes = await handleUploadToCloud({
      e,
      location,
      username,
      maxWidthOrHeight,
      setLoading,
    });
    handleImgURLFunction({
      url: userDetails.photoURL!,
      username,
      chatRoomIDs,
      setLoading,
      setAddPhoto,
    });
  }
  handler();
}

export default handleUploadImage;

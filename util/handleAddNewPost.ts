import React from 'react';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import {
  getFirestore,
  updateDoc,
  doc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from './firbaseConfig';
import { notificationTypes, userDetailTypes } from './atoms';

interface selectedImageProps {
  e: any;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImageSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function handleSelectedImage({
  e,
  setSelectedImage,
  setImageSelected,
}: selectedImageProps) {
  const fileType = e.target.files[0].type;
  const imageFile = e.target.files[0];

  if (
    fileType === 'image/png' ||
    fileType === 'image/jpg' ||
    fileType === 'image/jpeg'
  ) {
    setSelectedImage(imageFile);
    setImageSelected(true);
  } else {
    console.log('please only use .png, .jpg, .jpeg file types');
  }
}

interface handleSubmitProps {
  url: string;
  userNotifications: notificationTypes;
  userDetails: userDetailTypes | User;
  caption: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}

async function handleSubmitToDB({
  url,
  userNotifications,
  userDetails,
  caption,
}: handleSubmitProps) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', userNotifications.username!);
  const userPostDocRef = doc(
    db,
    `${userNotifications.username}Posts`,
    'userPosts'
  );

  // add to post count
  updateDoc(userRef, {
    // eslint-disable-next-line no-unsafe-optional-chaining
    postCount: userNotifications.postCount! + 1,
  });

  const postCaption = {
    text: caption,
    avatarURL: userDetails.photoURL,
    username: userDetails.displayName,
    createdAt: new Date().toLocaleDateString(),
  };

  // create document within 'username'Posts
  await addDoc(collection(db, `${userNotifications.username}Posts`), {
    createdAt: serverTimestamp(),
    imgURL: url,
    likeCount: 0,
    comments: [postCaption],
    postID: '',
    likes: [],
  });

  // get latest added doc ID
  const q = query(
    collection(db, `${userNotifications.username}Posts`),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  let latestPostId: string;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((latestPost: any) => {
    latestPostId = latestPost.id;
  });

  // update users post list with the latest document ID
  updateDoc(userPostDocRef, {
    postsListArray: arrayUnion(latestPostId!),
  });

  // add document ID to within the post document
  const docRef = doc(db, `${userNotifications.username!}Posts`, latestPostId!);
  updateDoc(docRef, {
    postID: latestPostId!,
  });
}

interface submitProps {
  userNotifications: notificationTypes;
  userDetails: userDetailTypes | User;
  caption: string;
  selectedImage: File;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function handleSubmit({
  userNotifications,
  userDetails,
  caption,
  selectedImage,
  setLoading,
  setAddPost,
}: submitProps) {
  const storage = getStorage();
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  };

  setLoading(true);

  const storageRef = ref(
    storage,
    `posts/${userDetails.displayName}post${userNotifications.postCount! + 1}`
  );

  // compress the image
  const compressedFile = await imageCompression(selectedImage!, options);

  // upload to storage, and then retrieve the usable URL
  await uploadBytes(storageRef, compressedFile).then(() => {
    // image uplaoded
  });
  getDownloadURL(
    ref(
      storage,
      `posts/${userDetails.displayName}post${userNotifications.postCount! + 1}`
    )
  )
    .then((url) => {
      setLoading(false);
      setAddPost(false);
      handleSubmitToDB({
        url,
        userNotifications,
        userDetails,
        caption,
        setLoading,
        setAddPost,
      });
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}

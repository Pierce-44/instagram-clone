/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { useAtom } from 'jotai';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import DragPhotosVideos from '../svgComps/DragPhotosVideos';
import ReturnArrow from '../svgComps/ReturnArrow';
import app from '../../util/firbaseConfig';
import atoms from '../../util/atoms';

function AddNewPost({ setAddPost }: { setAddPost: any }) {
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [imageSelected, setImageSelected] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [caption, setCaption] = React.useState('');
  const storage = getStorage();
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 400,
    useWebWorker: true,
  };

  function handleClose(e: any) {
    if (e.target.id === 'closeAddPost') {
      setAddPost(false);
    }
  }

  function handleSelectedImage(e: any) {
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

  function handleReturn() {
    setSelectedImage(undefined);
    setImageSelected(false);
  }

  async function handleSubmitToDB(url: string) {
    const db = getFirestore(app);
    const userRef = doc(db, 'users', userNotifications?.username);
    const userPostDocRef = doc(
      db,
      `${userNotifications.username}Posts`,
      'userPosts'
    );

    // add to post count
    updateDoc(userRef, {
      // eslint-disable-next-line no-unsafe-optional-chaining
      postCount: userNotifications.postCount + 1,
    });

    const postCaption = {
      text: caption,
      avatarURL: userDetails.photoURL,
      username: userDetails.displayName,
      createdAt: new Date().toLocaleDateString(),
    };

    // create document within SuperManPosts
    await addDoc(collection(db, `${userNotifications.username}Posts`), {
      createdAt: serverTimestamp(),
      imgURL: url,
      likeCount: 0,
      comments: [postCaption],
      postID: '',
    });

    // get latest added doc ID
    const q = query(
      collection(db, `${userNotifications.username}Posts`),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    let latestPostId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((latestPost: any) => {
      latestPostId = latestPost.id;
    });

    // update users post list with the latest document ID
    updateDoc(userPostDocRef, {
      postsListArray: arrayUnion(latestPostId),
    });

    // add document ID to within the post document
    const docRef = doc(db, `${userNotifications.username}Posts`, latestPostId);
    updateDoc(docRef, {
      postID: latestPostId,
    });
  }

  async function handleSubmit() {
    const storageRef = ref(
      storage,
      `posts/${userDetails.displayName}post${userNotifications.postCount + 1}`
    );

    // compress the image
    const compressedFile = await imageCompression(selectedImage, options);

    // upload to storage, and then retrieve the usable URL
    await uploadBytes(storageRef, compressedFile).then(() => {
      // image uplaoded
    });
    getDownloadURL(
      ref(
        storage,
        `posts/${userDetails.displayName}post${userNotifications.postCount + 1}`
      )
    )
      .then((url) => {
        handleSubmitToDB(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      className="fixed top-0 z-10 flex h-full w-full cursor-default  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]"
      onClick={(e) => handleClose(e)}
      role="button"
      tabIndex={0}
      id="closeAddPost"
    >
      <button
        className="fixed top-5 right-5"
        type="button"
        onClick={() => setAddPost(false)}
      >
        <CloseBtnSVG lightColor="#f1f5f9" darkColor="#f1f5f9" />
      </button>
      <div className="w-[444px] flex-col overflow-hidden rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]">
        {imageSelected ? (
          <div>
            <div className="flex items-center justify-between px-4">
              <button onClick={() => handleReturn()} type="button">
                <ReturnArrow />
              </button>
              <h1 className="border-b border-stone-300 py-3 text-center font-semibold dark:border-stone-700">
                Post Preview
              </h1>
              <button
                onClick={() => handleSubmit()}
                className="font-semibold text-[#0095f6]"
                type="button"
              >
                Create
              </button>
            </div>
            <div>
              <picture>
                <img
                  className="h-[444px] w-[444px] object-cover"
                  src={URL.createObjectURL(selectedImage)}
                  alt="post"
                />
              </picture>
            </div>
            <div className="p-4">
              <input
                className="w-full focus:outline-none"
                placeholder="Write a caption..."
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="border-b border-stone-300 py-5 text-center font-semibold dark:border-stone-700">
              Create new post
            </h1>
            <div className="flex h-[444px] flex-col items-center justify-center">
              <div className="mx-auto">
                <DragPhotosVideos />
              </div>
              <h1 className="py-5 text-xl">Upload photos and videos</h1>
              <div className="flex justify-center rounded-[4px] bg-[#0095f6] text-sm font-semibold text-white dark:border-stone-700 dark:text-[#0f0f0f]">
                <label
                  className="flex-grow cursor-pointer px-3 py-1  text-center"
                  htmlFor="photoFile"
                >
                  Select From Computer
                  <input
                    type="file"
                    id="photoFile"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={(e) => handleSelectedImage(e)}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddNewPost;

import imageCompression from 'browser-image-compression';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function handleUploadToCloud({
  e,
  location,
  username,
  maxWidthOrHeight,
}) {
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
    // setLoading(true);

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
      });
  } else {
    console.log('please only use .png, .jpg, .jpeg file types');
  }

  return { photoURL };
}

function handleUploadImage({
  e,
  location,
  username,
  maxWidthOrHeight,
  chatRoomIDs,
  handleImgURLFunction,
}) {
  async function handler() {
    const testresult = await handleUploadToCloud({
      e,
      location,
      username,
      maxWidthOrHeight,
    });
    console.log(testresult.photoURL);
    handleImgURLFunction(testresult.photoURL, username, chatRoomIDs);
  }
  handler();
}

export default handleUploadImage;

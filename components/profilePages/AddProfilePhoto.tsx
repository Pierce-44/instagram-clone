import React from 'react';
import { useAtom } from 'jotai';
import handleUploadImage from '../../util/handleUploadImage';
import handleUpdateProfilePhoto from '../../util/handleUpdateProfilePhoto';
import handleRemoveProfilePhoto from '../../util/handleRemoveProfilePhoto';
import atoms from '../../util/atoms';

function AddProfilePhoto({
  setAddPhoto,
}: {
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);

  return (
    <div className="fixed top-0 z-50 flex h-full w-full  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
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
              onChange={(e) =>
                handleUploadImage({
                  e,
                  location: 'profilePhotos',
                  username: userDetails.displayName!,
                  maxWidthOrHeight: 400,
                  chatRoomIDs: userNotifications.chatRoomIds!,
                  setLoading,
                  setAddPhoto,
                  handleImgURLFunction: handleUpdateProfilePhoto,
                })
              }
            />
          </label>
        </div>
        <button
          className="w-full border-b border-stone-300 py-3 text-sm font-semibold text-[#ED4956] dark:border-stone-700"
          type="button"
          onClick={() =>
            handleRemoveProfilePhoto({
              username: userDetails.displayName!,
              chatRoomIds: userNotifications.chatRoomIds!,
              setLoading,
              setAddPhoto,
            })
          }
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

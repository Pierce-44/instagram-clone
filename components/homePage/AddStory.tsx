import { useAtom } from 'jotai';
import React from 'react';
import Image from 'next/future/image';
import AddStorySVG from '../svgComps/AddStorySVG';
import handleUpdateUserStory from '../../util/handleUpdateUserStory';
import handleUploadImage from '../../util/handleUploadImage';
import useCheckNameLength from '../../hooks/useCheckNameLength';
import atoms from '../../util/atoms';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import handleRemoveStory from '../../util/handleRemoveStory';

function AddStory() {
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [loading, setLoading] = React.useState(false);
  const [addPhoto, setAddPhoto] = React.useState(false);

  const widthRef = React.useRef<HTMLDivElement>(null);

  const checkLength = useCheckNameLength({ widthRef });

  return (
    <>
      <div className="flex cursor-pointer flex-col items-start">
        <div className="relative">
          <button
            className="w-[74px]"
            type="button"
            onClick={() => setAddPhoto(true)}
          >
            {userDetails.photoURL ? (
              <Image
                className="relative z-10 h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover p-[2px] dark:bg-[#1c1c1c]"
                src={userDetails.photoURL}
                alt="avatar"
                width="56"
                height="56"
              />
            ) : (
              <div className="relative z-10 h-14 w-14 rounded-full bg-white dark:bg-[#1c1c1c]">
                <ProfilePicSVG strokeWidth="1" />
              </div>
            )}
          </button>
          <div
            className={`${
              userNotifications.story?.length === 0
                ? 'bg-[#e4e4e4] dark:bg-[#4d4d4d]'
                : 'bg-gradient-to-tr from-[#ffee00] to-[#d300c8]'
            } absolute top-[-2px] left-[-2px]  z-0 h-[60px] w-[60px] rounded-full `}
          />
          <div className="absolute bottom-0 right-[15px] z-10">
            <AddStorySVG />
          </div>
        </div>
        <div className="relative mt-2 max-w-[74px] overflow-hidden text-xs">
          <p ref={widthRef}>{userDetails.displayName}</p>
          {checkLength.nameWidth === 74 ? (
            <div className="absolute top-0 right-0 bg-white pr-[5px] dark:bg-[#1c1c1c]">
              <p>...</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {addPhoto ? (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
          <div
            className={
              loading
                ? 'animate-spin rounded-full bg-[#000000de] p-2 '
                : 'hidden'
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
              Change story photo
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
                      location: 'stories',
                      username: userDetails.displayName!,
                      maxWidthOrHeight: 1000,
                      chatRoomIDs: null,
                      setLoading,
                      setAddPhoto,
                      handleImgURLFunction: handleUpdateUserStory,
                    })
                  }
                />
              </label>
            </div>
            <button
              className="w-full border-b border-stone-300 py-3 text-sm font-semibold text-[#ED4956] dark:border-stone-700"
              type="button"
              onClick={() =>
                handleRemoveStory({
                  username: userDetails.displayName!,
                  setLoading,
                  setAddPhoto,
                })
              }
            >
              Remove current story
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
      ) : (
        ''
      )}
    </>
  );
}

export default AddStory;

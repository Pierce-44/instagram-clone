import { useAtom } from 'jotai';
import React from 'react';
import AddStorySVG from '../svgComps/AddStorySVG';
import handleUpdateUserStory from '../../util/handleUpdateUserStory';
import handleUploadImage from '../../util/handleUploadImage';
import useCheckNameLength from '../../hooks/useCheckNameLength';
import atoms from '../../util/atoms';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';

function AddStory() {
  const [userDetails] = useAtom(atoms.userDetails);

  const widthRef = React.useRef<HTMLDivElement>(null);
  const checkLength = useCheckNameLength({ widthRef });

  return (
    <label htmlFor="photoFile">
      <input
        type="file"
        id="photoFile"
        accept=".png, .jpg, .jpeg"
        hidden
        onChange={(e) =>
          handleUploadImage({
            e,
            location: 'stories',
            username: userDetails.displayName,
            maxWidthOrHeight: 800,
            chatRoomIDs: null,
            handleImgURLFunction: handleUpdateUserStory,
          })
        }
      />
      <div className="flex cursor-pointer flex-col items-start">
        <div className="relative">
          <div className="w-[74px]">
            {userDetails.photoURL ? (
              <picture>
                <img
                  className="relative z-10 h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover p-[2px] dark:bg-[#313131]"
                  src={userDetails.photoURL}
                  alt="avatar"
                />
              </picture>
            ) : (
              <div className="relative z-10 w-14 rounded-full bg-white dark:bg-[#1c1c1c]">
                <ProfilePicSVG height="56" width="56" strokeWidth="1" />
              </div>
            )}
          </div>
          <div
            className={`${
              userDetails.photoURL
                ? 'top-[-2px] left-[-2px]'
                : 'top-[-2px] left-[-2px]'
            } absolute  z-0 h-[60px] w-[60px] rounded-full bg-gradient-to-tr from-[#ffee00] to-[#d300c8]`}
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
    </label>
  );
}

export default AddStory;

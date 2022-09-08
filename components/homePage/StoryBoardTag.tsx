import React from 'react';
import Image from 'next/future/image';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';
import useCheckNameLength from '../../hooks/useCheckNameLength';
import ViewAllStories from './ViewAllStories';
import useWindowSize from '../../hooks/useWindowSize';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';

function StoryBoardTag({ username }: { username: string }) {
  const [stories] = useAtom(atoms.stories);
  const [userDetails] = useAtom(atoms.userDetails);

  const [openStories, setOpenStories] = React.useState(false);

  const width = useWindowSize();

  // checks if the story has already been viewed
  const didView = stories[`${username}Views`]?.includes(
    userDetails.displayName!
  );

  const widthRef = React.useRef<HTMLDivElement>(null);
  const checkLength = useCheckNameLength({ widthRef });

  return (
    <div className="ml-1 flex cursor-pointer flex-col items-start">
      {openStories ? (
        <ViewAllStories
          username={username}
          setOpenStories={setOpenStories}
          width={width}
        />
      ) : (
        ''
      )}
      <button
        className="group relative"
        type="button"
        onClick={() => {
          setOpenStories(true);
          document.body.style.overflow = 'hidden';
        }}
      >
        <div className="w-[74px]">
          {stories[`${username}Photo`].length === 0 ? (
            <div className="relative z-10 h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#1c1c1c]">
              <ProfilePicSVG strokeWidth="1" />
            </div>
          ) : (
            <Image
              className="relative z-10 h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover p-[2px] dark:bg-[#1c1c1c]"
              src={stories[`${username}Photo`]}
              alt="avatar"
              width="56"
              height="56"
            />
          )}
        </div>
        <div
          className={`${
            didView
              ? 'bg-[#e4e4e4] dark:bg-[#4d4d4d]'
              : 'bg-gradient-to-tr from-[#ffee00] to-[#d300c8]'
          } absolute top-[-2px] left-[-2px] z-0 h-[60px] w-[60px] rounded-full group-hover:animate-ping`}
        />
      </button>
      <div className="relative mt-2 max-w-[74px] overflow-hidden text-xs">
        <p ref={widthRef}>{username}</p>
        {checkLength.nameWidth === 74 ? (
          <div className="absolute top-0 right-0 bg-white pr-[5px] dark:bg-[#1c1c1c]">
            <p>...</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default StoryBoardTag;

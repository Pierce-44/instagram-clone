import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';
import useCheckNameLength from '../../hooks/useCheckNameLength';
import ViewAllStories from './ViewAllStories';

function StoryBoardTag({ username }: { username: string }) {
  const [stories] = useAtom(atoms.stories);
  const [userDetails] = useAtom(atoms.userDetails);

  const [openStories, setOpenStories] = React.useState(false);

  // checks if the story has already been viewed
  const didView = stories[`${username}Views`]?.includes(
    userDetails.displayName!
  );

  const widthRef = React.useRef<HTMLDivElement>(null);
  const checkLength = useCheckNameLength({ widthRef });

  return (
    <div className="ml-1 flex cursor-pointer flex-col items-start">
      {openStories ? (
        <ViewAllStories username={username} setOpenStories={setOpenStories} />
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
          <picture>
            <img
              className=" relative z-10 h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover p-[2px] dark:bg-[#1c1c1c]"
              src={stories[`${username}Photo`]}
              alt="avatar"
            />
          </picture>
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

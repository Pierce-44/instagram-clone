import React from 'react';
import { useAtom } from 'jotai';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import ArrowSVG from '../svgComps/ArrowSVG';
import atoms from '../../util/atoms';

function ViewAllStories({
  username,
  storiesArray,
  setOpenStories,
}: {
  username: string;
  storiesArray: string[];
  setOpenStories: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [stories] = useAtom(atoms.stories);

  // console.log(storiesArray);

  const [storyUsername, setStoryUsername] = React.useState(username);
  const [positionIndex, setPositionIndex] = React.useState(
    storiesArray.indexOf(username)
  );

  function handleRightClick() {
    setPositionIndex(positionIndex + 1);
    setStoryUsername(storiesArray[positionIndex + 1]);
  }

  function handleLeftClick() {
    setPositionIndex(positionIndex - 1);
    setStoryUsername(storiesArray[positionIndex - 1]);
  }

  // // right click
  // if (currentPosition > followingArray.length) {
  //   // transfrom and set new position set(oldPostion + 1) and set new username else do nothing
  // }

  return (
    <div className="fixed top-0 left-0 z-[100] h-screen w-full overflow-hidden overflow-y-scroll bg-[#1a1a1a]">
      <button
        className="absolute top-4 left-4 z-[100]"
        type="button"
        onClick={() => {
          setOpenStories(false);
          document.body.style.overflow = 'initial';
        }}
      >
        <picture>
          <img
            src="/instagramWhite.png"
            alt="Instagram"
            className="cursor-pointer"
          />
        </picture>
      </button>
      <button
        className="absolute top-6 right-6 z-[100]"
        type="button"
        onClick={() => {
          setOpenStories(false);
          document.body.style.overflow = 'initial';
        }}
      >
        <CloseBtnSVG lightColor="white" darkColor="white" heightWidth="24" />
      </button>
      <div
        className="flex h-full items-center  gap-[3vw] pl-[36vw]"
        style={{
          transform: `translate(calc(${positionIndex} * -14vw))`,
        }}
      >
        {storiesArray.map((userName: string) => (
          <div key={userName}>
            <div className="relative flex ">
              {storyUsername === userName ? (
                <button
                  className={
                    positionIndex !== 0
                      ? 'absolute top-[50%] left-[-20px]'
                      : 'hidden'
                  }
                  type="button"
                  onClick={() => handleLeftClick()}
                >
                  <div className="h-10 w-10 rotate-180 rounded-full bg-[#8080809a]">
                    <ArrowSVG />
                  </div>
                </button>
              ) : (
                ''
              )}
              <picture>
                <img
                  className={
                    storyUsername === userName
                      ? 'h-[95vh] w-[26vw]  rounded-xl bg-[#3f3f3f] object-cover'
                      : 'h-[40vh] w-[11vw] rounded-xl  bg-[#3f3f3f] object-cover'
                  }
                  src={stories[`${userName}Photo`]}
                  alt="story"
                />
              </picture>
              {storyUsername === userName ? (
                <button
                  className={
                    positionIndex < storiesArray.length - 1
                      ? 'absolute top-[50%] right-[-20px]'
                      : 'hidden'
                  }
                  type="button"
                  onClick={() => handleRightClick()}
                >
                  <div className="h-10 w-10 rounded-full bg-[#8080809a]">
                    <ArrowSVG />
                  </div>
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllStories;

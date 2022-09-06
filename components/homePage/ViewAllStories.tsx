import React from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import ArrowSVG from '../svgComps/ArrowSVG';
import atoms from '../../util/atoms';
import ProgressBar from './ProgressBar';
import useWindowSize from '../../hooks/useWindowSize';

function ViewAllStories({
  username,
  setOpenStories,
}: {
  username: string;
  setOpenStories: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [stories] = useAtom(atoms.stories);
  const [userDetails] = useAtom(atoms.userDetails);
  const [storiesArray] = useAtom(atoms.storiesArray);

  const [storyUsername, setStoryUsername] = React.useState(username);
  const [positionIndex, setPositionIndex] = React.useState(
    storiesArray.indexOf(username)
  );

  const width = useWindowSize();

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
            className="cursor-pointer select-none"
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
        className="flex h-full w-max cursor-default  items-center gap-[3vw] pl-[20vw] transition-all duration-500 lg:pl-[36vw]"
        style={{
          transform: `translate(calc(${positionIndex} * ${width}vw))`,
        }}
      >
        {storiesArray.map((userName, index) => (
          <div key={userName}>
            <div className="group relative flex">
              {storyUsername === userName ? (
                <button
                  className={
                    positionIndex !== 0
                      ? 'absolute top-[50%] left-[-3vw] z-10'
                      : 'hidden'
                  }
                  type="button"
                  onClick={() => {
                    setPositionIndex(positionIndex - 1);
                    setStoryUsername(storiesArray[positionIndex - 1]);
                  }}
                >
                  <div className="flex h-6 w-6 rotate-180 items-center justify-center rounded-full bg-[#ebebebc2] hover:bg-[#ebebebc2] group-hover:bg-[#ebebebc2] lg:bg-[#8080805d]">
                    <ArrowSVG white={false} />
                  </div>
                </button>
              ) : (
                ''
              )}
              <div className="relative overflow-hidden rounded-lg">
                {storyUsername === userName ? (
                  <div>
                    <ProgressBar
                      setStoryUsername={setStoryUsername}
                      setPositionIndex={setPositionIndex}
                      userName={userName}
                      storiesArray={storiesArray}
                      positionIndex={positionIndex}
                    />
                    <div className="absolute top-9 left-0 z-[1000] ml-5 flex items-center gap-2 text-sm text-white">
                      <Link href={userName}>
                        <picture>
                          <img
                            className="relative z-[1000] h-8 w-8 cursor-pointer select-none rounded-full bg-[#3f3f3f] object-cover"
                            src={stories[`${userName}Photo`]}
                            alt="avatar"
                          />
                        </picture>
                      </Link>
                      <Link href={userName}>
                        <p className="cursor-pointer">{userName}</p>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="group absolute top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-[#00000094]">
                    <button
                      type="button"
                      className="relative h-[16vw] w-[16vw] sm:h-[4vw] sm:w-[4vw]"
                      onClick={() => {
                        setPositionIndex(index);
                        setStoryUsername(storiesArray[index]);
                      }}
                    >
                      <picture>
                        <img
                          className="absolute top-1/2 left-1/2 z-[1000] h-[16vw] w-[16vw] -translate-x-1/2 -translate-y-1/2 transform select-none rounded-full  bg-[#3f3f3f]  object-cover sm:h-[4vw] sm:w-[4vw] "
                          src={stories[`${userName}Photo`]}
                          alt="avatar"
                        />
                      </picture>
                      <div
                        className={`${
                          stories[`${userName}Views`].includes(
                            userDetails.displayName!
                          )
                            ? 'bg-[#999999]'
                            : 'bg-gradient-to-tr from-[#ffee00] to-[#d300c8]'
                        } absolute top-1/2 left-1/2 z-[999] h-[17vw] w-[17vw] -translate-x-1/2 -translate-y-1/2 transform rounded-full sm:h-[4.3vw] sm:w-[4.3vw]`}
                      />
                    </button>
                    <p className="mb-5 hidden text-center text-sm font-semibold text-white group-hover:animate-bounce sm:block">
                      {userName}
                    </p>
                  </div>
                )}
                <picture>
                  <img
                    className={`${
                      storyUsername === userName
                        ? 'h-[80vh] w-[60vw] lg:h-[95vh] lg:w-[27vw]'
                        : 'h-[40vh] w-[20vw] bg-[#202020] lg:w-[10vw]'
                    } select-none bg-[#3f3f3f] object-cover transition-all duration-500`}
                    src={stories[userName]}
                    alt="story"
                  />
                </picture>
                {storyUsername === userName ? (
                  <div className="absolute top-0 left-0 h-full w-full">
                    <div className="absolute h-[15%] w-full bg-gradient-to-b from-[#000000af]  to-[#00000000]" />
                  </div>
                ) : (
                  ''
                )}
              </div>
              {storyUsername === userName ? (
                <button
                  className={
                    positionIndex < storiesArray.length - 1
                      ? 'absolute top-[50%] right-[-3vw] z-10'
                      : 'hidden'
                  }
                  type="button"
                  onClick={() => {
                    setPositionIndex(positionIndex + 1);
                    setStoryUsername(storiesArray[positionIndex + 1]);
                  }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ebebebc2] hover:bg-[#ebebebc2] group-hover:bg-[#ebebebc2] lg:bg-[#8080805d]">
                    <ArrowSVG white={false} />
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

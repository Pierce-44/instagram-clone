import React from 'react';
import PlaySVG from '../svgComps/PlaySVG';
import PauseSVG from '../svgComps/PauseSVG';
import useProgressBar from '../../hooks/useProgressBar';

interface Props {
  userName: string;
  positionIndex: number;
  storiesArray: string[];
  setStoryUsername: React.Dispatch<React.SetStateAction<string>>;
  setPositionIndex: React.Dispatch<React.SetStateAction<number>>;
}

function ProgressBar({
  userName,
  positionIndex,
  storiesArray,
  setStoryUsername,
  setPositionIndex,
}: Props) {
  const widthRef = React.useRef<HTMLDivElement>(null);
  const containerWidthRef = React.useRef<HTMLDivElement>(null);

  const [progress, setProgress] = React.useState(0);
  const [playStatus, setPlayStatus] = React.useState(true);

  const progressBar = useProgressBar({
    userName,
    playStatus,
    storiesArray,
    positionIndex,
    setProgress,
    setPositionIndex,
    setStoryUsername,
  });

  return (
    <div>
      <div
        ref={containerWidthRef}
        className="absolute top-5 left-0 mx-5 flex h-[2px] w-[calc(100%-40px)] justify-start bg-[#80808094]"
      >
        <div
          ref={widthRef}
          className="z-20  h-full bg-white"
          style={{
            width: `${progress}%`,
            transition: `width ${progressBar.timer}s linear`,
          }}
        />
      </div>

      <div>
        {playStatus ? (
          <button
            type="button"
            className="absolute top-11 right-10 z-10"
            onClick={() => {
              setProgress(
                (widthRef.current!.offsetWidth /
                  containerWidthRef.current!.offsetWidth) *
                  100
              );
              setPlayStatus(false);
            }}
          >
            <PauseSVG />
          </button>
        ) : (
          <button
            type="button"
            className="absolute top-11 right-10 z-10"
            onClick={() => {
              setPlayStatus(true);
            }}
          >
            <PlaySVG />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;

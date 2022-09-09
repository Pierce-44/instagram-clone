import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function SendMessage({
  setCreateChatRoom,
}: {
  setCreateChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <div className="absolute bottom-0 top-0 left-[130px] flex w-[calc(100%-130px)] flex-col items-center justify-center border-l border-stone-300 bg-white p-6 dark:border-stone-700 dark:bg-[#1c1c1c] md:left-[350px] md:w-[calc(100%-350px)]">
      <svg
        aria-label="Direct"
        color={darkMode ? '#f1f5f9' : '#262626'}
        fill="#262626"
        height="96"
        role="img"
        viewBox="0 0 96 96"
        width="96"
      >
        <circle
          cx="48"
          cy="48"
          fill="none"
          r="47"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="69.286"
          x2="41.447"
          y1="33.21"
          y2="48.804"
        />
        <polygon
          fill="none"
          points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <h1 className="mt-3 text-center text-xl dark:text-slate-100">
        Your messages
      </h1>
      <p className="mt-2 text-center text-xs text-gray-500">
        Send private photos and messages to a friend or group.
      </p>
      <button
        className="mt-6 rounded-[4px] bg-[#0095f6] px-2 py-1 text-sm font-semibold text-white dark:text-[#0f0f0f]"
        type="button"
        onClick={() => setCreateChatRoom(true)}
      >
        Send message
      </button>
    </div>
  );
}

export default SendMessage;
